// ==========================================
// Intro to JavaScript & TypeScript
// ==========================================
// JAVASCRIPT
// - A programming language that allows web pages to be dynamic.
// - Interpreted, not compiled: the interpreter (e.g. a browser) parses
//   the code and turns it into code the machine can run, so it works
//   on any browser on any computer.
// - Not just for the browser. Runtimes like Node.js and Deno let you
//   write, launch, and serve requests on webservers. Frameworks like
//   Electron use JS to write cross-platform apps for Windows, Linux,
//   macOS. Mobile dev is possible via React Native, Ionic, and Expo
//   (Android, iOS, and web at once).
// - ECMAScript is the standard that defines JavaScript.
// - Starting with the 6th edition (ES2015/ES6) in 2015, a new edition
//   is released each year. ES6 was a major update: template strings,
//   arrow functions, cleaner class syntax.
// - New syntax each year means support is often incomplete in current
//   browsers and the latest Node.js. Tools like Babel offer
//   transpilation for most features, letting you write as if it's
//   the future.
// TYPESCRIPT
// - A superset of JavaScript, created at Microsoft out of frustration
//   developing large-scale applications in JS.
// - In a large JS project it's hard to know what properties your own
//   objects have, what arguments functions take (and their types).
//   Since JS code can't be intelligently inspected, using an npm
//   package means keeping docs open to know its methods and args.
//   TS solves these issues.
// - Open-source, hosted on GitHub. Supports tools for any browser and
//   Node, on any host, any OS. Compiles to readable, standards-based
//   JavaScript.
// - Adds a flexible type system to JS, plus interfaces (custom types),
//   and modifies the syntax of some ECMAScript features like classes.
// - Types are optional and flexible (e.g. an argument can be a string
//   OR a number). Types enable editor tooling like code completion
//   and method detection, in your own code and in packages you use.
// - Supports many upcoming ECMAScript features (e.g. async/await).
//   Can be written in Object Oriented or Functional styles.
//   Compatible with all existing JS packages. Transpiles to clean,
//   readable JS.
// ==========================================
// Practices & Conventions
// ==========================================
// variables are always written in camelCase; constants are written in SCREAMING_SNAKE_CASE
// ==========================================
// Code Structure
// ==========================================
// Imports
// import { something } from 'module';
// Global variable
let globalvar = 0;
// Functions/Classes
function myFunction(arg) {
    // logic
}
// Class
class MyClass {
    method() {
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
function docAdd(a, b) {
    return a + b;
}
console.log(docAdd(5, 10));
// It provides documentation that editors like VS Code can show when you hover
// ==========================================
// Variables & constants
// ==========================================
/*
- JS/TS Variable Declarations & Scope Mechanics:
Variables in JavaScript can be defined using the const, let or var keyword.
- `let`: Block-scoped. Subject to Temporal Dead Zone (TDZ). Reassignable.
- `const`: Block-scoped. Immutable binding (the variable identifier cannot be reassigned),
- but the contents of objects/arrays it points to ARE mutable.
- `var`: Function-scoped or globally scoped. Hoisted to the top of its execution context
- with `undefined`. Avoid using `var` in modern TS/JS to prevent scope leakage.
*/
let myLet = "Block scoped";
const MY_CONST = 100; // Cannot do MY_CONST = 101;
var legacyVar = false; // Hoisted, avoid.
// Const :-
// constant assignment / binding and constant value
// ==========================================
// Data Types
// ==========================================
// Type inference
let inferred = 42; // Inferred as number
console.log(`typeof inferred is: ${typeof inferred}`);
// Type assertions (tell TypeScript what type it is)
let valueAny = "123";
let num = parseInt(valueAny);
// Type assertion syntax
// don't know type of strAny so to use it we need to later give it type
const strAny = "hello";
// as: tells typescript that strAny is a string or treat it as a string
let length1 = strAny.length;
// or using angle brackets
// same thing as above just different syntax without using - as
let length2 = strAny.length;
// Safely check types - better way
// we use unknown ts checks itself what it is before using it
function processValue(value) {
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
let numInt = 42;
console.log(`number: ${numInt}`);
let numFloat = 3.14159;
console.log(`float: ${numFloat}`);
let numHex = 0xff; // Hexadecimal
console.log(`hex: ${numHex}`);
let numBinary = 0b1010; // Binary
console.log(`Binary: ${numBinary}`);
// 2. BigInt: Arbitrary precision integers (for numbers larger than Number.MAX_SAFE_INTEGER: 2^53 - 1).
// BigInt (arbitrary precision)
// Arbitrary-precision integers. Allocates dynamic heap space to process numbers beyond the Safe Integer Limit ($\pm(2^{53} - 1)$).
let bigIntVal = 9007199254740991n; // 'n' suffix
console.log(`bigint: ${bigIntVal}`);
// Rounding
// There is a built-in global object called Math that provides various rounding functions.
// For example, you can round down (floor) or round up (ceil) decimal numbers to nearest whole numbers
Math.floor(234.34); // => 234
Math.ceil(234.34); // => 235
// 3. String: UTF-16 code units.
// String (UTF-16) -> Immutable sequences of 16-bit UTF-16 code units, allocated and deduplicated via internal V8 string interning.
// Creating a string
("Hello, World!");
("Hello, World!");
// A string can be treated as index to acess string value.
"cat"[1];
// use .length to acess the length of string
"cat".length;
// to concate use
"I like" + " " + "cats.";
// some string methods
// - toUpperCase and toLowerCase - change the case of all characters
// - trim - remove whitespace at the beginning and end
// - includes, startsWith and endsWith - determine whether another string is part of the given string
// - slice - extract a section of the string
let strSingle = "A";
console.log(`String One char: ${strSingle}`);
let strDouble = "Hello";
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
let isTrue = true;
console.log(`boolean: ${isTrue}`);
// null / undefined
// Structural primitive singletons. undefined means a variable is uninitialized; null is an intentional empty object reference pointer.
// 4. Null: Intentional absence of any object value.
// Null (intentional absence)
let nullVar = null;
console.log(`null: ${nullVar}`);
// 5. Undefined: Uninitialized variable. The default value of declared but unassigned variables.
// Undefined (uninitialized)
let uninitVar = undefined;
console.log(`undefined: ${uninitVar}`);
// 6. Symbol: Unique, immutable identifier (often used for hidden object properties).
// Symbol (unique identifier)
// Unique, immutable tokens generated globally or via the runtime symbol registry. Primarily used as non-clashing object keys.
let sym = Symbol("uniqueKey");
console.log(`symbol: ${sym.toString()}\n`);
// ==========================================
// Compile-Time Types
// ==========================================
// TS-Specific Types (Conceptual Primitives in TS):
// 1. Any - The escape hatch. Turns off type checking completely, allowing any runtime operation.
let anyVar = "Can be anything"; // Bypasses type checking (Avoid).
console.log(`any: ${anyVar}`);
// 2. Unknown - The type-safe counterpart to any. Represents any value, but forces you to perform runtime type-narrowing (e.g., typeof) before usage.
let unknownVar = 42; // Type-safe counterpart to `any`. Requires type checking before use.
console.log(`unknown: ${unknownVar}`);
// 3. never - The bottom type. Represents the empty set of values—used for functions that never return (throw errors/infinite loops) or exhaustive switch matching.
// Represents values that never occur (e.g., function that always throws)
// never is not normally declared as a standalone variable
// let neverVar: never;
// Normally, we don't use never as a variable
// mainly used for functions that never successfully return
function getNever() {
    throw new Error("Something went wrong");
}
try {
    console.log(getNever());
}
catch (error) {
    console.log(`error: ${error}`);
    console.log(`typeof error: ${typeof error}`); // "object"
}
// 4. void - Represents the absence of a return value from a function. Resolves to undefined at runtime.
const log = () => { };
console.log(log()); // undefined
console.log(`void: `, typeof log()); // "undefined"
// 5. Destructuring assignment ts perform type inference here
const [x, y] = [10, 20];
// type inferenced
// const { name, age } = { name: "Alice", age: 25 };
// if want to define type explicity
const { name, age } = { name: "Alice", age: 25 };
// 5. Union types
// allow multiple type & values - can be custom type
let id;
id = "ABC123"; // OK
id = 123; // OK
let literalType = "left"; // or "right"
const aliasType1 = 123;
const aliasType2 = "ABCD";
console.log(typeof aliasType1);
console.log(typeof aliasType2);
// const obj: { [key: string]: string } = {};
// const obj: Record<string, unknown> = {};
// 9. Tuples
// Fixed-length arrays with strictly assigned types at explicit index positions (e.g., [string, number]). Compiles down to a standard JS array.
// Tuples (TS specific): Fixed-length array with predefined types at each index.
let myTuple = ["Bob", 25, true];
console.log(`Tuple: ${JSON.stringify(myTuple)}`);
const tuple1 = ["hello", 42];
const tuple2 = ["test", 100, true];
const optional1 = ["name"];
const optional2 = ["name", 25];
const variadic = ["id", 1, 2, 3];
const readonlyTuple = ["frozen", 99];
// readonlyTuple[0] = "error"; // ❌ Cannot assign
// 10. Enums (enum / const enum)
// Standard enum generates a bi-directional lookup object at runtime. const enum is completely erased, and values are inlined directly into code.
// Enums (TS specific): Named constants. Compiles to JS objects (or IIFEs)
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
const myColor = Color.Red;
console.log(Color[0]); // "Red" (reverse lookup)
// Normal enum exists at runtime
// String enums
var Direction;
(function (Direction) {
    Direction["Up"] = "UP";
    Direction["Down"] = "DOWN";
    Direction["Left"] = "LEFT";
    Direction["Right"] = "RIGHT";
})(Direction || (Direction = {}));
const dir = Direction.Up;
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
var Mixed;
(function (Mixed) {
    Mixed[Mixed["No"] = 0] = "No";
    Mixed["Yes"] = "YES";
})(Mixed || (Mixed = {}));
// ==========================================
// Runtime (Structural) Types
// ==========================================
//1. object (Standard)
// Key-value hash maps. Keys are strings or symbols; values are pointers to other heap entities. V8 optimizes these using Hidden Classes (Shapes).
const objType = {
    name: "Pengu",
    age: 20,
};
console.log(objType);
// 2. Function
// Executable callable objects. First-class citizens that close over their lexical scopes (Closures).
const funType = (name) => {
    return `Hello ${name}`;
};
console.log(funType("Pengu"));
// If want to add multiple keys at once:
// Object.assign(userObj, { email: "a@b.com", city: "Delhi" });
// For arbitrary extra keys, use an index signature:
// interface User {
//   name: string;
//   age: number;
//   [key: string]: unknown;
// }
// Then:
// userObj.email = "a@b.com";
// userObj.city = "Delhi";
// If you don't want to add the new keys to the interface:
// Add them with a type assertion
// (userObj as any).email = "alice@example.com";
// or multiple:
// Object.assign(userObj, { email: "a@b.com", city: "Delhi" });
// Object.assign() is particularly convenient because you don't need to modify the interface
// Better Way: create a new object
// If don't want to weaken the type with any:
// const newUser = { ...userObj, email: "a@b.com", city: "Delhi" };
// 1. Objects (Key-Value pairs)
// TS Interface defines the shape of an objects
const userObj = { name: "Alice", age: 30 };
// object operation
// 'userObj' reference is constant, but `userObj.age` is mutable.
console.log(`Object: ${JSON.stringify(userObj)}`);
// - in js only the type of the key is restricted: it has to be a string
// - but values can be primitive values can be array, object even function.
// - the also key entities for OOP in js
// Operations object:
// Retrieving a value
userObj["name"] = "Bob";
userObj.name = "Don";
// Check wheather value exists
userObj.hasOwnProperty("name");
// Looping over Object:
// when wants keys only
/**
 * this code below is valid in js but not in ts, why?
 * Object.keys() returns key as type string. But userObj is typed as User, which only allows keys "name" or "age". TypeScript doesn't know a plain string is one of those specific keys, so userObj[key] errors with something like:
 * Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'User'
 */
for (const key of Object.keys(userObj)) {
    // console.log(key, userObj[key]); // ❌ error
}
// fix tell TypeScript key is actually a key of User:
// what fixed - The second loop (Object.entries) has the same underlying issue, but TS is more lenient there since value just becomes any, so it usually won't error
for (const key of Object.keys(userObj)) {
    console.log(key, userObj[key]);
}
// When need both key and value
for (const [key, value] of Object.entries(userObj)) {
    console.log(key, value);
}
// Even cleaner
// You can create a small helper:
function typedKeys(obj) {
    return Object.keys(obj);
}
for (const key of typedKeys(userObj)) {
    console.log(key, userObj[key]);
}
// Object Destructuring:
// object destructuring syntax is a concise way to extract properties from an object and assign them to distinct variables.
const weather = {
    sun: "☀️",
    sun_behind_small_cloud: "🌤️",
    sun_behind_cloud: "⛅",
    sun_behind_large_cloud: "🌥️",
    sun_behind_rain_cloud: "🌦️",
    cloud: "☁️",
    cloud_with_rain: "🌧️",
    cloud_with_snow: "🌨️",
    cloud_with_lightning: "🌩️",
    cloud_with_lightning_and_rain: "⛈️",
};
const { sun, cloud, cloud_with_lightning } = weather;
sun;
// => '☀️'
cloud;
// => '☁️'
cloud_with_lightning;
// => '🌩️'
// 2. Arrays
// Standard Array ([] / Array): A dynamically resizing sequence.
// Under the hood, JS engines (like V8) optimize arrays
// if elements are dense and sequential, they use a contiguous memory array
// if elements are sparse, they automatically downgrade the layout to a slow,
// dictionary-style hash table
const arr = [1, 2, 3, 4, 5];
let arrNum = [10, 20, 30];
let arrStr = ["A", "B", "C"];
console.log(`Array<number>: ${arrNum}`);
console.log(`Array<string>: ${arrStr}`);
// Generic syntax
// Array Methods
let arr1 = [1, 2, 3, 4, 5];
console.log(`Original: ${arr1}`);
// Arrays
arr1.push(6); // Add to end -> [1,2,3,4,5,6] returns the new length of the array
arr1.pop(); // Remove last -> 6 changes the length of the array
arr1.shift(); // Remove first -> 1 changes the length of the array
arr1.unshift(0); // Add to beginning -> [0,2,3,4,5]  returns the new length of the array
// changes the contents of an array by removing or replacing existing elements and/or adding new elements in place
arr1.splice; // method returns an array containing the deleted elements
arr1.includes(3); // whether an array includes a certain value among its entries, returning true or false as appropriat
arr1.every((num) => num % 2 !== 0); //  whether all elements in the array pass the test implemented by the provided function. It returns a Boolean value
arr1.some((num) => num % 2 !== 0); //  whether at least one element in the array passes the test implemented by the provided function
arr1.find((num) => num < 5); //  returns the value of the first element in the provided array that satisfies the provided testing function. If no values satisfy the testing function, undefined is returned
arr1.findIndex((num) => num > 7); // returns the index of the first element in the array that satisfies the provided testing function. Otherwise, it returns -1, indicating that no element passed the test
// Array Transformation: Some methods are (pure), meaning that they do not modify the original array
// map (pure)
// Create a new array by transforming each element according to a function passed as an argument. These callback functions are often written as arrow functions
console.log(arr1.map((value) => value - 1));
// filter (pure)
// Creates an array by filtering the current one, given a filtering function (that returns true if the element should be kept and false if it should be removed)
console.log(arr1.filter((value) => value % 2 === 0));
// reduce(pure)
// Reduces the array to a single value using a function that takes an accumulator and the current element of the array as parameters
// This function instructs how the current element must be merged into the accumulator and returns the accumulator that will be used on the next iteration
// arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
// reverse
// Reverses the elements of an array.
console.log(arr1.reverse());
// slice(pure)
// Given a start and an end index, creates a sub-array from the array it is called on.
console.log(arr1.slice(1));
// Splice
// Removes or replaces and/or adds new elements of an array.
// it takes - start index , number of element to delete , element to insert in array(optional)
// Insert an element at index 2
arr1.splice(2, 0, 3); // 0 values removed
// Sort
// By default, sort sorts the elements of an array by first converting them to strings and then applying string comparison
// The sorting happens in-place which means the original array is modified.
// sort also returns that modified array which is convenient if you want to chain other methods to it.
arr1.sort();
// To customize the sorting behavior, you can pass a comparison function as an argument.
// The comparison function itself is called with two arguments which are two elements of the array. It then needs to return the following:
// - a negative number if the first argument should be sorted before the second
// - a positive number if the first argument should be sorted after the second
// - 0 if the order of the elements should stay the same
arr1.sort((a, b) => a - b);
// Array Loops:
// for loops
// for..of loop
// forEach - Array iteration
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
const str2 = "Hello";
const numbers1 = [1, 2, 3];
// Array methods return typed values
const doubled = numbers1.map((x) => x * 2);
const evens2 = numbers1.filter((x) => x % 2 === 0);
// Type-safe find
const found = numbers1.find((x) => x > 2);
// Array Destructuring
// Array destructuring syntax is a concise way to extract values from an array and assign them to distinct variables
// each value in the numberOfMoons array is assigned to its corresponding planet:
const numberOfMoons = [0, 2, 14];
const [venus, mars, neptune] = numberOfMoons;
neptune;
// => 14
// An array is a list that holds multiple items in order
const fruits = ["apple", "banana", "orange"];
console.log(fruits[0]); // "apple"
// Array of numbers
let arrayNumbers = [1, 2, 3];
// Array of strings
let names = ["Alice", "Bob"];
// Mixed types (careful!)
let mixed = [1, "hello", 2];
// Way of creating Array in TypeScript
// 1. Literal syntax (most common):
let Array1 = ["a", "b", "c"];
// 2. Generic wrapper (same thing, different style):
let Array2 = ["a", "b", "c"];
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
// Keyed Collections:-
// ==========================================
// A keyed collection stores data as key–value pairs, where each value is accessed using its unique key
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
map.set(() => { }, "function"); // function key!
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
// Parsing/Types Conversion
// ==========================================
let strNum = "42.5px";
//  some built-in helpers
// Boolean, Number, String
// Number(value)
// - if try to convert a non-primitive value or a string that does not represent a number, the result is NaN
// Boolean(value)
// know this - false, 0, empty string, null, undefined and NaN are Falsy
// String to Number (Explicit)
let parsedInt = parseInt(strNum, 10); // 42 (stops at non-numeric characters. '10' is the radix/base)
let parsedFloat = parseFloat(strNum); // 42.5
let castNumber = Number("42.5"); // 42.5 (Strict: Returns NaN if contains letters)
let unaryCast = +"42.5"; // 42.5 (Shorthand for Number())
// Number to String
let numToStr1 = parsedInt.toString();
let numToStr2 = String(parsedInt);
let numToStr3 = `${parsedInt}`; // Template literal coercion
// Type assertions (compile-time only)
// TypeScript Type Assertions (Casting at compile time only, no runtime effect):
let unknownData = "Hello TS";
let lengthOfData = unknownData.length;
let lengthAlt = unknownData.length; // Alternate syntax (clashes with React JSX)
// Type Coercion
// - JavaScript will automatically convert a value to another data type before it evaluates some statement.
// - This implicit conversion is called type coercion.
// In Boolean Context
// - When a non-boolean value is used in a boolean context
// In String Context
// - Addition operator + is used for primitive values and one operand is a string, the other one will be coerced into a string as well
// Numeric Context
// - Many operators coerce the operands into numbers if necessary - unary +, - makes a valid string number
// ==========================================
// Operators
// ==========================================
// Arithmetic Operator: +, -, *, /, % (modulo), ** (exponentiation)
// Order of Operations:
// - When using multiple operations in a line. JavaScript follows an order of precedence
// - JavaScript uses the PEDMAS (Parentheses, Exponents, Division/Multiplication, Addition/Subtraction)
// Assignment Operator: =, +=, -=, *=, /=, %=, **=
// this simply means e.g (a+=1) -> a = a + 1
// Unary Operator: ++, --, +, -, ~, !
// - unary includes Increment/Decrement they modify a variable in place. ++ adds one to a number, -- subtracts one from a number
// Comparison Operator (Crucial JS/TS distinction):
// - Loose Equality (==, !=): Performs implicit type coercion. (e.g., 5 == "5" is true). AVOID
// - Strict Equality (===, !==): Compares VALUE and TYPE. (e.g., 5 === "5" is false). ALWAYS USE
// Comparison (use === and !==, not == and !=)
const a = 10, b = 5;
console.log(`\nComparison: ${a} > ${b} is ${a > b}`);
console.log(`Comparison: ${a} == ${b} is ${a == b}`);
console.log(`Strict: ${a} === ${b} is ${a === b}`);
// - Relational Operator: >, <, >=, <=
// Logical Operator:
// - && (AND), || (OR), ! (NOT)
console.log(`\nLogical: true && false = ${true && false}`);
console.log(`Logical: true || false = ${true || false}`);
console.log(`Logical: !true = ${!true}`);
// Rest & Spread Operators
// (...) operator that makes it easier to work with indefinite numbers of elements.
// Depending on the context, it's called either a rest operator or spread operator.
// When Appear at left side of assignment- called Rest operator  It collects zero or more values, and stores them into a single array. It must be the last element in a destructuring assignment
const [one, two, ...everythingElse] = [0, 1, 1, 2, 3, 5, 8];
// When Appear at Right side of assignment - called spread operator It expands an array into a list of elements and can appear more than once
const oneToFive = [1, 2, 3, 4, 5];
const oneToTen = [...oneToFive, 6, 7, 8, 9, 10]; // => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const woow = [
    "A",
    ...oneToFive,
    "B",
    "C",
    "D",
    "E",
    ...oneToFive,
    42,
];
// ==========================================
// Conditionals (if else family)
// ==========================================
/*
JS/TS evaluates conditions based on "Truthy" and "Falsy" values.
Falsy values (exactly 6): false, 0 (and -0, 0n), "", null, undefined, NaN.
Everything else is Truthy (including empty arrays [] and empty objects {}).
*/
let condVal = "Non-empty string is truthy";
if (condVal) {
    // Executes because string is truthy
}
else if (condVal === "Specific") {
    // Nested if logic
    if (true) {
    }
}
else {
    // Fallback
}
// ==========================================
// other Conditionals (Switch, Ternary)
// ==========================================
/*
Switch uses STRICT equality (===) under the hood.
Omitted `break` causes "fall-through" to the next case (often a bug, sometimes intentional).
*/
let switchVar = "B";
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
let ternaryAge = 20;
let status1 = ternaryAge >= 18 ? "Adult" : "Minor";
console.log(`Ternary status: ${status1}\n`);
// - ?? (Nullish Coalescing): Returns right-hand side ONLY if left is `null` or `undefined`.
// used in  situations where you want to apply a default value in case a variable is null or undefined (but only then)
let nullValue = null;
let result = nullValue ?? "Default";
console.log(`Nullish coalescing: null ?? "Default" = ${result}`);
// - ?. (Optional Chaining):
// Safely accesses deeply nested properties
// With the optional chaining operator ?. you can ensure that JavaScript only tries to access the nested key if the parent was not null or undefined.
let optChain1 = userObj?.name;
console.log(`Optional chaining: userObj?.name = ${optChain1}\n`);
let mathRes = 10 ** 2 % 3; // 100 % 3 = 1
let strictCheck = 10 === 10;
let nullishRes = nullVar ?? "Default Value"; // Evaluates to "Default Value"
let optChain = userObj?.name; // Evaluates to "Alice" without throwing if userObj is undefined.
// ==========================================
// Loops
// ==========================================
// for loop
/*
for (initialization; condition; step) {
  // code that is executed repeatedly as long as the condition is true
}
*/
const list = ["a", "b", "c"];
for (let i = 0; i < list.length; i++) {
    // code that should be executed for each item list[i]
}
let counter = 0;
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
    if (i === 5)
        continue; // Skip to next iteration
    if (i === 9)
        break; // Exit loop entirely
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
// import { sayHi as Hello} from "./export/export";
// import { user } from "./export/export";
// import defaultFun from "./export/export";
// console.log(Hello("Pengu"));
// console.log(user("nthxdev"));
// import "./export/export";
// defaultFun();
/*
Entry point (Node.js)
if (require.main === module) {
    console.log(add(5, 3));
}
*/
// import * as readline from "node:readline";
// ==========================================
// Input Output
// ==========================================
/*
Standard Output (Node.js Environment)
*/
console.log("Prints message with a newline");
console.error("Prints to stderr");
// process.stdout.write("Prints WITHOUT a newline. ");
/*
Standard Input (Node.js Environment via 'readline')
(Requires importing the built-in 'node:readline' module)
*/
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });
// rl.question("Enter age: ", (answer) => {
//   console.log(answer);
//   rl.close();
// });
// ==========================================
// Formatting
// ==========================================
// 1. Template Literals (Backticks). Replaces printf. Supports multiline and interpolation.
let formattedStr = `User ${userObj.name} is ${userObj.age} years old.`;
// 2. Number Formatting (Decimal places) -> Returns a string!
let price = 19.9934;
let formattedPrice = price.toFixed(2); // "19.99"
console.log(`toFixed(2): ${price.toFixed(2)}`);
// 3. Internationalization API (Commas, Currency)
let population = 1500000;
let localePop = new Intl.NumberFormat("en-US").format(population); // "1,500,000"
console.log(`Locale formatting: ${localePop}`);
// 4. String Padding
let padded = "5".padStart(3, "0"); // "005"
console.log(`Padded: ${padded}\n`);
// ==========================================
// Intl API (internationalization)
// ==========================================
const intlValue = 42;
const formatted = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
}).format(intlValue);
console.log(formatted); // "42.00"
// ==========================================
// Function basics (Definitions & Context)
// ==========================================
// 1. Function Declaration: Hoisted (can be called before defined in code).
function addExample(a, b) {
    return a + b;
}
console.log(`add(5, 10) = ${addExample(5, 10)}`);
// 2. Function Expression: Assigned to a variable. Not hoisted.
const multiplyExample = function (a, b) {
    return a * b;
};
console.log(`multiply(5, 10) = ${multiplyExample(5, 10)}`);
// Typed function
function addTyped2(a, b) {
    return a + b;
}
// ==========================================
// Function Parameters & Arguments
// ==========================================
// Parameters:
// - placeholder for the value that functions accepts
// function someName(param1, param2, param3) {
// ...
// }
// Arguments:
// - actual value passed to that parameter
// someName(arg1, arg2, arg3);
// Arguments:
// Optional parameters
function greet(name, greeting) {
    return `${greeting || "Hello"}, ${name}!`;
}
console.log(`greet('Alice'): ${greet("Alice")}`);
console.log(`greet('Bob', 'Hi'): ${greet("Bob", "Hi")}`);
// Default parameters
function power(base, exponent = 2) {
    return Math.pow(base, exponent);
}
console.log(`power(5): ${power(5)}`);
console.log(`power(5, 3): ${power(5, 3)}`);
// Rest parameters
function sumAll(...numbers) {
    return numbers.reduce((a, b) => a + b, 0);
}
console.log(`sumAll(1,2,3,4,5) = ${sumAll(1, 2, 3, 4, 5)}\n`);
/*
Parameters:
- Optional Parameters (`?`): Must come after required parameters.
- Default Parameters (`= value`)
- Rest Parameters (`...args`): Collects remaining arguments into an array.
*/
function buildProfile(name, age, role = "User", ...skills) {
    return `${name} (${role}) knows ${skills.join(", ")}`;
}
// buildProfile("Alice", undefined, "Admin", "JS", "TS", "Go");
// Optional and default parameters
function displayTyped(name, age, city = "Unknown") {
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
function modifyData(primVal, refObj) {
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
function modifyPrimitive(val) {
    val = 999;
    console.log(`  Inside function: ${val}`);
}
console.log(`Before: ${primitiveVal}`);
modifyPrimitive(primitiveVal);
console.log(`After: ${primitiveVal} (unchanged)\n`);
let objVal = { value: 10 };
function modifyObject(obj) {
    obj.value = 999;
    console.log(`  Inside function: ${obj.value}`);
}
console.log(`Before: ${objVal.value}`);
modifyObject(objVal);
console.log(`After: ${objVal.value} (changed!)\n`);
let outsideNum = 1;
const outsideObj = { name: "Eve", age: 20 };
modifyData(outsideNum, outsideObj);
// outsideNum is still 1.
// outsideObj is now { name: "Eve", age: 99 }.
// Pass by value (primitives)
function modify_value(x) {
    x = 100; // Only changes local copy
}
let value = 5;
modify_value(value);
console.log(value); // Still 5
// Pass by reference (objects/arrays)
function modify_array(arr) {
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
const subtract = (a, b) => a - b; // Implicit return
console.log(`subtract(10, 3) = ${subtract(10, 3)}`);
// Destructuring parameters
function display({ name, age }) {
    console.log(`${name} is ${age}`);
}
display({ name: "Alice", age: 25 });
// Typed arrow function
const multiplyTyped2 = (a, b) => a * b;
// ==========================================
// Callbacks Functions
// ==========================================
//  functions passed as arguments
// This programming pattern creates a sequence of function calls in both synchronous and asynchronous programming
// writing it is not different from normal function however,
// the callback function must match the signature defined by the calling function
const sideLength = 5;
// function applySideLength(callback: Function) { ... } // avoid this it's lazy way ts stops checking
// recommended to write the real shape of the function
function applySideLength(callback) {
    return callback(sideLength);
}
function areaOfSquare(side) {
    return side * side;
}
applySideLength(areaOfSquare); // => 25
// ==========================================
// Recursive Functions
// ==========================================
// Recursive function
function factorial(n) {
    if (n <= 1)
        return 1;
    return n * factorial(n - 1);
}
// ==========================================
// Scope & Closures
// ==========================================
let globalVar = 23;
function scope() {
    let localscope = "i am local scope inside function";
}
if (true) {
    var functionScoped = 10; // Function-scoped
}
console.log(functionScoped); // 10 ✓ (var escapes block)
// Error ✗
// console.log(blockScoped);
// Block Scope
// let and const are block-scoped. Only accessible inside {} blocks.
if (true) {
    let message = "Hello";
    const count = 10;
    console.log(message); // ✓ Works
}
// ✗ Error - outside block
// console.log(message);
// 1. Handling Scope Access Errors (ReferenceError)
try {
    // @ts-ignore - Bypassing TypeScript compile-time check to simulate runtime execution
    console.log(localscope);
}
catch (error) {
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
    let count = 0; // Outer variable
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
function createMultiplier(multiplier) {
    return function (number) {
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
        deposit(amount) {
            if (amount > 0) {
                balance += amount;
            }
        },
        withdraw(amount) {
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
}
catch (error) {
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
}
catch (error) {
    // In modern TS, `error` is typed as `unknown`, not `any`.
    // So you must check its type before touching .message by checking is error instanceof Error
    if (error instanceof Error) {
        console.log(`Caught: ${error.message}`);
    }
    else {
        console.log(`Caught something that isn't an Error: ${error}`);
    }
}
finally {
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
}
catch (error) {
    if (error instanceof ReferenceError) {
        console.log(`ReferenceError caught: ${error.message}`);
    }
}
let maybeUser;
try {
    // @ts-ignore - this will throw because maybeUser is undefined
    console.log(maybeUser.profile.name);
}
catch (error) {
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
    field;
    constructor(message, field) {
        super(message); // send message up to Error base class
        this.name = "ValidationError"; // Overrides default "Error" name shows up instead of plain "Error"
        this.field = field;
        // Required for proper prototype chain when extending built-ins in TS
        Object.setPrototypeOf(this, ValidationError.prototype); // needed in TS
    }
}
function validateAge(age) {
    if (age < 0) {
        throw new ValidationError("Age cannot be negative", "age");
    }
}
try {
    validateAge(-5);
}
catch (error) {
    if (error instanceof ValidationError) {
        console.log(`ValidationError on '${error.field}': ${error.message}`);
    }
    else if (error instanceof Error) {
        console.log(`Some other error: ${error.message}`);
    }
}
// Re-throwing an error to an outer catch
// Nested try/catch: inner catch can re-throw to an outer handler
function parseJsonSafely(data) {
    try {
        const parsed = JSON.parse(data); // may throw SyntaxError
        return parsed.value;
    }
    catch (error) {
        console.log("Couldn't parse, sending error upward...");
        throw error; // propagate to caller's try/catch let the caller deal with it
    }
}
try {
    parseJsonSafely("{ Invalid json");
}
catch (error) {
    if (error instanceof SyntaxError) {
        console.log(`SyntaxError caught outside: ${error.message}`);
    }
}
// finally can override everything (be careful!)
// If finally has its own return/throw, it wins — it silences whatever
// happened in try or catch. Usually you want to AVOID doing this.
function overrideExample() {
    try {
        throw new Error("Original error");
    }
    catch (error) {
        return "Returned from catch";
    }
    finally {
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
async function fetchDataSafely(shouldFail) {
    try {
        if (shouldFail) {
            throw new Error("Async operation failed");
        }
        return "Data fetched";
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(`Async catch: ${error.message}`);
        }
        return "Fallback value";
    }
}
// A reusable "safe runner" pattern
// Wrap any function call so errors are handled in one place instead
// of repeating try/catch everywhere.
function executeSafely(fn) {
    try {
        fn();
    }
    catch (error) {
        console.log(`[${error.name}]: ${error.message}`);
    }
}
executeSafely(() => {
    throw new TypeError("Example forced error");
});
// ==========================================
// DOM (Document Object Model)
// ==========================================
// TypeScript's built-in DOM library (lib.dom.d.ts) ships type definitions for the entire browser DOM API
// 1. EventTarget: built-in TypeScript interface/type from the DOM types
// -> anything that can have .addEventListener() called on it. window, document, XMLHttpRequest, and every DOM node all satisfy this
// -> vent handler properties like event.target and event.currentTarget are typed as EventTarget | null. bcoz ts doesn't know in advance what fired event
function handle(target) {
    // Accept Anything that has event
}
// 2. Element: Generic element offers stuff common to all elements like - ?.classList, ?.getAttribute("") | but not ?.click(), ?.value
// document.querySelector() returns Element | null by default if you don't specify a type.
// const button = document.querySelector<HTMLButtonElement>("#btn");  --> Now TypeScript sees HTMLButtonElement | null
// More DOM types - HTMLElement, HTMLDivElement, HTMLInputElement, HTMLButtonElement,  HTMLImageElement, HTMLAnchorElement..... and so on-> know that
const form = document.querySelector("#form");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const btnform = document.querySelector("#btn-form");
const cursorX = document.querySelector("#clientX");
const cursorY = document.querySelector("#clientY");
const cursor = document.querySelector("#cursor");
const follower = document.querySelector("#follower");
const eye = document.querySelector("#eye");
const pupil = document.querySelector("#pupil");
// The browser exposes window (the global object)
// Window offers (DOM entry point) - Represent the entire page HTML tree
// DOM Selectors - Returns: Single HTML element, NodeList(static), HTMLCollection(live)
// querySelector()
// querySelectorAll()
// getElementById()
// getElementsByClass()
/*
Array-like structures: NodeList vs HTMLCollection
NodeList (static): querySelectorAll() | Snapshot at moment of query
— doesn't update if DOM changes | loop with for...of or forEach()
HTMLCollection (live): getElementsByClassName() | Updates automatically
— slower, rarely needed | has .length but limited method
*/
// NodeListOf<T> - Return type of querySelectorAll()
// A static snapshot (doesn't update if DOM changes later). Has .forEach() and is iterable with for...of, but lacks most Array methods (.map, .filter) directly.
// HTMLCollectionOf<T> - Return type of getElementsByClassName() / getElementsByTagName()
// A live collection — automatically updates if you add/remove matching elements from the DOM. Array-like (.length, indexable) but no .forEach().
form?.addEventListener("mouseenter", (e) => {
    // Styling with DOM - Affects rendering either Direct: style.color / via CSS: classList
    // element.style.property
    // element.classList.add()
    // element.classList.remove()
    // element.getAttribute()
    form?.classList.toggle("form-hover");
    // More:
    // contains('');
    // remove('');
    // toggle(''); -> Add if missing, remove if present
});
// Most DOM code in TypeScript is written just like JavaScript
// Usually don't manually write the type—let TS infer it.
// TypeScript infers:
// button → Element | null
// querySelectorAll() → NodeListOf<Element>
// getElementById() → HTMLElement | null
// ==========================================
// Events
// ==========================================
// Event - The Base type
// every event has these: .target, .currentTarget, .preventDefault(), .stopPropagation(), .type
// Event object - When an event happens, browser automatically passes an object with event details:
let clicked = false;
const eventFunc = (event) => {
    console.log(event.target); // e is the event object
    const eventbutton = event.currentTarget;
    // or
    clicked = !clicked;
    eventbutton.innerText = clicked ? "button clicked" : "Event button";
    // (event.target as HTMLElement).style.textDecoration ="line-through";
    eventbutton.style.textDecoration = clicked ? "line-through" : "none"; // HTMLButtonElement already inherit HTMLElement Properties
    // e.target -> The element where event happened
    // e.type -> Event name (e.g., "click")
    // e.key -> Keyboard key pressed
    // e.clientX -> Mouse horizontal position
    // e.clientY -> Mouse vertical position
    event.preventDefault(); // preventDefault() = Stop browser's default behavior
    console.log(event.clientX, event.clientY); // Track mouse position
    // Note: Arrow functions don't have their own this. Use regular functions if you need this
    console.log(event.type);
    // Accessing Element Inside Listener using this:
    console.log(this); // this = the button element, this in arrow function will point to global object, not button
    // Event Bubbling
    // When you click a child element, the event travels UP to parent elements:
    event.stopPropagation(); // Event won't go to parent
    // Event Delegation (Smart Pattern)
    // Instead of adding listeners to many elements, add ONE listener to parent
};
// click -> Single click
// dblclick -> Double click
// input -> Text typed/deleted/pasted in input
// change -> Dropdown/checkbox/file input changed
// submit -> Form submitted
// keydown -> Key pressed -> key.up
// keyup -> Key released
// mouseover -> Mouse enters element
// mouseout -> Mouse leaves element
// mousemove -> Mouse moves
// focus -> element get focus
btnform?.addEventListener("click", eventFunc);
// MoUuseEvent
// Adds mouse-specific data: .clientX/Y, .button, .altKey, .ctrlKey, .shiftKey
document.addEventListener("mousemove", (e) => {
    // coz of ts strict null checking add Conditional
    if (cursorX && cursorY) {
        cursorX.innerText = e.clientX.toString();
        cursorY.innerText = e.clientY.toString();
    }
});
// KeyboardEvent
// Adds .key, .code, .altKey, .ctrlKey, .shiftKey, .repeat. Used for keydown, keyup, keypress
// Input event
// e.data = only the character just typed
// e.target.value = entire input text (use this most often)
document.addEventListener("mousemove", (event) => {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
});
btnform?.addEventListener("mouseenter", () => {
    cursor?.classList.add("button-cursor");
});
btnform?.addEventListener("mouseleave", () => {
    cursor?.classList.remove("button-cursor");
});
let followX = 0;
let followY = 0;
let followerX = 0;
let followerY = 0;
const speed = 0.15; // Adjust the speed of the follow
let followState = false;
const pupilMaxDistance = 60;
const pupilCenterX = 1086;
const pupilCenterY = 1026;
document.addEventListener("mousemove", (event) => {
    if (followState)
        return;
    followX = event.clientX;
    followY = event.clientY;
});
function followCursor() {
    if (!followState) {
        follower.classList.remove("btn-hover");
        followerX += (followX - followerX) * speed;
        followerY += (followY - followerY) * speed;
        follower.style.left = `${followerX}px`;
        follower.style.top = `${followerY}px`;
        // eye center
        const eyeRect = eye.getBoundingClientRect();
        const eyeCenterX = eyeRect.left + eyeRect.width / 2;
        const eyeCenterY = eyeRect.top + eyeRect.height / 2;
        const dx = followX - eyeCenterX;
        const dy = followY - eyeCenterY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > 0) {
            const directionX = dx / distance;
            const directionY = dy / distance;
            const pupilX = pupilCenterX + directionX * pupilMaxDistance;
            const pupilY = pupilCenterY + directionY * pupilMaxDistance;
            pupil.setAttribute("cx", `${pupilX}`);
            pupil.setAttribute("cy", `${pupilY}`);
        }
        // const angle = Math.atan2(dy, dx);
        // const pupilDistance = Math.min(distance, pupilMaxDistance);
        // const pupilX = pupilDistance * Math.cos(angle);
        // const pupilY = pupilDistance * Math.sin(angle);
        // pupil!.setAttribute("cx", `${eyeCenterX + pupilX}`);
        // pupil!.setAttribute("cy", `${eyeCenterY + pupilY}`);
    }
    requestAnimationFrame(followCursor);
}
followCursor();
btnform?.addEventListener("mouseenter", () => {
    if (!form || !follower)
        return;
    followState = true;
    const rect = form.getBoundingClientRect();
    follower.classList.add("btn-hover");
    follower.style.left = `${rect.left}px`;
    follower.style.top = `${rect.top}px`;
    follower.style.width = `${rect.width}px`;
    follower.style.height = `${rect.height}px`;
    follower.classList.add("form-hover");
});
btnform?.addEventListener("mouseleave", () => {
    followState = false;
    follower.classList.remove("btn-hover");
    follower.style.width = "40px";
    follower.style.height = "40px";
    follower.classList.remove("form-hover");
});
// InputEvent
// Fires on the input event (as you type). Adds .data (the character(s) inserted) and .inputType (e.g. "insertText", "deleteContentBackward").
// Careful: e.target in an input handler is typed as EventTarget | null, not HTMLInputElement — you still need to cast it
// SubmitEvent
// Fires on form submit. Adds .submitter — the button that triggered the submit (useful when a form has multiple submit buttons)
// FocusEvent
// Fires on focus / blur / focusin / focusout. Adds .relatedTarget — the element losing/gaining focus in the transition
// DragEvent
// Fires on dragstart, drag, dragover, drop, etc. Adds .dataTransfer — the object you use to read/write dragged data.
// TouchEvent
// Mobile/touchscreen events (touchstart, touchmove, touchend). Adds .touches, .changedTouches — lists of active touch points (for multi-touch gestures).
// PointerEvent
// A unified event covering mouse, touch, AND pen input in one API (pointerdown, pointermove, pointerup). Adds .pointerType ("mouse", "touch", "pen"), .pressure. Modern preferred way to handle mixed input devices instead of writing separate mouse and touch handlers.
// WheelEvent
// Fires on wheel (scroll wheel / trackpad scroll). Adds .deltaX/Y/Z — how much was scrolled, and .deltaMode — units (pixels, lines, or pages)
// CustomEvent<T>
// For events you define and dispatch yourself — not a browser-native trigger. The generic T types .detail, the payload you attach.
// type MyDetail = { userId: number };
// const evt = new CustomEvent<MyDetail>('user-login', {
//   detail: { userId: 42 }
// });
// el.addEventListener('user-login', (e: Event) => {
//   const custom = e as CustomEvent<MyDetail>;
//   console.log(custom.detail.userId); // 42, fully typed
// });
// el.dispatchEvent(evt);
// About ChangeEvent — you were right to flag it
// ChangeEvent is not a native DOM type at all. It's from @types/react, specifically typed for React's synthetic event system:
// React only:
// import { ChangeEvent } from 'react';
// function handleChange(e: ChangeEvent<HTMLInputElement>) {
//   // React's synthetic event, wraps the native one
//   console.log(e.target.value);
// }
// ==========================================
// Form Validation
// ==========================================
// ==========================================
// Regex
// ==========================================
// Regular Expressions (Regex)
// Regex = a pattern to match text against rules.
// Basic syntax:
{
    const regex = /pattern/;
    const isValid = regex.test("value");
}
// Test method returns:
// true = matches pattern
// false = doesn't match
// Simple examples:
{
    // Lowercase letters only, 3-8 characters
    const regex1 = /^[a-z]{3,8}$/;
    console.log(regex1.test("hello")); // true
    console.log(regex1.test("HELLO")); // false (uppercase)
    console.log(regex1.test("hi")); // false (too short)
    // Letters and numbers, 3-20 characters
    const regex2 = /^[A-Za-z0-9_]{3,20}$/;
    console.log(regex2.test("harsh_123")); // true
    console.log(regex2.test("ha")); // false (too short)
    console.log(regex2.test("harsh@123")); // false (@ not allowed)
}
// Email Validation
{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
}
// ==========================================
// Prototypes & Classes
// ==========================================
// js supports OOP you create objects(instances) from templates (classes) so that they include certain data and functionality
// ==========================================
// Async — Promise<T>
// ==========================================
// ==========================================
// Timers
// ==========================================
// ==========================================
// Browser Storage
// ==========================================
// ==========================================
// Fetch / HTTP
// ==========================================
// ==========================================
// Prototypes & Classes
// ==========================================
