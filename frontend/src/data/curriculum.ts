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

export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'predict-output' | 'find-error' | 'fill-code';
  question: string;
  code?: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
}

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
  lineByLine: { line: string; explanation: string }[];
  expectedOutput: string;
  starterCode: string;
  commonMistakes: { mistake: string; explanation: string; fix: string }[];
  exercise: Exercise;
  prerequisites: string[];
  estimatedMinutes: number;
  tags: string[];
}

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

export const curriculum: Module[] = [
  {
    id: 'module-1',
    order: 1,
    title: 'Getting Started',
    description: 'Discover what programming is and write your very first Python program.',
    icon: '🚀',
    color: '#6366f1',
    quiz: [
      {
        id: 'q1-1',
        type: 'multiple-choice',
        question: 'What does the print() function do in Python?',
        options: ['Prints a document', 'Displays text or values on the screen', 'Saves data to a file', 'Calculates a result'],
        correctAnswer: 1,
        explanation: 'The print() function displays text, numbers, or any value to the console (screen). It is one of the most commonly used functions in Python.'
      },
      {
        id: 'q1-2',
        type: 'predict-output',
        question: 'What will this code output?',
        code: 'print("Hello")\nprint("World")',
        options: ['Hello World', 'Hello\nWorld', '"Hello"\n"World"', 'Error'],
        correctAnswer: 1,
        explanation: 'Each print() statement outputs on a new line by default. So "Hello" appears on the first line and "World" on the second.'
      },
      {
        id: 'q1-3',
        type: 'find-error',
        question: 'What is wrong with this code?',
        code: 'print("Hello World"',
        options: ['The quotes are wrong', 'A closing parenthesis ) is missing', 'print should be PRINT', 'Nothing is wrong'],
        correctAnswer: 1,
        explanation: 'Python\'s print() function requires matching opening and closing parentheses. The closing ) is missing here.'
      }
    ],
    lessons: [
      {
        id: 'lesson-1-1',
        moduleId: 'module-1',
        order: 1,
        title: 'What is Programming?',
        objective: 'Understand what programming is and why it matters in everyday life.',
        explanation: `Programming is simply giving instructions to a computer. Computers are incredibly fast and precise — but they need very clear, step-by-step instructions to do anything useful.

Think of programming as writing a recipe for a computer. A recipe tells a chef exactly what to do: gather ingredients, mix them in the right order, apply heat, and serve. A program tells a computer exactly what to do: receive input, process it, and produce output.

Python is one of the best first languages to learn because its syntax reads almost like English. You don't need to memorize dozens of symbols or complex rules to get started.`,
        analogy: `Imagine you have a very obedient but very literal robot assistant. If you say "make me a sandwich," the robot won't know what to do — it needs exact instructions: "Take two slices of bread. Spread butter on one side of each. Place a slice of cheese on one piece. Press them together." Programming is writing those exact instructions — but for a computer instead of a robot.`,
        exampleCode: `# This is my first Python program
print("Hello, World!")
print("I am learning Python!")
print("Programming is fun.")`,
        lineByLine: [
          { line: '# This is my first Python program', explanation: 'This is a comment. Python ignores anything after #. Comments help humans understand the code.' },
          { line: 'print("Hello, World!")', explanation: 'Calls the print() function to display the text "Hello, World!" on the screen.' },
          { line: 'print("I am learning Python!")', explanation: 'Displays another line of text.' },
          { line: 'print("Programming is fun.")', explanation: 'Displays a third line. Each print() starts on a new line.' }
        ],
        expectedOutput: `Hello, World!\nI am learning Python!\nProgramming is fun.`,
        syntax: `print("your text here")`,
        starterCode: `# Write your first Python program!
# Use print() to display your name and favorite hobby.
# Example: print("My name is Alex")

`,
        commonMistakes: [
          {
            mistake: 'print("Hello"',
            explanation: 'Missing the closing parenthesis. Python needs matching ( and ) for every function call.',
            fix: 'print("Hello")'
          },
          {
            mistake: 'Print("Hello")',
            explanation: 'Python is case-sensitive. "Print" with a capital P is not the same as "print" with a lowercase p.',
            fix: 'print("Hello")'
          },
          {
            mistake: "print('Hello\")",
            explanation: 'Mixing quote types. Start and end strings with the same type of quote.',
            fix: 'print("Hello") or print(\'Hello\')'
          }
        ],
        prerequisites: [],
        estimatedMinutes: 10,
        tags: ['print', 'basics', 'introduction'],
        exercise: {
          id: 'ex-1-1',
          title: 'Personal Introduction',
          description: 'Write a Python program that prints your name, your age, and your favorite subject — each on a separate line.',
          difficulty: 'beginner',
          starterCode: `# Print your name, age, and favorite subject
# Each on its own line using print()

`,
          solution: `print("My name is Alex")
print("I am 20 years old")
print("My favorite subject is Python")`,
          hints: [
            'Use the print() function for each piece of information.',
            'Put your text inside quotation marks: print("your text").',
            'You need three separate print() statements, one for each piece of information.'
          ],
          testCases: [
            {
              id: 'tc-1-1-1',
              description: 'Program should output at least 3 lines',
              type: 'contains',
              expectedOutput: '\n'
            }
          ],
          concepts: ['print', 'strings']
        }
      },
      {
        id: 'lesson-1-2',
        moduleId: 'module-1',
        order: 2,
        title: 'Understanding print() and Comments',
        objective: 'Use print() to display text and numbers, and write comments to explain your code.',
        explanation: `The print() function is your main tool for showing output. You can print text (called strings), numbers, and much more.

**Strings** are pieces of text. Always wrap them in quotes — either single quotes ('hello') or double quotes ("hello"). Both work the same way.

**Comments** start with a # symbol. Python completely ignores comments when running your code. Comments exist only for humans — they explain what the code does. Good programmers always write comments.

You can also print multiple things in one line by separating them with commas.`,
        analogy: `Comments are like sticky notes you put on your code. When you hand your recipe to someone else, your sticky notes help them understand why you added a pinch of salt at step 3. Python ignores them when cooking, but people find them incredibly helpful.`,
        exampleCode: `# Printing text (strings)
print("Hello, World!")

# Printing numbers
print(42)
print(3.14)

# Printing multiple things on one line
print("My age is", 25)
print("Pi is approximately", 3.14159)

# A comment explaining the next line
print("Python is awesome!")  # This prints on its own line`,
        lineByLine: [
          { line: '# Printing text (strings)', explanation: 'A comment — Python ignores this line.' },
          { line: 'print("Hello, World!")', explanation: 'Prints the string "Hello, World!" to the screen.' },
          { line: 'print(42)', explanation: 'Prints the number 42. Notice: no quotes needed for numbers.' },
          { line: 'print(3.14)', explanation: 'Prints a decimal number (called a float).' },
          { line: 'print("My age is", 25)', explanation: 'Prints text and a number together. The comma adds a space between them.' },
          { line: 'print("Python is awesome!")  # This prints on its own line', explanation: 'You can add a comment at the end of a line of code too.' }
        ],
        expectedOutput: `Hello, World!\n42\n3.14\nMy age is 25\nPi is approximately 3.14159\nPython is awesome!`,
        syntax: `print("text")           # print a string\nprint(42)               # print a number\nprint("text", number)   # print multiple values\n# This is a comment`,
        starterCode: `# Practice using print() with different types of data
# 1. Print a greeting message
# 2. Print your favorite number
# 3. Print both your name and age on one line using a comma

`,
        commonMistakes: [
          {
            mistake: 'print(Hello)',
            explanation: 'Hello without quotes is treated as a variable name, not text. If a variable called Hello doesn\'t exist, Python will throw an error.',
            fix: 'print("Hello") — always use quotes around text.'
          },
          {
            mistake: '#print("Hello")',
            explanation: 'If you put # at the start of a print() line, Python treats the whole line as a comment and skips it.',
            fix: 'Remove the # to make the code run: print("Hello")'
          }
        ],
        prerequisites: ['lesson-1-1'],
        estimatedMinutes: 12,
        tags: ['print', 'comments', 'strings', 'numbers'],
        exercise: {
          id: 'ex-1-2',
          title: 'Print Variety',
          description: 'Write a program that:\n1. Prints the text "Learning Python is great!"\n2. Prints the number 2024\n3. Prints your name and birth year on one line (separated by a comma in print)',
          difficulty: 'beginner',
          starterCode: `# Complete the three tasks using print()
# Task 1: Print "Learning Python is great!"

# Task 2: Print the number 2024

# Task 3: Print your name and birth year on one line

`,
          solution: `print("Learning Python is great!")
print(2024)
print("Alex", 2004)`,
          hints: [
            'For task 1, make sure to put the text inside quotes.',
            'For task 2, numbers don\'t need quotes: print(2024).',
            'For task 3, use a comma to print two values: print("Name", year).'
          ],
          testCases: [
            {
              id: 'tc-1-2-1',
              description: 'Should print "Learning Python is great!"',
              type: 'contains',
              expectedOutput: 'Learning Python is great!'
            },
            {
              id: 'tc-1-2-2',
              description: 'Should print the number 2024',
              type: 'contains',
              expectedOutput: '2024'
            }
          ],
          concepts: ['print', 'strings', 'numbers', 'comments']
        }
      }
    ]
  },
  {
    id: 'module-2',
    order: 2,
    title: 'Variables and Data Types',
    description: 'Store and work with different types of data using variables.',
    icon: '📦',
    color: '#8b5cf6',
    quiz: [
      {
        id: 'q2-1',
        type: 'multiple-choice',
        question: 'Which of the following is a valid variable name in Python?',
        options: ['2name', 'my-name', 'my_name', 'my name'],
        correctAnswer: 2,
        explanation: 'Variable names cannot start with a digit, cannot contain hyphens (which Python reads as minus), and cannot contain spaces. Underscores are fine!'
      },
      {
        id: 'q2-2',
        type: 'predict-output',
        question: 'What will this code output?',
        code: 'x = 10\ny = 3\nprint(x + y)',
        options: ['x + y', '10 + 3', '13', '103'],
        correctAnswer: 2,
        explanation: 'x holds the value 10 and y holds 3. x + y adds them together to get 13.'
      },
      {
        id: 'q2-3',
        type: 'find-error',
        question: 'What is wrong with this code?',
        code: 'age = input("Enter age: ")\nnew_age = age + 1\nprint(new_age)',
        options: ['input() is spelled wrong', 'age + 1 is wrong because input() returns a string, not a number', 'print() needs quotes', 'Nothing is wrong'],
        correctAnswer: 1,
        explanation: 'The input() function always returns a string (text), even if the user types a number. To do arithmetic, you must convert it: int(input("Enter age: ")).'
      }
    ],
    lessons: [
      {
        id: 'lesson-2-1',
        moduleId: 'module-2',
        order: 1,
        title: 'What are Variables?',
        objective: 'Create variables to store different types of data and use them in your programs.',
        explanation: `A **variable** is a named storage container that holds a value. Think of it as a labeled box where you can store information.

In Python, you create a variable simply by giving it a name and assigning a value using the = sign:

\`\`\`python
name = "Alice"
age = 25
height = 5.7
\`\`\`

Now, whenever you use the variable name in your code, Python substitutes the value stored inside it.

**Variable naming rules:**
- Use only letters, numbers, and underscores (_)
- Must start with a letter or underscore (not a number)
- No spaces — use_underscores_instead
- Case-sensitive: name and Name are different variables
- Avoid Python keywords like if, for, while, print`,
        analogy: `A variable is like a labeled jar on your kitchen shelf. You write "sugar" on the outside and put sugar inside. Whenever a recipe says "add sugar," you know exactly which jar to grab. You can also empty the jar and refill it with something else — that's called reassigning a variable.`,
        exampleCode: `# Creating variables
name = "Alice"
age = 25
height = 5.7
is_student = True

# Using variables
print("Name:", name)
print("Age:", age)
print("Height:", height)
print("Is student:", is_student)

# Updating a variable
age = 26
print("New age:", age)`,
        lineByLine: [
          { line: 'name = "Alice"', explanation: 'Creates a variable called name and stores the text "Alice" in it.' },
          { line: 'age = 25', explanation: 'Creates a variable called age and stores the number 25.' },
          { line: 'height = 5.7', explanation: 'Creates a variable called height and stores the decimal number 5.7.' },
          { line: 'is_student = True', explanation: 'Creates a variable called is_student and stores True (a boolean value).' },
          { line: 'print("Name:", name)', explanation: 'Prints the text "Name:" followed by the value stored in the name variable.' },
          { line: 'age = 26', explanation: 'Reassigns the age variable — now it holds 26 instead of 25.' }
        ],
        expectedOutput: `Name: Alice\nAge: 25\nHeight: 5.7\nIs student: True\nNew age: 26`,
        syntax: `variable_name = value\n\n# Examples\nname = "Alice"     # string\nage = 25           # integer\nheight = 5.7       # float\nis_happy = True    # boolean`,
        starterCode: `# Create variables for your personal information
# Then print each variable

name = ""      # Replace "" with your name
age =          # Replace with your age (no quotes needed for numbers)
city = ""      # Replace with your city name

# Print all three variables using print()
`,
        commonMistakes: [
          {
            mistake: '2name = "Alice"',
            explanation: 'Variable names cannot start with a digit. Python will show a SyntaxError.',
            fix: 'Use a letter or underscore first: name2 = "Alice" or person_name = "Alice"'
          },
          {
            mistake: 'my name = "Alice"',
            explanation: 'Variable names cannot contain spaces. Python reads "my" and "name" as two separate things.',
            fix: 'Use an underscore: my_name = "Alice"'
          },
          {
            mistake: 'Name = "Alice"\nprint(name)',
            explanation: 'Python is case-sensitive. "Name" and "name" are two different variables.',
            fix: 'Use the same capitalization consistently: name = "Alice" and print(name)'
          }
        ],
        prerequisites: ['lesson-1-2'],
        estimatedMinutes: 15,
        tags: ['variables', 'assignment', 'data types'],
        exercise: {
          id: 'ex-2-1',
          title: 'Store and Display Information',
          description: 'Create a program that:\n1. Creates a variable called `city` with the value "Mumbai"\n2. Creates a variable called `population` with the value 20000000\n3. Prints both variables in a sentence like: "Mumbai has a population of 20000000"',
          difficulty: 'beginner',
          starterCode: `# Create variables and print them in a sentence
city = 
population = 

print(city, "has a population of", population)`,
          solution: `city = "Mumbai"
population = 20000000

print(city, "has a population of", population)`,
          hints: [
            'City is a text value — wrap it in quotes: city = "Mumbai"',
            'Population is a number — no quotes needed: population = 20000000',
            'Use print() with commas to combine text and variables: print(city, "has a population of", population)'
          ],
          testCases: [
            {
              id: 'tc-2-1-1',
              description: 'Output should contain "Mumbai"',
              type: 'contains',
              expectedOutput: 'Mumbai'
            },
            {
              id: 'tc-2-1-2',
              description: 'Output should contain "20000000"',
              type: 'contains',
              expectedOutput: '20000000'
            }
          ],
          concepts: ['variables', 'strings', 'integers', 'print']
        }
      },
      {
        id: 'lesson-2-2',
        moduleId: 'module-2',
        order: 2,
        title: 'Data Types: int, float, str, bool',
        objective: 'Identify and use Python\'s four basic data types and convert between them.',
        explanation: `Python has four basic data types you'll use constantly:

**Integer (int)** — Whole numbers, positive or negative.
\`\`\`python
age = 25
temperature = -10
\`\`\`

**Float (float)** — Decimal numbers.
\`\`\`python
price = 9.99
pi = 3.14159
\`\`\`

**String (str)** — Text. Always enclosed in quotes.
\`\`\`python
name = "Alice"
greeting = 'Hello!'
\`\`\`

**Boolean (bool)** — Either True or False (exactly like that, capital first letter).
\`\`\`python
is_raining = False
is_logged_in = True
\`\`\`

You can check a variable's type using type():
\`\`\`python
print(type(42))       # <class 'int'>
print(type("Hello"))  # <class 'str'>
\`\`\`

**Type conversion** lets you change one type to another:
\`\`\`python
int("42")     # converts string "42" to integer 42
float("3.14") # converts string to float
str(100)      # converts number to string "100"
\`\`\``,
        analogy: `Data types are like different kinds of containers. A glass holds liquids (floats and ints — numbers). A book holds text (strings). A light switch is either on or off (booleans — True or False). You wouldn't store milk in a book, and you can't flip a glass like a switch — each container has a specific purpose.`,
        exampleCode: `# The four basic data types
age = 25           # int
price = 4.99       # float
name = "Bob"       # str
is_happy = True    # bool

# Checking types
print(type(age))       # <class 'int'>
print(type(price))     # <class 'float'>
print(type(name))      # <class 'str'>
print(type(is_happy))  # <class 'bool'>

# Type conversion
text_number = "42"
actual_number = int(text_number)   # now it's an integer
print(actual_number + 8)           # outputs 50

number = 100
text = str(number)                 # now it's a string
print("The number is " + text)     # outputs: The number is 100`,
        lineByLine: [
          { line: 'age = 25', explanation: 'Stores the integer 25 in age.' },
          { line: 'price = 4.99', explanation: 'Stores the float 4.99 in price.' },
          { line: 'name = "Bob"', explanation: 'Stores the string "Bob" in name.' },
          { line: 'is_happy = True', explanation: 'Stores the boolean True in is_happy.' },
          { line: 'print(type(age))', explanation: 'type() returns the data type of a variable. For 25, it shows <class \'int\'>.' },
          { line: 'actual_number = int(text_number)', explanation: 'int() converts the string "42" to the integer 42. Now you can do math with it.' },
          { line: 'print("The number is " + text)', explanation: 'Once number is converted to a string with str(), you can combine it with other text using +.' }
        ],
        expectedOutput: `<class 'int'>\n<class 'float'>\n<class 'str'>\n<class 'bool'>\n50\nThe number is 100`,
        syntax: `# Type checking\ntype(variable)\n\n# Type conversion\nint(value)    # to integer\nfloat(value)  # to float  \nstr(value)    # to string\nbool(value)   # to boolean`,
        starterCode: `# Experiment with data types
x = 10
y = "20"

# Try to add x and y directly — what happens?
# Fix it by converting y to an integer first

`,
        commonMistakes: [
          {
            mistake: 'print("My score is " + 95)',
            explanation: 'You cannot use + to combine a string and a number directly. Python doesn\'t know if you want to add or concatenate.',
            fix: 'print("My score is " + str(95)) or print("My score is", 95)'
          },
          {
            mistake: 'int("hello")',
            explanation: '"hello" cannot be converted to an integer because it isn\'t a number. Python will throw a ValueError.',
            fix: 'Only convert strings that actually contain numbers: int("42")'
          }
        ],
        prerequisites: ['lesson-2-1'],
        estimatedMinutes: 20,
        tags: ['data types', 'int', 'float', 'string', 'bool', 'type conversion'],
        exercise: {
          id: 'ex-2-2',
          title: 'Type Detective',
          description: 'Write a program that:\n1. Creates variables: score = "95", discount = "10.5", passed = "True"\n2. Converts score to an integer\n3. Converts discount to a float\n4. Prints the sum: score + 5 (should be 100)\n5. Prints the type of each converted variable',
          difficulty: 'easy',
          starterCode: `# Start with string versions
score = "95"
discount = "10.5"

# Convert score to integer and add 5
score_int = 
print("Score + 5 =", score_int + 5)

# Convert discount to float
discount_float = 
print("Discount:", discount_float)

# Print the types
print(type(score_int))
print(type(discount_float))`,
          solution: `score = "95"
discount = "10.5"

score_int = int(score)
print("Score + 5 =", score_int + 5)

discount_float = float(discount)
print("Discount:", discount_float)

print(type(score_int))
print(type(discount_float))`,
          hints: [
            'Use int() to convert score: score_int = int(score)',
            'Use float() to convert discount: discount_float = float(discount)',
            'Once converted, you can do arithmetic: score_int + 5'
          ],
          testCases: [
            {
              id: 'tc-2-2-1',
              description: 'Score + 5 should equal 100',
              type: 'contains',
              expectedOutput: '100'
            },
            {
              id: 'tc-2-2-2',
              description: 'Should show int type',
              type: 'contains',
              expectedOutput: "<class 'int'>"
            }
          ],
          concepts: ['type conversion', 'int', 'float', 'type()']
        }
      }
    ]
  },
  {
    id: 'module-3',
    order: 3,
    title: 'Operators',
    description: 'Perform calculations and comparisons using Python operators.',
    icon: '➕',
    color: '#10b981',
    quiz: [
      {
        id: 'q3-1',
        type: 'predict-output',
        question: 'What will this code output?',
        code: 'print(10 // 3)\nprint(10 % 3)',
        options: ['3.33\n1', '3\n1', '3.33\n3', '3\n3'],
        correctAnswer: 1,
        explanation: '// is floor division (gives the whole number result): 10 // 3 = 3. % is modulus (gives the remainder): 10 % 3 = 1 (because 3*3=9, remainder is 1).'
      },
      {
        id: 'q3-2',
        type: 'multiple-choice',
        question: 'What is the result of 2 ** 8 in Python?',
        options: ['16', '256', '128', '28'],
        correctAnswer: 1,
        explanation: '** is the exponentiation operator. 2 ** 8 means 2 to the power of 8, which equals 256.'
      }
    ],
    lessons: [
      {
        id: 'lesson-3-1',
        moduleId: 'module-3',
        order: 1,
        title: 'Arithmetic and Comparison Operators',
        objective: 'Perform calculations and compare values using Python operators.',
        explanation: `**Arithmetic operators** let you do math in Python:

| Operator | Meaning | Example | Result |
|----------|---------|---------|--------|
| + | Addition | 5 + 3 | 8 |
| - | Subtraction | 10 - 4 | 6 |
| * | Multiplication | 3 * 7 | 21 |
| / | Division | 15 / 4 | 3.75 |
| // | Floor division | 15 // 4 | 3 |
| % | Modulus (remainder) | 15 % 4 | 3 |
| ** | Exponentiation | 2 ** 10 | 1024 |

**Comparison operators** compare two values and return True or False:

| Operator | Meaning | Example | Result |
|----------|---------|---------|--------|
| == | Equal to | 5 == 5 | True |
| != | Not equal to | 5 != 3 | True |
| > | Greater than | 7 > 3 | True |
| < | Less than | 2 < 8 | True |
| >= | Greater than or equal | 5 >= 5 | True |
| <= | Less than or equal | 4 <= 6 | True |`,
        analogy: `Arithmetic operators are the math operations you learned in school — plus, minus, times, divide. Comparison operators are like questions: "Is 5 bigger than 3?" Python answers with True or False, just like you'd answer Yes or No.`,
        exampleCode: `# Arithmetic operators
a = 15
b = 4

print("Addition:", a + b)       # 19
print("Subtraction:", a - b)    # 11
print("Multiplication:", a * b) # 60
print("Division:", a / b)       # 3.75
print("Floor division:", a // b)# 3
print("Remainder:", a % b)      # 3
print("Power:", a ** 2)         # 225

# Comparison operators
x = 10
y = 20

print(x == y)   # False (10 is not equal to 20)
print(x != y)   # True  (10 is not equal to 20)
print(x < y)    # True  (10 is less than 20)
print(x >= 10)  # True  (10 is equal to 10)`,
        lineByLine: [
          { line: 'a = 15\nb = 4', explanation: 'Store two numbers in variables a and b.' },
          { line: 'print("Division:", a / b)', explanation: '/ always gives a float result: 15 / 4 = 3.75.' },
          { line: 'print("Floor division:", a // b)', explanation: '// discards the decimal and gives only the whole number: 15 // 4 = 3.' },
          { line: 'print("Remainder:", a % b)', explanation: '% gives the leftover after dividing: 15 = 4*3 + 3, so the remainder is 3.' },
          { line: 'print(x == y)', explanation: '== checks equality. 10 is not equal to 20, so this is False. Note: == is comparison, = is assignment!' }
        ],
        expectedOutput: `Addition: 19\nSubtraction: 11\nMultiplication: 60\nDivision: 3.75\nFloor division: 3\nRemainder: 3\nPower: 225\nFalse\nTrue\nTrue\nTrue`,
        syntax: `# Arithmetic\nresult = a + b  # add\nresult = a - b  # subtract\nresult = a * b  # multiply\nresult = a / b  # divide (float)\nresult = a // b # floor divide\nresult = a % b  # remainder\nresult = a ** b # power\n\n# Comparison (returns True or False)\na == b   # equal\na != b   # not equal\na > b    # greater than\na < b    # less than\na >= b   # greater or equal\na <= b   # less or equal`,
        starterCode: `# Calculate the following:
# 1. What is 17 divided by 5 (regular division)?
# 2. How many times does 5 go into 17 (floor division)?
# 3. What is the remainder when 17 is divided by 5?
# 4. Is 17 greater than 10?

`,
        commonMistakes: [
          {
            mistake: 'if x = 5:',
            explanation: 'Inside comparisons, use == (double equals) to check equality. Single = is for assignment.',
            fix: 'if x == 5:'
          },
          {
            mistake: 'print(10 / 0)',
            explanation: 'Division by zero is not allowed in Python. This will cause a ZeroDivisionError.',
            fix: 'Always check that the divisor is not zero before dividing.'
          }
        ],
        prerequisites: ['lesson-2-2'],
        estimatedMinutes: 18,
        tags: ['arithmetic', 'comparison', 'operators', 'math'],
        exercise: {
          id: 'ex-3-1',
          title: 'Simple Calculator',
          description: 'Write a program that:\n1. Stores two numbers: a = 17 and b = 5\n2. Prints the result of all 7 arithmetic operations\n3. Checks and prints: is a greater than b? is a equal to b?',
          difficulty: 'easy',
          starterCode: `a = 17
b = 5

# Print all arithmetic results
print("a + b =", a + b)
# Add the remaining 6 operations below:




# Compare a and b
print("a > b:", )
print("a == b:", )`,
          solution: `a = 17
b = 5

print("a + b =", a + b)
print("a - b =", a - b)
print("a * b =", a * b)
print("a / b =", a / b)
print("a // b =", a // b)
print("a % b =", a % b)
print("a ** b =", a ** b)

print("a > b:", a > b)
print("a == b:", a == b)`,
          hints: [
            'For subtraction use -, for multiplication use *, for division use /.',
            'For floor division use //, for modulus use %, for power use **.',
            'Comparison results are True or False: print("a > b:", a > b)'
          ],
          testCases: [
            {
              id: 'tc-3-1-1',
              description: 'Should print 22 for addition',
              type: 'contains',
              expectedOutput: '22'
            },
            {
              id: 'tc-3-1-2',
              description: 'Should print 3.4 for division',
              type: 'contains',
              expectedOutput: '3.4'
            },
            {
              id: 'tc-3-1-3',
              description: 'Should print True for a > b',
              type: 'contains',
              expectedOutput: 'True'
            }
          ],
          concepts: ['arithmetic operators', 'comparison operators']
        }
      }
    ]
  },
  {
    id: 'module-4',
    order: 4,
    title: 'Conditional Statements',
    description: 'Make decisions in your programs using if, elif, and else.',
    icon: '🔀',
    color: '#f59e0b',
    quiz: [
      {
        id: 'q4-1',
        type: 'predict-output',
        question: 'What will this code output?',
        code: 'score = 75\nif score >= 90:\n    print("A")\nelif score >= 75:\n    print("B")\nelse:\n    print("C")',
        options: ['A', 'B', 'C', 'B\nC'],
        correctAnswer: 1,
        explanation: 'score is 75. The first condition (score >= 90) is False. The second condition (score >= 75) is True, so "B" is printed. Once a condition is True, Python skips the remaining elif/else blocks.'
      },
      {
        id: 'q4-2',
        type: 'find-error',
        question: 'What is wrong with this code?',
        code: 'age = 18\nif age >= 18\n    print("Adult")',
        options: ['age should be a string', 'Missing colon after the if condition', 'print needs double quotes', 'The indentation is wrong'],
        correctAnswer: 1,
        explanation: 'Python requires a colon (:) at the end of every if condition. The code should be: if age >= 18:'
      }
    ],
    lessons: [
      {
        id: 'lesson-4-1',
        moduleId: 'module-4',
        order: 1,
        title: 'if, elif, and else',
        objective: 'Write programs that make decisions based on conditions using if, elif, and else.',
        explanation: `Conditional statements let your program make decisions. The most basic form is:

\`\`\`python
if condition:
    do something
\`\`\`

If the condition is True, Python runs the indented code below. If the condition is False, Python skips it.

For two options, use **else**:
\`\`\`python
if condition:
    do this if True
else:
    do this if False
\`\`\`

For multiple options, use **elif** (short for "else if"):
\`\`\`python
if condition1:
    ...
elif condition2:
    ...
elif condition3:
    ...
else:
    ...
\`\`\`

**Critical rule:** The code inside an if/elif/else block must be **indented** (shifted right) by 4 spaces. Indentation is how Python knows which code belongs to which block.`,
        analogy: `Conditional statements are like the decisions you make every morning. "If it's raining, take an umbrella. Otherwise, if it's sunny, wear sunglasses. Otherwise, just wear a jacket." Your brain evaluates each condition and takes the first path that matches. Python does exactly the same thing.`,
        exampleCode: `# Simple if
temperature = 35
if temperature > 30:
    print("It's hot today!")

# if-else
score = 65
if score >= 50:
    print("You passed!")
else:
    print("You need to study more.")

# if-elif-else
grade = 82
if grade >= 90:
    print("Grade: A")
elif grade >= 80:
    print("Grade: B")
elif grade >= 70:
    print("Grade: C")
elif grade >= 60:
    print("Grade: D")
else:
    print("Grade: F")`,
        lineByLine: [
          { line: 'if temperature > 30:', explanation: 'Checks if temperature is greater than 30. Note the colon (:) at the end — it is required!' },
          { line: '    print("It\'s hot today!")', explanation: 'This line is indented (4 spaces). It only runs when the condition above is True.' },
          { line: 'if score >= 50:', explanation: 'Checks if score is 50 or more.' },
          { line: 'else:', explanation: 'If the if condition was False, Python runs the code inside else instead.' },
          { line: 'elif grade >= 80:', explanation: 'Only checked if the previous if condition was False. Python evaluates conditions top to bottom and stops at the first True one.' }
        ],
        expectedOutput: `It's hot today!\nYou passed!\nGrade: B`,
        syntax: `if condition:\n    # runs if condition is True\nelif another_condition:\n    # runs if this condition is True\nelse:\n    # runs if no condition above was True`,
        starterCode: `# Check if a number is positive, negative, or zero
number = 7

# Write an if-elif-else to print:
# "Positive" if number > 0
# "Negative" if number < 0
# "Zero" if number is exactly 0

`,
        commonMistakes: [
          {
            mistake: 'if age >= 18\n    print("Adult")',
            explanation: 'Missing colon after the condition. Python requires : at the end of every if, elif, and else.',
            fix: 'if age >= 18:'
          },
          {
            mistake: 'if age >= 18:\nprint("Adult")',
            explanation: 'The print statement is not indented. Python uses indentation to group code inside the if block.',
            fix: 'if age >= 18:\n    print("Adult")  # 4 spaces of indentation'
          },
          {
            mistake: 'if score = 90:',
            explanation: 'Use == for comparison, not = (which is assignment). if score = 90 is a syntax error.',
            fix: 'if score == 90:'
          }
        ],
        prerequisites: ['lesson-3-1'],
        estimatedMinutes: 20,
        tags: ['if', 'elif', 'else', 'conditions', 'indentation'],
        exercise: {
          id: 'ex-4-1',
          title: 'Age Category Checker',
          description: 'Write a program that categorizes a person based on their age:\n- 0–12: "Child"\n- 13–17: "Teenager"\n- 18–64: "Adult"\n- 65+: "Senior"\n\nTest with age = 25.',
          difficulty: 'easy',
          starterCode: `age = 25

# Write your if-elif-else chain here
`,
          solution: `age = 25

if age >= 65:
    print("Senior")
elif age >= 18:
    print("Adult")
elif age >= 13:
    print("Teenager")
else:
    print("Child")`,
          hints: [
            'Start with the highest value (65+) first, or start from the lowest — both work but be careful about the logic.',
            'Remember to put a colon at the end of each if/elif/else: if age >= 65:',
            'The code inside each block must be indented with 4 spaces.'
          ],
          testCases: [
            {
              id: 'tc-4-1-1',
              description: 'Should print "Adult" for age 25',
              type: 'contains',
              expectedOutput: 'Adult'
            }
          ],
          concepts: ['if', 'elif', 'else', 'comparison operators']
        }
      }
    ]
  },
  {
    id: 'module-5',
    order: 5,
    title: 'Loops',
    description: 'Repeat actions efficiently using for and while loops.',
    icon: '🔄',
    color: '#ef4444',
    quiz: [
      {
        id: 'q5-1',
        type: 'predict-output',
        question: 'What will this code output?',
        code: 'for i in range(1, 5):\n    print(i)',
        options: ['1 2 3 4 5', '1\n2\n3\n4', '0\n1\n2\n3\n4', '1\n2\n3\n4\n5'],
        correctAnswer: 1,
        explanation: 'range(1, 5) generates numbers starting at 1 and stopping BEFORE 5, so it gives 1, 2, 3, 4. Each print is on its own line.'
      },
      {
        id: 'q5-2',
        type: 'find-error',
        question: 'This loop runs forever. How do you fix it?',
        code: 'count = 0\nwhile count < 5:\n    print(count)',
        options: ['Change while to for', 'Add count = count + 1 inside the loop', 'Change < to >', 'Remove the condition'],
        correctAnswer: 1,
        explanation: 'The loop condition (count < 5) never becomes False because count is never changed inside the loop. You must increment count: count += 1 (or count = count + 1).'
      }
    ],
    lessons: [
      {
        id: 'lesson-5-1',
        moduleId: 'module-5',
        order: 1,
        title: 'for Loops and range()',
        objective: 'Use for loops to repeat actions a specific number of times and iterate over sequences.',
        explanation: `A **loop** lets you repeat a block of code multiple times without writing it again and again.

A **for loop** is perfect when you know how many times you want to repeat something.

**Using range():**
- \`range(5)\` → 0, 1, 2, 3, 4 (5 numbers starting from 0)
- \`range(1, 6)\` → 1, 2, 3, 4, 5 (start at 1, stop before 6)
- \`range(0, 10, 2)\` → 0, 2, 4, 6, 8 (start at 0, stop before 10, step by 2)

**Iterating over a list:**
\`\`\`python
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)
\`\`\`

The variable after **for** (in this case, \`fruit\`) takes on each value in the sequence one at a time.`,
        analogy: `A for loop is like stamping a passport at customs. For each traveler in the queue, you stamp their passport. You repeat the exact same action (stamp) for each item (traveler) until there are no more in the line.`,
        exampleCode: `# Basic for loop with range
print("Counting from 1 to 5:")
for i in range(1, 6):
    print(i)

# Loop with a step
print("\\nEven numbers from 0 to 10:")
for i in range(0, 11, 2):
    print(i)

# Iterating over a list
fruits = ["apple", "banana", "cherry"]
print("\\nFruits:")
for fruit in fruits:
    print(fruit)

# Calculating a sum
total = 0
for i in range(1, 6):
    total = total + i
print("\\nSum of 1 to 5:", total)`,
        lineByLine: [
          { line: 'for i in range(1, 6):', explanation: 'Creates a loop. i takes values 1, 2, 3, 4, 5 one at a time. range(1, 6) starts at 1 and stops before 6.' },
          { line: '    print(i)', explanation: 'Indented 4 spaces — runs inside the loop. Prints the current value of i each iteration.' },
          { line: 'for i in range(0, 11, 2):', explanation: 'range(0, 11, 2) starts at 0, ends before 11, jumps by 2: 0, 2, 4, 6, 8, 10.' },
          { line: 'for fruit in fruits:', explanation: 'fruit takes each value from the fruits list: "apple", then "banana", then "cherry".' },
          { line: 'total = total + i', explanation: 'Adds the current value of i to total each loop iteration. After the loop, total = 1+2+3+4+5 = 15.' }
        ],
        expectedOutput: `Counting from 1 to 5:\n1\n2\n3\n4\n5\n\nEven numbers from 0 to 10:\n0\n2\n4\n6\n8\n10\n\nFruits:\napple\nbanana\ncherry\n\nSum of 1 to 5: 15`,
        syntax: `# Loop a fixed number of times\nfor i in range(n):\n    # code to repeat\n\n# Loop through a sequence\nfor item in sequence:\n    # code using item\n\n# range with start, stop, step\nfor i in range(start, stop, step):\n    # code`,
        starterCode: `# Task 1: Print the multiplication table of 7 (7x1 to 7x10)
# Hint: Use range(1, 11) and multiply each number by 7

# Task 2: Calculate the sum of all numbers from 1 to 100
# Hint: Create a total variable and add each number to it in the loop

`,
        commonMistakes: [
          {
            mistake: 'for i in range(1, 10):\nprint(i)',
            explanation: 'The print(i) is not indented, so it\'s not part of the loop. Python will only run it once after the loop ends.',
            fix: 'for i in range(1, 10):\n    print(i)  # indent with 4 spaces'
          },
          {
            mistake: 'for i in range(10, 1):',
            explanation: 'range(10, 1) is empty because Python counts up by default and 10 is already past 1. The loop won\'t run.',
            fix: 'Use range(1, 11) to count from 1 to 10, or range(10, 0, -1) to count down.'
          }
        ],
        prerequisites: ['lesson-4-1'],
        estimatedMinutes: 22,
        tags: ['for loop', 'range', 'iteration', 'loops'],
        exercise: {
          id: 'ex-5-1',
          title: 'Multiplication Table',
          description: 'Write a program that prints the complete multiplication table for the number 5 (5×1=5 through 5×10=50). Each line should look like: "5 x 1 = 5"',
          difficulty: 'easy',
          starterCode: `# Print the multiplication table of 5
# Format: "5 x 1 = 5", "5 x 2 = 10", etc.

for i in range(1, 11):
    result = 5 * i
    print("5 x", i, "=", result)`,
          solution: `for i in range(1, 11):
    result = 5 * i
    print("5 x", i, "=", result)`,
          hints: [
            'Use range(1, 11) to loop from 1 to 10.',
            'Inside the loop, calculate: result = 5 * i',
            'Print using: print("5 x", i, "=", result)'
          ],
          testCases: [
            {
              id: 'tc-5-1-1',
              description: 'Should print "5 x 1 = 5"',
              type: 'contains',
              expectedOutput: '5 x 1 = 5'
            },
            {
              id: 'tc-5-1-2',
              description: 'Should print "5 x 10 = 50"',
              type: 'contains',
              expectedOutput: '5 x 10 = 50'
            }
          ],
          concepts: ['for loop', 'range', 'arithmetic']
        }
      }
    ]
  },
  {
    id: 'module-6',
    order: 6,
    title: 'Data Structures',
    description: 'Organize and manage collections of data with lists, tuples, sets, and dictionaries.',
    icon: '🗂️',
    color: '#06b6d4',
    quiz: [
      {
        id: 'q6-1',
        type: 'predict-output',
        question: 'What will this code output?',
        code: 'nums = [10, 20, 30, 40, 50]\nprint(nums[1])\nprint(nums[-1])',
        options: ['10\n50', '20\n50', '10\n40', '20\n40'],
        correctAnswer: 1,
        explanation: 'List indexing starts at 0, so nums[1] is the second element (20). Negative indexing counts from the end, so nums[-1] is the last element (50).'
      }
    ],
    lessons: [
      {
        id: 'lesson-6-1',
        moduleId: 'module-6',
        order: 1,
        title: 'Lists',
        objective: 'Create, modify, and iterate over Python lists to manage collections of data.',
        explanation: `A **list** is an ordered collection of items. Lists can hold any type of data, and items can be added, removed, or changed.

Create a list using square brackets:
\`\`\`python
numbers = [1, 2, 3, 4, 5]
names = ["Alice", "Bob", "Charlie"]
mixed = [42, "hello", True, 3.14]
\`\`\`

**Indexing** — access items by their position (starting from 0):
\`\`\`python
names[0]   # "Alice" (first item)
names[-1]  # "Charlie" (last item)
\`\`\`

**Slicing** — get a portion of the list:
\`\`\`python
numbers[1:4]  # [2, 3, 4]
\`\`\`

**Common list methods:**
| Method | What it does |
|--------|-------------|
| append(x) | Add x to the end |
| insert(i, x) | Insert x at position i |
| remove(x) | Remove first occurrence of x |
| pop() | Remove and return the last item |
| sort() | Sort the list in place |
| len(list) | Get the number of items |`,
        analogy: `A list is like a numbered shopping list. You can have bread at position 1, milk at position 2, eggs at position 3. You can add new items, cross off items, or change "bread" to "sourdough bread." The order matters — position 1 is always first.`,
        exampleCode: `# Creating lists
fruits = ["apple", "banana", "cherry"]
scores = [85, 92, 78, 90, 88]

# Accessing items
print(fruits[0])   # apple
print(fruits[-1])  # cherry

# Slicing
print(scores[1:4]) # [92, 78, 90]

# Modifying lists
fruits.append("mango")
print(fruits)       # ['apple', 'banana', 'cherry', 'mango']

fruits.remove("banana")
print(fruits)       # ['apple', 'cherry', 'mango']

# Looping through a list
print("All scores:")
for score in scores:
    print(score)

# Useful functions
print("Number of scores:", len(scores))
print("Highest score:", max(scores))
print("Lowest score:", min(scores))
print("Total:", sum(scores))`,
        lineByLine: [
          { line: 'fruits = ["apple", "banana", "cherry"]', explanation: 'Creates a list with 3 string items.' },
          { line: 'print(fruits[0])', explanation: 'Index 0 is the first item. Lists start counting at 0, not 1.' },
          { line: 'print(fruits[-1])', explanation: 'Negative index -1 always refers to the last item, regardless of list length.' },
          { line: 'print(scores[1:4])', explanation: 'Slicing: takes items from index 1 up to (but not including) index 4.' },
          { line: 'fruits.append("mango")', explanation: 'append() adds a new item to the end of the list.' },
          { line: 'fruits.remove("banana")', explanation: 'remove() finds and removes the first occurrence of that value.' }
        ],
        expectedOutput: `apple\ncherry\n[92, 78, 90]\n['apple', 'banana', 'cherry', 'mango']\n['apple', 'cherry', 'mango']\nAll scores:\n85\n92\n78\n90\n88\nNumber of scores: 5\nHighest score: 92\nLowest score: 78\nTotal: 433`,
        syntax: `# Create\nmy_list = [item1, item2, item3]\n\n# Access\nmy_list[0]     # first item\nmy_list[-1]    # last item\nmy_list[1:3]   # items 1 and 2\n\n# Modify\nmy_list.append(item)        # add to end\nmy_list.insert(index, item) # add at position\nmy_list.remove(item)        # remove item\n\n# Info\nlen(my_list)   # count items\nmax(my_list)   # largest value\nmin(my_list)   # smallest value\nsum(my_list)   # sum (for numbers)`,
        starterCode: `# Create a list of 5 of your favorite movies
movies = []  # Add 5 movie titles here

# Print the first and last movie
# Print the total number of movies
# Add one more movie
# Print the updated list
`,
        commonMistakes: [
          {
            mistake: 'my_list[5]  # for a list of 5 items',
            explanation: 'A list with 5 items has indices 0, 1, 2, 3, 4. Index 5 does not exist, causing an IndexError.',
            fix: 'The last valid index is len(my_list) - 1. Use my_list[-1] for the last item.'
          },
          {
            mistake: 'fruits.append["mango"]',
            explanation: 'append is a method called with parentheses (), not square brackets [].',
            fix: 'fruits.append("mango")'
          }
        ],
        prerequisites: ['lesson-5-1'],
        estimatedMinutes: 25,
        tags: ['list', 'indexing', 'slicing', 'append', 'iteration'],
        exercise: {
          id: 'ex-6-1',
          title: 'Grade Manager',
          description: 'Write a program that:\n1. Creates a list of grades: [72, 88, 95, 61, 77, 84]\n2. Prints the highest grade\n3. Prints the lowest grade\n4. Calculates and prints the average grade\n5. Adds a new grade of 91 to the list\n6. Prints the new list length',
          difficulty: 'easy',
          starterCode: `grades = [72, 88, 95, 61, 77, 84]

# Print highest, lowest
print("Highest:", max(grades))
print("Lowest:", )

# Calculate average (sum / count)
average = 
print("Average:", average)

# Add 91 to the list

print("New count:", )`,
          solution: `grades = [72, 88, 95, 61, 77, 84]

print("Highest:", max(grades))
print("Lowest:", min(grades))

average = sum(grades) / len(grades)
print("Average:", average)

grades.append(91)
print("New count:", len(grades))`,
          hints: [
            'Use min(grades) for the lowest grade.',
            'Average = sum(grades) / len(grades).',
            'Use grades.append(91) to add a new grade.'
          ],
          testCases: [
            {
              id: 'tc-6-1-1',
              description: 'Should print highest grade 95',
              type: 'contains',
              expectedOutput: 'Highest: 95'
            },
            {
              id: 'tc-6-1-2',
              description: 'Should print new count 7',
              type: 'contains',
              expectedOutput: '7'
            }
          ],
          concepts: ['list', 'max', 'min', 'sum', 'len', 'append']
        }
      }
    ]
  },
  {
    id: 'module-7',
    order: 7,
    title: 'Strings',
    description: 'Master text manipulation with Python\'s powerful string methods and formatting.',
    icon: '📝',
    color: '#ec4899',
    quiz: [
      {
        id: 'q7-1',
        type: 'predict-output',
        question: 'What will this code output?',
        code: 'name = "python"\nprint(name.upper())\nprint(name.capitalize())\nprint(len(name))',
        options: ['PYTHON\nPython\n6', 'python\nPython\n6', 'PYTHON\nPYTHON\n6', 'PYTHON\nPython\n5'],
        correctAnswer: 0,
        explanation: 'upper() converts all letters to uppercase (PYTHON). capitalize() makes only the first letter uppercase (Python). len("python") counts 6 characters.'
      }
    ],
    lessons: [
      {
        id: 'lesson-7-1',
        moduleId: 'module-7',
        order: 1,
        title: 'String Methods and f-strings',
        objective: 'Use string methods to manipulate text and f-strings to format output elegantly.',
        explanation: `Strings have many built-in methods that let you manipulate text without writing complex code.

**Common string methods:**
| Method | What it does | Example |
|--------|-------------|---------|
| upper() | All uppercase | "hello".upper() → "HELLO" |
| lower() | All lowercase | "HELLO".lower() → "hello" |
| capitalize() | First letter uppercase | "hello world".capitalize() → "Hello world" |
| strip() | Remove leading/trailing spaces | "  hi  ".strip() → "hi" |
| replace(a,b) | Replace text | "hello".replace("l","r") → "herro" |
| split(sep) | Split into a list | "a,b,c".split(",") → ["a","b","c"] |
| find(sub) | Find substring position | "hello".find("ll") → 2 |
| startswith(s) | Check prefix | "hello".startswith("he") → True |

**f-strings** (formatted string literals) are the modern, clean way to embed variables in strings:
\`\`\`python
name = "Alice"
age = 25
print(f"My name is {name} and I am {age} years old.")
\`\`\`

The f before the quote makes it an f-string. Inside \`{}\`, you can put any variable or expression.`,
        analogy: `String methods are like word-processing tools. upper() is like pressing Caps Lock. strip() is like the "Trim whitespace" button. replace() is like Find & Replace. f-strings are like a form letter where you fill in the blanks: "Dear {name}, your order {order_id} has shipped."`,
        exampleCode: `# String methods
message = "  Hello, Python World!  "
print(message.strip())          # removes extra spaces
print(message.strip().lower())  # all lowercase
print(message.strip().upper())  # all uppercase

text = "banana"
print(text.replace("a", "o"))  # bononono
print(text.find("nan"))        # 1 (index of "nan")
print(text.count("a"))         # 3

# Splitting a string
csv = "Alice,Bob,Charlie,Diana"
names = csv.split(",")
print(names)                    # ['Alice', 'Bob', 'Charlie', 'Diana']

# f-strings (best way to format output)
name = "Alice"
age = 28
score = 92.5
print(f"Name: {name}")
print(f"{name} is {age} years old")
print(f"Score: {score:.1f}%")   # 1 decimal place`,
        lineByLine: [
          { line: 'print(message.strip())', explanation: 'strip() removes leading and trailing whitespace (spaces, tabs, newlines).' },
          { line: 'print(text.replace("a", "o"))', explanation: 'Replaces every "a" with "o" in the string.' },
          { line: 'names = csv.split(",")', explanation: 'Splits the string at every comma, creating a list of substrings.' },
          { line: 'print(f"Name: {name}")', explanation: 'f-string: the f before the quote enables variable embedding. {name} is replaced with the value of name.' },
          { line: 'print(f"Score: {score:.1f}%")', explanation: ':.1f formats the number with exactly 1 decimal place.' }
        ],
        expectedOutput: `Hello, Python World!\nhello, python world!\nHELLO, PYTHON WORLD!\nbononono\n1\n3\n['Alice', 'Bob', 'Charlie', 'Diana']\nName: Alice\nAlice is 28 years old\nScore: 92.5%`,
        syntax: `# String methods\ntext.upper()\ntext.lower()\ntext.strip()\ntext.replace(old, new)\ntext.split(separator)\ntext.find(substring)\n\n# f-strings\nf"Hello, {variable}"\nf"Value: {expression:.2f}"`,
        starterCode: `# Practice string methods and f-strings
sentence = "  the quick brown fox  "

# 1. Print the sentence without extra spaces
# 2. Print it in UPPERCASE
# 3. Count how many times the letter 'o' appears
# 4. Replace "fox" with "cat"
# 5. Use an f-string to print: "Word count: X" where X is the number of words

`,
        commonMistakes: [
          {
            mistake: '"hello".Upper()',
            explanation: 'Python string methods are lowercase. Upper() with a capital U does not exist.',
            fix: '"hello".upper()'
          },
          {
            mistake: 'print(f"Hello, name")',
            explanation: 'Without curly braces, the variable name is not substituted — Python prints the literal text "name".',
            fix: 'print(f"Hello, {name}") — curly braces mark where to insert the variable'
          }
        ],
        prerequisites: ['lesson-6-1'],
        estimatedMinutes: 20,
        tags: ['strings', 'methods', 'f-strings', 'formatting'],
        exercise: {
          id: 'ex-7-1',
          title: 'Name Formatter',
          description: 'Write a program that:\n1. Takes the string: "  alice smith  "\n2. Strips whitespace\n3. Converts to title case (capitalize first letter of each word — use .title())\n4. Uses an f-string to print: "Full name: Alice Smith" and "Characters: 11"',
          difficulty: 'easy',
          starterCode: `raw_name = "  alice smith  "

# Strip whitespace
clean_name = raw_name.strip()

# Convert to title case
formatted = 

# Print using f-strings
print(f"Full name: {formatted}")
print(f"Characters: {len(formatted)}")`,
          solution: `raw_name = "  alice smith  "
clean_name = raw_name.strip()
formatted = clean_name.title()
print(f"Full name: {formatted}")
print(f"Characters: {len(formatted)}")`,
          hints: [
            'After stripping, use .title() to capitalize the first letter of each word.',
            'len() works on strings too: len("Alice Smith") returns 11.',
            'f-strings: print(f"Full name: {formatted}")'
          ],
          testCases: [
            {
              id: 'tc-7-1-1',
              description: 'Should print "Full name: Alice Smith"',
              type: 'contains',
              expectedOutput: 'Full name: Alice Smith'
            },
            {
              id: 'tc-7-1-2',
              description: 'Should print "Characters: 11"',
              type: 'contains',
              expectedOutput: 'Characters: 11'
            }
          ],
          concepts: ['strip', 'title', 'f-strings', 'len']
        }
      }
    ]
  },
  {
    id: 'module-8',
    order: 8,
    title: 'Functions',
    description: 'Write reusable, organized code with Python functions.',
    icon: '⚙️',
    color: '#7c3aed',
    quiz: [
      {
        id: 'q8-1',
        type: 'predict-output',
        question: 'What will this code output?',
        code: 'def greet(name, greeting="Hello"):\n    return f"{greeting}, {name}!"\n\nprint(greet("Alice"))\nprint(greet("Bob", "Hi"))',
        options: ['Hello, Alice!\nHi, Bob!', 'greeting, name!\ngreeting, name!', 'Error', 'Hello, Alice\nHi, Bob'],
        correctAnswer: 0,
        explanation: 'greet("Alice") uses the default greeting "Hello". greet("Bob", "Hi") overrides the default with "Hi". The f-string inserts the values.'
      }
    ],
    lessons: [
      {
        id: 'lesson-8-1',
        moduleId: 'module-8',
        order: 1,
        title: 'Defining and Calling Functions',
        objective: 'Define functions with parameters and return values to write reusable code.',
        explanation: `A **function** is a named, reusable block of code that performs a specific task. Instead of repeating the same code in multiple places, you define it once in a function and call it whenever needed.

**Defining a function:**
\`\`\`python
def function_name(parameters):
    # code to execute
    return result
\`\`\`

**Calling a function:**
\`\`\`python
result = function_name(arguments)
\`\`\`

**Key concepts:**
- **Parameters** are placeholders in the function definition (like x and y in add(x, y)).
- **Arguments** are the actual values you pass when calling (like add(3, 5)).
- **return** sends a value back to wherever the function was called.
- **Default parameters** provide fallback values: def greet(name, greeting="Hello").
- **Scope:** Variables created inside a function exist only inside it.`,
        analogy: `A function is like a kitchen appliance. A toaster is defined once with instructions: "insert bread, heat to 350°F for 2 minutes, pop up." Every time you want toast, you use (call) the toaster with different bread (arguments). You don't need to re-engineer a toaster each morning — it's defined once and reused endlessly.`,
        exampleCode: `# Simple function
def greet(name):
    print(f"Hello, {name}!")

greet("Alice")
greet("Bob")

# Function with return value
def add(x, y):
    return x + y

result = add(3, 5)
print("Sum:", result)

# Function with default parameter
def power(base, exponent=2):
    return base ** exponent

print(power(3))     # 9 (3 squared, default exponent)
print(power(2, 10)) # 1024 (2 to the 10th)

# Function that processes a list
def get_average(numbers):
    if len(numbers) == 0:
        return 0
    return sum(numbers) / len(numbers)

grades = [85, 90, 78, 92, 88]
print(f"Class average: {get_average(grades):.1f}")`,
        lineByLine: [
          { line: 'def greet(name):', explanation: 'def starts the function definition. greet is its name. name is a parameter (input placeholder). Colon required.' },
          { line: '    print(f"Hello, {name}!")', explanation: 'Indented body — runs when the function is called. name takes the value of the argument passed.' },
          { line: 'greet("Alice")', explanation: 'Calls the greet function with "Alice" as the argument. Inside the function, name = "Alice".' },
          { line: 'def add(x, y):', explanation: 'A function with two parameters: x and y.' },
          { line: '    return x + y', explanation: 'return sends the computed value back to the caller. result = add(3, 5) will give result = 8.' },
          { line: 'def power(base, exponent=2):', explanation: 'exponent=2 is a default parameter. If no exponent is provided, it defaults to 2.' }
        ],
        expectedOutput: `Hello, Alice!\nHello, Bob!\nSum: 8\n9\n1024\nClass average: 86.6`,
        syntax: `def function_name(param1, param2, param3=default):\n    # function body\n    return value\n\n# Calling\nresult = function_name(arg1, arg2)`,
        starterCode: `# Define a function called 'calculate_area' that:
# - Takes two parameters: width and height
# - Returns the area (width * height)
# Then call it with width=8 and height=5 and print the result

`,
        commonMistakes: [
          {
            mistake: 'def my_function()\n    print("Hello")',
            explanation: 'Two mistakes: missing colon after (), and the body must be indented.',
            fix: 'def my_function():\n    print("Hello")'
          },
          {
            mistake: 'result = my_function\nprint(result)',
            explanation: 'Without parentheses, you\'re referencing the function itself, not calling it. result will be a function object, not its return value.',
            fix: 'result = my_function()  # Always include () to call a function'
          }
        ],
        prerequisites: ['lesson-6-1'],
        estimatedMinutes: 25,
        tags: ['functions', 'def', 'parameters', 'return', 'scope'],
        exercise: {
          id: 'ex-8-1',
          title: 'Temperature Converter',
          description: 'Write two functions:\n1. celsius_to_fahrenheit(c) that converts Celsius to Fahrenheit (formula: F = C * 9/5 + 32)\n2. fahrenheit_to_celsius(f) that converts Fahrenheit to Celsius (formula: C = (F - 32) * 5/9)\n\nTest: celsius_to_fahrenheit(100) should return 212.0\nTest: fahrenheit_to_celsius(32) should return 0.0',
          difficulty: 'intermediate',
          starterCode: `def celsius_to_fahrenheit(c):
    # Your code here
    pass

def fahrenheit_to_celsius(f):
    # Your code here
    pass

# Test your functions
print(celsius_to_fahrenheit(100))  # Should print 212.0
print(fahrenheit_to_celsius(32))   # Should print 0.0
print(celsius_to_fahrenheit(0))    # Should print 32.0`,
          solution: `def celsius_to_fahrenheit(c):
    return c * 9/5 + 32

def fahrenheit_to_celsius(f):
    return (f - 32) * 5/9

print(celsius_to_fahrenheit(100))
print(fahrenheit_to_celsius(32))
print(celsius_to_fahrenheit(0))`,
          hints: [
            'Celsius to Fahrenheit: multiply by 9/5, then add 32.',
            'Fahrenheit to Celsius: subtract 32 first, then multiply by 5/9.',
            'Use return to send the result back: return c * 9/5 + 32'
          ],
          testCases: [
            {
              id: 'tc-8-1-1',
              description: '100°C should equal 212.0°F',
              type: 'contains',
              expectedOutput: '212.0'
            },
            {
              id: 'tc-8-1-2',
              description: '32°F should equal 0.0°C',
              type: 'contains',
              expectedOutput: '0.0'
            }
          ],
          concepts: ['functions', 'parameters', 'return', 'arithmetic']
        }
      }
    ]
  },
  {
    id: 'module-9',
    order: 9,
    title: 'Error Handling',
    description: 'Handle errors gracefully and debug your programs like a pro.',
    icon: '🛡️',
    color: '#dc2626',
    quiz: [
      {
        id: 'q9-1',
        type: 'multiple-choice',
        question: 'Which block in try-except always runs, even if an error occurred?',
        options: ['try', 'except', 'finally', 'else'],
        correctAnswer: 2,
        explanation: 'The finally block always executes, whether or not an exception occurred. It\'s used for cleanup operations like closing files.'
      }
    ],
    lessons: [
      {
        id: 'lesson-9-1',
        moduleId: 'module-9',
        order: 1,
        title: 'try, except, and finally',
        objective: 'Use try-except to handle errors gracefully and prevent programs from crashing.',
        explanation: `When Python encounters an error while running your code, it raises an **exception**. Without handling it, the program crashes and shows a traceback.

**try-except** lets you catch exceptions and handle them gracefully:

\`\`\`python
try:
    # code that might fail
except SomeError:
    # what to do when that error occurs
\`\`\`

**Common Python exceptions:**
| Exception | When it occurs |
|-----------|---------------|
| ValueError | Wrong type of value (e.g., int("hello")) |
| TypeError | Wrong type operation (e.g., "a" + 1) |
| ZeroDivisionError | Division by zero |
| IndexError | List index out of range |
| FileNotFoundError | File doesn't exist |
| NameError | Variable doesn't exist |
| KeyError | Dictionary key doesn't exist |

**finally** block always runs (for cleanup):
\`\`\`python
try:
    ...
except ValueError:
    ...
finally:
    print("This always runs")
\`\`\``,
        analogy: `Error handling is like wearing a seatbelt. You don't expect an accident, but if one happens, the seatbelt (the except block) prevents catastrophic consequences. The finally block is like always taking your keys when you leave the car — you do it regardless of whether there was an accident.`,
        exampleCode: `# Basic try-except
try:
    number = int("hello")  # This will fail
    print(number)
except ValueError:
    print("That's not a valid number!")

# Handling multiple exceptions
def safe_divide(a, b):
    try:
        result = a / b
        return result
    except ZeroDivisionError:
        print("Error: Cannot divide by zero!")
        return None
    except TypeError:
        print("Error: Please provide numbers only!")
        return None

print(safe_divide(10, 2))   # 5.0
print(safe_divide(10, 0))   # Error message + None
print(safe_divide(10, "x")) # Error message + None

# finally block
def read_number():
    try:
        n = int(input("Enter a number: "))
        print("You entered:", n)
    except ValueError:
        print("That wasn't a number!")
    finally:
        print("Thank you for using this program!")`,
        lineByLine: [
          { line: 'try:', explanation: 'Everything inside this block is "attempted." Python monitors for any errors.' },
          { line: 'number = int("hello")', explanation: 'int("hello") fails because "hello" cannot be converted to a number — raises ValueError.' },
          { line: 'except ValueError:', explanation: 'Catches specifically ValueError exceptions. Only runs if a ValueError occurred in the try block.' },
          { line: "    print(\"That's not a valid number!\")", explanation: 'This friendly message replaces a confusing error traceback.' },
          { line: 'finally:', explanation: 'This block runs no matter what — whether the try succeeded or an exception was caught.' }
        ],
        expectedOutput: `That's not a valid number!\n5.0\nError: Cannot divide by zero!\nNone\nError: Please provide numbers only!\nNone`,
        syntax: `try:\n    # risky code\nexcept ExceptionType:\n    # handle specific error\nexcept (Error1, Error2):\n    # handle multiple errors\nexcept Exception as e:\n    # handle any error, access it as e\nelse:\n    # runs only if NO exception occurred\nfinally:\n    # always runs`,
        starterCode: `# Write a safe calculator that handles errors
# Ask the user for two numbers and a math operation
# Handle: invalid numbers, division by zero

def safe_calculator(num1, num2, operation):
    try:
        if operation == "+":
            return num1 + num2
        elif operation == "/":
            # Add your zero-division handling here
            pass
    except ZeroDivisionError:
        pass  # Replace with proper error message

print(safe_calculator(10, 2, "+"))
print(safe_calculator(10, 0, "/"))`,
        commonMistakes: [
          {
            mistake: 'except:\n    pass',
            explanation: 'Bare except catches every possible error including system errors, which can hide serious bugs. Always specify the exception type.',
            fix: 'except ValueError:\n    print("Wrong value!")'
          },
          {
            mistake: 'try:\n    code\n    code\n    code\nexcept:\n    ...',
            explanation: 'Putting too much code in a try block makes it hard to know which line caused the error.',
            fix: 'Keep try blocks as small as possible — only wrap the specific line that might fail.'
          }
        ],
        prerequisites: ['lesson-8-1'],
        estimatedMinutes: 22,
        tags: ['try', 'except', 'finally', 'errors', 'exceptions'],
        exercise: {
          id: 'ex-9-1',
          title: 'Safe Number Input',
          description: 'Write a function called safe_int(text) that:\n- Tries to convert the text to an integer\n- Returns the integer if successful\n- Returns -1 (and prints "Invalid number") if conversion fails\n\nTest with: safe_int("42"), safe_int("hello"), safe_int("3.14")',
          difficulty: 'intermediate',
          starterCode: `def safe_int(text):
    try:
        # Try to convert text to int
        pass
    except ValueError:
        # Handle the error
        pass

print(safe_int("42"))      # Should print 42
print(safe_int("hello"))   # Should print "Invalid number" then -1
print(safe_int("3.14"))    # Should print "Invalid number" then -1`,
          solution: `def safe_int(text):
    try:
        return int(text)
    except ValueError:
        print("Invalid number")
        return -1

print(safe_int("42"))
print(safe_int("hello"))
print(safe_int("3.14"))`,
          hints: [
            'Use int(text) inside the try block.',
            'If it succeeds, return the integer: return int(text).',
            'If it fails, print "Invalid number" and return -1.'
          ],
          testCases: [
            {
              id: 'tc-9-1-1',
              description: 'safe_int("42") should return 42',
              type: 'contains',
              expectedOutput: '42'
            },
            {
              id: 'tc-9-1-2',
              description: 'safe_int("hello") should print "Invalid number"',
              type: 'contains',
              expectedOutput: 'Invalid number'
            }
          ],
          concepts: ['try', 'except', 'ValueError', 'return']
        }
      }
    ]
  },
  {
    id: 'module-10',
    order: 10,
    title: 'OOP Basics',
    description: 'Model real-world entities using Python classes and objects.',
    icon: '🏗️',
    color: '#059669',
    quiz: [
      {
        id: 'q10-1',
        type: 'multiple-choice',
        question: 'What is the purpose of __init__ in a Python class?',
        options: ['To delete an object', 'To initialize an object\'s attributes when it is created', 'To print the object', 'To inherit from another class'],
        correctAnswer: 1,
        explanation: '__init__ is the constructor method. It runs automatically when you create a new object from the class, and it sets up the initial state (attributes) of that object.'
      }
    ],
    lessons: [
      {
        id: 'lesson-10-1',
        moduleId: 'module-10',
        order: 1,
        title: 'Classes and Objects',
        objective: 'Define a class with attributes and methods, then create and use objects from it.',
        explanation: `**Object-Oriented Programming (OOP)** organizes code around objects — data and the functions that act on that data bundled together.

- A **class** is a blueprint (like the design of a car model).
- An **object** is an instance of a class (like a specific car built from that design).

**Defining a class:**
\`\`\`python
class Dog:
    def __init__(self, name, breed):
        self.name = name
        self.breed = breed
    
    def bark(self):
        print(f"{self.name} says: Woof!")
\`\`\`

**Creating objects:**
\`\`\`python
dog1 = Dog("Rex", "German Shepherd")
dog1.bark()  # Rex says: Woof!
\`\`\`

**Key terms:**
- **__init__**: Constructor — runs when an object is created.
- **self**: Refers to the current object. Always the first parameter in methods.
- **Attributes**: Variables attached to an object (self.name, self.breed).
- **Methods**: Functions defined inside a class.`,
        analogy: `A class is like a cookie cutter. The cutter defines the shape (blueprints for a cookie — circular, with a star cutout). Every time you press the cutter into dough, you create a new cookie (object). Each cookie has the same shape but can have different decorations (different attribute values).`,
        exampleCode: `class Student:
    def __init__(self, name, age, grade):
        self.name = name
        self.age = age
        self.grade = grade
        self.scores = []      # empty list by default
    
    def add_score(self, score):
        self.scores.append(score)
    
    def get_average(self):
        if not self.scores:
            return 0
        return sum(self.scores) / len(self.scores)
    
    def introduce(self):
        avg = self.get_average()
        print(f"I'm {self.name}, age {self.age}, grade {self.grade}.")
        if avg > 0:
            print(f"My current average is {avg:.1f}")

# Creating objects
alice = Student("Alice", 20, "Sophomore")
bob = Student("Bob", 21, "Junior")

# Using methods
alice.add_score(85)
alice.add_score(92)
alice.add_score(78)
alice.introduce()

# Accessing attributes directly
print(f"\\n{bob.name} is in grade: {bob.grade}")`,
        lineByLine: [
          { line: 'class Student:', explanation: 'Defines a new class named Student. Classes by convention use CamelCase names.' },
          { line: 'def __init__(self, name, age, grade):', explanation: '__init__ is the constructor. self is automatic (Python passes it). name, age, grade are parameters you provide when creating a Student.' },
          { line: 'self.name = name', explanation: 'Creates an attribute name on this object and stores the value passed in.' },
          { line: 'self.scores = []', explanation: 'Creates an empty list attribute. Each Student object gets their own separate scores list.' },
          { line: 'def add_score(self, score):', explanation: 'A method that adds a score to this student\'s scores list. self refers to the student calling the method.' },
          { line: 'alice = Student("Alice", 20, "Sophomore")', explanation: 'Creates a new Student object. __init__ runs automatically with name="Alice", age=20, grade="Sophomore".' }
        ],
        expectedOutput: `I'm Alice, age 20, grade Sophomore.\nMy current average is 85.0\n\nBob is in grade: Junior`,
        syntax: `class ClassName:\n    def __init__(self, param1, param2):\n        self.attr1 = param1\n        self.attr2 = param2\n    \n    def method_name(self):\n        # code using self.attr1, etc.\n\n# Create an object\nobj = ClassName(value1, value2)\nobj.method_name()`,
        starterCode: `# Define a class called 'BankAccount' with:
# - Attributes: owner (name), balance (starts at 0)
# - Method deposit(amount): adds amount to balance
# - Method withdraw(amount): subtracts if enough balance, else prints "Insufficient funds"
# - Method show_balance(): prints the current balance

class BankAccount:
    def __init__(self, owner):
        # Initialize attributes
        pass

# Test your class
account = BankAccount("Alice")
account.deposit(1000)
account.withdraw(250)
account.show_balance()  # Should print: Balance: 750`,
        commonMistakes: [
          {
            mistake: 'def __init__(name, age):',
            explanation: 'self must always be the first parameter in every method. Without it, Python cannot identify which object is being used.',
            fix: 'def __init__(self, name, age):'
          },
          {
            mistake: 'student1 = Student\nstudent1.__init__("Alice", 20)',
            explanation: 'This is not the correct way to create an object. Call the class like a function.',
            fix: 'student1 = Student("Alice", 20)'
          }
        ],
        prerequisites: ['lesson-9-1'],
        estimatedMinutes: 30,
        tags: ['class', 'object', '__init__', 'self', 'methods', 'OOP'],
        exercise: {
          id: 'ex-10-1',
          title: 'Rectangle Class',
          description: 'Create a class called Rectangle with:\n- __init__(self, width, height)\n- method area() that returns width * height\n- method perimeter() that returns 2 * (width + height)\n- method describe() that prints: "Rectangle: 5x3, Area: 15, Perimeter: 16"\n\nTest with width=5, height=3.',
          difficulty: 'intermediate',
          starterCode: `class Rectangle:
    def __init__(self, width, height):
        # Store width and height as attributes
        pass
    
    def area(self):
        # Return width * height
        pass
    
    def perimeter(self):
        # Return 2 * (width + height)
        pass
    
    def describe(self):
        # Print a formatted description
        pass

# Test
rect = Rectangle(5, 3)
print(rect.area())        # 15
print(rect.perimeter())   # 16
rect.describe()`,
          solution: `class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    def area(self):
        return self.width * self.height
    
    def perimeter(self):
        return 2 * (self.width + self.height)
    
    def describe(self):
        print(f"Rectangle: {self.width}x{self.height}, Area: {self.area()}, Perimeter: {self.perimeter()}")

rect = Rectangle(5, 3)
print(rect.area())
print(rect.perimeter())
rect.describe()`,
          hints: [
            'In __init__, store the values: self.width = width, self.height = height.',
            'area() should return self.width * self.height.',
            'describe() can call other methods: self.area() and self.perimeter().'
          ],
          testCases: [
            {
              id: 'tc-10-1-1',
              description: 'area() should return 15',
              type: 'contains',
              expectedOutput: '15'
            },
            {
              id: 'tc-10-1-2',
              description: 'perimeter() should return 16',
              type: 'contains',
              expectedOutput: '16'
            }
          ],
          concepts: ['class', '__init__', 'self', 'methods', 'return']
        }
      }
    ]
  }
  // ── Module 11: Advanced OOP ──────────────────────────────────────────
  {
    id: 'module-11',
    order: 11,
    title: 'Advanced OOP',
    description: 'Master inheritance, polymorphism, class methods, static methods, and special dunder methods.',
    icon: '🏛️',
    color: '#8b5cf6',
    quiz: [
      {
        id: 'q11-1',
        type: 'multiple-choice',
        question: 'Which keyword is used to inherit from a parent class in Python?',
        options: ['extends', 'inherits', 'super', 'Pass the parent class in parentheses: class Child(Parent)'],
        correctAnswer: 3,
        explanation: 'In Python you inherit by placing the parent class name in parentheses: class Child(Parent):. The super() function then lets you call the parent\'s methods.'
      },
      {
        id: 'q11-2',
        type: 'predict-output',
        question: 'What does this code print?',
        code: 'class Animal:\n    def speak(self):\n        return "..."\n\nclass Dog(Animal):\n    def speak(self):\n        return "Woof!"\n\nd = Dog()\nprint(d.speak())',
        options: ['...', 'Woof!', 'Error', 'None'],
        correctAnswer: 1,
        explanation: 'Dog overrides speak(), so d.speak() calls Dog\'s version which returns "Woof!".'
      },
      {
        id: 'q11-3',
        type: 'multiple-choice',
        question: 'What is the purpose of __str__ in a class?',
        options: ['To convert strings to int', 'To define what print(obj) displays', 'To name the class', 'To delete an object'],
        correctAnswer: 1,
        explanation: '__str__ is a "dunder" (double-underscore) method. When you call print(obj) or str(obj), Python calls __str__ to get a human-readable string representation.'
      }
    ],
    lessons: [
      {
        id: 'lesson-11-1',
        moduleId: 'module-11',
        order: 1,
        title: 'Inheritance',
        objective: 'Create child classes that inherit and extend parent class behaviour.',
        explanation: `**Inheritance** lets a child class reuse code from a parent class — avoiding duplication and modelling real-world "is-a" relationships.

\`\`\`python
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return "..."

class Dog(Animal):
    def speak(self):          # overrides parent method
        return f"{self.name} says Woof!"

class Cat(Animal):
    def speak(self):
        return f"{self.name} says Meow!"

d = Dog("Rex")
c = Cat("Whiskers")
print(d.speak())   # Rex says Woof!
print(c.speak())   # Whiskers says Meow!
\`\`\`

Use **super()** to call the parent's __init__ and extend it:

\`\`\`python
class GuideDog(Dog):
    def __init__(self, name, owner):
        super().__init__(name)   # calls Dog.__init__ → Animal.__init__
        self.owner = owner

    def info(self):
        return f"{self.name} guides {self.owner}"
\`\`\``,
        analogy: 'Think of inheritance like a family. A child inherits traits from their parents but can also develop their own unique characteristics. A Dog *is* an Animal — it has everything an Animal has plus dog-specific behaviours.',
        exampleCode: `class Vehicle:
    def __init__(self, make, speed):
        self.make = make
        self.speed = speed

    def describe(self):
        return f"{self.make} travels at {self.speed} km/h"

class Car(Vehicle):
    def __init__(self, make, speed, doors):
        super().__init__(make, speed)
        self.doors = doors

    def describe(self):
        base = super().describe()
        return f"{base} with {self.doors} doors"

class ElectricCar(Car):
    def __init__(self, make, speed, doors, range_km):
        super().__init__(make, speed, doors)
        self.range_km = range_km

    def describe(self):
        base = super().describe()
        return f"{base} | Range: {self.range_km} km (electric)"

v = Vehicle("Truck", 120)
c = Car("Toyota", 180, 4)
e = ElectricCar("Tesla", 250, 4, 500)

print(v.describe())
print(c.describe())
print(e.describe())`,
        lineByLine: [
          { line: 'class Vehicle:', explanation: 'Base (parent) class. All vehicles share make and speed.' },
          { line: 'super().__init__(make, speed)', explanation: 'Calls the parent class __init__ so you don\'t repeat the same assignments.' },
          { line: 'class Car(Vehicle):', explanation: 'Car inherits from Vehicle — it gets make and speed for free, then adds doors.' },
          { line: 'class ElectricCar(Car):', explanation: 'Multi-level inheritance. ElectricCar gets everything from Car (and Vehicle) then adds range_km.' },
          { line: 'base = super().describe()', explanation: 'Calls the parent\'s describe() so we can extend the string rather than rewrite it.' }
        ],
        expectedOutput: 'Truck travels at 120 km/h\nToyota travels at 180 km/h with 4 doors\nTesla travels at 250 km/h with 4 doors | Range: 500 km (electric)',
        starterCode: `class Shape:
    def __init__(self, color):
        self.color = color

    def area(self):
        return 0

    def describe(self):
        return f"A {self.color} shape with area {self.area():.2f}"

# Create a Rectangle class that inherits from Shape
# It should accept color, width, height
# Override area() to return width * height

# Create a Circle class that inherits from Shape
# It should accept color and radius
# Override area() to return 3.14159 * radius ** 2

# Test your classes:
# r = Rectangle("blue", 5, 3)
# c = Circle("red", 7)
# print(r.describe())
# print(c.describe())
`,
        commonMistakes: [
          { mistake: 'Forgetting super().__init__()', explanation: 'Without calling super().__init__(), the parent\'s attributes are never set up.', fix: 'Always call super().__init__(*args) as the first line in a child\'s __init__.' },
          { mistake: 'Confusing method resolution order', explanation: 'Python looks for methods in MRO (Method Resolution Order): child first, then parents left to right.', fix: 'Use ClassName.__mro__ to inspect the resolution order.' }
        ],
        exercise: {
          id: 'ex-11-1',
          title: 'Shape Hierarchy',
          description: 'Create Rectangle and Circle classes inheriting from Shape. Rectangle.area() = width*height. Circle.area() = 3.14159*radius^2.',
          difficulty: 'intermediate',
          starterCode: `class Shape:
    def __init__(self, color):
        self.color = color
    def area(self):
        return 0
    def describe(self):
        return f"A {self.color} shape with area {self.area():.2f}"

class Rectangle(Shape):
    def __init__(self, color, width, height):
        super().__init__(color)
        self.width = width
        self.height = height
    def area(self):
        return self.width * self.height

class Circle(Shape):
    def __init__(self, color, radius):
        super().__init__(color)
        self.radius = radius
    def area(self):
        return 3.14159 * self.radius ** 2

r = Rectangle("blue", 5, 3)
c = Circle("red", 7)
print(r.describe())
print(c.describe())`,
          solution: `class Shape:
    def __init__(self, color):
        self.color = color
    def area(self):
        return 0
    def describe(self):
        return f"A {self.color} shape with area {self.area():.2f}"

class Rectangle(Shape):
    def __init__(self, color, width, height):
        super().__init__(color)
        self.width = width
        self.height = height
    def area(self):
        return self.width * self.height

class Circle(Shape):
    def __init__(self, color, radius):
        super().__init__(color)
        self.radius = radius
    def area(self):
        return 3.14159 * self.radius ** 2

r = Rectangle("blue", 5, 3)
c = Circle("red", 7)
print(r.describe())
print(c.describe())`,
          hints: ['Call super().__init__(color) in each child class.', 'Override area() in each subclass with the correct formula.', 'Rectangle area = width × height. Circle area = π × r².'],
          testCases: [
            { id: 'ex11-1-1', description: 'Rectangle describes correctly', type: 'contains', expectedOutput: 'A blue shape with area 15.00' },
            { id: 'ex11-1-2', description: 'Circle describes correctly', type: 'contains', expectedOutput: 'A red shape with area 153.94' }
          ],
          concepts: ['inheritance', 'super()', 'method overriding', 'OOP']
        },
        prerequisites: ['lesson-10-1'],
        estimatedMinutes: 18,
        tags: ['inheritance', 'super', 'OOP']
      },
      {
        id: 'lesson-11-2',
        moduleId: 'module-11',
        order: 2,
        title: 'Dunder Methods & Operator Overloading',
        objective: 'Implement special dunder methods to make custom objects behave like built-in types.',
        explanation: `Python uses **dunder (double-underscore) methods** to define how objects behave with built-in operations.

| Dunder | Triggered by |
|--------|-------------|
| \`__str__\` | \`print(obj)\`, \`str(obj)\` |
| \`__repr__\` | \`repr(obj)\`, in REPL |
| \`__len__\` | \`len(obj)\` |
| \`__add__\` | \`obj + other\` |
| \`__eq__\` | \`obj == other\` |
| \`__lt__\` | \`obj < other\` |
| \`__getitem__\` | \`obj[key]\` |

\`\`\`python
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __str__(self):
        return f"Vector({self.x}, {self.y})"

    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)

    def __len__(self):
        return int((self.x**2 + self.y**2) ** 0.5)

v1 = Vector(3, 4)
v2 = Vector(1, 2)
print(v1)           # Vector(3, 4)
print(v1 + v2)      # Vector(4, 6)
print(len(v1))      # 5  (magnitude)
\`\`\``,
        analogy: 'Dunder methods are like teaching your custom object to speak the same language as Python\'s built-in types. Once you define __add__, Python knows how to use + with your object, just like with integers.',
        exampleCode: `class Money:
    def __init__(self, amount, currency="USD"):
        self.amount = amount
        self.currency = currency

    def __str__(self):
        return f"{self.currency} {self.amount:.2f}"

    def __repr__(self):
        return f"Money({self.amount!r}, {self.currency!r})"

    def __add__(self, other):
        if self.currency != other.currency:
            raise ValueError("Cannot add different currencies")
        return Money(self.amount + other.amount, self.currency)

    def __mul__(self, factor):
        return Money(self.amount * factor, self.currency)

    def __eq__(self, other):
        return self.amount == other.amount and self.currency == other.currency

    def __lt__(self, other):
        return self.amount < other.amount

wallet = Money(50)
bill   = Money(30)
total  = wallet + bill
doubled = wallet * 2

print(f"Wallet: {wallet}")
print(f"Bill:   {bill}")
print(f"Total:  {total}")
print(f"Doubled: {doubled}")
print(f"wallet > bill? {wallet > bill}")`,
        lineByLine: [
          { line: '__str__', explanation: 'Returns a nice human-readable string. Called by print() and str().' },
          { line: '__repr__', explanation: 'Returns an unambiguous developer string. Called in the REPL and by repr().' },
          { line: '__add__(self, other)', explanation: 'Enables the + operator. "other" is the right-hand operand.' },
          { line: '__mul__(self, factor)', explanation: 'Enables the * operator for multiplication by a scalar.' },
          { line: '__lt__(self, other)', explanation: 'Enables the < operator. Python derives > automatically if you also define __eq__.' }
        ],
        expectedOutput: 'Wallet: USD 50.00\nBill:   USD 30.00\nTotal:  USD 80.00\nDoubled: USD 100.00\nwallet > bill? True',
        starterCode: `class Temperature:
    def __init__(self, celsius):
        self.celsius = celsius

    # Add __str__ → "25.0°C"
    # Add __add__ → adds two Temperatures
    # Add __eq__  → compares celsius values
    # Add __lt__  → less than comparison
    # Add to_fahrenheit method → (celsius * 9/5) + 32

t1 = Temperature(25)
t2 = Temperature(10)
# print(t1)           # 25.0°C
# print(t1 + t2)      # 35.0°C
# print(t1 == t2)     # False
# print(t2 < t1)      # True
# print(t1.to_fahrenheit())  # 77.0
`,
        commonMistakes: [
          { mistake: 'Returning wrong type from __add__', explanation: 'If __add__ returns a plain number instead of a new instance of your class, chaining operations breaks.', fix: 'Always return an instance of the same class: return Money(self.amount + other.amount).' },
          { mistake: 'Forgetting __repr__', explanation: 'Without __repr__, debugging in the REPL shows an unhelpful <__main__.Foo object at 0x...>.', fix: 'Always define at least __repr__ so objects are inspectable.' }
        ],
        exercise: {
          id: 'ex-11-2',
          title: 'Temperature Class with Dunders',
          description: 'Implement a Temperature class with __str__, __add__, __eq__, __lt__, and to_fahrenheit().',
          difficulty: 'intermediate',
          starterCode: `class Temperature:
    def __init__(self, celsius):
        self.celsius = celsius

    def __str__(self):
        return f"{self.celsius:.1f}°C"

    def __add__(self, other):
        return Temperature(self.celsius + other.celsius)

    def __eq__(self, other):
        return self.celsius == other.celsius

    def __lt__(self, other):
        return self.celsius < other.celsius

    def to_fahrenheit(self):
        return (self.celsius * 9/5) + 32

t1 = Temperature(25)
t2 = Temperature(10)
print(t1)
print(t1 + t2)
print(t1 == t2)
print(t2 < t1)
print(t1.to_fahrenheit())`,
          solution: `class Temperature:
    def __init__(self, celsius):
        self.celsius = celsius
    def __str__(self):
        return f"{self.celsius:.1f}°C"
    def __add__(self, other):
        return Temperature(self.celsius + other.celsius)
    def __eq__(self, other):
        return self.celsius == other.celsius
    def __lt__(self, other):
        return self.celsius < other.celsius
    def to_fahrenheit(self):
        return (self.celsius * 9/5) + 32

t1 = Temperature(25)
t2 = Temperature(10)
print(t1)
print(t1 + t2)
print(t1 == t2)
print(t2 < t1)
print(t1.to_fahrenheit())`,
          hints: ['__str__ should return a formatted string like "25.0°C".', '__add__ should return a new Temperature, not a number.', 'to_fahrenheit: multiply celsius by 9/5 then add 32.'],
          testCases: [
            { id: 'ex11-2-1', description: 'str(t1) shows 25.0°C', type: 'contains', expectedOutput: '25.0°C' },
            { id: 'ex11-2-2', description: 'to_fahrenheit returns 77.0', type: 'contains', expectedOutput: '77.0' }
          ],
          concepts: ['dunder methods', 'operator overloading', '__str__', '__add__']
        },
        prerequisites: ['lesson-11-1'],
        estimatedMinutes: 20,
        tags: ['dunder', 'operator overloading', 'OOP']
      }
    ]
  },

  // ── Module 12: List Comprehensions & Generators ───────────────────────
  {
    id: 'module-12',
    order: 12,
    title: 'Comprehensions & Generators',
    description: 'Write concise, Pythonic code using list/dict/set comprehensions and memory-efficient generators.',
    icon: '⚡',
    color: '#06b6d4',
    quiz: [
      {
        id: 'q12-1',
        type: 'predict-output',
        question: 'What does this list comprehension produce?',
        code: 'result = [x**2 for x in range(5) if x % 2 == 0]\nprint(result)',
        options: ['[0, 4, 16]', '[0, 1, 4, 9, 16]', '[4, 16]', '[0, 2, 4]'],
        correctAnswer: 0,
        explanation: 'range(5) gives 0,1,2,3,4. Filtering evens: 0,2,4. Squaring: 0,4,16.'
      },
      {
        id: 'q12-2',
        type: 'multiple-choice',
        question: 'What is the key difference between a list comprehension and a generator expression?',
        options: [
          'List comprehensions use [], generators use ()',
          'Generators compute values lazily (one at a time), lists compute all at once',
          'Both compute lazily',
          'Both are identical in memory usage'
        ],
        correctAnswer: 1,
        explanation: 'Generators yield values one at a time only when requested, making them memory-efficient for large sequences. List comprehensions build the whole list in memory immediately.'
      },
      {
        id: 'q12-3',
        type: 'multiple-choice',
        question: 'How do you create a dictionary comprehension?',
        options: ['{k: v for k, v in items}', '[k: v for k, v in items]', '(k: v for k, v in items)', 'dict(k: v for items)'],
        correctAnswer: 0,
        explanation: 'Dictionary comprehensions use curly braces with key:value pairs: {key: value for item in iterable}.'
      }
    ],
    lessons: [
      {
        id: 'lesson-12-1',
        moduleId: 'module-12',
        order: 1,
        title: 'List Comprehensions',
        objective: 'Replace verbose for-loops with concise, readable list comprehensions.',
        explanation: `A **list comprehension** creates a new list by applying an expression to each item in an iterable, with an optional filter.

**Syntax:** \`[expression for item in iterable if condition]\`

\`\`\`python
# Traditional loop
squares = []
for x in range(10):
    if x % 2 == 0:
        squares.append(x**2)

# Equivalent comprehension — one line!
squares = [x**2 for x in range(10) if x % 2 == 0]
print(squares)   # [0, 4, 16, 36, 64]
\`\`\`

**Nested comprehensions** can flatten 2D structures:

\`\`\`python
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flat = [n for row in matrix for n in row]
print(flat)  # [1, 2, 3, 4, 5, 6, 7, 8, 9]
\`\`\`

**Dict and Set comprehensions** use the same idea:

\`\`\`python
# Dict comprehension
word_len = {word: len(word) for word in ["apple", "cat", "banana"]}
# {'apple': 5, 'cat': 3, 'banana': 6}

# Set comprehension (removes duplicates)
unique_squares = {x**2 for x in range(-3, 4)}
# {0, 1, 4, 9}
\`\`\``,
        analogy: 'A list comprehension is like a conveyor belt with a filter and a transformer. Items enter, some are filtered out, and the rest are transformed before being placed into the new list.',
        exampleCode: `# 1. Basic list comprehension
words = ["hello", "world", "python", "programming", "is", "fun"]
long_words = [w.upper() for w in words if len(w) > 4]
print("Long words:", long_words)

# 2. Dict comprehension — word: length mapping
length_map = {w: len(w) for w in words}
print("Lengths:", length_map)

# 3. Set comprehension — unique first letters
first_letters = {w[0] for w in words}
print("First letters:", sorted(first_letters))

# 4. Nested comprehension — multiplication table
table = [[i * j for j in range(1, 6)] for i in range(1, 6)]
for row in table:
    print(row)

# 5. Conditional expression in comprehension
numbers = range(1, 11)
labels = ["even" if n % 2 == 0 else "odd" for n in numbers]
print(labels)`,
        lineByLine: [
          { line: '[w.upper() for w in words if len(w) > 4]', explanation: 'For each word in words, include w.upper() only if the word has more than 4 characters.' },
          { line: '{w: len(w) for w in words}', explanation: 'Dict comprehension: maps each word to its length.' },
          { line: '{w[0] for w in words}', explanation: 'Set comprehension: collects the first character of each word; sets remove duplicates automatically.' },
          { line: '[[i * j for j in range(1, 6)] for i in range(1, 6)]', explanation: 'Nested comprehension: outer loop creates rows, inner creates columns of the multiplication table.' },
          { line: '"even" if n % 2 == 0 else "odd"', explanation: 'Inline ternary expression inside the comprehension — replaces a full if-else block.' }
        ],
        expectedOutput: 'Long words: [\'HELLO\', \'WORLD\', \'PYTHON\', \'PROGRAMMING\']\nLengths: {\'hello\': 5, \'world\': 5, \'python\': 6, \'programming\': 11, \'is\': 2, \'fun\': 3}\nFirst letters: [\'f\', \'h\', \'i\', \'p\', \'w\']\n[1, 2, 3, 4, 5]\n[2, 4, 6, 8, 10]\n[3, 6, 9, 12, 15]\n[4, 8, 12, 16, 20]\n[5, 10, 15, 20, 25]\n[\'odd\', \'even\', \'odd\', \'even\', \'odd\', \'even\', \'odd\', \'even\', \'odd\', \'even\']',
        starterCode: `# Exercise: Use comprehensions to solve these tasks

numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# 1. Create a list of cubes of odd numbers from 'numbers'
# Expected: [1, 27, 125, 343, 729]
odd_cubes = []  # Replace with a comprehension

# 2. Create a dict mapping number → its square for numbers 1-5
# Expected: {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}
squares_dict = {}  # Replace with a dict comprehension

# 3. Create a set of all remainders when dividing numbers by 3
# Expected: {0, 1, 2}
remainders = set()  # Replace with a set comprehension

print("Odd cubes:", odd_cubes)
print("Squares dict:", squares_dict)
print("Remainders:", sorted(remainders))
`,
        commonMistakes: [
          { mistake: 'Writing filter before expression', explanation: '[x if x > 0 for x in lst] is a SyntaxError. The condition must come after the for clause.', fix: 'Use [x for x in lst if x > 0].' },
          { mistake: 'Confusing dict comprehension with set comprehension', explanation: '{x for x in lst} is a SET. {k: v for ...} is a DICT.', fix: 'Always include the colon (k: v) for dict comprehensions.' }
        ],
        exercise: {
          id: 'ex-12-1',
          title: 'Comprehension Challenges',
          description: 'Use list, dict, and set comprehensions to transform data concisely.',
          difficulty: 'intermediate',
          starterCode: `numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
odd_cubes = [n**3 for n in numbers if n % 2 != 0]
squares_dict = {n: n**2 for n in range(1, 6)}
remainders = {n % 3 for n in numbers}
print("Odd cubes:", odd_cubes)
print("Squares dict:", squares_dict)
print("Remainders:", sorted(remainders))`,
          solution: `numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
odd_cubes = [n**3 for n in numbers if n % 2 != 0]
squares_dict = {n: n**2 for n in range(1, 6)}
remainders = {n % 3 for n in numbers}
print("Odd cubes:", odd_cubes)
print("Squares dict:", squares_dict)
print("Remainders:", sorted(remainders))`,
          hints: ['Use n % 2 != 0 to filter odd numbers.', 'Dict comprehension: {key: value for ...}.', 'Set comprehension uses curly braces without a colon.'],
          testCases: [
            { id: 'ex12-1-1', description: 'Odd cubes contains 729', type: 'contains', expectedOutput: '729' },
            { id: 'ex12-1-2', description: 'Squares dict shown', type: 'contains', expectedOutput: '{1: 1, 2: 4, 3: 9, 4: 16, 5: 25}' }
          ],
          concepts: ['list comprehension', 'dict comprehension', 'set comprehension']
        },
        prerequisites: ['lesson-5-1'],
        estimatedMinutes: 15,
        tags: ['comprehension', 'list', 'dict', 'set', 'Pythonic']
      },
      {
        id: 'lesson-12-2',
        moduleId: 'module-12',
        order: 2,
        title: 'Generators & yield',
        objective: 'Write memory-efficient generators using the yield keyword for large or infinite sequences.',
        explanation: `A **generator** is a function that yields values one at a time instead of building a complete list in memory.

\`\`\`python
# List: builds all 1,000,000 numbers in memory at once
squares_list = [x**2 for x in range(1_000_000)]

# Generator: computes each square only when requested
squares_gen = (x**2 for x in range(1_000_000))

# Both work with for-loops and next()
for s in squares_gen:
    if s > 20:
        break
    print(s)
\`\`\`

A **generator function** uses \`yield\` instead of \`return\`:

\`\`\`python
def fibonacci():
    a, b = 0, 1
    while True:          # infinite sequence!
        yield a          # pause and send value
        a, b = b, a + b  # resume from here next time

gen = fibonacci()
for _ in range(8):
    print(next(gen), end=" ")
# 0 1 1 2 3 5 8 13
\`\`\`

Key advantages:
- **Memory efficient** — values computed on demand
- **Infinite sequences** — can represent unlimited data
- **Pipeline-able** — chain generators together`,
        analogy: 'A generator is like a vending machine: it gives you one item at a time when you press the button (call next()), instead of dumping all items on the floor at once like a list does.',
        exampleCode: `def countdown(n):
    """Generator that counts down from n to 1."""
    print(f"Starting countdown from {n}")
    while n > 0:
        yield n
        n -= 1
    print("Blast off! 🚀")

# Generators are lazy — nothing runs until we iterate
gen = countdown(5)
print("Generator created (nothing has run yet)")
print(next(gen))  # 5
print(next(gen))  # 4

print("\\nUsing for loop:")
for n in countdown(3):
    print(f"  T-{n}")

# Generator expression (like list comprehension with parens)
even_squares = (x**2 for x in range(20) if x % 2 == 0)
print("\\nFirst 5 even squares:")
for _ in range(5):
    print(next(even_squares), end=" ")

# Pipeline: chain generators
def integers(n):
    for i in range(1, n + 1):
        yield i

def squared(gen):
    for n in gen:
        yield n ** 2

def filtered(gen, threshold):
    for n in gen:
        if n > threshold:
            yield n

pipeline = filtered(squared(integers(10)), 30)
print("\\n\\nPipeline (squares > 30):", list(pipeline))`,
        lineByLine: [
          { line: 'yield n', explanation: 'Pauses the function and sends n to the caller. The function resumes from here on the next next() call.' },
          { line: 'gen = countdown(5)', explanation: 'Creates the generator object but runs ZERO lines of code inside countdown().' },
          { line: 'next(gen)', explanation: 'Runs the generator until the next yield, then pauses again.' },
          { line: 'even_squares = (x**2 for x in range(20) if x % 2 == 0)', explanation: 'Generator expression: like a list comprehension but with parentheses. No values computed yet.' },
          { line: 'filtered(squared(integers(10)), 30)', explanation: 'Generator pipeline: each generator feeds the next, all lazily evaluated.' }
        ],
        expectedOutput: 'Generator created (nothing has run yet)\nStarting countdown from 5\n5\n4\n\nUsing for loop:\nStarting countdown from 3\n  T-3\n  T-2\n  T-1\nBlast off! 🚀\n\nFirst 5 even squares:\n0 4 16 36 64 \n\nPipeline (squares > 30): [36, 49, 64, 81, 100]',
        starterCode: `def squares_up_to(limit):
    """Generator that yields perfect squares up to limit."""
    n = 1
    while True:
        sq = n * n
        if sq > limit:
            break
        yield sq
        n += 1

# Use the generator to print all squares up to 100
for s in squares_up_to(100):
    print(s, end=" ")
print()

# Generator expression: sum of all even numbers up to 1000
even_sum = sum(n for n in range(1001) if n % 2 == 0)
print("Sum of evens 0-1000:", even_sum)
`,
        commonMistakes: [
          { mistake: 'Calling a generator function without iterating', explanation: 'countdown(5) returns a generator object; it doesn\'t run any code. You must iterate it.', fix: 'Use next(), a for loop, or list() to consume the generator.' },
          { mistake: 'Trying to reuse an exhausted generator', explanation: 'Once a generator is exhausted, iterating it again gives nothing.', fix: 'Create a new generator object each time you need a fresh sequence.' }
        ],
        exercise: {
          id: 'ex-12-2',
          title: 'Prime Number Generator',
          description: 'Write a generator function primes() that yields prime numbers indefinitely. Use it to get the first 10 primes.',
          difficulty: 'intermediate',
          starterCode: `def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True

def primes():
    n = 2
    while True:
        if is_prime(n):
            yield n
        n += 1

gen = primes()
first_10 = [next(gen) for _ in range(10)]
print("First 10 primes:", first_10)`,
          solution: `def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True

def primes():
    n = 2
    while True:
        if is_prime(n):
            yield n
        n += 1

gen = primes()
first_10 = [next(gen) for _ in range(10)]
print("First 10 primes:", first_10)`,
          hints: ['Use an infinite while True: loop inside the generator.', 'yield n only when is_prime(n) is True.', 'Use [next(gen) for _ in range(10)] to get the first 10.'],
          testCases: [
            { id: 'ex12-2-1', description: 'First 10 primes are [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]', type: 'contains', expectedOutput: '[2, 3, 5, 7, 11, 13, 17, 19, 23, 29]' }
          ],
          concepts: ['generators', 'yield', 'infinite sequences', 'prime numbers']
        },
        prerequisites: ['lesson-12-1'],
        estimatedMinutes: 18,
        tags: ['generator', 'yield', 'memory', 'lazy evaluation']
      }
    ]
  },

  // ── Module 13: Decorators & Closures ─────────────────────────────────
  {
    id: 'module-13',
    order: 13,
    title: 'Decorators & Closures',
    description: 'Understand first-class functions, closures, and write powerful decorators to extend function behaviour.',
    icon: '🎁',
    color: '#f59e0b',
    quiz: [
      {
        id: 'q13-1',
        type: 'multiple-choice',
        question: 'What does @decorator syntax do?',
        options: [
          'It\'s a comment',
          'It wraps the function below it with the decorator function',
          'It imports a module',
          'It defines a class'
        ],
        correctAnswer: 1,
        explanation: '@decorator is syntactic sugar for: func = decorator(func). It replaces the original function with the wrapper returned by the decorator.'
      },
      {
        id: 'q13-2',
        type: 'predict-output',
        question: 'What is printed?',
        code: 'def outer(x):\n    def inner():\n        return x * 2\n    return inner\n\ndouble = outer(5)\nprint(double())',
        options: ['5', '10', 'inner', 'Error'],
        correctAnswer: 1,
        explanation: 'outer(5) creates a closure where inner remembers x=5. Calling double() executes inner(), returning 5*2=10.'
      },
      {
        id: 'q13-3',
        type: 'multiple-choice',
        question: 'Why do we use functools.wraps in decorators?',
        options: [
          'To make the decorator faster',
          'To preserve the original function\'s __name__ and __doc__',
          'To allow multiple arguments',
          'It is required for all decorators'
        ],
        correctAnswer: 1,
        explanation: 'Without functools.wraps, the wrapped function\'s __name__ becomes "wrapper". functools.wraps copies metadata (name, docstring) from the original function to the wrapper.'
      }
    ],
    lessons: [
      {
        id: 'lesson-13-1',
        moduleId: 'module-13',
        order: 1,
        title: 'Closures & First-Class Functions',
        objective: 'Understand that functions are objects, can be passed and returned, and create closures.',
        explanation: `In Python, **functions are first-class objects** — they can be assigned to variables, passed as arguments, and returned from other functions.

\`\`\`python
def greet(name):
    return f"Hello, {name}!"

say_hello = greet          # assign to variable
print(say_hello("Alice"))  # Hello, Alice!

# Pass function as argument
def apply(func, value):
    return func(value)

print(apply(greet, "Bob"))  # Hello, Bob!
\`\`\`

A **closure** is a function that "remembers" variables from its enclosing scope even after that scope has ended.

\`\`\`python
def make_multiplier(factor):
    def multiply(n):
        return n * factor   # 'factor' is remembered!
    return multiply

double = make_multiplier(2)
triple = make_multiplier(3)

print(double(5))   # 10
print(triple(5))   # 15
print(double(7))   # 14
\`\`\`

Closures are the foundation for **decorators, partial functions, and factory functions**.`,
        analogy: 'A closure is like a backpack the inner function carries everywhere — it holds the variables from the outer function even after the outer function has finished. No matter where the inner function is called, it still has access to those variables in its backpack.',
        exampleCode: `# 1. Functions as first-class objects
operations = {
    "add": lambda x, y: x + y,
    "sub": lambda x, y: x - y,
    "mul": lambda x, y: x * y,
    "div": lambda x, y: x / y if y != 0 else "Error"
}

for name, op in operations.items():
    print(f"{name}(10, 3) = {op(10, 3)}")

# 2. Closure: counter factory
def make_counter(start=0, step=1):
    count = [start]   # mutable container so closure can modify it

    def counter():
        val = count[0]
        count[0] += step
        return val

    def reset():
        count[0] = start

    # Return multiple functions that share the same 'count'
    return counter, reset

count, reset = make_counter(0, 5)
print("\\nCounter:")
print(count())   # 0
print(count())   # 5
print(count())   # 10
reset()
print(count())   # 0 (after reset)

# 3. Partial application via closure
def power_of(exp):
    def apply(base):
        return base ** exp
    return apply

square = power_of(2)
cube   = power_of(3)
print("\\n2^8 =", square(256))
print("3^3 =", cube(3))`,
        lineByLine: [
          { line: 'operations = {..., "add": lambda x,y: x+y, ...}', explanation: 'Lambdas stored in a dict as values. Functions are objects just like numbers or strings.' },
          { line: 'count = [start]', explanation: 'We wrap count in a list because closures can read but not rebind simple variables. A list is mutable, so count[0] can be updated.' },
          { line: 'def counter(): val = count[0] ...', explanation: 'counter() is a closure — it captures count from make_counter\'s scope.' },
          { line: 'return counter, reset', explanation: 'Returns TWO closures that share the same count list — like mini-objects.' },
          { line: 'def power_of(exp): def apply(base): return base**exp', explanation: 'power_of is a factory: it creates a customised function for any exponent.' }
        ],
        expectedOutput: 'add(10, 3) = 13\nsub(10, 3) = 7\nmul(10, 3) = 30\ndiv(10, 3) = 3.3333333333333335\n\nCounter:\n0\n5\n10\n0 (after reset)\n\n2^8 = 256\n3^3 = 27',
        starterCode: `# Create a make_adder(n) factory that returns a function
# which adds n to its argument.

# make_adder(5)(3)  → 8
# make_adder(10)(7) → 17

def make_adder(n):
    pass  # Replace with closure

add5  = make_adder(5)
add10 = make_adder(10)
print(add5(3))    # 8
print(add10(7))   # 17
print(add5(add10(2)))  # 17 (add10(2)=12, add5(12)=17)
`,
        commonMistakes: [
          { mistake: 'Expecting a new closure for each loop iteration', explanation: 'funcs = [lambda: i for i in range(3)] — all lambdas capture the same i, ending at 2.', fix: 'Use default argument: lambda i=i: i — this captures i\'s current value.' },
          { mistake: 'Modifying a captured primitive', explanation: 'count += 1 inside a closure raises UnboundLocalError because Python treats it as a new local.', fix: 'Use nonlocal count, or wrap in a mutable container like count = [0].' }
        ],
        exercise: {
          id: 'ex-13-1',
          title: 'Function Factory',
          description: 'Write make_adder(n) and make_multiplier(n) factory functions using closures.',
          difficulty: 'intermediate',
          starterCode: `def make_adder(n):
    def adder(x):
        return x + n
    return adder

def make_multiplier(n):
    def multiplier(x):
        return x * n
    return multiplier

add5 = make_adder(5)
mul3 = make_multiplier(3)
print(add5(10))       # 15
print(mul3(7))        # 21
print(add5(mul3(4)))  # 17`,
          solution: `def make_adder(n):
    def adder(x):
        return x + n
    return adder

def make_multiplier(n):
    def multiplier(x):
        return x * n
    return multiplier

add5 = make_adder(5)
mul3 = make_multiplier(3)
print(add5(10))
print(mul3(7))
print(add5(mul3(4)))`,
          hints: ['Define an inner function inside make_adder that uses n from the outer scope.', 'Return the inner function (not its result — no parentheses).'],
          testCases: [
            { id: 'ex13-1-1', description: 'add5(10) = 15', type: 'contains', expectedOutput: '15' },
            { id: 'ex13-1-2', description: 'mul3(7) = 21', type: 'contains', expectedOutput: '21' }
          ],
          concepts: ['closures', 'factory functions', 'first-class functions']
        },
        prerequisites: ['lesson-8-1'],
        estimatedMinutes: 16,
        tags: ['closures', 'first-class functions', 'factory']
      },
      {
        id: 'lesson-13-2',
        moduleId: 'module-13',
        order: 2,
        title: 'Writing Decorators',
        objective: 'Write decorators that add behaviour to functions without modifying their source code.',
        explanation: `A **decorator** is a function that takes a function and returns an enhanced version of it.

\`\`\`python
def my_decorator(func):
    def wrapper(*args, **kwargs):
        print("Before the function")
        result = func(*args, **kwargs)   # call original
        print("After the function")
        return result
    return wrapper

@my_decorator          # same as: greet = my_decorator(greet)
def greet(name):
    print(f"Hello, {name}!")

greet("Alice")
# Before the function
# Hello, Alice!
# After the function
\`\`\`

Always use **functools.wraps** to preserve the original function's metadata:

\`\`\`python
from functools import wraps

def timer(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        import time
        start = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(f"{func.__name__} took {elapsed:.4f}s")
        return result
    return wrapper
\`\`\`

**Decorators with arguments** need an extra layer:

\`\`\`python
def repeat(times):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for _ in range(times):
                func(*args, **kwargs)
        return wrapper
    return decorator

@repeat(3)
def say(msg):
    print(msg)

say("Hi!")   # prints "Hi!" three times
\`\`\``,
        analogy: 'A decorator is like gift-wrapping. The original gift (function) stays the same inside — the decorator just adds a pretty wrapper around it that does extra things before/after revealing the gift.',
        exampleCode: `from functools import wraps

# 1. Simple logging decorator
def log_calls(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__} with args={args} kwargs={kwargs}")
        result = func(*args, **kwargs)
        print(f"{func.__name__} returned {result!r}")
        return result
    return wrapper

# 2. Memoization decorator (cache results)
def memoize(func):
    cache = {}
    @wraps(func)
    def wrapper(*args):
        if args not in cache:
            cache[args] = func(*args)
        return cache[args]
    return wrapper

# 3. Retry decorator with argument
def retry(max_attempts=3):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(1, max_attempts + 1):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    print(f"Attempt {attempt} failed: {e}")
                    if attempt == max_attempts:
                        raise
        return wrapper
    return decorator

@log_calls
def add(a, b):
    return a + b

@memoize
def fib(n):
    if n < 2:
        return n
    return fib(n-1) + fib(n-2)

print("--- log_calls demo ---")
add(3, 4)

print("\\n--- memoize demo ---")
print("fib(30) =", fib(30))   # fast due to caching
print("fib(35) =", fib(35))`,
        lineByLine: [
          { line: '@wraps(func)', explanation: 'Copies __name__, __doc__, __module__ from func to wrapper so debugging tools see the original name.' },
          { line: 'def wrapper(*args, **kwargs)', explanation: '*args and **kwargs make the wrapper accept any arguments the original function takes.' },
          { line: 'cache = {}', explanation: 'The cache dict lives in the memoize closure. It persists between calls of wrapper.' },
          { line: 'if args not in cache:', explanation: 'First time we see these arguments: compute and store. Subsequent calls return cached result instantly.' },
          { line: 'def retry(max_attempts=3):', explanation: 'Decorator factory — retry() returns a decorator. The extra layer allows passing arguments to the decorator.' }
        ],
        expectedOutput: '--- log_calls demo ---\nCalling add with args=(3, 4) kwargs={}\nadd returned 7\n\n--- memoize demo ---\nfib(30) = 832040\nfib(35) = 9227465',
        starterCode: `from functools import wraps

# Write a 'validate_positive' decorator
# It should raise ValueError if any numeric argument is negative or zero
# Otherwise call the original function normally

def validate_positive(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        for arg in args:
            if isinstance(arg, (int, float)) and arg <= 0:
                raise ValueError(f"All arguments must be positive, got {arg}")
        return func(*args, **kwargs)
    return wrapper

@validate_positive
def area_of_rect(width, height):
    return width * height

# Test it:
print(area_of_rect(5, 3))   # 15
try:
    print(area_of_rect(-2, 5))  # Should raise ValueError
except ValueError as e:
    print(f"Error: {e}")
`,
        commonMistakes: [
          { mistake: 'Forgetting to return the wrapper', explanation: 'If you write the wrapper but don\'t return it, the decorator replaces the function with None.', fix: 'Always end the decorator with return wrapper.' },
          { mistake: 'Not using *args, **kwargs in wrapper', explanation: 'A wrapper without *args, **kwargs can\'t forward arguments to the original function.', fix: 'Use def wrapper(*args, **kwargs): and call func(*args, **kwargs).' }
        ],
        exercise: {
          id: 'ex-13-2',
          title: 'Build a Timer Decorator',
          description: 'Write a @timer decorator that prints how long a function took to run (in milliseconds).',
          difficulty: 'intermediate',
          starterCode: `import time
from functools import wraps

def timer(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed_ms = (time.perf_counter() - start) * 1000
        print(f"{func.__name__} took {elapsed_ms:.2f}ms")
        return result
    return wrapper

@timer
def slow_sum(n):
    return sum(range(n))

result = slow_sum(1_000_000)
print("Sum:", result)`,
          solution: `import time
from functools import wraps

def timer(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed_ms = (time.perf_counter() - start) * 1000
        print(f"{func.__name__} took {elapsed_ms:.2f}ms")
        return result
    return wrapper

@timer
def slow_sum(n):
    return sum(range(n))

result = slow_sum(1_000_000)
print("Sum:", result)`,
          hints: ['Use time.perf_counter() before and after calling func.', 'Multiply the difference by 1000 to convert to milliseconds.', 'Don\'t forget to return the result from wrapper.'],
          testCases: [
            { id: 'ex13-2-1', description: 'Timer output mentions slow_sum', type: 'contains', expectedOutput: 'slow_sum took' },
            { id: 'ex13-2-2', description: 'Sum is correct', type: 'contains', expectedOutput: '499999500000' }
          ],
          concepts: ['decorators', 'functools.wraps', 'timing', 'closures']
        },
        prerequisites: ['lesson-13-1'],
        estimatedMinutes: 20,
        tags: ['decorators', '@wraps', 'functools', 'memoize']
      }
    ]
  },

  // ── Module 14: File I/O & JSON ────────────────────────────────────────
  {
    id: 'module-14',
    order: 14,
    title: 'File I/O & JSON',
    description: 'Read and write files, parse CSV data, work with JSON, and use the pathlib library.',
    icon: '📁',
    color: '#10b981',
    quiz: [
      {
        id: 'q14-1',
        type: 'multiple-choice',
        question: 'What is the best way to open a file in Python to ensure it is properly closed?',
        options: ['f = open("file.txt")', 'with open("file.txt") as f:', 'file.open("file.txt")', 'open("file.txt", close=True)'],
        correctAnswer: 1,
        explanation: 'The with statement (context manager) automatically closes the file when the block exits, even if an exception occurs. It\'s the recommended way to work with files.'
      },
      {
        id: 'q14-2',
        type: 'multiple-choice',
        question: 'Which mode opens a file for writing and creates it if it doesn\'t exist?',
        options: ['r', 'a', 'w', 'x'],
        correctAnswer: 2,
        explanation: '"w" opens for writing, creating the file if it doesn\'t exist, and truncating it if it does. "a" appends, "r" reads only, "x" creates a new file (fails if exists).'
      },
      {
        id: 'q14-3',
        type: 'predict-output',
        question: 'What does json.dumps({"name": "Alice", "age": 30}) return?',
        options: ['A dict', '"{\\"name\\": \\"Alice\\", \\"age\\": 30}"', 'A file', 'None'],
        correctAnswer: 1,
        explanation: 'json.dumps() converts a Python dict to a JSON string. json.dump() writes to a file. json.loads() parses a JSON string back to Python.'
      }
    ],
    lessons: [
      {
        id: 'lesson-14-1',
        moduleId: 'module-14',
        order: 1,
        title: 'Reading & Writing Files',
        objective: 'Open, read, write, and append to text files safely using context managers.',
        explanation: `Python's built-in \`open()\` function gives you access to files. Always use the **with** statement to ensure files are closed automatically.

**File modes:**
| Mode | Meaning |
|------|---------|
| \`r\` | Read (default) — file must exist |
| \`w\` | Write — creates or truncates |
| \`a\` | Append — creates or appends |
| \`x\` | Exclusive create — fails if exists |
| \`rb\`/\`wb\` | Binary read/write |

\`\`\`python
# Write a file
with open("notes.txt", "w") as f:
    f.write("Line 1\\n")
    f.write("Line 2\\n")
    f.writelines(["Line 3\\n", "Line 4\\n"])

# Read entire file
with open("notes.txt", "r") as f:
    content = f.read()
    print(content)

# Read line by line (memory-efficient for large files)
with open("notes.txt") as f:
    for line in f:
        print(line.strip())

# Read all lines as a list
with open("notes.txt") as f:
    lines = f.readlines()
\`\`\`

**pathlib** offers a modern, cross-platform file API:

\`\`\`python
from pathlib import Path

p = Path("data") / "notes.txt"   # smart path joining
p.parent.mkdir(parents=True, exist_ok=True)
p.write_text("Hello from pathlib!")
print(p.read_text())
print(p.exists())    # True
print(p.suffix)      # .txt
print(p.stem)        # notes
\`\`\``,
        analogy: 'Opening a file is like checking out a book from a library. The "with" statement is like a smart library card that automatically returns the book when you\'re done reading — you never forget to return it.',
        exampleCode: `import tempfile
import os
from pathlib import Path

# Use a temp directory so we don't clutter the filesystem
tmp = Path(tempfile.mkdtemp())
notes_path = tmp / "notes.txt"

# 1. Write
with open(notes_path, "w") as f:
    for i in range(1, 6):
        f.write(f"Note {i}: Python is awesome!\\n")

print(f"✅ Written to {notes_path.name}")

# 2. Read entire file
with open(notes_path) as f:
    content = f.read()
print("\\nFull content:")
print(content)

# 3. Append
with open(notes_path, "a") as f:
    f.write("Note 6: File I/O is easy.\\n")

# 4. Read line by line
print("Line-by-line:")
with open(notes_path) as f:
    for i, line in enumerate(f, 1):
        print(f"  [{i}] {line.rstrip()}")

# 5. pathlib helpers
p = notes_path
print(f"\\nFile: {p.name}, size: {p.stat().st_size} bytes")
print(f"Exists: {p.exists()}, suffix: {p.suffix}")`,
        lineByLine: [
          { line: 'with open(notes_path, "w") as f:', explanation: 'Opens the file for writing. "with" guarantees f.close() is called even if an error occurs inside the block.' },
          { line: 'f.write(f"Note {i}...\\n")', explanation: 'Writes a string to the file. \\n adds a newline — write() doesn\'t add one automatically.' },
          { line: 'content = f.read()', explanation: 'Reads the entire file into a single string. Fine for small files; use iteration for large ones.' },
          { line: 'for i, line in enumerate(f, 1):', explanation: 'Iterates the file line by line — Python buffers reading, so this is memory-efficient even for gigabyte files.' },
          { line: 'p.stat().st_size', explanation: 'pathlib\'s stat() returns file metadata. st_size is the size in bytes.' }
        ],
        expectedOutput: '✅ Written to notes.txt\n\nFull content:\nNote 1: Python is awesome!\nNote 2: Python is awesome!\nNote 3: Python is awesome!\nNote 4: Python is awesome!\nNote 5: Python is awesome!\n\nLine-by-line:\n  [1] Note 1: Python is awesome!\n  [2] Note 2: Python is awesome!\n  [3] Note 3: Python is awesome!\n  [4] Note 4: Python is awesome!\n  [5] Note 5: Python is awesome!\n  [6] Note 6: File I/O is easy.',
        starterCode: `import tempfile
from pathlib import Path

tmp = Path(tempfile.mkdtemp())
diary_path = tmp / "diary.txt"

# 1. Write 3 diary entries to diary.txt (one per line)
entries = [
    "Day 1: Started learning Python.",
    "Day 2: Learned about loops.",
    "Day 3: Mastered file I/O!"
]
with open(diary_path, "w") as f:
    for entry in entries:
        f.write(entry + "\\n")

# 2. Read and print each line with its line number
with open(diary_path) as f:
    for i, line in enumerate(f, 1):
        print(f"[{i}] {line.rstrip()}")

# 3. Append a 4th entry
with open(diary_path, "a") as f:
    f.write("Day 4: Wrote my own file diary!\\n")

# 4. Print total number of lines
lines = diary_path.read_text().splitlines()
print(f"Total entries: {len(lines)}")
`,
        commonMistakes: [
          { mistake: 'Forgetting \\n when writing lines', explanation: 'f.write("hello") writes "hello" with no newline. The next write starts immediately after.', fix: 'Use f.write("hello\\n") or f.writelines([l+"\\n" for l in lines]).' },
          { mistake: 'Reading a file after writing without closing and reopening', explanation: 'After writing, the file cursor is at the end. read() returns empty string.', fix: 'Close and reopen the file, or seek back to the start: f.seek(0).' }
        ],
        exercise: {
          id: 'ex-14-1',
          title: 'Word Frequency Counter',
          description: 'Write a function that reads text, counts word frequencies, and writes the top-5 words to an output file.',
          difficulty: 'intermediate',
          starterCode: `import tempfile
from pathlib import Path
from collections import Counter

tmp = Path(tempfile.mkdtemp())
input_path = tmp / "text.txt"
output_path = tmp / "freq.txt"

# Create sample input
input_path.write_text("""
python is great python is fun
learning python makes you great
python python python loves you
""")

# Count word frequencies
text = input_path.read_text().lower()
words = text.split()
freq = Counter(words)
top5 = freq.most_common(5)

# Write results
with open(output_path, "w") as f:
    f.write("Top 5 words:\\n")
    for word, count in top5:
        f.write(f"  {word}: {count}\\n")

# Print output file
print(output_path.read_text())`,
          solution: `import tempfile
from pathlib import Path
from collections import Counter

tmp = Path(tempfile.mkdtemp())
input_path = tmp / "text.txt"
output_path = tmp / "freq.txt"
input_path.write_text("""
python is great python is fun
learning python makes you great
python python python loves you
""")
text = input_path.read_text().lower()
words = text.split()
freq = Counter(words)
top5 = freq.most_common(5)
with open(output_path, "w") as f:
    f.write("Top 5 words:\\n")
    for word, count in top5:
        f.write(f"  {word}: {count}\\n")
print(output_path.read_text())`,
          hints: ['Use text.split() to get individual words.', 'Counter(words).most_common(5) gives top-5 (word, count) tuples.', 'Use f.write(f"  {word}: {count}\\n") for each entry.'],
          testCases: [
            { id: 'ex14-1-1', description: 'Output mentions python', type: 'contains', expectedOutput: 'python' },
            { id: 'ex14-1-2', description: 'Top 5 words shown', type: 'contains', expectedOutput: 'Top 5 words' }
          ],
          concepts: ['file I/O', 'pathlib', 'Counter', 'word frequency']
        },
        prerequisites: ['lesson-6-1'],
        estimatedMinutes: 18,
        tags: ['file I/O', 'pathlib', 'read', 'write', 'append']
      },
      {
        id: 'lesson-14-2',
        moduleId: 'module-14',
        order: 2,
        title: 'JSON — Encode & Decode',
        objective: 'Serialize Python objects to JSON strings/files and parse JSON back to Python.',
        explanation: `**JSON (JavaScript Object Notation)** is the most common data interchange format. Python's \`json\` module handles it natively.

**Python ↔ JSON type mapping:**
| Python | JSON |
|--------|------|
| dict | object {} |
| list, tuple | array [] |
| str | string |
| int, float | number |
| True/False | true/false |
| None | null |

\`\`\`python
import json

# Python dict → JSON string
data = {"name": "Alice", "age": 30, "skills": ["Python", "SQL"]}
json_str = json.dumps(data, indent=2)
print(json_str)

# JSON string → Python dict
parsed = json.loads(json_str)
print(parsed["name"])   # Alice

# Write to file
with open("data.json", "w") as f:
    json.dump(data, f, indent=2)

# Read from file
with open("data.json") as f:
    loaded = json.load(f)
\`\`\`

**Pretty printing and sorting:**
\`\`\`python
print(json.dumps(data, indent=4, sort_keys=True))
\`\`\``,
        analogy: 'JSON is like a universal language that any programming language can speak. When Python and JavaScript need to talk, they both agree to use JSON as the translator — a simple text format both can read and write.',
        exampleCode: `import json
import tempfile
from pathlib import Path

# 1. Encoding Python → JSON
student = {
    "name": "Alice",
    "grade": 10,
    "gpa": 3.85,
    "active": True,
    "courses": ["Math", "Physics", "CS"],
    "address": {"city": "Boston", "zip": "02101"}
}

json_str = json.dumps(student, indent=2)
print("JSON string:")
print(json_str)

# 2. Decoding JSON → Python
raw_json = '{"x": 1, "y": [1, 2, 3], "z": null}'
parsed = json.loads(raw_json)
print("\\nParsed:", parsed)
print("Type of z:", type(parsed["z"]))   # <class 'NoneType'>
print("Type of y:", type(parsed["y"]))   # <class 'list'>

# 3. File round-trip
tmp = Path(tempfile.mkdtemp())
path = tmp / "student.json"

with open(path, "w") as f:
    json.dump(student, f, indent=2, sort_keys=True)

print(f"\\nSaved to {path.name} ({path.stat().st_size} bytes)")

with open(path) as f:
    loaded = json.load(f)

print("Loaded name:", loaded["name"])
print("Loaded courses:", loaded["courses"])
print("City:", loaded["address"]["city"])`,
        lineByLine: [
          { line: 'json.dumps(data, indent=2)', explanation: '"dumps" = dump to String. indent=2 produces pretty-printed JSON with 2-space indentation.' },
          { line: 'json.loads(raw_json)', explanation: '"loads" = load from String. Parses JSON text and returns the equivalent Python object.' },
          { line: 'json.dump(data, f, indent=2)', explanation: '"dump" (no s) writes directly to a file object f.' },
          { line: 'json.load(f)', explanation: '"load" (no s) reads from a file object and returns the parsed Python object.' },
          { line: 'type(parsed["z"])', explanation: 'JSON null maps to Python None. JSON true/false map to Python True/False.' }
        ],
        expectedOutput: 'JSON string:\n{\n  "name": "Alice",\n  "grade": 10,\n  "gpa": 3.85,\n  "active": true,\n  "courses": [\n    "Math",\n    "Physics",\n    "CS"\n  ],\n  "address": {\n    "city": "Boston",\n    "zip": "02101"\n  }\n}\n\nParsed: {\'x\': 1, \'y\': [1, 2, 3], \'z\': None}\nType of z: <class \'NoneType\'>\nType of y: <class \'list\'>',
        starterCode: `import json

# A list of products
products = [
    {"id": 1, "name": "Laptop", "price": 999.99, "in_stock": True},
    {"id": 2, "name": "Mouse", "price": 29.99, "in_stock": True},
    {"id": 3, "name": "Monitor", "price": 399.00, "in_stock": False}
]

# 1. Convert products list to a JSON string with indent=2
json_str = json.dumps(products, indent=2)
print(json_str)

# 2. Parse it back and print the name of the most expensive product
parsed = json.loads(json_str)
most_expensive = max(parsed, key=lambda p: p["price"])
print("Most expensive:", most_expensive["name"])

# 3. Filter in-stock products and print their names
in_stock = [p["name"] for p in parsed if p["in_stock"]]
print("In stock:", in_stock)
`,
        commonMistakes: [
          { mistake: 'Confusing dumps/loads with dump/load', explanation: 'dumps and loads work with strings. dump and load work with file objects. Mixing them raises TypeError.', fix: 'If you have a string, use json.loads(). If you have a file, use json.load(file).' },
          { mistake: 'Trying to JSON-serialize a non-JSON-serialisable type', explanation: 'datetime, set, bytes, and custom objects can\'t be serialised by default. json.dumps(datetime.now()) raises TypeError.', fix: 'Use str() to convert non-serialisable values, or write a custom default= handler.' }
        ],
        exercise: {
          id: 'ex-14-2',
          title: 'JSON Config Reader',
          description: 'Parse a JSON config string, update a value, and serialise it back to a formatted string.',
          difficulty: 'intermediate',
          starterCode: `import json

config_json = """
{
  "app": "PyLearn",
  "version": "2.0",
  "debug": false,
  "max_users": 100,
  "features": ["lessons", "quizzes", "playground"]
}
"""

# 1. Parse the config
config = json.loads(config_json)

# 2. Enable debug mode and increase max_users to 500
config["debug"] = True
config["max_users"] = 500

# 3. Add a new feature "exercises"
config["features"].append("exercises")

# 4. Print the updated config as pretty JSON
print(json.dumps(config, indent=2))`,
          solution: `import json

config_json = """
{
  "app": "PyLearn",
  "version": "2.0",
  "debug": false,
  "max_users": 100,
  "features": ["lessons", "quizzes", "playground"]
}
"""
config = json.loads(config_json)
config["debug"] = True
config["max_users"] = 500
config["features"].append("exercises")
print(json.dumps(config, indent=2))`,
          hints: ['json.loads() parses the string into a dict.', 'Modify the dict like any other Python dict.', 'json.dumps(config, indent=2) converts back to pretty JSON.'],
          testCases: [
            { id: 'ex14-2-1', description: 'debug is true in output', type: 'contains', expectedOutput: '"debug": true' },
            { id: 'ex14-2-2', description: 'max_users is 500', type: 'contains', expectedOutput: '"max_users": 500' },
            { id: 'ex14-2-3', description: 'exercises feature added', type: 'contains', expectedOutput: 'exercises' }
          ],
          concepts: ['JSON', 'json.loads', 'json.dumps', 'serialisation']
        },
        prerequisites: ['lesson-14-1'],
        estimatedMinutes: 15,
        tags: ['JSON', 'json.dumps', 'json.loads', 'serialisation', 'file']
      }
    ]
  },

  // ── Module 15: Regular Expressions ───────────────────────────────────
  {
    id: 'module-15',
    order: 15,
    title: 'Regular Expressions',
    description: 'Use Python\'s re module to search, match, extract, and replace patterns in strings with regex.',
    icon: '🔍',
    color: '#ef4444',
    quiz: [
      {
        id: 'q15-1',
        type: 'multiple-choice',
        question: 'What does re.search() return if no match is found?',
        options: ['False', '""', 'None', '0'],
        correctAnswer: 2,
        explanation: 're.search() returns a Match object if found, or None if not. Always check: if match: before calling match.group().'
      },
      {
        id: 'q15-2',
        type: 'multiple-choice',
        question: 'Which pattern matches one or more digits?',
        options: ['\\\\d', '\\\\d*', '\\\\d+', '\\\\d?'],
        correctAnswer: 2,
        explanation: '\\d matches one digit. \\d+ means "one or more digits". \\d* means "zero or more". \\d? means "zero or one".'
      },
      {
        id: 'q15-3',
        type: 'predict-output',
        question: 'What does re.findall(r"\\\\d+", "abc 42 def 7") return?',
        options: ['["42", "7"]', '[42, 7]', '"42 7"', '["42"]'],
        correctAnswer: 0,
        explanation: 're.findall() returns a list of ALL non-overlapping matches as strings. \\d+ matches sequences of digits, finding "42" and "7".'
      }
    ],
    lessons: [
      {
        id: 'lesson-15-1',
        moduleId: 'module-15',
        order: 1,
        title: 'Pattern Matching with re',
        objective: 'Write regular expressions to search, match, and extract patterns from strings.',
        explanation: `**Regular expressions (regex)** are mini-patterns that describe text structures. Python's \`re\` module provides all regex operations.

**Key functions:**

| Function | Purpose |
|----------|---------|
| \`re.match()\` | Match at the START of string |
| \`re.search()\` | Find ANYWHERE in string |
| \`re.findall()\` | Return ALL matches as list |
| \`re.sub()\` | Replace matches |
| \`re.split()\` | Split by pattern |

**Essential pattern syntax:**

| Pattern | Matches |
|---------|---------|
| \`.\` | Any character (except newline) |
| \`\\d\` | Digit [0-9] |
| \`\\w\` | Word char [a-zA-Z0-9_] |
| \`\\s\` | Whitespace |
| \`\\D\` | Non-digit |
| \`^\` | Start of string |
| \`$\` | End of string |
| \`+\` | One or more |
| \`*\` | Zero or more |
| \`?\` | Zero or one |
| \`{n,m}\` | Between n and m |
| \`[abc]\` | Any of a, b, c |
| \`(group)\` | Capture group |

\`\`\`python
import re

text = "Contact us at support@example.com or admin@test.org"

# Find all email addresses
emails = re.findall(r"[\\w.]+@[\\w.]+\\.[a-z]{2,}", text)
print(emails)  # ['support@example.com', 'admin@test.org']

# Validate a phone number
phone = "555-867-5309"
if re.match(r"^\\d{3}-\\d{3}-\\d{4}$", phone):
    print("Valid phone!")
\`\`\``,
        analogy: 'Regular expressions are like a highly advanced "Find" in a word processor. Instead of searching for exact text, you describe a PATTERN — like "find any word that starts with a capital letter followed by 3-6 lowercase letters and ends with a digit".',
        exampleCode: `import re

# 1. Basic search and match
text = "Python 3.11 was released in 2022 and Python 3.12 in 2023."

# Find all version numbers
versions = re.findall(r"\\d+\\.\\d+", text)
print("Versions:", versions)

# Find all years
years = re.findall(r"\\b20\\d{2}\\b", text)
print("Years:", years)

# 2. Groups — extract structured data
log_line = "2024-01-15 ERROR [auth] Login failed for user 'alice'"
pattern = r"(\\d{4}-\\d{2}-\\d{2})\\s+(\\w+)\\s+\\[(\\w+)\\]\\s+(.+)"
match = re.match(pattern, log_line)
if match:
    date, level, module, message = match.groups()
    print(f"\\nDate: {date}")
    print(f"Level: {level}")
    print(f"Module: {module}")
    print(f"Message: {message}")

# 3. Substitution
dirty = "Hello,   World!  Extra   spaces."
clean = re.sub(r"\\s+", " ", dirty).strip()
print("\\nCleaned:", clean)

# 4. Split by multiple delimiters
csv_like = "apple, banana; cherry | date"
fruits = re.split(r"[,;|]\\s*", csv_like)
print("Fruits:", fruits)

# 5. Email validation
emails = ["user@example.com", "bad-email", "another@test.org", "@broken.com"]
pattern = r"^[\\w.+-]+@[\\w-]+\\.[a-zA-Z]{2,}$"
for email in emails:
    valid = bool(re.match(pattern, email))
    print(f"  {'✅' if valid else '❌'} {email}")`,
        lineByLine: [
          { line: 'r"\\\\d+\\\\.\\\\d+"', explanation: 'Raw string (r"") means backslashes are literal. \\d+ = digits, \\. = literal dot, \\d+ = more digits. Matches "3.11", "3.12".' },
          { line: 'r"\\\\b20\\\\d{2}\\\\b"', explanation: '\\b is a word boundary. 20 is literal. \\d{2} means exactly 2 digits. Matches "2022", "2023" but not "20220".' },
          { line: 'match.groups()', explanation: 'Returns a tuple of all capture group matches, in the order they appear in the pattern.' },
          { line: 're.sub(r"\\\\s+", " ", dirty)', explanation: '\\s+ matches one or more whitespace chars. Replaces each run of spaces with a single space.' },
          { line: 're.split(r"[,;|]\\\\s*", csv_like)', explanation: 'Character class [,;|] matches any of , ; |. \\s* allows optional whitespace after the delimiter.' }
        ],
        expectedOutput: 'Versions: [\'3.11\', \'3.12\']\nYears: [\'2022\', \'2023\']\n\nDate: 2024-01-15\nLevel: ERROR\nModule: auth\nMessage: Login failed for user \'alice\'\n\nCleaned: Hello, World! Extra spaces.\nFruits: [\'apple\', \'banana\', \'cherry\', \'date\']\n  ✅ user@example.com\n  ❌ bad-email\n  ✅ another@test.org\n  ❌ @broken.com',
        starterCode: `import re

# 1. Extract all hashtags from a social media post
post = "Loving #Python and #coding! Check out #PyLearn for #beginners."
hashtags = re.findall(r"#\\w+", post)
print("Hashtags:", hashtags)

# 2. Validate an IP address (IPv4: four groups of 1-3 digits separated by dots)
def is_valid_ip(ip):
    pattern = r"^(\\d{1,3}\\.){3}\\d{1,3}$"
    return bool(re.match(pattern, ip))

test_ips = ["192.168.1.1", "255.255.255.0", "999.0.0.1", "not-an-ip"]
for ip in test_ips:
    print(f"  {ip}: {'valid' if is_valid_ip(ip) else 'invalid'}")

# 3. Replace all numbers in a string with '#'
text = "I have 3 cats and 10 fish. My phone is 555-1234."
masked = re.sub(r"\\d+", "#", text)
print("\\nMasked:", masked)
`,
        commonMistakes: [
          { mistake: 'Forgetting to use raw strings for regex', explanation: '"\\d" is not the same as r"\\d". In a non-raw string, \\d becomes just "d" after Python processes the backslash escape.', fix: 'Always prefix regex patterns with r: r"\\d+" instead of "\\d+".' },
          { mistake: 'Using match() when you need search()', explanation: 're.match() only matches at the START of the string. It fails if the pattern is in the middle.', fix: 'Use re.search() to find a pattern anywhere in the string.' }
        ],
        exercise: {
          id: 'ex-15-1',
          title: 'Log File Parser',
          description: 'Use regex to extract timestamps, log levels, and messages from log lines. Count errors and warnings.',
          difficulty: 'advanced',
          starterCode: `import re
from collections import Counter

logs = """
2024-03-01 08:12:33 INFO  Server started on port 8080
2024-03-01 08:13:01 ERROR Database connection failed: timeout
2024-03-01 08:13:05 WARN  Retrying connection (attempt 1/3)
2024-03-01 08:13:10 ERROR Database connection failed: timeout
2024-03-01 08:13:15 INFO  Fallback to cache enabled
2024-03-01 08:14:00 WARN  Cache hit rate below 50%
2024-03-01 08:15:00 INFO  Request processed in 142ms
"""

# Pattern: timestamp, level, message
pattern = r"(\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2})\\s+(\\w+)\\s+(.+)"

parsed = []
for line in logs.strip().split("\\n"):
    m = re.match(pattern, line.strip())
    if m:
        parsed.append({"time": m.group(1), "level": m.group(2), "msg": m.group(3)})

# Count by level
levels = Counter(entry["level"] for entry in parsed)
print("Log level counts:", dict(levels))

# Print all ERROR entries
print("\\nErrors:")
for entry in parsed:
    if entry["level"] == "ERROR":
        print(f"  [{entry['time']}] {entry['msg']}")`,
          solution: `import re
from collections import Counter

logs = """
2024-03-01 08:12:33 INFO  Server started on port 8080
2024-03-01 08:13:01 ERROR Database connection failed: timeout
2024-03-01 08:13:05 WARN  Retrying connection (attempt 1/3)
2024-03-01 08:13:10 ERROR Database connection failed: timeout
2024-03-01 08:13:15 INFO  Fallback to cache enabled
2024-03-01 08:14:00 WARN  Cache hit rate below 50%
2024-03-01 08:15:00 INFO  Request processed in 142ms
"""
pattern = r"(\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2})\\s+(\\w+)\\s+(.+)"
parsed = []
for line in logs.strip().split("\\n"):
    m = re.match(pattern, line.strip())
    if m:
        parsed.append({"time": m.group(1), "level": m.group(2), "msg": m.group(3)})
levels = Counter(entry["level"] for entry in parsed)
print("Log level counts:", dict(levels))
print("\\nErrors:")
for entry in parsed:
    if entry["level"] == "ERROR":
        print(f"  [{entry['time']}] {entry['msg']}")`,
          hints: ['Use re.match() with capture groups for timestamp, level, message.', 'm.group(1) gets the first capture group.', 'Counter() is perfect for counting how many times each level appears.'],
          testCases: [
            { id: 'ex15-1-1', description: 'ERROR count is 2', type: 'contains', expectedOutput: '\'ERROR\': 2' },
            { id: 'ex15-1-2', description: 'Errors section printed', type: 'contains', expectedOutput: 'Database connection failed' }
          ],
          concepts: ['regex', 'capture groups', 're.match', 'Counter', 'log parsing']
        },
        prerequisites: ['lesson-7-1'],
        estimatedMinutes: 22,
        tags: ['regex', 're', 'pattern matching', 'text processing']
      }
    ]
  }
];


