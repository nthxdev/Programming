# Recommend reading the Python notes and the C notes first
# Nim = Python-like syntax + compiles to C (or C++/JS) -> native speed.
# Run:      nim c -r notes.nim          (compile + run)
# Release:  nim c -d:release notes.nim  (optimised)
# Nim is STYLE-INSENSITIVE: my_var, myVar, myvar are the SAME identifier
#   (except the first letter: Foo != foo). Convention: camelCase for vars/procs, PascalCase for types.

import std/[strutils, strformat, sequtils, tables, options, math, algorithm]

# Comments:
## Double hash = documentation comment (goes in generated docs)
#[
  Multi-line comment
  #[ can nest ]#
]#

# ==========================================
# 13. FUNCTION DECLARATION (FORWARD DECLARATIONS)
# ==========================================
# Nim needs procs declared before use, BUT you can forward-declare with a bodiless signature.
proc addNumbers(a, b: int): int          # forward declaration (body defined later)
proc demonstratePassByValue(val: int)
proc demonstratePassByRef(val: var int)
proc sumAll(numbers: openArray[int]): int

# ==========================================
# 14. SPECIAL DATA TYPES - OBJECTS, TUPLES, ENUMS
# ==========================================
# Object: value type (lives on the stack, COPIED on assignment) - like a C struct
type
  Person = object
    name: string
    age: int
    height: float

  # Ref object: reference type (heap allocated, garbage collected / ARC)
  Node = ref object
    value: int
    next: Node          # nil by default

  # Enum
  Color = enum
    Red, Green, Blue

  # Alias / distinct types
  Number = int                    # plain alias: interchangeable with int
  Meters = distinct float         # NEW type: can't mix with float without conversion

  # Tuple: lightweight anonymous-or-named record
  Point = tuple[x: int, y: int]

# Global variable - module-level `var` is visible to everything below
var globalVar = 0

# ==========================================
# 1. BASICS OF VARIABLES & CONSTANTS
# ==========================================
# THREE declaration keywords:
#   var   -> mutable variable (runtime)
#   let   -> immutable variable, assigned ONCE at runtime (value may come from runtime)
#   const -> immutable, MUST be computable at COMPILE time (like constexpr)
const PI = 3.14159
const MAX_BUFFER = 1024
const Squares = [1, 4, 9, 16]      # compile-time evaluated array

echo "Hello World"                 # echo = print + newline (no parens needed)

var x = 5                          # mutable, type inferred: int
x = 6
let y = 10                         # immutable
# y = 11                           # ERROR: 'y' cannot be assigned to
var z: int = 15                    # explicit type
var defaultInt: int                # ZERO-initialised (0). Nim never leaves garbage.

# Block scope: `block` creates a scope (and can be named/broken out of)
block:
  var blockVar = 25
  echo "Block var: ", blockVar
# blockVar is not accessible here!

# Multiple declarations
var
  a = 1
  b = 2

# ==========================================
# 2. DATA TYPES - BUILT-IN PRIMITIVES
# ==========================================
# Integers:
#   int  (word size: 64-bit on 64-bit OS)  <- default. Also int8, int16, int32, int64
#   uint (word size unsigned) uint8, uint16, uint32, uint64
#   Overflow: with checks on (default, non-release) raises OverflowDefect.
let vInt: int = 9_223_372_036_854_775_807     # _ separators allowed
let vI8: int8 = 127
let vU8: uint8 = 255'u8                       # type suffix on literal
let vI32 = 42'i32
let vHex = 0xFF                               # also 0b1010 binary, 0o17 octal

# Floats: float (= float64, default), float32, float64. IEEE 754.
let vFloat = 3.141592653589793                # float64
let vF32 = 3.14'f32

# Boolean: bool -> true / false  (NOT truthy: `if 1:` is a compile error)
let vBool: bool = true

# Character: char = 1 byte (ASCII / raw byte). Single quotes.
let vChar: char = 'A'
# Unicode: Rune from std/unicode. string is a sequence of BYTES (UTF-8 by convention).

# String: mutable by default when declared with `var`. Double quotes.
var vStr = "Hello"

echo "int: ", vInt, ", i8: ", vI8, ", u8: ", vU8
echo "float: ", vFloat, ", f32: ", vF32
echo "bool: ", vBool, ", char: ", vChar, ", str: ", vStr
echo "sizeof(int) = ", sizeof(int), " bytes"
echo "high(int) = ", high(int), ", low(int8) = ", low(int8)

