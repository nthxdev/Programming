// ==========================================
// FORMATTING
// ==========================================
// 1. Template Literals (Backticks). Replaces printf. Supports multiline and interpolation.
let formattedStr: string = `User ${userObj.name} is ${userObj.age} years old.`;

// 2. Number Formatting (Decimal places) -> Returns a string!
let price: number = 19.9934;
let formattedPrice: string = price.toFixed(2); // "19.99"
console.log(`toFixed(2): ${price.toFixed(2)}`);

// 3. Internationalization API (Commas, Currency)
let population: number = 1500000;
let localePop: string = new Intl.NumberFormat('en-US').format(population); // "1,500,000"
console.log(`Locale formatting: ${localePop}`);

// 4. String Padding
let padded: string = "5".padStart(3, '0'); // "005"
console.log(`Padded: ${padded}\n`);