import os

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
    
    # 2. Replace known specific patterns
    content = content.replace("T. M. Thuận", P_THUAN)
    content = content.replace("P. V. Thư", P_THU)
    content = content.replace("N. Trâm", P_TRAM)
    content = content.replace("P. T. Tài", P_TAI)

    content = content.replace("Minh Thuận", P_THUAN)
    content = content.replace("Văn Thư", P_THU)
    content = content.replace("Ngọc Trâm", P_TRAM)
    content = content.replace("Thanh Tài", P_TAI)
    
    content = content.replace("Thuận (SM)", f"{P_THUAN} (SM)")
    content = content.replace("Thư (Dev)", f"{P_THU} (Dev)")
    content = content.replace("Trâm (PO)", f"{P_TRAM} (PO)")
    content = content.replace("Tài (Dev)", f"{P_TAI} (Dev)")

    content = content.replace("(Thuận, Tài, Trâm, Thư)", f"({P_THUAN}, {P_TAI}, {P_TRAM}, {P_THU})")
    content = content.replace("Thuận và Thư", f"{P_THUAN} và {P_THU}")
    
    content = content.replace("Tài đang", f"{P_TAI} đang")
    content = content.replace("Tài setup", f"{P_TAI} setup")
    content = content.replace("cùng Tài", f"cùng {P_TAI}")
    
    content = content.replace("Trâm đóng", f"{P_TRAM} đóng")
    
    # Check for bullet points starting with names
    content = content.replace("*   Thuận:", f"*   {P_THUAN}:")
    content = content.replace("*   Thư:", f"*   {P_THU}:")
    content = content.replace("*   Trâm:", f"*   {P_TRAM}:")
    content = content.replace("*   Tài:", f"*   {P_TAI}:")

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
