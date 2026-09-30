// Run with: zig run notes.zig      (written & tested for Zig 0.16.0)
// Zig's standard library changes a LOT between versions (0.14 -> 0.15 -> 0.16).
// Language rules below are stable; std API details (I/O, ArrayList, allocators) are 0.16 style.

//! Doc comments: `///` documents the NEXT declaration, `//!` documents the CURRENT file/module.
//! There are NO multi-line comments in Zig (no /* */). Use // on every line.

const std = @import("std");
// @import returns a struct. A file IS a struct. `const std` is a compile-time known namespace.
const print = std.debug.print; // std.debug.print writes to STDERR (unbuffered, no error handling needed)

// ==========================================
// 11. BASICS OF FUNCTIONS & WHERE TO DEFINE
// ==========================================
// Top-level declarations in Zig are ORDER-INDEPENDENT (no forward declarations / header files needed).
// A function can be used above where it is defined. Everything at file level is lazily analyzed:
// unused top-level code is never compiled.
// Syntax: fn name(param: type, ...) return_type { body }
// `pub` = visible to other files that @import this one.

// ==========================================
// 14. SPECIAL DATA TYPES - Structs, enums, unions
// ==========================================
// Structs are anonymous types assigned to a const. Types are values (comptime).
const Person = struct {
    name: []const u8,
    age: u8,
    height: f32 = 1.70, // default field value

    // Functions declared inside a struct are just namespaced functions. `self` is a normal parameter.
    fn describe(self: Person) void {
        print("{s} is {d} years old\n", .{ self.name, self.age });
    }

    // Pointer receiver to mutate
    fn birthday(self: *Person) void {
        self.age += 1;
    }

    // "Constructor" convention: a plain function returning Person
    fn init(name: []const u8, age: u8) Person {
        return .{ .name = name, .age = age }; // `.{}` infers the type from the return type
    }
};

// Tuple-like alias: struct used as a 2D point
const Point = struct { x: i32, y: i32 };

// Enum (tagged integer with names). Can have methods.
const Color = enum {
    red,
    green,
    blue,

    fn isWarm(self: Color) bool {
        return self == .red;
    }
};
const Level = enum(u8) { low = 1, mid = 5, high = 10 }; // explicit integer backing type

// Tagged union: holds exactly ONE of the fields; the tag tells which one (like Rust enums)
const Value = union(enum) {
    int: i64,
    float: f64,
    none,
};

// Generic type: a FUNCTION that takes a type at compile time and RETURNS a type
fn Pair(comptime T: type) type {
    return struct { first: T, second: T };
}

// ==========================================
// 1. BASICS OF VARIABLES & CONSTANTS
// ==========================================
// Syntax: const name: type = value;   var name: type = value;
//   `const` = cannot change after init.   `var` = mutable.
// The type is usually inferred: `const x = 5;`
// GOTCHAS you'll meet immediately:
//   * Unused variables/parameters/constants are COMPILE ERRORS. Silence with `_ = x;`
//   * `var` that is never mutated is a compile error too ("local variable is never mutated"). Use const.
//   * Shadowing is NOT allowed: a local can't reuse the name of another local/param/global in scope.
//   * Local variables MUST be initialized. Use `undefined` when you really want uninitialized memory.

// Global (file scope) variable. Visible to the whole file. Lives for the entire program.
var global_var: i32 = 0;
// Compile-time constants at file scope:
const PI: f64 = 3.14159265358979;
const MAX_USERS = 100; // type is comptime_int: arbitrary-precision, converts to any int type that fits

