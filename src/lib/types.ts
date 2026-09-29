export type UserRole = 'Owner' | 'Kepala Produksi' | 'Admin Keuangan' | 'Pengawas Lapangan';

export type ProjectStatus = 
  | 'Tender & Estimasi'
  | 'Deal & SPK'
  | 'Persiapan Workshop'
  | 'On-Site Fit-out'
  | 'Finishing & QC'
  | 'Handover & Retensi'
  | 'Selesai';

export type ProjectHealth = 'On Track' | 'Perlu Perhatian' | 'Over Budget' | 'Terlambat';

export interface Partner {
  id: string;
  name: string;
  type: 'Arsitek / Konsultan' | 'Property Developer' | 'F&B Holding' | 'Corporate Client';
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  totalProjects: number;
  activeProjects: number;
  totalContractValue: number;
  paymentScore: 'Sangat Baik' | 'Baik' | 'Perlu Follow-up';
  notes: string;
}

export interface Milestone {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  progress: number;
  status: 'Belum Mulai' | 'Sedang Berjalan' | 'Selesai';
  weight: number; // in %
}

export interface SitePhoto {
  id: string;
  projectId: string;
  area: string;
  caption: string;
  date: string;
  uploader: string;
  imageUrl: string;
  type: 'Sebelum' | 'Dalam Proses' | 'Selesai' | 'Temuan / Issue';
}

export interface DailyReport {
  id: string;
  projectId: string;
  date: string;
  weather: 'Cerah' | 'Hujan' | 'Mendung';
  tukangCount: number;
  pic: string;
  summary: string;
  materialsReceived: string;
  obstacles: string;
}

export interface Project {
  id: string;
  code: string;
  name: string;
  partnerId: string;
  partnerName: string;
  endUser: string;
  projectType: 'Kantor B2B' | 'F&B Cafe & Resto' | 'Retail Boutique' | 'Luxury Residential';
  location: string;
  contractValue: number; // Nilai Penawaran / Kontrak Deal
  hppBudget: number;     // Anggaran HPP
  actualCost: number;    // Realisasi Pengeluaran Aktual
  targetMargin: number;  // Target Margin %
  progress: number;      // Progress Fisik %
  status: ProjectStatus;
  health: ProjectHealth;
  picProduksi: string;
  picLapangan: string;
  startDate: string;
  targetCompletion: string;
  image: string;
  description: string;
  milestones: Milestone[];
}

export interface BOQItem {
  id: string;
  projectId: string;
  category: 'Material & Hardware' | 'Tenaga Kerja' | 'Subkontraktor Spesialis' | 'Overhead & Operasional';
  itemDescription: string;
  specification: string;
  unit: string;
  volume: number;
  unitPriceHPP: number; // Harga HPP modal
  totalHPP: number;
  markupPercent: number;
  quotationPrice: number; // Harga Penawaran ke Klien
}

export interface CostExpense {
  id: string;
  projectId: string;
  projectName: string;
  date: string;
  category: 'Material' | 'Upah Tukang' | 'Subkontraktor' | 'Overhead';
  description: string;
  vendorOrRecipient: string;
  budgetAllocated: number;
  actualAmount: number;
  variance: number;
  status: 'Approved' | 'Review' | 'Flagged Overbudget';
  receiptNo: string;
  paymentMethod: 'Transfer Bank' | 'Kas Lapangan (Petty Cash)';
}

export interface Worker {
  id: string;
  name: string;
  specialty: 'Mandor Kayu' | 'Tukang HPL' | 'Tukang Duco / Finishing' | 'Tukang Plafon & Partisi' | 'Teknisi MEP & Listrik' | 'Helper Lapangan';
  dailyRate: number;
  status: 'Aktif di Site' | 'Workshop Cibubur' | 'Standby';
  currentProject: string;
  phone: string;
  rating: number; // 1-5
}

export interface Vendor {
  id: string;
  name: string;
  category: 'HPL & Wood Sheet' | 'Kaca & Alumunium' | 'Solid Surface & Marmer' | 'Flooring SPC/Vinyl' | 'MEP & Lighting' | 'Hardware & Fitting';
  contactPerson: string;
  phone: string;
  city: string;
  activeOrders: number;
  rating: number;
  paymentTerm: 'COD' | 'Tempo 14 Hari' | 'Tempo 30 Hari';
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  projectId: string;
  projectName: string;
  vendorName: string;
  itemsSummary: string;
  totalAmount: number;
  requestDate: string;
  deliveryDate: string;
  status: 'Pending Approval' | 'Disetujui' | 'Sedang Dikirim' | 'Diterima Lapangan';
  picRequest: string;
  invoiceProof?: string;
}

export interface PaymentTermin {
  id: string;
  projectId: string;
  projectName: string;
  clientName: string;
  terminName: string; // e.g. DP 30%, Termin 1 (30%), Termin 2 (30%), Retensi (10%)
  percentage: number;
  amount: number;
  triggerCondition: string; // e.g. TTD Kontrak, Progress 40%, Progress 80%, BAST
  dueDate: string;
  paidDate?: string;
  status: 'Lunas' | 'Menunggu Pembayaran' | 'Jatuh Tempo' | 'Draft / Belum Ditagihkan';
  invoiceNumber: string;
}

export interface OpnameItem {
  id: string;
  projectId: string;
  projectName: string;
  date: string;
  itemDescription: string;
  item?: string;
  category: string;
  workCategory?: string;
  unit: string;
  initialVolume: number;
  actualVolume: number;
  differenceVolume: number;
  difference?: number;
  unitPrice: number;
  adjustmentValue: number; // differenceVolume * unitPrice
  adjustmentCost?: number;
  notes: string;
  status: 'Waiting Approval' | 'Disetujui Klien' | 'Ditolak' | 'Menunggu Approval';
  verifiedBy: string;
  jointVerifier?: string;
}

export interface ProjectAddendum {
  id: string;
  projectId: string;
  projectName: string;
  clientName?: string;
  addendumNumber: string;
  date: string;
  submissionDate?: string;
  type: 'Pekerjaan Tambahan' | 'Perubahan Pekerjaan' | 'Penyesuaian Scope' | 'Perubahan Desain' | 'Penyesuaian Opname' | 'Pengurangan Pekerjaan';
  title: string;
  description: string;
  amount: number;
  status: 'Waiting Approval' | 'Disetujui Klien' | 'Ditolak' | 'Draft';
  impactOnSchedule: string;
  timeImpactDays?: number;
  requestedBy: string;
  clientApprover?: string;
  notes: string;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  userName: string;
  role: UserRole;
  action: string;
  entityType: 'project' | 'expense' | 'po' | 'termin' | 'partner' | 'progress' | 'boq' | 'addendum' | 'opname';
  entityId: string;
  entityName: string;
  details: string;
}
