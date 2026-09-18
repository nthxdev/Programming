# CLASS
# A class is a blueprint/template that defines the data (attributes) and behavior (methods) of objects.
class Dog:
    pass
# Nothing exists yet—only the blueprint.

# OBJECT
# An object is an instance created from a class.
# dog1 = Dog()
"""
Class (Dog)
     │
     |
     └──► dog1 (Object)
"""

class Dog:
    def __init__(self, name):
        self.name = name
    def bark(self):
        print(f"{self.name} woof, ruff, arf, bow-wow.")

dog1 = Dog("Tommy")
dog2 = Dog("Bruno")

print(dog1.name)
print(dog2.name)
dog1.bark() # Python secrelty changes it to Dog.bark(dog1)
# So dog1 needs somewhere to go. It goes into the first parameter so,
# def bark(self):
#     print(self.name)
# that is why ealrier this error - Dog.bark() takes 0 positional arguments but 1 was given
