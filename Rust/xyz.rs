use std::io::{self, Write};


// Function declarations
fn demonstrate_move(s: String);
fn demonstrate_borrow(s: &String);
fn demonstrate_borrow_mut(s: &mut String);
fn add_numbers(a: i32, b: i32) -> i32;
fn sum_all(numbers: &[i32]) -> i32;

const PI: f64 = 3.14159265358979323846;
const MAX_BUFFER: u32 = 1024;

fn main() {
    println!("Hello World");

// ==========================================
// 1. BASIC VARIABLES & CONSTANTS
// ==========================================
/*
Declared using `let`
Variables in Rust are IMMUTABLE by default for thread safety and memory safety.
*/
    let x = 5; // Immutable variable
    // x = 6; // ERROR: cannot assign twice to immutable variable

    let mut y = 10; // MUTABLE variable (explicitly opted-in using `mut`)
    y = 15; 
/*
Unused variables: Compiler warns to suppress this warning
*/
    // Method 1: Prefix the variable name with '_'
        let _ = 20; // discard pattern and does not create a usable variable
    // Method 2: Allow unused variables through an attribute :
        #![allow(unused_variables)] // - second method suppresses unused-variable warnings across this crate

    // Scope: region of code in which a variable is available
    // In Rust, curly braces {} define blocks, and blocks create scopes

/*
Shadowing:
You can redeclare a variable with the same name. This destroys the previous 
variable and creates a new one, allowing type changes without needing `mut`.
`mut` must be specified again when the new binding must be mutable
*/
    // Shadowing (rebind with potentially different type)
    let shadowed = "text";
    let shadowed = shadowed.len(); // Changed from &str to usize

/*
Constants and Stastics:
`const`: Always immutable. Evaluated at compile time. Inlined where used. Must have explicit type.
`static`: Similar to const, but has a fixed memory address (lives for the entire program).
*/
    const MAX_SPEED: u32 = 100_000;
    static GLOBAL_COUNTER: i32 = 0;

    // Destructing assignment (tuple unpacking):
    // extracts individual values from a compound data structure and binds them to separate names
    // e,g -> 
        let data = (1, 2); let (x, y) = (1, 2); 
    // OR mut -> 
        let (mut x, y) = (1, 2); Only x is mutable here
    // Ignore values -> 
        let (x, _) = (3, 4); OR let (x, .., z) = (1, 2, 3, 4);

// ==========================================
// 2. PRIMITIVES (Scalar & Compound)
// ==========================================

/*
Primitives in Rust have fixed, known sizes at compile time and are pushed onto the Stack.
Integers:
Signed (i)   : i8, i16, i32 (default), i64, i128, isize (architecture-dependent pointer size)
Unsigned (u) : u8, u16, u32, u64, u128, usize (used for indexing)
*/
    // the general formula:- 
    // number of combination = 2^n where n = number of bits
    // e.g- n = 8, 2^8 = 256, so range is 0 to 255 for u8, -128 to 127 for i8, etc.
    let var_u8: u8 = 255; 
    let var_i32: i32 = 2_147_483_647; // Underscores for readability

/*  
Number System:
Decimal - 0 1 2 3 4 5 6 7 8 9 (Base 10)
*/
    // \[42\]
    // Therefore:
    //     \[42 = 4 \times 10^1 + 2 \times 10^0\]
    //     \[42 = 40 + 2\]
    // Position:   Hundreds   Tens   Ones
    // Power:       10²       10¹     10⁰
    // Value:       100        10      1
    // The general rule is: 
    //     \[N = \sum_{k=0}^{m} d_k \times b^k\]
    //     Where:
    //     - \(N\) = represented number.
    //     - \(d_k\) = digit at position \(k\).
    //     - \(b\) = number system base.
    //     - \(k\) = position, starting at zero.

/*
Binary Number System 0 1 (Base 2)
*/
    // Position:   2⁵   2⁴   2³   2²   2¹   2⁰
    // Value:       32   16    8    4    2    1
    // Write multiple the positional digit with the value, in short neglect the 0 positional digits
    // for \[42\]: 
    //     \[101010_2\]
    //     \[1(32)+0(16)+1(8)+0(4)+1(2)+0(1)\]
    //     \[32+8+2\]
    //     \[42\]

/*
Two's Complement — representing negative integers
*/
    //     for 8 bits \[42\]: 
    //         \[00101010_2\]
    //     Invert the bits `0 → 1, 1 → 0` 
    //         \[11010101_2\]
    //     Add 1 to it
    //         \[11010110_2\]
    // for 8 bit signed integer - -128 to 127, 42 is represented as `00101010_2` and -42 as `11010110_2`.
    // MSB(Most significatn bit) has negative significance in two's compliments
    // Why Range Asymmetric ?

/*
CPU Words `usize` & `isize` - use for indexing collection represent sizes & offsets
*/
    // Instructor introduce the concept of a word, word is the processor's native data-size unit
    // Architecture        Word size
    //     32-bit	    32 bits / 4 bytes
    //     64-bit	    64 bits / 8 bytes
    // sizes depend on the compilation target
        // - usize: unsigned, pointer-sized integer
        // - isize: signed, pointer-sized integer

/*
Floating-Point:
f32 (single precision), f64 (double precision - default)
IEEE-754 standard.
*/
    let var_f32: f32 = 3.14f32; // Explicit suffix
    let var_f64 = 3.141592653589793; // Inferred as f64

/*
Boolean: 1 byte
*/
    let var_bool: bool = true;

/*
Character: 4 bytes
Represents a Unicode Scalar Value (supports emojis, CJK, etc., not just ASCII). Use single quotes.
*/
    use std::mem::size_of_val;
    let var_char: char = '🦀';
    println!("{}", size_of_val(&var_char)); // 4 bytes
    // ==========================================================
    // A useful precision: char represents Unicode scalar values, 
    // not necessarily complete visual characters. 
    // Some displayed characters contain multiple Unicode scalar values.
    // ==========================================================

/*
Unit() - represent absence of meaningful value, represented by `()`
exactly one possible value, occupies zero bytes, default function return type that do not return value
*/
    let unit_type = ();
    // verify size of unit type
        use std::mem::size_of;
        println!("{}", size_of::<()>()); // 0
    // Remember: Unit is an actual type, not simply the absence of a type.

/*
Compound Types: Tuples and Arrays (Stack allocated)
*/
    // Tuple: Fixed length, mixed types.
    let var_tuple: (i32, f64, char) = (500, 6.4, 'A');
    let tuple_val = var_tuple.1; // Access via dot notation

    // Array: Fixed length, single type.
    let var_arr: [i32; 4] = [10, 20, 30, 40];
    let arr_init = [0; 100]; // Array of 100 zeros

    println!("Primitives - u8: {}, i32: {}, f32: {}, f64: {}, bool: {}, char: {}", var_u8, var_i32, var_f32, var_f64, var_bool, var_char);
    println!("Tuple: {:?}, value at index 1: {}", var_tuple, tuple_val);
    println!("Array: {:?}, initialized array length: {}\n", var_arr, arr_init.len());

/*
Type Infrence & Explicit Conversion:
*/
    // Rust does not automatically convert between different numeric types this fails:
        let x: i32 = 10;
        let y: u32 = x;
    // Even though both contain the number 10, their types differ use as:
        let x: i32 = 10;
        let y: u32 = x as u32;
    // You can also annotate a numeric literal directly:
        let x = 38u8;
        let y: u16 = x as u16;
    // Be careful with narrowing casts:
        let x: u16 = 300;
        let y: u8 = x as u8;    
    // The result is 44, because the value does not fit into u8

/*
Checking types & Maximum values:
*/
        println!("Type of var_u8: {}, Max u8: {}", std::any::type_name::<u8>(), u8::MAX);
    // use helper function called `type_of` to return type name. not a standard Rust function
    // Get a maximum value: Rust Provides `MAX` associated constants
        println!("{}", i8::MAX);  // 127
        println!("{}", u8::MAX);  // 255
        println!("{}", i8::MIN); // -128
    // Integer overflow & checked_add
        let x: u8 = 251;
        let y = x + 8;
    // Mathematically - 251 + 8 = 259. but max is 255, this cause integer overflow 
    // Rust offers checked Arithmetic
        let x: u8 = 251;
        let result = x.checked_add(8);
        println!("{:?}", result); // None
    // checked_add() returns an Option: None when overflow occurs, Some(result) when successful. This allows safe handling of potential overflows without panicking.
        let result = 10u8.checked_add(5);
        assert_eq!(result, Some(15));
    // OR
        let result = x.checked_add(8).unwrap();
    // Be Careful: `.unwrap()` panics when the result is None

/*
Differet Number Representsation:
*/
    // Rust supports several integer literal formats
    // Decimal	        None	        2024
    // Hexadecimal	     0x	            0xff
    // Octal	         0o	            0o77
    // Binary	         0b	           0b11111111
        fn main() {
            let a = 255;
            let b = 0xff;
            let c = 0o377;
            let d = 0b11111111;
            assert_eq!(a, b);
            assert_eq!(b, c);
            assert_eq!(c, d);
        }
    // Underscores improve readability: they do not change value
        let x = 1_000_000;
/*
Floating point precision: f32 (single precision) and f64 (double precision)
*/
        let x = 0.1f64 + 0.2f64;
        println!("{}", x);
    // result not exactly 0.3 due to floating-point precision limitations
    // computer can't represent every decimal fraction they have finite prcession so some numbers are approximated
    // for safe comparisons Use :
        assert!((x - 0.3).abs() < f64::EPSILON);
    // for tolerance use:
        let x = 0.1f64 + 0.2f64;
        assert!((x - 0.3).abs() < 0.000001);

/*
Ranges - sequennce of values rust has two common range operatoions:
*/
    // .. excludes the ending value
    // ..= includes it
        1..5 // 1,2,3,4
        1..=5 // 1,2,3,4,5
    // using with loops:
        for i in 1..5 {
            println!("{}", i);
        }
    // Character ranges:
        for c in 'a'..='z' {
            print!("{}", c); // abcdefghijklmnopqrstuvwxyz
        }

/*
Range Types:
*/
    // Rust provides these types in std::ops:
        use std::ops::{Range, RangeInclusive};
    // e.g:
        let a: Range<i32> = 1..5;
        let b: RangeInclusive<i32> = 1..=5;

/*
Character & ASCII:
*/
    // Characters are stored using numerical representation
    // 'A' = 65, 'B' = 66, ..., 'Z' = 90
    // 'a' = 97, 'b' = 98, ..., 'z' = 122
    // Rust can convert an ASCII character to its numerical value:
            for c in 'a'..='z' {
            println!("{}", c as u8);
        }
// Important distinction: Rust's char supports Unicode scalar values, not only ASCII characters. 
// The example works because lowercase English letters belong to ASCII.


/*
Statement vs expression:
*/
    // - statement performs an action -> let x = 10;
    // - expression procduces a value -> 10 + 20
    //     The semicolon rule:
    //         In Rust, a semicolon at the end of an expression discards its resulting value.
        // Compare:
                let a = {
                    10 + 20 // Here a receives 30
                };
        // But: 
                let b = {
                    10 + 20; // Here b receives ()
                };

    // =====================================================
    // Important detail: Assignments in Rust evaluate to ().
    // ====================================================

assert_eq! checks whether two values are equal. If not, the program panic
assert_eq!(x, 3); // Checks: x == 3
assert_eq!(y, 4); // Checks: y == 4
assert! checks whether a condition is true. If false, the program panics
assert!(5 > 3);  // Passes
assert!(5 < 3);  // Panics

/*
Rust's memory model
- Ownership: Every value has one owner; memory is freed automatically when the owner goes out of scope.
- Stack: Fast storage for fixed-size values.
- Heap: Dynamic storage for values whose size isn't known at compile time (e.g. String, Vec).
- References (&, &mut): Borrow data without taking ownership.
*/

// ==========================================
// 3. REFERENCE TYPES & HEAP ALLOCATION
// ==========================================

/*
String - Owns contents, mutable binding, heap storage
*/
    // String is Heap-allocated, dynamic, UTF-8 encoded.
    // The Stack holds the pointer, length, and capacity. The Heap holds the characters.
        let mut heap_string = String::from("Hello World"); 
        println!("Stack int: {}", x);

// `&str` - Borrows Contents, through this reference, (String Slice) is a reference to string data. It is an immutable view. 
    // This points to a hardcoded string literal embedded in the binary (static memory).
        let stack_str: &str = "World"; // it's actual type is -> &'static str
        // Meaning:
        //     - &str: borrowed string slice
        //     - 'static: the referenced data remains valid for the entire program
        // Or
        let heap_string_part: &str = &s[0..5];


// String Slices: [start..end-1]
    // A string slice contains:
    //     - Pointer to the first byte
    //     - Length of the slice in bytes
    // Notes: It does not own the underlying string
    let s = "é";
    let part = &s[0..1];  // Indices(`..`) represent bytes, not character positions
        // This can panic, The character é occupies two bytes in UTF-8. Index 1 is not a valid character boundary
    // Important: Rust string indexing uses UTF-8 byte offsets, not character positions. 
    // A slice must begin and end on valid UTF-8 character boundaries.


// `str`:
//     it is a dynamically sized type, its size is not known without knowing the actual string length
//     Rust normally needs a pointer or another owning container to work with an unsized type
    let s: &str = "Hello";
    let s_box: Box<str> = String::from("Box String").into_boxed_str();
// convert `&str` into String:
    // All three produce an owned String
        let a = s.to_string();
        let b = String::from(s);
        let c = s.to_owned();
// Reverse string to `&str`
    let to_rev_s = String::from("Hello");
    // Both produce a borrowed string slice
        let rev_a: &str = &to_rev_s;
        let rev_b: &str = to_rev_s.as_str();


// String Operation:
    s.push_str(" World"); // Accepts - &str
    s.push('!'); // Accepts - char
    s.replace("dogs", "cats");
    // modify a String in place replace range
    let mut s = String::from("I like dogs");
    s.replace_range(7..11, "cats");

// String concatenation:
//  using `+`
//      - Rust's `+` operator for String expects:
//      - cannot directly concatenate two owned String values using + without accounting for the expected types
        // The addition operator for String works conceptually with this signature    
        fn add(self, rhs: &str) -> String
        // This means:
        //     - self → Takes ownership of the first String
        //     - rhs: &str → Borrows the second string. Does not take ownership
        //     - -> String → Returns the concatenated String
        let s1 = String::from("Hello ");
        let s2 = String::from("World");
        // for s1 Ownership is moved, s1 cannot be used anymore 
        // for s2.as_str() Borrows s2 as &str
        let s3 = s1 + s2.as_str(); 

// String Escape sequences: special character or bytes inside string literals
    let s = "\x72\x75\x73\x74"; // Rust
    // \n - newline
    // \t - tab
    // \\ - backslash
    // /" - double quotes
    // \xNN - ASCII bytes
    // \u{NNN} - Unicode scalar value
// Raw strings: do not process ordinary escape characters
    let s = r"\x72"; // \x72

// String indexing and UTF-8:
    // Rust does not allow direct string indexing, they uses UTF-8 encoding
    // A character can occupy different numbers of bytes, cannot assume one character equals one byte
        // e.g -> A(1 byte), é(2 bytes), 中(3 bytes), 🔥(4 bytes)

// Iterating over strings:
    for c in s.chars() {
        println!("{}", c);
    }
// For raw bytes:
    for b in s.bytes() {
        println!("{}", b);
    }

/*
Borrowing  (immutable reference)
*/
    let ref_to_string: &String = &heap_string; // Immutable borrow (&)
    println!("Borrowed reference: {}", ref_to_string);
    let ref_mut_string: &mut String = &mut heap_string; // Mutable borrow (&mut)
    ref_mut_string.push_str(" Rust");  
    println!("After mutable borrow: {}\n", heap_string);

/*
Arrays: [ Element type ; Number of elements ]
*/
    // fixed-size collection of elements of the same type
        let num_arr = [10, 20, 30]; // type -> [i32; 3]
    // Array Indexing
        num_arr[index]
    // Array Length:
        num_arr.len()
    // Repeating a value:
        let arr = [1; 100]; // 100 copies of 1
    // Array Memory size:
        use std::mem::size_of_val;
        let arr = ['A', 'B', 'C'];
        println!("{}", size_of_val(&arr));
    // Accessing invalid indices:
        let arr = [10, 20];
        println!("{}", arr[5]); // This panics because index 5 does not exist
        // A safer alternative is .get():
            let arr = [10, 20];
            let value = arr.get(5);
            println!("{:?}", value);
        

/*  
Vectors (Dynamic arrays on the Heap)
*/
    let mut var_vec: Vec<i32> = vec![1, 2, 3];
    var_vec.push(4);

/*
Slice - &collection[start..end]
- &data[a..b]  // a to b-1
- &data[..b]   // beginning to b-1
- &data[a..]   // a to end
- &data[..]    // entire collection
- &data[a..=b] // a to b (inclusive)

Mutable slice:
- &mut data[a..b]
*/
    // A slice is a borrowed view into a contiguous sequence of elements
    // it do not own the underlying collection
    // It can refer to part or all of an array, vector or string
    let arr = [10, 20, 30, 40];
    let slice = &arr[1..3];
    // Slice type
    // e.g - for arry int
        let slice: &[i32] = &arr[0..2];
        // dynamically sized type therefore normally use it through a reference
    // Slice memory layout
        // A slice reference contains two machine words:
            // 1. Address - Pointer to the first element
            // 2. Length - Number of elements
        // Slice reference v/s Array reference
            let arr = [1, 2, 3];
            let a: &[i32; 3] = &arr;
            let b: &[i32] = &arr;
            // &[i32; 3] references an array of exactly three elements
            // &[i32] references a slice whose length is stored at runtime

/*
Tuples - (T1, T2, T3, ...)
    // groups multiple values into one compound value.
    // can have multiple types 
*/

    // Create
        let t = (10, "hello", 3.14);
    // Type annotation
        let t: (i32, &str, f64) = (10, "hello", 3.14);
    // Access by index
        let x = t.0;
        let y = t.1;
    // Destructure
        let (a, b, c) = t;
    // Destructuring assignment
        let (x, y, z);
        (x, y, z) = (1, 2, 3);
    // Mutable tuple
        let mut t = (10, 20);
        t.0 = 30;
    // Nested tuple
        let t = (10, (20, 30));
    // Single-element tuple (comma required)
        let t = (10,);
    // Empty tuple (unit type)
        let t = ();
    // Tuples as function arguments and return values
        fn tuple_return(x: i32, y: i32) -> (i32, i32) {
            (x + y, x * y)
        }
        fn tuple_param(data: (i32, i32)) -> i32 {
            data.0 + data.1
        }


/*
Box (heap allocation)
*/
    // To allocate it on the heap, Rust provides Box<T>.
    // Smart Pointers (Box allocates directly on the Heap)
        let boxed_int: Box<i32> = Box::new(5);
    // stack -> boxed_int - Pointer owning the allocation
    // Heap -> 5: i32
        println!("Boxed int: {}\n", boxed_int);

    // Dereferencing with `*`, consider:
        let mut y = Box::new(5);
        *y = 10; // Modifies the pointer
        println!("{}", y);



/*
Structs - cusotm compound types
    Struct name{
        field: type,
    }
*/
    struct User {
        active: bool,
        username: String,
        email: String,
        sign_in_count: u64,
    }

    // Instantiating a struct:
        let mut user1 = User {
            active: true,
            username: String::from("pengu"),
            email: String::from("pengu@example.com"),
            sign_in_count: 1,
        };

    // Access Fields:
        println!("{}", user1.username);
    // Mutating Fields:
        user1.email = String::from("new@example.com");

    // Field init shorthand: omit `field: variable` when both names match
        fn build_user(email: String, username: String) -> User {
            User {
                active: true,
                username, // same as username: username
                email,    // same as email: email
                sign_in_count: 1,
            }
        }

    // Struct update syntax: reuse remaining fields from an existing struct
    // Non-Copy fields (String) move; Copy fields (bool, u64) copy
    // Moved fields cannot be used from the original instance
        let user2 = User {
            email: String::from("new@example.com"),
            ..user1 // takes all remaining fields from user1
        };

    // Tuple struct: named type with unnamed fields
    // Access fields using `.index`
    // Each tuple struct has a distinct type identity
        struct Color(u8, u8, u8);
        struct Point(i32, i32, i32);
        let red = Color(255, 0, 0);
        let position = Point(10, 20, 30);
        println!("{}", red.0);
        println!("{}", position.1);
    // Color and RGB are different types, despite identical fields
        struct RGB(u8, u8, u8);

    // Unit-like struct: no fields; stores no data
        struct Marker;
        let m = Marker;
    // Debug: derive(Debug) to enable {:?} formatting
        #[derive(Debug)]
        struct Rectangle {
            width: u32,
            height: u32,
        }
        let rect = Rectangle { width: 30, height: 50 };
        println!("{:?}", rect);  // Single-line debug output
        println!("{:#?}", rect); // Pretty multi-line output
    // dbg!: prints to stderr with source location; returns the value
    // println!: prints to stdout
        let scale = 2;
        let width = dbg!(30 * scale);

    // Destructing: 
    // Rust uses pattern matching for destructuring
    // The interesting part is that Rust patterns can also specify ownership behaviour:
    // - Extract fields from a struct
    // - Decide whether each field is moved, borrowed, or copied
        let Person {
            name,
            ref age,
        } = person;  

    // Partial moves in Tuples occurs when you move one field out of a struct, leaving the remaining fields usable.
    // A tuple can contain multiple independently owned values
        let t = (
            String::from("Hello"),
            String::from("World"),
        );
        let s = t.0; // "Hello", t.0 moves into s
    // t.1 still belongs to t. You cannot use the complete tuple t. but still can Access
        println!("{}", t.1);
    // To retain ownership of the original tuple, clone its contents:
        let (s1, s2) = (t.0.clone(), t.1.clone());

/*
Enums
*/
    // ENUMS: A type that represents one of several variants.
    // Only one variant is active at a time.
        enum IpAddress {
            V4,
            V6,
        }
        let a = IpAddress::V4;
        let b = IpAddress::V6;
    // Discriminants: integer values assigned to fieldless variants.
    // Default starts at 0; subsequent variants increment by 1.
        enum Number {
            Zero = 5,
            One,      // 6
            Two,      // 7
        }
        enum Value {
            Zero = 5,
            One = 10,
        }
        let x = Value::One as u8; // Cast fieldless enum variant to integer.
        assert_eq!(x, 10);
    // ENUMS WITH DATA: Variants can hold different types and amounts of data.
        enum Message {
            Quit,                       // Unit: no data
            Move { x: i32, y: i32 },    // Struct-like: named fields
            Write(String),              // Tuple-like: one value
            ChangeColor(u8, u8, u8),   // Tuple-like: three values
        }
    // All variants belong to the same Message type.
        let a = Message::Quit;
        let b = Message::Move { x: 10, y: 20 };
        let c = Message::Write(String::from("Hello"));
        let d = Message::ChangeColor(255, 0, 0);
    // Extract enum data using pattern matching (destructuring).
        match b {
            Message::Move { x, y } => println!("{x}, {y}"),
            _ => {}
        }

/*
`Option<T`
*/
    // Option<T>: Represents an optional value; Rust's alternative to null.
    // Some(value) = value exists; None = no value.
    // T = type of the contained value.
        let a: Option<i32> = Some(10);
        let b: Option<i32> = None;

    // Match: Handle both Some and None variants.
        fn plus_one(x: Option<i32>) -> Option<i32> {
            match x {
                Some(i) => Some(i + 1), // Extract, increment, wrap in Some.
                None => None,           // Preserve absence.
            }
        }
        assert_eq!(plus_one(Some(5)), Some(6));
        assert_eq!(plus_one(None), None);
    // Extracting with `if let`:
    // When you only care about one variant, if let is shorter than match
    // if let: Match one specific variant and extract its value.
    // If None, the block is skipped.
        let value = Some(6);
        if let Some(n) = value {
            println!("{n}");
        }
    // Some(6) is Option<i32>, not i32.
    
    // Option (safe null handling)
        let some_value: Option<i32> = Some(5);
        let no_value: Option<i32> = None;
        println!("Some value: {:?}", some_value);
        println!("No value: {:?}\n", no_value);


// ==========================================
// 4. OPERATORS
// ==========================================
/*
Comparison:
    ==
    !=
    >
    <
    >=
    <=
*/

/*
Logical: 
*/
    // && -> Returns true only when both inputs are true
    // || -> Returns true when at least one input is true
    // ! -> Inverts a Boolean value
/*
Arithmetic: 
*/
    // +
    // -
    // *
    // /
    // %
    // Unsigned subtraction: 
    //     let x: u8 = 1;
    //     let y = x - 2;
    // An unsigned integer cannot represent -1. use signed type
    //     let x: i8 = 1;
    //     let y = x - 2;
    //     println!("{}", y); // -1
/*
Assignment:
*/
    // =
    // +=
    // -=
    // *=
    // /=
    // %=

/*
Bitwise: 
*/
    // & -> 1 if both bits are 1
    // | -> 1 if either bit is 1
    // ^ -> 1 if bits are different
    // << -> Move bits left
    // >> -> Move bits right
    //     fn main() {
    //         let a = 0b0011;
    //         let b = 0b0101;

    //         println!("{:04b}", a & b); // 0001
    //         println!("{:04b}", a | b); // 0111
    //         println!("{:04b}", a ^ b); // 0110
    //     }
    // {:04b} formats the number as binary, with at least four digits
/*
Bit shifting:
*/
        // let x = 1 << 5;
        // Mathematically - \[x \ll n = x \times 2^n\]
        //     00000001
        //     |
        //     | shift left 5 positions
        //     v
        //     00100000 = 32

    // ==========================================================
    // One important detail: && and || use short-circuit evaluation. 
    // Rust does not evaluate the right side when the left side already determines the result.
    // ==========================================================

/*
NOTE: Rust does NOT have increment/decrement (++, --). Use += 1 or -= 1.
*/

// ==========================================
// 5. CONDITIONALS (If Family)
// ==========================================

/*
`if` conditions MUST evaluate to a strict `bool` (no implicit truthy/falsy).
`if` is an EXPRESSION in Rust, meaning it returns a value.
*/
    let condition = true;
    if condition {
        // execute
    } else if 10 > 5 {
        // execute
    } else {
        // execute
    }

    // `if let` (Pattern matching shortcut for one condition)
    let optional_name = Some("Alice");
    if let Some(name) = optional_name {
        println!("Optional name: {}", name);
    }
    // Rust's if can also produce a value
    // if is an expression: returns a value.
    // All branches must produce compatible types.
        let n = 5;
        let result = if n > 0 {
            // Both branches must return the same type.
            100
        } else {
            // "Hello" // Error: expected integer, found string slice.
            0
        };
    // Final expressions (without `;`) return block values.
        let big_n = if n < 10 && n > -10 {
            n * 10
        } else {
            n / 2
        };

// ==========================================
// 6. MATCH & TERNARY
// ==========================================

/*
Switch equivalent: `match`
*/
    // pattern matching. It MUST be exhaustive (cover all possible values)
        let match_var = 2;
        let match_result = match match_var {
            1 => "One",
            2 | 3 => "Two or Three", // Multiple patterns
            4..=10 => "Four to Ten", // Inclusive range
            _ => "Anything else",    // Default/catch-all (required for exhaustiveness)
        };
        println!("Match result for {}: {}", match_var, match_result);

/*
Match Pattern Matching - check value against patterns
- most important rust constructs
*/
    // match: Pattern matching; handles different possible values.
    // Every possible case must be covered (exhaustive matching).
        enum Coin {
            Penny,
            Nickel,
            Dime,
            Quarter,
        }
        fn value(coin: Coin) -> u8 {
            match coin {
                Coin::Penny => 1,
                Coin::Nickel => 5,
                Coin::Dime => 10,
                Coin::Quarter => 25,
            }
        }
    // _: Catch-all pattern; matches all remaining cases.
        match coin {
            Coin::Penny => 1,
            _ => 0,
        }
    // |: Match multiple patterns in one arm.
        match direction {
            Direction::North | Direction::South => println!("North or South"),
            Direction::East => println!("East"),
            Direction::West => println!("West"),
        }
    // match is an expression: each arm returns a value.
        let binary: u8 = match condition {
            true => 1,
            false => 0,
        };
    // Destructuring: Extract data from enum variants.
    // Struct-like uses `{}`; tuple-like uses `()`.
        enum Message {
            Move { x: i32, y: i32 },
            ChangeColor(u8, u8, u8),
            Quit,
        }
        fn show(message: Message) {
            match message {
                Message::Move { x, y } => println!("{x}, {y}"),
                Message::ChangeColor(r, g, b) => println!("{r}, {g}, {b}"),
                Message::Quit => println!("Quit"),
            }
        }

    // `matches!` macro: Checks whether a value matches a pattern; returns bool.
    // Does not extract values.
        let c = 'a';
        assert!(matches!(c, 'a'..='z')); // true: lowercase ASCII letter.
        enum MyEnum {
            Foo,
            Bar,
        }
        let value = MyEnum::Foo;
        assert!(matches!(value, MyEnum::Foo)); // true

    // Multiple patterns: `|` matches alternatives; `..=` matches inclusive ranges.
    // `_` matches anything.
        match n {
            1 => println!("One"),
            2 | 3 | 4 | 5 => println!("Between 2 and 5"),
            6..=10 => println!("Between 6 and 10"),
            _ => println!("Something else"),
        };

    // @: Bind a value to a variable while checking its pattern.
        let point = (3, 20);
        match point {
            // take positional value from tuple only when it's matches the pattern
            (x, y @ 10..=30) => println!("x = {x}, y = {y}"),
            _ => {}
        };
    // Without @, you could check a range, but you would not bind that matched value using this pattern.
    // Another Example: checks the range and extracts the ID
        enum Message {
            Hello { id: i32 },
        }
        let msg = Message::Hello { id: 5 };
        match msg {
            Message::Hello { id: id @ 3..=7 } => {
                println!("{id}");
            }
        }

    // Match guards: Add a Boolean condition using `if`.
    // Pattern must match first; then the guard is checked.
        let number = Some(10);
        let split = 20;
        match number {
            Some(x) if x < split => println!("Below split"),
            Some(x) => println!("Above or equal to split"),
            None => println!("No value"),
        };

    // ..: Ignore multiple remaining fields or elements.
        let numbers = (10, 20, 30, 40, 50);
        let (first, .., last) = numbers; // Ignore middle elements.
        // In struct:
            struct User {
                name: String,
                age: u8,
                active: bool,
            }
            let User { name, .. } = user;

    // Struct pattern: Extract selected fields; ignore the rest.
        struct User {
            name: String,
            age: u8,
            active: bool,
        }
        let User { name, .. } = user; // Extract name; ignore remaining fields.

/*
Ternary
*/
    //  Rust has no `? :` operator. Since `if` is an expression, use it directly.
    // The return types of all branches must match exactly.
        let ternary_age = 20;
        let ternary_status = if ternary_age >= 18 { "Adult" } else { "Minor" };
        println!("Age {} is: {}\n", ternary_age, ternary_status);

// ==========================================
// 7. LOOPS
// ==========================================

/*
loop
*/
    // rust provides special loop for infinite loops, `loop` can return value
        let mut counter = 0;
        let loop_result = loop {
            counter += 1;
            if counter == 10 {
                break counter * 2; // Returns 20 from the loop
            }
        };
        println!("Loop result: {}", loop_result);

/*
for
*/
    // Iterator loop. The standard way to iterate in Rust.
        for i in 0..5 { // Exclusive range: 0, 1, 2, 3, 4
            // execute
        }
        for i in 0..=5 { // Inclusive range: 0 to 5
            // execute
        }
    // For-each on collections. iter() borrows, into_iter() moves/consumes.
        for element in var_arr.iter() {
            // execute
        }
    // iterate over arrays:
        for name in &arr {
            println!("{name}");
        }

/*
Labeled loops
*/
    // allow break nested loops
    // Loop Labels (break/continue specific outer loops)
    'outer: for x in 0..5 {
        'inner: for y in 0..5 {
            if x * y > 10 {
                break 'outer; // Exits the outermost loop immediately
            }
        }
    }
    // continue 'outer` - This skips the remaining inner-loop execution and starts the next outer iteration
    

