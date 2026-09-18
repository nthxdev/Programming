// export function sayHi(name: string){
let username: string;
function sayHi(name: string){
    return `Hello ${name}`;
}
function user(name: string){
    username = name;
}
function defaultFuncton(){
    console.log("deafult export function")
}
export default defaultFuncton;
export { sayHi, username, user };

