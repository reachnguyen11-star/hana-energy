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

/** Quy trình triển khai 8 bước */
export const PROCESS = [
  { step: "01", title: "Khảo sát hiện trạng", desc: "Đo đạc mái, kết cấu, hệ thống điện và điều kiện đấu nối tại nhà máy.", image: "hana-step1" },
  { step: "02", title: "Phân tích phụ tải", desc: "Đọc dữ liệu tiêu thụ và biểu giá điện để xác định công suất tối ưu.", image: "hana-step2" },
  { step: "03", title: "Thiết kế hệ thống", desc: "Lập bản vẽ kỹ thuật, chọn thiết bị và mô phỏng sản lượng dự kiến.", image: "hana-step3" },
  { step: "04", title: "Đề xuất tài chính", desc: "Trình phương án đầu tư, thời gian hoàn vốn và mô hình PPA nếu phù hợp.", image: "hana-step4" },
  { step: "05", title: "Thi công lắp đặt", desc: "Triển khai theo tiến độ cam kết, giám sát an toàn lao động xuyên suốt.", image: "hana-step5" },
  { step: "06", title: "Kiểm tra & nghiệm thu", desc: "Đo kiểm chất lượng, bàn giao hồ sơ hoàn công đầy đủ.", image: "hana-step6" },
  { step: "07", title: "Đấu nối & vận hành", desc: "Hòa lưới, cấu hình giám sát và hướng dẫn vận hành cho đội kỹ thuật.", image: "hana-step7" },
  { step: "08", title: "Giám sát & bảo trì", desc: "Theo dõi sản lượng từ xa và bảo trì định kỳ trong suốt vòng đời.", image: "hana-step8" },
] as const;

/** Tiêu chuẩn thiết bị */
export const EQUIPMENT = [
  { category: "Tấm pin", brands: ["LONGi", "JA Solar", "Jinko"] },
  { category: "Inverter", brands: ["Huawei", "Sungrow"] },
  { category: "Lưu trữ (BESS)", brands: ["Pin Lithium công nghiệp"] },
  { category: "Khung đỡ", brands: ["Khung mạ kẽm / nhôm định hình"] },
] as const;

export const NAV_LINKS = [
  { label: "Giải pháp", href: "#giai-phap", hasDropdown: true },
  { label: "Quy trình", href: "#quy-trinh", hasDropdown: false },
  { label: "Dự án", href: "#du-an", hasDropdown: false },
  { label: "Về chúng tôi", href: "#ve-chung-toi", hasDropdown: false },
] as const;
