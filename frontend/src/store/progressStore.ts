import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface LessonProgress {
  lessonId: string;
  moduleId: string;
  started: boolean;
  completed: boolean;
  completedAt?: string;
  exerciseAttempts: number;
  exercisePassed: boolean;
  hintsUsed: number;
  quizScore?: number;
  notes: string;
  bookmarked: boolean;
}

export interface ModuleProgress {
  moduleId: string;
  started: boolean;
  completed: boolean;
  quizScore?: number;
  quizCompletedAt?: string;
}

export interface ProgressState {
  lessons: Record<string, LessonProgress>;
  modules: Record<string, ModuleProgress>;
  totalXP: number;
  streak: number;
  lastActivityDate: string;
  dailyChallengeCompleted: boolean;
  dailyChallengeDate: string;
  activeModuleId: string;
  activeLessonId: string;
  theme: 'light' | 'dark';
  fontSize: 'small' | 'medium' | 'large';
  
  // Actions
  startLesson: (lessonId: string, moduleId: string) => void;
  completeLesson: (lessonId: string) => void;
  recordExerciseAttempt: (lessonId: string, passed: boolean) => void;
  useHint: (lessonId: string) => void;
  setQuizScore: (lessonId: string, score: number) => void;
  setModuleQuizScore: (moduleId: string, score: number) => void;
  toggleBookmark: (lessonId: string, moduleId: string) => void;
  updateNotes: (lessonId: string, notes: string) => void;
  setActiveLesson: (lessonId: string, moduleId: string) => void;
  completeDailyChallenge: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setFontSize: (size: 'small' | 'medium' | 'large') => void;
  resetProgress: () => void;
  
  // Computed helpers
  getLessonProgress: (lessonId: string) => LessonProgress | undefined;
  getCompletedLessonsCount: () => number;
  getTotalXP: () => number;
}

const defaultLessonProgress = (lessonId: string, moduleId: string): LessonProgress => ({
  lessonId,
  moduleId,
  started: false,
  completed: false,
  exerciseAttempts: 0,
  exercisePassed: false,
  hintsUsed: 0,
  notes: '',
  bookmarked: false
});

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      lessons: {},
      modules: {},
      totalXP: 0,
      streak: 0,
      lastActivityDate: '',
      dailyChallengeCompleted: false,
      dailyChallengeDate: '',
      activeModuleId: 'module-1',
      activeLessonId: 'lesson-1-1',
      theme: 'light',
      fontSize: 'medium',

      startLesson: (lessonId, moduleId) => {
        const today = new Date().toISOString().split('T')[0];
        set((state) => {
          const existing = state.lessons[lessonId] || defaultLessonProgress(lessonId, moduleId);
          const lastDate = state.lastActivityDate;
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toISOString().split('T')[0];
          
          let newStreak = state.streak;
          if (lastDate === yesterdayStr) newStreak += 1;
          else if (lastDate !== today) newStreak = 1;
          
          return {
            lessons: {
              ...state.lessons,
              [lessonId]: { ...existing, started: true }
            },
            modules: {
              ...state.modules,
              [moduleId]: { ...state.modules[moduleId], moduleId, started: true }
            },
            streak: newStreak,
            lastActivityDate: today,
            activeModuleId: moduleId,
            activeLessonId: lessonId
          };
        });
      },

      completeLesson: (lessonId) => {
        set((state) => {
          const existing = state.lessons[lessonId];
          if (!existing || existing.completed) return state;
          const xpGain = 50;
          return {
            lessons: {
              ...state.lessons,
              [lessonId]: {
                ...existing,
                completed: true,
                completedAt: new Date().toISOString()
              }
            },
            totalXP: state.totalXP + xpGain
          };
        });
      },

      recordExerciseAttempt: (lessonId, passed) => {
        set((state) => {
          const existing = state.lessons[lessonId] || defaultLessonProgress(lessonId, '');
          const xpGain = passed && !existing.exercisePassed ? 25 : 0;
          return {
            lessons: {
              ...state.lessons,
              [lessonId]: {
                ...existing,
                exerciseAttempts: existing.exerciseAttempts + 1,
                exercisePassed: existing.exercisePassed || passed
              }
            },
            totalXP: state.totalXP + xpGain
          };
        });
      },

      useHint: (lessonId) => {
        set((state) => {
          const existing = state.lessons[lessonId] || defaultLessonProgress(lessonId, '');
          return {
            lessons: {
              ...state.lessons,
              [lessonId]: { ...existing, hintsUsed: existing.hintsUsed + 1 }
            }
          };
        });
      },

      setQuizScore: (lessonId, score) => {
        set((state) => {
          const existing = state.lessons[lessonId] || defaultLessonProgress(lessonId, '');
          return {
            lessons: {
              ...state.lessons,
              [lessonId]: { ...existing, quizScore: score }
            }
          };
        });
      },

      setModuleQuizScore: (moduleId, score) => {
        set((state) => ({
          modules: {
            ...state.modules,
            [moduleId]: {
              ...state.modules[moduleId],
              moduleId,
              quizScore: score,
              quizCompletedAt: new Date().toISOString(),
              completed: score >= 70
            }
          },
          totalXP: state.totalXP + (score >= 70 ? 100 : 25)
        }));
      },

      toggleBookmark: (lessonId, moduleId) => {
        set((state) => {
          const existing = state.lessons[lessonId] || defaultLessonProgress(lessonId, moduleId);
          return {
            lessons: {
              ...state.lessons,
              [lessonId]: { ...existing, bookmarked: !existing.bookmarked }
            }
          };
        });
      },

      updateNotes: (lessonId, notes) => {
        set((state) => {
          const existing = state.lessons[lessonId] || defaultLessonProgress(lessonId, '');
          return {
            lessons: {
              ...state.lessons,
              [lessonId]: { ...existing, notes }
            }
          };
        });
      },

      setActiveLesson: (lessonId, moduleId) => {
        set({ activeLessonId: lessonId, activeModuleId: moduleId });
      },

      completeDailyChallenge: () => {
        const today = new Date().toISOString().split('T')[0];
        set({ dailyChallengeCompleted: true, dailyChallengeDate: today, totalXP: get().totalXP + 30 });
      },

      setTheme: (theme) => set({ theme }),
      setFontSize: (fontSize) => set({ fontSize }),

      resetProgress: () => {
        set({
          lessons: {},
          modules: {},
          totalXP: 0,
          streak: 0,
          lastActivityDate: '',
          dailyChallengeCompleted: false,
          dailyChallengeDate: '',
          activeModuleId: 'module-1',
          activeLessonId: 'lesson-1-1'
        });
      },

      getLessonProgress: (lessonId) => get().lessons[lessonId],
      getCompletedLessonsCount: () => Object.values(get().lessons).filter(l => l.completed).length,
      getTotalXP: () => get().totalXP
    }),
    {
      name: 'pylearn-progress',
      version: 1
    }
  )
);
