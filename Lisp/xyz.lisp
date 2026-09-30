;;;; Recommend reading a functional-programming primer first
;;;; Dialect: Common Lisp (run with SBCL:  sbcl --script notes.lisp)
;;;; Lisp = "LISt Processing". Code IS data: everything is an S-expression (a.k.a. sexp)
;;;;     (function arg1 arg2 ...)     <- prefix notation, ALWAYS parenthesised
;;;; Other Lisps: Scheme (minimal), Clojure (JVM), Emacs Lisp. Names differ across them.

;;; Comment conventions:
;   single semicolon  -> comment at end of a line of code
;;  double            -> comment on its own line inside code
;;; triple            -> section header
;;;; quadruple        -> file header
#|
  This is a multi-line
  block comment  #| can nest |#
|#

(format t "Hello World~%")      ; ~% = newline

;;; ==========================================
;;; 1. BASICS OF VARIABLES & CONSTANTS
;;; ==========================================
;; Common Lisp is DYNAMICALLY typed: variables have no type, VALUES do.
;; Naming: kebab-case, e.g. my-variable-name (dashes are legal in symbols).

;; Global (special) variables. Convention: *earmuffs*
(defvar *global-count* 0)          ; defines ONLY IF not already defined (keeps old value on reload)
(defparameter *greeting* "Hello")  ; always (re)sets the value

;; Constants: named with +plus-signs+ by convention
(defconstant +pi-approx+ 3.14159d0)
(defconstant +max-users+ 100)

;; Local variables: LET creates a scope, variables die at the closing paren
(let ((local-var 50)              ; bindings are (name value) pairs
      (other 10))
  (format t "Local: ~a, other: ~a~%" local-var other))
;; local-var is NOT accessible here!

;; LET* = sequential: later bindings can see earlier ones
(let* ((a 5)
       (b (* a 2)))               ; b can use a
  (format t "a=~a b=~a~%" a b))

;; Assignment / mutation: SETF (works on variables AND "places": list elements, struct slots...)
(defvar y 10)
(setf y 15)
(incf y)          ; y = y + 1  -> 16   (no ++ operator)
(decf y 3)        ; y = y - 3  -> 13

;;; ==========================================
;;; 2. DATA TYPES - BUILT-IN PRIMITIVES
;;; ==========================================
;; Numbers - Lisp has a rich numeric tower:
;;   INTEGER : arbitrary precision (BIGNUM)! No overflow. (expt 2 200) just works.
;;             fixnum = fits in a machine word (fast); auto-promotes to bignum.
;;   RATIO   : exact fractions.  (/ 1 3) => 1/3 (NOT 0.333)
;;   FLOAT   : single-float (1.5f0), double-float (1.5d0). Default read as single!
;;   COMPLEX : #C(1 2)
(defvar v-int 2147483647)
(defvar v-big (expt 2 100))       ; 1267650600228229401496703205376
(defvar v-ratio (/ 10 4))         ; 5/2 exact
(defvar v-single 3.14f0)
(defvar v-double 3.141592653589793d0)   ; d0 => double precision

