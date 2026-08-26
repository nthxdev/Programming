// ==========================================
// Code Structure
// ==========================================
// Imports
// import { something } from 'module';

// Global variable
let globalvar: number = 0;

// Types/Interfaces
interface MyType {
  prop: string;
}

// Functions/Classes
function myFunction(arg: MyType): void {
  // logic
}

// Class
class MyClass {
  method(): string {
    return "result";
  }
}

// Exports
export { myFunction, MyClass };

// ==========================================
// Comments & Code Documentation
// ==========================================
// SYNTAX
// Comments
/*
Multi-line
comment 
*/
/**
 * Documentation comment (JSDoc)
 * Used to describe functions, variables, parameters, etc.
 * Adds two numbers.
 * @param a First number
 * @param b Second number
 * @returns The sum.
 */
function docAdd(a: number, b: number): number {
  return a + b;
}
console.log(docAdd(5, 10));
// It provides documentation that editors like VS Code can show when you hover

// ==========================================
// Variables & constants
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

// ==========================================
// Data Types
// ==========================================

// Type inference
let inferred = 42; // Inferred as number
console.log(`typeof inferred is: ${typeof inferred}`);

// Type assertions (tell TypeScript what type it is)
let valueAny: any = "123";
let num: number = parseInt(valueAny);

// Type assertion syntax
// don't know type of strAny so to use it we need to later give it type
const strAny: any = "hello";
// as: tells typescript that strAny is a string or treat it as a string
let length1: number = (strAny as string).length;
// or using angle brackets
// same thing as above just different syntax without using - as
let length2: number = (<string>strAny).length;

// Safely check types - better way
// we use unknown ts checks itself what it is before using it
function processValue(value: unknown): number {
  if (typeof value === "number") {
    return value;
  }
  if (typeof value === "string") {
    return parseInt(value);
  }
  throw new Error("Invalid type");
}

// ==========================================
// Built-in primitives
// ==========================================
// Primitives are immutable, passed by value, and stored on the Stack (usually, depending on engine implementation like V8). JS/TS has 7 primitive types.

// 1. Number: IEEE 754 double-precision 64-bit floating point. (No separate int/float).
// Number (IEEE 754 64-bit float, no separate int/float)
// All numbers are double-precision 64-bit IEEE 754 floating-point values. No raw integer type exists at the base runtime.
let numInt: number = 42;
console.log(`number: ${numInt}`);
let numFloat: number = 3.14159;
console.log(`float: ${numFloat}`);
let numHex: number = 0xff; // Hexadecimal
console.log(`hex: ${numHex}`);
let numBinary: number = 0b1010; // Binary
console.log(`Binary: ${numBinary}`);

// 2. BigInt: Arbitrary precision integers (for numbers larger than Number.MAX_SAFE_INTEGER: 2^53 - 1).
// BigInt (arbitrary precision)
// Arbitrary-precision integers. Allocates dynamic heap space to process numbers beyond the Safe Integer Limit ($\pm(2^{53} - 1)$).
let bigIntVal: bigint = 9007199254740991n; // 'n' suffix
console.log(`bigint: ${bigIntVal}`);

// String (UTF-16)
// Immutable sequences of 16-bit UTF-16 code units, allocated and deduplicated via internal V8 string interning.
// 3. String: UTF-16 code units.
let strSingle: string = "A";
console.log(`String One char: ${strSingle}`);
let strDouble: string = "Hello";
console.log(`string: ${strDouble}`);
const str = "Hello, World!";
console.log(str.length); // 13
console.log(str[0]); // 'H'
console.log(str.substring(0, 5)); // 'Hello'
console.log(str.includes("World")); // true
console.log(str.indexOf("World")); // 7
console.log(str.replace("World", "JavaScript")); // 'Hello, JavaScript!'
console.log(str.toUpperCase()); // 'HELLO, WORLD!'

// 3. Boolean: true or false (1 byte conceptually).
// Logical entities representing true or false.
let isTrue: boolean = true;
console.log(`boolean: ${isTrue}`);

// null / undefined
// Structural primitive singletons. undefined means a variable is uninitialized; null is an intentional empty object reference pointer.

// 4. Undefined: Uninitialized variable. The default value of declared but unassigned variables.
// Undefined (uninitialized)
let uninitVar: undefined = undefined;
console.log(`undefined: ${uninitVar}`);

// 5. Null: Intentional absence of any object value.
// Null (intentional absence)
let nullVar: null = null;
console.log(`null: ${nullVar}`);

// 6. Symbol: Unique, immutable identifier (often used for hidden object properties).
// Symbol (unique identifier)
// Unique, immutable tokens generated globally or via the runtime symbol registry. Primarily used as non-clashing object keys.
let sym: symbol = Symbol("uniqueKey");
console.log(`symbol: ${sym.toString()}\n`);

// ==========================================
// Compile-Time Types
// ==========================================
// TS-Specific Types (Conceptual Primitives in TS):