/*
while
*/
    // conditional loops, runs while condition is true
    counter = 10;
    while counter > 0 {
        counter -= 1;
    }

/*
Break & Continue:
*/
// break: Exit the loop immediately
// continue: Skip the remaining statements in the current iteration and start the next iteration


// ==========================================
// 9. FORMATTING
// ==========================================
/*
Macros: `println!` (print to stdout), `format!` (returns a String).
Requires the type to implement specific Traits:
`Display` trait ({}): User-facing, pretty print.
`Debug` trait ({:?}): Developer-facing, shows internal structure. Pretty debug: {:#?}
*/
    // Formatting with format specifiers
    let price = 19.9934;
    let population = 1500000;
    let f_price = 19.9934;
    println!("Population: {}", population);
    println!("Multiple: {} and {}", 42, "text");
    println!("Price: {:.2}", f_price); // 2 decimal places
    println!("Price variable: {:.2}", price);

    let f_num = 5;
    println!("{:<10} {:>5}", "Apple", f_num); // Left-align 10 chars, Right-align 5 chars
    
    println!("Positional: {1}, {0}, {1}", "Zero", "One"); // One, Zero, One
    println!("Named: {first} {second}", first="A", second="B");

    // Debug formatting
    let numbers = vec![1, 2, 3, 4, 5];
    println!("Debug format: {:?}", numbers);
    println!("Pretty debug:\n{:#?}\n", numbers);

    // Manual input example (commented)
    println!("(Input example commented - uncomment to test)");
    let mut input = String::new();
    io::stdin().read_line(&mut input).expect("Failed to read line");
    println!("You entered: {}", input.trim());


