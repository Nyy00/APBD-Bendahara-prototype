# APBD Bendahara - Aplikasi Pencatatan Keuangan

Aplikasi mobile untuk pencatatan APBD (Anggaran Pendapatan dan Belanja Daerah) khusus bendahara dengan UI/UX modern dan user-friendly.

## Fitur Utama

### 📊 Dashboard
- Ringkasan saldo kas, penerimaan, pengeluaran, dan sisa anggaran
- Grafik tren keuangan
- Notifikasi dan peringatan penting
- Transaksi terkini

### 💰 Pencatatan Penerimaan
- Input penerimaan dari kas daerah (SP2D)
- Tracking nomor SP2D dan jumlah
- Monitoring saldo kas bendahara
- Riwayat penerimaan lengkap

### 💸 Pencatatan Pengeluaran
- Input pengeluaran berdasarkan kuitansi/bukti
- Kode rekening belanja
- Upload bukti pengeluaran digital
- Monitoring sisa anggaran real-time

### 📚 Buku Kas
- Buku kas umum bendahara
- Mutasi kas harian
- Saldo running balance
- Export laporan periode

### 📋 Laporan SPJ
- Generate laporan SPJ otomatis
- Rekapitulasi per kode rekening
- Template laporan standar
- Status tracking laporan

### 🔍 Fitur Tambahan
- Pencarian dan filter transaksi
- Arsip digital dokumen
- Rekonsiliasi bank
- Reminder dan notifikasi
- Validasi dan kontrol anggaran

## Teknologi

- **Framework**: Next.js 15 dengan TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **UI Components**: Custom components dengan Headless UI
- **State Management**: React Hooks
- **Date Handling**: date-fns

## Instalasi

1. Clone repository
```bash
git clone [repository-url]
cd apbd-bendahara
```

2. Install dependencies
```bash
npm install
```

3. Jalankan development server
```bash
npm run dev
```

4. Buka browser di `http://localhost:3003`

## Struktur Project

```
src/
├── app/                    # Next.js App Router
├── components/            
│   ├── ui/                # Reusable UI components
│   ├── layout/            # Layout components (Navbar, Sidebar)
│   ├── dashboard/         # Dashboard components
│   ├── penerimaan/        # Penerimaan components
│   ├── pengeluaran/       # Pengeluaran components
│   ├── buku-kas/          # Buku Kas components
│   └── spj/               # SPJ components
├── lib/                   # Utilities and helpers
└── types/                 # TypeScript type definitions
```

## Komponen Utama

### Layout
- `Navbar`: Navigation bar dengan menu toggle dan notifikasi
- `Sidebar`: Menu navigasi samping dengan routing

### Dashboard
- `Dashboard`: Halaman utama dengan ringkasan keuangan
- `StatsCard`: Kartu statistik dengan icon dan trend

### Forms & Lists
- `PenerimaanForm`: Form input penerimaan
- `PenerimaanList`: Tabel riwayat penerimaan
- `PengeluaranForm`: Form input pengeluaran dengan upload bukti
- `PengeluaranList`: Tabel riwayat pengeluaran

### Reports
- `BukuKas`: Buku kas umum dengan filter periode
- `LaporanSPJ`: Generate dan kelola laporan SPJ

## Fitur Mobile-First

- **Responsive Design**: Optimal untuk semua ukuran layar (mobile, tablet, desktop)
- **Touch-Friendly Interface**: Button dan input yang mudah digunakan dengan sentuhan
- **Mobile Navigation**: Hamburger menu dengan sidebar overlay untuk mobile
- **Card Layout**: Tabel berubah menjadi card layout di mobile untuk readability yang lebih baik
- **PWA Ready**: Dapat diinstall sebagai aplikasi mobile
- **Touch Optimizations**: 
  - Minimum touch target 44px
  - Prevent zoom on input focus
  - Smooth scrolling
  - Touch-friendly scrollbars
- **Safe Area Support**: Mendukung device dengan notch (iPhone X+)
- **Optimized Typography**: Font size yang sesuai untuk mobile (16px minimum untuk input)

## Mobile-Specific Features

### Adaptive Layouts
- **Dashboard**: Grid 2 kolom di mobile, 4 kolom di desktop
- **Forms**: Stack layout di mobile, grid di desktop  
- **Tables**: Card layout di mobile, table di desktop
- **Navigation**: Overlay sidebar di mobile, fixed sidebar di desktop

### Touch Interactions
- **Buttons**: Minimum 44px touch target
- **Inputs**: Larger height (44px) di mobile
- **File Upload**: Full-width button di mobile
- **Action Buttons**: Stack vertically di mobile

### Performance
- **CSS Optimizations**: Mobile-first media queries
- **Font Loading**: Optimized web fonts
- **Image Handling**: Responsive images
- **Bundle Size**: Optimized untuk mobile networks

## Data Model

### Profil Bendahara
- Nama, NIP, SKPD
- Nomor rekening
- Periode tugas

### Transaksi
- Penerimaan (SP2D)
- Pengeluaran (dengan bukti)
- Kode rekening
- Saldo running

### Laporan
- SPJ bulanan
- Buku kas harian
- Rekapitulasi per periode

## Development

### Scripts
```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint check
```

### Styling Guidelines
- Menggunakan Tailwind CSS utility classes
- Konsisten dengan design system
- Mobile-first responsive design
- Accessible components

## Roadmap

- [ ] Implementasi backend API
- [ ] Authentication & authorization
- [ ] Database integration
- [ ] File upload & storage
- [ ] PDF generation untuk laporan
- [ ] Push notifications
- [ ] Offline capability
- [ ] Data synchronization

## Kontribusi

1. Fork repository
2. Buat feature branch
3. Commit changes
4. Push ke branch
5. Buat Pull Request

## Lisensi

MIT License - lihat file LICENSE untuk detail.