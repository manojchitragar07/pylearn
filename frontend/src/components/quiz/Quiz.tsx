/**
 * Quiz Component
 * 
 * Renders an interactive module quiz with progress dots,
 * immediate answer feedback, and a final score summary.
 */
import { useState } from 'react';
import type { QuizQuestion } from '../../types';
import { useProgressStore } from '../../store/progressStore';

interface QuizProps {
  questions: QuizQuestion[];
  moduleId: string;
  onComplete: (score: number) => void;
}

export default function Quiz({ questions, moduleId, onComplete }: QuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [finished, setFinished] = useState(false);
  const { setModuleQuizScore } = useProgressStore();

  const question = questions[currentIndex];
  const isCorrect = selectedAnswer === question.correctAnswer;

  const handleSelect = (optionIndex: number) => {
    if (answered) return;
    setSelectedAnswer(optionIndex);
    setAnswered(true);
    setAnswers((prev) => [...prev, optionIndex === question.correctAnswer]);
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      const finalAnswers = [...answers, isCorrect];
      const correct = finalAnswers.filter(Boolean).length;
      const score = Math.round((correct / questions.length) * 100);
      setModuleQuizScore(moduleId, score);
      setFinished(true);
      onComplete(score);
    }
  };

  // ── Final screen ───────────────────────────────────────────────────────
  if (finished) {
    const finalAnswers = [...answers];
    const correct = finalAnswers.filter(Boolean).length;
    const score = Math.round((correct / questions.length) * 100);

    return (
      <div className="quiz-card animate-scale">
        <div style={{ textAlign: 'center', padding: '24px 0' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: 16 }}>
            {score >= 80 ? '🏆' : score >= 60 ? '👍' : '📚'}
          </div>
          <h2 style={{ marginBottom: 8 }}>
            {score >= 80 ? 'Outstanding!' : score >= 60 ? 'Good effort!' : 'Keep practicing!'}
          </h2>
          <p style={{ fontSize: '1rem', marginBottom: 24, color: 'var(--color-text-secondary)' }}>
            You scored{' '}
            <strong style={{ color: 'var(--color-accent)' }}>{score}%</strong>
            {' '}— {correct} out of {questions.length} questions correct.
          </p>
          {score < 70 && (
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: 24 }}>
              A score of 70 % or higher marks this module complete. Review the lessons and try again!
            </p>
          )}
          <button
            className="btn btn-ghost"
            onClick={() => {
              setCurrentIndex(0);
              setSelectedAnswer(null);
              setAnswered(false);
              setAnswers([]);
              setFinished(false);
            }}
            id="btn-retake-quiz"
          >
            🔄 Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  // ── Question screen ────────────────────────────────────────────────────
  const typeLabel: Record<QuizQuestion['type'], string> = {
    'multiple-choice': '📝 Multiple Choice',
    'predict-output': '🔮 Predict Output',
    'find-error': '🐛 Find the Error',
    'fill-code': '✍️ Fill in Code',
  };

  return (
    <div className="quiz-card animate-scale">
      {/* Progress dots */}
      <div className="quiz-progress">
        {questions.map((_, i) => (
          <div
            key={i}
            className={`quiz-progress-dot ${
              i < answers.length
                ? answers[i] ? 'correct' : 'wrong'
                : i === currentIndex ? 'active' : ''
            }`}
          />
        ))}
      </div>

      {/* Meta */}
      <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        Question {currentIndex + 1} of {questions.length}
        <span style={{ marginLeft: 8, color: 'var(--color-accent)' }}>{typeLabel[question.type]}</span>
      </div>

      {/* Question text */}
      <div className="quiz-question">{question.question}</div>

      {/* Optional code block */}
      {question.code && <div className="quiz-code">{question.code}</div>}

      {/* Options */}
      {question.options && (
        <div className="quiz-options">
          {question.options.map((option, i) => (
            <button
              key={i}
              className={`quiz-option ${
                !answered
                  ? selectedAnswer === i ? 'selected' : ''
                  : i === question.correctAnswer ? 'correct'
                  : selectedAnswer === i ? 'wrong' : ''
              } ${answered ? 'disabled' : ''}`}
              onClick={() => handleSelect(i)}
              id={`quiz-option-${i}`}
            >
              <span style={{ marginRight: 8, opacity: 0.6, fontFamily: 'var(--font-sans)' }}>
                {String.fromCharCode(65 + i)}.
              </span>
              {option}
            </button>
          ))}
        </div>
      )}

      {/* Explanation */}
      {answered && (
        <div className={`quiz-explanation ${isCorrect ? 'correct-exp' : 'wrong-exp'} animate-fade`}>
          <strong>{isCorrect ? '✅ Correct!' : '❌ Not quite.'}</strong>
          <p style={{ marginTop: 6, marginBottom: 0, fontSize: '0.875rem' }}>{question.explanation}</p>
        </div>
      )}

      {/* Next */}
      {answered && (
        <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn btn-primary" onClick={handleNext} id="btn-quiz-next">
            {currentIndex + 1 < questions.length ? 'Next Question →' : 'See Results'}
          </button>
        </div>
      )}
    </div>
  );
}
