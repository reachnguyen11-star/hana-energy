/* =========================================================================
   Nội dung Hana Việt Nam — nguồn: energy.hanavn.vn
   Tách dữ liệu khỏi UI để các section tái sử dụng & dễ cập nhật.
   ========================================================================= */

export const COMPANY = {
  name: "Hana Việt Nam",
  fullName: "Công ty TNHH Thương mại Quốc tế Hana Việt Nam",
  hotline: "092 576 8888",
  email: "hana.vn279@gmail.com",
  website: "https://energy.hanavn.vn",
  address: "9/4 - 9/6 Đường 66, Phường An Khánh, TP Hồ Chí Minh",
  philosophy: ["Hiệu quả", "Bền vững", "Tin cậy"],
} as const;

/** Stat cards glassmorphism (hero, bên phải) */
export const HERO_STATS = [
  { value: 6, suffix: "", label: "Năm phát triển", display: "06" },
  { value: 1000, suffix: "+", label: "Hồ sơ / năm", display: "1000+" },
  { value: 99, suffix: "+", label: "Khách hàng hài lòng", display: "99+" },
  { value: 100, suffix: "%", label: "Chất lượng", display: "100%" },
] as const;

/** Hàng metric + badge dưới hero (năng lực Hana) */
export const HERO_METRICS = [
  { value: "21+", label: "MWp tổng công suất đã triển khai" },
  { value: "30+", label: "Dự án nhà máy & KCN" },
  { value: "100%", label: "Cam kết chất lượng" },
] as const;

/** Dự án thật của Hana — img: đường dẫn ảnh thật trong /public/projects/ */
export const PROJECTS = [
  { name: "Nhà máy Thuận An",   owner: "Thuận An",       power: "9.45 MWp",  img: "/projects/thuan-an.png"       },
  { name: "Nhà máy Đông Quang", owner: "Đông Quang",     power: "8 MWp",     img: "/projects/dong-quang.png"     },
  { name: "Gỗ Đức Thành",       owner: "Gỗ Đức Thành",  power: "1.2 MWp",   img: "/projects/go-duc-thanh.png"   },
  { name: "Khôi Nguyên",        owner: "Khôi Nguyên",   power: "1.4 MWp",   img: "/projects/khoi-nguyen.png"    },
  { name: "Sài Gòn Long An",    owner: "Sài Gòn Long An", power: "1.166 MWp", img: "/projects/sai-gon-long-an.jpg" },
  { name: "Tân Quang Minh",     owner: "Tân Quang Minh", power: "630 kWp",   img: "/projects/tan-quang-minh.png" },
  { name: "Viet Coldchain",     owner: "Viet Coldchain", power: "650 kWp",   img: "/projects/viet-coldchain.png" },
] as const;

/** Giải pháp cốt lõi (bộ 3 card) */
export const SOLUTIONS = [
  {
    title: "Hệ thống hạ tầng điện cho nhà máy",
    desc: "Thiết kế, thi công hệ thống điện công nghiệp an toàn, ổn định cho nhà máy và khu công nghiệp.",
  },
  {
    title: "Điện mặt trời mái nhà",
    desc: "Tận dụng diện tích mái, giảm chi phí điện và phát thải, hoàn vốn nhanh cho doanh nghiệp.",
  },
  {
    title: "Hệ thống lưu trữ năng lượng (BESS)",
    desc: "Lưu trữ và tối ưu nguồn điện, tăng độ ổn định và chủ động vận hành cho sản xuất.",
  },
] as const;

/** Quy trình triển khai 5 bước */
export const PROCESS = [
  { step: "01", title: "Phân tích hiện trạng", desc: "Khảo sát mái, đo phụ tải thực tế và hệ thống điện hiện hữu để xác định công suất tối ưu.", image: "/background-section-3-hana-energy.jpg" },
  { step: "02", title: "Thiết kế & kết cấu", desc: "Lập bản vẽ kỹ thuật, chọn thiết bị Tier-1, mô phỏng sản lượng và đề xuất phương án tài chính/PPA.", image: "/background-section-2-hana-energy.jpg" },
  { step: "03", title: "Thi công & lắp đặt", desc: "Triển khai theo tiến độ cam kết, giám sát an toàn lao động, nghiệm thu và hòa lưới điện.", image: "/projects/thuan-an.png" },
  { step: "04", title: "Đo lường & báo cáo phát thải", desc: "Đo kiểm sản lượng thực tế, lập báo cáo tiết kiệm năng lượng và giảm phát thải CO₂.", image: "/projects/dong-quang.png" },
  { step: "05", title: "Vận hành & bảo trì", desc: "Giám sát từ xa 24/7, cảnh báo sự cố, bảo trì định kỳ trong suốt vòng đời hệ thống.", image: "/projects/sai-gon-long-an.jpg" },
] as const;

/** Tiêu chuẩn thiết bị — logo: đường dẫn trong /public/equipment (null nếu chưa có logo) */
export const EQUIPMENT = [
  {
    category: "Tấm pin",
    desc: "Mô-đun hiệu suất cao, suy hao thấp",
    brands: [
      { name: "LONGi", logo: "/equipment/longi.png" },
      { name: "JA Solar", logo: "/equipment/ja-solar.png" },
      { name: "Jinko", logo: "/equipment/jinko.png" },
    ],
  },
  {
    category: "Inverter",
    desc: "Biến tần chuỗi & trung tâm, giám sát từ xa",
    brands: [
      { name: "Huawei", logo: "/equipment/huawei.png" },
      { name: "Sungrow", logo: "/equipment/sungrow.png" },
    ],
  },
  {
    category: "Lưu trữ (BESS)",
    desc: "Pin Lithium công nghiệp, vòng đời dài",
    brands: [
      { name: "Pin Lithium công nghiệp", logo: null },
    ],
  },
  {
    category: "Khung đỡ",
    desc: "Khung mạ kẽm / nhôm định hình chống ăn mòn",
    brands: [
      { name: "Khung mạ kẽm / nhôm định hình", logo: null },
    ],
  },
] as const;

export const NAV_LINKS = [
  { label: "Giải pháp", href: "#giai-phap", hasDropdown: true },
  { label: "Quy trình", href: "#quy-trinh", hasDropdown: false },
  { label: "Dự án", href: "#du-an", hasDropdown: false },
  { label: "Về chúng tôi", href: "#ve-chung-toi", hasDropdown: false },
] as const;
