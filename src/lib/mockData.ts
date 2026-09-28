import { Partner, Project, BOQItem, CostExpense, Worker, Vendor, PurchaseOrder, PaymentTermin, SitePhoto, DailyReport, ActivityLog } from './types';

export const initialPartners: Partner[] = [
  {
    id: 'pt-001',
    name: 'Arkana Design Studio',
    type: 'Arsitek / Konsultan',
    contactPerson: 'Ar. Danang Wicaksono, IAI',
    phone: '0812-8899-2311',
    email: 'danang@arkanadesign.co.id',
    address: 'Jl. Wijaya II No. 45, Kebayoran Baru, Jakarta Selatan',
    totalProjects: 4,
    activeProjects: 2,
    totalContractValue: 2270000000,
    paymentScore: 'Sangat Baik',
    notes: 'Partner arsitek premium dengan spesifikasi HPL Aica & lighting Flos. Selalu repeat client.',
  },
  {
    id: 'pt-002',
    name: 'Tanamera Hospitality Group',
    type: 'F&B Holding',
    contactPerson: 'Jessica Renata (Head of Expansion)',
    phone: '0811-9234-8800',
    email: 'jessica.r@tanameragroup.com',
    address: 'Gedung Graha Niaga Lt. 12, SCBD, Jakarta',
    totalProjects: 3,
    activeProjects: 1,
    totalContractValue: 1940000000,
    paymentScore: 'Baik',
    notes: 'Klien komersial retail. Termin pembayaran disiplin 14 hari kerja setelah BAST.',
  },
  {
    id: 'pt-003',
    name: 'PT Nexus Finansial Digital',
    type: 'Corporate Client',
    contactPerson: 'Bambang Trihatmojo (VP General Affairs)',
    phone: '0813-7722-1090',
    email: 'bambang.t@nexusfin.id',
    address: 'Treasury Tower Lt. 24, SCBD Sudirman, Jakarta Selatan',
    totalProjects: 2,
    activeProjects: 1,
    totalContractValue: 2150000000,
    paymentScore: 'Sangat Baik',
    notes: 'Perusahaan fintech tier 1. Butuh standar acoustic tinggi dan integrasi smart meeting room.',
  },
  {
    id: 'pt-004',
    name: 'PT Mega Citra Propertindo',
    type: 'Property Developer',
    contactPerson: 'Hendrik Setiawan (Project Director)',
    phone: '0818-4455-9011',
    email: 'hendrik.s@megacitra.com',
    address: 'Pakuwon Tower Lt. 18, Casablanca, Jakarta Selatan',
    totalProjects: 5,
    activeProjects: 1,
    totalContractValue: 3450000000,
    paymentScore: 'Perlu Follow-up',
    notes: 'Developer apartemen & mixed-use. Retensi 10% sering membutuhkan pengecekan ekstra.',
  },
];

export const initialProjects: Project[] = [
  {
    id: 'prj-001',
    code: 'SRA-2026-01',
    name: 'Fit-out Kantor FinTech Nexus SCBD',
    partnerId: 'pt-003',
    partnerName: 'PT Nexus Finansial Digital',
    endUser: 'Nexus FinTech Headquarters',
    projectType: 'Kantor B2B',
    location: 'Treasury Tower Lt. 24, SCBD, Jakarta Selatan',
    contractValue: 1450000000,
    hppBudget: 1015000000,
    actualCost: 938500000,
    targetMargin: 30,
    progress: 74,
    status: 'On-Site Fit-out',
    health: 'On Track',
    picProduksi: 'Budi Santoso (Kepala Produksi)',
    picLapangan: 'Rian Pratama (Site Supervisor)',
    startDate: '2026-08-01',
    targetCompletion: '2026-10-15',
    image: '/images/project-office.jpg',
    description: 'Pekerjaan fit-out kantor corporate seluas 480 m2 meliputi partisi kaca frameless curved, acoustic ceiling baffle, open workspace, board room, dan custom pantry cabinetry.',
    milestones: [
      { id: 'm1', title: 'Site Survey & Approval Drawing 3D', startDate: '2026-08-01', endDate: '2026-08-08', progress: 100, status: 'Selesai', weight: 10 },
      { id: 'm2', title: 'Demolisi & Pekerjaan Rangka Gypsum', startDate: '2026-08-09', endDate: '2026-08-22', progress: 100, status: 'Selesai', weight: 20 },
      { id: 'm3', title: 'Instalasi MEP & Jalur Kabel Data Server', startDate: '2026-08-23', endDate: '2026-09-05', progress: 100, status: 'Selesai', weight: 20 },
      { id: 'm4', title: 'Pabrikasi Custom Cabinets di Workshop', startDate: '2026-08-20', endDate: '2026-09-18', progress: 95, status: 'Sedang Berjalan', weight: 25 },
      { id: 'm5', title: 'Pemasangan Glass Partition & Wall Fluted Panel', startDate: '2026-09-15', endDate: '2026-10-02', progress: 65, status: 'Sedang Berjalan', weight: 15 },
      { id: 'm6', title: 'Finishing Touch, Deep Cleaning & BAST Retensi', startDate: '2026-10-03', endDate: '2026-10-15', progress: 0, status: 'Belum Mulai', weight: 10 },
    ],
  },
  {
    id: 'prj-002',
    code: 'SRA-2026-02',
    name: 'Tanamera Cafe & Roastery Senopati',
    partnerId: 'pt-002',
    partnerName: 'Tanamera Hospitality Group',
    endUser: 'Tanamera Senopati Store',
    projectType: 'F&B Cafe & Resto',
    location: 'Jl. Senopati No. 78, Kebayoran Baru, Jakarta Selatan',
    contractValue: 820000000,
    hppBudget: 574000000,
    actualCost: 568400000,
    targetMargin: 30,
    progress: 92,
    status: 'Finishing & QC',
    health: 'Perlu Perhatian',
    picProduksi: 'Budi Santoso (Kepala Produksi)',
    picLapangan: 'Hendra Gunawan (Site Supervisor)',
    startDate: '2026-07-15',
    targetCompletion: '2026-10-02',
    image: '/images/project-cafe.jpg',
    description: 'Renovasi interior cafe 180 m2 dengan signature curved ribbed oak bar counter, brass shelving, custom marble top, dan ambient lighting system.',
    milestones: [
      { id: 'm21', title: 'SIPIL & Waterproofing Bar Area', startDate: '2026-07-15', endDate: '2026-07-28', progress: 100, status: 'Selesai', weight: 20 },
      { id: 'm22', title: 'MEP Barista Plumbing & Daya Listrik 3 Phase', startDate: '2026-07-29', endDate: '2026-08-14', progress: 100, status: 'Selesai', weight: 25 },
      { id: 'm23', title: 'Pabrikasi Bar Counter Fluted Oak di Workshop', startDate: '2026-08-10', endDate: '2026-09-05', progress: 100, status: 'Selesai', weight: 30 },
      { id: 'm24', title: 'Instalasi Marmer Carrara & Brass Lighting', startDate: '2026-09-06', endDate: '2026-09-24', progress: 100, status: 'Selesai', weight: 15 },
      { id: 'm25', title: 'QC Barista Flow, Touchup Cat & Handover', startDate: '2026-09-25', endDate: '2026-10-02', progress: 60, status: 'Sedang Berjalan', weight: 10 },
    ],
  },
  {
    id: 'prj-003',
    code: 'SRA-2026-03',
    name: 'Penthouse Kemang Village Residence',
    partnerId: 'pt-001',
    partnerName: 'Arkana Design Studio',
    endUser: 'Private Residence (Mr. Ronald)',
    projectType: 'Luxury Residential',
    location: 'Tower Infinity Lt. 36, Kemang Village, Jakarta Selatan',
    contractValue: 1880000000,
    hppBudget: 1280000000,
    actualCost: 595000000,
    targetMargin: 31.9,
    progress: 46,
    status: 'Persiapan Workshop',
    health: 'On Track',
    picProduksi: 'Agus Salim (Workshop Manager)',
    picLapangan: 'Rian Pratama (Site Supervisor)',
    startDate: '2026-08-15',
    targetCompletion: '2026-11-30',
    image: '/images/project-workshop.jpg',
    description: 'Full interior luxury penthouse 320 m2. Walk-in closet dengan sistem sensor Blum, master bedroom fluted walnut, dapur gourmet island quartz slab, dan smart lighting KNX.',
    milestones: [
      { id: 'm31', title: 'As-Built Drawing & Laser 3D Scanning', startDate: '2026-08-15', endDate: '2026-08-25', progress: 100, status: 'Selesai', weight: 15 },
      { id: 'm32', title: 'Demolisi Plafon Lama & Relokasi Chiller AC', startDate: '2026-08-26', endDate: '2026-09-12', progress: 100, status: 'Selesai', weight: 20 },
      { id: 'm33', title: 'Produksi Kayu Solid & Veneer Walnut Workshop', startDate: '2026-09-05', endDate: '2026-10-20', progress: 50, status: 'Sedang Berjalan', weight: 35 },
      { id: 'm34', title: 'Instalasi Panel Dinding & Hidden Door', startDate: '2026-10-21', endDate: '2026-11-10', progress: 0, status: 'Belum Mulai', weight: 20 },
      { id: 'm35', title: 'QC Akhir, Furnishing & Serah Terima BAST', startDate: '2026-11-11', endDate: '2026-11-30', progress: 0, status: 'Belum Mulai', weight: 10 },
    ],
  },
  {
    id: 'prj-004',
    code: 'SRA-2026-04',
    name: 'Boutique Flagship Store PIK Avenue',
    partnerId: 'pt-004',
    partnerName: 'PT Mega Citra Propertindo',
    endUser: 'Lumière Fashion Flagship',
    projectType: 'Retail Boutique',
    location: 'PIK Avenue Mall Lt. GF-22, Jakarta Utara',
    contractValue: 720000000,
    hppBudget: 504000000,
    actualCost: 112000000,
    targetMargin: 30,
    progress: 20,
    status: 'Deal & SPK',
    health: 'On Track',
    picProduksi: 'Budi Santoso (Kepala Produksi)',
    picLapangan: 'Hendra Gunawan (Site Supervisor)',
    startDate: '2026-09-10',
    targetCompletion: '2026-11-10',
    image: '/images/project-office.jpg',
    description: 'Fit-out retail tenant mall 120 m2 dengan lighting CRI 95+, display island microcement, fitting room velvet acoustics, dan stainless hairline facade.',
    milestones: [
      { id: 'm41', title: 'SPK & Izin Kerja Mall Fit-out Permit', startDate: '2026-09-10', endDate: '2026-09-18', progress: 100, status: 'Selesai', weight: 20 },
      { id: 'm42', title: 'Pengadaan Material Stainless & Display Microcement', startDate: '2026-09-19', endDate: '2026-10-05', progress: 40, status: 'Sedang Berjalan', weight: 30 },
      { id: 'm43', title: 'Kerja Malam Mall: Pemasangan Partisi & Flooring', startDate: '2026-10-06', endDate: '2026-10-25', progress: 0, status: 'Belum Mulai', weight: 30 },
      { id: 'm44', title: 'Signage, Glass Shopfront & Opening Trial', startDate: '2026-10-26', endDate: '2026-11-10', progress: 0, status: 'Belum Mulai', weight: 20 },
    ],
  }
];

