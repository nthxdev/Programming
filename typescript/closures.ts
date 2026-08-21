// Closure
function counterClosure() {
    let count = 0;
    return function() {
        return ++count;
    };
}
const inc = counterClosure();
console.log(inc());                 // 1
console.log(inc());                 // 2

