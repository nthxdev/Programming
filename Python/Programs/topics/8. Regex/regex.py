import re
# ==== REGEX ====
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

def regexes():
    name = input().strip()
    matches = re.search(r"^(.+), (.+)$", name)
    if matches:
        name = matches.group(2) + " " + matches.group(1)
    # Even Better using Walrus Operator -> walrus operator := assigns a value to a variable and uses that value in the same expression ====
    if matches := re.search(r"^(.+),, *(.+)$", name):
    if "," in name:
        last, first = name.split(",|?")
        name = f"{first} {last}"
    print(f"hello, {name}")
    url = input("url: ").strip()
    username = re.sub(r"^(https?://)?(www\.)?twitter\.com/", "", url)

