// extract_data.mjs — run with: node extract_data.mjs
// Extracts curriculum and exercises from the TypeScript source and writes
// them as JSON files for the FastAPI backend.
import { readFileSync, writeFileSync } from 'fs';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcPath = path.join(__dirname, '..', 'frontend', 'src', 'data', 'curriculum.ts');
const outCurriculum = path.join(__dirname, 'app', 'data', 'curriculum.json');
const outExercises = path.join(__dirname, 'app', 'data', 'exercises.json');

let src = readFileSync(srcPath, 'utf-8');

// Strip TypeScript-specific constructs so Node.js can evaluate it
src = src
  // Remove export interface / type blocks
  .replace(/export\s+interface\s+\w+\s*\{[\s\S]*?\n\}/g, '')
  // Remove export type lines
  .replace(/export\s+type\s+\w+[\s\S]*?;/g, '')
  // Convert export const → const  
  .replace(/export const /g, 'const ')
  // Remove TypeScript generic type parameters like <Type>
  .replace(/<[A-Za-z\[\] |]+>/g, '')
  // Remove type annotations like ": string", ": number", ": boolean", ": unknown"
  // applied to properties — careful to not break string values
  .replace(/:\s*(?:string|number|boolean|unknown|any)\s*(?=[\s,;\)\}])/g, '')
  // Remove explicit array types like ": Foo[]"
  .replace(/:\s*[A-Z][A-Za-z]+\[\]/g, '')
  // Remove explicit object types like ": Foo"
  .replace(/:\s*[A-Z][A-Za-z]+(?=[\s,;\)\}])/g, '');

// Evaluate in a function scope
const fn = new Function('require', src + '\nreturn { curriculum, practiceExercises };');
let result;
try {
  result = fn(createRequire(import.meta.url));
} catch (e) {
  console.error('Evaluation error:', e.message);
  process.exit(1);
}

const { curriculum, practiceExercises } = result;

writeFileSync(outCurriculum, JSON.stringify(curriculum, null, 2));
writeFileSync(outExercises, JSON.stringify(practiceExercises, null, 2));

console.log(`✅ Wrote ${curriculum.length} modules to ${outCurriculum}`);
console.log(`✅ Wrote ${practiceExercises.length} exercises to ${outExercises}`);
