# Hana Energy Website - Fix Plan

Ngay sau audit, production build va typecheck dang pass. Cac muc duoi day la nhung loi/rui ro nen xu ly truoc khi deploy hoac ban giao.

## 1. Sua ngon ngu HTML cho trang `/en`

**Muc do:** Medium  
**Van de:** `app/layout.tsx` dang hard-code `<html lang="vi">`, nen trang `/en` van bi khai bao la tieng Viet. Anh huong SEO, screen reader va browser translation.

**File lien quan:**
- `app/layout.tsx`
- `app/en/page.tsx`

**Huong sua de xuat:**
1. Tao route group hoac dynamic locale layout neu muon mo rong da ngon ngu sau nay.
2. Cach nhanh: tao `app/en/layout.tsx` rieng cho English neu can override metadata/lang structure.
3. Cach tot hon: chuyen sang `app/[lang]/page.tsx` va lay `params.lang` de set `<html lang={lang}>`.
4. Dam bao Vietnamese route set `lang="vi"`, English route set `lang="en"`.

**Kiem tra:**
```bash
npm.cmd run build
npx.cmd tsc --noEmit
```

Sau khi chay local, kiem tra DevTools Elements:
- `/` co `<html lang="vi">`
- `/en` co `<html lang="en">`

## 2. Thay contact form `mailto:` bang submit that

**Muc do:** Medium  
**Van de:** Form lien he hien dung `action="mailto:..."`. Cach nay phu thuoc email client cua nguoi dung, de mat lead tren mobile/webmail.

**File lien quan:**
- `components/sections/ContactForm.tsx`
- Co the them `app/api/contact/route.ts`

**Huong sua de xuat:**
1. Tao API route `app/api/contact/route.ts` nhan `POST` JSON.
2. Trong `ContactForm.tsx`, doi form sang controlled/uncontrolled submit bang `fetch('/api/contact')`.
3. Gui email qua mot dich vu nhu Resend, SendGrid, SMTP server, hoac webhook CRM.
4. Them validation toi thieu: name, phone/email, service.
5. Hien trang thai submit: loading, success, error.
6. Neu chua co backend/email provider, tam thoi gui ve webhook/form service thay vi `mailto:`.

**Kiem tra:**
```bash
npm.cmd run build
npx.cmd tsc --noEmit
```

Kiem tra bang UI:
- Submit thanh cong hien message ro rang.
- Loi network/API hien message than thien.
- Khong mo app email ngoai.

## 3. Xu ly link placeholder `href="#"`

**Muc do:** Low/Medium  
**Van de:** Link placeholder lam nguoi dung bi nhay len dau trang hoac tuong la link loi.

**File lien quan:**
- `components/sections/Manifesto.tsx`
- `components/site/Footer.tsx`

**Vi tri da thay:**
- `Manifesto.tsx`: nut doc them trong report cards.
- `Footer.tsx`: icon website dang tro `#`.

**Huong sua de xuat:**
1. Trong `Footer.tsx`, doi `href="#"` thanh `href={COMPANY.website}` va them `target="_blank" rel="noopener noreferrer"` neu mo web ngoai.
2. Trong `Manifesto.tsx`, neu chua co trang bai viet/report that:
   - Doi thanh button disabled/khong render link; hoac
   - Tro ve `#lien-he`; hoac
   - Them URL that vao translation data cho tung report card.
3. Neu them URL that, cap nhat ca `vi` va `en` trong `lib/translations.ts`.

**Kiem tra:**
```bash
rg -n 'href="#"' app components lib
npm.cmd run build
```

Ket qua mong doi: khong con `href="#"` tru khi co ly do ro rang.

## 4. Bo CDN Spline du thua va can nhac self-host `model-viewer`

**Muc do:** Low  
**Van de:** `Solutions.tsx` dang tai Spline viewer tu `unpkg`, nhung UI hien khong dung `<spline-viewer>`. Ngoai ra `model-viewer` phu thuoc Google CDN, neu bi chan/cham thi 3D card co the blank.

**File lien quan:**
- `components/sections/Solutions.tsx`