// ==========================================
// 10. PARSING & TYPE CONVERSION
// ==========================================
/*
Explicit casting (Narrowing/Widening primitives) using `as`.
*/
    let int_val = 10_i32;
    let float_val = int_val as f64;
    println!("Cast i32 to f64: {} -> {}", int_val, float_val);

/*
Parsing Strings to Types using `.parse::<T>()`.
Requires the target type to implement the `FromStr` trait.
Returns a `Result<T, Error>` because parsing can fail.
*/
    let str_num = "42";
    let parsed_int: u32 = str_num.parse().expect("Not a number!");
    println!("Parse '{}' to u32: {}", str_num, parsed_int);
    // OR using turbofish syntax: string_num.parse::<u32>().unwrap();

/*
Converting Types to Strings
Types that implement `Display` automatically implement `.to_string()`.
*/
    let num_to_string: String = 99.to_string();
    println!("99 to string: \"{}\"", num_to_string);
    let num_to_string_fmt: String = format!("{}", 99);
    println!("Using format!: \"{}\"\n", num_to_string_fmt);




// ==========================================
// 10 Methods
// ==========================================
    // Method: A function associated with a type, defined inside `impl`.
    // `self` refers to the instance calling the method.
        struct Rectangle {
            width: u32,
            height: u32,
        }
        impl Rectangle {
            // &self: Immutable borrow; read instance data.
            fn area(&self) -> u32 {
                self.width * self.height
            }
            // self: Takes ownership of the instance.
            fn consume(self) {}
            // &mut self: Mutable borrow; modify instance data.
            fn modify(&mut self) {}
        }
        let rect = Rectangle { width: 30, height: 50 };
        assert_eq!(rect.area(), 1500);
    // Three method receivers:
    // self       = Takes ownership.
    // &self      = Immutable borrow.
    // &mut self  = Mutable borrow.
    // &self is shorthand for self: &Self.
    // Self (capital S) = Type being implemented (Rectangle).

    // Associated function: Belongs to a type but has no `self` receiver.
    // Called using `Type::function()`; commonly used as a constructor.
    // Rust has no special constructor keyword.
        impl Rectangle {
            fn new(width: u32, height: u32) -> Self {
                Self { width, height } // Self = Rectangle.
            }
        }
        let rect = Rectangle::new(30, 50);
    // rect.area()             // Method: called on instance.
    // Rectangle::new(30, 50)  // Associated function: called on type.

    // Multiple `impl` blocks can define methods for the same type.
    // Useful for organizing code.
        impl Rectangle {
            fn area(&self) -> u32 {
                self.width * self.height
            }
        }
        impl Rectangle {
            fn perimeter(&self) -> u32 {
                2 * (self.width + self.height)
            }
        }

    // Enums can also have methods using `impl`.
    // `Self` refers to the enum type.
        enum TrafficLight {
            Red,
            Yellow,
            Green,
        }
        impl TrafficLight {
            fn color(&self) -> &str {
                match self {
                    Self::Red => "red",
                    Self::Yellow => "yellow",
                    Self::Green => "green",
                }
            }
        }
        let light = TrafficLight::Yellow;
        println!("{}", light.color()); // "yellow"

