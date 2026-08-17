# Modules should define functions/classes; they shouldn't run them automatically.
from .pkgmodule import module, dependency
def main():
    module()
    dependency()
if __name__ == "__main__":
    main()