// Map: A genuine key-value dictionary. Unlike standard JS objects,
//  keys can be of any type (including functions or object instances). 
// It preserves insertion order natively and uses deterministic hashing for $O(1)$ lookups.

let map = new Map();
// Key difference: Map keys can be any type. Objects only allow strings/symbols.
map.set("name", "John");        // string key
map.set(1, "one");              // number key
map.set(true, "yes");           // boolean key
map.set({}, "object key");      // object key!
map.set(() => {}, "function");  // function key!
console.log(map.get("name")); // "John"
console.log(map.get("age"));  // 25

// Preserves Insertion Order
// Insertion order = the order you added items
let insertionOrder = new Map();
insertionOrder.set("first", 1);
insertionOrder.set("second", 2);
insertionOrder.set("third", 3);

// Iterating returns them in order added:
for (let [key, value] of insertionOrder) {
  console.log(key, value);
}

// Map Idea Explained: it follows same idea as dictionary/object find key → get value
// Dictionary/object: need to search through keys → potentially O(n)
// Map: hashes the key → calculates where it should be → jumps there → average O(1)
// key → hash → bucket → value

// Hash: converts a key into a number that helps choose where to store/find it
// A hash function takes data of any size and produces a fixed-size number

// // Map remebers
// Hashing → finds WHERE the key is stored
// Ordering → remembers WHEN the key was inserted
// Even though the buckets may be scattered, Map separately remembers the insertion order

// Basic Map Methods
let mapMethods = new Map();
// Add
mapMethods.set("name", "John");
// Get
mapMethods.get("name"); // "John"
// Check if exists
mapMethods.has("name"); // true
mapMethods.has("age");  // false
// Delete
mapMethods.delete("name");
// Size
console.log(mapMethods.size); // number of items