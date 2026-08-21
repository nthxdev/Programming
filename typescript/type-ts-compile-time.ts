// TS Compile-Time
// TS-Specific Types (Conceptual Primitives in TS):

// 1. Any - The escape hatch. Turns off type checking completely, allowing any runtime operation.
let anyVar: any = "Can be anything"; // Bypasses type checking (Avoid).
console.log(`any: ${anyVar}`);

// 2. Unknown - The type-safe counterpart to any. Represents any value, but forces you to perform runtime type-narrowing (e.g., typeof) before usage.
let unknownVar: unknown = 42; // Type-safe counterpart to `any`. Requires type checking before use.
console.log(`unknown: ${unknownVar}`);

// 3. never - The bottom type. Represents the empty set of values—used for functions that never return (throw errors/infinite loops) or exhaustive switch matching.
let neverVar: never; // Represents values that never occur (e.g., function that always throws).
// Normally, we don't use never as a variable
// mainly used for functions that never successfully return
function getNever(): never {
  throw new Error("Something went wrong");
}
try {
  console.log(getNever());
} catch (error) {
  console.log(`error: ${error}`);
  console.log(`typeof error: ${typeof error}`); // "object"
}

// 4. void - Represents the absence of a return value from a function. Resolves to undefined at runtime.
const log = (): void => {};
console.log(log());        // undefined
console.log(`void: `, typeof log()); // "undefined"

// 5. Destructuring assignment ts perform type inference here
const [x, y] = [10, 20];
const { name, age } = { name: "Alice", age: 25 };

// 5. Union types
let id: string | number;
id = "ABC123";                      // OK
id = 123;                           // OK

// 6. Type alias
type Status = "active" | "inactive";
let statusType : Status = "active";

