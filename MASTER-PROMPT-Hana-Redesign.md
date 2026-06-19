# MASTER PROMPT — Redesign trang Hana Việt Nam (energy.hanavn.vn)

> Copy toàn bộ nội dung trong khối dưới đây và paste vào Claude (Claude Code / Desktop) đã cài sẵn 3 skill: `ui-ux-pro-max`, `design-taste-frontend` (taste-skill), và bộ `gsap-*`.
> Đính kèm 2 ảnh template (Image 1 — phong cách tổng thể, Image 2 — hero cần làm giống hệt) khi gửi prompt.

---

## PROMPT (copy từ đây)

Bạn là một senior frontend + motion designer. Hãy redesign lại landing page cho **Hana Việt Nam** — công ty giải pháp điện & điện mặt trời mái nhà cho nhà máy/khu công nghiệp. Tôi đính kèm 2 ảnh tham khảo.

### 0. Bắt buộc dùng skill (kích hoạt theo thứ tự)
1. **`ui-ux-pro-max`** — dùng để chốt design system: chọn style family, color system, typography pairing, spacing scale, layout, interaction states, UX guidelines. Tra cứu database trước khi quyết định bất cứ giá trị thiết kế nào.
2. **`design-taste-frontend` (taste-skill)** — chạy bước "Brief Inference / Design Read" trước khi code. Đảm bảo giao diện không bị "AI slop", không template hóa. Audit-first, pre-flight check nghiêm ngặt.
3. **`gsap-core`, `gsap-timeline`, `gsap-scrolltrigger`, `gsap-react`, `gsap-performance`** — dùng cho toàn bộ animation và scroll motion. Mọi animation phải register plugin đúng, cleanup bằng `useGSAP`/`gsap.context()`, ưu tiên transform để giữ 60fps.

Trước khi viết code, hãy in ra **"Design Read"** một dòng theo taste-skill, rồi liệt kê design tokens (màu, font, spacing, radius) lấy từ ui-ux-pro-max.

### 1. Stack kỹ thuật
- **Next.js (App Router) + TypeScript + Tailwind CSS**.
- **GSAP** + `@gsap/react` (`useGSAP`), `ScrollTrigger`, `ScrollSmoother` cho scroll mượt như video.
- Kiến trúc component sạch, mỗi section là 1 component riêng để sau này tôi gắn **scroll-driven video scrubbing** (kiểu Apple AirPods) dễ dàng. Chừa sẵn 1 component `<ScrollVideoSection />` placeholder có comment hướng dẫn cách nối `ScrollTrigger.scrub` vào `video.currentTime`.
- Responsive mobile-first. Dùng `gsap.matchMedia()` để tách animation desktop/mobile.
- Tôn trọng `prefers-reduced-motion`.

### 2. MÀU BRAND — BẮT BUỘC GIỮ NGUYÊN
Giữ đúng nhận diện **xanh lá / xanh năng lượng (energy green) + navy** của Hana Việt Nam. **KHÔNG** dùng màu lime/chartreuse của template Image 2 — hãy thay accent đó bằng **xanh lá brand của Hana**.

Đề xuất palette (điều chỉnh cho khớp logo Hana thực tế, lấy từ energy.hanavn.vn):
- `--brand-green` (primary, energy green) — dùng cho CTA, accent, highlight.
- `--brand-navy` / `--brand-ink` (text đậm, footer, heading).
- Nền sáng: trắng / off-white (`#FAFAFA`–`#F4F5F3`).
- Nền tối tùy chọn cho section motion.
- Khi tôi cung cấp mã hex chính xác của logo, hãy thay vào CSS variables. Hiện tại dùng tông xanh lá năng lượng + navy làm chủ đạo.

