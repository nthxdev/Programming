
// ==========================================
// 4. OPERATORS
// ==========================================
/*
Arithmetic: +, -, *, /, % (modulo), ** (exponentiation)
Assignment: =, +=, -=, *=, /=, %=, **=
Unary: ++, --, +, -, ~, !

Comparison (Crucial JS/TS distinction):
- Loose Equality (==, !=): Performs implicit type coercion. (e.g., 5 == "5" is true). AVOID.
- Strict Equality (===, !==): Compares VALUE and TYPE. (e.g., 5 === "5" is false). ALWAYS USE.
*/
// Comparison (use === and !==, not == and !=)
const a: number = 10, b: number = 5;
console.log(`\nComparison: ${a} > ${b} is ${a > b}`);
console.log(`Comparison: ${a} == ${b} is ${a == b}`);
console.log(`Strict: ${a} === ${b} is ${a === b}`);

// - Relational: >, <, >=, <=

// Logical:
// - && (AND), || (OR), ! (NOT)
console.log(`\nLogical: true && false = ${true && false}`);
console.log(`Logical: true || false = ${true || false}`);
console.log(`Logical: !true = ${!true}`);

