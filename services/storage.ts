
import { 
  User, Topic, Concept, Question, ConceptMastery, 
  ReviewQueueItem, PracticeSession, UserAnswer, Resource,
  Difficulty, SessionMode
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
  RESOURCES: 'bl_resources'
};

export class StorageService {
  private static get<T>(key: string, defaultValue: T): T {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  }

  private static set(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  // --- Initialization ---
  static init(): void {
    if (!localStorage.getItem(STORAGE_KEYS.TOPICS)) this.set(STORAGE_KEYS.TOPICS, SEED_TOPICS);
    if (!localStorage.getItem(STORAGE_KEYS.CONCEPTS)) this.set(STORAGE_KEYS.CONCEPTS, SEED_CONCEPTS);
    if (!localStorage.getItem(STORAGE_KEYS.QUESTIONS)) this.set(STORAGE_KEYS.QUESTIONS, SEED_QUESTIONS);
    if (!localStorage.getItem(STORAGE_KEYS.RESOURCES)) this.set(STORAGE_KEYS.RESOURCES, SEED_RESOURCES);
  }

  // --- Profile & Auth ---
  static getCurrentUser(): User | null {
    return this.get<User | null>(STORAGE_KEYS.USER, null);
  }

  static login(user: User): void {
    this.set(STORAGE_KEYS.USER, user);
  }

  static logout(): void {
    localStorage.removeItem(STORAGE_KEYS.USER);
  }

  static updateUserReadiness(score: number): void {
    const user = this.getCurrentUser();
    if (!user) return;
    user.readinessScore = score;
    this.set(STORAGE_KEYS.USER, user);
  }

  // --- Static Data with Mutations ---
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

  static getQuestions(): Question[] { return this.get<Question[]>(STORAGE_KEYS.QUESTIONS, SEED_QUESTIONS); }
  static saveQuestion(question: Question): void {
    const questions = this.getQuestions();
    const idx = questions.findIndex(q => q.id === question.id);
    if (idx >= 0) questions[idx] = question; else questions.push(question);
    this.set(STORAGE_KEYS.QUESTIONS, questions);
  }
  static deleteQuestion(id: string): void {
    const questions = this.getQuestions().filter(q => q.id !== id);
    this.set(STORAGE_KEYS.QUESTIONS, questions);
  }

  static getResources(): Resource[] { return this.get<Resource[]>(STORAGE_KEYS.RESOURCES, SEED_RESOURCES); }

  // --- Mastery & Engine ---
  static getMastery(userId: string): ConceptMastery[] {
    return this.get<ConceptMastery[]>(STORAGE_KEYS.MASTERY, []);
  }

  static updateMastery(userId: string, conceptId: string, correct: boolean): void {
    const mastery = this.getMastery(userId);
    let item = mastery.find(m => m.conceptId === conceptId);

    if (!item) {
      item = {
        userId, conceptId, masteryLevel: 0,
        lifetimeAttempts: 0, lifetimeCorrect: 0, recentStreak: 0,
        lastAttemptAt: new Date().toISOString()
      };
      mastery.push(item);
    }

    item.lifetimeAttempts++;
    if (correct) {
      item.lifetimeCorrect++;
      item.recentStreak++;
      
      // Mastery logic: 
      // Level 0 -> 1 after 2 correct answers (streak 2)
      // Level 1 -> 2 after 2 more correct answers (streak 4)
      // etc.
      if (item.recentStreak > 0 && item.recentStreak % 2 === 0) {
        item.masteryLevel = Math.min(5, item.masteryLevel + 1);
      }
    } else {
      item.recentStreak = 0;
      // Regression: drop level if streak is broken on low mastery
      if (item.masteryLevel > 0) {
        item.masteryLevel--;
      }
    }
    item.lastAttemptAt = new Date().toISOString();
    
    this.set(STORAGE_KEYS.MASTERY, mastery);
  }

  static getReviewQueue(userId: string): ReviewQueueItem[] {
    return this.get<ReviewQueueItem[]>(STORAGE_KEYS.QUEUE, []);
  }

  static updateReviewQueue(userId: string, conceptId: string, correct: boolean): void {
    const queue = this.getReviewQueue(userId);
    let item = queue.find(q => q.conceptId === conceptId);

    if (!item) {
      item = { userId, conceptId, dueAt: new Date().toISOString(), intervalDays: 1 };
      queue.push(item);
    }

    if (correct) {
      item.intervalDays = Math.min(30, item.intervalDays * 2);
    } else {
      item.intervalDays = 1;
    }

    const nextDue = new Date();
    nextDue.setDate(nextDue.getDate() + item.intervalDays);
    item.dueAt = nextDue.toISOString();

    this.set(STORAGE_KEYS.QUEUE, queue);
  }

  // --- Sessions ---
  static getSessions(userId: string): PracticeSession[] {
    return this.get<PracticeSession[]>(STORAGE_KEYS.SESSIONS, []);
  }

  static saveSession(session: PracticeSession): void {
    const sessions = this.getSessions(session.userId);
    const existingIdx = sessions.findIndex(s => s.id === session.id);
    if (existingIdx >= 0) {
      sessions[existingIdx] = session;
    } else {
      sessions.push(session);
    }
    this.set(STORAGE_KEYS.SESSIONS, sessions);
  }

  static saveAnswer(answer: UserAnswer): void {
    const answers = this.get<UserAnswer[]>(STORAGE_KEYS.ANSWERS, []);
    answers.push(answer);
    this.set(STORAGE_KEYS.ANSWERS, answers);
  }
}
