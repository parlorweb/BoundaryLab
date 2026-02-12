export type Difficulty = 1 | 2 | 3 | 4 | 5;
export type QuestionType = 'single' | 'multi' | 'fill' | 'matching';
export type SessionMode = 'adaptive' | 'topic' | 'focus' | 'saved';

export interface User {
  id: string;
  email: string;
  displayName: string;
  isAdmin: boolean;
  readinessScore: number;
  isGuest?: boolean;
  guestExpiresAt?: number;
}

export interface Topic {
  id: string;
  slug: string;
  name: string;
  description: string;
  sortOrder: number;
  isActive: boolean;
}

export interface Concept {
  id: string;
  topicId: string;
  slug: string;
  name: string;
  summary: string;
  formula?: string;
  isActive: boolean;
}

export interface Choice {
  id: string;
  text: string;
  isCorrect: boolean;
  choiceKey: string;
  matchingValue?: string; // Used for 'matching' question type
}

export interface Question {
  id: string;
  topicId: string;
  difficulty: Difficulty;
  type: QuestionType;
  prompt: string;
  explanation: string;
  hint: string;
  source: string;
  choices: Choice[];
  conceptIds: string[];
  isReported?: boolean;
  isActive?: boolean;
}

export interface SavedQuestion {
  userId: string;
  questionId: string;
  savedAt: string;
}

export interface ReportedQuestion {
  id: string;
  userId: string;
  questionId: string;
  reason: string;
  status: 'pending' | 'resolved' | 'dismissed';
  reportedAt: string;
}

export interface ConceptMastery {
  userId: string;
  conceptId: string;
  masteryLevel: number; // 0-5
  lifetimeAttempts: number;
  lifetimeCorrect: number;
  recentStreak: number;
  lastAttemptAt: string;
}

export interface ReviewQueueItem {
  userId: string;
  conceptId: string;
  dueAt: string;
  intervalDays: number;
}

export interface PracticeSession {
  id: string;
  userId: string;
  mode: SessionMode;
  topicId?: string;
  startedAt: string;
  endedAt?: string;
  targetCount: number;
  correctCount: number;
  totalAnswered: number;
}

export interface UserAnswer {
  id: string;
  userId: string;
  sessionId: string;
  questionId: string;
  selectedChoiceIds: string[]; // For 'fill', index 0 is the text. For 'matching', index i is "choiceId:value"
  isCorrect: boolean;
  timeMs: number;
  answeredAt: string;
}

export interface Resource {
  id: string;
  title: string;
  category: string;
  url: string;
  description: string;
}