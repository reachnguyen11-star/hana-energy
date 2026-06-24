# MASTER PROMPT — Redesign Hana Việt Nam (phong cách **Solarpunk HQ** + card 3D)

> **Reference style:** https://www.solarpunkhq.com/en
> **Cách dùng:** copy toàn bộ khối **PROMPT** bên dưới, paste vào Claude Code / Desktop đã cài skill `ui-ux-pro-max`, `design-taste-frontend`, bộ `gsap-*`.
> **Đính kèm khi gửi:** (1) ảnh card Solarpunk HQ làm chuẩn interaction, (2) logo Hana để lấy hex màu thật, (3) 2 file demo tham chiếu: `solar-cards-3d.html` (card + 3D thật) là **nguồn chuẩn cho card**.

---

## ⚡ Các quyết định đã chốt (đọc trước)

1. **Stack giữ Next.js + GSAP** — KHÔNG đổi sang "Three.js thuần" (Three.js chỉ là thư viện 3D, không thay được framework). 3D nhúng qua **React Three Fiber** + **@splinetool/react-spline**, chỉ ở chỗ cần.
2. **Phong cách = Solarpunk HQ**, KHÔNG glassmorphism tràn lan (glass chỉ cho pill nav).
3. **Signature = hệ card 2 tông (dark + light) + tilt/parallax/cursor-glow.**
4. **Card chứa 3D THẬT:** card tối = Spline scene; card sáng = model "solar panel" (Sketchfab, CC-BY).
5. **Xung đột tilt vs kéo-xoay:** chọn **3D chạy ambient + giữ tilt card** (vùng 3D `pointer-events:none`).
6. **Màu = brand Hana (green + navy)**, dùng tiết chế đúng tinh thần lime của reference.

---

## PROMPT (copy từ đây)

Bạn là senior frontend + motion designer. Redesign landing page cho **Hana Việt Nam** — giải pháp điện & điện mặt trời mái nhà cho nhà máy/KCN. Hướng thẩm mỹ tham chiếu **Solarpunk HQ (solarpunkhq.com)**: editorial tối giản, nhiều khoảng trắng, typography đậm, hệ card 2 tông với 3D illustration, interaction tilt/parallax/cursor-glow tinh tế.

### 0. Bắt buộc dùng skill (theo thứ tự)
1. **`ui-ux-pro-max`** — chốt design system (style family, color, typography pairing, spacing scale, layout, interaction states). Tra database trước khi quyết định giá trị thiết kế.
2. **`design-taste-frontend`** — chạy "Brief Inference / Design Read" trước khi code. Không "AI slop", audit-first.
3. **`gsap-core/timeline/scrolltrigger/react/performance`** — toàn bộ motion. Register plugin đúng, cleanup bằng `useGSAP`/`gsap.context()`, ưu tiên transform giữ 60fps.

Trước khi code, in **"Design Read"** một dòng + bảng **design tokens** (màu/font/spacing/radius).

### 1. Stack kỹ thuật
- **Next.js (App Router) + TypeScript + Tailwind CSS**.
- **GSAP** + `@gsap/react` (`useGSAP`) + `ScrollTrigger` + `ScrollSmoother`.
- **3D:** `@react-three/fiber` + `@react-three/drei` (cho model Sketchfab GLB) và **`@splinetool/react-spline`** (cho scene Spline). Mọi component 3D phải `'use client'` + nạp qua `next/dynamic({ ssr:false })` (WebGL chỉ chạy ở browser).
- Mỗi section = 1 component riêng. Chừa sẵn `<ScrollVideoSection />` placeholder có comment nối `ScrollTrigger.scrub` → `video.currentTime` (kiểu Apple AirPods).
- Responsive mobile-first, `gsap.matchMedia()` tách desktop/mobile. Tôn trọng `prefers-reduced-motion`.