// 1. Any - The escape hatch. Turns off type checking completely, allowing any runtime operation.
let anyVar: any = "Can be anything"; // Bypasses type checking (Avoid).
console.log(`any: ${anyVar}`);

// 2. Unknown - The type-safe counterpart to any. Represents any value, but forces you to perform runtime type-narrowing (e.g., typeof) before usage.
let unknownVar: unknown = 42; // Type-safe counterpart to `any`. Requires type checking before use.
console.log(`unknown: ${unknownVar}`);

// 3. never - The bottom type. Represents the empty set of values—used for functions that never return (throw errors/infinite loops) or exhaustive switch matching.
// Represents values that never occur (e.g., function that always throws)
// never is not normally declared as a standalone variable
// let neverVar: never;

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
console.log(log()); // undefined
console.log(`void: `, typeof log()); // "undefined"

// 5. Destructuring assignment ts perform type inference here
const [x, y] = [10, 20];
// type inferenced
// const { name, age } = { name: "Alice", age: 25 };
// if want to define type explicity
const { name, age }: { name: string; age: number } = { name: "Alice", age: 25 };

// 5. Union types
// allow multiple type & values - can be custom type
let id: string | number;
id = "ABC123"; // OK
id = 123; // OK

// 6. Literal Types
// Restricts a variable down to a specific exact string, number, or boolean value
type direction = "left" | "right";
let literalType: direction = "left"; // or "right"

// 7. Type Alias
//  create reusable custom types
// gives a name to any type
type ID = string | number;
const aliasType1: ID = 123;
const aliasType2: ID = "ABCD";
console.log(typeof aliasType1);
console.log(typeof aliasType2);

// TS Compile-Time (Advanced Types)
// Enforces Structural Subtyping (Duck Typing). If two shapes match, their types are compatible, regardless of explicit inheritance.

// 8. Structural Interfaces
// Interface for type safety
// object | class structure / contract
// defines structure of object like type alias mainly for object shapes
interface User {
  name: string;
  age: number;
}
// const obj: { [key: string]: string } = {};
// const obj: Record<string, unknown> = {};

// 9. Tuples
// Fixed-length arrays with strictly assigned types at explicit index positions (e.g., [string, number]). Compiles down to a standard JS array.
// Tuples (TS specific): Fixed-length array with predefined types at each index.
let myTuple: [string, number, boolean] = ["Bob", 25, true];
console.log(`Tuple: ${JSON.stringify(myTuple)}`);
type StringNumberTuple = [string, number];
const tuple1: StringNumberTuple = ["hello", 42];
const tuple2: [string, number, boolean] = ["test", 100, true];
// Optional tuple elements
type OptionalTuple = [string, number?];
const optional1: OptionalTuple = ["name"];
const optional2: OptionalTuple = ["name", 25];
// Variadic tuples (rest elements)
type StringNumberRest = [string, ...number[]];
const variadic: StringNumberRest = ["id", 1, 2, 3];
// Readonly tuples
type ReadonlyTup = readonly [string, number];
const readonlyTuple: ReadonlyTup = ["frozen", 99];
// readonlyTuple[0] = "error"; // ❌ Cannot assign

// 10. Enums (enum / const enum)
// Standard enum generates a bi-directional lookup object at runtime. const enum is completely erased, and values are inlined directly into code.
// Enums (TS specific): Named constants. Compiles to JS objects (or IIFEs)
enum Color {
  Red = 0,
  Green = 1,
  Blue = 2,
}
const myColor: Color = Color.Red;
console.log(Color[0]); // "Red" (reverse lookup)
// Normal enum exists at runtime
// String enums
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}
const dir: Direction = Direction.Up;

// const enum is valid TypeScript, but it's not recommended in many projects because it's a TypeScript-only compile feature
// const enum is erased during compilation it causes build errors so mostly avoid it
// Const enum: completely erased at runtime, values inlined
/*
const enum Status {
  Active = "ACTIVE",
  Inactive = "INACTIVE"
}
// Inlined as "ACTIVE" in output
const status: Status = Status.Active; 
// compiles to 
const status = "ACTIVE";
*/
// Mixed enum (not recommended)
enum Mixed {
  No = 0,
  Yes = "YES",
}
// ==========================================
// JS Runtime (Structural) Types
// ==========================================
//1. object (Standard)
// Key-value hash maps. Keys are strings or symbols; values are pointers to other heap entities. V8 optimizes these using Hidden Classes (Shapes).
const objType: object = {
  name: "Pengu",
  age: 20,
};
console.log(objType);

// 2. Function
// Executable callable objects. First-class citizens that close over their lexical scopes (Closures).
const funType = (name: string): string => {
  return `Hello ${name}`;
};
console.log(funType("Pengu"));

