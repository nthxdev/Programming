/*
Pass By "Call-by-Sharing" (A subset of Pass by Value):
- Primitives: Passed by exact value copy. Changing it inside does not affect the outside.
- Objects/Arrays: The *reference itself* is passed by value (a copy of the memory address).
  -> Mutating the object's properties inside the function mutates the original object on the Heap.
  -> Reassigning the parameter to a NEW object inside the function does NOT affect the outside variable.
*/
function modifyData(primVal: number, refObj: User): void { // void return type
    // Primitive: Local copy changed. Outside `primVal` is untouched.
    primVal = 999; 
    
    // Reference: Mutating the shared heap object. Outside `userObj` IS affected.
    refObj.age = 99; 
    
    // Reference: Reassigning the pointer. Outside `userObj` is NOT affected by this line.
    refObj = { name: "Bob", age: 10 }; 
}

// Primitives: pass by value
let primitiveVal = 10;
function modifyPrimitive(val: number): void {
    val = 999;
    console.log(`  Inside function: ${val}`);
}

console.log(`Before: ${primitiveVal}`);
modifyPrimitive(primitiveVal);
console.log(`After: ${primitiveVal} (unchanged)\n`);

// Objects: pass by call-by-sharing
interface DataObj {
    value: number;
}

let objVal: DataObj = { value: 10 };
function modifyObject(obj: DataObj): void {
    obj.value = 999;
    console.log(`  Inside function: ${obj.value}`);
}

console.log(`Before: ${objVal.value}`);
modifyObject(objVal);
console.log(`After: ${objVal.value} (changed!)\n`);


let outsideNum = 1;
const outsideObj: User = { name: "Eve", age: 20 };

modifyData(outsideNum, outsideObj);
// outsideNum is still 1.
// outsideObj is now { name: "Eve", age: 99 }.

// Pass by value (primitives)
function modify_value(x: number) {
    x = 100;                        // Only changes local copy
}
let value = 5;
modify_value(value);
console.log(value);                 // Still 5

// Pass by reference (objects/arrays)
function modify_array(arr: number[]) {
    arr.push(4);                    // Modifies original
}
let numbers = [1, 2, 3];
modify_array(numbers);
console.log(numbers);               // [1, 2, 3, 4]