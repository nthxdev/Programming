-- Recommend knowing basic relational concepts first (table = rows x columns)
-- Dialect: PostgreSQL (notes mention MySQL / SQLite / SQL Server differences)
-- SQL is DECLARATIVE: you say WHAT you want, the engine decides HOW.
-- It is NOT a general purpose language; the "programming" parts (variables, loops,
-- functions) live in procedural extensions: PL/pgSQL (Postgres), T-SQL (SQL Server),
-- PL/SQL (Oracle), stored procedures (MySQL).

-- Single line comment
/* Multi
   line comment */

-- ==========================================
-- 1. BASICS OF VARIABLES & CONSTANTS
-- ==========================================
-- Plain SQL has no variables. They exist only inside procedural blocks or sessions.
-- Syntax varies WILDLY by dialect:
--   PostgreSQL : DECLARE inside DO $$ ... $$ (PL/pgSQL block)
--   MySQL      : SET @var = 5;  (session variable)  |  DECLARE (inside procedures)
--   SQL Server : DECLARE @var INT = 5;
--   SQLite     : no variables at all (use CTEs or app code)

-- PostgreSQL: anonymous block
DO $$
DECLARE
    counter INTEGER := 5;                 -- := is assignment in PL/pgSQL
    max_users CONSTANT INTEGER := 100;    -- CONSTANT = read-only
BEGIN
    RAISE NOTICE 'counter=%, max=%', counter, max_users;   -- % is the placeholder
END $$;

-- MySQL session variable (lives for the connection)
-- SET @greeting = 'Hello';  SELECT @greeting;

-- "Constants" in plain SQL = literals, or a CTE used as a named value:
WITH const AS (SELECT 3.14159 AS pi)
SELECT pi FROM const;

-- ==========================================
-- 2. DATA TYPES - BUILT-IN PRIMITIVES
-- ==========================================
-- Types are attached to COLUMNS (strict schema). Names differ per dialect.
--
-- Integers:
--   SMALLINT  2 bytes  -32,768 .. 32,767
--   INTEGER   4 bytes  -2,147,483,648 .. 2,147,483,647   (INT)
--   BIGINT    8 bytes  -9.2e18 .. 9.2e18
--   (no UNSIGNED in Postgres; MySQL has UNSIGNED)
--   SERIAL / BIGSERIAL / GENERATED AS IDENTITY = auto-increment integer
--
-- Exact decimals (USE FOR MONEY!):
--   NUMERIC(precision, scale) / DECIMAL(10,2)  -> up to 10 digits, 2 after the point
--
-- Approximate floating point (IEEE 754):
--   REAL (4 bytes, ~6 digits), DOUBLE PRECISION (8 bytes, ~15 digits)
--   0.1 + 0.2 <> 0.3 with these! Never use for currency.
--
-- Text:
--   CHAR(n)      fixed length, space padded
--   VARCHAR(n)   variable length, max n
--   TEXT         unlimited (Postgres: same speed as VARCHAR)
--   Strings use SINGLE quotes: 'Hello'. Double quotes are for identifiers ("my table").
--
-- Boolean: BOOLEAN -> TRUE, FALSE, NULL (three-valued logic!)
--   (MySQL: TINYINT(1); SQL Server: BIT)
--
-- Date & time:
--   DATE, TIME, TIMESTAMP, TIMESTAMPTZ (with time zone), INTERVAL
--
-- Other: UUID, JSON / JSONB, BYTEA (binary), ENUM

-- ==========================================
-- 3. "REFERENCE TYPES": TABLES, NULL, ARRAYS
-- ==========================================
-- The core data structure of SQL is the TABLE (a set/multiset of rows).

CREATE TABLE users (
    id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name        VARCHAR(50)  NOT NULL,
    email       TEXT         UNIQUE,
    age         INTEGER      CHECK (age >= 0),
    height      NUMERIC(4,2),
    is_active   BOOLEAN      DEFAULT TRUE,
    created_at  TIMESTAMPTZ  DEFAULT now()
);

CREATE TABLE orders (
    id       BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id  BIGINT REFERENCES users(id) ON DELETE CASCADE,  -- FOREIGN KEY (a "pointer")
    total    NUMERIC(10,2) NOT NULL
);

