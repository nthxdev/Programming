from . import submodule
def module():
    print("This is a package module.")
def greet(name):
    return f"Hello, {name}!"
def fileinfo():
    print(f"Module : {__name__}")
    print(f"File   : {__file__}")
def dependency():
    print("Checking dependency...")
    try:
        submodule.submoduleinfo()
        print("Dependency: OK")
    except Exception as err:
        print(f"Dependency failed: {err}")
if __name__ == "__main__":
    module()
    print(greet("Nthx"))
    fileinfo()
    dependency()