;; Character: #\A  #\Space  #\Newline
(defvar v-char #\A)

;; Boolean: NO dedicated boolean type!
;;   NIL = false = empty list = "nothing"   (all the same object!)
;;   T   = canonical true;  ANYTHING that is not NIL is also true (even 0 and "")
(defvar v-true t)
(defvar v-false nil)

;; String: fixed-syntax, double quotes. It is a VECTOR of characters.
(defvar v-str "Hello")

;; Symbol: a name object. 'foo (quote prevents evaluation). :keyword evaluates to itself.
(defvar v-sym 'my-symbol)
(defvar v-kw :my-keyword)

(format t "int: ~d, ratio: ~a, single: ~f, double: ~f~%" v-int v-ratio v-single v-double)
(format t "char: ~c, bool: ~a / ~a~%" v-char v-true v-false)
(format t "type-of 42: ~a, 3.14d0: ~a, 1/3: ~a, \"hi\": ~a~%"
        (type-of 42) (type-of 3.14d0) (type-of 1/3) (type-of "hi"))

;;; ==========================================
;;; 3. REFERENCE TYPES (LISTS, VECTORS, HASH TABLES)
;;; ==========================================
;; --- LIST: singly linked list of CONS cells. THE fundamental structure. ---
;; A cons cell = pair (car . cdr):  [car|cdr]-> [car|cdr]-> NIL
;;   (car lst) / (first lst)  = first element
;;   (cdr lst) / (rest lst)   = everything AFTER the first
;;   (cons x lst)             = prepend (O(1))
;; QUOTE ' stops evaluation: '(1 2 3) is data. (1 2 3) would try to CALL function 1!
(defvar nums '(10 20 30 40))
(format t "List: ~a~%" nums)
(format t "first: ~a, rest: ~a, third: ~a, length: ~a~%"
        (first nums) (rest nums) (third nums) (length nums))
(format t "nth 2: ~a (0-based)~%" (nth 2 nums))
(format t "cons: ~a, append: ~a, reverse: ~a~%"
        (cons 5 nums) (append nums '(50 60)) (reverse nums))
(list 1 2 (+ 1 2))     ; => (1 2 3)  `list` evaluates its args; quote does not

;; --- VECTOR (array): contiguous, O(1) index ---
(defvar vec (vector 10 20 30 40))       ; or #(10 20 30 40)
(format t "aref vec 0: ~a~%" (aref vec 0))
(setf (aref vec 0) 99)                  ; mutate element
(defvar grid (make-array '(2 3) :initial-element 0))   ; 2x3 matrix
;; Adjustable / growable vector (like ArrayList):
(defvar dyn (make-array 0 :adjustable t :fill-pointer 0))
(vector-push-extend 1 dyn)
(vector-push-extend 2 dyn)

;; --- HASH TABLE (map/dict) ---
(defvar ages (make-hash-table :test 'equal))   ; 'equal needed for string keys!
(setf (gethash "Alice" ages) 30)
(setf (gethash "Bob" ages) 25)
(format t "Alice: ~a~%" (gethash "Alice" ages))
(multiple-value-bind (val found) (gethash "Zed" ages)   ; returns 2 values
  (format t "Zed found? ~a (val=~a)~%" found val))

;; --- ASSOCIATION LIST & PROPERTY LIST (tiny maps built from lists) ---
(defvar alist '((:name . "Alice") (:age . 30)))
(format t "assoc: ~a~%" (cdr (assoc :age alist)))
(defvar plist '(:name "Alice" :age 30))
(format t "getf: ~a~%" (getf plist :age))

;; --- STRINGS ---
;; Length, index, substring, concat:
(defvar s "Hello, World")
(format t "len: ~a, first: ~a, sub: ~a~%" (length s) (char s 0) (subseq s 0 5))
(format t "concat: ~a~%" (concatenate 'string "Hello" " " "Lisp"))
(format t "upper: ~a, search: ~a~%" (string-upcase s) (search "World" s))

;; --- NULL / NIL ---
;; NIL is false, the empty list '(), and "no value". (null x) tests for nil.
;; Memory: NO manual memory management. Garbage collected. No pointers exposed,
;; but every non-immediate object (list, vector, string) is a REFERENCE in effect.

;;; ==========================================
;;; 4. OPERATORS
;;; ==========================================
;; There are no operators, only functions - so PREFIX notation, and they are variadic!
(format t "(+ 1 2 3 4) = ~a~%" (+ 1 2 3 4))    ; 10
(format t "(- 10 3) = ~a~%" (- 10 3))
(format t "(* 2 3 4) = ~a~%" (* 2 3 4))
(format t "(/ 10 3) = ~a  (ratio!)~%" (/ 10 3))       ; 10/3
(format t "(/ 10 3.0) = ~a~%" (/ 10 3.0))             ; 3.3333333
(format t "(floor 10 3) = ~a, (mod 10 3) = ~a, (rem 10 3) = ~a~%"
        (floor 10 3) (mod 10 3) (rem 10 3))
(format t "(expt 2 10) = ~a, (sqrt 16) = ~a~%" (expt 2 10) (sqrt 16))

;; Comparison:  =  /=  <  >  <=  >=   (numbers; variadic: (< 1 2 3) means 1<2<3)
;; Equality (choose carefully!):
;;   eq     : same object in memory (pointer identity) - symbols
;;   eql    : eq + same-value numbers/chars  (default for many functions)
;;   equal  : structural equality (lists, strings)   <- most common
;;   equalp : case-insensitive, loosest
;;   =      : numbers only
(format t "(equal '(1 2) '(1 2)) = ~a, (eq '(1 2) '(1 2)) = ~a~%"
        (equal '(1 2) '(1 2)) (eq '(1 2) '(1 2)))
(format t "(string= \"a\" \"a\") = ~a~%" (string= "a" "a"))

;; Logical: AND, OR, NOT  (short-circuit, and return the deciding VALUE, not just T/NIL)
(format t "(and t nil) = ~a, (or nil 5) = ~a, (not t) = ~a~%" (and t nil) (or nil 5) (not t))

;; Bitwise: logand logior logxor lognot ash (arithmetic shift)
(format t "5 & 3 = ~a, 5 | 3 = ~a, 5 << 1 = ~a~%" (logand 5 3) (logior 5 3) (ash 5 1))

;;; ==========================================
;;; 5. CONDITIONALS (IF FAMILY)
;;; ==========================================
;; IF is an EXPRESSION: (if test then [else]). Only ONE form per branch!
;; Use PROGN to group multiple forms into one.
(if (> 10 5)
    (format t "yes~%")
    (format t "no~%"))

(if (> 10 5)
    (progn                       ; group several statements
      (format t "first~%")
      (format t "second~%")))

;; WHEN / UNLESS: one-armed, implicit progn (multiple body forms OK)
(when (> 10 5)
  (format t "when: true branch a~%")
  (format t "when: true branch b~%"))
(unless (> 1 5)
  (format t "unless: runs because test is false~%"))

;; COND = if / else if / else chain
(let ((score 85))
  (cond ((>= score 90) (format t "A~%"))
        ((>= score 80) (format t "B~%"))
        ((>= score 70) (format t "C~%"))
        (t             (format t "F~%"))))     ; t = the "else"

;;; ==========================================
;;; 6. SWITCH  (CASE / ECASE / TYPECASE)
;;; ==========================================
;; CASE compares with EQL (fine for numbers, symbols, chars; NOT strings!).
(let ((sw 2))
  (case sw
    (1 (format t "one~%"))
    ((2 3) (format t "two or three~%"))        ; list of keys = OR. NO fall-through.
    (otherwise (format t "default~%"))))
;; ECASE errors if nothing matches (exhaustive). TYPECASE dispatches on TYPE:
(typecase 3.14
  (integer (format t "int~%"))
  (float   (format t "float~%"))
  (string  (format t "string~%")))

;;; ==========================================
;;; 7. TERNARY
;;; ==========================================
;; IF already is an expression, so it IS the ternary. No separate operator needed.
(let* ((age 20)
       (status (if (>= age 18) "Adult" "Minor")))
  (format t "Status: ~a~%" status))
;; Nested -> use COND:
(let* ((score 85)
       (grade (cond ((>= score 90) "A") ((>= score 80) "B") ((>= score 70) "C") (t "F"))))
  (format t "Grade: ~a~%" grade))

;;; ==========================================
;;; 8. LOOPS
;;; ==========================================
;; Idiomatic Lisp: recursion & higher-order functions. But loops exist:

;; DOTIMES: repeat n times (0 .. n-1)
(dotimes (i 3) (format t "i=~a " i))
(terpri)      ; newline

;; DOLIST: for-each over a list
(dolist (item '(a b c)) (format t "item=~a " item))
(terpri)

;; LOOP macro - the swiss-army knife (its own mini-language)
(loop for i from 1 to 5 do (format t "~a " i))                     ; 1..5 INCLUSIVE
(terpri)
(loop for i from 0 below 10 by 2 collect i)                        ; => (0 2 4 6 8)
(loop for x in '(1 2 3 4 5) when (evenp x) collect (* x x))        ; => (4 16)
(loop for x in '(1 2 3) sum x)                                     ; => 6
(loop for i from 0
      while (< i 10)
      when (= i 3) do (format t "skip~%")                          ; no `continue` keyword
      when (= i 6) do (return))                                    ; (return) = break

;; WHILE-style using LOOP
(let ((count 0))
  (loop while (< count 3) do (incf count)))

;; DO: general form (var init step) (end-test result)
(do ((i 0 (1+ i)))
    ((>= i 3))
  (format t "do ~a " i))
(terpri)

;; Nested
(dotimes (i 3)
  (dotimes (j 3) (format t "(~a,~a) " i j))
  (terpri))

;; HIGHER-ORDER (preferred): MAPCAR, REMOVE-IF, REDUCE
(format t "map: ~a~%"    (mapcar (lambda (x) (* x x)) '(1 2 3 4)))     ; (1 4 9 16)
(format t "filter: ~a~%" (remove-if-not #'evenp '(1 2 3 4 5 6)))       ; (2 4 6)
(format t "reduce: ~a~%" (reduce #'+ '(1 2 3 4 5)))                     ; 15
;; #'name is shorthand for (function name) - refers to the FUNCTION, not a variable.
;; (Lisp-2: functions and variables live in SEPARATE namespaces.)

;;; ==========================================
;;; 9. INPUT / OUTPUT
;;; ==========================================
;; Output:
;;   PRINT  -> newline + readable repr (strings keep quotes) + space
;;   PRIN1  -> readable repr (keeps quotes)
;;   PRINC  -> human-friendly (no quotes)
;;   FORMAT -> the powerful one. (format destination control-string args...)
;;       destination: t = stdout, nil = RETURN a string, stream = that stream
(print "print")
(princ "princ") (terpri)
(format t "Plain text~%")

;; Input:
;; (let ((line (read-line)))     ; reads a whole line as a string
;;   (format t "You typed: ~a~%" line))
;; (let ((n (read)))             ; READ parses a Lisp object (number, list, symbol...)
;;   (format t "Got ~a~%" n))
;; DANGER: (read) on untrusted input can evaluate reader macros. Use read-line + parse.

;;; ==========================================
;;; 10. FORMATTING  (FORMAT directives)
;;; ==========================================
;; ~a  aesthetic (like %s, human-friendly)     ~s  standard (readable, with quotes)
;; ~d  decimal integer                         ~f  fixed float      ~e  exponent
;; ~x  hex   ~o  octal   ~b  binary            ~c  character
;; ~%  newline     ~&  fresh-line (newline only if not at column 0)     ~~  literal tilde
(format t "Price: ~,2f~%" 19.9934)              ; ~,2f = 2 decimals  -> 19.99
(format t "Padded right-align: [~10d]~%" 42)    ; width 10
(format t "Left-align: [~10a]~%" "Apple")       ; ~10a pads on the RIGHT (left-aligned)
(format t "Right-align str: [~10@a]~%" "Apple") ; @ modifier -> pad on the left
(format t "Zero pad: ~5,'0d~%" 42)              ; 00042
(format t "Commas: ~:d~%" 1500000)              ; 1,500,000
(format t "Hex: ~x, Bin: ~b, Oct: ~o~%" 255 5 8)
(format t "Roman: ~@r, English: ~r~%" 42 42)    ; XLII, forty-two
(format t "List: ~{~a~^, ~}~%" '(1 2 3))        ; iteration directive: 1, 2, 3
;; Return a string instead of printing:
(defvar formatted (format nil "~a is ~d years old" "Alice" 30))

;;; ==========================================
;;; 11. PARSING & TYPE CONVERSION
;;; ==========================================
;; String -> number
(parse-integer "42")                                ; 42   (ERRORS on junk like "apple")
(parse-integer "42abc" :junk-allowed t)             ; 42   (stops at junk)
(parse-integer "apple" :junk-allowed t)             ; NIL  (safe version)
(parse-integer "FF" :radix 16)                      ; 255
;; For floats there is no built-in parse-float; use READ-FROM-STRING (careful w/ input!)
(read-from-string "3.14")                           ; 3.14 (single-float)

;; Number -> string
(princ-to-string 99)                                ; "99"
(format nil "~d" 99)                                ; "99"

;; Numeric conversions
(float 1/3)                                         ; 0.33333334
(float 1/3 1d0)                                     ; double
(truncate 3.99)                                     ; 3 (toward zero)  -> also returns remainder
(floor 3.99) (ceiling 3.01) (round 2.5)             ; 3, 4, 2 (round-to-EVEN: banker's rounding!)
(rational 0.5)                                      ; 1/2

;; COERCE: general type conversion
(coerce '(1 2 3) 'vector)                           ; #(1 2 3)
(coerce #(1 2 3) 'list)
(coerce "abc" 'list)                                ; (#\a #\b #\c)
(coerce 5 'double-float)                            ; 5.0d0
(char-code #\A)                                     ; 65
(code-char 65)                                      ; #\A
(intern "FOO")                                      ; string -> symbol
(string 'foo)                                       ; symbol -> "FOO"  (symbols are UPCASED by the reader!)

;;; ==========================================
;;; 12. FUNCTIONS: DEFINITION & CALLING
;;; ==========================================
;; (defun name (params) "optional docstring" body...)
;; The value of the LAST form is returned automatically (no `return` needed).
;; Lisp does NOT require declaration-before-use for functions (resolved at call time),
;; but compilers may emit a style-warning if defined later in the same file. Fine.

(defun add (a b)
  "Return A plus B."            ; docstring: (documentation 'add 'function)
  (+ a b))
(format t "add(5, 10) = ~a~%" (add 5 10))

;; Function with no return value of interest -> just returns whatever last form returns.
(defun greet (name)
  (format t "Hello, ~a!~%" name))

;; Early exit: RETURN-FROM
(defun first-negative (lst)
  (dolist (x lst nil)
    (when (< x 0) (return-from first-negative x))))

;; Recursion (Lisp's bread and butter)
(defun factorial (n)
  (if (<= n 1)
      1
      (* n (factorial (- n 1)))))
(format t "5! = ~a, 30! = ~a (bignum, no overflow)~%" (factorial 5) (factorial 30))

;; Tail-recursive version (SBCL optimises tail calls at normal optimisation settings)
(defun fact-tail (n &optional (acc 1))
  (if (<= n 1) acc (fact-tail (1- n) (* acc n))))

;; Multiple return values (not a list!): VALUES / MULTIPLE-VALUE-BIND
(defun div-mod (a b) (values (floor a b) (mod a b)))
(multiple-value-bind (q r) (div-mod 10 3)
  (format t "q=~a r=~a~%" q r))

;; Anonymous function = LAMBDA
(funcall (lambda (x) (* x 2)) 21)                   ; 42   (FUNCALL calls a function object)
(apply #'+ '(1 2 3 4))                              ; 10   (APPLY spreads a list as args)

;; Closures: lambdas capture their lexical environment
(defun make-counter ()
  (let ((n 0))
    (lambda () (incf n))))
(defvar c (make-counter))
(funcall c) (funcall c)                             ; 1, 2

;; Local functions: FLET (non-recursive), LABELS (can call itself)
(labels ((fib (n) (if (< n 2) n (+ (fib (- n 1)) (fib (- n 2))))))
  (format t "fib(10) = ~a~%" (fib 10)))

;;; ==========================================
;;; 13. PARAMETERS & PASS BY VALUE / REFERENCE
;;; ==========================================
;; Lambda-list keywords:
;;   &optional  : optional positional, with defaults
;;   &rest      : collects extra args into a list (variadic)
;;   &key       : named (keyword) arguments, order-independent
(defun demo (a &optional (b 10) &rest more &key (verbose nil))
  (declare (ignorable more))
  (list a b verbose))
;; NOTE: mixing &rest and &key is legal but confusing; separate them normally.

(defun connect (host &key (port 80) (secure nil))
  (format t "~a:~a secure=~a~%" host port secure))
(connect "example.com")
(connect "example.com" :secure t :port 443)         ; keyword args, any order

(defun sum-all (&rest numbers)                       ; variadic
  (apply #'+ numbers))
(format t "sum-all(1..5) = ~a~%" (sum-all 1 2 3 4 5))

;; ---- PASS BY VALUE or REFERENCE? ----
;; Lisp is "pass by VALUE of a REFERENCE" (like Java/Python):
;;   - The function gets a copy of the reference (pointer) to the object.
;;   - REBINDING the parameter does NOT affect the caller.
;;   - MUTATING the object DOES affect the caller (for lists, vectors, hash tables, structs).
;;   - Numbers, characters are immediate values - effectively copied.

(defun rebind (x)
  (setf x 999)            ; only changes the LOCAL variable
  x)
(defvar orig 10)
(rebind orig)
(format t "After rebind: ~a (unchanged)~%" orig)

(defun mutate (vec)
  (setf (aref vec 0) 999) ; mutates the shared object
  vec)
(defvar my-vec (vector 1 2 3))
(mutate my-vec)
(format t "After mutate: ~a (changed!)~%" my-vec)

;; DESTRUCTIVE vs NON-DESTRUCTIVE functions:
;;   (reverse lst) / (sort (copy-list lst) #'<) -> returns NEW, original intact
;;   (nreverse lst) / (sort lst #'<)            -> may MODIFY the original (faster). Use return value!
(defvar to-sort (list 3 1 2))
(sort (copy-list to-sort) #'<)                       ; safe: to-sort unchanged
;; Never mutate a quoted literal '(1 2 3): undefined behaviour. Use (list 1 2 3) or copy-list.

;;; ==========================================
;;; 14. SPECIAL DATA TYPES - STRUCTS & CLASSES
;;; ==========================================
;; DEFSTRUCT: simple record. Auto-generates make-X, X-slot accessors, X-p predicate, copy-X.
(defstruct person
  (name "" :type string)
  (age 0 :type integer)
  (height 0.0 :type float))

(defvar p (make-person :name "Alice" :age 30 :height 1.65))
(format t "~a is ~a~%" (person-name p) (person-age p))
(setf (person-age p) 31)                             ; mutate slot
(format t "person-p: ~a~%" (person-p p))
(format t "~a~%" p)                                  ; #S(PERSON :NAME "Alice" ...)

;; Alias type: DEFTYPE
(deftype small-int () '(integer 0 255))

;; CLOS (Common Lisp Object System): classes + GENERIC FUNCTIONS (multiple dispatch)
(defclass car ()
  ((color :initarg :color :accessor car-color :initform "White")
   (year  :initarg :year  :accessor car-year)))

(defvar car1 (make-instance 'car :color "Red" :year 2020))

;; Methods belong to GENERIC FUNCTIONS, not to classes (unlike Java/C++).
(defgeneric display-info (obj))
(defmethod display-info ((c car))
  (format t "~a ~a Car~%" (car-year c) (car-color c)))

(display-info car1)
(setf (car-color car1) "Blue")
(display-info car1)

;; Inheritance:
(defclass electric-car (car)
  ((battery :initarg :battery :accessor battery)))
(defmethod display-info ((c electric-car))
  (call-next-method)                                 ; like super.method()
  (format t "  battery: ~a kWh~%" (battery c)))
(display-info (make-instance 'electric-car :year 2024 :color "Green" :battery 75))

;; MACROS: code that writes code (Lisp's superpower - runs at compile time)
(defmacro my-unless (test &body body)
  `(if ,test nil (progn ,@body)))    ; ` backquote template, , unquote, ,@ splice
(my-unless nil (format t "macro-expanded!~%"))

;; ERROR HANDLING: conditions & restarts
(handler-case (/ 1 0)
  (division-by-zero () (format t "caught div by zero~%")))