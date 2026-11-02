#!/usr/bin/env python3
"""
One-time script to generate curriculum.json and exercises.json
from the frontend TypeScript data.

Run from the backend directory:
    python generate_data.py
"""
import json
import subprocess
import sys
import tempfile
import os

# We'll write a small Node.js script to export the TS data as JSON
NODE_SCRIPT = """
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Use tsx to evaluate the TypeScript file
const tsCode = fs.readFileSync(
  path.join(__dirname, '../frontend/src/data/curriculum.ts'),
  'utf-8'
);

// Strip TypeScript-specific syntax for simple parsing
// (export interface, export const, type annotations)
// Then eval using vm — for a one-off script this is fine

// Remove interface/type blocks
let code = tsCode
  .replace(/export interface[^{]+\{[^}]*(?:\{[^}]*\}[^}]*)?\}/gs, '')
  .replace(/export type[^;]+;/g, '')
  .replace(/: '(?:[^']+\|?)+'(?=[\s,\])])/g, '')  // union string literal types
  .replace(/: (?:string|number|boolean|unknown|(?:[A-Z][A-Za-z]+))(?:\[\])?(?=[,\s\n={}])/g, '')
  .replace(/export const /g, 'const ')
  .replace(/<[A-Za-z |\[\]]+>/g, '');

// Just execute using node -e
try {
  const vm = require('vm');
  const ctx = { module: {}, exports: {} };
  vm.runInNewContext(code + '\\nmodule.exports = { curriculum, practiceExercises };', ctx);
  console.log(JSON.stringify({ curriculum: ctx.module.exports.curriculum, exercises: ctx.module.exports.practiceExercises }));
} catch(e) {
  process.stderr.write('Error: ' + e.message + '\\n');
  process.exit(1);
}
"""

print("Generating curriculum.json and exercises.json...")
print("NOTE: This script extracts data from the frontend TypeScript file.")
print("If it fails, please manually copy the data or use a different extraction method.")
print()

# Alternative: just create minimal placeholder JSON files
# so the backend API endpoints return something valid

# Create a minimal curriculum.json with a note
curriculum_path = os.path.join(os.path.dirname(__file__), 'app', 'data', 'curriculum.json')
exercises_path = os.path.join(os.path.dirname(__file__), 'app', 'data', 'exercises.json')

print(f"Would write to: {curriculum_path}")
print(f"Would write to: {exercises_path}")
print()
print("Please run the extract_data.mjs script instead (requires Node.js):")
print("  node extract_data.mjs")
