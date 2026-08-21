let globalVar: number = 23;

function scope(){
    let localscope: string = "i am local scope inside function"
}

if (true) {
  var a = 10;      // Function-scoped
  let b = 20;      // Block-scoped
  const c = 30;    // Block-scoped
}
console.log(a);    // 10 ✓ (var escapes block)
console.log(b);    // Error ✗
console.log(c);    // Error ✗

// 1. Handling Scope Access Errors (ReferenceError)
try {
  // @ts-ignore - Bypassing TypeScript compile-time check to simulate runtime execution
  console.log(localscope); 
} catch (error) {
  if (error instanceof ReferenceError) {
    console.error("Scope Error caught:", error.message); 
    // Output: localscope is not defined
  }
}

// Block Scope
// let and const are block-scoped. Only accessible inside {} blocks.
if (true) {
  let message = "Hello";
  const count = 10;
  
  console.log(message);  // ✓ Works
}
console.log(message);    // ✗ Error - outside block



// Scope Chain Rule
// Inner scopes see outer scopes. Outer scopes don't see inner scopes.
const a = 1;           // Global
function outer() {
  const b = 2;         // Outer function scope
  function inner() {
    const c = 3;       // Inner function scope
    console.log(a);    // ✓ Yes (global)
    console.log(b);    // ✓ Yes (outer function)
    console.log(c);    // ✓ Yes (own scope)
  }
  inner();
  console.log(c);      // ✗ Error (can't see inner)
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
  let count = 0;  // Outer variable
  
  return function () {
    count++;       // Inner function uses outer variable
    return count;
  };
}
const counter = createCounter();
console.log(counter());  // 1
console.log(counter());  // 2
console.log(counter());  // 3



// Function Factory
function createMultiplier(multiplier) {
  return function(number) {
    return number * multiplier;
  };
}
const double = createMultiplier(2);
const triple = createMultiplier(3);
console.log(double(5));  // 10 (remembers 2)
console.log(triple(5));  // 15 (remembers 3)
// Each function remembers its own multiplier






// Encapsulation - Hide & Control
// What is Encapsulation?
// Hide internal data and only expose controlled operations.
function createAccount() {
  let balance = 0;  // Private - hidden from outside
  
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
    }
  };
}
const account = createAccount();
account.deposit(100);
account.withdraw(30);
console.log(account.getBalance());  // 70
// Can't directly access balance:
console.log(account.balance);  // undefined



// Practical: Private Variables with Closure
function createPassword(initialPassword) {
  let password = initialPassword;  // Private
  let attempts = 0;                // Private
  
  return {
    checkPassword(guess) {
      attempts++;
      
      if (attempts > 3) {
        return "Too many attempts";
      }
      
      if (guess === password) {
        return "Correct!";
      } else {
        return "Wrong! Attempts: " + attempts;
      }
    },
    
    getAttempts() {
      return attempts;
    }
  };
}
const secure = createPassword("secret123");
console.log(secure.checkPassword("wrong"));    // Wrong! Attempts: 1
console.log(secure.checkPassword("wrong"));    // Wrong! Attempts: 2
console.log(secure.checkPassword("secret123")); // Correct!
console.log(secure.getAttempts());             // 3
// Can't access password directly
console.log(secure.password);  // undefined





// Closure with setTimeout
function setupTimers() {
  for (let i = 1; i <= 3; i++) {
    setTimeout(() => {
      console.log("Timer " + i);
    }, i * 1000);
  }
}
setupTimers();

