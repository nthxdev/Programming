// Treat this file as an ES module
// export {};

// Common JS way
// declare const require: any;
// const readline = require('node:readline');
// const process = require('node:process');
// ESmodules way
// Namespace import: Imports the entire module as an object
import {sayHi as Hello, username} from './export/export';
import { user } from './export/export';
import defaultFun from "./export/export";
console.log(Hello("Pengu"))
console.log(user("nthxdev"))
console.log(username)
import './export/export';
defaultFun();
/*
Entry point (Node.js)
if (require.main === module) {
    console.log(add(5, 3));
}
*/