# ==========================================
# 3. REFERENCE TYPES (SEQ, ARRAY, REF, PTR, HEAP)
# ==========================================
# --- array: FIXED size, stack, size is part of the type ---
var arr: array[4, int] = [10, 20, 30, 40]
echo "Array: ", arr, ", len: ", arr.len, ", arr[0]: ", arr[0]
# Arrays are 0-indexed. Custom range possible: array[1..3, int]

# --- seq: DYNAMIC array (heap-allocated, growable) like Vec / vector / list ---
var s: seq[int] = @[1, 2, 3]        # @ turns array literal into seq
s.add(4)                            # push
s.add([5, 6])                       # extend
echo "Seq: ", s, ", len: ", s.len, ", last: ", s[^1]    # ^1 = index from END
echo "Slice: ", s[1..3], " (inclusive), s[1..<3]: ", s[1..<3]   # ..< exclusive

# --- openArray: parameter type accepting BOTH array and seq (a view, no copy) ---

# --- Table (hash map) ---
var ages = {"Alice": 30, "Bob": 25}.toTable
ages["Carol"] = 41
echo "Alice: ", ages["Alice"], ", has Bob: ", "Bob" in ages
echo "getOrDefault: ", ages.getOrDefault("Zed", -1)
# ages["Zed"] -> raises KeyError

# --- Set ---
var seen = {1, 2, 3}                # built-in set (small ordinal types only)
seen.incl(4)

# --- Strings ---
var text = "Hello World"
echo "Length: ", text.len, ", first: ", text[0], ", last: ", text[^1]
echo "Substring: ", text[0..4]                      # "Hello" (inclusive!)
echo "Upper: ", text.toUpperAscii, ", replace: ", text.replace("World", "Nim")
echo "Concat: ", "Hello" & " " & "Nim"             # & is string concatenation (NOT +)
text.add("!")                                       # append in place
echo "Contains: ", "World" in text, ", find: ", text.find("World")
echo "Split: ", "a,b,c".split(','), ", join: ", @["x", "y"].join("-")
echo "Strip: '", "  hi  ".strip, "'"
# Strings are VALUE types (copied on assignment) unless shared via `ref`/move.

# --- Tuple ---
let pt: Point = (x: 3, y: 4)
echo "Point: ", pt, ", pt.x = ", pt.x
let (px, py) = pt                    # destructuring

# --- Objects (value) and ref objects (reference) ---
var p1 = Person(name: "Alice", age: 30, height: 1.65)
var p2 = p1                          # COPY: independent
p2.age = 99
echo "p1.age: ", p1.age, " p2.age: ", p2.age    # 30 / 99

var n1 = Node(value: 1)
var n2 = n1                          # SAME object (reference)
n2.value = 99
echo "n1.value: ", n1.value          # 99 !

# --- ptr / addr (raw, unsafe - like C pointers) ---
var target = 42
let ptrInt: ptr int = addr target    # address-of
echo "Deref: ", ptrInt[]             # [] dereferences  (NOT *ptrInt)
ptrInt[] = 100
echo "target now: ", target

# --- Heap allocation ---
# Nim uses ref / seq / string for the heap: managed automatically.
# Default memory manager: ARC/ORC (deterministic ref-counting, no stop-the-world GC).
# Manual (unsafe) allocation exists:
let raw = cast[ptr int](alloc0(sizeof(int)))
raw[] = 7
echo "Manual heap: ", raw[]
dealloc(raw)                         # MUST free manually if you `alloc`

# --- nil / Option ---
# `nil` exists ONLY for ref and ptr types. Value types (int, string, seq) can't be nil.
var nothing: Node = nil
echo "Is nil: ", nothing.isNil
# Option[T] (safe absence) from std/options:
let someVal = some(5)
let noVal = none(int)
echo "Some: ", someVal, ", None: ", noVal
if someVal.isSome: echo "Got: ", someVal.get
echo "getOrDefault: ", noVal.get(0)

# ==========================================
# 4. OPERATORS
# ==========================================
let m = 10
let n = 3
# Arithmetic: +, -, *, /, div, mod
#   /    -> ALWAYS float division (10 / 3 = 3.333..) - both operands must be ints or floats
#   div  -> integer division;   mod -> remainder
echo "Arithmetic: ", m + n, " ", m - n, " ", m * n
echo "10 / 3   = ", m / n              # 3.3333333333333335 (float)
echo "10 div 3 = ", m div n            # 3
echo "10 mod 3 = ", m mod n            # 1
echo "2 ^ 10   = ", 2 ^ 10            # `^` from std/math (integer power)
echo "sqrt(16) = ", sqrt(16.0)

# Comparison: ==, !=, >, <, >=, <=
echo "Comparison: ", m > n, " ", m < n, " ", m == n

