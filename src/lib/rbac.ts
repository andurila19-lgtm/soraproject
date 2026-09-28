import { UserRole } from './types';

export interface RoleConfig {
  name: UserRole;
  title: string;
  badge: string;
  badgeColor: string;
  description: string;
  scope: string;
  allowedTabs: string[];
}

export const ROLE_CONFIGS: Record<UserRole, RoleConfig> = {
  'Owner': {
    name: 'Owner',
    title: 'Executive & Owner',
    badge: 'Akses Penuh',
    badgeColor: 'bg-[#3C50E0] text-white',
    description: 'Akses menyeluruh seluruh modul portofolio, operasional produksi, hingga keuangan & P&L Sora Project.',
    scope: '360° Executive Control',
    allowedTabs: [
      'dashboard',
      'partners',
      'projects',
      'progress',
      'tk-vendor',
      'procurement',
      'hpp-quotation',
      'cost-control',
      'termin',
      'laporan',
    ],
  },
  'Kepala Produksi': {
    name: 'Kepala Produksi',
    title: 'Head of Production & Workshop',
    badge: 'Operasional & Fabrikasi',
    badgeColor: 'bg-[#F0950C] text-white',
    description: 'Fokus pada fabrikasi workshop Cibubur, timeline proyek, pengawasan site, personil tukang & vendor subkon, serta procurement material.',
    scope: 'Workshop, Site & Procurement',
    allowedTabs: [
      'dashboard',
      'partners',
      'projects',
      'progress',
      'tk-vendor',
      'procurement',
    ],
  },
  'Admin Keuangan': {
    name: 'Admin Keuangan',
    title: 'Finance & Cost Control',
    badge: 'Finansial & Invoicing',
    badgeColor: 'bg-[#10B981] text-white',
    description: 'Fokus pada pembukuan, realisasi HPP, penagihan termin faktur klien, validasi pembayaran PO supplier, dan laporan laba-rugi (P&L).',
    scope: 'Finance, Invoicing & Cost Control',
    allowedTabs: [
      'dashboard',
      'partners',
      'projects',
      'hpp-quotation',
      'cost-control',
      'procurement',
      'termin',
      'laporan',
    ],
  },
  'Pengawas Lapangan': {
    name: 'Pengawas Lapangan',
    title: 'Site Supervisor / Mandor Utama',
    badge: 'Pengawasan Lapangan',
    badgeColor: 'bg-purple-600 text-white',
    description: 'Fokus pada pengawasan langsung on-site, upload dokumentasi foto progres harian, koordinasi tukang, log cuaca & kendala lapangan.',
    scope: 'Site Execution & Daily Monitoring',
    allowedTabs: [
      'dashboard',
      'projects',
      'progress',
      'tk-vendor',
    ],
  },
};

export function isTabAllowed(role: UserRole, tabId: string): boolean {
  const config = ROLE_CONFIGS[role];
  if (!config) return false;
  return config.allowedTabs.includes(tabId);
}

export function getAllowedTabs(role: UserRole): string[] {
  return ROLE_CONFIGS[role]?.allowedTabs || ['dashboard'];
}

export function getDefaultTabForRole(role: UserRole): string {
  return 'dashboard';
}