-- NULL: "unknown / missing value". NOT zero, NOT empty string.
--   NULL = NULL   -> NULL (not TRUE!)   Use:  IS NULL / IS NOT NULL
--   NULL + 5      -> NULL
--   COALESCE(a, b, c) -> first non-NULL value
--   Anything compared with NULL yields UNKNOWN -> row filtered out by WHERE.

-- Arrays (Postgres):
--   tags TEXT[]  ->  ARRAY['a','b']   ->  tags[1] (1-BASED indexing!)

-- ==========================================
-- 4. OPERATORS
-- ==========================================
-- Arithmetic: + - * / %   (integer / integer = INTEGER division in Postgres: 10/3 = 3)
--             ^ (power in Postgres)   MOD(10,3)
SELECT 10 + 3, 10 - 3, 10 * 3, 10 / 3, 10 % 3, 10 / 3.0 AS real_div;

-- Comparison: =  <> (or !=)  >  <  >=  <=       (single = for equality!)
--   x BETWEEN 1 AND 10   (inclusive)
--   x IN (1, 2, 3)
--   x IS NULL / IS NOT NULL
--   x IS DISTINCT FROM y   (NULL-safe comparison)
--   name LIKE 'A%'   (% any chars, _ one char)   ILIKE = case-insensitive (Postgres)
--   name ~ '^A.*'    regex (Postgres)

-- Logical: AND, OR, NOT   (three-valued: TRUE / FALSE / UNKNOWN)
--   TRUE AND NULL  -> NULL,   FALSE AND NULL -> FALSE,   TRUE OR NULL -> TRUE

-- String concat: ||   (MySQL: CONCAT(); SQL Server: +)
SELECT 'Hello' || ' ' || 'World';

-- Bitwise: & | # (XOR in Postgres) ~ << >>

-- Set operators (combine result sets):
--   UNION (dedupe), UNION ALL (keep dupes), INTERSECT, EXCEPT (MINUS in Oracle)

-- ==========================================
-- 5. CONDITIONALS
-- ==========================================
-- (a) In queries: CASE expression (it is an EXPRESSION, returns a value)
SELECT name,
       CASE
           WHEN age >= 65 THEN 'Senior'
           WHEN age >= 18 THEN 'Adult'
           ELSE 'Minor'
       END AS category
FROM users;

-- (b) In procedural code: IF / ELSIF / ELSE   (note: ELSIF in PL/pgSQL, no 'e')
DO $$
DECLARE n INT := 20;
BEGIN
    IF n > 100 THEN
        RAISE NOTICE 'big';
    ELSIF n > 10 THEN
        RAISE NOTICE 'medium';
    ELSE
        RAISE NOTICE 'small';
    END IF;
END $$;

-- WHERE is the "if" of set-based SQL: it FILTERS rows.
SELECT * FROM users WHERE age >= 18 AND is_active;

-- ==========================================
-- 6. SWITCH
-- ==========================================
-- Simple CASE = the switch statement (equality match against one value)
SELECT name,
       CASE age
           WHEN 18 THEN 'just adult'
           WHEN 21 THEN 'legal drinking (US)'
           ELSE 'other'
       END
FROM users;
-- No fall-through. First matching WHEN wins. No ELSE and no match -> NULL.

-- ==========================================
-- 7. TERNARY
-- ==========================================
-- No ?: operator. Options:
--   CASE WHEN cond THEN a ELSE b END       (standard, everywhere)
--   IIF(cond, a, b)                        (SQL Server, SQLite 3.32+)
--   IF(cond, a, b)                         (MySQL)
--   COALESCE(x, default)                   (NULL fallback)
--   NULLIF(a, b)                           (returns NULL if a = b; avoids div by zero)
SELECT COALESCE(email, 'no-email') AS email,
       CASE WHEN age >= 18 THEN 'Adult' ELSE 'Minor' END AS status,
       10 / NULLIF(0, 0) AS safe_div      -- NULL instead of "division by zero" error
FROM users;

-- ==========================================
-- 8. LOOPS
-- ==========================================
-- SQL avoids loops: think in SETS. A loop over rows is usually a SELECT/JOIN.
-- BUT loops exist:

-- (a) Set-based "loop": generate_series (Postgres)
SELECT * FROM generate_series(1, 5);         -- 1,2,3,4,5