// `pub fn main` is the entry point.
// Zig 0.16 "Init" main: the runtime hands you an allocator (`gpa`), an `io` interface and an `arena`.
// Older versions used `pub fn main() !void`.
// `!void` = "returns void or an error" (error union). `try` propagates any error to the caller.
pub fn main(init: std.process.Init) !void {
    const gpa = init.gpa; // general-purpose allocator (leak-checked in Debug mode)
    const io = init.io; // I/O implementation (files, network, time ...)

    print("Hello World\n", .{}); // 2nd arg is ALWAYS a tuple of format arguments, even if empty

    // Local variable with inferred type
    const local_var = 50;
    // Explicit type
    var mutable_var: i32 = 10;
    mutable_var += 5;

    {
        // Block scope: names die at the closing brace
        const block_var = 25;
        print("Block var: {d}\n", .{block_var});
    }
    // block_var is not accessible here!
    global_var += 1;
    print("Local: {d}, Mutable: {d}, Global: {d}\n", .{ local_var, mutable_var, global_var });

    // `undefined`: memory is left uninitialized (Debug builds fill it with 0xAA to help catch bugs)
    var uninit: i32 = undefined;
    uninit = 7; // must assign before reading

    // comptime: code runs at COMPILE TIME
    // A `comptime` var/expression is evaluated by the compiler; the result is baked into the binary.
    const fib10 = comptime blk: {
        var a: u32 = 0;
        var b: u32 = 1;
        var i: u32 = 0;
        while (i < 10) : (i += 1) {
            const t = a + b;
            a = b;
            b = t;
        }
        break :blk a;
    };
    print("Compile-time fib(10) = {d}, uninit = {d}\n\n", .{ fib10, uninit });

    // ==========================================
    // 2. DATA TYPES - BUILT-IN PRIMITIVES
    // ==========================================
    // Zig integer types are ARBITRARY WIDTH: i1..i65535, u1..u65535 (signed / unsigned).
    // Common ones: i8 i16 i32 i64 i128, u8 u16 u32 u64 u128, isize / usize (pointer-sized).
    // Sizes are EXACTLY what the name says (unlike C's int/long). usize is used for indexes and lengths.
    const var_u8: u8 = 255; // 0 .. 255
    const var_i8: i8 = -128; // -128 .. 127
    const var_i32: i32 = 2_147_483_647; // underscores allowed for readability
    const var_i64: i64 = 9_223_372_036_854_775_807;
    const var_u3: u3 = 7; // 3-bit unsigned integer! (0..7)
    const var_usize: usize = 42;

    // Integer literals: decimal, 0xff hex, 0o77 octal, 0b1010 binary.
    const hex = 0xFF;
    const bin = 0b1010_1010;

    // Floating point (IEEE 754): f16, f32, f64 (default), f80, f128
    const var_f32: f32 = 3.14;
    const var_f64: f64 = 3.141592653589793;

    // bool: true / false (1 byte). No implicit int -> bool conversion; conditions MUST be bool.
    const var_bool: bool = true;

    // Character: NO char type. A "char" is a u8 (ASCII byte) or u21 (Unicode code point).
    const var_char: u8 = 'A'; // character literal is a comptime_int holding the code point
    const var_crab: u21 = '🦀'; // full Unicode code point

    // Special types:
    //   void        - zero bits, "no value"
    //   noreturn    - function never returns (e.g., std.process.exit, panic)
    //   type        - a type as a comptime value
    //   anyerror    - any error;  comptime_int / comptime_float - literal types
    //   anyopaque   - like C's void*
    const nothing: void = {};
    _ = nothing;

    print("u8: {d}, i8: {d}, i32: {d}, i64: {d}, u3: {d}, usize: {d}\n", .{ var_u8, var_i8, var_i32, var_i64, var_u3, var_usize });
    print("hex: {d}, bin: {d}, f32: {d:.2}, f64: {d:.10}\n", .{ hex, bin, var_f32, var_f64 });
    print("bool: {}, char: {c} (code {d}), crab code point: {u}\n", .{ var_bool, var_char, var_char, var_crab });
    print("@sizeOf(i32) = {d}, @sizeOf(u3) = {d}, @bitSizeOf(u3) = {d}, @sizeOf(f64) = {d}\n", .{ @sizeOf(i32), @sizeOf(u3), @bitSizeOf(u3), @sizeOf(f64) });
    print("maxInt(u8) = {d}, minInt(i16) = {d}, floatEps(f32) = {e}\n\n", .{ std.math.maxInt(u8), std.math.minInt(i16), std.math.floatEps(f32) });

    // ==========================================
    // 3. REFERENCE TYPES (POINTERS, ARRAYS, SLICES, STRINGS, HEAP)
    // ==========================================
    // Zig has NO garbage collector, NO hidden allocations, NO hidden control flow.
    // Anything that allocates takes an `Allocator` parameter explicitly.

    // --- Pointers ---
    //   *T          single-item pointer (never null, no arithmetic)
    //   [*]T        many-item pointer (unknown length, arithmetic allowed, C-like)
    //   []T         SLICE = pointer + length (the safe, common one)
    //   *const T    pointer to read-only data
    //   ?*T         optional pointer (null allowed)
    var target: i32 = 42;
    const ptr_int: *i32 = &target; // & takes address
    ptr_int.* = 43; // `.*` dereferences (read or write)
    print("target: {d}, via pointer: {d}\n", .{ target, ptr_int.* });
    print("Pointer address: {*}\n", .{ptr_int});

    // --- Arrays: fixed length, length is part of the TYPE, live on the stack ---
    const arr_int = [4]i32{ 10, 20, 30, 40 };
    const arr_inferred = [_]i32{ 1, 2, 3 }; // [_] lets the compiler count the elements
    const arr_zeros = [_]u8{0} ** 8; // `**` repeats an array at comptime -> 8 zeros
    var arr_mut = [_]i32{ 5, 4, 3, 2, 1 };
    print("Array: {any}, len = {d}\n", .{ arr_int, arr_int.len });
    print("Inferred: {any}, zeros len = {d}\n", .{ arr_inferred, arr_zeros.len });
    print("First: {d}, Last: {d}\n", .{ arr_int[0], arr_int[arr_int.len - 1] });
    // Indexing out of bounds is SAFETY-CHECKED: Debug/ReleaseSafe -> panic, ReleaseFast -> undefined behavior.
    // Concatenate arrays at comptime with `++`:
    const joined = arr_int ++ arr_inferred;
    print("Joined: {any}\n", .{joined});

    // --- Slices: a VIEW into an array (pointer + length). Length known at runtime. ---
    const slice: []const i32 = arr_int[1..3]; // [1..3] = indexes 1,2 (end EXCLUSIVE) -> {20, 30}
    print("Slice: {any}, len = {d}\n", .{ slice, slice.len });
    const mut_slice: []i32 = arr_mut[0..]; // to the end. Mutable slice can modify the array
    mut_slice[0] = 500;
    std.mem.sort(i32, mut_slice, {}, std.sort.asc(i32)); // sort in place
    print("Sorted array: {any}\n", .{arr_mut});

    // --- Strings ---
    // Zig has NO string type. A string is a slice of bytes: []const u8 (usually UTF-8).
    // A string literal has type *const [N:0]u8: pointer to a null-terminated array in READ-ONLY memory.
    // It coerces to []const u8 automatically.
    const greeting: []const u8 = "Hello";
    print("String: {s}, len = {d}, first byte = {c}\n", .{ greeting, greeting.len, greeting[0] });
    // len counts BYTES: "é" is 2 bytes, "🦀" is 4.
    print("len('🦀') = {d} bytes\n", .{"🦀".len});

    // Multi-line string literal: each line starts with \\  (no escapes processed, newline between lines)
    const multiline =
        \\Line one
        \\Line "two" with \n untouched
    ;
    print("{s}\n", .{multiline});

    // Sentinel-terminated string [:0]const u8 (C-compatible, guaranteed 0 at the end)
    const c_str: [:0]const u8 = "for C APIs";
    print("Sentinel string len: {d}, byte at len: {d}\n", .{ c_str.len, c_str[c_str.len] });

    // MUTABLE string: copy into a mutable array (literals are read-only!)
    var buf_str = [_]u8{ 'H', 'e', 'l', 'l', 'o' };
    buf_str[0] = 'h';
    print("Modified: {s}\n", .{&buf_str}); // &array coerces to a slice
    // string literal[0] = 'h';   // compile error: cannot assign to constant

    // String comparison: == compares POINTERS/lengths, NOT contents. Use std.mem.eql
    const s1: []const u8 = "abc";
    const s2: []const u8 = "abc";
    print("std.mem.eql(u8, s1, s2) = {}\n", .{std.mem.eql(u8, s1, s2)});

    // Common string operations from std.mem
    print("startsWith 'He': {}, indexOf 'l': {?d}, contains 'ell': {}\n", .{
        std.mem.startsWith(u8, greeting, "He"),
        std.mem.indexOfScalar(u8, greeting, 'l'),
        std.mem.find(u8, greeting, "ell") != null,
    });
    // Substring is just a slice: no copy
    print("Substring [1..4]: {s}\n", .{greeting[1..4]});

    // Splitting / tokenizing (iterators, no allocation)
    var it = std.mem.tokenizeScalar(u8, "one two  three", ' ');
    while (it.next()) |word| print("  token: {s}\n", .{word});

    // Concatenating strings: `++` works only at COMPTIME. At runtime, allocate:
    const comptime_cat = "Hello" ++ ", " ++ "World"; // comptime-known operands only
    const heap_cat = try std.fmt.allocPrint(gpa, "{s} + {s}", .{ greeting, "runtime" });
    defer gpa.free(heap_cat); // caller owns the memory -> must free
    print("{s} | {s}\n", .{ comptime_cat, heap_cat });

    // Case conversion
    var lower_buf: [5]u8 = undefined;
    const upper = std.ascii.upperString(&lower_buf, greeting);
    print("Upper: {s}\n\n", .{upper});

    // --- HEAP / Dynamic memory ---
    // Zig has no malloc/free keyword. You get an std.mem.Allocator and pass it around.
    // The pattern: allocate, then `defer` the free on the very next line so it can't be forgotten.
    // Allocators:
    //   std.heap.page_allocator          - asks OS for pages (simple but slow, no leak check)
    //   std.heap.DebugAllocator          - leak/double-free detection (the "gpa" from Init in Debug)
    //   std.heap.ArenaAllocator          - allocate many, free ALL at once (deinit). Very common.
    //   std.heap.FixedBufferAllocator    - allocate from a stack buffer, no OS calls
    //   std.heap.c_allocator             - libc malloc (needs -lc)
    //   std.testing.allocator            - for tests, fails the test on leaks
    const heap_arr = try gpa.alloc(i32, 3); // returns ![]i32 (error if out of memory)
    defer gpa.free(heap_arr); // runs when the enclosing SCOPE exits
    heap_arr[0] = 100;
    heap_arr[1] = 200;
    heap_arr[2] = 300;
    print("Heap array: {any}\n", .{heap_arr});

    // Single item
    const heap_int = try gpa.create(i32);
    defer gpa.destroy(heap_int); // create <-> destroy,  alloc <-> free
    heap_int.* = 7;
    print("Heap int: {d}\n", .{heap_int.*});

    // Arena: free everything at once
    {
        var arena = std.heap.ArenaAllocator.init(gpa);
        defer arena.deinit(); // frees ALL allocations made through arena
        const a = arena.allocator();
        const x1 = try a.alloc(u8, 10);
        const x2 = try a.dupe(u8, "copy me"); // duplicate a slice on the heap
        _ = x1;
        print("Arena dupe: {s}\n", .{x2});
        // no individual frees needed
    }

    // Fixed buffer allocator: memory from the stack
    var stack_mem: [64]u8 = undefined;
    var fba = std.heap.FixedBufferAllocator.init(&stack_mem);
    const fba_slice = try fba.allocator().alloc(u8, 16);
    print("FBA slice len: {d}\n", .{fba_slice.len});

    // Dynamic array (ArrayList). In 0.15+/0.16 it is the "unmanaged" one: you pass the allocator to each call.
    var list: std.ArrayList(i32) = .empty;
    defer list.deinit(gpa);
    try list.append(gpa, 10);
    try list.append(gpa, 20);
    try list.appendSlice(gpa, &[_]i32{ 30, 40 });
    _ = list.pop(); // removes & returns the last element
    print("ArrayList items: {any}, len = {d}\n", .{ list.items, list.items.len });
    for (list.items) |item| print("  item: {d}\n", .{item});

    // Hash map (string keys)
    var map: std.StringHashMapUnmanaged(i32) = .empty;
    defer map.deinit(gpa);
    try map.put(gpa, "alice", 30);
    try map.put(gpa, "bob", 25);
    if (map.get("alice")) |age| print("alice -> {d}\n", .{age});
    print("map count: {d}\n", .{map.count()});

    // --- Optionals: Zig's "null" ---
    // `?T` is either a T or `null`. There are no null references otherwise.
    var maybe: ?i32 = null;
    print("maybe is null: {}\n", .{maybe == null});
    maybe = 5;
    // if (opt) |value| unwraps safely; `orelse` gives a default; `.?` asserts non-null (panics if null)
    if (maybe) |v| print("maybe has {d}\n", .{v});
    const with_default = (@as(?i32, null)) orelse -1;
    print("orelse default: {d}, .? -> {d}\n", .{ with_default, maybe.? });
    const null_ptr: ?*i32 = null; // optional pointer = nullable pointer (same size as a plain pointer)
    print("null_ptr == null: {}\n\n", .{null_ptr == null});

    // --- Error unions: Zig's exceptions replacement ---
    // `E!T` is either a T or an error from set E. `!T` infers the error set.
    // Errors are values (small integers), not objects: no stack unwinding, no hidden cost.
    // Handling forms:
    //   try f()             - return the error to my caller if f fails
    //   f() catch |e| ...   - handle it here
    //   f() catch default   - fall back to a value
    //   if (f()) |v| ... else |e| ...
    const r1 = divide(10, 2) catch |e| {
        print("error: {s}\n", .{@errorName(e)});
        return;
    };
    const r2 = divide(1, 0) catch |e| blk: {
        print("Caught error: {s}\n", .{@errorName(e)});
        break :blk -1;
    };
    print("divide results: {d}, {d}\n", .{ r1, r2 });

    // defer / errdefer: cleanup actions run when leaving the scope (LIFO order)
    //   defer    - always
    //   errdefer - only if the scope exits with an error
    {
        defer print("defer #1 (runs last)\n", .{});
        defer print("defer #2 (runs first)\n", .{});
        print("end of block\n", .{});
    }
    print("\n", .{});

    // ==========================================
    // 4. OPERATORS
    // ==========================================
    const x: i32 = 10;
    const y: i32 = 3;
    // Arithmetic: + - * / %
    print("Arithmetic: {d} + {d} = {d}\n", .{ x, y, x + y });
    print("Arithmetic: {d} - {d} = {d}\n", .{ x, y, x - y });
    print("Arithmetic: {d} * {d} = {d}\n", .{ x, y, x * y });
    // Integer `/` and `%` on SIGNED types are compile errors if operands might be negative:
    // use @divTrunc (toward zero), @divFloor (toward -inf), @rem, @mod explicitly.
    print("Arithmetic: {d} / {d} = {d} (@divTrunc)\n", .{ x, y, @divTrunc(x, y) });
    print("Arithmetic: {d} % {d} = {d} (@rem)\n", .{ x, y, @rem(x, y) });
    print("@divFloor(-7, 2) = {d}, @divTrunc(-7, 2) = {d}, @mod(-7, 3) = {d}, @rem(-7, 3) = {d}\n", .{ @divFloor(@as(i32, -7), 2), @divTrunc(@as(i32, -7), 2), @mod(@as(i32, -7), 3), @rem(@as(i32, -7), 3) });
    print("Float division: {d:.3}\n", .{@as(f64, 10.0) / 3.0}); // `/` is fine for floats
    // (unsigned ints and comptime values can use plain / and %)

    // OVERFLOW: plain + - * on integers is SAFETY-CHECKED: overflow panics in Debug / ReleaseSafe,
    // and is undefined behavior in ReleaseFast. Choose the behavior you want explicitly:
    var small: u8 = 250;
    small +%= 10; // wrapping add          -> 4
    print("Wrapping 250 +% 10 = {d}\n", .{small});
    const sat: u8 = 250 +| 10; // saturating add -> 255
    print("Saturating 250 +| 10 = {d}\n", .{sat});
    const ov = @addWithOverflow(@as(u8, 250), 10); // tuple: { result, overflow_bit }
    print("@addWithOverflow -> value {d}, overflowed {d}\n", .{ ov[0], ov[1] });
    // Also: -% *% (wrapping), -| *| <<| (saturating)

    // Comparison: == != > < >= <=   (result is bool)
    print("\nComparison: {d} > {d} is {}\n", .{ x, y, x > y });
    print("Comparison: {d} == {d} is {}\n", .{ x, y, x == y });

    // Logical: and, or, ! (NOT)   -- words, not && / ||. Short-circuit evaluation applies.
    const t = true;
    const f = false;
    print("\nLogical: true and false = {}\n", .{t and f});
    print("Logical: true or false = {}\n", .{t or f});
    print("Logical: !true = {}\n", .{!t});

    // Bitwise: & | ^ ~ << >>   (shift amount type must fit: for u32, shift is u5)
    const bits: u8 = 0b0101;
    print("\nBitwise: 5 & 3 = {d}\n", .{bits & 3});
    print("Bitwise: 5 | 3 = {d}\n", .{bits | 3});
    print("Bitwise: 5 ^ 3 = {d}\n", .{bits ^ 3});
    print("Bitwise: ~5 (u8) = {d}\n", .{~bits});
    print("Bitwise: 5 << 1 = {d}\n", .{bits << 1});
    print("Bitwise: 20 >> 2 = {d}\n", .{@as(u8, 20) >> 2});

    // Assignment: = += -= *= /= %= &= |= ^= <<= >>= (and wrapping/saturating variants)
    // NO ++ / -- in Zig. Use += 1.
    var counter: i32 = 5;
    counter += 1;
    print("\nUnary: counter = {d}\n", .{counter});
    print("Unary negation: {d}\n", .{-counter});

    // Array/slice operators: `++` concat, `**` repeat (both comptime); `.len`
    // Pointer: `&x` address-of, `p.*` deref, `p.?` (optional unwrap)
    // Optional: `orelse`, `.?`      Error: `catch`, `try`
    // Type checks: @TypeOf(x), @typeName(T), @sizeOf(T)
    print("\n@TypeOf(x) = {s}, @sizeOf(i32) = {d} bytes\n\n", .{ @typeName(@TypeOf(x)), @sizeOf(i32) });

    // ==========================================
    // 5. CONDITIONALS (IF FAMILY)
    // ==========================================
    // Condition must be a `bool` (or an optional / error union in the payload-capture forms).
    // NO parentheses-less form: parentheses ARE required around the condition; braces are optional.
    // No implicit truthiness: `if (1)` and `if (ptr)` are errors.
    if (var_i32 > 0 and var_bool) {
        // executes if condition is true
    } else if (!var_bool) {
        if (arr_int[0] == 10) {
            // nested
        }
    } else {
        // fallback
    }

    // `if` with an optional: the |capture| is the unwrapped value
    const opt_name: ?[]const u8 = "Alice";
    if (opt_name) |name| {
        print("Optional name: {s}\n", .{name});
    } else {
        print("No name\n", .{});
    }
    // `if` with an error union
    if (divide(8, 2)) |val| {
        print("divide ok: {d}\n", .{val});
    } else |err| {
        print("divide failed: {s}\n", .{@errorName(err)});
    }

    // ==========================================
    // 6. SWITCH STATEMENT
    // ==========================================
    // switch is an EXPRESSION, must be EXHAUSTIVE (every value handled or `else`).
    // No fall-through; no `break` needed. Works with integers, enums, tagged unions, bool, errors.
    const switch_var: u8 = 2;
    switch (switch_var) {
        1 => print("one\n", .{}),
        2, 3 => print("two or three\n", .{}), // multiple values with commas (NOT fall-through)
        4...10 => print("four to ten\n", .{}), // inclusive range with ...
        else => print("something else\n", .{}), // required unless all values are covered
    }

    // As an expression, returns a value; branches can be blocks
    const label = switch (switch_var) {
        1 => "one",
        2, 3 => "two-three",
        else => "many",
    };
    print("Switch result: {s}\n", .{label});

    // Switch on enum: no `else` needed when all tags are covered (adding a tag later = compile error, great!)
    const c = Color.green;
    switch (c) {
        .red => print("red\n", .{}),
        .green => print("green\n", .{}),
        .blue => print("blue\n", .{}),
    }
    print("Level.mid as int: {d}, warm: {}\n", .{ @intFromEnum(Level.mid), Color.red.isWarm() });

    // Switch on tagged union with payload capture
    const v: Value = .{ .float = 2.5 };
    switch (v) {
        .int => |i| print("int {d}\n", .{i}),
        .float => |fl| print("float {d}\n", .{fl}),
        .none => print("none\n", .{}),
    }

    // Switch on strings is NOT supported. Use if/else with std.mem.eql, or std.StaticStringMap.

    // ==========================================
    // 7. TERNARY
    // ==========================================
    // No `? :` operator. `if` is an expression, so use it inline:
    const age: u8 = 20;
    const status = if (age >= 18) "Adult" else "Minor";
    print("Status: {s}\n", .{status});

    // Nested
    const score: u8 = 85;
    const grade = if (score >= 90) "A" else if (score >= 80) "B" else if (score >= 70) "C" else "F";
    print("Grade: {s}\n\n", .{grade});

    // ==========================================
    // 8. LOOPS
    // ==========================================
    // while: `while (cond) : (continue_expression) { }`  - continue expression runs after each iteration
    var w: u32 = 0;
    while (w < 3) : (w += 1) {
        // do something
    }

    // No do-while. Emulate with `while (true) { ...; if (!cond) break; }`
    var dw: u32 = 0;
    while (true) {
        dw += 1;
        if (!(dw < 0 + 1)) break; // body ran once, then condition checked at the END
    }

    // for: iterates over ARRAYS, SLICES, and RANGES (not over ints alone)
    for (0..5) |i| { // range 0,1,2,3,4 (end exclusive); `i` is usize
        if (i == 2) continue; // skip iteration
        if (i == 4) break; // exit loop
        print("i = {d}\n", .{i});
    }

    // Iterate a slice/array by value
    const fruits = [_][]const u8{ "Apple", "Banana", "Cherry" };
    for (fruits) |fruit| print("Fruit: {s}\n", .{fruit});

    // With index: iterate over multiple sequences in lockstep (must have equal length)
    for (fruits, 0..) |fruit, idx| print("{d}: {s}\n", .{ idx, fruit });

    // Mutating elements: capture by POINTER (*)
    var nums = [_]i32{ 1, 2, 3 };
    for (&nums) |*n| n.* *= 10; // note &nums and |*n|
    print("Mutated: {any}\n", .{nums});

    // while with optional/error unions (iterator pattern): loop ends when `next()` returns null
    var it2 = std.mem.splitScalar(u8, "a,b,c", ',');
    while (it2.next()) |part| print("part: {s}\n", .{part});

    // Loops are EXPRESSIONS: `else` branch runs if loop finishes without `break`; `break value` returns a value
    const found: ?usize = for (fruits, 0..) |fruit, idx| {
        if (std.mem.eql(u8, fruit, "Banana")) break idx;
    } else null;
    print("Found Banana at: {?d}\n", .{found});

    // Labeled loops / blocks: break out of an outer loop
    outer: for (1..4) |i| {
        for (1..4) |j| {
            if (i * j == 4) {
                print("Breaking outer at i={d}, j={d}\n", .{ i, j });
                break :outer;
            }
        }
    }

    // Nested loops
    for (1..4) |i| {
        for (1..4) |j| print("({d},{d}) ", .{ i, j });
        print("\n", .{});
    }

    // `inline for` / `inline while`: unrolled at COMPTIME (needed for iterating over types/tuples)
    inline for (.{ 1, "two", 3.0 }) |item| print("tuple item type: {s}\n", .{@typeName(@TypeOf(item))});

    // ==========================================
    // 9. INPUT / OUTPUT
    // ==========================================
    // (a) std.debug.print -> stderr, quick debugging (used throughout this file).
    // (b) Buffered stdout via the Io interface (0.16):
    //       - create a buffer,
    //       - make a writer from File.stdout() + io,
    //       - use `&writer.interface`,
    //       - and FLUSH, otherwise nothing appears!
    var stdout_buffer: [1024]u8 = undefined;
    var stdout_writer = std.Io.File.stdout().writer(io, &stdout_buffer);
    const stdout = &stdout_writer.interface;
    try stdout.print("Message via buffered stdout: {d}\n", .{42});
    try stdout.writeAll("writeAll writes raw bytes\n");
    try stdout.flush(); // <-- don't forget

    // Standard input (uncomment to test). Same idea: buffer -> reader -> interface.
    //   var stdin_buffer: [1024]u8 = undefined;
    //   var stdin_reader = std.Io.File.stdin().reader(io, &stdin_buffer);
    //   const stdin = &stdin_reader.interface;
    //   try stdout.writeAll("Enter your name: ");
    //   try stdout.flush();
    //   if (try stdin.takeDelimiter('\n')) |line| {     // null at EOF; line excludes the '\n'
    //       const trimmed = std.mem.trim(u8, line, " \r\n");
    //       try stdout.print("Hello, {s}!\n", .{trimmed});
    //   }
    //   // takeDelimiterExclusive / takeDelimiterInclusive are variants; the slice points INTO the reader buffer
    //   // (valid only until the next read). A line longer than the buffer -> error.StreamTooLong.
    //
    // Command-line args (the Init.minimal.args / init.minimal.args field), env vars: init.environ_map.
    // File I/O: std.Io.Dir.cwd().openFile(io, "file.txt", .{}) - all file operations take `io`.

    // ==========================================
    // 10. FORMATTING
    // ==========================================
    // Format strings are checked at COMPILE TIME (wrong specifier/arg count = compile error).
    //   {}     default for the type       {d}   decimal (ints and floats)
    //   {s}    string ([]const u8)        {c}   one ASCII byte as a character
    //   {x} {X} hex lower/upper           {b}   binary       {o}  octal
    //   {e}    scientific                 {any} debug-print ANY type   {*} pointer address
    //   {u}    Unicode code point         {?d}  optional value (prints "null" when null)
    //   {!d}   error union                {t}   @tagName / @errorName
    // Syntax: {[position][specifier]:[fill][alignment][width].[precision]}
    const price: f64 = 19.9934;
    print("Price: ${d:.2}\n", .{price}); // 2 decimals
    print("Padded right-aligned: [{d:>8}]\n", .{42});
    print("Padded left-aligned:  [{s:<8}]\n", .{"Apple"});
    print("Centered:             [{s:^9}]\n", .{"mid"});
    print("Zero padded:          [{d:0>5}]\n", .{42});
    print("Custom fill:          [{s:*>8}]\n", .{"hi"});
    print("Hex: {x}, HEX: {X}, binary: {b}, octal: {o}\n", .{ 255, 255, 5, 8 });
    print("Hex with 0x prefix + pad: 0x{x:0>4}\n", .{255});
    print("Scientific: {e}\n", .{123456.789});
    print("Positional: {1s}, {0s}, {1s}\n", .{ "Zero", "One" });
    print("Escaping braces: {{ and }}\n", .{});
    print("Struct: {any}\n", .{Point{ .x = 1, .y = 2 }});
    print("Enum: {t} = {d}\n", .{ Color.blue, @intFromEnum(Color.blue) });
    print("Optional: {?d} and {?d}\n", .{ @as(?i32, 5), @as(?i32, null) });
    print("Array with {{any}}: {any}\n", .{arr_int});

    // Format into a buffer (no allocation): std.fmt.bufPrint -> returns the used slice
    var fmt_buf: [32]u8 = undefined;
    const formatted = try std.fmt.bufPrint(&fmt_buf, "id-{d:0>4}", .{7});
    print("bufPrint: {s}\n", .{formatted});
    // Format with allocation (you free): std.fmt.allocPrint(gpa, ...)
    // Comptime formatting: std.fmt.comptimePrint("{d}", .{123})
    const ct = std.fmt.comptimePrint("{d}-{s}", .{ 1, "x" });
    print("comptimePrint: {s}\n\n", .{ct});

    // ==========================================
    // 10. PARSING & TYPE CONVERSION (Casting)
    // ==========================================
    // Zig has NO implicit lossy conversions. Widening that can't lose information is automatic
    // ("peer type resolution"); everything else needs an explicit builtin (all start with @).
    //   @as(T, x)           - explicit safe coercion (never lossy)
    //   @intCast(x)         - int -> int of another size/sign (SAFETY-CHECKED: panics if it doesn't fit)
    //   @truncate(x)        - int -> narrower int, drops the high bits (never panics)
    //   @floatFromInt(x)    - int -> float
    //   @intFromFloat(x)    - float -> int (truncates toward zero; panics if out of range)
    //   @floatCast(x)       - float -> other float size
    //   @intFromBool, @intFromEnum, @enumFromInt, @intFromPtr, @ptrFromInt
    //   @bitCast(x)         - reinterpret the same bits as another type of the same size
    //   @ptrCast(p)         - reinterpret pointer type (dangerous)
    // The RESULT TYPE is inferred from context, so declare the destination type:
    const small_i: i8 = 100;
    const wide: i32 = small_i; // implicit widening OK (i8 -> i32)
    const big: i32 = 300;
    const narrowed: u8 = @intCast(@as(i32, 200)); // OK at runtime, value fits
    const truncated: u8 = @truncate(@as(u32, big)); // 300 & 0xFF = 44
    const as_float: f64 = @floatFromInt(big);
    const trunc_int: i32 = @intFromFloat(3.99); // 3
    print("widened: {d}, narrowed: {d}, truncated 300 -> u8: {d}\n", .{ wide, narrowed, truncated });
    print("int->float: {d:.1}, float->int (3.99): {d}\n", .{ as_float, trunc_int });
    print("bitCast f32 1.0 -> u32: 0x{x}\n", .{@as(u32, @bitCast(@as(f32, 1.0)))});
    print("bool -> int: {d}, u8 char + 1: {c}\n", .{ @intFromBool(true), var_char + 1 });

    // Parsing Strings to Numbers (returns an ERROR UNION - handle it!)
    const str_num = "42";
    const parsed_int = try std.fmt.parseInt(i32, str_num, 10); // base 10
    const parsed_hex = try std.fmt.parseInt(i32, "FF", 16);
    const parsed_auto = try std.fmt.parseInt(i32, "0xFF", 0); // base 0 = detect prefix (0x, 0b, 0o)
    const parsed_float = try std.fmt.parseFloat(f64, "3.14");
    print("parseInt('42') = {d}, hex FF = {d}, auto 0xFF = {d}, parseFloat = {d:.2}\n", .{ parsed_int, parsed_hex, parsed_auto, parsed_float });

    // Safe parsing: handle failure explicitly
    const bad = std.fmt.parseInt(i32, "apple", 10) catch |err| blk: {
        print("Parse error: {s}\n", .{@errorName(err)}); // InvalidCharacter
        break :blk 0;
    };
    print("bad -> {d}\n", .{bad});
    // Possible errors: error.InvalidCharacter, error.Overflow (e.g. parseInt(u8, "300", 10))

    // Converting Numbers to Strings
    var num_buf: [20]u8 = undefined;
    const num_str = try std.fmt.bufPrint(&num_buf, "{d}", .{99}); // slice INTO num_buf
    print("Number 99 as string: \"{s}\"\n", .{num_str});
    // Or heap: const s = try std.fmt.allocPrint(gpa, "{d}", .{99}); defer gpa.free(s);

    // Enum <-> string:  @tagName(Color.red) gives "red"; std.meta.stringToEnum(Color, "red") gives ?Color
    print("@tagName: {s}, stringToEnum('green'): {?}\n", .{ @tagName(Color.red), std.meta.stringToEnum(Color, "green") });

    // Character helpers
    print("isDigit('7'): {}, isAlpha('x'): {}, toUpper('a'): {c}\n", .{ std.ascii.isDigit('7'), std.ascii.isAlphabetic('x'), std.ascii.toUpper('a') });

    // Math helpers
    print("@sqrt(16) = {d}, @abs(-4) = {d}, @min(3, 9) = {d}, @max(3, 9) = {d}, pow = {d}\n", .{ @sqrt(@as(f64, 16)), @abs(@as(i32, -4)), @min(3, 9), @max(3, 9), std.math.pow(i32, 2, 10) });

    // ==========================================
    // 11 & 12. CALLING FUNCTIONS & PASS BY VALUE / REFERENCE
    // ==========================================
    // Function returning a value
    const sum = add(5, 10);
    print("add(5, 10) = {d}\n", .{sum});
    print("factorial(5) = {d}\n", .{factorial(5)});
    print("Generic max: {d} and {d:.1}\n", .{ maxOf(i32, 3, 9), maxOf(f64, 2.5, 1.5) });
    print("Multiple returns: {any}\n", .{minMax(&[_]i32{ 4, 9, 1, 7 })});

    // ALL parameters are IMMUTABLE inside the function (you can't do `a = 5` on a parameter).
    // Primitives are passed by VALUE (a copy). Large structs/arrays may be passed by reference under the hood
    // by the compiler (an optimization), which is why params are const: the semantics stay "by value".

    // Pass by Value
    var original_val: i32 = 10;
    print("\nBefore passByValue: {d}\n", .{original_val});
    demonstratePassByValue(original_val);
    print("After passByValue: {d} (unchanged)\n", .{original_val});

    // Pass by Reference (via POINTER: caller writes &, callee writes .*)
    print("\nBefore passByPointer: {d}\n", .{original_val});
    demonstratePassByPointer(&original_val);
    print("After passByPointer: {d} (changed!)\n", .{original_val});

    // Pass by const pointer: read-only, avoids copying big structs
    var person = Person.init("Alice", 30);
    person.describe();
    person.birthday(); // same as Person.birthday(&person)
    person.describe();
    printPerson(&person);

    // Slices are "pointer + length": passed by value, but they REFERENCE the same memory
    var slice_data = [_]i32{ 1, 2, 3, 4, 5 };
    print("\nArray before: {any}\n", .{slice_data});
    demonstrateSlicePass(&slice_data); // &array coerces to []i32
    print("Array after: {any}\n", .{slice_data});
    print("sumAll = {d}\n\n", .{sumAll(&slice_data)});

    // Anonymous struct literals / tuples
    const pt = Point{ .x = 3, .y = 4 };
    const pair = Pair(i32){ .first = 1, .second = 2 };
    const anon = .{ .a = 1, .b = "two" }; // anonymous struct
    const tuple = .{ 1, "two", 3.0 }; // tuple: fields are 0, 1, 2
    print("Point: {d},{d}  Pair: {d},{d}  anon.b: {s}  tuple[1]: {s}\n", .{ pt.x, pt.y, pair.first, pair.second, anon.b, tuple[1] });
    print("Value tag: {t}, Level.high: {d}\n", .{ std.meta.activeTag(v), @intFromEnum(Level.high) });

    return; // `main` returning void (or an error) -> exit code 0
}

