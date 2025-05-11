import { create } from 'zustand';
import { QuizState } from '../types/quiz.types';

interface QuizStore extends QuizState {
  setAnswer: (questionId: number, answerIndex: number) => void;
  setChapter: (chapter: number) => void;
  setScore: (chapter: number, score: number) => void;
  completeQuiz: () => void;
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizStore>((set) => ({
  currentChapter: 1,
  answers: {},
  scores: {},
  isComplete: false,

  setAnswer: (questionId, answerIndex) =>
    set((state) => ({
      answers: { ...state.answers, [questionId]: answerIndex },
    })),

  setChapter: (chapter) =>
    set(() => ({
      currentChapter: chapter,
    })),

  setScore: (chapter, score) =>
    set((state) => ({
      scores: { ...state.scores, [chapter]: score },
    })),

  completeQuiz: () =>
    set(() => ({
      isComplete: true,
    })),

  resetQuiz: () =>
    set(() => ({
      currentChapter: 1,
      answers: {},
      scores: {},
      isComplete: false,
    })),
})); 