-- (b) Recursive CTE (loop / tree traversal)
WITH RECURSIVE countdown(n) AS (
    SELECT 5                                  -- anchor (starting row)
    UNION ALL
    SELECT n - 1 FROM countdown WHERE n > 1   -- recursive step, stops when WHERE fails
)
SELECT * FROM countdown;

-- (c) Procedural loops (PL/pgSQL)
DO $$
DECLARE i INT := 0;
BEGIN
    WHILE i < 3 LOOP
        i := i + 1;
    END LOOP;

    FOR j IN 1..5 LOOP          -- inclusive range
        CONTINUE WHEN j = 2;    -- continue
        EXIT WHEN j = 4;        -- break
    END LOOP;

    FOR r IN SELECT name FROM users LOOP   -- cursor-style row loop (SLOW at scale)
        RAISE NOTICE '%', r.name;
    END LOOP;
END $$;

-- ==========================================
-- 9. INPUT / OUTPUT (CRUD)
-- ==========================================
-- "Output" = SELECT.  "Input" = INSERT / UPDATE / DELETE.  CRUD = Create Read Update Delete

-- CREATE
INSERT INTO users (name, email, age) VALUES ('Alice', 'a@x.com', 30);
INSERT INTO users (name, age) VALUES ('Bob', 25), ('Carol', 41);      -- multi-row
INSERT INTO users (name, age) VALUES ('Dan', 19) RETURNING id;        -- Postgres: get new id

-- READ - logical order of execution (NOT the order you write it!):
--   FROM/JOIN -> WHERE -> GROUP BY -> HAVING -> SELECT -> DISTINCT -> ORDER BY -> LIMIT
SELECT DISTINCT name, age
FROM users
WHERE age BETWEEN 18 AND 65
ORDER BY age DESC, name ASC
LIMIT 10 OFFSET 0;         -- (SQL Server: TOP 10 / OFFSET-FETCH; Oracle: FETCH FIRST)

-- UPDATE (ALWAYS use WHERE or you change EVERY row!)
UPDATE users SET age = age + 1 WHERE name = 'Alice';

-- DELETE (same warning)
DELETE FROM users WHERE is_active = FALSE;
-- TRUNCATE TABLE users;   -- wipes all rows quickly

-- AGGREGATES: COUNT(*), COUNT(col) (ignores NULL), SUM, AVG, MIN, MAX
SELECT is_active, COUNT(*) AS n, AVG(age) AS avg_age
FROM users
GROUP BY is_active
HAVING COUNT(*) > 1;         -- HAVING filters groups; WHERE filters rows BEFORE grouping

-- JOINS
SELECT u.name, o.total
FROM users u
INNER JOIN orders o ON o.user_id = u.id;          -- only matching rows
-- LEFT JOIN  : all left rows + matches (NULL if none)
-- RIGHT JOIN : all right rows
-- FULL JOIN  : everything from both
-- CROSS JOIN : cartesian product (every combo)

-- Subquery
SELECT name FROM users WHERE id IN (SELECT user_id FROM orders WHERE total > 100);

-- Window function (aggregate WITHOUT collapsing rows)
SELECT name, age, RANK() OVER (ORDER BY age DESC) AS age_rank FROM users;

-- Transactions (all-or-nothing, ACID)
BEGIN;
    UPDATE users SET age = age + 1 WHERE id = 1;
COMMIT;        -- or ROLLBACK;

-- ==========================================
-- 10. FORMATTING
-- ==========================================
SELECT format('Hello %s, you are %s years old', 'Alice', 30);     -- Postgres printf-like
SELECT to_char(1500000, 'FM999,999,999');                        -- '1,500,000'
SELECT to_char(19.9934, 'FM999.00');                             -- '19.99'
SELECT ROUND(19.9934, 2);                                        -- 19.99
SELECT to_char(now(), 'YYYY-MM-DD HH24:MI:SS');
SELECT UPPER('abc'), LOWER('ABC'), LENGTH('Hello'), TRIM('  hi  ');
SELECT SUBSTRING('Hello World' FROM 1 FOR 5);                    -- 'Hello' (1-BASED!)
SELECT REPLACE('Hello World', 'World', 'SQL');
SELECT LPAD('42', 5, '0');                                       -- '00042'