// =========================================
// Generics
// =========================================
    // Generics: Write reusable code that works with multiple types.
    // Each concrete instantiation is a distinct type.
    // T: Generic type parameter; placeholder for a concrete type.
        struct Value<T> {
            value: T,
        }
    // Compiler infers T from the assigned value.
        let a = Value { value: 10 };      // Value<i32>
        let b = Value { value: 3.14 };    // Value<f64>
        let c = Value { value: "Hello" }; // Value<&str>
        // Conceptually generated for used types:
        // Value<i32>
        // Value<f64>
        // Value<String>
    // How compilation  works:
    // Rust uses process called Monomorphization for Generics
    // Compiler generates specialized versions for concrete types.
    // Generics are zero-cost: no runtime type dispatch.
    // Trade-off: potentially larger executable and longer compilation.

    // Generic function: <T> declares a generic type parameter.
    // Compiler infers T from arguments.
        fn print_value<T>(value: T) {
            println!("Value received");
        }
        print_value(10);
        print_value('A');
        print_value(3.14);
    // Turbofish Syntax (`::<Type>`): Explicitly specifies generic type arguments.
        print_value::<char>('A');

    // Multiple parameters: Both arguments must have the same T.

    // Trait bounds: Restrict generic types to types supporting required operations.
    // T alone does not guarantee that `+` is supported.
        use std::ops::Add;
    // T: Add requires addition support.
    // Output = T requires addition to return the same type.
        fn sum<T: Add<Output = T>>(a: T, b: T) -> T {
            a + b
        }
        sum(10_i8, 20_i8);
        sum(10_i32, 20_i32);
        sum(1.5_f64, 2.5_f64);

    // Generic struct: T is used by both fields, so both must have same type.
        struct Point<T> {
            x: T,
            y: T,
        }
        let p1 = Point { x: 10, y: 20 };       // Point<i32>
        let p2 = Point { x: 1.5, y: 2.5 };    // Point<f64>
        // let p = Point { x: 10, y: 2.5 };   // Error: fields must have same type.
    // Multiple generic parameters: Fields can have different types.
        struct Point<T, U> {
            x: T,
            y: U,
        }
        let p = Point { x: 10, y: 2.5 };      // Point<i32, f64>
    // T and U can be same or different types.

    // Generic impl: Applies methods to Value<T> for any T.
    // impl<T> declares T so it can be used inside Value<T>.
        struct Value<T> {
            value: T,
        }
        impl<T> Value<T> {
            fn value(&self) -> &T { // Borrow and return stored value.
                &self.value
            }
        }
        let a = Value { value: 10 };
        let b = Value { value: "Hello" };
        println!("{}", a.value());
        println!("{}", b.value());
    // Generic methods: A method can introduce additional type parameters.
    // T, U = Original Point types; V, W = Other Point types.
    // Output combines x from self (T) and y from other (W).
    // self and other are moved because the method takes ownership.
        struct Point<T, U> {
            x: T,
            y: U,
        }
        impl<T, U> Point<T, U> {
            fn mixup<V, W>(self, other: Point<V, W>) -> Point<T, W> {
                Point {
                    x: self.x,
                    y: other.y,
                }
            }
        }
        let p1 = Point { x: 5, y: 10.4 };
        let p2 = Point { x: "Hello", y: 'A' };
        let p3 = p1.mixup(p2); // Point<i32, char>
    // Specific generic implementation: Methods only apply to Point<f64>.
    // Not available for Point<i32> or Point<f32>.
        impl Point<f64, f64> {
            fn distance_example(&self) -> f64 {
                self.x.powi(2) + self.y.powi(2)
            }
        }

    // Const generics: Accept compile-time constant values, not just types.
    // T = Element type; N = Compile-time array length (usize).
    // Different N values create different types.
        struct Array<T, const N: usize> {
            data: [T; N],
        }
        let a = Array { data: [10, 20, 30] };       // Array<i32, 3>
        let b = Array { data: [1, 2, 3, 4, 5] };   // Array<i32, 5>
    // Uses: Fixed-size arrays, matrix dimensions, bit widths, compile-time sizes.

