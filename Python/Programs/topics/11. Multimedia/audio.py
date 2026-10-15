# Audio, speech, computer vision, and automation
# -> These are larger projects. Keep them separate from beginner exercises because they need external libraries, APIs, and additional setup
# -> For voice-controlled actions, require confirmation before sending emails or making changes to files or applications
# =========================================
from gtts import gTTS
from pathlib import Path
from pypdf import PdfReader
from docx import Document

# Text-to-speech: generate speech from text
def text_to_speech():
    text = input("Enter the text you want to convert into speech: ")
    if not text.strip():
        print("Error: Text cannot be empty.")
        return
    try:
        speech = gTTS(text=text, lang="en", slow=False)
        output_file = Path.cwd() / "speech.mp3"
        speech.save(str(output_file))
        print("Speech generated successfully!")
        print(f"Audio saved at: {output_file}")
    except Exception as error:
        print(f"Error generating speech: {error}")

# Audiobook creator: convert text documents into audio files
def create_audiobook():
    # Get document path from the user
    file_path = Path(
        input("Enter document path (.txt, .pdf, .docx): ").strip().strip('"')
    ).expanduser()
    # Validate the file
    if not file_path.is_file():
        print("Error: File not found.")
        return
    # Extract text from the document
    try:
        extension = file_path.suffix.lower()
        if extension == ".txt":
            text = file_path.read_text(encoding="utf-8")
        elif extension == ".pdf":
            reader = PdfReader(str(file_path))
            text = "\n".join(
                page.extract_text() or "" for page in reader.pages
            )
        elif extension == ".docx":
            document = Document(str(file_path))
            text = "\n".join(
                paragraph.text for paragraph in document.paragraphs
            )
        else:
            print("Error: Only TXT, PDF, and DOCX files are supported.")
            return
    except Exception as error:
        print(f"Error reading document: {error}")
        return
    # Validate extracted text
    if not text.strip():
        print("Error: No readable text found in the document.")
        return
    # Select the speech language
    language = input(
        "Enter language code (en = English, hi = Hindi): "
    ).strip().lower() or "en"
    # Create audiobook filename
    output_file = file_path.with_name(
        f"{file_path.stem}_audiobook.mp3"
    )
    # Convert text into speech and save the MP3
    try:
        speech = gTTS(text=text, lang=language, slow=False)
        speech.save(str(output_file))
        print("\nAudiobook created successfully!")
        print(f"Output file: {output_file}")
    except Exception as error:
        print(f"Error generating audiobook: {error}")

