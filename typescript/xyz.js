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
class MyClasses {
    method() {
        return "result";
    }
}
// Exports
export { myFunction, MyClasses };
// ==========================================
// Comments & Code Documentation
// ==========================================
// SYNTAX
// Comments
/*
Multi-line
comment
*/
//  Documentation comment (JSDoc)
/**
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
// variables are always written in camelCase; constants are written in SCREAMING_SNAKE_CASE
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
let numType = parseInt(valueAny);
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
        // parseInt(string, radix?) - optional number/base (2–36)
        return parseInt(value);
    }
    throw new Error("Invalid type");
}
// ==========================================
// Type Checking
// ==========================================
// check the type of a piece of data at runtime using typeof operator
// typeof: returns the type of its operand the output is string matching the name of one of the primtive data types except for null. it can also be function or object
console.log(typeof 42); // "number"
console.log(typeof 3.14); // "number"
console.log(typeof "Hello"); // "string"
console.log(typeof true); // "boolean"
console.log(typeof undefined); // "undefined"
console.log(typeof function () { }); // "function"
console.log(typeof (() => { })); // "function"
console.log(typeof { name: "Alice" }); // "object"
console.log(typeof [1, 2, 3]); // "object" ⚠️ arrays are objects!
console.log(typeof null); // "object" ⚠️ historical quirk!
// Historically, JavaScript’s first implementation classified null with the object type internally. 
// Fixing it would break old JavaScript code, so it stayed.
console.log(typeof 9007199254740991n); // "bigint"
console.log(typeof Symbol("id")); // "symbol"
// For [historical reason// Use typeof to validate input before processings][typeof null is "object"]
// typeof for Type Guards in Functions
// Use typeof to validate input before processing
function valuePorcess(value) {
    if (typeof value === "number") {
        console.log("Processing number:", value * 2);
    }
    else if (typeof value === "string") {
        console.log("Processing string:", value.toUpperCase());
    }
    else if (typeof value === "boolean") {
        console.log("Processing boolean:", !value);
    }
    else if (typeof value === "object" && value !== null) {
        console.log("Processing object:", Object.keys(value));
        // Returns: an array of strings containing the object's own enumerable property names
    }
    else {
        console.log("Unknown type");
    }
}
valuePorcess(42); // "Processing number: 84"
valuePorcess("hello"); // "Processing string: HELLO"
valuePorcess({ name: "Alice" }); // "Processing object: ['name']"
// instanceof Operator — Class & Inheritance Checking
// "instanceof operator" — checks if an object is an instance of a class (or if the class appears in the object's prototype chain). Returns boolean. Works ONLY with objects/classes
// for checking type of an object
// it evaluates into a boolean depending on whether the second operand is included in the first operands `prototype chain`.
// To clarify, instanceof will return whether the first operand is an instance of second operand or one of its child classes. instanceof only works on objects.
// In simpler words: it check Was this object created from this class, or from a class that inherits from it?
class Beverage {
    // ...
    temperature = "hot";
    drink() {
        console.log("Drinking beverage");
    }
}
// The Coffee class is a child of the Beverage class.
class Coffee extends Beverage {
    // ...
    roastLevel = "medium";
    brew() {
        console.log("Brewing coffee");
    }
}
class Tea extends Beverage {
    type = "green";
    steep() {
        console.log("Steeping tea");
    }
}
const myPourover = new Coffee();
const myGreenTea = new Tea();
// Check direct class
console.log(myPourover instanceof Coffee); // true
console.log(myGreenTea instanceof Coffee); // false
// Check parent class (prototype chain lookup)
console.log(myPourover instanceof Beverage); // true ✓ (Coffee extends Beverage)
console.log(myGreenTea instanceof Beverage); // true ✓ (Tea extends Beverage)
// All objects inherit from Object
console.log(myPourover instanceof Object); // true
console.log(myGreenTea instanceof Object); // true
// instanceof with Polymorphism
// Use instanceof to determine behavior at runtime
function serveBeverage(beverage) {
    if (beverage instanceof Coffee) {
        console.log(`Serving coffee at ${beverage.temperature}`);
        beverage.brew(); // TypeScript knows it has brew()
    }
    else if (beverage instanceof Tea) {
        console.log(`Serving tea (${beverage.type})`);
        beverage.steep(); // TypeScript knows it has steep()
    }
    else if (beverage instanceof Beverage) {
        console.log("Serving generic beverage");
        beverage.drink();
    }
    else {
        console.log("Not a beverage!");
    }
}
serveBeverage(myPourover); // Serving coffee at hot
serveBeverage(myGreenTea); // Serving tea (green)
// passes an object without variable
serveBeverage(new Beverage()); // Serving generic beverage
// Advanced:
// Array class has a method called Array.isArray() that checks if its argument is an array.
// "Array.isArray()" — Safe Array Checking safer than typeof or instanceof for arrays. 
// Works correctly across different realms (e.g., iframes). 
// Avoids false positives where an object just has Array in prototype.
const isArray = [1, 2, 3];
const obj = { 0: "a", 1: "b", length: 2 }; // array-like but not array
const notArray = "not an array";
// typeof check is unreliable
console.log(typeof isArray); // "object" (arrays are objects)
console.log(typeof obj); // "object" (looks like array)
console.log(typeof notArray); // "string"
// Array.isArray() is reliable ✓
console.log(Array.isArray(isArray)); // true ✓
console.log(Array.isArray(obj)); // false ✓ (array-like, but not array)
console.log(Array.isArray(notArray)); // false ✓
// Why Array.isArray() is better than instanceof:
// In iframes or different realms, instanceof can fail
// because each realm has its own Array constructor
const potentialArray = [1, 2, 3];
if (Array.isArray(potentialArray)) {
    // Now TypeScript knows it's an array
    console.log(potentialArray.map((x) => x * 2)); // [2, 4, 6]
}
// The `in` Operator — Property Existence
// "in operator" — checks whether a property exists on an object. 
// Returns boolean. 
// INCLUDES inherited properties and methods from the prototype chain.
class Animals {
    name = "Unknown";
    constructor(name) {
        this.name = name;
    }
    speak() {
        console.log(`${this.name} makes a sound`);
    }
}
class Dogs extends Animals {
    breed = "Unknown";
    constructor(name, breed) {
        super(name);
        this.breed = breed;
    }
    bark() {
        console.log(`${this.name} barks!`);
    }
}
const myDog = new Dogs("Rex", "Labrador");
// Check own properties
console.log("name" in myDog); // true (own property from constructor)
console.log("breed" in myDog); // true (own property from constructor)
// Check inherited properties and methods
console.log("speak" in myDog); // true ✓ (inherited from Animals)
console.log("bark" in myDog); // true ✓ (defined on Dogs)
console.log("constructor" in myDog); // true ✓ (inherited from Object)
// Check non-existent property
console.log("color" in myDog); // false (doesn't exist)
// SECTION 7: Object.hasOwn() — Own Property Check (Recommended)
// "Object.hasOwn()" — checks if a property is owned by the object (NOT inherited). 
// Recommended over deprecated hasOwnProperty(). Does NOT check prototype chain.
// Same dog instance from above
console.log(Object.hasOwn(myDog, "name")); // true (own property)
console.log(Object.hasOwn(myDog, "breed")); // true (own property)
// These would be false with Object.hasOwn (unlike `in`)
console.log(Object.hasOwn(myDog, "speak")); // false (inherited method)
console.log(Object.hasOwn(myDog, "bark")); // false (class method, not own)
console.log(Object.hasOwn(myDog, "constructor")); // false (inherited)
console.log(Object.hasOwn(myDog, "color")); // false (doesn't exist)
// SECTION 8: `in` vs Object.hasOwn() Comparison
// Practical use case: filtering own properties from inherited ones
const user1 = {
    name: "Alice",
    age: 25
};
// Walk through all properties
for (const key in user1) {
    if (Object.hasOwn(user1, key)) {
        // keyof extracts the keys
        // typeof user gives object and than keyof pulls keys. and treats key as valid key for user
        console.log(`Own property: ${key} = ${user1[key]}`);
    }
    // With just `in`, you'd also get inherited properties
}
// Better way: use Object.keys() or Object.entries()
Object.entries(user1).forEach(([key, value]) => {
    console.log(`${key}: ${value}`); // Only own properties
});
function analyzeInput(input) {
    // typeof guards
    if (typeof input === "string") {
        console.log(`String length: ${input.length}`);
    }
    else if (typeof input === "number") {
        console.log(`Number value: ${input * 2}`);
    }
    else if (typeof input === "boolean") {
        console.log(`Boolean: ${input ? "true" : "false"}`);
    }
    else if (typeof input === "undefined") {
        console.log("Input is undefined");
    }
    else if (input === null) {
        // typeof null is "object", so check explicitly
        console.log("Input is null");
    }
    else if (Array.isArray(input)) {
        // instanceof Array would also work, but Array.isArray() is safer
        console.log(`Array length: ${input.length}`);
    }
    else if (input instanceof Date) {
        console.log(`Date: ${input.toDateString()}`);
    }
    else {
        // Generic object
        console.log(`Object keys: ${Object.keys(input).join(", ")}`);
    }
}
analyzeInput("hello"); // String length: 5
analyzeInput(42); // Number value: 84
analyzeInput(true); // Boolean: true
analyzeInput([1, 2, 3]); // Array length: 3
analyzeInput(new Date()); // Date: [today's date]
analyzeInput({ name: "Alice" }); // Object keys: name
// Function that validates unknown data and ensures type safety
function validateUser(data) {
    // Check if it's an object at all
    if (typeof data !== "object" || data === null || Array.isArray(data)) {
        return false;
    }
    // Check if it has the required properties
    if (!Object.hasOwn(data, "name") ||
        !Object.hasOwn(data, "age") ||
        !Object.hasOwn(data, "email")) {
        return false;
    }
    // Type assertions after checks
    const obj = data;
    // Validate each property's type
    if (typeof obj.name !== "string" || obj.name.length === 0) {
        return false;
    }
    if (typeof obj.age !== "number" || obj.age < 0 || obj.age > 150) {
        return false;
    }
    if (typeof obj.email !== "string" || !obj.email.includes("@")) {
        return false;
    }
    return true;
}
// Using the type guard
const potentialUser = {
    name: "Alice",
    age: 28,
    email: "alice@example.com"
};
if (validateUser(potentialUser)) {
    // TypeScript now knows it's a ValidUser ✓
    console.log(`Valid user: ${potentialUser.name} (${potentialUser.age})`);
}
else {
    console.log("Invalid user data");
}
// SECTION 11: Common Type Checking Mistakes
// Mistake 3: Trusting `in` for private properties
const obj4 = { public: "visible" };
console.log("public" in obj4); // true
console.log("private" in obj4); // false
// `in` checks the prototype chain, which can be unexpected
// Mistake 4: Assuming all objects have a property
const dynamicObj = { key: "value" };
if ("key" in dynamicObj) {
    console.log(dynamicObj.key); // ✓ safe to access
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
const str1 = "Hello, World!";
console.log(str1.length); // 13
console.log(str1[0]); // 'H'
console.log(str1.substring(0, 5)); // 'Hello'
console.log(str1.includes("World")); // true
console.log(str1.indexOf("World")); // 7
console.log(str1.replace("World", "JavaScript")); // 'Hello, JavaScript!'
console.log(str1.toUpperCase()); // 'HELLO, WORLD!'
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
const [destructX, destructY] = [10, 20];
let literalType = "left"; // or "right"
// 6. Union types
// allow multiple type & values - can be custom type
let id;
id = "ABC123"; // OK
id = 123; // OK
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
const userObject = { name: "Alice", age: 30 };
// object operation
// 'devObj' reference is constant, but `devObj.age` is mutable.
console.log(`Object: ${JSON.stringify(userObject)}`);
// - in js only the type of the key is restricted: it has to be a string
// - but values can be primitive values can be array, object even function.
// - the also key entities for OOP in js
// Operations object:
// Retrieving a value
userObject["name"] = "Bob";
userObject.name = "Don";
// Check wheather value exists
userObject.hasOwnProperty("name");
// Looping over Object:
// when wants keys only
/**
 * this code below is valid in js but not in ts, why?
 * Object.keys() returns key as type string. But userObj is typed as User, which only allows keys "name" or "age". TypeScript doesn't know a plain string is one of those specific keys, so userObj[key] errors with something like:
 * Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'User'
 */
