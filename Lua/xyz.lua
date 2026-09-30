-- Run with: lua notes.lua   (written for Lua 5.4)

--[[
This is a multiline comment.
Single-line comments start with --
Trick: add a third dash to the opener (---[[) and the block turns back into code.
Use --[==[ ... ]==] if the comment itself contains ]]
--]]

print("Hello World")

-- ==========================================
-- 1. BASICS OF VARIABLES & CONSTANTS
-- ==========================================
-- Syntax: local name = value
-- Lua is DYNAMICALLY typed: variables have no type, VALUES do.
-- Variables are GLOBAL by default. ALWAYS write `local` (globals are slower and
-- pollute the shared global table _G; a typo silently creates a new global).

global_var = 0            -- global: visible everywhere, lives in _G
local local_var = 50      -- local: visible from this line to the end of the enclosing block

do
    -- Block scope: `do ... end` creates a scope
    local block_var = 25
    print("Block var:", block_var)
end
-- block_var is nil here (not an error, just nil - unknown globals read as nil)
print("Local:", local_var, "Global:", global_var)

-- Multiple assignment & swap (right side is fully evaluated first)
local a, b = 1, 2
a, b = b, a               -- swap without temp
local p, q, r = 1, 2      -- r = nil (missing values become nil)

-- Constants (Lua 5.4): <const> attribute. Compile-time error if reassigned.
local PI <const> = 3.14159
local MAX_USERS <const> = 100
-- PI = 3   -- ERROR: attempt to assign to const variable 'PI'
-- Older Lua (5.1-5.3) has no constants: convention is UPPER_CASE names.

-- <close> (Lua 5.4): calls the value's __close metamethod when the scope exits (like RAII/defer)
-- local f <close> = io.open("file.txt")

-- ==========================================
-- 2. DATA TYPES - BUILT-IN PRIMITIVES
-- ==========================================
-- Lua has exactly 8 types. type(x) returns the name as a string:
--   nil, boolean, number, string, function, table, userdata, thread

-- nil: absence of a value. Also what an unset variable holds.
local var_nil = nil

-- boolean: true / false
-- TRUTHINESS: ONLY nil and false are falsy. 0 and "" are TRUE (differs from C/Python/JS!)
local var_bool = true

-- number: has two SUBTYPES since Lua 5.3
--   integer: 64-bit signed (-2^63 .. 2^63-1), wraps on overflow
--   float:   64-bit double (IEEE 754)
local var_int = 42
local var_float = 3.14
local var_float2 = 42.0         -- written with a dot = float, even though it's a whole number
local var_hex = 0xFF            -- 255
local var_sci = 1e3             -- 1000.0 (scientific notation is always float)

print("math.type(42)   =", math.type(42))     -- integer
print("math.type(42.0) =", math.type(42.0))   -- float
print("math.type('x')  =", math.type("x"))    -- nil (not a number)
print("math.maxinteger =", math.maxinteger)   -- 9223372036854775807
print("math.mininteger =", math.mininteger)
print("Overflow wraps:", math.maxinteger + 1 == math.mininteger)  -- true
print("math.huge =", math.huge, "-math.huge =", -math.huge)      -- inf, -inf
print("0/0 (NaN) ~= itself:", (0/0) ~= (0/0))                     -- NaN is never equal to itself

-- string: IMMUTABLE sequence of bytes (8-bit clean, may contain "\0"). No char type.
local var_str = "Hello"
local var_char = "A"            -- a char is just a string of length 1

-- function: functions are first-class values (can be stored, passed, returned)
local var_func = function(x) return x * 2 end

-- table: the ONLY data structure (arrays, dicts, objects, modules - all tables). See section 3.

-- userdata / thread: userdata = raw C data from the host program, thread = coroutine.

print("type(nil)      =", type(var_nil))
print("type(true)     =", type(var_bool))
print("type(42)       =", type(var_int))
print("type('hi')     =", type(var_str))
print("type(print)    =", type(print))
print("type({})       =", type({}))
print("type(type(1))  =", type(type(1)))   -- type() returns a string

