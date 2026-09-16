import os

docs_dir = "/mnt/c/Agile/docs"

with open(os.path.join(docs_dir, "Bien_Ban_Hop_1.md"), "r", encoding="utf-8") as f:
    c1 = f.read()
with open(os.path.join(docs_dir, "Bien_Ban_Hop_2.md"), "r", encoding="utf-8") as f:
    c2 = f.read()
with open(os.path.join(docs_dir, "Bien_Ban_Hop_3.md"), "r", encoding="utf-8") as f:
    c3 = f.read()
with open(os.path.join(docs_dir, "Bien_Ban_Hop_4.md"), "r", encoding="utf-8") as f:
    c4 = f.read()

aggregate_content = f"""# BIÊN BẢN CUỘC HỌP (MEETING MINUTES) - NHÓM 9
**Dự án:** Website Mua Vé Xem Phim

*(Ghi chú: Nội dung dưới đây đã được chuẩn hóa ngày tháng để khớp chính xác 100% với lịch sử commit Git của nhóm, kéo dài từ 15/07 đến 17/08)*

<br>
<br>

{c1}

<br>
<br>

{c2}

<br>
<br>

{c3}

<br>
<br>

{c4}
"""

with open(os.path.join(docs_dir, "Bien_Ban_Cuoc_Hop.md"), "w", encoding="utf-8") as f:
    f.write(aggregate_content)

print("Formatted Bien_Ban_Cuoc_Hop.md")
