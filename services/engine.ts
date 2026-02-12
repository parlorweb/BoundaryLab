
import { 
  Question, SessionMode, PracticeSession, 
  UserAnswer, ConceptMastery 
} from '../types';
import { StorageService } from './storage';

export class PracticeEngine {
  static createSession(userId: string, mode: SessionMode, count: number, topicId?: string): PracticeSession {
    const session: PracticeSession = {
      id: Math.random().toString(36).substring(7),
      userId,
      mode,
      topicId,
      startedAt: new Date().toISOString(),
      targetCount: count,
      correctCount: 0,
      totalAnswered: 0
    };
    StorageService.saveSession(session);
    return session;
  }

  static getSessionQuestions(session: PracticeSession): Question[] {
    const allQuestions = StorageService.getQuestions();
    const mastery = StorageService.getMastery(session.userId);
    
    // Filtering logic based on mode
    let pool = allQuestions;
    if (session.mode === 'topic' && session.topicId) {
      pool = allQuestions.filter(q => q.topicId === session.topicId);
    } else if (session.mode === 'focus') {
      const weakConceptIds = mastery.filter(m => m.masteryLevel <= 1).map(m => m.conceptId);
      pool = allQuestions.filter(q => q.conceptIds.some(cid => weakConceptIds.includes(cid)));
    }

    // Shuffle and pick questions
    const selectedQuestions = [...pool].sort(() => Math.random() - 0.5).slice(0, session.targetCount);

    // Shuffle choices for each selected question (except for fill and matching types)
    return selectedQuestions.map(q => {
      if (q.type === 'fill' || q.type === 'matching') return q;
      
      const shuffledChoices = [...q.choices].sort(() => Math.random() - 0.5);
      const keys = ['A', 'B', 'C', 'D', 'E', 'F'];
      
      return {
        ...q,
        choices: shuffledChoices.map((choice, index) => ({
          ...choice,
          choiceKey: keys[index] || choice.choiceKey
        }))
      };
    });
  }

  static submitAnswer(
    userId: string, 
    session: PracticeSession, 
    question: Question, 
    selectedIds: string[], 
    timeMs: number
  ): UserAnswer {
    let isCorrect = false;

    if (question.type === 'single') {
      const correctIds = question.choices.filter(c => c.isCorrect).map(c => c.id);
      isCorrect = selectedIds.length === 1 && correctIds.includes(selectedIds[0]);
    } else if (question.type === 'multi') {
      const correctIds = question.choices.filter(c => c.isCorrect).map(c => c.id);
      isCorrect = correctIds.length === selectedIds.length && 
                  selectedIds.every(id => correctIds.includes(id));
    } else if (question.type === 'fill') {
      const userInput = selectedIds[0]?.trim().toLowerCase();
      const correctAnswers = question.choices
        .filter(c => c.isCorrect)
        .map(c => c.text.trim().toLowerCase());
      isCorrect = correctAnswers.includes(userInput);
    } else if (question.type === 'matching') {
      // selectedIds format: ["choiceId:value", ...]
      isCorrect = question.choices.every(choice => {
        const pairing = selectedIds.find(s => s.startsWith(`${choice.id}:`));
        if (!pairing) return false;
        const value = pairing.split(':')[1];
        return value === choice.matchingValue;
      });
    }

    const answer: UserAnswer = {
      id: Math.random().toString(36).substring(7),
      userId,
      sessionId: session.id,
      questionId: question.id,
      selectedChoiceIds: selectedIds,
      isCorrect,
      timeMs,
      answeredAt: new Date().toISOString()
    };

    // Update session state
    session.totalAnswered++;
    if (isCorrect) session.correctCount++;
    if (session.totalAnswered === session.targetCount) {
      session.endedAt = new Date().toISOString();
    }
    StorageService.saveSession(session);
    StorageService.saveAnswer(answer);

    // Update mastery for each concept in the question
    question.conceptIds.forEach(cid => {
      StorageService.updateMastery(userId, cid, isCorrect);
      StorageService.updateReviewQueue(userId, cid, isCorrect);
    });

    // Re-calculate readiness
    this.recalculateReadiness(userId);

    return answer;
  }

  private static recalculateReadiness(userId: string) {
    const mastery = StorageService.getMastery(userId);
    const allConceptsCount = StorageService.getConcepts().length;
    
    if (allConceptsCount === 0) return;

    // readiness = avg(mastery_level/5)*70 + recent_accuracy*20 + consistency_factor*10
    const avgMastery = mastery.reduce((acc, m) => acc + (m.masteryLevel / 5), 0) / allConceptsCount;
    
    const sessions = StorageService.getSessions(userId).slice(-7);
    const accuracy = sessions.length > 0 
      ? sessions.reduce((acc, s) => acc + (s.correctCount / (s.totalAnswered || 1)), 0) / sessions.length
      : 0;

    const readiness = Math.round((avgMastery * 70) + (accuracy * 20) + 10);
    StorageService.updateUserReadiness(Math.min(100, readiness));
  }
}
