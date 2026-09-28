# 📘 Dokumentasi Lengkap & Buku Panduan Operasional Sora Project
> **Platform Enterprise Manajemen Proyek, Kontrol HPP, Pengadaan Bahan, dan Penagihan Termin untuk Kontraktor Interior**  
> *Domain Produksi: [https://soraproject.reaksy.com](https://soraproject.reaksy.com)*

---

## 📌 Daftar Isi
1. [Pendahuluan: Apa itu Sora Project?](#1-pendahuluan-apa-itu-sora-project)
2. [Hierarki Struktur: Partner → Proyek → End User](#2-hierarki-struktur-partner--proyek--end-user)
3. [Alur Bisnis Utama (End-to-End Workflow)](#3-alur-bisnis-utama-end-to-end-workflow)
   - [A. Estimasi BOQ & Penawaran deal (HPP → Quotation)](#a-estimasi-boq--penawaran-deal-hpp--quotation)
   - [B. Pendaftaran & Registrasi Proyek Baru](#b-pendaftaran--registrasi-proyek-baru)
   - [C. Pengendalian Biaya Aktual (Cost Control & Variance)](#c-pengendalian-biaya-aktual-cost-control--variance)
   - [D. Alur Pengadaan Bahan (Procurement / PO) & Otomatisasi Biaya](#d-alur-pengadaan-bahan-procurement--po--otomatisasi-biaya)
   - [E. Penagihan Multi Termin & Monitoring Arus Kas](#e-penagihan-multi-termin--monitoring-arus-kas)
   - [F. Pengawasan Lapangan & Tenaga Kerja](#f-pengawasan-lapangan--tenaga-kerja)
   - [G. Audit Trail & Log Aktivitas Sistem](#g-audit-trail--log-aktivitas-sistem)
4. [Panduan Pengguna Berdasarkan Peran (Role & Permission)](#4-panduan-pengguna-berdasarkan-peran-role--permission)
   - [1. Pemilik Bisnis (Owner / Direktur)](#1-pemilik-bisnis-owner--direktur)
   - [2. Kepala Produksi (Workshop Manager)](#2-kepala-produksi-workshop-manager)
   - [3. Admin Keuangan (Finance & Purchasing)](#3-admin-keuangan-finance--purchasing)
   - [4. Pengawas Lapangan (Site Supervisor)](#4-pengawas-lapangan-site-supervisor)
5. [Pengoperasian di Perangkat Mobile (Smartphone & Tablet)](#5-pengoperasian-di-perangkat-mobile-smartphone--tablet)
6. [Tanya Jawab & Tips Praktis Operasional (FAQ)](#6-tanya-jawab--tips-praktis-operasional-faq)

---

## 1. Pendahuluan: Apa itu Sora Project?

**Sora Project** dirancang khusus untuk memecahkan masalah klasik pada industri kontraktor interior dan bengkel fabrikasi (*workshop joinery*):
- ❌ **Kebocoran Biaya (Cost Overrun)**: Biaya material dan tukang di lapangan melebihi estimasi awal tanpa terdeteksi sejak dini.
- ❌ **Keterlambatan Termin**: Penagihan ke klien terlambat diajukan karena progres fisik lapangan tidak sinkron dengan termin kontrak.
- ❌ **Kekacauan Pengadaan**: Tukang di lapangan membeli bahan tanpa persetujuan, kwitansi hilang, atau dobel pembelian.
- ❌ **Ketiadaan Riwayat Perubahan**: Pemilik bisnis tidak tahu siapa yang mengubah angka anggaran atau menyetujui pengeluaran.

Dengan **Sora Project**, seluruh operasional mulai dari **Perhitungan BOQ → SPK Kontrak → Pengadaan Bahan (PO) → Absensi Tukang → Penagihan Termin → Monitoring Margin Real-Time** terintegrasi dalam satu sistem yang aman dan mudah digunakan baik di desktop maupun ponsel.

---

## 2. Hierarki Struktur: Partner → Proyek → End User

Sora Project menggunakan relasi bisnis tiga tingkat yang mencerminkan realita proyek interior komersial maupun residensial:

```
[ PARTNER / KLIEN UTAMA ]
(Contoh: Arkana Design Studio / Arsitek / Konsultan / Main Contractor)
       │
       ├──► [ PROYEK 1 ] ──► End User: PT Fintech Nusantara (Kantor Lt. 24)
       │
       └──► [ PROYEK 2 ] ──► End User: Tanamera Coffee Group (Outlet Mall Senayan)
```

- **Partner**: Pihak yang memberikan SPK atau bermitra (misal: Biro Arsitek, Desainer Interior, Konsultan Manajemen Konstruksi, atau Klien Korporat).
- **Proyek**: Kontrak fisik pekerjaan renovasi/fit-out interior (memiliki nilai kontrak, plafon budget HPP, target margin laba, dan jadwal serah terima).
- **End User**: Merek atau entitas pengguna akhir yang menempati lokasi hasil pekerjaan.

---

## 3. Alur Bisnis Utama (End-to-End Workflow)

### A. Estimasi BOQ & Penawaran Deal (HPP → Quotation)
1. Buka menu **HPP & BOQ**.
2. Pilih proyek yang sedang dihitung pada dropdown **Filter Proyek**.
3. Klik tombol **`+ Tambah Item BOQ`** untuk memasukkan rincian pekerjaan:
   - Kategori: *Material & Hardware*, *Tenaga Kerja*, *Subkontraktor Spesialis*, atau *Overhead & Operasional*.
   - Masukkan volume, harga satuan modal HPP (*Cost*), dan persentase *Markup* margin (misal: 30%).
4. Sistem secara otomatis menghitung:
   - **HPP Murni**: Total modal dasar.
   - **Biaya Kontingensi (5%)**: Dana cadangan risiko lapangan.
   - **Harga Jual Penawaran (Quotation DPP)**.
   - **PPN 11% Faktur Resmi**.
5. Klik **`Cetak SPK / Quotation`** untuk melihat preview dokumen resmi siap cetak atau salin tautan penawaran untuk dikirim ke klien.

### B. Pendaftaran & Registrasi Proyek Baru
1. Klik tombol **`+ Proyek Baru`** di bagian atas aplikasi.
2. Isi formulir pendaftaran:
   - Nama Proyek Fit-out.
   - Pilih Partner Bisnis & tentukan nama End User.
   - Tipe Proyek (*Kantor B2B*, *F&B Cafe & Resto*, *Retail Boutique*, atau *Luxury Residential*).
   - Nilai Kontrak Deal (Rp) & Alokasi Plafon Budget HPP (Rp).
   - Tunjuk PIC Kepala Produksi (Workshop) dan PIC Site Supervisor (Lapangan).
   - Tentukan tanggal mulai SPK dan target serah terima (*Handover*).
3. Klik **`Simpan & Daftarkan Proyek`**.
4. Proyek baru akan langsung muncul di **Dashboard**, **Manajemen Proyek**, dan daftar kontrol biaya.

### C. Pengendalian Biaya Aktual (Cost Control & Variance)
1. Buka menu **Cost Control**.
2. Monitor parameter kesehatan keuangan:
   - **Budget HPP Terpasang**: Batas atas pengeluaran yang diizinkan agar target margin tercapai.
   - **Biaya Aktual (Actual Cost)**: Total uang riil yang sudah dikeluarkan (pembelian material + upah tukang + subkon + operasional).
   - **Variance (Selisih)**: Jika bernilai positif (hijau) berarti hemat/efisien; jika negatif (merah) berarti *Overbudget*.
   - **Sisa Budget**: Saldo dana yang masih aman digunakan hingga proyek selesai.
3. Untuk mencatat pengeluaran harian, klik **`+ Catat Pengeluaran`**:
   - Pilih proyek, tanggal, kategori biaya, nama toko/penerima uang, dan nominal aktual.
   - Pilih metode: *Transfer Bank* atau *Kas Lapangan (Petty Cash)*.
   - Pengeluaran yang melebihi alokasi plafon akan otomatis ditandai **`Flagged Overbudget`**.

### D. Alur Pengadaan Bahan (Procurement / PO) & Otomatisasi Biaya
1. **Pengajuan**: Pengawas Lapangan atau Mandor mengajukan kebutuhan bahan mendesak melalui menu **Pengadaan / PO**.
2. **Penerbitan PO**: Klik **`+ Terbitkan PO Bahan`**, masukkan vendor rekanan, ringkasan barang, estimasi nominal, dan target tanggal kirim.
3. **Approval Owner**: Status awal PO adalah `Menunggu Approval`. Owner dapat mengecek rincian dan mengklik **`Setujui PO`**.
4. **Logistik & Pengiriman**: Status diubah ke `Sedang Dikirim`.
5. **Penerimaan di Lapangan**: Ketika bahan sampai di lokasi proyek dan dicek oleh Pengawas Lapangan, klik **`Terima Bahan di Lapangan`**.
   > ⚡ **Otomatisasi Sistem**: Saat PO diubah menjadi `Diterima Lapangan`, sistem **otomatis mencatatkan pengeluaran tersebut ke dalam Biaya Aktual (Actual Cost)** proyek terkait tanpa perlu input ganda!

### E. Penagihan Multi Termin & Monitoring Arus Kas
1. Buka menu **Termin & Invoice**.
2. Setiap proyek memiliki jadwal pembayaran bertahap (misal: Uang Muka DP 30%, Termin 2 Progres 50%, Termin 3 Handover 20%, Retensi Pemeliharaan 5%).
3. Setiap termin memiliki:
   - **Trigger Progres Fisik**: Syarat persentase pekerjaan sebelum tagihan boleh diterbitkan.
   - **Nomor Invoice Resmi & Jatuh Tempo**.
   - **Status**: `Menunggu Pembayaran`, `Jatuh Tempo` (peringatan merah), atau `Lunas`.
4. Jika klien telah mentransfer pembayaran termin, klik tombol **`Verifikasi Lunas`**. Arus kas masuk (*Cashflow In*) akan terupdate seketika.

### F. Pengawasan Lapangan & Tenaga Kerja
1. Buka menu **Progres & Lapangan**:
   - **Update Progres Fisik (%)**: Geser slider persentase progres harian dan simpan.
   - **Dokumentasi Foto**: Pantau foto progres fisik terkini dari lapangan (misal: struktur hollow partisi, pemasangan HPL, instalasi lampu MEP, finishing duco).
   - **Laporan Harian Mandor**: Catatan kendala lokasi kerja (izin gedung / *working permit*, kendala lift barang, dsb.).
2. Buka menu **Tukang & Vendor**:
   - Monitoring daftar tukang aktif, mandor kayu, aplikator kaca, tukang MEP.
   - Status penempatan proyek masing-masing tukang dan daftar rating performa vendor toko bahan.

### G. Audit Trail & Log Aktivitas Sistem
1. Buka menu **Aktivitas & Log** (hanya dapat diakses oleh Owner).
2. Sistem mencatat secara otomatis seluruh aksi penting:
   - Siapa yang melakukan perubahan (Owner, Kepala Produksi, Admin Keuangan, Pengawas).
   - Entitas yang diubah (Proyek, Pengeluaran, PO, Termin, dsb.).
   - Waktu tepat (tanggal, jam, menit) dan keterangan detail perubahan.
3. Tersedia fitur pencarian cepat (*Search*) dan filter berdasarkan tipe entitas untuk audit internal.

---

## 4. Panduan Pengguna Berdasarkan Peran (Role & Permission)

Gunakan fitur **Switch Role** pada navbar kanan atas untuk berpindah mode kerja sesuai penugasan:

| Fitur / Menu | 👑 Owner | 🏭 Kepala Produksi | 💳 Admin Keuangan | 👷 Pengawas Lapangan |
| :--- | :---: | :---: | :---: | :---: |
| **Executive Dashboard** | Akses Penuh | Ringkasan Proyek | Arus Kas & Termin | Progres Lapangan |
| **Pendaftaran Proyek Baru** | ✅ Ya | ❌ Lihat Saja | ❌ Lihat Saja | ❌ Tidak |
| **HPP & Estimator BOQ** | ✅ Ya | ✅ Cek Spek | ✅ Ya | ❌ Tidak |
| **Cost Control & Budget** | ✅ Akses Penuh | ❌ Tidak | ✅ Input & Analisa | ❌ Tidak |
| **Approval PO Bahan** | ✅ Wajib Approval | ❌ Ajukan Saja | ✅ Proses Bayar | ❌ Ajukan Saja |
| **Invoicing & Status Termin** | ✅ Ya | ❌ Tidak | ✅ Terbitkan & Lunas | ❌ Tidak |
| **Update Progres Fisik (%)** | ✅ Ya | ✅ Ya | ❌ Tidak | ✅ Wajib Update |
| **Upload Foto & Laporan** | ✅ Ya | ✅ Ya | ❌ Tidak | ✅ Wajib Harian |
| **Audit Trail (Activity Log)** | ✅ Eksklusif Owner | ❌ Tidak | ❌ Tidak | ❌ Tidak |

---

## 5. Pengoperasian di Perangkat Mobile (Smartphone & Tablet)

Sora Project telah dioptimalkan khusus untuk kenyamanan operasional staf lapangan dan pemilik bisnis saat mobilitas tinggi:

1. **Fixed Viewport Tanpa Zoom Out Liar**:
   - Sistem dilengkapi pelindung gesture multi-touch dan viewport lock. Tampilan dashboard dan formulir modal tetap terkunci pada proporsi 100% yang tajam dan nyaman dibaca.
2. **Bebas Masalah Auto-Zoom iOS**:
   - Semua kolom formulir input di smartphone diformat dengan standar `16px`, sehingga browser iPhone Safari tidak akan memperbesar layar secara paksa saat pengguna mengetik.
3. **Modal Dialog Ramah Satu Tangan**:
   - Formulir modal mendukung tinggi dinamis layar ponsel (*dynamic viewport height*), menjaga tombol **Batal** dan **Simpan** selalu terlihat di atas keyboard virtual.
4. **Navigasi Cepat Mobile**:
   - Pada layar smartphone, menu navigasi bawah otomatis menyesuaikan dengan peran aktif (*Role*) agar pekerjaan lapangan bisa diakses dalam 1 kali ketukan.

---

## 6. Tanya Jawab & Tips Praktis Operasional (FAQ)

### Q: Apa yang harus dilakukan jika biaya material proyek mulai mendekati batas plafon HPP?
> **Jawab**: Masuk ke menu **Cost Control**, periksa kolom *Variance*. Jika selisih tipis (di bawah 10%), Owner dan Admin Keuangan dapat mengunci penerbitan PO baru untuk kategori non-kritis dan meminta negosiasi harga ulang dengan vendor toko bahan.

### Q: Bagaimana cara mengirim penawaran harga resmi (Quotation) ke klien?
> **Jawab**: Masuk ke **HPP & BOQ**, klik tombol **`Cetak SPK / Quotation`**. Anda dapat memilih mencetak langsung ke printer/PDF atau mengklik **Salin Tautan Dokumen Penawaran** untuk dikirimkan melalui WhatsApp/Email.

### Q: Apakah data perubahan angka bisa dihapus oleh staf tanpa sepengetahuan Owner?
> **Jawab**: Tidak. Seluruh penambahan proyek, persetujuan PO, pencatatan pengeluaran, perubahan persentase progres, dan pelunasan termin akan otomatis tercatat di **Audit Trail (Activity Log)** dengan waktu presisi dan identitas pengguna.

---
*© 2026 Sora Project — Enterprise Contractor Operational & Cost Control System.*
