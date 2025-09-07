# Upload Foto ➜ Link (Vercel + Next.js + Vercel Blob)

Aplikasi siap-deploy ke **Vercel** untuk upload gambar dan mendapatkan **direct link** publik.
Backend menggunakan **API Route** Next.js dan menyimpan file ke **Vercel Blob** (persisten).

## 🔧 Setup Lokal
1. Install dependencies:
   ```bash
   npm install
   # atau
   pnpm install
   ```

2. Buat file `.env.local` pada root dengan isi:
   ```env
   BLOB_READ_WRITE_TOKEN=
   ```
   Dapatkan token di Vercel: Dashboard → Storage → Blob → Access Tokens → **Read-Write**.

3. Jalankan developer server:
   ```bash
   npm run dev
   ```

## 🚀 Deploy ke Vercel
1. Import project ini ke Vercel (via GitHub/GitLab/Bitbucket atau upload manual).
2. Di Project Settings → **Environment Variables**, tambahkan:
   - `BLOB_READ_WRITE_TOKEN` = (isi token read-write dari Vercel Blob)
3. Deploy.
4. Selesai. Buka URL deploy → upload gambar → salin link.

## 🧩 Teknologi
- Next.js (App Router)
- Edge Runtime API Route (`app/api/upload/route.ts`)
- Vercel Blob (`@vercel/blob`)

## 🛡️ Validasi
- Tipe file harus `image/*`
- Maksimal ukuran 5MB

## Struktur
```
.
├─ app/
│  ├─ api/
│  │  └─ upload/
│  │     └─ route.ts
│  ├─ layout.tsx
│  └─ page.tsx
├─ next.config.mjs
├─ package.json
├─ tsconfig.json
└─ README.md
```

## Catatan
- File disimpan di Vercel Blob dengan akses publik; URL yang diberikan bisa dipakai langsung di mana pun.
- Tidak perlu server khusus; cocok untuk **Vercel free tier**.
