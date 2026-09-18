class user:
    gender = "male"
    def __init__(self, name):
        self.name = name

user1 = user("John")
user2 = user("Jane")
user2.dev = "nthxdev"
user2.role = "developer"
# print(user.__dict__)
print(user.__dict__['gender'])
print(user2.__dict__) 

# Lookup order
"""
obj.attribute
    ↓
1. obj.__dict__
2. Class.__dict__
3. Parent classes (MRO)
"""