// =============================================
// BOQ Items — linked to specific projects
// Sum of totalHPP per project = project.hppBudget
// =============================================

export const initialBOQItems: BOQItem[] = [
  // ===== PRJ-001: Fit-out Kantor FinTech Nexus SCBD (hppBudget: 1,015,000,000) =====
  // Material & Hardware
  { id: 'boq-01', projectId: 'prj-001', category: 'Material & Hardware', itemDescription: 'Multipleks 18mm Uty (Bahan Dasar Cabinet)', specification: 'Plywood Uty Palm Grade AA 1220x2440x18mm', unit: 'Lembar', volume: 120, unitPriceHPP: 285000, totalHPP: 34200000, markupPercent: 35, quotationPrice: 46170000 },
  { id: 'boq-02', projectId: 'prj-001', category: 'Material & Hardware', itemDescription: 'HPL Taco Woodgrain & Solid Matte Series', specification: 'Taco HPL TH-882J Warm Walnut & TH-001G Warm White', unit: 'Lembar', volume: 85, unitPriceHPP: 215000, totalHPP: 18275000, markupPercent: 35, quotationPrice: 24671250 },
  { id: 'boq-03', projectId: 'prj-001', category: 'Material & Hardware', itemDescription: 'Hardware Blum Soft-Close Hinges & Runners', specification: 'Blum Clip Top Blumotion 110 deg + Tandembox antaro', unit: 'Set', volume: 64, unitPriceHPP: 145000, totalHPP: 9280000, markupPercent: 30, quotationPrice: 12064000 },
  { id: 'boq-04', projectId: 'prj-001', category: 'Material & Hardware', itemDescription: 'Lem Kuning Aica Aibon Special Joinery', specification: 'Kaleng 2.5kg formula anti bau', unit: 'Kaleng', volume: 24, unitPriceHPP: 165000, totalHPP: 3960000, markupPercent: 25, quotationPrice: 4950000 },
  { id: 'boq-01a', projectId: 'prj-001', category: 'Material & Hardware', itemDescription: 'Acoustic Ceiling Baffle Metal Strip System', specification: 'Metal U-Channel baffle 50x100mm powder coat matte black', unit: 'm2', volume: 240, unitPriceHPP: 650000, totalHPP: 156000000, markupPercent: 42, quotationPrice: 221520000 },
  { id: 'boq-01b', projectId: 'prj-001', category: 'Material & Hardware', itemDescription: 'SPC Flooring Premium & Skirting', specification: 'SPC Click 5mm LVT wood texture + aluminium skirting', unit: 'm2', volume: 435, unitPriceHPP: 200000, totalHPP: 87000000, markupPercent: 42, quotationPrice: 123540000 },
  // Tenaga Kerja
  { id: 'boq-05', projectId: 'prj-001', category: 'Tenaga Kerja', itemDescription: 'Upah Tukang Kayu Halus & HPL Workshop', specification: 'Borongan pembuatan custom cabinetry & fitting (5 Tukang x 26 Hari)', unit: 'Hari/Org', volume: 130, unitPriceHPP: 220000, totalHPP: 28600000, markupPercent: 30, quotationPrice: 37180000 },
  { id: 'boq-06', projectId: 'prj-001', category: 'Tenaga Kerja', itemDescription: 'Upah Tukang Finishing Duco & Melamic Polyurethane', specification: 'Finishing semprot PU matte outdoor & interior (3 Tukang x 18 Hari)', unit: 'Hari/Org', volume: 54, unitPriceHPP: 240000, totalHPP: 12960000, markupPercent: 30, quotationPrice: 16848000 },
  { id: 'boq-07', projectId: 'prj-001', category: 'Tenaga Kerja', itemDescription: 'Upah Setting Lapangan & Teknisi Instalasi On-Site', specification: 'Fitting on-site, levelling, MEP connection (4 Orang x 14 Hari)', unit: 'Hari/Org', volume: 56, unitPriceHPP: 200000, totalHPP: 11200000, markupPercent: 30, quotationPrice: 14560000 },
  { id: 'boq-05a', projectId: 'prj-001', category: 'Tenaga Kerja', itemDescription: 'Custom Workstation Assembly 40 Unit', specification: 'Open desk 120x60 + cable management + partition screen', unit: 'Unit', volume: 40, unitPriceHPP: 7125000, totalHPP: 285000000, markupPercent: 45, quotationPrice: 413250000 },
  // Subkontraktor Spesialis
  { id: 'boq-08', projectId: 'prj-001', category: 'Subkontraktor Spesialis', itemDescription: 'Kaca Tempered 10mm & Kusen Alumunium Hitam Anodized', specification: 'Partisi kaca frameless board room + pivot swing glass door', unit: 'm2', volume: 48, unitPriceHPP: 850000, totalHPP: 40800000, markupPercent: 28, quotationPrice: 52224000 },
  { id: 'boq-09', projectId: 'prj-001', category: 'Subkontraktor Spesialis', itemDescription: 'Solid Surface Acrylic Table Top Counter Pantry', specification: 'LG Hausys HI-MACS seamless jointing tebal 12mm', unit: 'm1', volume: 14, unitPriceHPP: 1650000, totalHPP: 23100000, markupPercent: 28, quotationPrice: 29568000 },
  { id: 'boq-08a', projectId: 'prj-001', category: 'Subkontraktor Spesialis', itemDescription: 'Server Room Raised Floor & Precision Cooling', specification: 'Raised floor 600x600 antistatic + mini precision AC 5PK', unit: 'Lot', volume: 1, unitPriceHPP: 98000000, totalHPP: 98000000, markupPercent: 40, quotationPrice: 137200000 },
  { id: 'boq-08b', projectId: 'prj-001', category: 'Subkontraktor Spesialis', itemDescription: 'Smart Meeting Room AV & Conferencing System', specification: 'Polycom Trio + 75" display + wireless share + acoustic panel', unit: 'Room', volume: 3, unitPriceHPP: 24000000, totalHPP: 72000000, markupPercent: 45, quotationPrice: 104400000 },
  // Overhead & Operasional
  { id: 'boq-10', projectId: 'prj-001', category: 'Overhead & Operasional', itemDescription: 'Mobilisasi, Demobilisasi & Sewa Armada Truk Workshop-Site', specification: 'Truk Colt Diesel Double (3x Pengiriman pulang-pergi)', unit: 'Trip', volume: 6, unitPriceHPP: 1200000, totalHPP: 7200000, markupPercent: 20, quotationPrice: 8640000 },
  { id: 'boq-11', projectId: 'prj-001', category: 'Overhead & Operasional', itemDescription: 'Proteksi Lapangan (Plastik Cor, Bubble wrap, Corrugated paper)', specification: 'Proteksi lantai gedung SCBD & lift barang protokol tenant', unit: 'Lot', volume: 1, unitPriceHPP: 4500000, totalHPP: 4500000, markupPercent: 20, quotationPrice: 5400000 },
  { id: 'boq-10a', projectId: 'prj-001', category: 'Overhead & Operasional', itemDescription: 'Fire & Safety Compliance Fit-out', specification: 'Fire sprinkler relocation, smoke detector, APAR, safety netting', unit: 'Lot', volume: 1, unitPriceHPP: 45000000, totalHPP: 45000000, markupPercent: 35, quotationPrice: 60750000 },
  { id: 'boq-10b', projectId: 'prj-001', category: 'Overhead & Operasional', itemDescription: 'Painting & Wall Treatment Interior', specification: 'Nippon Momento special texture + Dulux Pentalite office white', unit: 'm2', volume: 520, unitPriceHPP: 74856, totalHPP: 38925000, markupPercent: 38, quotationPrice: 53716500 },
  { id: 'boq-10c', projectId: 'prj-001', category: 'Overhead & Operasional', itemDescription: 'Deep Cleaning & Post-Construction Protection', specification: 'Professional cleaning team + protective film removal', unit: 'Lot', volume: 1, unitPriceHPP: 39000000, totalHPP: 39000000, markupPercent: 30, quotationPrice: 50700000 },
  // prj-001 totalHPP = 34200000+18275000+9280000+3960000+156000000+87000000+28600000+12960000+11200000+285000000+40800000+23100000+98000000+72000000+7200000+4500000+45000000+38925000+39000000 = 1,015,000,000 ✓

  // ===== PRJ-002: Tanamera Cafe & Roastery Senopati (hppBudget: 574,000,000) =====
  { id: 'boq-20', projectId: 'prj-002', category: 'Subkontraktor Spesialis', itemDescription: 'Sipil & Waterproofing Bar Area', specification: 'Screed lantai, waterproofing Sika, drainage grease trap', unit: 'Lot', volume: 1, unitPriceHPP: 68000000, totalHPP: 68000000, markupPercent: 40, quotationPrice: 95200000 },
  { id: 'boq-21', projectId: 'prj-002', category: 'Subkontraktor Spesialis', itemDescription: 'MEP Barista Plumbing & Daya Listrik 3 Phase', specification: 'Chilled water line, espresso drain, panel 3P 40A', unit: 'Lot', volume: 1, unitPriceHPP: 92000000, totalHPP: 92000000, markupPercent: 42, quotationPrice: 130640000 },
  { id: 'boq-22', projectId: 'prj-002', category: 'Material & Hardware', itemDescription: 'Custom Fluted Oak Bar Counter & Brass Shelving', specification: 'American white oak ribbed + brass tube shelving + LED strip', unit: 'Lot', volume: 1, unitPriceHPP: 135000000, totalHPP: 135000000, markupPercent: 45, quotationPrice: 195750000 },
  { id: 'boq-23', projectId: 'prj-002', category: 'Material & Hardware', itemDescription: 'Marble Carrara Slab & Installation', specification: 'Italian Carrara 20mm polished, bar top & pastry display', unit: 'm2', volume: 12, unitPriceHPP: 6500000, totalHPP: 78000000, markupPercent: 42, quotationPrice: 110760000 },
  { id: 'boq-24', projectId: 'prj-002', category: 'Subkontraktor Spesialis', itemDescription: 'Ambient Lighting & Brass Pendant Fixtures', specification: 'Custom brass pendant 8pcs + LED warm 2700K + dimmer Lutron', unit: 'Lot', volume: 1, unitPriceHPP: 56000000, totalHPP: 56000000, markupPercent: 45, quotationPrice: 81200000 },
  { id: 'boq-25', projectId: 'prj-002', category: 'Material & Hardware', itemDescription: 'SPC Flooring Herringbone & Wall Cladding', specification: 'SPC herringbone 5mm + cement texture wall panel', unit: 'm2', volume: 180, unitPriceHPP: 250000, totalHPP: 45000000, markupPercent: 40, quotationPrice: 63000000 },
  { id: 'boq-26', projectId: 'prj-002', category: 'Subkontraktor Spesialis', itemDescription: 'Kitchen Equipment Space Integration', specification: 'Exhaust hood, grease trap, cold room framing, barista counter plumbing', unit: 'Lot', volume: 1, unitPriceHPP: 42000000, totalHPP: 42000000, markupPercent: 38, quotationPrice: 57960000 },
  { id: 'boq-27', projectId: 'prj-002', category: 'Tenaga Kerja', itemDescription: 'Upah Tukang & Finishing Cafe (Full Project)', specification: 'Tukang kayu, cat, MEP, cleaning (6 orang x 45 hari)', unit: 'Hari/Org', volume: 270, unitPriceHPP: 122222, totalHPP: 33000000, markupPercent: 35, quotationPrice: 44550000 },
  { id: 'boq-28', projectId: 'prj-002', category: 'Overhead & Operasional', itemDescription: 'Project Management, Logistics & Signage', specification: 'Transport, izin bongkar malam, branding signage exterior', unit: 'Lot', volume: 1, unitPriceHPP: 25000000, totalHPP: 25000000, markupPercent: 36, quotationPrice: 34000000 },
  // prj-002 totalHPP = 68000000+92000000+135000000+78000000+56000000+45000000+42000000+33000000+25000000 = 574,000,000 ✓

  // ===== PRJ-003: Penthouse Kemang Village Residence (hppBudget: 1,280,000,000) =====
  { id: 'boq-30', projectId: 'prj-003', category: 'Subkontraktor Spesialis', itemDescription: 'Demolition & Structural Prep Penthouse', specification: 'Bongkar plafon gypsum lama, core drill AC, proteksi lobby', unit: 'Lot', volume: 1, unitPriceHPP: 95000000, totalHPP: 95000000, markupPercent: 42, quotationPrice: 134900000 },
  { id: 'boq-31', projectId: 'prj-003', category: 'Subkontraktor Spesialis', itemDescription: 'AC Chiller Relocation & HVAC Ducting', specification: 'Relokasi outdoor unit + ducting insulated + thermostat zone', unit: 'Lot', volume: 1, unitPriceHPP: 120000000, totalHPP: 120000000, markupPercent: 45, quotationPrice: 174000000 },
  { id: 'boq-32', projectId: 'prj-003', category: 'Material & Hardware', itemDescription: 'Walnut Veneer & Solid Wood Fabrication', specification: 'American walnut veneer 0.6mm + solid walnut planks kiln dried', unit: 'Lot', volume: 1, unitPriceHPP: 285000000, totalHPP: 285000000, markupPercent: 48, quotationPrice: 421800000 },
  { id: 'boq-33', projectId: 'prj-003', category: 'Material & Hardware', itemDescription: 'Walk-in Closet Blum Servo-Drive System', specification: 'Blum AVENTOS HK-S + LEGRABOX + LED sensor + mirror panel', unit: 'Set', volume: 1, unitPriceHPP: 165000000, totalHPP: 165000000, markupPercent: 48, quotationPrice: 244200000 },
  { id: 'boq-34', projectId: 'prj-003', category: 'Material & Hardware', itemDescription: 'Master Bedroom Fluted Panel & Hidden Door', specification: 'Fluted walnut panel 30mm spacing + concealed pivot door', unit: 'm2', volume: 58, unitPriceHPP: 2500000, totalHPP: 145000000, markupPercent: 45, quotationPrice: 210250000 },
  { id: 'boq-35', projectId: 'prj-003', category: 'Subkontraktor Spesialis', itemDescription: 'Gourmet Kitchen Island Quartz Slab', specification: 'Caesarstone 5131 Calacatta Nuvo 30mm + waterfall edge', unit: 'Lot', volume: 1, unitPriceHPP: 128000000, totalHPP: 128000000, markupPercent: 48, quotationPrice: 189440000 },
  { id: 'boq-36', projectId: 'prj-003', category: 'Subkontraktor Spesialis', itemDescription: 'KNX Smart Lighting & Home Automation', specification: 'ABB i-bus KNX + DALI dimming + scene controller iPad', unit: 'Lot', volume: 1, unitPriceHPP: 92000000, totalHPP: 92000000, markupPercent: 50, quotationPrice: 138000000 },
  { id: 'boq-37', projectId: 'prj-003', category: 'Material & Hardware', itemDescription: 'Bathroom Marble & Premium Sanitary', specification: 'Volakas marble wall + Grohe Atrio fixtures + freestanding tub', unit: 'Lot', volume: 1, unitPriceHPP: 110000000, totalHPP: 110000000, markupPercent: 48, quotationPrice: 162800000 },
  { id: 'boq-38', projectId: 'prj-003', category: 'Tenaga Kerja', itemDescription: 'Painting, Wallpaper & Art Installation', specification: 'Nippon Momento texture + imported wallpaper + art hanging', unit: 'Lot', volume: 1, unitPriceHPP: 65000000, totalHPP: 65000000, markupPercent: 42, quotationPrice: 92300000 },
  { id: 'boq-39', projectId: 'prj-003', category: 'Overhead & Operasional', itemDescription: 'Project Management & Penthouse Logistics', specification: 'Cargo lift booking, proteksi lobby VIP, PM fee', unit: 'Lot', volume: 1, unitPriceHPP: 75000000, totalHPP: 75000000, markupPercent: 42, quotationPrice: 106500000 },
  // prj-003 totalHPP = 95000000+120000000+285000000+165000000+145000000+128000000+92000000+110000000+65000000+75000000 = 1,280,000,000 ✓

  // ===== PRJ-004: Boutique Flagship Store PIK Avenue (hppBudget: 504,000,000) =====
  { id: 'boq-40', projectId: 'prj-004', category: 'Overhead & Operasional', itemDescription: 'Mall Fit-out Permit & Site Preparation', specification: 'Izin kerja mall, proteksi koridor, boarding hoarding', unit: 'Lot', volume: 1, unitPriceHPP: 28000000, totalHPP: 28000000, markupPercent: 35, quotationPrice: 37800000 },
  { id: 'boq-41', projectId: 'prj-004', category: 'Material & Hardware', itemDescription: 'Stainless Hairline Facade & Glass Shopfront', specification: 'SS 304 hairline 1.2mm + tempered glass 12mm shopfront', unit: 'm2', volume: 38, unitPriceHPP: 2500000, totalHPP: 95000000, markupPercent: 42, quotationPrice: 134900000 },
  { id: 'boq-42', projectId: 'prj-004', category: 'Subkontraktor Spesialis', itemDescription: 'Display Island Microcement Finish', specification: 'Microcement base coat + top coat + sealer, display platform', unit: 'm2', volume: 45, unitPriceHPP: 1600000, totalHPP: 72000000, markupPercent: 42, quotationPrice: 102240000 },
  { id: 'boq-43', projectId: 'prj-004', category: 'Subkontraktor Spesialis', itemDescription: 'CRI 95+ Track Lighting System', specification: 'Erco Parscan LED track spot CRI95 + Xicato artist series', unit: 'Set', volume: 29, unitPriceHPP: 2000000, totalHPP: 58000000, markupPercent: 42, quotationPrice: 82360000 },
  { id: 'boq-44', projectId: 'prj-004', category: 'Material & Hardware', itemDescription: 'Fitting Room Acoustic Velvet Panels', specification: 'Velvet acoustic panel 50mm + full-length mirror + curtain rail', unit: 'Room', volume: 3, unitPriceHPP: 15000000, totalHPP: 45000000, markupPercent: 42, quotationPrice: 63900000 },
  { id: 'boq-45', projectId: 'prj-004', category: 'Material & Hardware', itemDescription: 'Premium SPC Flooring & Skirting', specification: 'SPC marble look 5mm click + stainless skirting', unit: 'm2', volume: 120, unitPriceHPP: 316667, totalHPP: 38000000, markupPercent: 40, quotationPrice: 53200000 },
  { id: 'boq-46', projectId: 'prj-004', category: 'Material & Hardware', itemDescription: 'Custom Shelving & Cashier Counter', specification: 'MDF lacquer + brass detail shelving + cashier stone top', unit: 'Lot', volume: 1, unitPriceHPP: 82000000, totalHPP: 82000000, markupPercent: 42, quotationPrice: 116440000 },
  { id: 'boq-47', projectId: 'prj-004', category: 'Subkontraktor Spesialis', itemDescription: 'MEP & Fire Compliance Retail', specification: 'Sprinkler, smoke detector, exhaust fan, panel distribusi', unit: 'Lot', volume: 1, unitPriceHPP: 42000000, totalHPP: 42000000, markupPercent: 38, quotationPrice: 57960000 },
  { id: 'boq-48', projectId: 'prj-004', category: 'Overhead & Operasional', itemDescription: 'Signage, Branding & Final Touches', specification: 'Backlit signage, vinyl branding, mannequin platform', unit: 'Lot', volume: 1, unitPriceHPP: 28000000, totalHPP: 28000000, markupPercent: 35, quotationPrice: 37800000 },
  { id: 'boq-49', projectId: 'prj-004', category: 'Overhead & Operasional', itemDescription: 'Night Work Premium & Project Management', specification: 'Mall night shift surcharge, PM coordination fee', unit: 'Lot', volume: 1, unitPriceHPP: 16000000, totalHPP: 16000000, markupPercent: 35, quotationPrice: 21600000 },
  // prj-004 totalHPP = 28000000+95000000+72000000+58000000+45000000+38000000+82000000+42000000+28000000+16000000 = 504,000,000 ✓
];