// ==========================================
// 11 FUNCTIONS
// ==========================================

/*
Functions define parameters with strict types. Return types follow `->`.
Rust relies on "Expressions vs Statements".
- Statement: Ends in `;`, performs an action, returns `()` (unit type).
- Expression: Evaluates to a value. The last expression in a block (without `;`) is automatically returned.
*/
    let sum = add_numbers(5, 10);
    println!("add_numbers(5, 10) = {}", sum);

    // Ownership transfer (move)
    let original_string = String::from("Hello");
    println!("\nBefore demonstrateMove: {}", original_string);
    demonstrate_move(original_string);
    // println!("After demonstrateMove: {}", original_string); // ERROR: original_string was moved!

    // Borrowing (immutable reference)
    let borrowed_string = String::from("World");
    println!("\nBefore demonstrateBorrow: {}", borrowed_string);
    demonstrate_borrow(&borrowed_string);
    println!("After demonstrateBorrow: {} (still available)", borrowed_string);

    // Mutable borrowing
    let mut mutable_string = String::from("Rust");
    println!("\nBefore demonstrateBorrowMut: {}", mutable_string);
    demonstrate_borrow_mut(&mut mutable_string);
    println!("After demonstrateBorrowMut: {}", mutable_string);

    // Slice parameter
    let numbers = vec![10, 20, 30, 40, 50];
    let array_sum = sum_all(&numbers);
    println!("\nsum_all([10,20,30,40,50]) = {}\n", array_sum);