for (const key of Object.keys(userObject)) {
    // console.log(key, devObj [key]); // ❌ error
}
// fix tell TypeScript key is actually a key of User:
// what fixed - The second loop (Object.entries) has the same underlying issue, but TS is more lenient there since value just becomes any, so it usually won't error
for (const key of Object.keys(userObject)) {
    console.log(key, userObject[key]);
}
// When need both key and value
for (const [key, value] of Object.entries(userObject)) {
    console.log(key, value);
}
// Even cleaner
// You can create a small helper:
function typedKeys(obj) {
    return Object.keys(obj);
}
for (const key of typedKeys(userObject)) {
    console.log(key, userObject[key]);
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
const doubledArr = numbers1.map((x) => x * 2);
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
let bufferArr = new ArrayBuffer(16); // 16 bytes of empty memory
// just raw bytes cant use it directly
// Data Lenses(Views)
let view = new Int32Array(bufferArr); // view as 32-bit integers
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
// Set
// ==========================================
// A collection of unique values. Like `Map`
// it tracks insertion order and leverages internal hashing
// to evaluate item uniqueness in $O(1)$ time complexity, bypassing costly array traversals.
// a set is a list like structure containing unique values, which can be primitives and/or object references.
// Unlike an array, a set's elements cannot be accessed by index.
// A value cannot be added to a set if it is strictly equal to any of the set's elements
const set = new Set();
const object = { color: 'lime green' };
const functionallyIdenticalObject = { color: 'lime green' };
set.add(object);
set.add('wow');
set.add(77);
console.log(set.size); // 3
set.add(functionallyIdenticalObject); // added because functionallyIdenticalObject is not strictly equal to object
console.log(set.size); // 4
set.add(77); // not added because 77 is strictly equal to 77
console.log(set.size); // 4
