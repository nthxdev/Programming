// export function sayHi(name: string){
let username;
function sayHi(name) {
    return `Hello ${name}`;
}
function user(name) {
    username = name;
}
function defaultFuncton() {
    console.log("deafult export function");
}
export default defaultFuncton;
export { sayHi, username, user };