// ==========================================
// Refrence Types
// ==========================================
/*
Reference Types (Objects) are dynamically allocated on the Heap.
The Stack holds the variable (the reference/pointer), which points to the memory address on the Heap.
*/
interface User {
  name: string;
  age: number;
}
// 1. Objects (Key-Value pairs)
// TS Interface defines the shape of an objects
const userObj: User = { name: "Alice", age: 30 };
console.log(`Object: ${JSON.stringify(userObj)}`);
// 'userObj' reference is constant, but `userObj.age` is mutable.
// object operation

// 2. Arrays
const arr = [1, 2, 3, 4, 5];
let arrNum: number[] = [10, 20, 30];
let arrStr: Array<string> = ["A", "B", "C"];
console.log(`Array<number>: ${arrNum}`);
console.log(`Array<string>: ${arrStr}`);
// Generic syntax
// Array Methods
let arr1 = [1, 2, 3, 4, 5];
console.log(`Original: ${arr1}`);

// Arrays
arr1.push(6); // Add to end -> [1,2,3,4,5,6]
arr1.pop(); // Remove last -> 6
arr1.shift(); // Remove first -> 1
arr1.unshift(0); // Add to beginning -> [0,2,3,4,5]

// Array iteration
arr1.forEach((num) => {
  console.log(num);
});

// Map (transform each element)
const squared = arr1.map((x) => x ** 2);
// Filter
const evens = arr1.filter((x) => x % 2 === 0);
// Find
const first_even = arr1.find((x) => x % 2 === 0);
// Slice (get subset)
const subset = arr1.slice(1, 4); // [2, 3, 4]
// Spread operator
const arr2 = [...arr1, 6, 7]; // Combine arrays

// Typed strings and arrays
const str2: string = "Hello";
const numbers1: number[] = [1, 2, 3];

// Array methods return typed values
const doubled: number[] = numbers1.map((x) => x * 2);
const evens2: number[] = numbers1.filter((x) => x % 2 === 0);

// Type-safe find
const found: number | undefined = numbers1.find((x) => x > 2);

// ==========================================
// Keyed Collections:-
// ==========================================
// Array
// ==========================================
// Standard Array ([] / Array): A dynamically resizing sequence.
// Under the hood, JS engines (like V8) optimize arrays
// if elements are dense and sequential, they use a contiguous memory array
// if elements are sparse, they automatically downgrade the layout to a slow,
// dictionary-style hash table

// An array is a list that holds multiple items in order
const fruits = ["apple", "banana", "orange"];
console.log(fruits[0]); // "apple"
// Array of numbers
let arrayNumbers: number[] = [1, 2, 3];
// Array of strings
let names: string[] = ["Alice", "Bob"];
// Mixed types (careful!)
let mixed: (string | number)[] = [1, "hello", 2];

// Way of creating Array in TypeScript
// 1. Literal syntax (most common):
let Array1: string[] = ["a", "b", "c"];
// 2. Generic wrapper (same thing, different style):
let Array2: Array<string> = ["a", "b", "c"];

// Dense Dense and Sequential Array
// Dense = no gaps
// Sequential = items in order
let arrDense = [10, 20, 30, 40];
//         [0] [1] [2] [3]
// All positions filled. JavaScript stores this fast in contiguous memory (side-by-side in RAM)

// Sparse = has Gaps
let arrSparse = [];
arrSparse[0] = "a";
arrSparse[5] = "b"; // positions 1,2,3,4 are empty
// Missing positions = sparse. JavaScript downgrades to slow storage

// ==========================================
// Typed Arrays
// ==========================================
// TypedArrays: Contiguous, fixed-size, raw binary buffers optimized for high-performance graphics and network manipulation.
// They consist of a backing raw memory allocation (ArrayBuffer) viewed through specific data lenses:
// Int8Array, Uint8Array, Uint8ClampedArray (clamps values between 0-255).
// Int16Array, Uint16Array, Int32Array, Uint32Array.
// Float32Array, Float64Array, BigInt64Array, BigUint64Array

// TypedArrays = fixed-size containers for raw binary data (optimized for speed).
// Normal arrays: can grow/shrink, hold any type
// TypedArrays: fixed size, one specific type, raw bytes

// ArrayBuffer
let buffer = new ArrayBuffer(16); // 16 bytes of empty memory
// just raw bytes cant use it directly

// Data Lenses(Views)
let view = new Int32Array(buffer); // view as 32-bit integers
// now can work with it
view[0] = 42;
console.log(view[0]); // 42

// Other Views
// Int8Array -> Signed 8-bit integers -> -128 to 127
// Uint8Array -> Unsigned 8-bit integers -> 0 to 255
// Uint8ClampedArray -> 0-255 (clamps overflow) -> Values capped at 0-255 -> If value is outside the range, it returns the closest boundary:
// Int16Array -> Signed 16-bit integers -> -32,768 to 32,767
// Uint16Array -> Unsigned 16-bit integers -> 0 to 65,535
// Int32Array -> Signed 32-bit integers -> Large range
// Uint32Array -> Unsigned 32-bit integers, Large range
// Float32Array -> 32-bit decimals -> -3.4e38 to 3.4e38
// Float64Array -> 64-bit decimals -> More precision
// BigInt64Array -> 64-bit big integers -> Huge integers
// BigUint64Array -> Unsigned big integers -> Huge positive integers

