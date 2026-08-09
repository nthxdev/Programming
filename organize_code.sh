#!/bin/bash

# Script to organize code files into markdown format with proper code blocks
# Usage: ./organize_code.sh <source_directory>

SOURCE_DIR="${1:-.}"
OUTPUT_DIR="prg"

# Create output directory if it doesn't exist
if [ ! -d "$OUTPUT_DIR" ]; then
    mkdir -p "$OUTPUT_DIR"
    echo "✓ Created '$OUTPUT_DIR' folder"
fi

# Counter for processed files
count=0

# Function to process a single file
process_file() {
    local filepath="$1"
    local filename=$(basename "$filepath")
    local extension="${filename##*.}"
    local basename="${filename%.*}"
    
    # Extract the base name (for xyz_improved.c -> xyz)
    # Remove any suffix like "_improved", "_reference", etc.
    base=$(echo "$basename" | sed 's/_improved$//' | sed 's/_reference$//')
    
    # Map extension to language identifier
    case "$extension" in
        c) lang="c" ;;
        cpp|cc|cxx|c++) lang="cpp" ;;
        py) lang="python" ;;
        sh|bash) lang="bash" ;;
        go) lang="go" ;;
        rs) lang="rust" ;;
        java) lang="java" ;;
        ts|tsx) lang="typescript" ;;
        js|jsx) lang="javascript" ;;
        kt) lang="kotlin" ;;
        ml) lang="ocaml" ;;
        nim) lang="nim" ;;
        odin) lang="odin" ;;
        sql) lang="sql" ;;
        lisp|el) lang="lisp" ;;
        nix) lang="nix" ;;
        ps1) lang="powershell" ;;
        sol) lang="solidity" ;;
        swift) lang="swift" ;;
        zig) lang="zig" ;;
        exs|ex) lang="elixir" ;;
        lua) lang="lua" ;;
        *) lang="$extension" ;;
    esac
    
    # Create output filename
    output_filename="${base}_${extension}.md"
    output_filepath="$OUTPUT_DIR/$output_filename"
    
    # Read file content
    content=$(cat "$filepath")
    
    # Create new markdown file with code blocks
    {
        echo ""
        echo ""
        echo "----"
        echo "\`\`\`$lang"
        echo "$content"
        echo "\`\`\`"
    } > "$output_filepath"
    
    echo "✓ Processed: $filename → $output_filename"
    ((count++))
}

# Find and process all files recursively
echo "Scanning for code files in $SOURCE_DIR..."
echo ""

while IFS= read -r file; do
    process_file "$file"
done < <(find "$SOURCE_DIR" -type f \( \
    -name "*.c" -o -name "*.cpp" -o -name "*.py" -o -name "*.sh" \
    -o -name "*.go" -o -name "*.rs" -o -name "*.java" -o -name "*.ts" \
    -o -name "*.kt" -o -name "*.ml" -o -name "*.nim" -o -name "*.odin" \
    -o -name "*.sql" -o -name "*.lisp" -o -name "*.nix" -o -name "*.ps1" \
    -o -name "*.sol" -o -name "*.swift" -o -name "*.zig" -o -name "*.exs" \
    -o -name "*.lua" -o -name "*.js" -o -name "*.kt" \
\))

echo ""
echo "=========================================="
echo "✓ Complete! Processed $count files"
echo "✓ All files moved to '$OUTPUT_DIR' folder"
echo "=========================================="
