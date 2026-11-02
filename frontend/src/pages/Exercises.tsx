import { useState } from 'react';
import { practiceExercises } from '../data/curriculum';
import CodeEditor from '../components/editor';
import type { Exercise } from '../data/curriculum';

const DIFFICULTIES = ['all', 'beginner', 'easy', 'intermediate', 'advanced'] as const;

interface ExercisesProps {
  onNavigate: (page: string, lessonId?: string, moduleId?: string) => void;
}

export default function Exercises({ onNavigate: _onNavigate }: ExercisesProps) {
  const [filter, setFilter] = useState<typeof DIFFICULTIES[number]>('all');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  const filtered = filter === 'all'
    ? practiceExercises
    : practiceExercises.filter(e => e.difficulty === filter);

  if (selectedExercise) {
    return (
      <div className="page animate-fade">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <button className="btn btn-ghost btn-sm" onClick={() => setSelectedExercise(null)}>
            ← Back to Exercises
          </button>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700 }}>{selectedExercise.title}</h2>
          <span className={`difficulty-badge difficulty-${selectedExercise.difficulty}`}>
            {selectedExercise.difficulty}
          </span>
        </div>

        <div style={{ maxWidth: '900px' }}>
          {/* Description */}
          <div className="card" style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '10px' }}>📋 Problem Statement</h3>
            <p style={{ whiteSpace: 'pre-line', fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: 0 }}>
              {selectedExercise.description}
            </p>
            {selectedExercise.concepts.length > 0 && (
              <div style={{ marginTop: '12px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Concepts:</span>
                {selectedExercise.concepts.map(c => (
                  <span key={c} className="tag">{c}</span>
                ))}
              </div>
            )}
          </div>

          {/* Test Cases preview */}
          <div className="card" style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '10px' }}>🧪 Test Cases</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {selectedExercise.testCases.map(tc => (
                <div key={tc.id} style={{ display: 'flex', gap: '10px', fontSize: '0.85rem', padding: '8px 12px', background: 'var(--color-surface-2)', borderRadius: '8px' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>TC:</span>
                  <span style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>{tc.description}</span>
                  {tc.expectedOutput && (
                    <>
                      <span style={{ color: 'var(--color-text-muted)' }}>→</span>
                      <code style={{ background: 'var(--color-success-light)', color: 'var(--color-success)', border: 'none', padding: '0 6px', borderRadius: '4px' }}>
                        {tc.expectedOutput}
                      </code>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Editor */}
          <CodeEditor
            initialCode={selectedExercise.starterCode}
            exercise={selectedExercise}
            height="280px"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="page animate-fade">
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ marginBottom: '8px' }}>Practice Exercises</h1>
        <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', marginBottom: '20px' }}>
          Sharpen your skills with hands-on Python exercises. Each exercise includes automated test cases, hints, and solutions.
        </p>

        {/* Filter */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {DIFFICULTIES.map(d => (
            <button
              key={d}
              className={`btn btn-sm ${filter === d ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setFilter(d)}
              id={`filter-${d}`}
              style={{ textTransform: 'capitalize' }}
            >
              {d === 'all' ? '📚 All' : d}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
        {filtered.map(ex => (
          <div
            key={ex.id}
            className="card card-hover"
            style={{ cursor: 'pointer' }}
            onClick={() => setSelectedExercise(ex)}
            id={`exercise-${ex.id}`}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, lineHeight: 1.3 }}>{ex.title}</h3>
              <span className={`difficulty-badge difficulty-${ex.difficulty}`} style={{ flexShrink: 0, marginLeft: '8px' }}>
                {ex.difficulty}
              </span>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '14px', lineHeight: 1.5, whiteSpace: 'pre-line' }}>
              {ex.description.length > 120 ? ex.description.slice(0, 120) + '…' : ex.description}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {ex.concepts.slice(0, 3).map(c => (
                  <span key={c} className="tag">{c}</span>
                ))}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                {ex.testCases.length} test{ex.testCases.length !== 1 ? 's' : ''}
                · {ex.hints.length} hint{ex.hints.length !== 1 ? 's' : ''}
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="empty-state" style={{ gridColumn: '1/-1' }}>
            <div className="empty-state-icon">🔍</div>
            <h3>No exercises found</h3>
            <p>Try a different difficulty filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