-- ==========================================
-- 11. PARSING & TYPE CONVERSION (Casting)
-- ==========================================
-- Standard:  CAST(expr AS type)
-- Postgres:  expr::type   (shorthand)
SELECT CAST('42' AS INTEGER);
SELECT '3.14'::NUMERIC;
SELECT 99::TEXT;
SELECT '2026-09-30'::DATE;
SELECT to_number('1,234.50', '9,999.99');
SELECT to_date('30/09/2026', 'DD/MM/YYYY');
-- Failed cast RAISES an error (e.g. 'apple'::INT). Postgres 16+: pg_input_is_valid('apple','int')
-- Implicit conversion: SELECT 1 + 1.5 -> 2.5 (int promoted to numeric)

-- ==========================================
-- 12. FUNCTIONS
-- ==========================================
-- Built-in functions are everywhere (see above). User-defined functions:

CREATE OR REPLACE FUNCTION add_numbers(a INTEGER, b INTEGER)
RETURNS INTEGER
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN a + b;
END;
$$;

SELECT add_numbers(5, 10);          -- 15

-- Pure SQL function (simpler, often faster - the planner can inline it)
CREATE OR REPLACE FUNCTION add_sql(a INT, b INT) RETURNS INT
LANGUAGE sql IMMUTABLE AS $$ SELECT a + b $$;

-- Default parameters
CREATE OR REPLACE FUNCTION greet(name TEXT DEFAULT 'World') RETURNS TEXT
LANGUAGE sql AS $$ SELECT 'Hello, ' || name $$;
SELECT greet(), greet('Alice'), greet(name => 'Bob');           -- named argument

-- Table-returning function
CREATE OR REPLACE FUNCTION adults(min_age INT) RETURNS SETOF users
LANGUAGE sql AS $$ SELECT * FROM users WHERE age >= min_age $$;
SELECT * FROM adults(18);

-- Variadic (variable args)
CREATE OR REPLACE FUNCTION sum_all(VARIADIC nums INT[]) RETURNS INT
LANGUAGE sql AS $$ SELECT SUM(n)::INT FROM unnest(nums) AS n $$;
SELECT sum_all(1, 2, 3, 4, 5);      -- 15

-- ==========================================
-- 13. PARAMETERS & PASS BY VALUE / REFERENCE
-- ==========================================
-- Parameter modes:
--   IN     (default) : input, passed BY VALUE (copy). Cannot be modified by caller.
--   OUT              : output; the function "returns" it through this slot
--   INOUT            : passed in AND modified value comes back  (closest to by-reference)
--   VARIADIC         : variable count of args

CREATE OR REPLACE FUNCTION divmod(a INT, b INT, OUT quotient INT, OUT remainder INT)
LANGUAGE plpgsql AS $$
BEGIN
    quotient  := a / b;
    remainder := a % b;
END $$;
SELECT * FROM divmod(10, 3);        -- quotient=3, remainder=1

-- PROCEDURES (Postgres 11+): can COMMIT inside, called with CALL (no return value)
CREATE OR REPLACE PROCEDURE add_user(n TEXT, a INT)
LANGUAGE plpgsql AS $$
BEGIN
    INSERT INTO users (name, age) VALUES (n, a);
END $$;
CALL add_user('Eve', 22);

-- ==========================================
-- 14. SPECIAL DATA TYPES - COMPOSITE (Structs)
-- ==========================================
-- Every table row is already a "struct". You can also define standalone composites:
CREATE TYPE point AS (x INT, y INT);
SELECT (ROW(3, 4)::point).x;                     -- 3

-- ENUM
CREATE TYPE mood AS ENUM ('sad', 'ok', 'happy');

-- JSONB (semi-structured; document store inside SQL)
SELECT '{"name":"Alice","tags":["a","b"]}'::jsonb -> 'name';      -- "Alice"   (-> keeps JSON)
SELECT '{"name":"Alice"}'::jsonb ->> 'name';                      -- Alice     (->> returns text)

-- VIEW = saved query (a named virtual table)
CREATE VIEW adult_users AS SELECT * FROM users WHERE age >= 18;

-- INDEX = speeds up reads, slows writes. Like a book's index (B-tree by default).
CREATE INDEX idx_users_email ON users (email);
-- EXPLAIN ANALYZE SELECT ...;   -- see the query plan + real timings

-- DROP TABLE orders;  DROP TABLE users;       -- cleanup (order matters: FK dependencies)