### 2. MÀU BRAND — giữ nhận diện Hana
```css
:root{
  --ink:        #0E1B2A;  /* navy — heading, text đậm */
  --paper:      #F4F5F2;  /* nền editorial sáng */
  --paper-2:    #E9E9E6;  /* nền card light */
  --card-dark:  #0E1524;  /* nền card tối */
  --muted:      #7A7A7A;  /* secondary text */
  --brand-green:#1A7A3D;  /* accent chính — CTA, highlight (sửa theo logo Hana thật) */
  --green-vivid:#2BB24C;  /* energy green — điểm nhấn (vai trò "lime" của reference) */
}
```
Accent xanh dùng **tiết chế**: CTA, cursor-glow card tối, từ khóa highlight, dot/eyebrow. **KHÔNG** dùng lime/chartreuse, không bôi xanh tràn lan.

### 3. NGÔN NGỮ THỊ GIÁC — Solarpunk HQ
- **Editorial tối giản:** heading lớn đậm (display), subheading cùng cỡ màu xám muted; nhiều khoảng trắng; container ~1100px.
- **Hệ card 2 tông:** card TỐI (texture sọc dọc hairline + illustration phát sáng + tag "↘…" đỉnh + caption đậm dẫn câu) & card SÁNG (số liệu lớn đỉnh + object 3D + caption). Bo góc ~22px, shadow mềm, KHÔNG blur.
- **Insight card** kiểu "Report · {năm}" + heading 2 dòng in hoa đậm + link "Tìm hiểu →".
- **Quote/manifesto** lớn, vài từ khóa highlight xanh brand.
- **Glass chỉ ở pill nav** (`backdrop-filter:blur(16px)` + nền `rgba(255,255,255,.1)` + viền sáng + fallback đặc).

### 3B. SIGNATURE INTERACTION — Tilt + Parallax + Cursor Glow
Áp cho **mọi card lớn**. (Bản chuẩn đã có trong `solar-cards-3d.html` — bám theo.)
1. **Tilt:** `mousemove` → tính `(rx,ry)` từ tâm card → `transform:perspective(900px) rotateX() rotateY() scale(1.03)`. Tối đa ~10–14° (giảm còn ~8° cho card có 3D để tránh double-perspective).
2. **Parallax:** `.card__inner` dịch **cùng chiều** chuột (~14px); illustration/3D dịch **ngược chiều** (~ -60%) → chiều sâu.
3. **Cursor glow (card tối):** CSS var `--mx/--my` → `radial-gradient(600px circle at var(--mx) var(--my), <green .14>, transparent)`.
4. **Spring-back:** lerp trong `requestAnimationFrame` (factor ~.12), dừng RAF khi đứng yên. KHÔNG dùng CSS transition thô cho tilt.
5. React: gói trong `useGSAP`/RAF có cleanup; tách thành hook tái dùng `useTilt(ref)`; tôn trọng `prefers-reduced-motion` (tắt tilt).

### 3C. TÍCH HỢP 3D THẬT (phần mới — làm đúng)

**Card TỐI — Spline scene**
- Dùng `@splinetool/react-spline`: `<Spline scene="https://prod.spline.design/FoKzDXZm8hnLRQOY/scene.splinecode" />`.
- Nạp qua `dynamic(() => import('@splinetool/react-spline'), { ssr:false })`.
- Đặt scene làm illustration giữa card.

**Card SÁNG — model "solar panel" (Sketchfab)**
- Model: `panel solar` by **lech (@lechmk)**, **CC-BY 4.0**, rất nhẹ (452 tris).
- **Ưu tiên TẢI GLB** (được phép theo CC-BY) đặt trong `/public/models/`, render bằng R3F:
  `useGLTF('/models/panel-solar.glb')` + `<primitive object={...} />`, thêm `Environment`/light của drei, `autoRotate` nhẹ.
  → nhẹ hơn iframe nhiều, bỏ được watermark, không phụ thuộc mạng Sketchfab.
