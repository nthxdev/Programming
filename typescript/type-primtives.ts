
// ==========================================
// BUILT-IN PRIMITIVES
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
console.log(`Binary: ${numBinary}`)

// 2. BigInt: Arbitrary precision integers (for numbers larger than Number.MAX_SAFE_INTEGER: 2^53 - 1).
// BigInt (arbitrary precision)
// Arbitrary-precision integers. Allocates dynamic heap space to process numbers beyond the Safe Integer Limit ($\pm(2^{53} - 1)$).
let bigIntVal: bigint = 9007199254740991n; // 'n' suffix
console.log(`bigint: ${bigIntVal}`);

// String (UTF-16)
// Immutable sequences of 16-bit UTF-16 code units, allocated and deduplicated via internal V8 string interning.
// 3. String: UTF-16 code units.
let strSingle: string = 'A';
console.log(`String One char: ${strSingle}`);
let strDouble: string = "Hello";
console.log(`string: ${strDouble}`);
const str = "Hello, World!";
console.log(str.length);            // 13
console.log(str[0]);                // 'H'
console.log(str.substring(0, 5));   // 'Hello'
console.log(str.includes("World"));  // true
console.log(str.indexOf("World"));   // 7
console.log(str.replace("World", "JavaScript"));  // 'Hello, JavaScript!'
console.log(str.toUpperCase());     // 'HELLO, WORLD!'


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