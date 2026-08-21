// Regular Expressions (Regex)
// Regex = a pattern to match text against rules.
// Basic syntax:
const regex = /pattern/;
const isValid = regex.test("value");

// Test method returns:
// true = matches pattern
// false = doesn't match

// Simple examples:
// Lowercase letters only, 3-8 characters
const regex1 = /^[a-z]{3,8}$/;
console.log(regex1.test("hello"));   // true
console.log(regex1.test("HELLO"));   // false (uppercase)
console.log(regex1.test("hi"));      // false (too short)
// Letters and numbers, 3-20 characters
const regex2 = /^[A-Za-z0-9_]{3,20}$/;
console.log(regex2.test("harsh_123")); // true
console.log(regex2.test("ha"));        // false (too short)
console.log(regex2.test("harsh@123")); // false (@ not allowed)

// Email Validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;


// Basic validation
if (input.value.trim().length < 3) {
  error.textContent = "Too short";
}

// Regex validation
const regex = /pattern/;
if (!regex.test(input.value)) {
  error.textContent = "Invalid format";
}

// Email regex
// /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// Strong password regex
// /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/


// COMPLETE FROM VALIDATOR
const form = document.querySelector("form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");

const nameError = document.querySelector("#nameError");
const emailError = document.querySelector("#emailError");
const passwordError = document.querySelector("#passwordError");
const result = document.querySelector("#result");

// Regex patterns
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const passwordRegex = 
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

form.addEventListener("submit", (event) => {
  event.preventDefault();
  
  // Step 1: Clear old errors
  nameError.textContent = "";
  emailError.textContent = "";
  passwordError.textContent = "";
  result.textContent = "";
  
  // Step 2: Read values
  const nameIsValid = nameInput.value.trim().length >= 3;
  const emailIsValid = emailRegex.test(emailInput.value);
  const passwordIsValid = passwordRegex.test(passwordInput.value);
  
  // Step 3: Start with assuming valid
  let isValid = true;
  
  // Step 4: Show errors if invalid
  if (!nameIsValid) {
    nameError.textContent = "Name must be 3+ characters";
    isValid = false;
  }
  
  if (!emailIsValid) {
    emailError.textContent = "Enter a valid email";
    isValid = false;
  }
  
  if (!passwordIsValid) {
    passwordError.textContent = 
      "Password needs 8+ chars, uppercase, lowercase, number, special char";
    isValid = false;
  }
  
  // Step 5: Show success if all valid
  if (isValid) {
    result.textContent = "✓ Form submitted successfully!";
  }
});