// ==========================================
// Map
// ==========================================
// Map: A genuine key-value dictionary. Unlike standard JS objects,
//  keys can be of any type (including functions or object instances).
// It preserves insertion order natively and uses deterministic hashing for $O(1)$ lookups.

let map = new Map();
// Key difference: Map keys can be any type. Objects only allow strings/symbols.
map.set("name", "John"); // string key
map.set(1, "one"); // number key
map.set(true, "yes"); // boolean key
map.set({}, "object key"); // object key!
map.set(() => {}, "function"); // function key!
console.log(map.get("name")); // "John"
console.log(map.get("age")); // 25

// Preserves Insertion Order
// Insertion order = the order you added items
let insertionOrder = new Map();
insertionOrder.set("first", 1);
insertionOrder.set("second", 2);
insertionOrder.set("third", 3);

// Iterating returns them in order added:
for (let [key, value] of insertionOrder) {
  console.log(key, value);
}

// Map Idea Explained: it follows same idea as dictionary/object find key → get value
// Dictionary/object: need to search through keys → potentially O(n)
// Map: hashes the key → calculates where it should be → jumps there → average O(1)
// key → hash → bucket → value

// Hash: converts a key into a number that helps choose where to store/find it
// A hash function takes data of any size and produces a fixed-size number

// // Map remebers
// Hashing → finds WHERE the key is stored
// Ordering → remembers WHEN the key was inserted
// Even though the buckets may be scattered, Map separately remembers the insertion order

// Basic Map Methods
let mapMethods = new Map();
// Add
mapMethods.set("name", "John");
// Get
mapMethods.get("name"); // "John"
// Check if exists
mapMethods.has("name"); // true
mapMethods.has("age"); // false
// Delete
mapMethods.delete("name");
// Size
console.log(mapMethods.size); // number of items

// ==========================================
// Set
// ==========================================
// A collection of unique values. Like `Map`
// it tracks insertion order and leverages internal hashing
// to evaluate item uniqueness in $O(1)$ time complexity, bypassing costly array traversals.

// ==========================================
// WeakMap
// ==========================================
//  A specialized `Map` where keys must be object or symbol references and those references are held _weakly_.
// If a key object has no other references left, the entire entry is eligible for garbage collection, preventing memory leaks in caching or DOM tracking.

// ==========================================
// WeakSet
// ==========================================
// A collection of unique objects held weakly.
// Like `WeakMap`, objects inside a `WeakSet` are automatically garbage collected if no outside references point to them.

// ==========================================
//  Type-Level Manipulations (Meta-Data Structures)
// ==========================================
// TypeScript handles types as data at compile time,
// it provides unique type-level structures to transform code safely before compilation

// ==========================================
// Utility Transformation Structures
// ==========================================
// TypeScript includes global generic structures to morph existing type interfaces into altered states

// ==========================================
// `Partial<T>`
// ==========================================
// Maps all properties of an interface to be optional (`?`)

// ==========================================
// `Required<T>`
// ==========================================
// Strips optional flags, forcing all properties to be explicitly defined

// ==========================================
// `Readonly<T>`
// ==========================================
// Prefixes all properties with a compile-time `readonly` modifier, blocking data mutations

// ==========================================
// `Record<K, T>`
// ==========================================
// Constructs an object type layout with a set of explicit keys `K` mapped to a uniform value type `T`

// ==========================================
// `Pick<T, K>` / `Omit<T, K>`
// ==========================================
// Extracts or drops a chosen subset of keys `K` from a base type structure `T`.

// ==========================================
// Conditional and Mapped Type Logic
// ==========================================
// Mapped Types
// ==========================================
// Creates new type fields by iterating over keys using an `in keyof` syntax loop:
type Stringify<T> = { [P in keyof T]: string };
// ==========================================
// Conditional Types
// ==========================================
//  Implements algorithmic branching paths directly inside type assignments using a ternary structural format:
type IsString<T> = T extends string ? true : false;

// ==========================================
// Parsing/Types Conversion
// ==========================================
let strNum: string = "42.5px";

// String to Number (Explicit)
let parsedInt: number = parseInt(strNum, 10); // 42 (stops at non-numeric characters. '10' is the radix/base)
let parsedFloat: number = parseFloat(strNum); // 42.5
let castNumber: number = Number("42.5"); // 42.5 (Strict: Returns NaN if contains letters)
let unaryCast: number = +"42.5"; // 42.5 (Shorthand for Number())

// Number to String
let numToStr1: string = parsedInt.toString();
let numToStr2: string = String(parsedInt);
let numToStr3: string = `${parsedInt}`; // Template literal coercion

// Type assertions (compile-time only)
// TypeScript Type Assertions (Casting at compile time only, no runtime effect):
let unknownData: unknown = "Hello TS";
let lengthOfData: number = (unknownData as string).length;
let lengthAlt: number = (<string>unknownData).length; // Alternate syntax (clashes with React JSX)

