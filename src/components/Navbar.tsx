'use client';

import React, { useState } from 'react';
import { useProject } from '@/context/ProjectContext';
import { UserRole } from '@/lib/types';
import { 
  Building2, 
  Search, 
  Bell, 
  Plus, 
  ChevronDown, 
  Menu,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet,
  Receipt,
  PackagePlus,
  X,
  User,
  ShieldCheck,
  HardHat,
  DollarSign,
  Eye,
  PanelLeftClose,
  PanelLeftOpen,
  ArrowLeft
} from 'lucide-react';

interface NavbarProps {
  onToggleMobileSidebar: () => void;
}

export function Navbar({ onToggleMobileSidebar }: NavbarProps) {
  const { 
    role, 
    setRole, 
    activeTab,
    setActiveTab,
    projects, 
    selectedProjectId, 
    setSelectedProjectId,
    searchQuery,
    setSearchQuery,
    notifications,
    markNotificationsAsRead,
    setIsCreateProjectOpen,
    setIsAddExpenseOpen,
    setIsCreatePOOpen,
    setIsQuotationPreviewOpen,
    showToast,
    isSidebarCollapsed,
    toggleSidebarCollapse
  } = useProject();

  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isQuickActionOpen, setIsQuickActionOpen] = useState(false);

  const roles: { role: UserRole; desc: string; icon: React.ReactNode }[] = [
    { role: 'Owner', desc: 'KPI Finansial, Kontrol Margin & Risiko', icon: <ShieldCheck className="w-4 h-4 text-[#3C50E0]" /> },
    { role: 'Kepala Produksi', desc: 'Pabrikasi Workshop & Jadwal On-Site', icon: <HardHat className="w-4 h-4 text-[#F0950C]" /> },
    { role: 'Admin Keuangan', desc: 'Termin, Invoicing & Kas Keluar', icon: <DollarSign className="w-4 h-4 text-[#10B981]" /> },
    { role: 'Pengawas Lapangan', desc: 'Laporan Harian, Absensi & BAST', icon: <Eye className="w-4 h-4 text-purple-600" /> },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-40 flex w-full bg-white border-b border-[#E2E8F0] shadow-sm">
      <div className="flex flex-grow items-center justify-between py-2.5 sm:py-3.5 px-3 sm:px-4 md:px-6 2xl:px-11">
        {/* Left: Mobile Toggle, Mobile Brand, & Search Bar */}
        <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
          <button
            onClick={onToggleMobileSidebar}
            className="lg:hidden p-1.5 rounded-sm border border-[#E2E8F0] bg-white text-[#64748B] hover:text-[#1C2434] shrink-0"
            aria-label="Toggle Navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Mobile Brand Mark */}
          <div className="flex items-center gap-1.5 lg:hidden shrink-0">
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-[#3C50E0] to-[#2F41C2] flex items-center justify-center text-white font-black text-xs shadow-xs">
              S
            </div>
            <span className="font-bold text-sm text-[#1C2434] tracking-tight">Sora<span className="text-[#3C50E0]">.</span></span>
          </div>

          {/* Quick Back to Dashboard Button on Mobile when on Subpages */}
          {activeTab !== 'dashboard' && (
            <button
              onClick={() => setActiveTab('dashboard')}
              className="lg:hidden flex items-center gap-1 px-2.5 py-1 rounded bg-[#EFF2F7] hover:bg-[#E2E8F0] text-[#1C2434] text-xs font-semibold shrink-0 transition active:scale-95"
              title="Kembali ke Dashboard"
              aria-label="Kembali ke Dashboard"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#3C50E0]" />
              <span>Kembali</span>
            </button>
          )}

          {/* Desktop Minimize Sidebar Toggle Button */}
          <button
            onClick={toggleSidebarCollapse}
            className="hidden lg:flex items-center justify-center p-2 rounded-sm border border-[#E2E8F0] text-[#64748B] hover:text-[#3C50E0] hover:border-[#3C50E0] hover:bg-[#F8FAFC] transition shrink-0"
            title={isSidebarCollapsed ? "Perluas Sidebar" : "Perkecil / Minimize Sidebar"}
            aria-label="Toggle Minimize Sidebar"
          >
            {isSidebarCollapsed ? (
              <PanelLeftOpen className="w-4 h-4 text-[#3C50E0]" />
            ) : (
              <PanelLeftClose className="w-4 h-4" />
            )}
          </button>

          {/* Global Search Bar */}
          <div className="relative w-full max-w-xs sm:max-w-md hidden md:block">
            <Search className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Cari proyek, vendor, BOQ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F1F5F9] border border-transparent rounded-md pl-9 pr-4 py-1.5 sm:py-2 text-xs sm:text-sm text-[#1C2434] placeholder:text-[#8A99AD] focus:bg-white focus:border-[#3C50E0] focus:outline-none transition-all"
            />
          </div>

          {/* Project Quick Filter */}
          <div className="relative hidden xl:block min-w-[210px]">
            <select
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              className="w-full text-xs font-semibold bg-white text-[#1C2434] border border-[#E2E8F0] rounded-md px-3 py-2 pr-8 appearance-none focus:outline-none focus:border-[#3C50E0]"
            >
              <option value="all">Semua Proyek Aktif ({projects.length})</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.code} - {p.name.slice(0, 22)}...
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-[#64748B] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Right: Quick Action, Notification & User Profile */}
        <div className="flex items-center gap-2 sm:gap-3 2xl:gap-5 shrink-0">
          {/* Quick Action Button */}
          <div className="relative">
            <button
              onClick={() => setIsQuickActionOpen(!isQuickActionOpen)}
              className="btn-tail-primary shadow-sm text-xs py-1.5 px-2.5 sm:py-2 sm:px-3"
            >
              <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
              <span className="hidden sm:inline">Aksi Cepat</span>
              <ChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>

            {isQuickActionOpen && (
              <div 
                className="absolute right-0 mt-2 w-56 max-w-[calc(100vw-1.5rem)] bg-white border border-[#E2E8F0] rounded-md shadow-lg py-1.5 z-50 text-sm animate-in fade-in zoom-in-95 duration-100"
                onClick={() => setIsQuickActionOpen(false)}
              >
                <div className="px-4 py-1.5 text-xs font-bold text-[#8A99AD] uppercase tracking-wider border-b border-[#E2E8F0]">
                  Entri Cepat ({role})
                </div>

                {/* Proyek Baru: Owner & Kepala Produksi */}
                {(role === 'Owner' || role === 'Kepala Produksi') && (
                  <button
                    onClick={() => setIsCreateProjectOpen(true)}
                    className="w-full text-left px-4 py-2 hover:bg-[#F1F5F9] text-[#1C2434] flex items-center gap-2.5"
                  >
                    <Building2 className="w-4 h-4 text-[#3C50E0]" />
                    <span>Proyek Baru</span>
                  </button>
                )}

                {/* Catat Pengeluaran: Owner & Admin Keuangan Only */}
                {(role === 'Owner' || role === 'Admin Keuangan') && (
                  <button
                    onClick={() => setIsAddExpenseOpen(true)}
                    className="w-full text-left px-4 py-2 hover:bg-[#F1F5F9] text-[#1C2434] flex items-center gap-2.5"
                  >
                    <Receipt className="w-4 h-4 text-[#10B981]" />
                    <span>Catat Biaya Kas</span>
                  </button>
                )}

                {/* Buat PO Bahan: Owner, Kepala Produksi, Admin Keuangan */}
                {(role === 'Owner' || role === 'Kepala Produksi' || role === 'Admin Keuangan') && (
                  <button
                    onClick={() => setIsCreatePOOpen(true)}
                    className="w-full text-left px-4 py-2 hover:bg-[#F1F5F9] text-[#1C2434] flex items-center gap-2.5"
                  >
                    <PackagePlus className="w-4 h-4 text-[#F0950C]" />
                    <span>Buat PO Bahan Material</span>
                  </button>
                )}

                {/* Cetak Quotation/SPK: Owner & Admin Keuangan Only */}
                {(role === 'Owner' || role === 'Admin Keuangan') && (
                  <button
                    onClick={() => setIsQuotationPreviewOpen(true)}
                    className="w-full text-left px-4 py-2 hover:bg-[#F1F5F9] text-[#1C2434] flex items-center gap-2.5"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-purple-600" />
                    <span>Cetak Quotation / SPK</span>
                  </button>
                )}

                {/* Pengawas Lapangan Actions */}
                {role === 'Pengawas Lapangan' && (
                  <button
                    onClick={() => setActiveTab('progress')}
                    className="w-full text-left px-4 py-2 hover:bg-[#F1F5F9] text-[#1C2434] flex items-center gap-2.5"
                  >
                    <Eye className="w-4 h-4 text-purple-600" />
                    <span>Dokumentasi Foto Site</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => {
                setIsNotifOpen(!isNotifOpen);
                if (!isNotifOpen) markNotificationsAsRead();
              }}
              className="relative flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-[#E2E8F0] bg-white text-[#64748B] hover:text-[#3C50E0] hover:border-[#3C50E0] transition-colors shrink-0"
            >
              <Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-3 w-3 sm:h-3.5 sm:w-3.5 rounded-full bg-[#D34053] border-2 border-white" />
              )}
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 mt-2.5 w-72 sm:w-96 max-w-[calc(100vw-1.5rem)] rounded-md border border-[#E2E8F0] bg-white shadow-xl z-50 overflow-hidden">
                <div className="px-4 py-3 border-b border-[#E2E8F0] flex items-center justify-between">
                  <h5 className="text-sm font-bold text-[#1C2434]">Notifikasi Proyek</h5>
                  <button onClick={() => setIsNotifOpen(false)} className="text-[#8A99AD] hover:text-[#1C2434]">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="max-h-80 overflow-y-auto divide-y divide-[#E2E8F0]">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-3 hover:bg-[#F8FAFC] transition-colors">
                      <div className="flex items-start gap-3">
                        {n.type === 'warning' && <AlertTriangle className="w-4 h-4 text-[#F0950C] shrink-0 mt-0.5" />}
                        {n.type === 'danger' && <AlertTriangle className="w-4 h-4 text-[#D34053] shrink-0 mt-0.5" />}
                        {n.type === 'info' && <CheckCircle2 className="w-4 h-4 text-[#3C50E0] shrink-0 mt-0.5" />}
                        <div className="flex-1 text-xs">
                          <p className="font-bold text-[#1C2434]">{n.title}</p>
                          <p className="text-[#64748B] mt-0.5 leading-relaxed">{n.message}</p>
                          <span className="text-[10px] text-[#8A99AD] mt-1 block">{n.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Block with Role Switcher (TailAdmin Style) */}
          <div className="relative">
            <button
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className="flex items-center gap-2 sm:gap-3 p-1 rounded-md hover:bg-[#F1F5F9] transition-colors"
            >
              <div className="hidden text-right lg:block">
                <span className="block text-sm font-semibold text-[#1C2434] leading-tight">
                  {role === 'Owner' && 'Ir. Hendra Gunawan'}
                  {role === 'Kepala Produksi' && 'Budi Santoso'}
                  {role === 'Admin Keuangan' && 'Siti Rahmawati'}
                  {role === 'Pengawas Lapangan' && 'Rian Pratama'}
                </span>
                <span className="block text-xs font-medium text-[#8A99AD] leading-tight mt-0.5">
                  {role}
                </span>
              </div>

              <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-[#3C50E0] text-white font-bold flex items-center justify-center text-xs sm:text-sm shadow-sm shrink-0">
                {role.slice(0, 2).toUpperCase()}
              </div>

              <ChevronDown className="w-3.5 h-3.5 text-[#64748B] hidden sm:block" />
            </button>

            {isRoleDropdownOpen && (
              <div className="absolute right-0 mt-2.5 w-64 max-w-[calc(100vw-1.5rem)] rounded-md border border-[#E2E8F0] bg-white shadow-xl py-2 z-50 text-xs animate-in fade-in zoom-in-95 duration-100">
                <div className="px-4 py-2 border-b border-[#E2E8F0]">
                  <span className="font-bold text-[#1C2434] block">Ganti Role Pengguna</span>
                  <span className="text-[11px] text-[#8A99AD]">Simulasikan tampilan sesuai tugas kerja:</span>
                </div>
                {roles.map((r) => (
                  <button
                    key={r.role}
                    onClick={() => {
                      setRole(r.role);
                      setIsRoleDropdownOpen(false);
                      showToast(`Role beralih ke: ${r.role}`);
                    }}
                    className={`w-full text-left px-4 py-2.5 flex items-center gap-3 transition-colors ${
                      role === r.role ? 'bg-[#EFF2F7] font-bold text-[#3C50E0]' : 'text-[#1C2434] hover:bg-[#F1F5F9]'
                    }`}
                  >
                    {r.icon}
                    <div>
                      <div className="text-xs font-semibold">{r.role}</div>
                      <div className="text-[10px] text-[#8A99AD] font-normal leading-tight">{r.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
