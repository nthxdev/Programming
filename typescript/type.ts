// Type assertions (tell TypeScript what type it is)
let valueAny: any = "123";
let num: number = parseInt(valueAny);

// Type assertion syntax
const strAny: any = "hello";
let length: number = (strAny as string).length;

// or using angle brackets
let length2: number = (<string>strAny).length;

// Safely check types
function processValue(value: unknown): number {
    if (typeof value === 'number') {
        return value;
    }
    if (typeof value === 'string') {
        return parseInt(value);
    }
    throw new Error('Invalid type');
}