// ==========================================
// Operators
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

const a: number = 10,
  b: number = 5;
console.log(`\nComparison: ${a} > ${b} is ${a > b}`);
console.log(`Comparison: ${a} == ${b} is ${a == b}`);
console.log(`Strict: ${a} === ${b} is ${a === b}`);

// - Relational: >, <, >=, <=

// Logical:
// - && (AND), || (OR), ! (NOT)
console.log(`\nLogical: true && false = ${true && false}`);
console.log(`Logical: true || false = ${true || false}`);
console.log(`Logical: !true = ${!true}`);

// ==========================================
// Conditionals (if else family)
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
  if (true) {
  }
} else {
  // Fallback
}

// ==========================================
// other Conditionals (Switch, Ternary)
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

interface User {
  name: string;
  age: number;
}
// - ?. (Optional Chaining): Safely accesses deeply nested properties.
let optChain1 = userObj?.name;
console.log(`Optional chaining: userObj?.name = ${optChain1}\n`);

let mathRes: number = 10 ** 2 % 3; // 100 % 3 = 1
let strictCheck: boolean = 10 === 10;
let nullishRes = nullVar ?? "Default Value"; // Evaluates to "Default Value"
let optChain = userObj?.name; // Evaluates to "Alice" without throwing if userObj is undefined.

// ==========================================
// Loops
// ==========================================
let counter: number = 0;

// While loop
while (counter < 3) {
  counter++;
}

// Do-While loop (executes at least once)
do {
  counter--;
} while (counter > 0);

// Standard For loop
for (let i = 0; i < 10; i++) {
  if (i === 5) continue; // Skip to next iteration
  if (i === 9) break; // Exit loop entirely
  console.log(i);
}

// For-Of (iterates over values)
// (Iterates over iterables: Arrays, Strings, Maps, Sets. Yields VALUES)
for (const val of arrNum) {
  // val is 10, then 20, then 30
}
// For-In (iterates over keys/indexes)
// (Iterates over enumerable properties of objects. Yields KEYS/INDEXES)
// Note: Usually avoided for Arrays because it yields string indices ("0", "1").

for (const key in userObj) {
  // key is "name", then "age"
}
import * as readline from "node:readline";
// ==========================================
// Input Output
// ==========================================
/*
Standard Output (Node.js Environment)
*/
console.log("Prints message with a newline");
console.error("Prints to stderr");
process.stdout.write("Prints WITHOUT a newline. ");

/*
Standard Input (Node.js Environment via 'readline')
(Requires importing the built-in 'node:readline' module)
*/

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter age: ", (answer) => {
  console.log(answer);
  rl.close();
});

// ==========================================
// Formatting
// ==========================================
// 1. Template Literals (Backticks). Replaces printf. Supports multiline and interpolation.
let formattedStr: string = `User ${userObj.name} is ${userObj.age} years old.`;

// 2. Number Formatting (Decimal places) -> Returns a string!
let price: number = 19.9934;
let formattedPrice: string = price.toFixed(2); // "19.99"
console.log(`toFixed(2): ${price.toFixed(2)}`);

// 3. Internationalization API (Commas, Currency)
let population: number = 1500000;
let localePop: string = new Intl.NumberFormat("en-US").format(population); // "1,500,000"
console.log(`Locale formatting: ${localePop}`);

// 4. String Padding
let padded: string = "5".padStart(3, "0"); // "005"
console.log(`Padded: ${padded}\n`);

// ==========================================
// Intl API (internationalization)
// ==========================================
const intlValue: number = 42;
const formatted = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}).format(intlValue);
console.log(formatted); // "42.00"

// ==========================================
// Function basics (Definitions & Context)
// ==========================================

// 1. Function Declaration: Hoisted (can be called before defined in code).
function addExample(a: number, b: number): number {
  return a + b;
}
console.log(`add(5, 10) = ${addExample(5, 10)}`);

// 2. Function Expression: Assigned to a variable. Not hoisted.
const multiplyExample = function (a: number, b: number): number {
  return a * b;
};
console.log(`multiply(5, 10) = ${multiplyExample(5, 10)}`);

// Typed function
function addTyped2(a: number, b: number): number {
  return a + b;
}

// ==========================================
// Function Parameters & Arguments
// ==========================================

// Optional parameters
function greet(name: string, greeting?: string): string {
  return `${greeting || "Hello"}, ${name}!`;
}

console.log(`greet('Alice'): ${greet("Alice")}`);
console.log(`greet('Bob', 'Hi'): ${greet("Bob", "Hi")}`);

// Default parameters
function power(base: number, exponent: number = 2): number {
  return Math.pow(base, exponent);
}
console.log(`power(5): ${power(5)}`);
console.log(`power(5, 3): ${power(5, 3)}`);

