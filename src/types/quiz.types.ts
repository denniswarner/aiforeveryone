export interface Question {
  id: number;
  quizId: number;
  text: string;
  options: string[];
  correctAnswer: number;
  points: number;
}

export interface Quiz {
  id: number;
  chapter: number;
  questions: Question[];
  passingScore: number;
}

export interface UserProgress {
  id: number;
  userId: number;
  chapter: number;
  score: number;
  completed: boolean;
  timestamp: Date;
}

export interface QuizState {
  currentChapter: number;
  answers: Record<number, number>; // questionId -> selectedOptionIndex
  scores: Record<number, number>; // chapter -> score
  isComplete: boolean;
} 