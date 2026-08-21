
// ==========================================
// Erorr Handling 
// ==========================================
/*
try/catch/finally — how it works:
When code throws an error, JS stops running that code right away and
looks UP the call stack for the nearest `try` block that can handle it.
- If it finds one: control jumps to that `catch` block.
- If it finds none: the program crashes (uncaught error).
try/catch/finally:
- `try` block runs code that might throw.
- `catch` block runs if an error is thrown. In TS 4.4+, the caught error
  is typed as `unknown` by default (not `any`), forcing type-narrowing before use.
- `finally` block ALWAYS runs, whether an error was thrown or not (cleanup logic).
`finally` always runs at the end, no matter what — even if `try` or
`catch` had a `return` or another `throw` inside. Good for cleanup
(closing files, closing connections, etc).
*/
try {
    // Code that might break goes here
} catch (error) {
    // This runs IF something breaks
    // error = information about what went wrong
}
// Error Object - gives you an error object with info about what went wrong
// error object has properties:
    // message — the error description (human-readable)
    // name — the error type (like "Error", "TypeError", "ReferenceError")
    // stack — the full trace of where the error happened (for debugging)
try {
    throw new Error("Something failed");
} catch (error) {
    // In modern TS, `error` is typed as `unknown`, not `any`.
    // So you must check its type before touching .message by checking is error instanceof Error
    if (error instanceof Error) {
        console.log(`Caught: ${error.message}`);
    } else {
        console.log(`Caught something that isn't an Error: ${error}`);
    }
} finally {
    console.log("This runs no matter what happened above");
}
// You could throw literally anything:
// throw "A string";
// throw 42;
// throw { custom: "object" };


// Built-in error types
/*
JS already gives you several error types, all built on top of Error:
- ReferenceError -> using a variable that doesn't exist / isn't in scope
- TypeError       -> calling something that isn't a function, or reading a property on undefined/null
- SyntaxError     -> broken syntax (JSON.parse can throw this at runtime)
- RangeError      -> a number is outside the allowed range
*/
// Example: ReferenceError (accessing a variable that's out of scope)
try {
    // @ts-ignore - forcing TS to let this run so we can see the real error
    console.log(notDefinedAnywhere);
} catch (error) {
    if (error instanceof ReferenceError) {
        console.log(`ReferenceError caught: ${error.message}`);
    }
}
// Example: TypeError (reading a property on undefined)
interface UserProfile {
    // ? means optional - may or may not exists
    profile?: {
        name?: string;
    };
}
let maybeUser: UserProfile | undefined;

try {
    // @ts-ignore - this will throw because maybeUser is undefined
    console.log(maybeUser.profile.name);
} catch (error) {
    if (error instanceof TypeError) {
        console.log(`TypeError caught: ${error.message}`);
    }
}
// Safer way to avoid that TypeError in the first place:
// optional chaining (?.) + nullish coalescing (??)
// Safely returns undefined if anything is missing + Provide a fallback
console.log(maybeUser?.profile?.name ?? "Default Name"); // no crash


// Custom Error classes (extending built-in Error)
// Making your own error types
// Extending Error lets you throw specific, recognizable error types, and check for them later with `instanceof`.
// Useful for distinguishing error types via `instanceof` checks.
class ValidationError extends Error {
    field: string;
    
    constructor(message: string, field: string) {
        super(message);                  // send message up to Error base class
        this.name = "ValidationError";   // Overrides default "Error" name shows up instead of plain "Error" 
        this.field = field;
        // Required for proper prototype chain when extending built-ins in TS
        Object.setPrototypeOf(this, ValidationError.prototype); // needed in TS
    }
}

function validateAge(age: number): void {
    if (age < 0) {
        throw new ValidationError("Age cannot be negative", "age");
    }
}

try {
    validateAge(-5);
} catch (error) {
    if (error instanceof ValidationError) {
        console.log(`ValidationError on '${error.field}': ${error.message}`);
    } else if (error instanceof Error) {
        console.log(`Some other error: ${error.message}`);
    }
}


// Re-throwing an error to an outer catch
// Nested try/catch: inner catch can re-throw to an outer handler
function parseJsonSafely(data: string): number {
    try {
        const parsed = JSON.parse(data); // may throw SyntaxError
        return parsed.value;
    } catch (error) {
        console.log("Couldn't parse, sending error upward...");
        throw error; // propagate to caller's try/catch let the caller deal with it
    }
}
try {
    parseJsonSafely("{ Invalid json");
} catch (error) {
    if (error instanceof SyntaxError) {
        console.log(`SyntaxError caught outside: ${error.message}`);
    }
}
// finally can override everything (be careful!)
// If finally has its own return/throw, it wins — it silences whatever
// happened in try or catch. Usually you want to AVOID doing this.
function overrideExample(): string {
    try {
        throw new Error("Original error");
    } catch (error) {
        return "Returned from catch";
    } finally {
        return "Returned from finally"; // this wins, error is hidden
    }
}
console.log(overrideExample()); // "Returned from finally"


// try/catch with async/await
/*
IMPORTANT: try/catch only works on SYNCHRONOUS code by default.
It can NOT catch errors thrown inside setTimeout or other async
callbacks unless you use async/await, because await makes the
async code behave like synchronous code for error-catching purposes.
*/

// This does NOT work as expected — catch never runs:
// try {
//     setTimeout(() => { throw new Error("Too late!"); }, 100);
// } catch (error) {
//     console.log("This will NEVER run");
// }

// This DOES work — await lets try/catch see the async error:
async function fetchDataSafely(shouldFail: boolean): Promise<string> {
    try {
        if (shouldFail) {
            throw new Error("Async operation failed");
        }
        return "Data fetched";
    } catch (error) {
        if (error instanceof Error) {
            console.log(`Async catch: ${error.message}`);
        }
        return "Fallback value";
    }
}

// A reusable "safe runner" pattern
// Wrap any function call so errors are handled in one place instead
// of repeating try/catch everywhere.
function executeSafely(fn: () => void): void {
    try {
        fn();
    } catch (error: any) {
        console.log(`[${error.name}]: ${error.message}`);
    }
}

executeSafely(() => {
    throw new TypeError("Example forced error");
});
