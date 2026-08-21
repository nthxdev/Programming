// Form Validation?
// Checking if user data is correct before submitting the form
// Basic Flow: 
// 1. Listen for form submit
// 2. Stop default submission
// 3. Read input values
// 4. Check each rule
// 5. Show errors or success

const nameInput = document.querySelector("#name");
const nameError = document.querySelector("#nameError");
const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (nameInput.value.trim().length <= 2) {
    nameError.style.display = "block";  // Show error
  } else {
    nameError.style.display = "none";   // Hide error
  }
});

// HTML Built-in Validation Attributes
// Browser can validate without JavaScript:
// <!-- Required field -->
// <input type="text" required>

// <!-- Minimum length -->
// <input type="text" minlength="3">

// <!-- Maximum length -->
// <input type="text" maxlength="10">

// <!-- Email format -->
// <input type="email" required>

// <!-- Number range -->
// <input type="number" min="18" max="60">

// Problem: User can remove these attributes using DevTools.
// Solution: Use JavaScript validation on backend.

