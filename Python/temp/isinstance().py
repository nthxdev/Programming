boolean = True
class topic:
    def __init__(self, name):
        self.name = name
class concept:
    def __init__(self, name):
        self.name = name
string = "Python"
topic1 = topic("isinstanceof")
concept1 = concept("isinstance")
print(isinstance(string, str))
print(isinstance(topic1, topic))
print(isinstance(concept1, concept))
print(isinstance(boolean, (int, float, bool))) # < -- (logical OR). isinstance() can check for multiple types at once. It takes a tuple of types as the second argument.