// =========================================================
// 12. Ownership
// =========================================================
    // Rust enforces three fundamental ownership rules:
        // 1. Every value has an owner
        // 2. A value can have only one owner at a time
        // 3. When the owner goes out of scope, the value is dropped
    // The owner is the variable or data structure responsible for owning that value. these rules are checked by the compiler
    // drop(cleanup) - For a String, this releases its heap allocation
    // Rust doesn't require Garabage collector to manager owned values. the cleanup is determistic

// Ownership in depth — moving values, copying, cloning, borrowing, references, and how Rust prevents memory errors at compile time. 
// This is where Rust starts to become fundamentally different from many other languages.

    // Copy: Simple types such as i32 implement the Copy trait
        let x = 5;
        let y = x;
        println!("{x} {y}"); // Both variables remain usable
    // Move: String does not implement Copy
        let s1 = String::from("Hello");
        let s2 = s1;
        // The ownership moves from s1 to s2, s1 is no longer usable
    // Shallow Copy Rust prevents - Double Free, Dangling Pointers by invalidating the source binding after a move
    // Important: The heap contents were not duplicated. 
    // Ownership was transferred. The allocation is ultimately freed once, when its current owner is dropped
    
    // Clone() - Actual Deep Copy
        let s3 = s2.clone();

    // Pass by Value (Move or Copy semantics)
    // - Primitives implement the `Copy` trait (bit-for-bit duplication on stack).
    // - Complex types (String, Vec) implement `Move` (ownership is transferred, original variable invalidated).
    fn takes_ownership(s: String) -> String {
        s // Implicit return (no semicolon)
        // When this funcion recieves caller value & takes_ownership function parameter `s` now it's owner
        // when takes_ownership finishes rust calls `drop()` on the owned string

        // But if want to keep ownership:
            // - Use Borrow 
            //     - Param -> takes_ownership(s: &string) -> string {s}
            //     - Caller -> func(&s)
            // - Return Ownership
                // - takes_ownership(s: string) -> string {s}
                // in main() call like this:
                    // let s = takes_ownership(s)
    }

    // into_bytes():
        let bytes = s.into_bytes();
    // Consumes the String and returns a Vec<u8>
    // Ownership of the original String is consumed. You cannot use s afterward
    
    // as_bytes():
        let s = String::from("Hello");
        let bytes = s.as_bytes();
    // Returns a borrowed byte slice (&[u8]

    // Using String::clone() to preserve ownership, pass cloned string
        // takes_ownership(s.clone())

    // But: string literals behaves differently, e.g->
        let s = "Hello";
        let another = s;
    // Both reamin usable, why?
    // A string literal has type &'static str
    // It is a reference to string data stored in the program's static memory, and the reference implements Copy
    // Compare:
        let a: String = String::from("Hello");
        let b: &str = "Hello";

    // Mutability can change after a move:
        let s = String::from("Hello");
        let mut s1 = s;
        s1.push_str(" World");
        println!("{s1}");    