// =============================================
// Expenses — sum per project = project.actualCost
// =============================================

export const initialExpenses: CostExpense[] = [
  // ===== PRJ-001: actualCost = 938,500,000 =====
  // Historical batched entries
  { id: 'exp-h01', projectId: 'prj-001', projectName: 'Fit-out Kantor FinTech Nexus SCBD', date: '2026-08-10', category: 'Material', description: 'Multipleks, Kayu & Material Dasar Batch Awal (Workshop)', vendorOrRecipient: 'CV Sumber Kayu Mandiri', budgetAllocated: 290000000, actualAmount: 285000000, variance: 5000000, status: 'Approved', receiptNo: 'INV/SKM/2026/0810', paymentMethod: 'Transfer Bank' },
  { id: 'exp-h02', projectId: 'prj-001', projectName: 'Fit-out Kantor FinTech Nexus SCBD', date: '2026-08-20', category: 'Material', description: 'HPL Taco, Finishing Material & Lem (Batch 1-3)', vendorOrRecipient: 'CV Sumber Kayu Mandiri', budgetAllocated: 128000000, actualAmount: 125000000, variance: 3000000, status: 'Approved', receiptNo: 'INV/SKM/2026/0820', paymentMethod: 'Transfer Bank' },
  { id: 'exp-h03', projectId: 'prj-001', projectName: 'Fit-out Kantor FinTech Nexus SCBD', date: '2026-08-25', category: 'Material', description: 'Hardware Blum, Fitting & Aksesoris Cabinet', vendorOrRecipient: 'Mitra Hardware & Blum', budgetAllocated: 44000000, actualAmount: 42000000, variance: 2000000, status: 'Approved', receiptNo: 'INV/MHB/2026/0825', paymentMethod: 'Transfer Bank' },
  { id: 'exp-h04', projectId: 'prj-001', projectName: 'Fit-out Kantor FinTech Nexus SCBD', date: '2026-08-15', category: 'Upah Tukang', description: 'Upah Tukang Workshop Minggu 1-8 (Fabrikasi Cabinet)', vendorOrRecipient: 'Mandor Suparno', budgetAllocated: 172000000, actualAmount: 168000000, variance: 4000000, status: 'Approved', receiptNo: 'KWT/TKG-WS/W1-8', paymentMethod: 'Transfer Bank' },
  { id: 'exp-h05', projectId: 'prj-001', projectName: 'Fit-out Kantor FinTech Nexus SCBD', date: '2026-09-01', category: 'Upah Tukang', description: 'Upah Tukang Site Setting Minggu 1-6 (Instalasi)', vendorOrRecipient: 'Mandor Suparno', budgetAllocated: 100000000, actualAmount: 98000000, variance: 2000000, status: 'Approved', receiptNo: 'KWT/TKG-SITE/W1-6', paymentMethod: 'Transfer Bank' },
  { id: 'exp-h06', projectId: 'prj-001', projectName: 'Fit-out Kantor FinTech Nexus SCBD', date: '2026-09-10', category: 'Subkontraktor', description: 'Subkon Kaca Tempered & Kusen Aluminium (Batch 1)', vendorOrRecipient: 'PT Asahi Kaca Megah', budgetAllocated: 88000000, actualAmount: 85000000, variance: 3000000, status: 'Approved', receiptNo: 'INV/AKM/2026/0910', paymentMethod: 'Transfer Bank' },
  { id: 'exp-h07', projectId: 'prj-001', projectName: 'Fit-out Kantor FinTech Nexus SCBD', date: '2026-09-08', category: 'Subkontraktor', description: 'MEP Data Cabling & Server Room Prep', vendorOrRecipient: 'PT Mega Elektro Perkasa', budgetAllocated: 55000000, actualAmount: 52000000, variance: 3000000, status: 'Approved', receiptNo: 'INV/MEP/2026/088', paymentMethod: 'Transfer Bank' },
  { id: 'exp-h08', projectId: 'prj-001', projectName: 'Fit-out Kantor FinTech Nexus SCBD', date: '2026-09-05', category: 'Overhead', description: 'Transport, Logistik & Izin Gedung SCBD', vendorOrRecipient: 'Sora Project Internal', budgetAllocated: 30000000, actualAmount: 28450000, variance: 1550000, status: 'Approved', receiptNo: 'KWT/OVH-SCBD/01', paymentMethod: 'Kas Lapangan (Petty Cash)' },
  { id: 'exp-h09', projectId: 'prj-001', projectName: 'Fit-out Kantor FinTech Nexus SCBD', date: '2026-09-15', category: 'Material', description: 'SPC Flooring & Ceiling Material Pengiriman', vendorOrRecipient: 'PT Indo Flooring Jaya', budgetAllocated: 20000000, actualAmount: 19000000, variance: 1000000, status: 'Approved', receiptNo: 'INV/IFJ/2026/0915', paymentMethod: 'Transfer Bank' },
  // Recent detailed entries
  { id: 'exp-01', projectId: 'prj-001', projectName: 'Fit-out Kantor FinTech Nexus SCBD', date: '2026-09-24', category: 'Material', description: 'Pembelian HPL Taco Walnut Tambahan (15 Lbr)', vendorOrRecipient: 'CV Sumber Kayu Mandiri', budgetAllocated: 3225000, actualAmount: 3450000, variance: -225000, status: 'Flagged Overbudget', receiptNo: 'INV/SKM/2026/0924', paymentMethod: 'Transfer Bank' },
  { id: 'exp-02', projectId: 'prj-001', projectName: 'Fit-out Kantor FinTech Nexus SCBD', date: '2026-09-22', category: 'Upah Tukang', description: 'Upah Mingguan 8 Tukang Setting Site (Minggu ke-7)', vendorOrRecipient: 'Mandor Suparno', budgetAllocated: 12500000, actualAmount: 12200000, variance: 300000, status: 'Approved', receiptNo: 'KWT/TKG-SCBD/W7', paymentMethod: 'Transfer Bank' },
  { id: 'exp-03', projectId: 'prj-001', projectName: 'Fit-out Kantor FinTech Nexus SCBD', date: '2026-09-20', category: 'Subkontraktor', description: 'DP 50% Partisi Kaca Tempered Curved 10mm', vendorOrRecipient: 'PT Asahi Kaca Megah', budgetAllocated: 20400000, actualAmount: 20400000, variance: 0, status: 'Approved', receiptNo: 'INV/AKM/2026/088', paymentMethod: 'Transfer Bank' },
  // prj-001 total = 285000000+125000000+42000000+168000000+98000000+85000000+52000000+28450000+19000000+3450000+12200000+20400000 = 938,500,000 ✓

  // ===== PRJ-002: actualCost = 568,400,000 =====
  { id: 'exp-h10', projectId: 'prj-002', projectName: 'Tanamera Cafe & Roastery Senopati', date: '2026-07-20', category: 'Material', description: 'Sipil & Waterproofing Material Bar Area', vendorOrRecipient: 'PT Sika Indonesia', budgetAllocated: 65000000, actualAmount: 62000000, variance: 3000000, status: 'Approved', receiptNo: 'INV/SIKA/2026/072', paymentMethod: 'Transfer Bank' },
  { id: 'exp-h11', projectId: 'prj-002', projectName: 'Tanamera Cafe & Roastery Senopati', date: '2026-08-01', category: 'Subkontraktor', description: 'MEP Barista Plumbing & Instalasi Listrik 3 Phase', vendorOrRecipient: 'PT Mega Elektro Perkasa', budgetAllocated: 90000000, actualAmount: 88000000, variance: 2000000, status: 'Approved', receiptNo: 'INV/MEP/2026/0801', paymentMethod: 'Transfer Bank' },
  { id: 'exp-h12', projectId: 'prj-002', projectName: 'Tanamera Cafe & Roastery Senopati', date: '2026-08-15', category: 'Material', description: 'Oak & Brass Material Fabrikasi Bar Counter Workshop', vendorOrRecipient: 'CV Sumber Kayu Mandiri', budgetAllocated: 132000000, actualAmount: 128000000, variance: 4000000, status: 'Approved', receiptNo: 'INV/SKM/2026/0815', paymentMethod: 'Transfer Bank' },
  { id: 'exp-h13', projectId: 'prj-002', projectName: 'Tanamera Cafe & Roastery Senopati', date: '2026-09-08', category: 'Material', description: 'Marble Carrara Slab Instalasi Awal', vendorOrRecipient: 'PT Granit Indah Perkasa', budgetAllocated: 54000000, actualAmount: 51000000, variance: 3000000, status: 'Approved', receiptNo: 'INV/GIP/2026/0908', paymentMethod: 'Transfer Bank' },
  { id: 'exp-h14', projectId: 'prj-002', projectName: 'Tanamera Cafe & Roastery Senopati', date: '2026-08-25', category: 'Upah Tukang', description: 'Upah Tukang Full Project (6 Orang x 45 Hari)', vendorOrRecipient: 'Mandor Wahyudi', budgetAllocated: 115000000, actualAmount: 112000000, variance: 3000000, status: 'Approved', receiptNo: 'KWT/TKG-SNP/FULL', paymentMethod: 'Transfer Bank' },
  { id: 'exp-h15', projectId: 'prj-002', projectName: 'Tanamera Cafe & Roastery Senopati', date: '2026-09-12', category: 'Subkontraktor', description: 'Ambient Lighting & Brass Pendant Installation', vendorOrRecipient: 'PT Lumina Lighting', budgetAllocated: 50000000, actualAmount: 48400000, variance: 1600000, status: 'Approved', receiptNo: 'INV/LUM/2026/0912', paymentMethod: 'Transfer Bank' },
  { id: 'exp-h16', projectId: 'prj-002', projectName: 'Tanamera Cafe & Roastery Senopati', date: '2026-09-10', category: 'Material', description: 'SPC Flooring Herringbone & Wall Cladding', vendorOrRecipient: 'PT Indo Flooring Jaya', budgetAllocated: 34000000, actualAmount: 32000000, variance: 2000000, status: 'Approved', receiptNo: 'INV/IFJ/2026/0910', paymentMethod: 'Transfer Bank' },
  { id: 'exp-h17', projectId: 'prj-002', projectName: 'Tanamera Cafe & Roastery Senopati', date: '2026-09-14', category: 'Overhead', description: 'Transport, Izin Bongkar Malam & Logistics', vendorOrRecipient: 'Sora Project Internal', budgetAllocated: 20000000, actualAmount: 18000000, variance: 2000000, status: 'Approved', receiptNo: 'KWT/OVH-SNP/01', paymentMethod: 'Kas Lapangan (Petty Cash)' },
  // Recent entries
  { id: 'exp-04', projectId: 'prj-002', projectName: 'Tanamera Cafe & Roastery Senopati', date: '2026-09-18', category: 'Material', description: 'Marmer Carrara Slab Khusus Bar Counter (Import)', vendorOrRecipient: 'PT Granit Indah Perkasa', budgetAllocated: 24000000, actualAmount: 26800000, variance: -2800000, status: 'Flagged Overbudget', receiptNo: 'INV/GIP/MRM-112', paymentMethod: 'Transfer Bank' },
  { id: 'exp-05', projectId: 'prj-002', projectName: 'Tanamera Cafe & Roastery Senopati', date: '2026-09-15', category: 'Overhead', description: 'Sewa Izin Bongkar Malam & Uang Kebersihan DLH', vendorOrRecipient: 'Pengelola Lingkungan Senopati', budgetAllocated: 2500000, actualAmount: 2200000, variance: 300000, status: 'Approved', receiptNo: 'KWT/IZIN-092', paymentMethod: 'Kas Lapangan (Petty Cash)' },
  // prj-002 total = 62000000+88000000+128000000+51000000+112000000+48400000+32000000+18000000+26800000+2200000 = 568,400,000 ✓

  // ===== PRJ-003: actualCost = 595,000,000 =====
  { id: 'exp-h18', projectId: 'prj-003', projectName: 'Penthouse Kemang Village Residence', date: '2026-08-28', category: 'Subkontraktor', description: 'Demolisi & Structural Prep Penthouse Lt. 36', vendorOrRecipient: 'PT Karya Struktur Indo', budgetAllocated: 88000000, actualAmount: 85000000, variance: 3000000, status: 'Approved', receiptNo: 'INV/KSI/2026/0828', paymentMethod: 'Transfer Bank' },
  { id: 'exp-h19', projectId: 'prj-003', projectName: 'Penthouse Kemang Village Residence', date: '2026-09-02', category: 'Subkontraktor', description: 'AC Chiller Relocation & HVAC Ducting', vendorOrRecipient: 'PT Daikin Service Indo', budgetAllocated: 72000000, actualAmount: 68000000, variance: 4000000, status: 'Approved', receiptNo: 'INV/DSI/2026/0902', paymentMethod: 'Transfer Bank' },
  { id: 'exp-h20', projectId: 'prj-003', projectName: 'Penthouse Kemang Village Residence', date: '2026-09-08', category: 'Material', description: 'Walnut Veneer & Solid Wood Lot 2 (Workshop)', vendorOrRecipient: 'CV Sumber Kayu Mandiri', budgetAllocated: 190000000, actualAmount: 185000000, variance: 5000000, status: 'Approved', receiptNo: 'INV/SKM/VN-042', paymentMethod: 'Transfer Bank' },
  { id: 'exp-h21', projectId: 'prj-003', projectName: 'Penthouse Kemang Village Residence', date: '2026-09-05', category: 'Upah Tukang', description: 'Upah Tukang Workshop Walnut Fabrication', vendorOrRecipient: 'Mandor Sutrisno', budgetAllocated: 98000000, actualAmount: 95000000, variance: 3000000, status: 'Approved', receiptNo: 'KWT/TKG-KMG/W1-4', paymentMethod: 'Transfer Bank' },
  { id: 'exp-h22', projectId: 'prj-003', projectName: 'Penthouse Kemang Village Residence', date: '2026-09-10', category: 'Material', description: 'Hardware Blum AVENTOS & KNX Controller Deposit', vendorOrRecipient: 'Mitra Hardware & Blum', budgetAllocated: 55000000, actualAmount: 52000000, variance: 3000000, status: 'Approved', receiptNo: 'INV/MHB/2026/0910', paymentMethod: 'Transfer Bank' },
  { id: 'exp-h23', projectId: 'prj-003', projectName: 'Penthouse Kemang Village Residence', date: '2026-09-06', category: 'Overhead', description: 'Transport Cargo Lift & Proteksi Lobby VIP', vendorOrRecipient: 'Sora Project Internal', budgetAllocated: 20000000, actualAmount: 18500000, variance: 1500000, status: 'Approved', receiptNo: 'KWT/OVH-KMG/01', paymentMethod: 'Kas Lapangan (Petty Cash)' },
  { id: 'exp-h24', projectId: 'prj-003', projectName: 'Penthouse Kemang Village Residence', date: '2026-09-11', category: 'Material', description: 'Quartz Slab Caesarstone Deposit Kitchen Island', vendorOrRecipient: 'PT Granit Indah Perkasa', budgetAllocated: 50000000, actualAmount: 48000000, variance: 2000000, status: 'Approved', receiptNo: 'INV/GIP/QTZ-025', paymentMethod: 'Transfer Bank' },
  // Recent entry
  { id: 'exp-06', projectId: 'prj-003', projectName: 'Penthouse Kemang Village Residence', date: '2026-09-12', category: 'Material', description: 'Bahan Multipleks 18mm & Veneer Walnut Lot 1', vendorOrRecipient: 'CV Sumber Kayu Mandiri', budgetAllocated: 45000000, actualAmount: 43500000, variance: 1500000, status: 'Approved', receiptNo: 'INV/SKM/VN-041', paymentMethod: 'Transfer Bank' },
  // prj-003 total = 85000000+68000000+185000000+95000000+52000000+18500000+48000000+43500000 = 595,000,000 ✓

  // ===== PRJ-004: actualCost = 112,000,000 =====
  { id: 'exp-h25', projectId: 'prj-004', projectName: 'Boutique Flagship Store PIK Avenue', date: '2026-09-12', category: 'Overhead', description: 'Mall Fit-out Permit, Hoarding & Admin Fee', vendorOrRecipient: 'PT PIK Avenue Management', budgetAllocated: 24000000, actualAmount: 22000000, variance: 2000000, status: 'Approved', receiptNo: 'INV/PIK/PERMIT-01', paymentMethod: 'Transfer Bank' },
  { id: 'exp-h26', projectId: 'prj-004', projectName: 'Boutique Flagship Store PIK Avenue', date: '2026-09-18', category: 'Material', description: 'Stainless Hairline Material Deposit 50%', vendorOrRecipient: 'PT Surya Stainless Jaya', budgetAllocated: 50000000, actualAmount: 48000000, variance: 2000000, status: 'Approved', receiptNo: 'INV/SSJ/2026/0918', paymentMethod: 'Transfer Bank' },
  { id: 'exp-h27', projectId: 'prj-004', projectName: 'Boutique Flagship Store PIK Avenue', date: '2026-09-15', category: 'Overhead', description: 'Design Prototyping & Material Sampling', vendorOrRecipient: 'Sora Project Internal', budgetAllocated: 20000000, actualAmount: 18000000, variance: 2000000, status: 'Approved', receiptNo: 'KWT/OVH-PIK/01', paymentMethod: 'Kas Lapangan (Petty Cash)' },
  { id: 'exp-h28', projectId: 'prj-004', projectName: 'Boutique Flagship Store PIK Avenue', date: '2026-09-20', category: 'Upah Tukang', description: 'Upah Tim Survey, Ukur & Persiapan Site', vendorOrRecipient: 'Mandor Agus', budgetAllocated: 14000000, actualAmount: 12000000, variance: 2000000, status: 'Approved', receiptNo: 'KWT/TKG-PIK/PREP', paymentMethod: 'Transfer Bank' },
  { id: 'exp-h29', projectId: 'prj-004', projectName: 'Boutique Flagship Store PIK Avenue', date: '2026-09-22', category: 'Material', description: 'Lighting Track Sample & Mockup CRI95', vendorOrRecipient: 'PT Lumina Lighting', budgetAllocated: 14000000, actualAmount: 12000000, variance: 2000000, status: 'Approved', receiptNo: 'INV/LUM/2026/0922', paymentMethod: 'Transfer Bank' },
  // prj-004 total = 22000000+48000000+18000000+12000000+12000000 = 112,000,000 ✓
];

