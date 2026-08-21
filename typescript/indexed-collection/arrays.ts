// Standard Array ([] / Array): A dynamically resizing sequence. 
// Under the hood, JS engines (like V8) optimize arrays
// if elements are dense and sequential, they use a contiguous memory array
// if elements are sparse, they automatically downgrade the layout to a slow, 
// dictionary-style hash table

// An array is a list that holds multiple items in order
const fruits = ["apple", "banana", "orange"];
console.log(fruits[0]); // "apple"
// Array of numbers
let numbers: number[] = [1, 2, 3];
// Array of strings
let names: string[] = ["Alice", "Bob"];
// Mixed types (careful!)
let mixed: (string | number)[] = [1, "hello", 2];

// Way of creating Array in TypeScript
// 1. Literal syntax (most common):
let arr1: string[] = ["a", "b", "c"];
// 2. Generic wrapper (same thing, different style):
let arr2: Array<string> = ["a", "b", "c"];


// Dense Dense and Sequential Array
// Dense = no gaps
// Sequential = items in order
let arrDense = [10, 20, 30, 40];
//         [0] [1] [2] [3]
// All positions filled. JavaScript stores this fast in contiguous memory (side-by-side in RAM)

// Sparse = has Gaps
let arrSparse  = [];
arrSparse[0] = "a";
arrSparse[5] = "b";  // positions 1,2,3,4 are empty
// Missing positions = sparse. JavaScript downgrades to slow storage


