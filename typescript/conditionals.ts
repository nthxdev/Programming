// ==========================================
// CONDITIONALS (IF FAMILY)
// ==========================================
/*
JS/TS evaluates conditions based on "Truthy" and "Falsy" values.
Falsy values (exactly 6): false, 0 (and -0, 0n), "", null, undefined, NaN.
Everything else is Truthy (including empty arrays [] and empty objects {}).
*/
let condVal: any = "Non-empty string is truthy";

if (condVal) {
    // Executes because string is truthy
} else if (condVal === "Specific") {
    // Nested if logic
    if (true) { }
} else {
    // Fallback
}

// ==========================================
// OTHER CONDITIONALS (SWITCH, TERNARY)
// ==========================================
/*
Switch uses STRICT equality (===) under the hood.
Omitted `break` causes "fall-through" to the next case (often a bug, sometimes intentional).
*/
let switchVar: string = "B";
switch (switchVar) {
    case "A":
        // Logic for A
        break;
    case "B":
    case "C": // Fall-through: executes for B or C
        // Logic for B and C
        break;
    default:
        // Default logic
}

/*
Ternary Operator: condition ? exprIfTrue : exprIfFalse
Expression, so it evaluates to a value.
*/
let ternaryAge: number = 20;
let status1: string = ternaryAge >= 18 ? "Adult" : "Minor";
console.log(`Ternary status: ${status1}\n`);


// - ?? (Nullish Coalescing): Returns right-hand side ONLY if left is `null` or `undefined`.
let nullValue: string | null = null;
let result = nullValue ?? "Default";
console.log(`Nullish coalescing: null ?? "Default" = ${result}`);

// - ?. (Optional Chaining): Safely accesses deeply nested properties.
let optChain1 = userObj?.name;
console.log(`Optional chaining: userObj?.name = ${optChain1}\n`);

let mathRes: number = (10 ** 2) % 3; // 100 % 3 = 1
let strictCheck: boolean = (10 === 10);
let nullishRes = nullVar ?? "Default Value"; // Evaluates to "Default Value"
let optChain = userObj?.name; // Evaluates to "Alice" without throwing if userObj is undefined.
