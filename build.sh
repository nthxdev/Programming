#!/usr/bin/env bash

# ==============================================================================
# Strict Execution Mode
# ==============================================================================
set -euo pipefail

# ==============================================================================
# 1. Core Functions
# ==============================================================================

get_extension() {
    local lang_lower
    lang_lower=$(echo "$1" | tr '[:upper:]' '[:lower:]')

    case "$lang_lower" in
        python)       echo "py" ;;
        java)         echo "java" ;;
        c)            echo "c" ;;
        cpp|c++)      echo "cpp" ;;
        c#|csharp)    echo "cs" ;;
        nix)          echo "nix" ;;
        zig)          echo "zig" ;;
        js|javascript)echo "js" ;;
        ts|typescript)echo "ts" ;;
        rust)         echo "rs" ;;
        go)           echo "go" ;;
        bash)         echo "sh" ;;
        powershell)   echo "ps1" ;;
        lua)          echo "lua" ;;
        *)            echo "txt" ;; 
    esac
}

print_usage() {
    echo "Usage:"
    echo "  Mode 1 (Init):   $0 1 <path/to/base_filename> <lang1> [lang2 ...]"
    echo "  Mode 2 (Append): $0 2 <target_directory_path> \"<lang1 lang2>\" \"<file1 file2>\""
    exit 1
}

# ==============================================================================
# 2. Execution Engine
# ==============================================================================

if [[ $# -lt 3 ]]; then
    print_usage
fi

MODE="$1"

if [[ "$MODE" == "1" ]]; then
    # Mode 1: Scaffold full directory tree and a single initial file
    INPUT_PATH="$2"
    shift 2
    
    REL_DIR=$(dirname "$INPUT_PATH")
    BASE_FILE=$(basename "$INPUT_PATH")
    BASE_TARGET_DIR="$HOME/$REL_DIR"

    for LANG_NAME in "$@"; do
        EXT=$(get_extension "$LANG_NAME")
        LANG_DIR="$BASE_TARGET_DIR/$LANG_NAME"
        TARGET_FILE="$LANG_DIR/${BASE_FILE}.${EXT}"

        if [[ ! -d "$LANG_DIR" ]]; then
            mkdir -p "$LANG_DIR"
            echo "[Created Directory] $LANG_DIR"
        fi
        
        touch "$TARGET_FILE"
        echo "[Created File]      $TARGET_FILE"
    done

elif [[ "$MODE" == "2" ]]; then
    # Mode 2: Scaffold multiple files across multiple existing language directories
    if [[ $# -lt 4 ]]; then
        echo "[Error] Mode 2 requires exactly 4 arguments."
        print_usage
    fi
    
    BASE_TARGET_DIR="$HOME/$2"
    
    # Safely read the space-separated strings into Bash arrays
    read -ra LANGS <<< "$3"
    read -ra FILES <<< "$4"

    # Outer loop: Iterate over each language
    for LANG_NAME in "${LANGS[@]}"; do
        EXT=$(get_extension "$LANG_NAME")
        LANG_DIR="$BASE_TARGET_DIR/$LANG_NAME"

        # Enforcement: The directory must already exist for Mode 2
        if [[ ! -d "$LANG_DIR" ]]; then
            echo "[Skipped] Structure missing for '$LANG_NAME'. Run Mode 1 first."
            continue
        fi

        # Inner loop: Iterate over each filename for the current language
        for FNAME in "${FILES[@]}"; do
            TARGET_FILE="$LANG_DIR/${FNAME}.${EXT}"
            touch "$TARGET_FILE"
            echo "[Created File]      $TARGET_FILE"
        done
    done

else
    echo "[Error] Invalid Mode: $MODE. Must be 1 or 2."
    exit 1
fi
