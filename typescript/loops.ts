
// ==========================================
// LOOPS
// ==========================================
let counter: number = 0;

// While loop
while (counter < 3) {
    counter++;
}

// Do-While loop (executes at least once)
do {
    counter--;
} while (counter > 0);

// Standard For loop
for (let i = 0; i < 3; i++) {
    if (i === 1) continue; // Skip to next iteration
    if (i === 2) break;    // Exit loop entirely
}

// For-Of (iterates over values) 
// (Iterates over iterables: Arrays, Strings, Maps, Sets. Yields VALUES)
for (const val of arrNum) {
    // val is 10, then 20, then 30
}

// For-In (iterates over keys/indexes) 
// (Iterates over enumerable properties of objects. Yields KEYS/INDEXES)
// Note: Usually avoided for Arrays because it yields string indices ("0", "1").
for (const key in userObj) {
    // key is "name", then "age"
}