# Logical: and, or, not, xor   (WORDS; short-circuit for and/or)
echo "Logical: ", true and false, " ", true or false, " ", not true

# Bitwise: and, or, xor, not, shl, shr  (same words, on INTEGERS)
echo "Bitwise: 5 and 3 = ", 5 and 3, ", 5 or 3 = ", 5 or 3, ", 5 shl 1 = ", 5 shl 1

# Assignment: =, +=, -=, *=, /=   (NO ++ or --; use inc(x) / dec(x))
var counter = 5
counter += 1
inc counter                          # counter = 7   (parens optional in command syntax)
dec counter, 2                       # counter = 5

# Membership / identity: in, notin, is (type check), of (object inheritance)
echo "3 in [1,2,3]: ", 3 in [1, 2, 3]

# String concat: &      Range: a..b (inclusive), a..<b (exclusive)
# Dollar `$` converts ANYTHING to string:
echo "Stringified: " & $42 & " " & $3.14 & " " & $true

# ==========================================
# 5. CONDITIONALS (IF FAMILY)
# ==========================================
# Indentation-based, colon after condition. Conditions MUST be bool.
let condition = false
if condition:
  discard                            # `discard` = no-op / pass (also required to ignore a returned value)
elif m > n:
  if m > 5:
    echo "nested branch"
else:
  discard

# `when` = COMPILE-TIME if (dead branch isn't even compiled). Like #ifdef / if constexpr.
when defined(linux):
  echo "Compiled on Linux"
elif defined(windows):
  echo "Compiled on Windows"
else:
  echo "Other OS"

# ==========================================
# 6. CASE (SWITCH)
# ==========================================
# Case must be EXHAUSTIVE for ordinals (int, char, enum) -> add `else` or cover all.
# Works on strings too! No fall-through, no `break` needed.
let switchVar = 2
case switchVar
of 1:
  echo "one"
of 2, 3:                             # multiple values (OR)
  echo "two or three"
of 4..10:                            # range
  echo "four to ten"
else:
  echo "default"

let cmd = "start"
case cmd                             # strings OK
of "start", "begin": echo "starting"
of "stop": echo "stopping"
else: echo "unknown"

let col = Green
case col                             # enum: compiler checks all cases handled
of Red: echo "red"
of Green: echo "green"
of Blue: echo "blue"

# `case` is an expression too:
let label = case switchVar
  of 1: "one"
  of 2: "two"
  else: "many"

# ==========================================
# 7. TERNARY
# ==========================================
# No `? :`. `if` is an EXPRESSION - use it inline:
let age = 20
let status = if age >= 18: "Adult" else: "Minor"

# Nested (chained if-expression, must always end with else):
let score = 85
let grade = if score >= 90: "A"
            elif score >= 80: "B"
            elif score >= 70: "C"
            else: "F"
echo "Grade: ", grade
# Also `min(a,b)` / `max(a,b)` for simple cases.

# ==========================================
# 8. LOOPS
# ==========================================
# while
var w = 0
while w < 3:
  inc w

# for over range: 0..4 is INCLUSIVE, 0..<5 is EXCLUSIVE
for i in 0..4:
  if i == 2: continue                # skip
  if i == 4: break                   # exit loop
for i in countdown(5, 1): discard    # 5,4,3,2,1
for i in countup(0, 10, 2): discard  # step 2
for i in 0..<5: discard

# for-each over collections
for item in @[10, 20, 30]:
  discard item
# with index:
for i, item in @["a", "b", "c"]:
  echo i, ": ", item
# over table pairs:
for name, ageV in ages:
  discard
for name in ages.keys: discard

# In-place mutation: iterate by `mitems`
var mutSeq = @[1, 2, 3]
for v in mutSeq.mitems:
  v *= 2                             # mutSeq = @[2, 4, 6]

# Nested loops with a named block to break out of BOTH
block outer:
  for i in 1..3:
    for j in 1..3:
      if i * j > 4: break outer      # exits the named block entirely
      stdout.write "(", i, ",", j, ") "
echo ""

# No do-while; emulate:
var dw = 0
while true:
  inc dw
  if dw >= 3: break

# Functional style (std/sequtils):
echo "map:    ", @[1, 2, 3].mapIt(it * it)              # `it` is an implicit variable
echo "filter: ", @[1, 2, 3, 4].filterIt(it mod 2 == 0)
echo "fold:   ", @[1, 2, 3, 4].foldl(a + b)
echo "any/all: ", @[1, 2].anyIt(it > 1), " ", @[1, 2].allIt(it > 1)