// Rest parameters
function sumAll(...numbers: number[]): number {
  return numbers.reduce((a, b) => a + b, 0);
}
console.log(`sumAll(1,2,3,4,5) = ${sumAll(1, 2, 3, 4, 5)}\n`);

/*
Parameters:
- Optional Parameters (`?`): Must come after required parameters.
- Default Parameters (`= value`)
- Rest Parameters (`...args`): Collects remaining arguments into an array.
*/
function buildProfile(
  name: string,
  age?: number,
  role: string = "User",
  ...skills: string[]
): string {
  return `${name} (${role}) knows ${skills.join(", ")}`;
}
// buildProfile("Alice", undefined, "Admin", "JS", "TS", "Go");

// Optional and default parameters
function displayTyped(
  name: string,
  age?: number,
  city: string = "Unknown",
): void {
  console.log(`${name}, ${age}, ${city}`);
}

// Spread operator for calling
const nums = [1, 2, 3];
console.log(Math.max(...nums));

/*
Pass By "Call-by-Sharing" (A subset of Pass by Value):
- Primitives: Passed by exact value copy. Changing it inside does not affect the outside.
- Objects/Arrays: The *reference itself* is passed by value (a copy of the memory address).
  -> Mutating the object's properties inside the function mutates the original object on the Heap.
  -> Reassigning the parameter to a NEW object inside the function does NOT affect the outside variable.
*/
function modifyData(primVal: number, refObj: User): void {
  // void return type
  // Primitive: Local copy changed. Outside `primVal` is untouched.
  primVal = 999;

  // Reference: Mutating the shared heap object. Outside `userObj` IS affected.
  refObj.age = 99;

  // Reference: Reassigning the pointer. Outside `userObj` is NOT affected by this line.
  refObj = { name: "Bob", age: 10 };
}

// Primitives: pass by value
let primitiveVal = 10;
function modifyPrimitive(val: number): void {
  val = 999;
  console.log(`  Inside function: ${val}`);
}

console.log(`Before: ${primitiveVal}`);
modifyPrimitive(primitiveVal);
console.log(`After: ${primitiveVal} (unchanged)\n`);

// Objects: pass by call-by-sharing
interface DataObj {
  value: number;
}

let objVal: DataObj = { value: 10 };
function modifyObject(obj: DataObj): void {
  obj.value = 999;
  console.log(`  Inside function: ${obj.value}`);
}

console.log(`Before: ${objVal.value}`);
modifyObject(objVal);
console.log(`After: ${objVal.value} (changed!)\n`);

let outsideNum = 1;
const outsideObj: User = { name: "Eve", age: 20 };

modifyData(outsideNum, outsideObj);
// outsideNum is still 1.
// outsideObj is now { name: "Eve", age: 99 }.

// Pass by value (primitives)
function modify_value(x: number) {
  x = 100; // Only changes local copy
}
let value = 5;
modify_value(value);
console.log(value); // Still 5

// Pass by reference (objects/arrays)
function modify_array(arr: number[]) {
  arr.push(4); // Modifies original
}
let numbers = [1, 2, 3];
modify_array(numbers);
console.log(numbers); // [1, 2, 3, 4]

// ==========================================
// Arrow Functions
// ==========================================
/*
Arrow Functions: ES6 shorthand. 
Crucial Engine Detail: Arrow functions do NOT have their own `this` binding. 
They lexically capture `this` from the surrounding outer scope.
*/
const subtract = (a: number, b: number): number => a - b; // Implicit return
console.log(`subtract(10, 3) = ${subtract(10, 3)}`);

// Destructuring parameters
function display({ name, age }: { name: string; age: number }) {
  console.log(`${name} is ${age}`);
}
display({ name: "Alice", age: 25 });

// Typed arrow function
const multiplyTyped2 = (a: number, b: number): number => a * b;

// ==========================================
// Recursive Functions
// ==========================================

