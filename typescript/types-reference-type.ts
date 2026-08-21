// ==========================================
// REFERENCE TYPES
// ==========================================
/*
Reference Types (Objects) are dynamically allocated on the Heap.
The Stack holds the variable (the reference/pointer), which points to the memory address on the Heap.
*/

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
arr1.push(6);                        // Add to end -> [1,2,3,4,5,6]
arr1.pop();                          // Remove last -> 6
arr1.shift();                        // Remove first -> 1
arr1.unshift(0);                     // Add to beginning -> [0,2,3,4,5]

// Array iteration
arr1.forEach((num) => {
    console.log(num);
});

// Map (transform each element)
const squared = arr1.map(x => x ** 2);
// Filter
const evens = arr1.filter(x => x % 2 === 0);
// Find
const first_even = arr1.find(x => x % 2 === 0);
// Slice (get subset)
const subset = arr1.slice(1, 4);     // [2, 3, 4]
// Spread operator
const arr2 = [...arr1, 6, 7];        // Combine arrays

// Typed strings and arrays
const str2: string = "Hello";
const numbers1: number[] = [1, 2, 3];

// Array methods return typed values
const doubled: number[] = numbers1.map(x => x * 2);
const evens2: number[] = numbers1.filter(x => x % 2 === 0);

// Type-safe find
const found: number | undefined = numbers1.find(x => x > 2);