// ==========================================
// FUNCTION DEFINITIONS (order in file doesn't matter)
// ==========================================

fn add(a: i32, b: i32) i32 {
    return a + b;
}

// Error set: enumerates possible errors. Errors are values: `error.Name`
const MathError = error{DivideByZero};

// Returns `MathError!i32`: an i32 OR a MathError
fn divide(a: i32, b: i32) MathError!i32 {
    if (b == 0) return error.DivideByZero;
    return @divTrunc(a, b);
}

// Recursion
fn factorial(n: u64) u64 {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

// Generic function: `comptime T: type` is a parameter that exists only at compile time.
// The compiler generates a separate specialized copy per T (monomorphization). No runtime cost.
fn maxOf(comptime T: type, a: T, b: T) T {
    return if (a > b) a else b;
}

// Multiple return values: return a struct / tuple
fn minMax(numbers: []const i32) struct { min: i32, max: i32 } {
    var lo = numbers[0];
    var hi = numbers[0];
    for (numbers) |n| {
        if (n < lo) lo = n;
        if (n > hi) hi = n;
    }
    return .{ .min = lo, .max = hi };
}

// Pass by Value: `val` is a local copy. Parameters can't be reassigned, so make a mutable copy with `var`.
fn demonstratePassByValue(val: i32) void {
    var copy = val;
    copy = 999;
    print("Inside function (pass by value): {d}\n", .{copy});
}

// Pass by Pointer: `*i32` is a pointer to the caller's variable. `ptr.* = ...` writes through it.
fn demonstratePassByPointer(ptr: *i32) void {
    ptr.* = 999;
    print("Inside function (pass by pointer): {d}\n", .{ptr.*});
}

// `*const T`: read-only pointer (a common way to avoid copying large structs)
fn printPerson(p: *const Person) void {
    print("Person: {s}, {d}, {d:.2}m\n", .{ p.name, p.age, p.height });
}

// Slice parameter: `[]i32` mutable view / `[]const i32` read-only view. Works with arrays of ANY length.
fn demonstrateSlicePass(arr: []i32) void {
    arr[0] = 999; // modifies the original array
    print("Inside function (slice modified): [{d}, ...]\n", .{arr[0]});
}

fn sumAll(numbers: []const i32) i32 {
    var total: i32 = 0;
    for (numbers) |n| total += n;
    return total;
}

// Variadic: Zig has no C-style varargs (except extern). Options:
//   1. Accept a slice:            fn sum(nums: []const i32)
//   2. Accept a tuple:            fn log(args: anytype)        (`anytype` = compile-time duck typing)
//   3. Use `comptime` args like std.debug.print's `.{ ... }` format-args tuple.
fn countArgs(args: anytype) usize {
    return args.len;
}

// Tests live next to the code. Run with: zig test notes.zig
test "add works" {
    try std.testing.expectEqual(@as(i32, 15), add(5, 10));
    try std.testing.expectEqual(@as(usize, 3), countArgs(.{ 1, 2, 3 }));
    try std.testing.expectError(error.DivideByZero, divide(1, 0));
}