export const initialWorkers: Worker[] = [
  { id: 'wk-01', name: 'Suparno (Mandor)', specialty: 'Mandor Kayu', dailyRate: 260000, status: 'Aktif di Site', currentProject: 'Fit-out Kantor FinTech Nexus SCBD', phone: '0812-4411-9988', rating: 4.9 },
  { id: 'wk-02', name: 'Wahyudi', specialty: 'Tukang HPL', dailyRate: 220000, status: 'Aktif di Site', currentProject: 'Fit-out Kantor FinTech Nexus SCBD', phone: '0813-2211-5501', rating: 4.8 },
  { id: 'wk-03', name: 'Sutrisno', specialty: 'Tukang Duco / Finishing', dailyRate: 240000, status: 'Workshop Cibubur', currentProject: 'Penthouse Kemang Village Residence', phone: '0857-1199-3322', rating: 4.9 },
  { id: 'wk-04', name: 'Rahmat Hidayat', specialty: 'Teknisi MEP & Listrik', dailyRate: 230000, status: 'Aktif di Site', currentProject: 'Tanamera Cafe & Roastery Senopati', phone: '0819-0909-1122', rating: 4.7 },
  { id: 'wk-05', name: 'Agus Triono', specialty: 'Tukang Plafon & Partisi', dailyRate: 210000, status: 'Standby', currentProject: 'Standby Workshop', phone: '0812-9988-1234', rating: 4.6 },
  { id: 'wk-06', name: 'Doni Saputra', specialty: 'Helper Lapangan', dailyRate: 160000, status: 'Aktif di Site', currentProject: 'Fit-out Kantor FinTech Nexus SCBD', phone: '0856-7788-9900', rating: 4.5 },
];

