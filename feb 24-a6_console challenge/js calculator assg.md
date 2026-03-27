# JavaScript Console Calculator

## Overview

Build a fully functional calculator that runs entirely in the browser's developer console. No HTML or CSS needed — just pure JavaScript logic using functions, conditionals, and arrays.

---

## Part 1: Core Arithmetic Functions

Create four standalone functions that each take two numbers and return the result.

```javascript
function sum(a, b) {
    return a + b;
}

function diff(a, b) {
    return a - b;
}

function product(a, b) {
    return a * b;
}

function quotient(a, b) {
    if (b === 0) {
        return "Cannot divide by zero";
    }
    return a / b;
}
```

### Testing in Console

```javascript
console.log(sum(12, 8));        // 20
console.log(diff(50, 17));      // 33
console.log(product(6, 9));     // 54
console.log(quotient(100, 4));  // 25
console.log(quotient(7, 0));    // Cannot divide by zero
```

---

## Part 2: Unified Calculate Function

Create a single `calculate` function that accepts two numbers and an operator string, then uses **if/else** logic to call the appropriate arithmetic function.

```javascript
function calculate(num1, operator, num2) {
    let output;

    if (operator === "+") {
        output = sum(num1, num2);
    } else if (operator === "-") {
        output = diff(num1, num2);
    } else if (operator === "*") {
        output = product(num1, num2);
    } else if (operator === "/") {
        output = quotient(num1, num2);
    } else {
        output = "Unrecognized operator: " + operator;
    }

    console.log(num1 + " " + operator + " " + num2 + " = " + output);
    return output;
}
```

### Testing in Console

```javascript
calculate(15, "+", 25);   // 15 + 25 = 40
calculate(90, "-", 35);   // 90 - 35 = 55
calculate(7, "*", 8);     // 7 * 8 = 56
calculate(144, "/", 12);  // 144 / 12 = 12
calculate(5, "%", 2);     // Unrecognized operator: %
```

---

## Part 3: Calculation History Tracker

Maintain a running log of every calculation performed. Each entry stores the expression and its answer.

```javascript
let log = [];

function trackedCalculate(num1, operator, num2) {
    let ans = calculate(num1, operator, num2);

    log.push({
        expr: num1 + " " + operator + " " + num2,
        ans: ans
    });

    return ans;
}

function showLog() {
    if (log.length === 0) {
        console.log("No calculations recorded yet.");
        return;
    }
    console.log("--- Calculation Log ---");
    for (let i = 0; i < log.length; i++) {
        console.log((i + 1) + ". " + log[i].expr + " = " + log[i].ans);
    }
    console.log("Total entries: " + log.length);
}

function clearLog() {
    log = [];
    console.log("Log has been cleared.");
}

function lastEntry() {
    if (log.length === 0) {
        return "Log is empty.";
    }
    let recent = log[log.length - 1];
    return recent.expr + " = " + recent.ans;
}
```

### Testing in Console

```javascript
trackedCalculate(20, "+", 30);
trackedCalculate(100, "/", 5);
trackedCalculate(8, "*", 7);
showLog();
// --- Calculation Log ---
// 1. 20 + 30 = 50
// 2. 100 / 5 = 20
// 3. 8 * 7 = 56
// Total entries: 3

console.log(lastEntry());  // 8 * 7 = 56
clearLog();
showLog();  // No calculations recorded yet.
```

---

## Part 4: Bonus - Temperature Converter

As an extra feature, implement two functions for converting between Celsius and Fahrenheit.

```javascript
function celsiusToFahr(celsius) {
    let fahrenheit = (celsius * 9 / 5) + 32;
    console.log(celsius + " C = " + fahrenheit.toFixed(2) + " F");
    return fahrenheit;
}

function fahrToCelsius(fahrenheit) {
    let celsius = (fahrenheit - 32) * 5 / 9;
    console.log(fahrenheit + " F = " + celsius.toFixed(2) + " C");
    return celsius;
}
```

### Testing in Console

```javascript
celsiusToFahr(0);     // 0 C = 32.00 F
celsiusToFahr(100);   // 100 C = 212.00 F
celsiusToFahr(37);    // 37 C = 98.60 F

fahrToCelsius(32);    // 32 F = 0.00 C
fahrToCelsius(212);   // 212 F = 100.00 C
fahrToCelsius(98.6);  // 98.6 F = 37.00 C
```

---

## Concepts Practiced

| Concept | Where Used |
|---|---|
| Functions & Parameters | `sum()`, `diff()`, `product()`, `quotient()` |
| If/Else Conditionals | `calculate()` operator routing |
| Arrays & Objects | `log` array with `{ expr, ans }` entries |
| String Concatenation | Building expression strings for display |
| Edge Case Handling | Division by zero, invalid operators, empty log |
| Math Operations | Temperature conversion formulas |
| `console.log()` | Output and debugging throughout |

---

## How to Run

1. Open any browser (Chrome recommended)
2. Press `F12` or `Ctrl + Shift + J` to open DevTools
3. Go to the **Console** tab
4. Copy-paste each section and run it
5. Call the functions directly to test them
