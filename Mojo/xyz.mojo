# Recommend reading the Python notes first (Mojo is a Python superset-in-spirit)
# NOTE: Mojo evolves fast. Renames to be aware of:
#   inout -> mut, owned -> var (argument conventions), alias -> comptime (newer builds)
#   `let` was REMOVED. Use `var` (or just assign, in `def` functions).

from collections import List, Dict, Optional
from memory import UnsafePointer

# Global variable (module-level `var` support is limited; prefer comptime constants)
# ==========================================
# 1. BASICS OF VARIABLES & CONSTANTS
# ==========================================
# Two function flavors:
#   def -> Python-like, dynamic-ish, implicit `var` declarations, errors allowed (raises)
#   fn  -> strict, statically typed, args are immutable by default, must declare `raises`
#
# Constants (compile-time):
# `alias` = compile-time constant, evaluated by the compiler, zero runtime cost.
alias PI = 3.14159
alias MAX_BUFFER = 1024
# (newer versions: `comptime PI = 3.14159`)


fn main() raises:
    print("Hello World")

    # `var` = mutable variable. Type is inferred or explicit.
    var x = 5             # inferred Int
    var y: Int = 10       # explicit type
    y = 15                # mutable
    # Block scope: variables die at the end of their indented block
    if True:
        var block_var = 25
        print("Block var:", block_var)
    # block_var is not accessible here!

    # ==========================================
    # 2. DATA TYPES - BUILT-IN PRIMITIVES
    # ==========================================
    # Mojo primitives are all library structs backed by MLIR types (no special-casing).
    # Int is the machine word (64-bit on 64-bit systems) - the default integer.
    #
    # Signed:   Int8, Int16, Int32, Int64, Int (word-size)
    # Unsigned: UInt8, UInt16, UInt32, UInt64, UInt (word-size)
    var v_i8: Int8 = 127
    var v_i32: Int32 = 2_147_483_647
    var v_u8: UInt8 = 255
    var v_int: Int = 9_223_372_036_854_775_807

    # Floating point: Float16, Float32, Float64 (default for literals), BFloat16
    var v_f32: Float32 = 3.14
    var v_f64: Float64 = 3.141592653589793

    # Boolean: True / False (capitalised, like Python)
    var v_bool: Bool = True

    # String: UTF-8, heap-backed, owned. (No separate char type -> String of len 1)
    var v_str: String = "Hello"

    # SIMD: THE Mojo special type. Scalar types are just SIMD of width 1.
    # SIMD[DType.float32, 4] = 4 floats processed in ONE CPU instruction.
    var vec = SIMD[DType.float32, 4](1.0, 2.0, 3.0, 4.0)
    var doubled = vec * 2  # elementwise, hardware-vectorised
    print("SIMD:", doubled)

    print("Int8:", v_i8, "Int32:", v_i32, "UInt8:", v_u8)
    print("Float32:", v_f32, "Float64:", v_f64, "Bool:", v_bool)

    # ==========================================
    # 3. REFERENCE TYPES (COLLECTIONS, POINTERS, HEAP)
    # ==========================================
    # --- List (dynamic array, heap-allocated, like Python list but TYPED) ---
    var nums = List[Int](10, 20, 30, 40)
    nums.append(50)
    print("List len:", len(nums), "nums[0]:", nums[0], "last:", nums[-1])

    # --- Dict (hash map) ---
    var ages = Dict[String, Int]()
    ages["Alice"] = 30
    ages["Bob"] = 25
    print("Alice:", ages["Alice"])

    # --- Optional: Mojo's safe "null" ---
    # There is no null for normal values. Use Optional[T].
    var some_val: Optional[Int] = 5
    var no_val: Optional[Int] = None
    if some_val:
        print("Has value:", some_val.value())
    if not no_val:
        print("Empty optional")

    # --- Pointers ---
    # Mojo has *references* (safe, compiler-checked) and *UnsafePointer* (manual, like C).
    var target = 42
    var ptr = UnsafePointer[Int].alloc(1)   # heap allocate 1 Int
    ptr[0] = 100                             # dereference via index
    print("Heap value:", ptr[0])
    ptr.free()                               # MUST free manually (no GC)

    # Mojo has NO garbage collector. It uses OWNERSHIP + lifetimes (like Rust)
    # but with ASAP destruction: a value is destroyed after its LAST USE, not end of scope.

    # ==========================================
    # 4. OPERATORS
    # ==========================================
    var a = 10
    var b = 3
    # Arithmetic: + - * / // % **
    print(a + b, a - b, a * b)
    print("True div:", a / b)      # 3.333.. (Float64) - like Python
    print("Floor div:", a // b)    # 3
    print("Modulo:", a % b)        # 1
    print("Power:", a ** b)        # 1000
    # Comparison: == != > < >= <=
    # Logical: and, or, not      (words, NOT && || !)
    print(True and False, True or False, not True)
    # Bitwise: & | ^ ~ << >>
    print(5 & 3, 5 | 3, 5 << 1)
    # Assignment: = += -= *= /= //= %= **= &= |= ^= <<= >>=
    var counter = 5
    counter += 1     # NO ++ or -- in Mojo
    # Identity / membership: `is`, `is not`, `in`, `not in`
    print(20 in nums)

    # ==========================================
    # 5. CONDITIONALS (IF FAMILY)
    # ==========================================
    # Indentation-based. Conditions must be Bool-convertible.
    var condition = False
    if condition:
        pass
    elif a > b:
        if a > 5:
            pass   # nested
    else:
        pass

    # ==========================================
    # 6. SWITCH
    # ==========================================
    # Mojo has NO switch/match statement (yet). Use if / elif chains.
    var sw = 2
    if sw == 1:
        print("one")
    elif sw == 2 or sw == 3:
        print("two or three")
    else:
        print("default")

    # ==========================================
    # 7. TERNARY
    # ==========================================
    # Python style: true_val if condition else false_val
    var age = 20
    var status = "Adult" if age >= 18 else "Minor"
    var score = 85
    var grade = "A" if score >= 90 else "B" if score >= 80 else "C" if score >= 70 else "F"
    print("Grade:", grade)

    # ==========================================
    # 8. LOOPS
    # ==========================================
    var w = 0
    while w < 3:
        w += 1

    # for over range (exclusive end)
    for i in range(5):
        if i == 2:
            continue      # skip
        if i == 4:
            break         # exit loop
    for i in range(1, 10, 2):   # start, stop, step
        pass

    # for-each over collection (reference semantics: `item` is an immutable ref)
    for item in nums:
        print(item)       # item is a reference to the element

    # while-else / for-else exist too. Nested loops:
    for i in range(1, 4):
        for j in range(1, 4):
            print("(", i, ",", j, ")", end=" ")
        print()

    # ==========================================
    # 9. INPUT / OUTPUT
    # ==========================================
    # print(*values, sep=" ", end="\n")
    print("A", "B", "C", sep="-", end="!\n")
    # Input: reads a line from stdin (returns String, strips newline)
    # var name = input("Enter name: ")

    # ==========================================
    # 10. FORMATTING
    # ==========================================
    # No f-strings (yet). Options:
    #   1. String concatenation with +  (values must be String)
    #   2. String.format() with {} placeholders
    #   3. String(x) conversion
    var name = "Alice"
    print("Hello, " + name + "! Age: " + String(age))
    print("{} is {} years old".format(name, age))
    # Float precision: no printf. Convert then slice, or use library helpers.

    # ==========================================
    # 11. PARSING & TYPE CONVERSION
    # ==========================================
    # Implicit: Mojo allows int literal -> Float64, but is strict otherwise.
    var f: Float64 = 3.99
    var trunc = Int(f)            # explicit cast, truncates -> 3
    var as_float = Float64(a)     # Int -> Float64
    # String -> number (can raise!)
    var parsed_int = atol("42")   # String -> Int
    var parsed_flt = atof("3.14") # String -> Float64
    var to_str = String(99)       # number -> String
    print(trunc, as_float, parsed_int, parsed_flt, to_str)
    # A failed parse RAISES an error -> function must be `raises` (main is).

    # ==========================================
    # 12. CALLING FUNCTIONS & PASS BY VALUE / REFERENCE
    # ==========================================
    print("add(5, 10) =", add(5, 10))

    var v = 10
    print("Before read_arg:", v)
    read_arg(v)
    print("After read_arg:", v, "(unchanged, immutable borrow)")

    mut_arg(v)
    print("After mut_arg:", v, "(changed!)")

    var s = String("Hello")
    take_ownership(s^)        # `^` = transfer (move) ownership. `s` is dead afterwards.
    # print(s)  # ERROR: s was moved

    var copy_me = String("copy")
    take_copy(copy_me)         # copies if function needs an owned value
    print("Still valid:", copy_me)

    print("sum_all =", sum_all(nums))
    print("with default:", greet())
    print("keyword arg:", greet(name="Bob"))

    # ==========================================
    # 13. STRUCTS
    # ==========================================
    var p = Person("Alice", 30, 1.65)
    p.birthday()
    print(p.name, p.age)

    var pt = Point(3, 4)
    print("Distance^2:", pt.dist_sq())

    return


# ==========================================
# 12. FUNCTION DEFINITIONS
# ==========================================
# fn name(args) -> ReturnType:
# ARGUMENT CONVENTIONS (the heart of Mojo memory model):
#   read  (default): immutable borrow. No copy. Cannot modify.   <- pass by const reference
#   mut   (was inout): mutable borrow. Modifies caller's value.  <- pass by reference
#   var   (was owned): takes ownership. Caller gives up or copies. <- pass by move/value
#   out   : the return slot (used for __init__ `out self`)
#   ref   : generic reference with lifetime/mutability parameter

fn add(a: Int, b: Int) -> Int:
    return a + b

fn read_arg(val: Int):           # implicit `read`
    # val = 999   # ERROR: immutable
    print("Inside read_arg:", val)

fn mut_arg(mut val: Int):        # `mut` -> modifies original
    val = 999
    print("Inside mut_arg:", val)

fn take_ownership(var s: String):  # (older: `owned s: String`)
    print("Owns:", s)
    # s destroyed after last use (ASAP destruction)

fn take_copy(var s: String):
    s += "!"                       # modifies the local copy only
    print("Local copy:", s)

# Default & keyword arguments
fn greet(name: String = "World") -> String:
    return "Hello, " + name

# Collections are passed by immutable borrow by default -> cheap
fn sum_all(numbers: List[Int]) -> Int:
    var total = 0
    for n in numbers:
        total += n
    return total

# Compile-time parameters (generics) in [] brackets:
fn repeat[count: Int](msg: String):
    @parameter
    for _ in range(count):     # unrolled at compile time
        print(msg)

# ==========================================
# 13. STRUCTS (Mojo has no `class` yet)
# ==========================================
# Structs are static, compile-time laid out (like C structs + methods). No inheritance.
struct Person:
    var name: String
    var age: Int
    var height: Float32

    # Constructor: `out self` (self is being created)
    fn __init__(out self, name: String, age: Int, height: Float32):
        self.name = name
        self.age = age
        self.height = height

    # Method: `self` is an immutable borrow by default. `mut self` to modify.
    fn birthday(mut self):
        self.age += 1

# @value decorator auto-generates __init__, __copyinit__, __moveinit__
@value
struct Point:
    var x: Int
    var y: Int

    fn dist_sq(self) -> Int:
        return self.x * self.x + self.y * self.y

# Traits = interfaces (compile-time checked)
trait Speaker:
    fn speak(self) -> String: ...
