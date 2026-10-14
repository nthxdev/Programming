
# --- REGEX ---
# USES FINITE STATE MACHINE NON DETERMISTIC FINITE AUTOMATION
# . any char expect newline
# * 0 or more repetitions
# + 1 or more repetitions
# ? 0 or 1 repetitions
# {m} m repetitions
# {m, n} m-n repetitions
# [] set of char
# [^] complementing the set
# \d decimanl digit
# \D not a decimanl digit
# \s whitespace char
# \S not a whitespace char
# \w word char... as well as number and the underscore
# \W not a word char
# A|B either A or B
# (...) a group
# (?:...) non-capturing version
# .lower(), .upper()
# import re-> re.IGNORECASE, re.MULTILINE, re.DOTALL
# re.search(pattern, string, flags)
# re.match(pattern, string, flags=0)
# re.fullamtch(pattern, string, flags=0)
# re.sub(pattern, repl, string, count=0, flags=0)
# re.split(pattern, string, maxsplit=0,  flags=0)
# re.findall(pattern, string, flags=0)
# r"^[a-zA-Z0-9_]+@[a-zA-Z0-9_]+\.edu$"
# r"^\w+@\w+\.(com|edu|gov|net|org)$"
# r"^\w+@(\w+\.)?\w+\.edu$"
# complete pattern email - ^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$

# --- FORMAT.PY---
# import re
# name = input().strip()
# matches = re.search(r"^(.+), (.+)$", name)
# if matches:
#     last, first = matches.groups()
#     name=f"{first} {last}"
# -- OR ---
# name = matches.group(2) + " " + matches.group(1)
# --- EVEN BETTER USING WALRUS OPERATOR ---
# if matches := re.search(r"^(.+),, *(.+)$", name):
# --- ALSO ---
# name = input().strip()
# if "," in name:
#     last, first = name.split(",|?")
#     name = f"{first} {last}"
# print(f"hello, {name}")

# --- RETURN FROM FUNCTION & THAN WE CAN USE UNPACKING TO GET VALUE IN VARS ---

# url = input("url: ").strip()
# username = url.replace("https://twitter.com/", "")
# --- OR ---
# username = re.sub(r"^(https?://)?(www\.)?twitter\.com/", "", url)

