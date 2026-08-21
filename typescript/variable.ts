// SYNTAX
// Comments
/*
Multi-line
comment 
*/


// ==========================================
// BASIC VARIABLES & CONSTANTS
// ==========================================
/*
- JS/TS Variable Declarations & Scope Mechanics:
- `let`: Block-scoped. Subject to Temporal Dead Zone (TDZ). Reassignable.
- `const`: Block-scoped. Immutable binding (the variable identifier cannot be reassigned), 
- but the contents of objects/arrays it points to ARE mutable.
- `var`: Function-scoped or globally scoped. Hoisted to the top of its execution context 
- with `undefined`. Avoid using `var` in modern TS/JS to prevent scope leakage.
*/
let myLet: string = "Block scoped";
const MY_CONST: number = 100; // Cannot do MY_CONST = 101;
var legacyVar: boolean = false; // Hoisted, avoid.

// Type inference
let inferred = 42;                  // Inferred as number