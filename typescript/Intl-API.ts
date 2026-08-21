
const intlValue: number = 42;
// Intl API (internationalization)
const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
}).format(intlValue);
console.log(formatted);                    // "42.00"