export const initialVendors: Vendor[] = [
  { id: 'vd-01', name: 'CV Sumber Kayu Mandiri', category: 'HPL & Wood Sheet', contactPerson: 'Ko Ahok (Owner)', phone: '0811-1029-338', city: 'Jakarta Timur (Cipinang)', activeOrders: 3, rating: 4.9, paymentTerm: 'Tempo 30 Hari' },
  { id: 'vd-02', name: 'PT Asahi Kaca Megah', category: 'Kaca & Alumunium', contactPerson: 'Bpk. Surya Dinata', phone: '0812-9900-2211', city: 'Jakarta Barat (Daan Mogot)', activeOrders: 1, rating: 4.8, paymentTerm: 'Tempo 14 Hari' },
  { id: 'vd-03', name: 'PT Granit Indah Perkasa', category: 'Solid Surface & Marmer', contactPerson: 'Ibu Veronica', phone: '0813-8822-4411', city: 'Tangerang', activeOrders: 2, rating: 4.6, paymentTerm: 'COD' },
  { id: 'vd-04', name: 'Mitra Hardware Hardware & Blum', category: 'Hardware & Fitting', contactPerson: 'Yanto', phone: '0812-7711-4433', city: 'Glodok Jakarta Barat', activeOrders: 1, rating: 4.9, paymentTerm: 'Tempo 30 Hari' },
];

