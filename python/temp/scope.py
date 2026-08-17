# The namespace stores the names; 
# the scope decides which namespaces Python searches.
# A scope = the region where a namespace is searched.
# LEGB Rule (Name Resolution)
# Python searches names in this order: -> Local -> Enclosing -> Global -> Built-in
x = "global x"
def outer_function():
    y = "enclosing x"
    nonlocalvar = "nonlocal"
    def inner_function():
        x = "local x"
        nonlocal nonlocalvar
        nonlocalvar = "modified nonlocal"
        print(x)  # Accessing the local variable x
        print(y)  # Accessing the enclosing variable y
        print(nonlocalvar)  # Accessing the modified nonlocal variable
    inner_function()
outer_function()
print(x)  # Accessing the enclosing variable x
