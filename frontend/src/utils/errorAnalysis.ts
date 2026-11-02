/**
 * Analyze a Python error message and return a beginner-friendly explanation.
 * This is a rule-based analyzer that covers the most common Python errors.
 */
export function analyzeError(error: string, code: string): string {
  if (!error) return '';

  const lines = code.split('\n');

  // SyntaxError: missing parenthesis
  if (error.includes('SyntaxError') && error.includes('EOF') && error.includes('parenthes')) {
    return '🔍 **Missing parenthesis**: You have an opening `(` without a closing `)`. Check your `print()` and function calls.';
  }

  // SyntaxError: missing colon
  if (error.includes('SyntaxError') && error.includes("expected ':'")) {
    return '🔍 **Missing colon**: Python requires a colon `:` at the end of `if`, `elif`, `else`, `for`, `while`, `def`, and `class` statements.';
  }

  // IndentationError
  if (error.includes('IndentationError')) {
    return '🔍 **Indentation error**: Python uses indentation (spaces) to define code blocks. Make sure code inside `if`/`for`/`while`/`def` is indented with 4 spaces.';
  }

  // NameError
  if (error.includes('NameError') && error.includes('not defined')) {
    const match = error.match(/name '(\w+)' is not defined/);
    const varName = match ? match[1] : 'a variable';
    return `🔍 **NameError**: \`${varName}\` is not defined. Did you forget to create this variable before using it? Variable names are case-sensitive.`;
  }

  // TypeError: string + number
  if (error.includes('TypeError') && error.includes('can only concatenate str')) {
    return '🔍 **TypeError**: You\'re trying to combine a string with a number using `+`. Convert the number to a string first with `str(number)`, or use an f-string: `f"text {number}"`';
  }

  // ZeroDivisionError
  if (error.includes('ZeroDivisionError')) {
    return '🔍 **Division by zero**: You\'re dividing by zero, which is mathematically undefined. Add a check: `if divisor != 0:` before dividing.';
  }

  // IndexError
  if (error.includes('IndexError')) {
    return '🔍 **IndexError**: You\'re trying to access a list index that doesn\'t exist. Remember: list indices start at 0. A list with 5 items has indices 0–4.';
  }

  // ValueError: int conversion
  if (error.includes('ValueError') && error.includes('int()')) {
    return '🔍 **ValueError**: You\'re trying to convert a non-number string to an integer. `int()` only works with strings that contain valid numbers like `"42"`, not words.';
  }

  // AttributeError
  if (error.includes('AttributeError')) {
    const match = error.match(/has no attribute '(\w+)'/);
    const attr = match ? match[1] : 'the method';
    return `🔍 **AttributeError**: \`${attr}\` doesn't exist on this type. Check for typos in the method name or make sure you're calling it on the right type of variable.`;
  }

  // KeyError
  if (error.includes('KeyError')) {
    return '🔍 **KeyError**: You\'re trying to access a dictionary key that doesn\'t exist. Use `dict.get(key)` to safely access a key, or check with `if key in dict:`.';
  }

  // Timeout
  if (error.includes('timed out') || error.includes('Execution timed out')) {
    return '🔍 **Timeout**: Your code took too long to run. This usually means you have an infinite loop. Check that your `while` loop conditions will eventually become `False`, and that you\'re updating the loop variable.';
  }

  // Extract line number from traceback
  const lineMatch = error.match(/line (\d+)/);
  if (lineMatch) {
    const lineNum = parseInt(lineMatch[1]);
    const problemLine = lines[lineNum - 1];
    if (problemLine) {
      return `🔍 **Error on line ${lineNum}**: \`${problemLine.trim()}\`\n\n${error.split('\n').slice(-2).join('\n')}`;
    }
  }

  // Generic fallback
  return `🔍 ${error.split('\n').slice(-3).join('\n')}`;
}

/**
 * Normalize output for comparison (trim whitespace, normalize newlines)
 */
export function normalizeOutput(output: string): string {
  return output
    .trim()
    .replace(/\r\n/g, '\n')
    .replace(/\s+$/gm, '');
}
