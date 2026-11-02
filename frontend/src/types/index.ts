// ============================================
// Core domain types for the PyLearn platform
// ============================================

/** A single test case for an exercise */
export interface TestCase {
  id: string;
  description: string;
  input?: string;
  expectedOutput?: string;
  expectedReturn?: unknown;
  functionName?: string;
  functionArgs?: unknown[];
  type: 'output' | 'function' | 'contains';
}

/** A coding exercise with test cases */
export interface Exercise {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'easy' | 'intermediate' | 'advanced';
  starterCode: string;
  solution: string;
  hints: string[];
  testCases: TestCase[];
  concepts: string[];
}

/** A single quiz question */
export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'predict-output' | 'find-error' | 'fill-code';
  question: string;
  code?: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
}

/** A single lesson within a module */
export interface Lesson {
  id: string;
  moduleId: string;
  order: number;
  title: string;
  objective: string;
  explanation: string;
  analogy?: string;
  syntax?: string;
  exampleCode: string;
  lineByLine: LineExplanation[];
  expectedOutput: string;
  starterCode: string;
  commonMistakes: CommonMistake[];
  exercise: Exercise;
  prerequisites: string[];
  estimatedMinutes: number;
  tags: string[];
}

/** Line-by-line code explanation */
export interface LineExplanation {
  line: string;
  explanation: string;
}

/** A common mistake entry */
export interface CommonMistake {
  mistake: string;
  explanation: string;
  fix: string;
}

/** A learning module containing lessons and a quiz */
export interface Module {
  id: string;
  order: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  lessons: Lesson[];
  quiz: QuizQuestion[];
}

// ============================================
// Progress tracking types
// ============================================

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

// ============================================
// Code execution types
// ============================================

export type ExecutionStatus = 'idle' | 'loading' | 'running' | 'success' | 'error';

export interface ExecutionResult {
  output: string;
  error: string;
  duration: number;
  status: ExecutionStatus;
}

export interface TestResult {
  id: string;
  description: string;
  passed: boolean;
  expected: string;
  actual: string;
  error?: string;
}

// ============================================
// API request/response types
// ============================================

export interface RunCodeRequest {
  code: string;
  timeoutMs?: number;
}

export interface RunCodeResponse {
  output: string;
  error: string;
  duration: number;
  status: 'success' | 'error';
}

export interface RunTestsRequest {
  code: string;
  testCases: TestCase[];
}

export interface RunTestsResponse {
  results: TestResult[];
  allPassed: boolean;
  passedCount: number;
  totalCount: number;
}

export interface ErrorAnalysis {
  summary: string;
  lineNumber?: number;
  errorType: string;
  suggestion: string;
}

// ============================================
// Navigation types
// ============================================

export type Page =
  | 'dashboard'
  | 'roadmap'
  | 'lesson'
  | 'playground'
  | 'exercises'
  | 'progress'
  | 'settings'
  | 'module';

export interface NavState {
  page: Page;
  lessonId?: string;
  moduleId?: string;
}