// =========================================================
// 13. Borrowing
// =========================================================
    // Borrowing means accessing a value without taking ownership of it, pass reference instead of owned value. ref written using &
        let s = String::from("Hello");
        let s2 = s;  // Move (for String)
        let r = &s;
    // Two Borrowing rules:
        // Rule 1: At a given time, you can have:
        //     - Any number of immutable references (&T)
        //     - OR exactly one mutable reference (&mut T)
        // Rule 2: References must always be valid
    
    // Immutable Borrowing:
        // In Arguments- &var; In Params - var: &type 
        // - Multiple immutable references can read the same data
    // Mutable Borrowing:
        // In Arguments- &mut var; In Params - var: &mut type 
        // - Multiple Mutable References not allowed:
            let mut s = String::from("Hello");
            {
                let r1 = &mut s;
                r1.push_str("!");
            }
            let r2 = &mut s;
            r2.push_str(" World");
            // - but allowed in separate scopes, The first mutable borrow ends before the second begins
    // Immutable and mutable references together


    // Dangling References

    // References & Dereferencing
        let x = 5;
        let p = &x; // type of video is: &i32
    // it holds reference to an integer, To access the referenced value, use `*`
        let value = *p; // use `*`
        assert_eq!(value, 5);
    // for displaying memory address:
        println!("{:p}", p);

    // `ref` Keyword:
        let c = 'A';
        let ref r1 = c;
    // equivalent to:
        let c = 'A';
        let r1 = &c;

    // Pass by Reference (Borrowing)
    // - `&T`: Immutable reference. Function can read but not alter original data.
    // - `&mut T`: Mutable reference. Function can alter original data in place.
    fn modify_in_place(num: &mut i32, _read_only_str: &str) {
        *num += 10; // Dereference pointer to modify actual value
        // read_only_str cannot be modified here.
    }

    let mut mutable_num = 5;
    modify_in_place(&mut mutable_num, stack_str);
    println!("After modify_in_place: {}", mutable_num);

    // Use all constants and variables
    println!("\nConstants - PI: {}, MAX_BUFFER: {}, MAX_SPEED: {}, GLOBAL_COUNTER: {}", PI, MAX_BUFFER, MAX_SPEED, GLOBAL_COUNTER);
    println!("Shadowed variable final value: {}", shadowed);
    println!("y value: {}", y);
    println!("Input buffer: \"{}\"", input);
    let _ = takes_ownership(String::from("test"));