export const initialPurchaseOrders: PurchaseOrder[] = [
  { id: 'po-01', poNumber: 'PO-SRA-2026/09-001', projectId: 'prj-001', projectName: 'Fit-out Kantor FinTech Nexus SCBD', vendorName: 'CV Sumber Kayu Mandiri', itemsSummary: 'Multipleks 18mm Uty (50 Lbr), Lem Aica (10 Kaleng)', totalAmount: 15900000, requestDate: '2026-09-20', deliveryDate: '2026-09-22', status: 'Diterima Lapangan', picRequest: 'Rian Pratama' },
  { id: 'po-02', poNumber: 'PO-SRA-2026/09-002', projectId: 'prj-001', projectName: 'Fit-out Kantor FinTech Nexus SCBD', vendorName: 'PT Asahi Kaca Megah', itemsSummary: 'Kaca Tempered 10mm Frameless (48 m2) & Pivot Door Hinge', totalAmount: 40800000, requestDate: '2026-09-23', deliveryDate: '2026-09-30', status: 'Sedang Dikirim', picRequest: 'Budi Santoso' },
  { id: 'po-03', poNumber: 'PO-SRA-2026/09-003', projectId: 'prj-003', projectName: 'Penthouse Kemang Village Residence', vendorName: 'Mitra Hardware Hardware & Blum', itemsSummary: 'Blum Clip Top Blumotion 110 deg (64 set) + Push Open TIP-ON', totalAmount: 9280000, requestDate: '2026-09-25', deliveryDate: '2026-10-02', status: 'Disetujui', picRequest: 'Agus Salim' },
  { id: 'po-04', poNumber: 'PO-SRA-2026/09-004', projectId: 'prj-002', projectName: 'Tanamera Cafe & Roastery Senopati', vendorName: 'PT Granit Indah Perkasa', itemsSummary: 'Tambahan slab Marmer Carrara 20mm Polish Bevel', totalAmount: 7500000, requestDate: '2026-09-27', deliveryDate: '2026-10-01', status: 'Pending Approval', picRequest: 'Hendra Gunawan' },
];