// Recursive function
function factorial(n: number): number {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

// ==========================================
// Import Export
// ==========================================
// Treat this file as an ES module
// export {};

// Common JS way
// declare const require: any;
// const readline = require('node:readline');
// const process = require('node:process');
// ESmodules way
// Namespace import: Imports the entire module as an object
import { sayHi as Hello, username } from "./export/export";
import { user } from "./export/export";
import defaultFun from "./export/export";
console.log(Hello("Pengu"));
console.log(user("nthxdev"));
console.log(username);
import "./export/export";
defaultFun();

/*
Entry point (Node.js)
if (require.main === module) {
    console.log(add(5, 3));
}
*/

// ==========================================
// Scope & Closures
// ==========================================
let globalVar: number = 23;

function scope() {
  let localscope: string = "i am local scope inside function";
}

if (true) {
  var functionScoped: number = 10; // Function-scoped
}
console.log(functionScoped); // 10 ✓ (var escapes block)
// Error ✗
// console.log(blockScoped);

// Block Scope
// let and const are block-scoped. Only accessible inside {} blocks.
if (true) {
  let message: string = "Hello";
  const count: number = 10;

  console.log(message); // ✓ Works
}
// ✗ Error - outside block
// console.log(message);

// 1. Handling Scope Access Errors (ReferenceError)
try {
  // @ts-ignore - Bypassing TypeScript compile-time check to simulate runtime execution
  console.log(localscope);
} catch (error) {
  if (error instanceof ReferenceError) {
    console.error("Scope Error caught:", error.message);
    // Output: localscope is not defined
  }
}

// Execution Context
// What is it?
// An invisible working environment where JavaScript code executes.
// When a function runs, it gets its own execution context with:
// Memory for variables
// Function references
// Scope information
// The actual code execution

// Closures
// What is a Closure?
// A function that remembers and can access variables from its lexical outer scope, even after the outer function has finished executing
function createCounter() {
  let count: number = 0; // Outer variable

  return function () {
    count++; // Inner function uses outer variable
    return count;
  };
}
const counterFunc = createCounter();
console.log(counterFunc()); // 1
console.log(counterFunc()); // 2
console.log(counterFunc()); // 3

// Scope Chain Rule
// Inner scopes see outer scopes. Outer scopes don't see inner scopes.
const scopeGlobal = 1; // Global
function outer() {
  const scopeOuter = 2; // Outer function scope
  function inner() {
    const scopeInner = 3; // Inner function scope
    console.log(scopeGlobal); // ✓ Yes (global)
    console.log(scopeOuter); // ✓ Yes (outer function)
    console.log(scopeInner); // ✓ Yes (own scope)
  }
  inner();
  // ✗ Error (can't see inner)
  // console.log(c);
}

// Function Factory
function createMultiplier(multiplier: number) {
  return function (number: number) {
    return number * multiplier;
  };
}
const double = createMultiplier(2);
const triple = createMultiplier(3);
console.log(double(5)); // 10 (remembers 2)
console.log(triple(5)); // 15 (remembers 3)
// Each function remembers its own multiplier

// Encapsulation - Hide & Control
// What is Encapsulation?
// Hide internal data and only expose controlled operations.
function createAccount() {
  let balance = 0; // Private - hidden from outside

  return {
    deposit(amount: number) {
      if (amount > 0) {
        balance += amount;
      }
    },

    withdraw(amount: number) {
      if (amount <= balance) {
        balance -= amount;
      }
    },

    getBalance() {
      return balance;
    },
  };
}
const account = createAccount();
account.deposit(100);
account.withdraw(30);
console.log(account.getBalance()); // 70
// Can't directly access balance:
// undefined as hidden from outside
// console.log(account.balance);

// Practical: Private Variables with Closure

// Closure with setTimeout
function setupTimers() {
  for (let i = 1; i <= 3; i++) {
    setTimeout(() => {
      console.log("Timer " + i);
    }, i * 1000);
  }
}
setupTimers();

// ==========================================
// Erorr Handling
// ==========================================
/*
try/catch/finally — how it works:
When code throws an error, JS stops running that code right away and
looks UP the call stack for the nearest `try` block that can handle it.
- If it finds one: control jumps to that `catch` block.
- If it finds none: the program crashes (uncaught error).
try/catch/finally:
- `try` block runs code that might throw.
- `catch` block runs if an error is thrown. In TS 4.4+, the caught error
  is typed as `unknown` by default (not `any`), forcing type-narrowing before use.
- `finally` block ALWAYS runs, whether an error was thrown or not (cleanup logic).
`finally` always runs at the end, no matter what — even if `try` or
`catch` had a `return` or another `throw` inside. Good for cleanup
(closing files, closing connections, etc).
*/
try {
  // Code that might break goes here
} catch (error) {
  // This runs IF something breaks
  // error = information about what went wrong
}
// Error Object - gives you an error object with info about what went wrong
// error object has properties:
// message — the error description (human-readable)
// name — the error type (like "Error", "TypeError", "ReferenceError")
// stack — the full trace of where the error happened (for debugging)
try {
  throw new Error("Something failed");
} catch (error) {
  // In modern TS, `error` is typed as `unknown`, not `any`.
  // So you must check its type before touching .message by checking is error instanceof Error
  if (error instanceof Error) {
    console.log(`Caught: ${error.message}`);
  } else {
    console.log(`Caught something that isn't an Error: ${error}`);
  }
} finally {
  console.log("This runs no matter what happened above");
}
// You could throw literally anything:
// throw "A string";
// throw 42;
// throw { custom: "object" };

// Built-in error types
/*
JS already gives you several error types, all built on top of Error:
- ReferenceError -> using a variable that doesn't exist / isn't in scope
- TypeError       -> calling something that isn't a function, or reading a property on undefined/null
- SyntaxError     -> broken syntax (JSON.parse can throw this at runtime)
- RangeError      -> a number is outside the allowed range
*/
// Example: ReferenceError (accessing a variable that's out of scope)
try {
  // @ts-ignore - forcing TS to let this run so we can see the real error
  console.log(notDefinedAnywhere);
} catch (error) {
  if (error instanceof ReferenceError) {
    console.log(`ReferenceError caught: ${error.message}`);
  }
}
// Example: TypeError (reading a property on undefined)
interface UserProfile {
  // ? means optional - may or may not exists
  profile?: {
    name?: string;
  };
}
let maybeUser: UserProfile | undefined;

try {
  // @ts-ignore - this will throw because maybeUser is undefined
  console.log(maybeUser.profile.name);
} catch (error) {
  if (error instanceof TypeError) {
    console.log(`TypeError caught: ${error.message}`);
  }
}
// Safer way to avoid that TypeError in the first place:
// optional chaining (?.) + nullish coalescing (??)
// Safely returns undefined if anything is missing + Provide a fallback
console.log(maybeUser?.profile?.name ?? "Default Name"); // no crash

// Custom Error classes (extending built-in Error)
// Making your own error types
// Extending Error lets you throw specific, recognizable error types, and check for them later with `instanceof`.
// Useful for distinguishing error types via `instanceof` checks.
class ValidationError extends Error {
  field: string;

  constructor(message: string, field: string) {
    super(message); // send message up to Error base class
    this.name = "ValidationError"; // Overrides default "Error" name shows up instead of plain "Error"
    this.field = field;
    // Required for proper prototype chain when extending built-ins in TS
    Object.setPrototypeOf(this, ValidationError.prototype); // needed in TS
  }
}

function validateAge(age: number): void {
  if (age < 0) {
    throw new ValidationError("Age cannot be negative", "age");
  }
}

try {
  validateAge(-5);
} catch (error) {
  if (error instanceof ValidationError) {
    console.log(`ValidationError on '${error.field}': ${error.message}`);
  } else if (error instanceof Error) {
    console.log(`Some other error: ${error.message}`);
  }
}

// Re-throwing an error to an outer catch
// Nested try/catch: inner catch can re-throw to an outer handler
function parseJsonSafely(data: string): number {
  try {
    const parsed = JSON.parse(data); // may throw SyntaxError
    return parsed.value;
  } catch (error) {
    console.log("Couldn't parse, sending error upward...");
    throw error; // propagate to caller's try/catch let the caller deal with it
  }
}
try {
  parseJsonSafely("{ Invalid json");
} catch (error) {
  if (error instanceof SyntaxError) {
    console.log(`SyntaxError caught outside: ${error.message}`);
  }
}
// finally can override everything (be careful!)
// If finally has its own return/throw, it wins — it silences whatever
// happened in try or catch. Usually you want to AVOID doing this.
function overrideExample(): string {
  try {
    throw new Error("Original error");
  } catch (error) {
    return "Returned from catch";
  } finally {
    return "Returned from finally"; // this wins, error is hidden
  }
}
console.log(overrideExample()); // "Returned from finally"

// try/catch with async/await
/*
IMPORTANT: try/catch only works on SYNCHRONOUS code by default.
It can NOT catch errors thrown inside setTimeout or other async
callbacks unless you use async/await, because await makes the
async code behave like synchronous code for error-catching purposes.
*/

// This does NOT work as expected — catch never runs:
// try {
//     setTimeout(() => { throw new Error("Too late!"); }, 100);
// } catch (error) {
//     console.log("This will NEVER run");
// }

// This DOES work — await lets try/catch see the async error:
async function fetchDataSafely(shouldFail: boolean): Promise<string> {
  try {
    if (shouldFail) {
      throw new Error("Async operation failed");
    }
    return "Data fetched";
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Async catch: ${error.message}`);
    }
    return "Fallback value";
  }
}

// A reusable "safe runner" pattern
// Wrap any function call so errors are handled in one place instead
// of repeating try/catch everywhere.
function executeSafely(fn: () => void): void {
  try {
    fn();
  } catch (error: any) {
    console.log(`[${error.name}]: ${error.message}`);
  }
}

executeSafely(() => {
  throw new TypeError("Example forced error");
});
// ==========================================
// Regsx
// ==========================================
// Regular Expressions (Regex)
// Regex = a pattern to match text against rules.
// Basic syntax:
{
  const regex: RegExp = /pattern/;
  const isValid: boolean = regex.test("value");
}

// Test method returns:
// true = matches pattern
// false = doesn't match

// Simple examples:
{
  // Lowercase letters only, 3-8 characters
  const regex1: RegExp = /^[a-z]{3,8}$/;
  console.log(regex1.test("hello")); // true
  console.log(regex1.test("HELLO")); // false (uppercase)
  console.log(regex1.test("hi")); // false (too short)

  // Letters and numbers, 3-20 characters
  const regex2: RegExp = /^[A-Za-z0-9_]{3,20}$/;
  console.log(regex2.test("harsh_123")); // true
  console.log(regex2.test("ha")); // false (too short)
  console.log(regex2.test("harsh@123")); // false (@ not allowed)
}

// Email Validation
{
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
}