### 2B. PHONG CÁCH GLASSMORPHISM — spec thống nhất (BẮT BUỘC)
Đây là ngôn ngữ thị giác chủ đạo (giống stat cards Image 2 và card "700 kV" Image 1). Tra `ui-ux-pro-max` mục glassmorphism để chốt giá trị, nhưng tuân thủ chuẩn tối thiểu sau và **tạo 1 class/utility dùng lại** (`.glass-card`) để toàn site nhất quán:
- **Blur**: `backdrop-filter: blur(16–24px)` (kèm `-webkit-backdrop-filter`), luôn có fallback nền đặc khi trình duyệt không hỗ trợ.
- **Nền**: lớp bán trong suốt — trên nền sáng dùng `rgba(255,255,255,0.10–0.16)`; trên nền tối/ảnh dùng `rgba(255,255,255,0.08–0.12)`. Có thể pha nhẹ tông **xanh lá brand** vào glass (ví dụ tint green ~6–8%) để ăn nhập nhận diện.
- **Viền**: `1px solid rgba(255,255,255,0.18–0.25)` tạo cạnh sáng; thêm inner highlight (`inset 0 1px 0 rgba(255,255,255,0.25)`).
- **Bóng đổ**: shadow mềm, khuếch tán (`0 8px 32px rgba(0,0,0,0.12–0.20)`), không gắt.
- **Bo góc**: lớn, đồng bộ với hệ radius (`rounded-2xl`/`rounded-3xl`, ~20–28px).
- **Độ tương phản chữ**: đảm bảo WCAG AA — text trên glass phải đọc rõ; nếu glass đặt trên ảnh, thêm lớp scrim/gradient phía sau chữ.
- **Hiệu suất**: hạn chế số phần tử có `backdrop-filter` cùng lúc (tốn GPU); ưu tiên dùng cho hero stats, card nổi, badge, pill nav. KHÔNG phủ glass tràn lan gây "AI slop".
- **Áp dụng glass cho**: pill nav (nền kính mờ nhẹ), stat cards hero (06/1000+/99+/100%), card "Tổng công suất/Tiết kiệm", badge giải thưởng, và panel CTA cuối nếu đặt trên ảnh.

### 3. HERO SECTION — LÀM GIỐNG HỆT Image 2
Bố cục y hệt template "Sonar / Next-Generation Solar Energy Solutions":
- **Nav dạng pill** nổi ở giữa trên cùng: logo Hana bên trái, menu giữa (Giải pháp ▾ · Quy trình · Dự án · Về chúng tôi), nút **"Tư vấn miễn phí"** bên phải — nút này dùng **màu xanh lá brand Hana** (thay cho lime).
- **Container hero bo góc lớn** (rounded ~32–40px), có đường cong lõm ở đáy giống Image 2, đặt trên nền trời gradient nhạt.
- **Ảnh nền**: aerial solar farm trên đồi núi (tôi sẽ thay background sau — hãy để 1 ảnh placeholder chất lượng cao + comment rõ chỗ thay ảnh, và đặt ảnh trong layer riêng để dễ swap).
- **Ghost text** "SOLAR ENERGY" / "NĂNG LƯỢNG XANH" mờ lớn phía sau heading.
- **Heading chính**: "Giải pháp Điện Mặt Trời *Thế Hệ Mới*" — chữ cuối in nghiêng serif (mix sans + serif italic giống Image 2).
- **Subtext**: mô tả ngắn từ nội dung Hana (giải pháp năng lượng an toàn, hiệu quả, bền vững cho nhà máy & KCN).
- **CTA chính** "Khám phá giải pháp" + icon tia sét, nền xanh lá brand.
- **Social proof** góc trái: cụm avatar + 5 sao + dòng "Đồng hành cùng 99+ doanh nghiệp" (lấy số liệu thật của Hana).
- **Stat cards glassmorphism** bên phải: "06 Năm phát triển", "1000+ Hồ sơ/năm", "99+ Khách hàng hài lòng", "100% Chất lượng" — dạng kính mờ, bo góc.
- **Hàng metric + badge giải thưởng** phía dưới (giống 7.9X / 5X / 1.2X + huy hiệu): thay bằng năng lực Hana — ví dụ tổng công suất đã triển khai (cộng các dự án: ~9.45MWp, 8MWp, 1.4MWp...), số dự án, badge "Chứng chỉ – Năng lực".

### 4. CÁC SECTION CÒN LẠI — PHONG CÁCH THEO Image 1
Lấy tinh thần clean, nhiều khoảng trắng, bo góc lớn (rounded-2xl/3xl), typography đậm sans-serif, card-based của Image 1 ("Seative / Wsolar"):

1. **"More Energy More Savings"** → "Hiệu quả hơn – Tiết kiệm hơn": heading lớn căn giữa + eyebrow nhỏ phía trên.
2. **Bộ 3 card**: 1 card ảnh lớn có **gauge/đồng hồ đo** (kiểu "Saving 610kV") + 2 card text trắng. Nội dung: "Hệ thống hạ tầng điện cho nhà máy", "Điện mặt trời mái nhà", "Hệ thống lưu trữ năng lượng (BESS)".
3. **Section ảnh + card glassmorphism nổi** (giống "Energy Savings Made Easy" với card "700 kV"): ảnh nhà máy/mái solar + card kính mờ hiển thị "Tổng tiết kiệm / Tổng công suất". Bên trái: heading "Chuyển đổi năng lượng dễ dàng cùng Hana" + 2 bullet check + CTA.
4. **Grid card dự án** (giống "The Mission Of Energy / Serenity Of The Steppe"): map các **dự án thật** của Hana (Thuận An 9.45MWp, Khôi Nguyên 1.4MWp, Tân Quang Minh 630kWp, Đông Quang 8MWp, Sài Gòn Long An 1.166MWp, KODA 680kWp...). Mỗi card: ảnh + tên dự án + chủ đầu tư + công suất.
5. **Quy trình triển khai** (5 bước): Phân tích hiện trạng → Thiết kế & kết cấu → Thi công & lắp đặt → Đo lường & báo cáo phát thải → Vận hành & bảo trì.
6. **Tiêu chuẩn thiết bị**: Tấm pin (LONGi, JA Solar, Jinko), Inverter (Huawei, Sungrow), BESS, Khung đỡ.
7. **Chứng chỉ – Năng lực** + dải số liệu (06 / 1000+ / 99+ / 100%).
8. **Đối tác & khách hàng** (logo strip).
9. **CTA cuối + Footer**: hotline 092.576.8888, triết lý "Hiệu quả – Bền vững – Tin cậy".

