```Bash
cd ~Programming/Python/Progrmas

# Create a shared environment for this project
python3 -m venv .venv

# Activate it
source .venv/bin/activate

# Update pip
python -m pip install --upgrade pip

# Verify the active interpreter
python -c "import sys; print(sys.executable)"
```