// =============================================
// Termins — sum per project = project.contractValue
// =============================================

export const initialTermins: PaymentTermin[] = [
  // ===== PRJ-001: contractValue = 1,450,000,000 =====
  { id: 'tmn-01', projectId: 'prj-001', projectName: 'Fit-out Kantor FinTech Nexus SCBD', clientName: 'PT Nexus Finansial Digital', terminName: 'DP 30%', percentage: 30, amount: 435000000, triggerCondition: 'Penandatanganan Kontrak & SPK', dueDate: '2026-08-05', paidDate: '2026-08-04', status: 'Lunas', invoiceNumber: 'INV/SRA/2026/08-001' },
  { id: 'tmn-02', projectId: 'prj-001', projectName: 'Fit-out Kantor FinTech Nexus SCBD', clientName: 'PT Nexus Finansial Digital', terminName: 'Termin 1 (30%)', percentage: 30, amount: 435000000, triggerCondition: 'Progress Fisik Lapangan 40% (MEP & Rangka Siap)', dueDate: '2026-09-05', paidDate: '2026-09-03', status: 'Lunas', invoiceNumber: 'INV/SRA/2026/09-004' },
  { id: 'tmn-03', projectId: 'prj-001', projectName: 'Fit-out Kantor FinTech Nexus SCBD', clientName: 'PT Nexus Finansial Digital', terminName: 'Termin 2 (30%)', percentage: 30, amount: 435000000, triggerCondition: 'Progress Fisik 75% (Cabinet Masuk & Pemasangan Kaca)', dueDate: '2026-10-01', status: 'Menunggu Pembayaran', invoiceNumber: 'INV/SRA/2026/09-012' },
  { id: 'tmn-04', projectId: 'prj-001', projectName: 'Fit-out Kantor FinTech Nexus SCBD', clientName: 'PT Nexus Finansial Digital', terminName: 'Retensi 10%', percentage: 10, amount: 145000000, triggerCondition: 'Serah Terima Pertama (BAST 1) + Garansi Pemeliharaan 60 Hari', dueDate: '2026-12-15', status: 'Draft / Belum Ditagihkan', invoiceNumber: 'DRAFT-RETENSI-SCBD' },
  // prj-001 total = 435M + 435M + 435M + 145M = 1,450,000,000 ✓

  // ===== PRJ-002: contractValue = 820,000,000 =====
  { id: 'tmn-07', projectId: 'prj-002', projectName: 'Tanamera Cafe & Roastery Senopati', clientName: 'Tanamera Hospitality Group', terminName: 'DP 30%', percentage: 30, amount: 246000000, triggerCondition: 'Penandatanganan SPK & Mobilisasi', dueDate: '2026-07-20', paidDate: '2026-07-19', status: 'Lunas', invoiceNumber: 'INV/SRA/2026/07-001' },
  { id: 'tmn-08', projectId: 'prj-002', projectName: 'Tanamera Cafe & Roastery Senopati', clientName: 'Tanamera Hospitality Group', terminName: 'Termin 1 (30%)', percentage: 30, amount: 246000000, triggerCondition: 'Progress Fisik 50% (MEP & Bar Counter Workshop)', dueDate: '2026-08-25', paidDate: '2026-08-24', status: 'Lunas', invoiceNumber: 'INV/SRA/2026/08-008' },
  { id: 'tmn-05', projectId: 'prj-002', projectName: 'Tanamera Cafe & Roastery Senopati', clientName: 'Tanamera Hospitality Group', terminName: 'Termin 2 (30%)', percentage: 30, amount: 246000000, triggerCondition: 'Progress Fisik 80% (Bar Counter & Flooring Selesai)', dueDate: '2026-09-20', status: 'Jatuh Tempo', invoiceNumber: 'INV/SRA/2026/09-008' },
  { id: 'tmn-09', projectId: 'prj-002', projectName: 'Tanamera Cafe & Roastery Senopati', clientName: 'Tanamera Hospitality Group', terminName: 'Retensi 10%', percentage: 10, amount: 82000000, triggerCondition: 'BAST + Masa Pemeliharaan 30 Hari', dueDate: '2026-11-02', status: 'Draft / Belum Ditagihkan', invoiceNumber: 'DRAFT-RETENSI-SNP' },
  // prj-002 total = 246M + 246M + 246M + 82M = 820,000,000 ✓

  // ===== PRJ-003: contractValue = 1,880,000,000 =====
  { id: 'tmn-06', projectId: 'prj-003', projectName: 'Penthouse Kemang Village Residence', clientName: 'Private Residence (Mr. Ronald)', terminName: 'DP 40%', percentage: 40, amount: 752000000, triggerCondition: 'Penandatanganan SPK & Pengadaan Bahan Kayu', dueDate: '2026-08-20', paidDate: '2026-08-19', status: 'Lunas', invoiceNumber: 'INV/SRA/2026/08-015' },
  { id: 'tmn-10', projectId: 'prj-003', projectName: 'Penthouse Kemang Village Residence', clientName: 'Private Residence (Mr. Ronald)', terminName: 'Termin 1 (30%)', percentage: 30, amount: 564000000, triggerCondition: 'Progress Fisik 50% (Fabrikasi Walnut & Panel Selesai)', dueDate: '2026-10-25', status: 'Menunggu Pembayaran', invoiceNumber: 'INV/SRA/2026/10-003' },
  { id: 'tmn-11', projectId: 'prj-003', projectName: 'Penthouse Kemang Village Residence', clientName: 'Private Residence (Mr. Ronald)', terminName: 'Termin 2 (20%)', percentage: 20, amount: 376000000, triggerCondition: 'Progress Fisik 80% (Instalasi Panel & Hidden Door)', dueDate: '2026-11-15', status: 'Draft / Belum Ditagihkan', invoiceNumber: 'DRAFT-T2-KMG' },
  { id: 'tmn-12', projectId: 'prj-003', projectName: 'Penthouse Kemang Village Residence', clientName: 'Private Residence (Mr. Ronald)', terminName: 'Retensi 10%', percentage: 10, amount: 188000000, triggerCondition: 'BAST + Garansi Pemeliharaan 90 Hari', dueDate: '2026-02-28', status: 'Draft / Belum Ditagihkan', invoiceNumber: 'DRAFT-RETENSI-KMG' },
  // prj-003 total = 752M + 564M + 376M + 188M = 1,880,000,000 ✓

  // ===== PRJ-004: contractValue = 720,000,000 =====
  { id: 'tmn-13', projectId: 'prj-004', projectName: 'Boutique Flagship Store PIK Avenue', clientName: 'PT Mega Citra Propertindo', terminName: 'DP 40%', percentage: 40, amount: 288000000, triggerCondition: 'Penandatanganan SPK & Izin Kerja Mall', dueDate: '2026-09-15', paidDate: '2026-09-14', status: 'Lunas', invoiceNumber: 'INV/SRA/2026/09-020' },
  { id: 'tmn-14', projectId: 'prj-004', projectName: 'Boutique Flagship Store PIK Avenue', clientName: 'PT Mega Citra Propertindo', terminName: 'Termin 1 (30%)', percentage: 30, amount: 216000000, triggerCondition: 'Progress Fisik 50% (Facade & Partisi)', dueDate: '2026-10-20', status: 'Draft / Belum Ditagihkan', invoiceNumber: 'DRAFT-T1-PIK' },
  { id: 'tmn-15', projectId: 'prj-004', projectName: 'Boutique Flagship Store PIK Avenue', clientName: 'PT Mega Citra Propertindo', terminName: 'Termin 2 (20%)', percentage: 20, amount: 144000000, triggerCondition: 'Progress Fisik 80% (Fitting Room & Display)', dueDate: '2026-11-05', status: 'Draft / Belum Ditagihkan', invoiceNumber: 'DRAFT-T2-PIK' },
  { id: 'tmn-16', projectId: 'prj-004', projectName: 'Boutique Flagship Store PIK Avenue', clientName: 'PT Mega Citra Propertindo', terminName: 'Retensi 10%', percentage: 10, amount: 72000000, triggerCondition: 'BAST + Masa Pemeliharaan 30 Hari', dueDate: '2026-12-10', status: 'Draft / Belum Ditagihkan', invoiceNumber: 'DRAFT-RETENSI-PIK' },
  // prj-004 total = 288M + 216M + 144M + 72M = 720,000,000 ✓
];

