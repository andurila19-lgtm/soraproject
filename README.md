# 🏗️ Sora Project — Enterprise Contractor Operational & Cost Control System

> **Platform Operasional & Kontrol HPP Real-time untuk Kontraktor Interior & Workshop Joinery B2B.**  
> Domain Produksi: **[https://soraproject.reaksy.com](https://soraproject.reaksy.com)**

---

## 📖 Dokumentasi Lengkap
Buku panduan lengkap operasional dan pengoperasian bagi Pemilik Bisnis (*Business Owner*), Kepala Produksi, Admin Keuangan, dan Pengawas Lapangan dapat dibaca di:
👉 **[DOKUMENTASI_PANDUAN_SORA_PROJECT.md](./DOKUMENTASI_PANDUAN_SORA_PROJECT.md)**

---

## 🚀 Fitur Unggulan Sistem

1. **Partner → Multiple Project → End User Architecture**:
   - Menghubungkan Partner B2B (Arsitek / Konsultan / Main Contractor) dengan banyak proyek fit-out dan merek *End User*.
2. **Estimator HPP & Generator Dokumen Quotation Deal**:
   - Penghitungan Bill of Quantities (BOQ), margin markup bertingkat, dana kontingensi (5%), dan PPN 11% faktur resmi.
   - Dokumen Penawaran Resmi siap cetak / PDF.
3. **Pengendalian Biaya Aktual (Cost Control & Variance)**:
   - Monitoring real-time Plafon HPP vs Biaya Aktual (*Actual Cost*), selisih (*Variance*), dan estimasi laba kotor.
4. **Alur Pengadaan Bahan & PO Otomatis (Procurement Flow)**:
   - Permintaan bahan dari lapangan → Persetujuan Owner (*Approval*) → Pembelian/Pengiriman → Otomatis terbukukan ke Biaya Aktual proyek.
5. **Multi-Termin & Manajemen Cashflow**:
   - Penagihan bertahap berbasis *trigger* progres fisik (%) lapangan, tracking invoice jatuh tempo, dan verifikasi pelunasan.
6. **Pengawasan Lapangan & Tenaga Kerja**:
   - Monitoring slider progres fisik harian, timeline milestone, galeri foto lapangan, laporan harian mandor, serta database tukang & vendor.
7. **Role-Based Access Control (RBAC)**:
   - 4 peran terpisah: **Owner**, **Kepala Produksi**, **Admin Keuangan**, dan **Pengawas Lapangan**.
8. **Audit Trail (Activity Log)**:
   - Riwayat transparan aktivitas seluruh pengguna sistem: siapa, kapan, dan perubahan apa yang dilakukan.
9. **Mobile-First Experience**:
   - Anti-zoom lock (bebas pinch zoom-out liar), form input standar 16px anti-autozoom iOS, dan navigasi ramah layar sentuh.

---

## 💻 Tech Stack

- **Framework**: Next.js 16 (App Router & Turbopack)
- **Library**: React 19
- **Bahasa**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS & TailAdmin Design System
- **Icons**: Lucide React
- **SEO & Metadata**: Dynamic OpenGraph, JSON-LD Structured Data, PWA Manifest, Robots, & Sitemap

---

## 🛠️ Menjalankan Proyek Secara Lokal

```bash
# 1. Clone repository
git clone https://github.com/andurila19-lgtm/soraproject.git
cd soraproject

# 2. Install dependencies
npm install

# 3. Jalankan server pengembangan
npm run dev

# 4. Buka di browser
# http://localhost:3000
```

Untuk build produksi:
```bash
npm run build
npm run start
```

---
*© 2026 Sora Project. All rights reserved.*
