// TypedArrays: Contiguous, fixed-size, raw binary buffers optimized for high-performance graphics and network manipulation. 
// They consist of a backing raw memory allocation (ArrayBuffer) viewed through specific data lenses:
// Int8Array, Uint8Array, Uint8ClampedArray (clamps values between 0-255).
// Int16Array, Uint16Array, Int32Array, Uint32Array.
// Float32Array, Float64Array, BigInt64Array, BigUint64Array

// TypedArrays = fixed-size containers for raw binary data (optimized for speed).
// Normal arrays: can grow/shrink, hold any type
// TypedArrays: fixed size, one specific type, raw bytes

// ArrayBuffer
let buffer = new ArrayBuffer(16);  // 16 bytes of empty memory
// just raw bytes cant use it directly

// Data Lenses(Views)
let view = new Int32Array(buffer);  // view as 32-bit integers
// now can work with it 
view[0] = 42;
console.log(view[0]); // 42

// Other Views
// Int8Array -> Signed 8-bit integers -> -128 to 127
// Uint8Array -> Unsigned 8-bit integers -> 0 to 255
// Uint8ClampedArray -> 0-255 (clamps overflow) -> Values capped at 0-255 -> If value is outside the range, it returns the closest boundary:
// Int16Array -> Signed 16-bit integers -> -32,768 to 32,767
// Uint16Array -> Unsigned 16-bit integers -> 0 to 65,535
// Int32Array -> Signed 32-bit integers -> Large range
// Uint32Array -> Unsigned 32-bit integers, Large range
// Float32Array -> 32-bit decimals -> -3.4e38 to 3.4e38
// Float64Array -> 64-bit decimals -> More precision
// BigInt64Array -> 64-bit big integers -> Huge integers
// BigUint64Array -> Unsigned big integers -> Huge positive integers