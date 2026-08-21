
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