# ==========================================
# 9. INPUT / OUTPUT
# ==========================================
# Output:
#   echo a, b, c        -> concatenates args, NO spaces between, adds newline, to stdout
#   stdout.write "x"    -> no newline
#   stderr.writeLine "err"
echo "Basic echo: ", "Hello", " ", 42
stdout.write "No newline; "
stdout.writeLine "with newline"
stderr.writeLine "Standard error output"

# Input:
# let line = readLine(stdin)                 # whole line (raises EOFError at end of input)
# stdout.write "Enter name: "; stdout.flushFile()
# var name: string
# if stdin.readLine(name): echo "Hi ", name  # returns false on EOF (safe form)
# let all = stdin.readAll()
# File I/O: readFile("f.txt"), writeFile("f.txt", "data"), open(...) / lines("f.txt")

# ==========================================
# 10. FORMATTING
# ==========================================
# 1. strformat: fmt"..." or &"..."  -> f-string style with {expr:spec}
let price = 19.9934
let population = 1_500_000
let fname = "Apple"
echo &"Price: {price:.2f}"                        # 19.99
echo &"Padded right-align: [{42:>10}]"           # [        42]
echo &"Left-align: [{fname:<10}]"                # [Apple     ]
echo &"Centered: [{fname:^11}]"
echo &"Zero pad: {42:05}"                        # 00042
echo &"Hex: {255:x}, Bin: {5:b}, Oct: {8:o}"     # ff, 101, 10
echo &"Expr inside: {m} + {n} = {m + n}"
echo &"Debug: {m=}"                              # prints  m=10
# fmt vs &: `&"..."` allows escapes like \n; fmt"..." is raw (good for regex/paths)

# 2. std/strutils helpers
echo formatFloat(3.14159, ffDecimal, 2)          # "3.14"
echo align("42", 6, '0'), " ", alignLeft("hi", 6, '.'), "|"
echo insertSep("1500000", ',')                   # 1,500,000
echo "abc".repeat(3), " ", toHex(255), " ", toBin(5, 8)

# 3. `%` operator (old style):   "$1 is $2" % ["Alice", "30"]
echo "$1 is $2 years old" % ["Alice", "30"]

# ==========================================
# 10b. PARSING & TYPE CONVERSION
# ==========================================
# Nim is STRICTLY typed. There is NO implicit narrowing (int -> float needs a conversion).
# Implicit widening of literals & small->big ints is allowed (int8 -> int).
let i = 42
let d: float = float(i)              # explicit conversion: TYPE(value)
let t = int(3.99)                    # TRUNCATES toward zero -> 3
echo "Casts: ", d, " ", t
echo "round(3.5) = ", round(3.5), ", floor = ", floor(3.99), ", ceil = ", ceil(3.01)
echo int(round(2.5))                 # rounds half away from zero -> 3

# `cast[T](x)` = UNSAFE bit reinterpretation (like reinterpret_cast). Avoid.
let bits = cast[int64](3.14)

# Parsing strings (from std/strutils). These RAISE ValueError on bad input:
let parsedInt = parseInt("42")
let parsedFloat = parseFloat("3.14")
let parsedBool = parseBool("true")
let parsedHex = parseHexInt("FF")    # 255
echo "Parsed: ", parsedInt, " ", parsedFloat, " ", parsedBool, " ", parsedHex

# Safe parsing with error handling:
try:
  discard parseInt("apple")
except ValueError as e:
  echo "Parse error: ", e.msg

# Non-raising alternative: std/parseutils -> parseInt(s, var result): returns chars consumed (0 = fail)
import std/parseutils
var outVal: int
if parseInt("123abc", outVal) > 0:
  echo "Partial parse: ", outVal

# Number -> string: `$`
let numStr = $99                     # "99"
echo "Number 99 as string: \"", numStr, "\""
# char <-> int: ord('A') = 65, chr(65) = 'A'
echo ord('A'), " ", chr(66)
# enum <-> string/int: $Red = "Red",  ord(Green) = 1,  Color(2) = Blue

# ==========================================
# 11. CALLING FUNCTIONS & PASS BY VALUE/REFERENCE
# ==========================================
echo "addNumbers(5, 10) = ", addNumbers(5, 10)
echo add2(5, 10)                     # command-call syntax
echo 5.add2(10)                      # UFCS: a.f(b) == f(a, b) -> method-style chaining!

# PASS BY VALUE (default): parameters are IMMUTABLE inside the proc.
# Small types are copied; large types are passed by hidden reference (optimisation),
# but you still cannot modify them.
var originalVal = 10
echo "Before passByValue: ", originalVal
demonstratePassByValue(originalVal)
echo "After passByValue: ", originalVal, " (unchanged)"

