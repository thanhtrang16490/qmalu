#!/usr/bin/env python3
"""
Script to extract product information from PDF files
"""

import sys
import os

try:
    import PyPDF2
    print("PyPDF2 is installed")
except ImportError:
    print("Installing PyPDF2...")
    os.system(f"{sys.executable} -m pip install PyPDF2")
    import PyPDF2

def extract_text_from_pdf(pdf_path):
    """Extract text from PDF file"""
    try:
        with open(pdf_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            text = ""
            print(f"\nReading PDF: {pdf_path}")
            print(f"Number of pages: {len(pdf_reader.pages)}")
            
            for page_num, page in enumerate(pdf_reader.pages):
                print(f"Extracting page {page_num + 1}...")
                text += f"\n--- PAGE {page_num + 1} ---\n"
                text += page.extract_text()
            
            return text
    except Exception as e:
        print(f"Error reading PDF: {e}")
        return None

def main():
    # List of PDF files to read
    pdf_files = [
        "3. Nhôm QUANG MINH/QUANG MINH PROFILE FILE XEMX15.pdf",
        "3. Nhôm QUANG MINH/Báo giá Phụ kiện Nhôm - Quang Minh.pdf",
        "3. Nhôm QUANG MINH/BG Dự án VietGlogry Nghệ An/BG dự án VietGlory Nghệ An_ Quang Minh 01042025.pdf",
        "3. Nhôm QUANG MINH/BG mẫu T2.2025_ Cụm dự án Huali/BG mẫu Nghệ An_ Nhôm Quang Minh.pdf",
    ]
    
    all_text = ""
    
    for pdf_file in pdf_files:
        if os.path.exists(pdf_file):
            print(f"\n{'='*80}")
            print(f"Processing: {pdf_file}")
            print('='*80)
            text = extract_text_from_pdf(pdf_file)
            if text:
                all_text += f"\n\n{'='*80}\n"
                all_text += f"FILE: {pdf_file}\n"
                all_text += f"{'='*80}\n"
                all_text += text
        else:
            print(f"File not found: {pdf_file}")
    
    # Save extracted text to file
    output_file = "extracted_products.txt"
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(all_text)
    
    print(f"\n\nExtracted text saved to: {output_file}")
    print(f"Total characters extracted: {len(all_text)}")
    
    # Print first 2000 characters as preview
    print("\n" + "="*80)
    print("PREVIEW (first 2000 characters):")
    print("="*80)
    print(all_text[:2000])

if __name__ == "__main__":
    main()
