// TS Compile-Time (Advanced Types)
// Enforces Structural Subtyping (Duck Typing). If two shapes match, their types are compatible, regardless of explicit inheritance.

// 1. Structural Interfaces
// Interface for type safety
interface User {
    name: string;
    age: number;
}
// const obj: { [key: string]: string } = {};
// const obj: Record<string, unknown> = {};

// 2. Type Alias
// gives a name to any type
type ID = string | number;
const aliasType1: ID = 123;
const aliasType2: ID = "ABCD";
console.log(typeof aliasType1)
console.log(typeof aliasType2)

// 3. Literal Types
// Restricts a variable down to a specific exact string, number, or boolean value
type direction = "left" | "right";
let literalType : direction = "left";  // or "right"

// 4. Tuples
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

// 5. Enums (enum / const enum)
// Standard enum generates a bi-directional lookup object at runtime. const enum is completely erased, and values are inlined directly into code.
// Enums (TS specific): Named constants. Compiles to JS objects (or IIFEs)
enum Color {
  Red = 0,
  Green = 1,
  Blue = 2
}
const myColor: Color = Color.Red;
console.log(Color[0]); // "Red" (reverse lookup)
// String enums
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT"
}
const dir: Direction = Direction.Up;
// Const enum: completely erased at runtime, values inlined
const enum Status {
  Active = "ACTIVE",
  Inactive = "INACTIVE"
}
const status: Status = Status.Active; // Inlined as "ACTIVE" in output
// Mixed enum (not recommended)
enum Mixed {
  No = 0,
  Yes = "YES"
}