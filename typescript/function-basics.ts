// ==========================================
// FUNCTION DEFINITIONS (Definitions & Context)
// ==========================================

// 1. Function Declaration: Hoisted (can be called before defined in code).
function addExample(a: number, b: number): number {
    return a + b;
}
console.log(`add(5, 10) = ${addExample(5, 10)}`);


// 2. Function Expression: Assigned to a variable. Not hoisted.
const multiplyExample = function(a: number, b: number): number {
    return a * b;
};
console.log(`multiply(5, 10) = ${multiplyExample(5, 10)}`);

// Typed function
function addTyped2(a: number, b: number): number {
    return a + b;
}



// ====== Typescript concepts =====
