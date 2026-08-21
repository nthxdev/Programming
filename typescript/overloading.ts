// Overloading
function processInput(value: string): string;
function processInput(value: number): number;
function processInput(value: string | number): string | number {
    if (typeof value === 'string') {
        return value.toUpperCase();
    }
    return value * 2;
}