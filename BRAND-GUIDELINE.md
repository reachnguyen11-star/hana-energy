# Hana Việt Nam — Brand Visual Guideline

> **Website:** energy.hanavn.vn · **Triết lý:** Hiệu quả · Bền vững · Tin cậy
> **Phiên bản:** v1.0 — 2026 · **Stack web:** Next.js + Tailwind + GSAP

Tài liệu này gom toàn bộ token nhận diện dùng trên website, phục vụ dựng ấn phẩm (ảnh Founder Quote, social post, slide...). Đặt cạnh logo trong `/public/logo-hana-navy.png` và `/public/logo-hana-gold.png`.

---

## 01 — Logo

| Bản | File | Dùng trên |
|---|---|---|
| **Navy** | `/public/logo-hana-navy.png` | Nền sáng (cream, trắng) |
| **Gold** | `/public/logo-hana-gold.png` | Nền tối (navy, ink, ảnh) |

Cấu tạo: **emblem mandala vàng kim (gold)** + monogram "H" + wordmark **HANA** navy.

**NÊN**
- Giữ khoảng trống tối thiểu quanh logo ≈ chiều cao chữ "H".
- Đặt emblem trên nền có độ tương phản đủ.
- Dùng bản gold trên nền tối, bản navy trên nền sáng.

**KHÔNG**
- Đổi màu emblem hoặc wordmark.
- Kéo méo / xoay / nén tỉ lệ.
- Đặt logo navy trên nền tối (mất chữ).
- Thêm đổ bóng, viền, hiệu ứng ngoài quy định.

---

## 02 — Color

Một accent chủ đạo: **Energy Green**. Navy & Gold thuộc bộ nhận diện logo. **Tránh** lime/chartreuse.

### Energy Green — accent chính (CTA, nhấn mạnh)

| Token | Hex | Vai trò |
|---|---|---|
| Green 50 | `#E9F9EF` | Nền nhạt, pill |
| Green 100 | `#C9F0D7` | Viền nhạt |
| Green 300 | `#5FD089` | Từ nhấn trên nền tối |
| Green 400 · Vivid | `#34C36A` | Highlight, vạch accent |
| **Green 500 · Primary** | `#1AA64B` | **CTA chính, link** |
| Green 600 | `#138A3E` | Hover CTA |
| Green 700 | `#0F6E32` | Text xanh đậm |

### Navy / Ink — heading & nền tối

| Token | Hex | Vai trò |
|---|---|---|
| Navy | `#0C2A47` | Nền tối, footer |
| **Ink · Heading** | `#0E1B2A` | **Màu heading chính** |
| Card Dark | `#0E1524` | Nền card tối |
| Navy 900 | `#07182B` | Gradient đậm nhất |

### Gold — emblem logo (dùng tiết chế, ưu tiên nền tối)

| Token | Hex |
|---|---|
| Gold Light | `#E3C578` |
| Gold | `#C49A3F` |
| Gold Dark | `#A9792B` |

### Neutrals — nền & chữ phụ

| Token | Hex | Vai trò |
|---|---|---|
| Cream / Paper | `#F4F5F2` | Nền section sáng |
| Paper 2 | `#E9E9E6` | Nền card sáng |
| Mist | `#EEF1EE` | Nền phụ |
| Muted Text | `#7A7A7A` | Chữ phụ, caption |

### Solar gradient — điểm nhấn (toggle "Solar", glow)

```
radial-gradient(circle at 35% 30%, #6EE7A0, #16A34A 78%)
```

---

## 03 — Typography

Hai họ chữ song hành:

| Vai trò | Font | Weight / Style | Ghi chú |
|---|---|---|---|
| Display | **Be Vietnam Pro** | 800 | Heading lớn, hero |
| Heading | Be Vietnam Pro | 700–800 | Tiêu đề section |
| Body | Be Vietnam Pro | 400–500 | Đoạn văn, line-height 1.6–1.7 |
| Accent | **Playfair Display** | Italic 500 | Chỉ cho **từ nhấn** trong heading |
| Eyebrow / Label | Be Vietnam Pro | 600–700 | UPPERCASE · letter-spacing .18–.22em · màu Green 500 |

**Quy tắc nhấn mạnh:** chỉ dùng serif italic (Playfair) cho **một từ** bên trong heading sans — *không* dùng cho cả câu.
Ví dụ: `Khả năng` **_vô hạn_** — "vô hạn" là Playfair italic màu `#5FD089`.

