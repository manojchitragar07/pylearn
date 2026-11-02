import { useState } from 'react';
import CodeEditor from '../components/editor';

const PLAYGROUND_EXAMPLES = [
  {
    label: 'Hello World',
    code: `# Your first Python program
print("Hello, World!")
print("Welcome to PyLearn!")
print("Python is awesome!")`,
  },
  {
    label: 'Variables',
    code: `# Variables and data types
name = "Alice"
age = 25
height = 5.6
is_student = True

print(f"Name: {name}")
print(f"Age: {age}")
print(f"Height: {height}")
print(f"Is student: {is_student}")
print(f"Type of age: {type(age)}")`,
  },
  {
    label: 'Calculator',
    code: `# Simple calculator
a = 15
b = 4

print(f"{a} + {b} = {a + b}")
print(f"{a} - {b} = {a - b}")
print(f"{a} * {b} = {a * b}")
print(f"{a} / {b} = {a / b:.2f}")
print(f"{a} // {b} = {a // b}")
print(f"{a} % {b} = {a % b}")
print(f"{a} ** {b} = {a ** b}")`,
  },
  {
    label: 'Conditions',
    code: `# Conditional statements
score = 82

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
elif score >= 60:
    grade = "D"
else:
    grade = "F"

print(f"Score: {score}")
print(f"Grade: {grade}")
print("Passed!" if score >= 60 else "Failed")`,
  },
  {
    label: 'Loops',
    code: `# for loops and while loops
print("Counting with for loop:")
for i in range(1, 6):
    print(f"  {i}")

print("\\nSquares of 1-5:")
for n in range(1, 6):
    print(f"  {n}² = {n**2}")

print("\\nFibonacci sequence:")
a, b = 0, 1
while a < 50:
    print(f"  {a}", end=" ")
    a, b = b, a + b
print()`,
  },
  {
    label: 'Lists',
    code: `# Working with lists
numbers = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3]

print("Original:", numbers)
print("Sorted:", sorted(numbers))
print("Max:", max(numbers))
print("Min:", min(numbers))
print("Sum:", sum(numbers))
print("Length:", len(numbers))
print("Count of 5:", numbers.count(5))
print("Unique:", sorted(set(numbers)))`,
  },
  {
    label: 'Functions',
    code: `# Functions
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}! 👋"

def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True

print(greet("Alice"))
print(greet("Bob", "Hi"))

print("\\nPrime numbers up to 30:")
primes = [n for n in range(2, 31) if is_prime(n)]
print(primes)`,
  },
  {
    label: 'String Methods',
    code: `# String manipulation
sentence = "  Python Programming is FUN!  "

print("Original:", repr(sentence))
print("Stripped:", sentence.strip())
print("Lower:", sentence.strip().lower())
print("Upper:", sentence.strip().upper())
print("Title:", sentence.strip().title())
print("Words:", sentence.strip().split())
print("Replace:", sentence.strip().replace("FUN", "AMAZING"))
print("Starts with 'Python':", sentence.strip().startswith("Python"))

# f-strings
pi = 3.14159
print(f"\\nPi = {pi:.4f}")
print(f"Pi = {pi:10.3f}")`,
  }
];

export default function Playground() {
  const [selectedExample, setSelectedExample] = useState(0);
  const [code, setCode] = useState(PLAYGROUND_EXAMPLES[0].code);

  const handleExampleSelect = (index: number) => {
    setSelectedExample(index);
    setCode(PLAYGROUND_EXAMPLES[index].code);
  };

  return (
    <div className="page animate-fade" style={{ maxWidth: '100%', padding: '24px 32px' }}>
      <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ marginBottom: '6px' }}>🐍 Python Playground</h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: 0 }}>
            A free-form Python editor. Write, run, and experiment with Python code directly in your browser.
          </p>
        </div>
        <div style={{ background: 'var(--color-success-light)', border: '1px solid var(--color-success-border)', borderRadius: '10px', padding: '8px 14px', fontSize: '0.8rem', color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span>⚡</span>
          <span>Python 3.11 running in your browser via Pyodide</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '20px', alignItems: 'flex-start' }}>
        {/* Examples sidebar */}
        <div className="card" style={{ padding: '16px' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-muted)', marginBottom: '12px' }}>
            📂 Examples
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {PLAYGROUND_EXAMPLES.map((ex, i) => (
              <button
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 10px',
                  borderRadius: '8px',
                  background: selectedExample === i ? 'var(--color-accent-light)' : 'transparent',
                  color: selectedExample === i ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                  fontWeight: selectedExample === i ? 600 : 400,
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  textAlign: 'left',
                  transition: 'all 0.15s',
                  width: '100%'
                }}
                onClick={() => handleExampleSelect(i)}
                id={`example-${i}`}
                onMouseEnter={e => { if (selectedExample !== i) e.currentTarget.style.background = 'var(--color-surface-2)'; }}
                onMouseLeave={e => { if (selectedExample !== i) e.currentTarget.style.background = 'transparent'; }}
              >
                {ex.label}
              </button>
            ))}
          </div>

          <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--color-border)' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-muted)', marginBottom: '10px' }}>
              ℹ️ About Pyodide
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: 0 }}>
              Your code runs locally in the browser using Pyodide — a full Python 3.11 runtime compiled to WebAssembly.
              <br /><br />
              <strong>Available:</strong> math, random, re, json, datetime, collections, itertools, and most standard library modules.
              <br /><br />
              <strong>Not available:</strong> os file access, network requests, third-party packages like numpy or pandas.
            </p>
          </div>
        </div>

        {/* Editor */}
        <div>
          <CodeEditor
            key={selectedExample}
            initialCode={code}
            onCodeChange={setCode}
            showSubmit={false}
            height="400px"
          />
        </div>
      </div>
    </div>
  );
}
