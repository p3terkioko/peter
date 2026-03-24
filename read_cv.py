import sys
import os

try:
    from pypdf import PdfReader
    reader = PdfReader('Peter_Kioko_CV.docx.pdf')
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"
        
    out_path = r"C:\Users\hp\.gemini\antigravity\brain\d2b8b7f3-12f1-4383-bda2-d79f3e860a06\resume_content.md"
    with open(out_path, "w", encoding="utf-8") as f:
        f.write("# Peter Kioko CV Content\n\n")
        f.write(text)
    print("Successfully wrote resume_content.md")
except Exception as e:
    print("Error parsing PDF:", e)