# PASS BY REFERENCE: `var T` parameter = mutable reference to caller's variable
var originalRef = 10
echo "Before passByRef: ", originalRef
demonstratePassByRef(originalRef)    # NO & needed at call site (compiler passes address)
echo "After passByRef: ", originalRef, " (changed!)"

# `ref` types: passing a ref object passes the REFERENCE (shared object)
proc bumpNode(n: Node) = n.value += 1
bumpNode(n1)

# Arrays / seqs
var numArray = @[1, 2, 3, 4, 5]
echo "Sum: ", sumAll(numArray), ", also works on arrays: ", sumAll([1, 2, 3])
proc double(s: var seq[int]) =
  for v in s.mitems: v *= 2
double(numArray)
echo "After double: ", numArray

# Default & named arguments
echo greet(), " | ", greet("Alice"), " | ", greet(name = "Bob", excited = true)

# Variable args: openArray param, or varargs
echo total(1, 2, 3, 4, 5)

# Multiple return values via tuple
let (quotient, remainder) = divmod(10, 3)
echo "divmod: ", quotient, " ", remainder

# Generic
echo maxOf(3, 7), " ", maxOf(2.5, 1.5), " ", maxOf("a", "b")

# Higher-order + closure
let square = proc (x: int): int = x * x           # anonymous proc
let sq2 = (x: int) => x * x                       # needs `import std/sugar`
echo square(6)

# Object methods (procs whose first param is the object) + UFCS
var person = Person(name: "Alice", age: 30, height: 1.65)
person.birthday()
echo person.describe()

# Result via `result` implicit variable (see below) & `return`
echo factorial(5)

# ==========================================
# 12. FUNCTION DEFINITIONS
# ==========================================
# proc  : general procedure (may have side effects)
# func  : PURE proc (compiler enforces: no side effects on global state). Great for safety.
# method: dynamic dispatch (runtime polymorphism on ref objects) - rarely needed
# iterator: yields values lazily (used by `for`)
# template / macro: compile-time code substitution / AST manipulation (metaprogramming)
# converter: implicit conversion between types

proc addNumbers(a, b: int): int =    # a, b share the type `int`
  # `result` is an implicit variable of the return type, returned automatically at end.
  result = a + b

proc add2(a: int, b: int): int =     # last EXPRESSION is also the return value
  a + b

proc demonstratePassByValue(val: int) =
  # val = 999                        # ERROR: parameters are immutable
  var localCopy = val                # make a local mutable copy
  localCopy = 999
  echo "Inside function (pass by value): ", localCopy

proc demonstratePassByRef(val: var int) =
  val = 999                          # modifies caller's variable
  echo "Inside function (pass by ref): ", val

proc sumAll(numbers: openArray[int]): int =
  for n in numbers:
    result += n                      # result starts as 0 (zero-initialised)

proc greet(name = "World", excited = false): string =
  result = "Hello, " & name
  if excited: result.add("!")

proc total(nums: varargs[int]): int =    # variadic
  for n in nums: result += n

proc divmod(a, b: int): (int, int) =     # tuple return
  (a div b, a mod b)

proc maxOf[T](a, b: T): T =              # generic proc; T must support `>`
  if a > b: a else: b

proc factorial(n: int): int =
  if n <= 1: return 1                    # early `return`
  n * factorial(n - 1)

# Pure function: compile error if it touches globals / does IO
func square3(x: int): int = x * x

# Methods on objects (procs taking Person first)
proc birthday(p: var Person) = inc p.age
proc describe(p: Person): string = &"{p.name} is {p.age} years old"

# Iterator (lazy generator)
iterator evens(limit: int): int =
  var i = 0
  while i <= limit:
    yield i
    i += 2
for e in evens(10): stdout.write e, " "
echo ""

# Template: text-substitution at compile time (zero call overhead)
template repeatTimes(n: int, body: untyped) =
  for _ in 1..n: body
repeatTimes(2): echo "template!"

# `defer`: run code when leaving the scope (cleanup - like Go's defer)
proc withDefer() =
  defer: echo "cleanup runs last"
  echo "doing work"
withDefer()

# Error handling: exceptions
try:
  raise newException(ValueError, "custom problem")
except ValueError as e:
  echo "Caught: ", e.msg
finally:
  echo "finally block"

# Main entry: Nim has NO main(). Top-level code runs top to bottom.
# Idiom to only run when executed directly (not imported):
when isMainModule:
  echo "Running as main program"