- (Fallback nhanh: iframe embed `…/embed?autostart=1&autospin=0.3&ui_controls=0&ui_infos=0&transparent=1` — nhưng production nên dùng GLB.)
- **BẮT BUỘC giữ credit CC-BY** hiển thị trên/ gần card: `3D "panel solar" by lech · CC BY 4.0` (link tác giả + link license).

**Xung đột tilt vs kéo-xoay 3D — giải pháp:**
- Mặc định: **3D chạy ambient** (auto-rotate / idle), **giữ tilt card**. Đặt wrapper 3D `pointer-events:none` để chuột truyền xuống card → tilt thắng; 3D vẫn trôi ngược theo parallax.
- (Nếu muốn cho kéo-xoay 3D: bật `pointer-events:auto` + thêm `OrbitControls` của drei + **tắt tilt** cho riêng card đó. Không bật cả hai.)

### 4. HERO — editorial Solarpunk HQ (KHÔNG nhồi stat-card glass)
- **Pill nav** nổi (glass nhẹ): logo Hana trái · menu giữa (Giải pháp ▾ · Quy trình · Dự án · Về chúng tôi) · nút **"Tư vấn miễn phí"** xanh brand.
- **Heading cực lớn**, từ nhấn in nghiêng serif: vd "Phủ năng lượng mặt trời lên *nhà máy của bạn*".
- **Subtext** xám muted một dòng (giải pháp an toàn, hiệu quả, bền vững cho nhà máy & KCN).
- **CTA** "Khám phá giải pháp" + icon tia sét (xanh) + link phụ "Xem dự án".
- **Mission line + sticker** inline (kiểu "Our mission is to 100x…").
- **Ảnh nền** solar farm chất lượng cao ở **layer riêng** + comment chỗ swap; dạng band bo góc lớn dưới heading.
- Số liệu KHÔNG để ở hero — chuyển xuống dùng counter + card 2 tông.

### 5. CÁC SECTION — nội dung Hana map vào layout Solarpunk
1. **"Hiệu quả hơn — Tiết kiệm hơn"**: heading + subhead muted, rồi **cụm 2 card 3D** (card tối Spline + card sáng solar panel) theo mục 3C, nội dung điện mặt trời mái nhà / khai thác kép.
2. **Bộ 3 card dịch vụ**: 1 card ảnh có gauge ("Tiết kiệm 610kV") + 2 card text: "Hạ tầng điện nhà máy", "Điện mặt trời mái nhà", "Lưu trữ năng lượng (BESS)".
3. **Section ảnh + card nổi (tilt)**: "Tổng công suất / Tổng tiết kiệm". Trái: heading "Chuyển đổi năng lượng dễ dàng cùng Hana" + 2 bullet check + CTA.
4. **Grid card dự án** (tilt + hover scale + parallax ảnh): Thuận An 9.45MWp, Khôi Nguyên 1.4MWp, Tân Quang Minh 630kWp, Đông Quang 8MWp, Sài Gòn Long An 1.166MWp, KODA 680kWp… (ảnh + tên + chủ đầu tư + công suất).
5. **Insight cards "Report · năm"** (tùy chọn): nội dung agrivoltaics / điện mặt trời KCN.
6. **Quote/manifesto** highlight xanh — triết lý "Hiệu quả – Bền vững – Tin cậy".
7. **Quy trình 5 bước** (numbered — vì là chuỗi tuần tự): Phân tích hiện trạng → Thiết kế & kết cấu → Thi công & lắp đặt → Đo lường & báo cáo phát thải → Vận hành & bảo trì.
8. **Tiêu chuẩn thiết bị**: Tấm pin (LONGi, JA Solar, Jinko) · Inverter (Huawei, Sungrow) · BESS · Khung đỡ.
9. **Dải số liệu + Chứng chỉ**: 06 / 1000+ / 99+ / 100% (counter đếm tăng).
10. **Đối tác & khách hàng** (logo strip).
11. **CTA cuối + Footer**: hotline 092.576.8888, triết lý Hana.

