
// Object & classes
// Object literal
const person = {
    name: "Alice",
    age: 25,
    greet: function() {
        return `Hello, I'm ${this.name}`;
    }
};

// Constructor function (old way)
// function PersonOld(name:number, age:number) {
//     this.name = name;
//     this.age = age;
// }

// Class (modern)
class Student {
    name: string;
    age: number;
    studentId: string;
    // A function that creates objects using the `new` keyword.
    constructor(name: string, age: number, studentId: string) {
        this.name = name;
        this.age = age;
        this.studentId = studentId;
    }
    
    study() {
        return `${this.name} is studying`;
    }
    
    getInfo() {
        return `${this.name} (${this.age})`;
    }
}

const student = new Student("Bob", 20, "S123");
console.log(student.study());       // Bob is studying
console.log(student.getInfo());     // Bob (20)

// // new keyword
// 1. Creates empty object: {}
// 2. Connects this to that object
// 3. Connects object to constructor's prototype
// 4. Returns the object automatically


// Instance Methods in Constructor
class CreatePencil {
  name: string;
  price: number;
  color: string;
  company: string;

  constructor(name: string, price: number, color: string, company: string) {
    this.name = name;
    this.price = price;
    this.color = color;
    this.company = company;
  }

  write(text: string): void {
    const heading = document.createElement("h1");
    heading.textContent = text;
    //  Each instance gets its own copy of the method
    heading.style.color = this.color; // Uses instance color
    document.body.appendChild(heading);
  }
}
const p1 = new CreatePencil("Nataraj", 10, "black", "Nataraj");
const p2 = new CreatePencil("Doms", 15, "red", "Doms");
CreatePencil.prototype.profession : string = "developer"
// Prototype Shared Space
// Every constructor function has a `prototype` object
// CreatePencil.prototype
// Instances can access properties and methods from it
console.log(CreatePencil.prototype.company) // undefined
// object = CreatePencil.prototype
console.log(p1.company)
// Check own property
console.log(p1.hasOwnProperty("name"));    
// Same way Shared Methods on Prototype

// Inheritance
class GraduateStudent extends Student {
    major: string;

    constructor(name: string, age: number, studentId: string, major: string) {
        super(name, age, studentId); // Child constructor MUST call `super()`
        this.major = major;
    show(){
        super.study();  // Use `super.method()` to call parent's method
    }
    }
    research() {
        return `${this.name} researches ${this.major}`;
    }
}

// Interface
// Interface
interface PersonInterface {
    name: string;
    age: number;
    greet(): string;
}

// Implementing interface
class Person implements PersonInterface {
    name: string;
    age: number;
    
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    
    greet(): string {
        return `Hello, I'm ${this.name}`;
    }
}

// Abstract class
abstract class Animal {
    abstract makeSound(): void;
    
    move(): void {
        console.log("Moving");
    }
}

class Dog extends Animal {
    makeSound(): void {
        console.log("Woof!");
    }
}

// method overriding  - Child can override parent's method
// `instanceof` - Check Instance Type
// Prototypal Inheritance with Object.create() - Create objects that inherit from other objects
// use spred to Copy properties
// poperty shadowing
// prototype chain lookup 
// constructor connection
// Prototypal inheritance