
// Basic validation
// input/error are illustrative placeholders for real DOM elements
// querySelector() returns HTMLElement | null
const input = document.querySelector<HTMLInputElement>("#input");
const error = document.querySelector<HTMLElement>("#error");
if (input && error) {
  if (input.value.trim().length < 3) {
    error.textContent = "Too short";
  }
  // Regex validation
  const regex: RegExp = /pattern/;

  if (!regex.test(input.value)) {
    error.textContent = "Invalid format";
  }
}

// Email regex
// /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// Strong password regex
// /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/

// COMPLETE FORM VALIDATOR
{
  const form = document.querySelector("form") as HTMLFormElement | null;
  const nameInput = document.querySelector("#name") as HTMLInputElement | null;
  const emailInput = document.querySelector(
    "#email",
  ) as HTMLInputElement | null;
  const passwordInput = document.querySelector(
    "#password",
  ) as HTMLInputElement | null;

  const nameError = document.querySelector("#nameError") as HTMLElement | null;
  const emailError = document.querySelector(
    "#emailError",
  ) as HTMLElement | null;
  const passwordError = document.querySelector(
    "#passwordError",
  ) as HTMLElement | null;
  const result = document.querySelector("#result") as HTMLElement | null;

  // Regex patterns
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const passwordRegex: RegExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

  if (
    form &&
    nameInput &&
    emailInput &&
    passwordInput &&
    nameError &&
    emailError &&
    passwordError &&
    result
  ) {
    form.addEventListener("submit", (event: SubmitEvent) => {
      event.preventDefault();

      // Step 1: Clear old errors
      nameError.textContent = "";
      emailError.textContent = "";
      passwordError.textContent = "";
      result.textContent = "";

      // Step 2: Read values
      const nameIsValid: boolean = nameInput.value.trim().length >= 3;
      const emailIsValid: boolean = emailRegex.test(emailInput.value);
      const passwordIsValid: boolean = passwordRegex.test(passwordInput.value);

      // Step 3: Start with assuming valid
      let isValid: boolean = true;

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
  } else {
    console.error("One or more form elements were not found in the DOM.");
  }
}
