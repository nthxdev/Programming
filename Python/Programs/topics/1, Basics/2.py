# print(*objects, sep=' ', end='\n', file=sys.stdout, flush=False)
# round(number[, ndigits])
# print(f"{z:.2f}")
# some patterns - smart looops, random.choice
# sys argv, [1: -1], sys.exit, 

# __main__ implement
# multifile import - import functions test them using assert

# language that is extensible everything and even designable , keywords add more 

Arrayofdict=[{}]
house=[]
for student in arrayofdict:
    if student["house"] not in house:
        houses.append(student["house"])
for house in sorted(houses):
    print(house)
# --- OR ---
# we can use houses=set() coz they can only have unique values
# global keyword of python allow manipulate global var  modify a global variable inside a function

# --- UNPACKING  ---
def total(galleons, sickles, knuts):
    return (galleons * 17 + sickle) * 29 + knuts
coins=[100, 50, 25]
print(total(*coins), "knuts")

import cowsay 
import pyttsx3
engine = pyttsx3.init()
this=input("what's this ? ")
cowsay.cow(this)
engine.say(this)
engine.runAndWait()

def yell(words):
    uppercased=[]
    for word in words:
        uppercased.append(word.upper())
print(*uppercased)
# --- OR BETTER ---
def yell(*words):
    uppercased=map(str.upper, words)
    print(*uppercased)
# --- OR ---
     uppercased=[word.upper() for word in words]
sutdents = [
    {"name": name ....}
    ....
]
def is_gryffindor(s):
    return s["house"] = "gryffindor"
gryffindors = filter(is_gryffindor, students)
grayffindors = [
    student["name"] for student in students if student["house"] ==="gryffindor"
]
for gryffindor in sorted(gryffindors, key=lambda s: s["name"]):
    print(gryffindor["name"])
# --- OR ---
grayffindors = {student: "Gryffindor" for student in students}

# --- ENUMERATE ---
enumerate(iterable, start=0) # for i, j -> it return two VARS

# --- SHEEP PROGRAM ---
def main():
    n = input()
    for s in sheep(n):
        print(s)
def sheep(n):
    flock=[]
    for i in range(n):
        flock.append("emoji" * i)
    return flock


# --- GENERATORS ---
# Yield 

# --- ITERATORS ---

