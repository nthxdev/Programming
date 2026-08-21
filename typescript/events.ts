element1.addEventListener("eventName", function (e) {
  // What to do when event happens
});


// click -> Single click
// dblclick -> Double click
// input -> Text typed/deleted/pasted in input
// change -> Dropdown/checkbox/file input changed
// submit -> Form submitted
// keydown -> Key pressed -> key.up
// keyup -> Key released
// mouseover -> Mouse enters element
// mouseout -> Mouse leaves element
// mousemove -> Mouse moves
// focus -> 


// Event object - When an event happens, browser automatically passes an object with event details:
element2.addEventListener("click", function (e) {
  console.log(e);  // e is the event object
});
// e.target -> The element where event happened
// e.type -> Event name (e.g., "click")
// e.key -> Keyboard key pressed
// e.clientX -> Mouse horizontal position
// e.clientY -> Mouse vertical position

// Input event
// e.data = only the character just typed
// e.target.value = entire input text (use this most often)
const form = document.querySelector("form");
const inputs = document.querySelectorAll("input");
form.addEventListener("submit", function (e) {
    e.preventDefault();  // Stop browser from refreshing page
    // Now access form inputs and process data
    console.log(inputs[0].value);  // Get value from first input
    console.log(inputs[1].value);  // Get value from second input
});
// preventDefault() = Stop browser's default behavior

// can use anonymous function but removing a listener requires that original functionn same memory reference 
function handleClick() {
  console.log("Clicked");
}
// Add listener
button.addEventListener("click", handleClick);
// Remove listener
button.removeEventListener("click", handleClick);
// Important: When passing a named function, DON'T add parentheses:
button.addEventListener("click", handleClick);   // ✓ Correct
button.addEventListener("click", handleClick()); // ✗ Wrong - runs immediately


// mouse
mouse.addEventListener("mousemove", function (e) {
  console.log(e.clientX, e.clientY);  // Track mouse position
});

// Move element with mouse
// window.addEventListener("mousemove", function (e) {
//   image.style.left = e.clientX + "px";
//   image.style.top = e.clientY + "px";
// });
// (Element needs position: absolute; in CSS)


// Event Bubbling
// When you click a child element, the event travels UP to parent elements:

// child.addEventListener("click", function (e) {
//   e.stopPropagation();  // Event won't go to parent
// });

// Event Delegation (Smart Pattern)
// Instead of adding listeners to many elements, add ONE listener to parent

// const list = document.querySelector("ul");
// list.addEventListener("click", function (e) {
//   if (e.target.tagName === "LI") {
//     e.target.style.textDecoration = "line-through";
//   }
// });

// Accessing Element Inside Listener
// using this:
button.addEventListener("click", function() {
  console.log(this);  // this = the button element
  this.style.color = "red";
});

// Note: Arrow functions don't have their own this. Use regular functions if you need this
// Won't work with arrow function
button.addEventListener("click", () => {
  console.log(this);  // this = global object, not button
});
// Better way - use event object:
button.addEventListener("click", (e) => {
  console.log(e.target);  // e.target = the button
  e.target.style.color = "red";
});

// Event Object Properties (Commonly Used)
element.addEventListener("click", (e) => {
  e.target           // Element that triggered event
  e.type             // Event name ("click", "input", etc.)
  e.key              // Which key pressed (for keyboard events)
  e.clientX          // Mouse X position
  e.clientY          // Mouse Y position
  e.preventDefault() // Stop browser's default action
  e.stopPropagation()// Stop event from bubbling up
});