-- Truthiness demo
if 0 then print("0 is truthy") end
if "" then print("'' is truthy") end
if not nil then print("nil is falsy") end

-- ==========================================
-- 3. REFERENCE TYPES (TABLES, STRINGS, HEAP)
-- ==========================================
-- Lua has automatic memory management (incremental/generational garbage collector).
-- No malloc/free, no pointers, no manual heap. Tables, functions, userdata and threads
-- are REFERENCE types: variables hold a reference, assignment copies the reference.

-- --- Tables as ARRAYS ---
-- Arrays are 1-INDEXED by convention (not 0!). The # operator gives the length.
local arr = {10, 20, 30, 40}
print("Array:", arr[1], arr[2], arr[3], arr[4])
print("Length:", #arr)
print("First:", arr[1], "Last:", arr[#arr])
print("arr[0] =", arr[0])              -- nil (index 0 doesn't exist; not an error)
arr[#arr + 1] = 50                     -- append
table.insert(arr, 60)                  -- append (function form)
table.insert(arr, 1, 5)                -- insert at position 1, shifts others right
local removed = table.remove(arr)      -- remove & return last element
table.remove(arr, 1)                   -- remove first element, shifts left
print("After edits:", table.concat(arr, ", "))
table.sort(arr, function(x, y) return x > y end)   -- sort descending (custom comparator)
print("Sorted desc:", table.concat(arr, ", "))
print("unpack:", table.unpack({1, 2, 3}))          -- expands table into multiple values
-- WARNING: # is only reliable for "sequences" (no nil holes). {1, nil, 3} has an undefined length.

-- --- Tables as DICTIONARIES (hash maps) ---
local user = { name = "Alice", age = 30 }          -- same as ["name"] = "Alice"
user.email = "alice@example.com"                   -- add a key (dot syntax = string key)
user["city"] = "Paris"                             -- bracket syntax works with any key type
user.age = nil                                     -- assigning nil DELETES the key
print("name:", user.name, "age:", user.age)

-- Iterating:
--   ipairs(t): ordered, 1..n, stops at the first nil  -> for arrays
--   pairs(t):  ALL keys, order NOT guaranteed         -> for dicts
for i, v in ipairs({"a", "b", "c"}) do
    print("  ipairs:", i, v)
end
for k, v in pairs({ x = 1 }) do
    print("  pairs:", k, v)
end

-- Tables are references
local t1 = {1, 2, 3}
local t2 = t1                 -- t2 is the SAME table, not a copy
t2[1] = 999
print("t1[1] after t2 change:", t1[1])             -- 999
-- Shallow copy manually:
local copy = {}
for k, v in pairs(t1) do copy[k] = v end           -- (nested tables would still be shared)
-- table.move(t1, 1, #t1, 1, {}) also works for arrays

-- Table equality compares REFERENCES, not contents
print("{} == {} :", {} == {})                      -- false

-- Mixed / nested
local mixed = { 1, "two", { nested = true }, [10] = "ten" }
print("nested:", mixed[3].nested)

-- --- Strings ---
-- Strings are immutable. Every "modification" creates a new string.
-- Three literal styles:
local s1 = "double quotes with \"escape\" and \n newline"
local s2 = 'single quotes are identical'
local s3 = [[
long bracket string: multi-line, NO escapes processed,
first newline right after [[ is skipped]]
print(s2)
print(s3)

local str = "Hello"
print("Length:", #str, str:len(), string.len(str))         -- # counts BYTES, not characters
print("Upper/Lower:", str:upper(), str:lower())
print("Substring (2,4):", str:sub(2, 4))                   -- "ell" (1-based, INCLUSIVE both ends)
print("Last 2 chars:", str:sub(-2))                        -- negative index counts from the end
print("Char code of 'A':", string.byte("A"), " Code 66 as char:", string.char(66))
print("Repeat:", ("ab"):rep(3, "-"))                       -- ab-ab-ab
print("Reverse:", str:reverse())
-- Concatenation uses .. (NOT +). Numbers are converted automatically.
local combined = str .. " " .. "World" .. " " .. 2026
print("Combined:", combined)
-- In loops, prefer table.concat over repeated .. (each .. allocates a new string)
local parts = {}
for i = 1, 3 do parts[#parts + 1] = "item" .. i end
print("table.concat:", table.concat(parts, ","))

-- Searching: string.find returns start,end indices (or nil). 4th arg `true` = plain text (no patterns)
print("find 'll':", str:find("ll", 1, true))               -- 3  4
-- Lua PATTERNS (not regex!): %d digit, %a letter, %s space, %w alphanumeric, + * - ? quantifiers
print("match digits:", ("order 66 confirmed"):match("%d+"))                    -- 66
print("gsub:", ("hello world"):gsub("o", "0"))                                  -- hell0 w0rld  2
for word in ("one two three"):gmatch("%a+") do io.write(word, "|") end print()
-- Unicode: # and sub() work on bytes. Use the utf8 library for code points:
print("utf8.len('héllo') =", utf8.len("héllo"), " #'héllo' =", #"héllo")     -- 5 vs 6

-- --- Closures: functions capture variables (upvalues) ---
local function make_counter()
    local count = 0
    return function() count = count + 1; return count end
end
local c = make_counter()
c(); c()
print("Closure counter:", c())                             -- 3

-- --- nil / null ---
-- nil is the only "null". A table can't STORE nil (assigning nil removes the key).
local nothing = nil
print("nothing == nil:", nothing == nil)

-- Memory: collectgarbage("count") returns memory in use, in KB
print(string.format("Memory in use: %.1f KB", collectgarbage("count")))
-- Weak tables (setmetatable(t, {__mode = "k"})) let the GC collect keys/values (caches).

-- ==========================================
-- 4. OPERATORS
-- ==========================================
local x, y = 10, 3
-- Arithmetic: + - * / // % ^   (unary -)
print("Arithmetic:", x + y, x - y, x * y)
print("/  always float:", x / y, 10 / 2)                   -- 3.333..., 5.0  (NOT integer division!)
print("// floor division:", x // y, -7 // 2, 7.0 // 2)     -- 3, -4 (rounds toward -inf), 3.0
print("%  modulo:", x % y, -7 % 3, 7 % -3)                 -- 1, 2, -2 (result has sign of DIVISOR)
print("^  power (always float):", 2 ^ 10, 2 ^ 0.5)         -- 1024.0, 1.414...

-- Relational: == ~= < > <= >=      (NOT-EQUAL is ~=  , not !=)
print("Comparison:", x > y, x < y, x == y, x ~= y)
print("1 == 1.0 :", 1 == 1.0)                              -- true (numbers compare by value)
print("'1' == 1 :", "1" == 1)                              -- false (NO implicit coercion in ==)
-- Comparing number with string using < is an ERROR; but arithmetic DOES coerce:
print("'10' + 5 =", "10" + 5)                              -- 15 (string -> number coercion in arithmetic)

-- Logical: and, or, not      (short-circuit; they return one of their OPERANDS, not just true/false)
print("true and false:", true and false)
print("true or false:", true or false)
print("not true:", not true)
print("nil or 'default':", nil or "default")               -- idiom: default value
print("1 and 2:", 1 and 2)                                 -- 2  (returns last operand if first is truthy)
print("nil and 2:", nil and 2)                             -- nil (returns first falsy operand)

-- Bitwise (Lua 5.3+, works on integers): & | ~ (xor) ~ (unary not) << >>
print("Bitwise:", 5 & 3, 5 | 3, 5 ~ 3, ~5, 5 << 1, 20 >> 2)
-- >> is a LOGICAL shift (fills with zeros), not arithmetic.

-- String: .. concatenation, # length
print("Concat & length:", "ab" .. "cd", #"abcd")

-- Assignment: only "=". NO +=, -=, ++, -- in Lua.
local counter = 5
counter = counter + 1
-- counter++ / counter += 1  -> syntax ERROR

-- Precedence (high -> low):
--   ^   |  unary: not # - ~  |  * / // %  |  + -  |  ..  |  << >>  |  &  |  ~  |  |  |  comparison  |  and  |  or
-- Note: .. and ^ are RIGHT associative.   -2 ^ 2 == -(2^2) == -4.0
print("-2 ^ 2 =", -2 ^ 2)

-- Length operator on tables and strings
print("#'hello' =", #"hello", " #{1,2,3} =", #{1, 2, 3})

-- ==========================================
-- 5. CONDITIONALS (IF FAMILY)
-- ==========================================
-- Syntax: if cond then ... elseif cond then ... else ... end
-- No parentheses needed, no braces. Note: `elseif` is ONE word.
local int_var = 5
if int_var > 0 and var_bool then
    print("positive and true")
elseif not var_bool then
    if arr[1] == 10 then
        -- nested
    end
else
    -- fallback
end

-- Idiom: checking for nil vs false
local maybe = false
if maybe == nil then print("is nil") end
if maybe == false then print("is false (not nil!)") end

-- ==========================================
-- 6. SWITCH STATEMENT
-- ==========================================
-- Lua has NO switch/case. Two common replacements:

-- (a) if / elseif chain
local switch_var = 2
if switch_var == 1 then
    print("one")
elseif switch_var == 2 or switch_var == 3 then     -- "fall-through" style grouping via `or`
    print("two or three")
else
    print("default")
end

-- (b) Dispatch table: table of functions (fast, extensible)
local actions = {
    start = function() return "starting" end,
    stop  = function() return "stopping" end,
}
local cmd = "start"
local handler = actions[cmd] or function() return "unknown" end   -- `or` = default case
print("Dispatch:", handler())

-- ==========================================
-- 7. TERNARY
-- ==========================================
-- No ? : operator. Idiom: (cond) and a or b
local age = 20
local status = (age >= 18) and "Adult" or "Minor"
print("Status:", status)

-- BUG WARNING: fails when `a` is falsy (nil/false), because `and` yields a and `or` then picks b.
local wrong = true and false or "oops"     -- gives "oops" instead of false!
print("Ternary pitfall:", wrong)
-- Safe alternative when the true-branch may be falsy: use a full if/else.

-- Nested
local score = 85
local grade = (score >= 90) and "A"
           or (score >= 80) and "B"
           or (score >= 70) and "C"
           or "F"
print("Grade:", grade)

-- ==========================================
-- 8. LOOPS
-- ==========================================
-- while
local w = 0
while w < 3 do
    w = w + 1
end

-- repeat ... until   (do-while equivalent: body runs at least once)
-- NOTE: condition is checked at the END and can see locals declared in the body.
local dw = 0
repeat
    local done = dw >= 0        -- `done` visible in the until-condition
    dw = dw + 1
until done

-- Numeric for: for var = start, stop [, step]
--   Both ends INCLUSIVE. The loop var is a fresh LOCAL copy each iteration.
--   Start/stop/step are evaluated ONCE before the loop.
for i = 1, 5 do io.write(i, " ") end print()          -- 1 2 3 4 5
for i = 10, 1, -3 do io.write(i, " ") end print()     -- 10 7 4 1  (negative step counts down)
for i = 1, 0 do print("never runs") end               -- empty when start > stop with positive step

-- Generic for: for k, v in <iterator> do
--   ipairs / pairs / string.gmatch / io.lines / any custom iterator function
local fruits = { "Apple", "Banana", "Cherry" }
for index, fruit in ipairs(fruits) do
    print(index, fruit)
end

-- break exits the loop. Lua has NO `continue`, use goto:
for i = 1, 5 do
    if i == 2 then goto continue end   -- skip iteration
    if i == 4 then break end           -- exit loop entirely
    io.write("i=", i, " ")
    ::continue::                       -- label must be at the end of the block
end
print()

-- Nested loops
for i = 1, 3 do
    for j = 1, 3 do
        io.write("(", i, ",", j, ") ")
    end
    print()
end

-- goto also breaks out of nested loops
for i = 1, 3 do
    for j = 1, 3 do
        if i * j == 4 then goto out end
    end
end
::out::
print("Broke out of nested loops")

-- ==========================================
-- 9. INPUT / OUTPUT
-- ==========================================
-- Output:
--   print(...)     : tabs between args, newline at the end, calls tostring() on each
--   io.write(...)  : NO separators, NO newline, only strings/numbers (faster, no surprises)
--   io.stderr:write("error\n") : standard error
print("a", "b", 1, nil, true)      -- a  b  1  nil  true  (tab separated)
io.write("no newline", "\n")
io.stderr:write("Standard error output\n")

-- Input (uncomment to test):
-- io.write("Enter your name: ")
-- local name = io.read()          -- reads a line WITHOUT the trailing "\n" (default format "l")
-- Formats:  "l" line (no \n)   "L" line (keeps \n)   "n" number   "a" everything   5 (read 5 bytes)
-- local num = io.read("n")        -- returns nil if the input isn't a number
-- io.read("l")                    -- after "n", the newline is still in the buffer: consume it first
-- for line in io.lines() do ... end     -- iterate over all stdin lines

-- Files:
-- local f = assert(io.open("data.txt", "r"))    -- modes: r, w, a, r+, w+, a+ (add b for binary)
-- local content = f:read("a")
-- f:close()
-- io.open returns nil, errmsg on failure (it doesn't throw)

-- ==========================================
-- 10. FORMATTING
-- ==========================================
-- string.format works like C's printf but RETURNS a string (doesn't print).
-- Specifiers: %d int  %f float  %s string  %q quoted  %x hex  %c char  %e sci  %g shortest  %% literal %
local price = 19.9934
print(string.format("Price: $%.2f", price))                 -- 2 decimal places
print(string.format("%d items", 42))
print(string.format("%s and %s", "text", 42))               -- %s calls tostring on anything
print(string.format("%5d|", 42))                            -- right-aligned width 5:  "   42|"
print(string.format("%-10s|", "Apple"))                     -- left-aligned width 10
print(string.format("%05d", 42))                            -- zero padded: 00042
print(string.format("%x %X %o", 255, 255, 8))               -- ff FF 10
print(string.format("%c%c%c", 72, 105, 33))                 -- Hi!
print(string.format("%q", 'he said "hi"\n'))                -- safe quoted string
print(string.format("%10.3f|", math.pi))                    -- width 10, 3 decimals
print(string.format("%s", {}):sub(1, 6))                    -- "table:" (address follows)
-- %d needs a value with an exact integer representation:
print(string.format("%d", 3.0))                             -- OK (3.0 -> 3)
-- string.format("%d", 3.5)                                 -- ERROR: number has no integer representation
print(string.format("%d", math.floor(3.5)))                 -- fix by converting first

-- Method call syntax on string literals needs parentheses
print(("%d-%d"):format(1, 2))

-- No string interpolation ("${name}") in Lua. Use .. or string.format.
local name = "Alice"
print("Hello, " .. name .. "!")
print(("Hello, %s!"):format(name))

-- Printing tables prints an address; write your own serializer or loop over them.
print(tostring({}):match("^table: ") ~= nil)

-- ==========================================
-- 11. PARSING & TYPE CONVERSION (Coercion & Casting)
-- ==========================================
-- Automatic coercion happens in ARITHMETIC and CONCATENATION:
print("10" + 5)               -- 15    (string -> number)
print(10 .. 20)               -- "1020"  (number -> string; note the spaces around ..)
print("3" * "4")              -- 12
-- Comparison does NOT coerce: "10" == 10 is false, and "10" < 5 raises an error.

-- String -> number: tonumber(str [, base]). Returns NIL (not an error) on failure.
print(tonumber("42"))         -- 42     (integer)
print(tonumber("3.14"))       -- 3.14   (float)
print(tonumber("  7  "))      -- 7     (surrounding whitespace is OK)
print(tonumber("0xFF"))       -- 255   (hex prefix understood)
print(tonumber("1e2"))        -- 100.0
print(tonumber("apple"))      -- nil   -> ALWAYS check for nil on user input
print(tonumber("12abc"))      -- nil   (must be a fully valid number)
print(tonumber("ff", 16))     -- 255   (explicit base 2..36; input must be a string)
print(tonumber("777", 8))     -- 511
print(tonumber("101", 2))     -- 5

-- Safe parsing pattern:
local input_str = "abc"
local n = tonumber(input_str)
if n == nil then
    print("Error: '" .. input_str .. "' is not a valid number")
end

-- Number -> string: tostring(x) or concatenation or string.format
print(tostring(99), tostring(3.0), tostring(true), tostring(nil))   -- "99" "3.0" "true" "nil"
print(99 .. "")                                                       -- "99"

-- Float <-> integer:
print(math.tointeger(3.0))    -- 3     (only if the float has an exact integer value)
print(math.tointeger(3.5))    -- nil   (not an exact integer -> nil)
print(math.floor(3.99))       -- 3     (returns an integer subtype when it fits)
print(math.ceil(3.01))        -- 4
print(3.99 // 1)              -- 3.0   (floor division on floats stays float)
print(7 // 2 * 1.0)           -- 3.0   (force float)
print(3.0 | 0)                -- 3     (bitwise ops force integer; 3.5 | 0 would raise an error)
-- Truncate toward zero (like C's (int)): no built-in, use:
local function trunc(v) return v >= 0 and math.floor(v) or math.ceil(v) end
print("trunc(-3.99) =", trunc(-3.99))        -- -3
-- Rounding: math.floor(x + 0.5)
print("round(2.5) =", math.floor(2.5 + 0.5))

-- Boolean conversion: use `not not x`, or `x and true or false`
print("not not 0 =", not not 0)               -- true (0 is truthy!)
print("not not nil =", not not nil)           -- false

-- Character <-> code point
print(string.byte("A"), string.char(65))      -- 65   A
print(utf8.char(0x1F980), utf8.codepoint("🦀"))   -- 🦀   129408

-- Math library highlights
print(math.max(1, 5, 3), math.min(1, 5, 3), math.abs(-4), math.sqrt(16), math.pi)
math.randomseed(os.time())                     -- (5.4 seeds randomly by default)
print(math.random(), math.random(10), math.random(5, 10))   -- [0,1)   [1,10]   [5,10]

-- ==========================================
-- 12. FUNCTIONS (DECLARATION & DEFINITION)
-- ==========================================
-- Functions are VALUES. `function f() end` is sugar for `f = function() end`.
-- Lua doesn't have prototypes: a function must exist (be assigned) BEFORE the line that CALLS it runs.
-- Prefer `local function`: it is local and can call itself recursively.

-- Definition
local function add(a, b)
    return a + b
end
print("add(5, 10) =", add(5, 10))

-- Anonymous function assigned to a variable
local multiply = function(a, b) return a * b end
print("multiply(3, 4) =", multiply(3, 4))

-- Forward declaration (mutual recursion): declare local first, define later
local is_odd
local function is_even(n)
    if n == 0 then return true end
    return is_odd(n - 1)
end
function is_odd(n)                 -- assigns to the already-declared local `is_odd`
    if n == 0 then return false end
    return is_even(n - 1)
end
print("is_even(10) =", is_even(10))

-- `local function f` vs `local f = function`:
--   local function fact(n) ... fact(n-1) ... end   -> f is in scope INSIDE its own body (recursion OK)
--   local fact = function(n) ... fact(n-1) ... end -> `fact` inside refers to a GLOBAL (bug!)

-- Recursion (Lua does proper TAIL CALL optimization: `return f(x)` uses no extra stack)
local function factorial(n)
    if n <= 1 then return 1 end
    return n * factorial(n - 1)
end
print("5! =", factorial(5))

-- No return statement (or bare `return`) returns nothing (zero values)
local function greet(who)
    print("Hello, " .. who .. "!")
end
greet("Alice")
-- `return` must be the LAST statement in a block. To return early mid-block: `do return end`

-- MULTIPLE RETURN VALUES (a Lua feature)
local function min_max(t)
    local lo, hi = t[1], t[1]
    for _, v in ipairs(t) do
        if v < lo then lo = v end
        if v > hi then hi = v end
    end
    return lo, hi
end
local lo, hi = min_max({ 4, 9, 1, 7 })
print("min, max =", lo, hi)
-- Adjustment rules: only the LAST call in an expression list expands to all results
print(min_max({ 4, 9, 1 }))               -- 1  9   (both)
print((min_max({ 4, 9, 1 })))             -- 1      (parentheses truncate to ONE value)
print(min_max({ 4, 9, 1 }), "x")          -- 1  x   (not last -> only first value)

-- Idiomatic error handling: return nil, errmsg
local function safe_div(a, b)
    if b == 0 then return nil, "division by zero" end
    return a / b
end
print(safe_div(1, 0))
-- Exceptions: error("msg") throws, pcall catches:
local ok, err = pcall(function() error("boom") end)
print("pcall:", ok, err)
local ok2, val = pcall(function() return 42 end)
print("pcall:", ok2, val)
-- error(msg, 0) = no position info added.  assert(cond, msg) throws if cond is falsy.

-- ==========================================
-- 13. PARAMETERS & PASS BY VALUE / REFERENCE
-- ==========================================
-- Lua ALWAYS passes arguments BY VALUE, but for tables/functions/userdata the "value"
-- is a REFERENCE (like Java/Python: "pass by sharing").
--   nil, boolean, number, string -> effectively copied (strings are immutable anyway)
--   table, function              -> reference copied; the callee can mutate the SAME object

-- Parameters are matched by position. Missing args = nil, extra args are discarded.
local function show(a, b, c) print("params:", a, b, c) end
show(1)                     -- 1  nil  nil
show(1, 2, 3, 4)            -- 1  2  3   (4 ignored)

-- Default values via `or`  (careful: `false` also triggers the default; use `if x == nil` for booleans)
local function greet_default(who, punct)
    who = who or "World"
    punct = punct or "!"
    print("Hello, " .. who .. punct)
end
greet_default()
greet_default("Lua", "?")

-- Pass by value (primitives): original unaffected
local function demonstrate_by_value(val)
    val = 999
    print("Inside function (by value):", val)
end
local original_val = 10
print("\nBefore by value:", original_val)
demonstrate_by_value(original_val)
print("After by value:", original_val, "(unchanged)")

-- Pass by reference (tables): callee mutates the caller's table
local function demonstrate_by_reference(tbl)
    tbl[1] = 999
    print("Inside function (table modified):", tbl[1])
end
local original_tbl = { 1, 2, 3 }
print("\nBefore by reference:", original_tbl[1])
demonstrate_by_reference(original_tbl)
print("After by reference:", original_tbl[1], "(changed!)")

-- But REASSIGNING the parameter only rebinds the local name; caller is unaffected
local function reassign(tbl)
    tbl = { "new table" }
end
reassign(original_tbl)
print("After reassign:", original_tbl[1])                 -- still 999

-- To "return by out-parameter" in Lua, just return multiple values instead
local function swap(a, b) return b, a end
local s1v, s2v = swap(1, 2)
print("swap:", s1v, s2v)

-- VARIADIC functions: `...`
local function sum_all(...)
    local total = 0
    for _, v in ipairs({ ... }) do total = total + v end   -- pack into a table
    return total
end
print("sum_all(1,2,3,4,5) =", sum_all(1, 2, 3, 4, 5))

local function count_args(...)
    -- select("#", ...) counts ALL args, including nils; #{...} would not be reliable with nils
    return select("#", ...), (select(2, ...))               -- count, and the 2nd arg
end
print("count_args:", count_args("a", nil, "c"))
local packed = table.pack(1, nil, 3)                        -- packed.n is the true count
print("table.pack n =", packed.n)

-- Named arguments emulation: pass a single table (f{...} call sugar drops the parentheses)
local function connect(opts)
    print("connect:", opts.host, opts.port or 80)
end
connect { host = "localhost", port = 8080 }
-- Sugar: f"str" and f{...} calls need no parentheses:  print "hi"  /  connect { host = "x" }

-- Method (colon) syntax: obj:method(x) is sugar for obj.method(obj, x)
-- Arguments and functions are also closures: they capture surrounding locals (see section 3)

-- ==========================================
-- 14. SPECIAL DATA TYPES - "STRUCTS" (TABLES + METATABLES)
-- ==========================================
-- Lua has no struct/class keyword. A table with named fields is a struct.
local person = { name = "Alice", age = 30, height = 1.65 }
print(person.name, person.age, person.height)

-- Struct constructor function
local function Point(x, y) return { x = x, y = y } end
local pt = Point(3, 4)
print("Point:", pt.x, pt.y)

-- "Array of structs"
local people = { Point(0, 0), Point(1, 2) }
print("second point:", people[2].x, people[2].y)

-- --- OOP with metatables ---
-- setmetatable(t, mt): mt.__index says where to look when a key is MISSING in t.
local Car = {}
Car.__index = Car                        -- class table is the metatable for instances

function Car.new(color, year)            -- constructor (dot: no self)
    local self = setmetatable({}, Car)
    self.color = color
    self.year = year
    return self
end

function Car:display_info()              -- colon: automatically gets `self` as first param
    print(self.year .. " " .. self.color .. " Car")
end

function Car:set_color(c) self.color = c end
function Car:get_color() return self.color end

local car1 = Car.new("Red", 2020)
car1:display_info()
car1:set_color("Blue")
print("New color:", car1:get_color())
local car2 = Car.new("Green", 2022)
car2:display_info()

-- Inheritance: chain metatables
local ElectricCar = setmetatable({}, { __index = Car })
ElectricCar.__index = ElectricCar
function ElectricCar.new(color, year, range)
    local self = Car.new(color, year)            -- call the parent constructor
    setmetatable(self, ElectricCar)              -- then switch to the child's metatable
    self.range = range
    return self
end
function ElectricCar:display_info()
    Car.display_info(self)                       -- call the parent method explicitly
    print("  range:", self.range .. " km")
end
ElectricCar.new("White", 2024, 500):display_info()

-- Common metamethods (operator overloading): __add __sub __mul __div __eq __lt __le
--   __tostring (used by print/tostring)  __len (#)  __call (t(...))  __concat (..)
--   __index / __newindex (read/write of missing keys)  __close (<close> variables)
local Vec = {}
Vec.__index = Vec
Vec.__add = function(a, b) return setmetatable({ x = a.x + b.x, y = a.y + b.y }, Vec) end
Vec.__tostring = function(v) return "(" .. v.x .. ", " .. v.y .. ")" end
Vec.__eq = function(a, b) return a.x == b.x and a.y == b.y end
local v1 = setmetatable({ x = 1, y = 2 }, Vec)
local v2 = setmetatable({ x = 3, y = 4 }, Vec)
print("v1 + v2 =", tostring(v1 + v2), " v1 == v1 :", v1 == v1)

-- "Enums": table of constants (optionally frozen with a metatable)
local Color = { RED = 1, GREEN = 2, BLUE = 3 }
print("Color.GREEN =", Color.GREEN)

-- Modules: a file returns a table; `require("name")` loads it once and caches it in package.loaded
--   -- mymodule.lua
--   local M = {}
--   function M.hello() print("hi") end
--   return M
--   -- main.lua
--   local mymodule = require("mymodule")

-- Coroutines (cooperative multitasking / generators)
local gen = coroutine.wrap(function()
    for i = 1, 3 do coroutine.yield(i) end
end)
print("coroutine:", gen(), gen(), gen())

-- Global environment
print("global_var via _G:", _G.global_var)

return 0   -- a chunk can return values (used by `require` for modules; ignored when run as a script)