export const initialSitePhotos: SitePhoto[] = [
  { id: 'sp-01', projectId: 'prj-001', area: 'Area Kerja Open Plan & Baffle Ceiling', caption: 'Pemasangan acoustic ceiling baffle metal strip dan framing kaca tempered curved radius 1.2m', date: '2026-09-27', uploader: 'Rian Pratama (Site Supervisor)', imageUrl: '/images/project-office.jpg', type: 'Dalam Proses' },
  { id: 'sp-02', projectId: 'prj-002', area: 'Barista Counter & Ambient Wall', caption: 'Mockup & dry assembly custom fluted oak bar counter dengan brass shelving & marble top', date: '2026-09-26', uploader: 'Hendra Gunawan (Site Supervisor)', imageUrl: '/images/project-cafe.jpg', type: 'Selesai' },
  { id: 'sp-03', projectId: 'prj-003', area: 'Workshop Joinery Cibubur', caption: 'Pekerjaan profilisasi kayu walnut solid dan perakitan drawer walk-in closet dengan mesin Altendorf', date: '2026-09-25', uploader: 'Agus Salim (Workshop Manager)', imageUrl: '/images/project-workshop.jpg', type: 'Dalam Proses' },
];

export const initialDailyReports: DailyReport[] = [
  { id: 'dr-01', projectId: 'prj-001', date: '2026-09-27', weather: 'Cerah', tukangCount: 14, pic: 'Rian Pratama (Pengawas Lapangan)', summary: 'Melanjutkan instalasi partisi kaca frameless curved lantai 24. Pemasangan panel kisi-kisi kayu di ruang board room. Tim MEP tes continuity kabel data LAN server.', materialsReceived: 'Kaca tempered 10mm 6 panel, Silicone sealant Dow Corning 12 tube.', obstacles: 'Akses lift barang gedung SCBD sempat antri 45 menit pada jam 14.00 karena maintenance chiller gedung.' },
  { id: 'dr-02', projectId: 'prj-002', date: '2026-09-27', weather: 'Mendung', tukangCount: 8, pic: 'Hendra Gunawan (Pengawas Lapangan)', summary: 'Pengecatan touchup dinding semen ekspos. Testing aliran drainase grease trap bar counter dan colokan mesin espresso 32A.', materialsReceived: 'Cat Nippon Momento 2 galon, Brass polish compound.', obstacles: 'Tidak ada kendala berarti. Rencana serah terima parsial hari Selasa depan.' },
];

// =============================================
// Activity Log — tracks who did what and when
// =============================================

export const initialActivityLogs: ActivityLog[] = [
  { id: 'log-01', timestamp: '2026-09-27T10:15:00', userName: 'Rian Pratama', role: 'Pengawas Lapangan', action: 'Update progress fisik menjadi 74%', entityType: 'progress', entityId: 'prj-001', entityName: 'Fit-out Kantor FinTech Nexus SCBD', details: 'Pemasangan partisi kaca curved lantai 24 selesai 65%. Baffle ceiling berjalan lancar.' },
  { id: 'log-02', timestamp: '2026-09-27T09:30:00', userName: 'Rian Pratama', role: 'Pengawas Lapangan', action: 'Upload foto lapangan', entityType: 'progress', entityId: 'prj-001', entityName: 'Fit-out Kantor FinTech Nexus SCBD', details: 'Foto area kerja open plan & acoustic baffle ceiling.' },
  { id: 'log-03', timestamp: '2026-09-27T08:45:00', userName: 'Hendra Gunawan', role: 'Pengawas Lapangan', action: 'Buat laporan harian site', entityType: 'progress', entityId: 'prj-002', entityName: 'Tanamera Cafe & Roastery Senopati', details: 'Cuaca mendung. 8 tukang hadir. Testing grease trap & barista flow selesai.' },
  { id: 'log-04', timestamp: '2026-09-26T16:20:00', userName: 'Admin Keuangan', role: 'Admin Keuangan', action: 'Approve pengeluaran', entityType: 'expense', entityId: 'exp-02', entityName: 'Upah Mingguan 8 Tukang (W7)', details: 'Rp 12.200.000 untuk upah setting site SCBD minggu ke-7. Sesuai plafon.' },
  { id: 'log-05', timestamp: '2026-09-26T15:00:00', userName: 'Hendra Gunawan', role: 'Kepala Produksi', action: 'Ajukan PO bahan baru', entityType: 'po', entityId: 'po-04', entityName: 'Marmer Carrara 20mm Polish Bevel', details: 'PO-SRA-2026/09-004 senilai Rp 7.500.000 untuk tambahan slab marmer cafe Senopati.' },
  { id: 'log-06', timestamp: '2026-09-25T14:10:00', userName: 'Owner', role: 'Owner', action: 'Setujui PO bahan', entityType: 'po', entityId: 'po-03', entityName: 'Blum Clip Top Blumotion (64 set)', details: 'PO-SRA-2026/09-003 senilai Rp 9.280.000 untuk hardware penthouse Kemang Village.' },
  { id: 'log-07', timestamp: '2026-09-25T11:30:00', userName: 'Admin Keuangan', role: 'Admin Keuangan', action: 'Terbitkan invoice termin', entityType: 'termin', entityId: 'tmn-03', entityName: 'Termin 2 (30%) SCBD', details: 'Invoice INV/SRA/2026/09-012 senilai Rp 435.000.000 dikirim ke PT Nexus Finansial Digital.' },
  { id: 'log-08', timestamp: '2026-09-24T17:00:00', userName: 'Admin Keuangan', role: 'Admin Keuangan', action: 'Flag pengeluaran overbudget', entityType: 'expense', entityId: 'exp-01', entityName: 'HPL Taco Walnut Tambahan', details: 'Pembelian HPL tambahan Rp 3.450.000 melebihi plafon Rp 225.000. Menunggu review Owner.' },
  { id: 'log-09', timestamp: '2026-09-24T10:00:00', userName: 'Owner', role: 'Owner', action: 'Buat proyek baru', entityType: 'project', entityId: 'prj-004', entityName: 'Boutique Flagship Store PIK Avenue', details: 'Proyek retail 120m2 di PIK Avenue Mall. Nilai kontrak Rp 720.000.000, target margin 30%.' },
  { id: 'log-10', timestamp: '2026-09-23T09:00:00', userName: 'Budi Santoso', role: 'Kepala Produksi', action: 'Ajukan PO bahan baru', entityType: 'po', entityId: 'po-02', entityName: 'Kaca Tempered 10mm Frameless', details: 'PO-SRA-2026/09-002 senilai Rp 40.800.000 untuk partisi board room SCBD.' },
  { id: 'log-11', timestamp: '2026-09-22T16:45:00', userName: 'Hendra Gunawan', role: 'Pengawas Lapangan', action: 'Update progress fisik menjadi 92%', entityType: 'progress', entityId: 'prj-002', entityName: 'Tanamera Cafe & Roastery Senopati', details: 'QC barista flow 60% selesai. Touchup cat & drainage testing berjalan.' },
  { id: 'log-12', timestamp: '2026-09-20T14:30:00', userName: 'Agus Salim', role: 'Kepala Produksi', action: 'Update progress fisik menjadi 46%', entityType: 'progress', entityId: 'prj-003', entityName: 'Penthouse Kemang Village Residence', details: 'Produksi walnut veneer panel 50% selesai di workshop Cibubur.' },
];
