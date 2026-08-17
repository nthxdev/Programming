# A namespace is a mapping of name -> object
# it's like a python dictionary that stores variable names, but with some additional features
# Python doesn't store values by name directly—it stores references in a namespace
# without namespaces, Every variable would share one giant tablePython would have to search throught all the variables 
# Namespaces let the same name exist in different places.

# A namespace is just a dictionary (mapping) from name → object.
# Built-in Namespace (builtins.__dict__)
"""
{
    "print": <built-in function print>,
    "len": <built-in function len>,
    "int": <class 'int'>,
    "str": <class 'str'>,
    "list": <class 'list'>,
    "dict": <class 'dict'>,
    "tuple": <class 'tuple'>,
    "set": <class 'set'>,

    "Exception": <class 'Exception'>,
    "ValueError": <class 'ValueError'>,
    "TypeError": <class 'TypeError'>,
    "KeyError": <class 'KeyError'>,
    "IndexError": <class 'IndexError'>,

    "True": True,
    "False": False,
    "None": None,

    "range": <class 'range'>,
    "enumerate": <class 'enumerate'>,
    "zip": <class 'zip'>,

    ...
}
"""
# inspecting namesapces
import builtins
x = 10  # This variable is stored in the global namespace
print(type(builtins.__dict__))   # <class 'dict'>
print(f"print: {builtins.__dict__['print']}")
print(f"len: {builtins.__dict__['len']}")
print(f"x: {globals()['x']}") # Returns the global namespace.

def my_function():
    x = 5  # This variable is stored in the local namespace of my_function
    print(x)  # Accessing the local variable x
    print(locals())  # Returns the local namespace of my_function
my_function()
print(x)  # Accessing the global variable x
# Both x variables exist because they are in different namespaces.

print(f"dir(): {dir()}")  # Returns a list of names in the current local namespace.


# Types of namespaces:
# 1. Built-in namespace: Created when Python starts.Contains built-in functions and exceptions 
# contains - print(), len(), sum(), int(), list(), Exception, etc.
# internally 
str = "Hello, World!"
print(len(str)) # finds len() in the built-in namespace
print(f"len: {builtins.__dict__['len']}")  

# 2. Global namespace: Contains variables defined at the top level of a script or module
# Contains -> variables, functions, classes, imported modules
# 3. Local namespace: Contains variables defined within a function. Created every time a function is called. namespace is destroyed after a function returns.
# 4. Enclosing namespace: Contains variables defined in the enclosing function. Created when a function is defined inside another function. 
def outer():
    x = 10
    def inner():
        print(x)
# inner() has access to outer()'s namespace.