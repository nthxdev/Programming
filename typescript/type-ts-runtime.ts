// JS Runtime (Structural)
//1. object (Standard)
// Key-value hash maps. Keys are strings or symbols; values are pointers to other heap entities. V8 optimizes these using Hidden Classes (Shapes).
const objType: object = {
  name: "Pengu",
  age: 20,
};
console.log(objType);

// 2. Function
// Executable callable objects. First-class citizens that close over their lexical scopes (Closures).
const funType = (name: string): string => {
  return `Hello ${name}`;
};
console.log(funType("Pengu"));