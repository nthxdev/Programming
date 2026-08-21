
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

// Inheritance
class GraduateStudent extends Student {
    major: string;

    constructor(name: string, age: number, studentId: string, major: string) {
        super(name, age, studentId);
        this.major = major;
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