**Huong sua de xuat:**
1. Xoa script Spline neu khong dung:
   ```tsx
   <Script type="module" src="https://unpkg.com/@splinetool/viewer@1.12.97/build/spline-viewer.js" strategy="lazyOnload" />
   ```
2. Giu `model-viewer` neu van can GLB solar panel.
3. Neu muon on dinh hon:
   - Cai package `@google/model-viewer`; hoac
   - Self-host file script trong `public/vendor/`; hoac
   - Thay 3D bang anh/video fallback neu performance la uu tien.
4. Them fallback visual khi custom element chua load hoac CDN fail.

**Kiem tra:**
```bash
npm.cmd run build
```

Kiem tra UI:
- Card 3D van hien hop ly.
- Network tab khong con request Spline neu khong dung.

## 5. Migrate lint script khoi `next lint`

**Muc do:** Low/Medium  
**Van de:** `next lint` trong Next 15 da deprecated va hien dang mo prompt cau hinh, khong phu hop CI/non-interactive audit.

**File lien quan:**
- `package.json`
- Co the them `eslint.config.mjs`

**Huong sua de xuat:**
1. Cai ESLint va config Next neu chua co:
   ```bash
   npm.cmd install -D eslint eslint-config-next
   ```
2. Tao `eslint.config.mjs` theo chuan ESLint flat config cua Next.
3. Doi script trong `package.json`:
   ```json
   "lint": "eslint ."
   ```
4. Chay lint va sua warning/error that.

**Kiem tra:**
```bash
npm.cmd run lint
npm.cmd run build
```

## 6. Theo doi vulnerability `next -> postcss`

**Muc do:** Medium  
**Van de:** `npm audit` bao `postcss <8.5.10` moderate vulnerability nam trong dependency cua `next`. `npm audit fix --force` de xuat downgrade Next, khong nen chay.

**File lien quan:**
- `package.json`
- `package-lock.json`

**Huong sua de xuat:**
1. Khong chay `npm audit fix --force` vi co the downgrade/break app.
2. Thu update Next trong bien minor/patch an toan:
   ```bash
   npm.cmd install next@latest
   ```
3. Sau khi update, chay build/typecheck/audit.
4. Neu van con advisory va chua co ban fix phu hop, ghi nhan risk acceptance tam thoi.

**Kiem tra:**
```bash
npm.cmd run build
npx.cmd tsc --noEmit
npm.cmd audit --audit-level=moderate
```

## 7. Cai thien SEO metadata

**Muc do:** Low  
**Van de:** Metadata hien co title/description co ban, nhung chua thay Open Graph, Twitter card, canonical, robots/sitemap.

**File lien quan:**
- `app/layout.tsx`
- `app/en/page.tsx`
- Co the them `app/robots.ts`, `app/sitemap.ts`

**Huong sua de xuat:**
1. Them `metadataBase` theo domain production.
2. Them `openGraph` va `twitter` metadata cho trang VI va EN.
3. Them canonical/alternates languages:
   - `/` cho `vi`
   - `/en` cho `en`
4. Them `app/robots.ts` va `app/sitemap.ts`.

**Kiem tra:**
```bash
npm.cmd run build
```

Dung View Source/DevTools de kiem tra meta tags.

## Thu tu uu tien de lam

1. Sua `lang` cho `/en`.
2. Sua contact form de khong dung `mailto:`.
3. Sua tat ca `href="#"`.
4. Bo CDN Spline du thua va them fallback cho `model-viewer`.
5. Migrate lint script.
6. Update/monitor Next vulnerability.
7. Bo sung SEO metadata.

## Checklist xac minh cuoi

Chay cac lenh sau truoc khi deploy:

```bash
npm.cmd run build
npx.cmd tsc --noEmit
npm.cmd run lint
npm.cmd audit --audit-level=moderate
```

Kiem tra thu cong:
- Navbar mobile mo/dong dung.
- Anchor links scroll toi dung section.
- `/` va `/en` doi ngon ngu dung.
- Contact form submit thanh cong va hien feedback.
- Anh/3D asset load duoc khi mang cham.
- Trang desktop va mobile khong bi horizontal overflow.
