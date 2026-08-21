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
function buildProfile(name: string, age?: number, role: string = "User", ...skills: string[]): string {
    return `${name} (${role}) knows ${skills.join(', ')}`;
}
// buildProfile("Alice", undefined, "Admin", "JS", "TS", "Go");

// Optional and default parameters
function displayTyped(name: string, age?: number, city: string = "Unknown"): void {
    console.log(`${name}, ${age}, ${city}`);
}