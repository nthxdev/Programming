class topic:
    def __init__(self, name):
        self.name = name
class concept:
    def __init__(self, name):
        self.name = name
string = "Python"
topic1 = topic("typeof")
concept1 = concept("type")
print(type(string))
print(type(topic1))
print(type(concept1))
print(type(string) is str) # <class 'str'> It's only the printed representation (repr). type retunrs actual class object