### 6. SCROLL MOTION (GSAP)
- **ScrollSmoother** bọc toàn trang.
- **Reveal:** `from({y:40,opacity:0}, ScrollTrigger start "top 85%")`, stagger cho grid.
- **Tilt/parallax/cursor-glow** card (mục 3B) — điểm nhấn chính.
- **Pin section** "Chuyển đổi năng lượng": pin + scrub, counter tăng (`snap`).
- **Counter** số liệu khi vào viewport. **Hero parallax** nhẹ (`yPercent`/`xPercent`).
- `<ScrollVideoSection />` sẵn cho video scrubbing.
- `gsap-performance`: chỉ transform/opacity, `useGSAP` scope + cleanup.

### 7. PERFORMANCE & ACCESSIBILITY (bắt buộc vì có 3D)
- **Lazy-load mọi 3D**: chỉ mount Spline/R3F khi card vào viewport (IntersectionObserver hoặc `<Canvas frameloop="demand">` + drei `<Bounds>`/lazy). KHÔNG init 3D ngay lúc load trang.
- **Giới hạn WebGL context**: không để quá 1–2 canvas WebGL hoạt động cùng lúc; ưu tiên GLB (R3F dùng chung renderer) hơn nhiều iframe Sketchfab.
- Spline scene thường nặng → cân nhắc poster ảnh tĩnh trước khi 3D load xong.
- `prefers-reduced-motion`: tắt tilt + auto-rotate, hiển thị 3D tĩnh hoặc ảnh thay thế.
- Text trên card đạt **WCAG AA**.

### 8. Tiêu chí nghiệm thu (pre-flight)
- [ ] Tổng thể đúng tinh thần Solarpunk HQ (editorial, card 2 tông, illustration 3D).
- [ ] Card tối = Spline; card sáng = solar panel GLB; **3D ambient + tilt giữ nguyên** (pointer-events xử lý đúng).
- [ ] **Credit CC-BY** cho model Sketchfab hiển thị rõ.
- [ ] Tilt/parallax/cursor-glow mượt (lerp+RAF, spring-back, reduced-motion).
- [ ] Accent xanh brand Hana, KHÔNG lime; glass chỉ ở pill nav.
- [ ] 3D **lazy-load**, ≤2 WebGL context, 60fps, responsive desktop+mobile.
- [ ] Nội dung tiếng Việt đúng dữ liệu Hana; numbered chỉ ở "Quy trình 5 bước".
- [ ] Chia component rõ; có chỗ swap ảnh nền & gắn scroll-video; không "AI slop".

### 9. Cách giao việc
1. In **Design Read** + **design tokens**.
2. Dựng Next.js + cài GSAP + R3F + react-spline. Tạo hook `useTilt`.
3. Build **Hero** (editorial) → review.
4. Build **cụm 2 card 3D + tilt** (mục 3B/3C) → review (đây là signature, chốt sớm).
5. Build lần lượt các section còn lại.
6. Gắn GSAP scroll motion + ScrollSmoother → tối ưu performance (mục 7).

Bắt đầu từ Bước 1.

---
*(hết prompt)*

---

## Ghi chú & assets

- **Spline (card 1):** `https://prod.spline.design/FoKzDXZm8hnLRQOY/scene.splinecode`
- **Sketchfab (card 2):** `panel solar` — https://sketchfab.com/3d-models/panel-solar-6ca26bf40a8e4d34916b4868be345281 — **CC-BY 4.0**, tải GLB về `/public/models/panel-solar.glb`, **giữ credit lech**.
- **Hex màu:** thay block `:root` mục 2 bằng mã logo Hana thật khi có.
- **Demo tham chiếu:** `solar-cards-3d.html` là bản card chuẩn (đã có 3D + tilt) — đưa kèm cho Claude bám theo.
- **Nếu bỏ SSR/SEO:** đổi "Next.js" → "Vite + React", giữ nguyên GSAP + R3F + react-spline + toàn bộ spec.
