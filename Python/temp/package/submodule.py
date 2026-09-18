submodule = "Hello from submodule!"
def submoduleinfo():
    print(f"Module : {__name__}")
    print(f"File   : {__file__}")
    print(submodule)
if __name__ == "__main__":
    submoduleinfo()