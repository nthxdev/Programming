import * as readline from "node:readline";
// ==========================================
// INPUT OUTPUT
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
    output: process.stdout
});

rl.question('Enter age: ', (answer) => {
    console.log(answer);
    rl.close();
});
