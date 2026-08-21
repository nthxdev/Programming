// Timers let you run code after a delay or repeatedly at intervals. JavaScript has two main timer functions
// setTimeout() - Run Code Once After Delay
// Runs a function ONE TIME after specified milliseconds
// setTimeout(function, delayInMilliseconds);
setTimeout(function() {
  console.log("This runs after 2 seconds");
}, 2000);
// setTimeout() with Named Functions
// Remember: No parentheses after function name!

// Passing Arguments to setTimeout()
// setTimeout(function, delay, arg1, arg2, arg3, ...);
// Pass extra parameters after the delay:
function greet(name, age) {
  console.log(`Hello ${name}, you are ${age} years old`);
}
// After 2 seconds: "Hello Ali, you are 25 years old"
setTimeout(greet, 2000, "Ali", 25);


// Storing setTimeout ID (Canceling Timer)
// Every setTimeout() returns a unique ID. You can use it to cancel the timer:
const timerId = setTimeout(() => {
  console.log("This might not run");
}, 5000);
// Cancel the timer before 5 seconds pass
clearTimeout(timerId);
console.log("Timer cancelled!");
// Without canceling, message prints after 5 seconds.
// With clearTimeout(), message never prints.


// setInterval() - Run Code Repeatedly
// Runs a function repeatedly at fixed time intervals
setInterval(function() {
  console.log("This runs every 2 seconds");
}, 2000);
// Will keep running forever (until you stop it)
// Example:
function updateClock() {
  const time = new Date().toLocaleTimeString();
  console.log(time);
}
setInterval(updateClock, 1000);  // Update every 1 second

// Stopping setInterval() with clearInterval()
// Store the interval ID and use clearInterval() to stop it
let count = 0;
const intervalId = setInterval(() => {
  count++;
  console.log(count);
  
  if (count === 5) {
    clearInterval(intervalId);  // Stop the interval
    console.log("Stopped!");
  }
}, 1000);



// Debounce (Wait for User to Stop)
let timeout;
element.addEventListener("input", () => {
  clearTimeout(timeout);
  timeout = setTimeout(() => action(), 1000);
});
// Throttle (Limit Frequency)
let lastRun = 0;
element.addEventListener("mousemove", () => {
  const now = Date.now();
  if (now - lastRun > 1000) {  // Only run every 1 second
    action();
    lastRun = now;
  }
});