// Standalone practice exercises (beyond lesson exercises)
export const practiceExercises: Exercise[] = [
  {
    id: 'practice-1',
    title: 'Even or Odd',
    description: 'Write a program that prints whether a number is even or odd. Use num = 17.',
    difficulty: 'beginner',
    starterCode: `num = 17
# Print "Even" if num is divisible by 2, otherwise print "Odd"
`,
    solution: `num = 17
if num % 2 == 0:
    print("Even")
else:
    print("Odd")`,
    hints: ['Use the modulus operator %. If num % 2 equals 0, the number is even.', 'Use if-else to print the correct word.'],
    testCases: [{ id: 'p1-1', description: 'Should print Odd for 17', type: 'contains', expectedOutput: 'Odd' }],
    concepts: ['modulus', 'if-else']
  },
  {
    id: 'practice-2',
    title: 'FizzBuzz',
    description: 'Print numbers from 1 to 20. For multiples of 3 print "Fizz", for multiples of 5 print "Buzz", for multiples of both print "FizzBuzz", otherwise print the number.',
    difficulty: 'easy',
    starterCode: `for i in range(1, 21):
    # Add your conditions here
    pass
`,
    solution: `for i in range(1, 21):
    if i % 3 == 0 and i % 5 == 0:
        print("FizzBuzz")
    elif i % 3 == 0:
        print("Fizz")
    elif i % 5 == 0:
        print("Buzz")
    else:
        print(i)`,
    hints: [
      'Check divisibility by both 3 and 5 first (use and).',
      'Then check just 3, then just 5, then the else.',
      'Use i % 3 == 0 to check if i is divisible by 3.'
    ],
    testCases: [
      { id: 'p2-1', description: 'Should contain FizzBuzz', type: 'contains', expectedOutput: 'FizzBuzz' },
      { id: 'p2-2', description: 'Should contain Fizz', type: 'contains', expectedOutput: 'Fizz' }
    ],
    concepts: ['for loop', 'modulus', 'if-elif-else']
  },
  {
    id: 'practice-3',
    title: 'Reverse a String',
    description: 'Write a function called reverse_string(s) that returns the reversed version of a string. Test: reverse_string("hello") should return "olleh".',
    difficulty: 'easy',
    starterCode: `def reverse_string(s):
    # Return the reversed string
    # Hint: use slicing [::-1]
    pass

print(reverse_string("hello"))   # olleh
print(reverse_string("Python"))  # nohtyP
`,
    solution: `def reverse_string(s):
    return s[::-1]

print(reverse_string("hello"))
print(reverse_string("Python"))`,
    hints: [
      'Python strings support slicing: s[start:stop:step].',
      'A step of -1 reverses the string: s[::-1].',
      'Return the reversed string using return.'
    ],
    testCases: [
      { id: 'p3-1', description: 'reverse_string("hello") should output olleh', type: 'contains', expectedOutput: 'olleh' },
      { id: 'p3-2', description: 'reverse_string("Python") should output nohtyP', type: 'contains', expectedOutput: 'nohtyP' }
    ],
    concepts: ['functions', 'slicing', 'strings']
  },
  {
    id: 'practice-4',
    title: 'Count Vowels',
    description: 'Write a function count_vowels(text) that returns the number of vowels (a,e,i,o,u) in a string (case-insensitive). Test: count_vowels("Hello World") should return 3.',
    difficulty: 'intermediate',
    starterCode: `def count_vowels(text):
    vowels = "aeiouAEIOU"
    count = 0
    # Loop through each character in text
    # If the character is in vowels, increment count
    return count

print(count_vowels("Hello World"))  # 3
print(count_vowels("Python"))       # 1
`,
    solution: `def count_vowels(text):
    vowels = "aeiouAEIOU"
    count = 0
    for char in text:
        if char in vowels:
            count += 1
    return count

print(count_vowels("Hello World"))
print(count_vowels("Python"))`,
    hints: [
      'Loop through each character: for char in text:',
      'Check if char is a vowel: if char in vowels:',
      'Use count += 1 to increment the counter.'
    ],
    testCases: [
      { id: 'p4-1', description: 'count_vowels("Hello World") should output 3', type: 'contains', expectedOutput: '3' },
      { id: 'p4-2', description: 'count_vowels("Python") should output 1', type: 'contains', expectedOutput: '1' }
    ],
    concepts: ['functions', 'for loop', 'strings', 'in operator']
  },
  {
    id: 'practice-5',
    title: 'Number Pyramid',
    description: 'Print a number pyramid with 5 rows:\n1\n12\n123\n1234\n12345',
    difficulty: 'intermediate',
    starterCode: `# Print the number pyramid
# Hint: use nested loops or string multiplication

`,
    solution: `for i in range(1, 6):
    row = ""
    for j in range(1, i + 1):
        row += str(j)
    print(row)`,
    hints: [
      'The outer loop controls rows (1 to 5).',
      'The inner loop builds each row by adding numbers 1 to i.',
      'Convert numbers to strings and concatenate them.'
    ],
    testCases: [
      { id: 'p5-1', description: 'Should contain "12345"', type: 'contains', expectedOutput: '12345' },
      { id: 'p5-2', description: 'Should start with "1" on first line', type: 'contains', expectedOutput: '1' }
    ],
    concepts: ['nested loops', 'strings', 'for loop']
  }
];