**Thang cỡ chữ tham khảo (web):**

| Cấp | Cỡ |
|---|---|
| Hero H1 | `clamp(2.5rem, 6vw, 4rem)` |
| Section H2 | `clamp(2rem, 5vw, 3.25rem)` |
| Card title | `1.2rem` / 800 |
| Body | `1rem` |
| Caption / label | `0.72–0.78rem` |

---

## 04 — Voice & Triết lý

| # | Giá trị | Diễn giải |
|---|---|---|
| 01 | **Hiệu quả** | Đề cao kết quả đo được — sản lượng, % tiết kiệm, thời gian hoàn vốn. |
| 02 | **Bền vững** | Năng lượng sạch, vòng đời dài, giảm phát thải CO₂ thực chất. |
| 03 | **Tin cậy** | Thiết bị Tier-1, minh bạch quy trình, đối tác LONGi · Huawei · Sungrow. |

**Tông giọng:** chuyên nghiệp, chắc chắn, hướng kết quả. Ưu tiên **con số & cam kết** hơn tính từ hoa mỹ.

Câu chốt mẫu:
> *"Chúng tôi không bán thiết bị — chúng tôi bán kết quả đo được."*

---

## 05 — Founder Quote (mẫu dựng ảnh)

Bố cục chuẩn cho ảnh trích dẫn nhà sáng lập.

### Công thức bố cục
- **Nền:** tối — `#0E1B2A` (Ink) hoặc gradient `#0C2A47 → #07182B`.
- **Dấu ngoặc kép** lớn (Playfair) màu `#34C36A`, opacity ~55%, phía trên quote.
- **Quote:** Be Vietnam Pro 800, màu trắng — trong đó **một cụm từ nhấn** dùng Playfair italic 500 màu `#5FD089`.
- **Vạch accent:** `#34C36A`, kích thước 42×3px, bo 2px — đặt trước tên.
- **Tên:** Be Vietnam Pro 700, trắng. **Chức danh:** 500, trắng 55%.
- **Emblem:** `logo-hana-gold.png` ở **góc dưới phải**, opacity ~90%.
- **Glow:** radial `#6EE7A0` ~18% ở **góc trên phải** tạo chiều sâu.

### Thông số kỹ thuật

| Hạng mục | Giá trị |
|---|---|
| Tỉ lệ | 1:1 (1080×1080) hoặc 4:5 (1080×1350) |
| Nền | `#0E1B2A` / gradient `#0C2A47→#07182B` |
| Quote | Be Vietnam Pro 800 · trắng · ~52–64px |
| Từ nhấn | Playfair Display Italic 500 · `#5FD089` |
| Vạch accent | `#34C36A` · 42×3px · bo 2px |
| Tên | Be Vietnam Pro 700 · trắng |
| Chức danh | Be Vietnam Pro 500 · trắng 55% |
| Emblem | `logo-hana-gold.png` · góc dưới phải · 90% opacity |
| Lề an toàn | ≥ 56px mỗi cạnh |
| Glow | radial `#6EE7A0` 18% · góc trên phải |

### Nội dung mẫu

**Mẫu A — quote dài:**
> Năng lượng sạch không phải chi phí — đó là *khoản đầu tư* sinh lời cho mọi nhà máy Việt.
>
> — **[Tên Nhà sáng lập]**, Nhà sáng lập & CEO · Hana Việt Nam

**Mẫu B — quote ngắn:**
> Chúng tôi không bán thiết bị — chúng tôi bán *kết quả đo được.*
>
> — **[Tên Nhà sáng lập]**, Hana Việt Nam

> *Từ in nghiêng = cụm dùng Playfair italic màu xanh `#5FD089`.*

---

## Phụ lục — Token nhanh (copy nhanh)

```
Primary CTA      #1AA64B
Vivid highlight  #34C36A
Accent on dark   #5FD089
Heading (Ink)    #0E1B2A
Navy             #0C2A47
Card dark        #0E1524
Gold emblem      #C49A3F
Cream/paper      #F4F5F2
Muted text       #7A7A7A
Solar gradient   #6EE7A0 → #16A34A

Font heading/body  Be Vietnam Pro (400–800)
Font accent        Playfair Display (italic 500)
```

---

*Hana Việt Nam — Brand Visual Guideline · energy.hanavn.vn · Hiệu quả · Bền vững · Tin cậy*