### 5. SCROLL MOTION (GSAP) — yêu cầu cụ thể
Dùng skill `gsap-scrolltrigger` + `gsap-timeline`:
- **ScrollSmoother** bọc toàn trang cho cảm giác mượt như video.
- **Hero**: parallax nhẹ giữa ảnh nền và heading; ghost text "SOLAR ENERGY" dịch ngang theo scroll (`xPercent`); stat cards bay vào staggered khi load.
- **Reveal on scroll**: mọi heading/card dùng pattern `from({ y: 40, opacity: 0 }, ScrollTrigger start "top 85%")`, stagger cho grid.
- **Pin section** cho phần "Chuyển đổi năng lượng": pin + scrub để card glassmorphism và số liệu đếm tăng dần (counter animation với `snap`).
- **Grid dự án**: stagger reveal + hiệu ứng hover scale mượt.
- **Counter**: các số (06, 1000+, 99+, 100%, tổng MWp) đếm tăng khi vào viewport.
- Chuẩn bị sẵn `<ScrollVideoSection />` để sau gắn video scrubbing (`scrub: true`, map `progress` → `video.currentTime`).
- Tuân thủ `gsap-performance`: chỉ animate transform/opacity, `useGSAP` scope + cleanup, không animate layout properties.

### 6. Tiêu chí nghiệm thu (pre-flight theo taste-skill)
- [ ] Hero khớp bố cục Image 2 (pill nav, ghost text, glassmorphism stats, metric + badge, container bo góc cong đáy).
- [ ] Toàn bộ accent dùng **xanh lá brand Hana**, KHÔNG có lime/chartreuse.
- [ ] Glassmorphism áp dụng đúng spec mục 2B (blur, viền sáng, shadow mềm, có fallback, chữ đạt WCAG AA), nhất quán qua class `.glass-card`, không lạm dụng.
- [ ] Các section sau theo phong cách card clean của Image 1.
- [ ] Nội dung tiếng Việt đúng theo dữ liệu Hana (dự án, số liệu, thiết bị, quy trình).
- [ ] Scroll motion mượt 60fps, có `prefers-reduced-motion`, responsive desktop + mobile.
- [ ] Code chia component rõ ràng, có chỗ swap ảnh nền & gắn scroll-video sau này.
- [ ] Không có "AI slop": spacing chuẩn, typography có hierarchy, không dùng gradient/emoji bừa bãi.

### 7. Cách giao việc
Hãy làm theo trình tự:
1. In **Design Read** + **design tokens** (taste-skill + ui-ux-pro-max).
2. Dựng cấu trúc dự án Next.js + cài GSAP.
3. Build **Hero trước** (giống hệt Image 2), cho tôi review.
4. Sau khi tôi duyệt hero → build lần lượt các section còn lại.
5. Cuối cùng gắn toàn bộ GSAP scroll motion + ScrollSmoother + tối ưu performance.

Bắt đầu từ Bước 1.

---
*(hết prompt)*

---

## Ghi chú thêm cho bạn

- **Thay mã màu chính xác**: khi có hex logo Hana, sửa dòng "Đề xuất palette" thành mã thật để Claude áp dụng ngay (ví dụ `--brand-green: #1A7A3D; --brand-navy: #0E2A47;`).
- **Background hero**: prompt đã chừa sẵn chỗ để bạn thay ảnh nền sau, đúng như bạn muốn.
- **Scroll-driven video**: stack Next.js + GSAP ScrollTrigger là lựa chọn chuẩn nhất cho video-scrubbing — prompt đã yêu cầu tạo sẵn component placeholder.
- Nếu muốn nhẹ hơn (không cần SEO/SSR), có thể đổi "Next.js" → "Vite + React" trong prompt; phần GSAP giữ nguyên.