/*
Diverging Functions(!)
*/
    // A diverging function never returns control to its caller
    // ! - called never type
    // Macros:
        // panic!() ->Triggers a panic
        // todo!() -> Marks unfinished implementation
        // unimplemented!() -> Marks functionality not implemented



// =========================================================
// 13. memory
// =========================================================
/*
Rust Memory Regions:
*/
    // -> Stack(LIFO) - Last in, First Out
    //     - Function call frames
    //     - Local values with known sizes (when places there)
    //     - Fixed-size data
    // -> Heap(Dynamic) - runtime allocation
    //     - Dynamic allocations
    //     - Variable-size data
    //     - Explicit ownership
    //     e.g -> String has a dynamically allocated buffer
    //     let s = String::from("Hello Rust");
    //         -----------------------------------------------
    //         | Storing in Memory                           |
    //         | --------------------------------------------|
    //         | Stack(24 Bytes)                             |
    //         | s: String                                   |   
    //         | Pointer + length + capacity                 |
    //         | (8B + 8B + 8B) = 24 Bytes                   |
    //         |                                             |
    //         | ↓                                           |
    //         |         Pointer refers to the allocation    |
    //         |                                             |
    //         | Heap                                        |
    //         | H e l l o  R u s t                          |
    //         |Dynamically allocated byte buffer            |
    //         -----------------------------------------------
    
    // Function calls and stack frames:
        fn func_stack_frames(a: i32, b: i32) -> i32 {
        // -> i32 specifies that the function must return an i32
            let c = a + b;
            c // Returns the value of c
        // }
        fn main() {
            let cleanup_var = String::from("Scope controls memory cleanup");
            let z = add_numbers(2, 3);
            println!("{}", z);
        }
    // c is the function's tail expression
    // Because c is the final expression and has no semicolon, its value becomes the function's return value.


}


// ==========================================
// FUNCTION IMPLEMENTATIONS
// ==========================================

fn add_numbers(a: i32, b: i32) -> i32 {
    a + b  // Implicit return (no semicolon)
}
// explicit return(semicolon)
fn add(x: i32, y: i32) -> i32 {
    return x + y; // mistake semicolon procduces unit() fix remove semicolon
}

// Demonstrates ownership/move semantics
// s is moved into this function, original binding becomes invalid
fn demonstrate_move(s: String) {
    println!("Inside demonstrateMove: {}", s);
    // s is dropped here, memory freed
}

// Demonstrates immutable borrowing
// s is borrowed (referenced), original remains valid
fn demonstrate_borrow(s: &String) {
    println!("Inside demonstrateBorrow: {}", s);
    // s is reference, nothing is dropped
}

// Demonstrates mutable borrowing
// s is mutably borrowed, can modify original
fn demonstrate_borrow_mut(s: &mut String) {
    s.push_str("!");
    println!("Inside demonstrateBorrowMut: {}", s);
}

// Function with slice parameter
// Borrows the data, doesn't take ownership
fn sum_all(numbers: &[i32]) -> i32 {
    let mut total = 0;
    for &num in numbers {
        total += num;
    }
    total
}1


// Diverging Functions:
fn never_return() -> ! {
    panic!("Program terminated");
    // The function panics and never returns normally
}
// other examples:
fn never_return_loop() -> ! {
    loop {}
    // A loop that never exits also diverges
}
// Why does ! matter? consider
fn get_number(x: bool) -> i32 {
    match x {
        true => 10,
        false => panic!("No number"),
    }
}
// This works because the false branch never returns a value to the caller.
// The never type can coerce into the expected type of an expression.