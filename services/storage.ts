
import { 
  User, Topic, Concept, Question, ConceptMastery, 
  ReviewQueueItem, PracticeSession, UserAnswer, Resource,
  SavedQuestion, ReportedQuestion
} from '../types';
import { SEED_TOPICS, SEED_CONCEPTS, SEED_QUESTIONS, SEED_RESOURCES } from '../data/seed';

const STORAGE_KEYS = {
  USER: 'bl_user',
  MASTERY: 'bl_mastery',
  QUEUE: 'bl_queue',
  SESSIONS: 'bl_sessions',
  ANSWERS: 'bl_answers',
  TOPICS: 'bl_topics',
  CONCEPTS: 'bl_concepts',
  QUESTIONS: 'bl_questions',
  RESOURCES: 'bl_resources',
  SAVED_QUESTIONS: 'bl_saved_questions',
  REPORTS: 'bl_reports'
};

export class StorageService {
  private static isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  private static get<T>(key: string, defaultValue: T): T {
    if (!this.isBrowser()) return defaultValue;
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
      return defaultValue;
    }
  }

  private static set(key: string, data: any): void {
    if (!this.isBrowser()) return;
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {}
  }

  static init(): void {
    if (!this.isBrowser()) return;
    if (!localStorage.getItem(STORAGE_KEYS.TOPICS)) this.set(STORAGE_KEYS.TOPICS, SEED_TOPICS);
    if (!localStorage.getItem(STORAGE_KEYS.CONCEPTS)) this.set(STORAGE_KEYS.CONCEPTS, SEED_CONCEPTS);
    if (!localStorage.getItem(STORAGE_KEYS.QUESTIONS)) this.set(STORAGE_KEYS.QUESTIONS, SEED_QUESTIONS);
    if (!localStorage.getItem(STORAGE_KEYS.RESOURCES)) this.set(STORAGE_KEYS.RESOURCES, SEED_RESOURCES);
  }

  static getCurrentUser(): User | null {
    return this.get<User | null>(STORAGE_KEYS.USER, null);
  }

  static login(user: User): void {
    this.set(STORAGE_KEYS.USER, user);
  }

  static logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  }

  static updateUserReadiness(score: number): void {
    const user = this.getCurrentUser();
    if (!user) return;
    user.readinessScore = score;
    this.set(STORAGE_KEYS.USER, user);
  }

  static getTopics(): Topic[] { return this.get<Topic[]>(STORAGE_KEYS.TOPICS, SEED_TOPICS); }
  static saveTopic(topic: Topic): void {
    const topics = this.getTopics();
    const idx = topics.findIndex(t => t.id === topic.id);
    if (idx >= 0) topics[idx] = topic; else topics.push(topic);
    this.set(STORAGE_KEYS.TOPICS, topics);
  }

  static getConcepts(): Concept[] { return this.get<Concept[]>(STORAGE_KEYS.CONCEPTS, SEED_CONCEPTS); }
  static saveConcept(concept: Concept): void {
    const concepts = this.getConcepts();
    const idx = concepts.findIndex(c => c.id === concept.id);
    if (idx >= 0) concepts[idx] = concept; else concepts.push(concept);
    this.set(STORAGE_KEYS.CONCEPTS, concepts);
  }

  static getQuestions(includeFlags = false): Question[] { 
    const qs = this.get<Question[]>(STORAGE_KEYS.QUESTIONS, SEED_QUESTIONS);
    const user = this.getCurrentUser();
    const pool = qs.filter(q => q.isActive !== false);
    if (user?.isAdmin) return qs;
    if (!includeFlags) return pool.filter(q => !q.isReported);
    return pool;
  }

  static saveQuestion(question: Question): void {
    const questions = this.get<Question[]>(STORAGE_KEYS.QUESTIONS, SEED_QUESTIONS);
    const idx = questions.findIndex(q => q.id === question.id);
    if (idx >= 0) questions[idx] = question; else questions.push(question);
    this.set(STORAGE_KEYS.QUESTIONS, questions);
  }

  static deleteQuestion(id: string): void {
    const questions = this.get<Question[]>(STORAGE_KEYS.QUESTIONS, SEED_QUESTIONS).filter(q => q.id !== id);
    this.set(STORAGE_KEYS.QUESTIONS, questions);
  }

  static getSavedQuestions(userId: string): SavedQuestion[] {
    const all = this.get<SavedQuestion[]>(STORAGE_KEYS.SAVED_QUESTIONS, []);
    return all.filter(s => s.userId === userId);
  }

  static isQuestionSaved(userId: string, questionId: string): boolean {
    const saved = this.getSavedQuestions(userId);
    return saved.some(s => s.questionId === questionId);
  }

  static toggleSavedQuestion(userId: string, questionId: string): void {
    const all = this.get<SavedQuestion[]>(STORAGE_KEYS.SAVED_QUESTIONS, []);
    const existingIdx = all.findIndex(s => s.userId === userId && s.questionId === questionId);
    if (existingIdx >= 0) {
      all.splice(existingIdx, 1);
    } else {
      all.push({ userId, questionId, savedAt: new Date().toISOString() });
    }
    this.set(STORAGE_KEYS.SAVED_QUESTIONS, all);
  }

  static getReports(): ReportedQuestion[] {
    return this.get<ReportedQuestion[]>(STORAGE_KEYS.REPORTS, []);
  }

  static reportQuestion(userId: string, questionId: string, reason: string): void {
    const reports = this.getReports();
    reports.push({
      id: Math.random().toString(36).substring(7),
      userId,
      questionId,
      reason,
      status: 'pending',
      reportedAt: new Date().toISOString()
    });
    this.set(STORAGE_KEYS.REPORTS, reports);

    const questions = this.get<Question[]>(STORAGE_KEYS.QUESTIONS, SEED_QUESTIONS);
    const idx = questions.findIndex(q => q.id === questionId);
    if (idx >= 0) {
      questions[idx].isReported = true;
      this.set(STORAGE_KEYS.QUESTIONS, questions);
    }
  }

  static resolveReport(reportId: string, action: 'dismiss' | 'fix' | 'deactivate'): void {
    const reports = this.getReports();
    const report = reports.find(r => r.id === reportId);
    if (!report) return;

    report.status = action === 'dismiss' ? 'dismissed' : 'resolved';
    this.set(STORAGE_KEYS.REPORTS, reports);

    const questions = this.get<Question[]>(STORAGE_KEYS.QUESTIONS, SEED_QUESTIONS);
    const qIdx = questions.findIndex(q => q.id === report.questionId);
    if (qIdx >= 0) {
      if (action === 'deactivate') {
        questions[qIdx].isActive = false;
      } else if (action === 'dismiss' || action === 'fix') {
        questions[qIdx].isReported = false;
      }
      this.set(STORAGE_KEYS.QUESTIONS, questions);
    }
  }

  static getSessions(userId: string): PracticeSession[] {
    const all = this.get<PracticeSession[]>(STORAGE_KEYS.SESSIONS, []);
    return all.filter(s => s.userId === userId);
  }

  static saveSession(session: PracticeSession): void {
    const all = this.get<PracticeSession[]>(STORAGE_KEYS.SESSIONS, []);
    const idx = all.findIndex(s => s.id === session.id);
    if (idx >= 0) all[idx] = session; else all.push(session);
    this.set(STORAGE_KEYS.SESSIONS, all);
  }

  static saveAnswer(answer: UserAnswer): void {
    const all = this.get<UserAnswer[]>(STORAGE_KEYS.ANSWERS, []);
    all.push(answer);
    this.set(STORAGE_KEYS.ANSWERS, all);
  }

  static getMastery(userId: string): ConceptMastery[] {
    const all = this.get<ConceptMastery[]>(STORAGE_KEYS.MASTERY, []);
    return all.filter(m => m.userId === userId);
  }

  static updateMastery(userId: string, conceptId: string, isCorrect: boolean): void {
    const all = this.get<ConceptMastery[]>(STORAGE_KEYS.MASTERY, []);
    let item = all.find(m => m.userId === userId && m.conceptId === conceptId);
    if (!item) {
      item = {
        userId,
        conceptId,
        masteryLevel: 0,
        lifetimeAttempts: 0,
        lifetimeCorrect: 0,
        recentStreak: 0,
        lastAttemptAt: new Date().toISOString()
      };
      all.push(item);
    }
    item.lifetimeAttempts++;
    if (isCorrect) {
      item.lifetimeCorrect++;
      item.recentStreak++;
    } else {
      item.recentStreak = 0;
    }
    
    if (item.recentStreak >= 3) item.masteryLevel = Math.min(5, item.masteryLevel + 1);
    const accuracy = item.lifetimeCorrect / item.lifetimeAttempts;
    if (accuracy > 0.8 && item.lifetimeAttempts > 10) item.masteryLevel = Math.max(item.masteryLevel, 4);

    item.lastAttemptAt = new Date().toISOString();
    this.set(STORAGE_KEYS.MASTERY, all);
  }

  static getReviewQueue(userId: string): ReviewQueueItem[] {
    const all = this.get<ReviewQueueItem[]>(STORAGE_KEYS.QUEUE, []);
    return all.filter(q => q.userId === userId);
  }

  static updateReviewQueue(userId: string, conceptId: string, isCorrect: boolean): void {
    const all = this.get<ReviewQueueItem[]>(STORAGE_KEYS.QUEUE, []);
    let item = all.find(q => q.userId === userId && q.conceptId === conceptId);
    if (!item) {
      item = { userId, conceptId, dueAt: new Date().toISOString(), intervalDays: 1 };
      all.push(item);
    }
    if (isCorrect) {
      item.intervalDays = Math.min(30, item.intervalDays * 2);
    } else {
      item.intervalDays = 1;
    }
    const nextDue = new Date();
    nextDue.setDate(nextDue.getDate() + item.intervalDays);
    item.dueAt = nextDue.toISOString();
    this.set(STORAGE_KEYS.QUEUE, all);
  }

  static getResources(): Resource[] {
    return this.get<Resource[]>(STORAGE_KEYS.RESOURCES, SEED_RESOURCES);
  }
}
