// ==========================================
// PARSING or TYPE CONVERSION
// ==========================================
let strNum: string = "42.5px";

// String to Number (Explicit)
let parsedInt: number = parseInt(strNum, 10); // 42 (stops at non-numeric characters. '10' is the radix/base)
let parsedFloat: number = parseFloat(strNum); // 42.5
let castNumber: number = Number("42.5");      // 42.5 (Strict: Returns NaN if contains letters)
let unaryCast: number = +"42.5";              // 42.5 (Shorthand for Number())

// Number to String
let numToStr1: string = parsedInt.toString();
let numToStr2: string = String(parsedInt);
let numToStr3: string = `${parsedInt}`; // Template literal coercion

// Type assertions (compile-time only)
// TypeScript Type Assertions (Casting at compile time only, no runtime effect):
let unknownData: unknown = "Hello TS";
let lengthOfData: number = (unknownData as string).length;
let lengthAlt: number = (<string>unknownData).length; // Alternate syntax (clashes with React JSX)