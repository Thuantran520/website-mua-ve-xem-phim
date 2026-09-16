import os
import re

def normalize_names(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Placeholders
    P_THUAN = "__P_THUAN__"
    P_THU = "__P_THU__"
    P_TRAM = "__P_TRAM__"
    P_TAI = "__P_TAI__"

    # 1. Replace existing full names with placeholders to protect them
    content = content.replace("Trần Phan Minh Thuận", P_THUAN)
    content = content.replace("Phạm Văn Thư", P_THU)
    content = content.replace("Phạm Thị Ngọc Trâm", P_TRAM)
    content = content.replace("Phạm Thanh Tài", P_TAI)
    
    # 2. Replace initials and common short names with placeholders
    # Thuan
    content = content.replace("T. M. Thuận", P_THUAN)
    content = re.sub(r'\bThuận\b', P_THUAN, content)
    
    # Thu
    content = content.replace("P. V. Thư", P_THU)
    content = re.sub(r'\bThư\b', P_THU, content)
    
    # Tram
    content = content.replace("N. Trâm", P_TRAM)
    content = re.sub(r'\bTrâm\b', P_TRAM, content)
    
    # Tai
    content = content.replace("P. T. Tài", P_TAI)
    content = re.sub(r'\bTài\b', P_TAI, content)

    # 3. Replace placeholders with full names
    content = content.replace(P_THUAN, "Trần Phan Minh Thuận")
    content = content.replace(P_THU, "Phạm Văn Thư")
    content = content.replace(P_TRAM, "Phạm Thị Ngọc Trâm")
    content = content.replace(P_TAI, "Phạm Thanh Tài")

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

def main():
    docs_dir = "/mnt/c/Agile/docs"
    for root, dirs, files in os.walk(docs_dir):
        for file in files:
            if file.endswith(".md"):
                file_path = os.path.join(root, file)
                normalize_names(file_path)
                print(f"Processed {file_path}")

if __name__ == "__main__":
    main()
