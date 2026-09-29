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
  EyeOff,
  Lock,
  KeyRound,
  PanelLeftClose,
  PanelLeftOpen,
  ArrowLeft,
  LogOut
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

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
    toggleSidebarCollapse,
    logout,
    currentUser
  } = useProject();

  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isQuickActionOpen, setIsQuickActionOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(false);

    if (!newPassword || newPassword.length < 6) {
      setPasswordError('Kata sandi baru minimal 6 karakter.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('Konfirmasi kata sandi tidak cocok.');
      return;
    }

    setIsSavingPassword(true);
    try {
      if (supabase) {
        const { error } = await supabase.auth.updateUser({
          password: newPassword,
        });
        if (error) {
          throw error;
        }
      }
      setPasswordSuccess(true);
      showToast('Kata sandi Anda berhasil diperbarui!');
      setTimeout(() => {
        setIsPasswordModalOpen(false);
        setNewPassword('');
        setConfirmPassword('');
        setPasswordSuccess(false);
      }, 1200);
    } catch (err: any) {
      setPasswordError(err.message || 'Gagal memperbarui kata sandi. Coba lagi.');
    } finally {
      setIsSavingPassword(false);
    }
  };

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
                  {currentUser.name}
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
              <div className="absolute right-0 mt-2.5 w-72 max-w-[calc(100vw-1.5rem)] rounded-md border border-[#E2E8F0] bg-white shadow-xl py-2 z-50 text-xs animate-in fade-in zoom-in-95 duration-100">
                <div className="px-4 py-2.5 border-b border-[#E2E8F0] bg-[#F8FAFC]">
                  <div className="font-bold text-[#1C2434] text-xs leading-tight">{currentUser.name}</div>
                  <div className="text-[11px] text-[#64748B] mt-0.5">{currentUser.title}</div>
                  <div className="text-[10px] text-[#8A99AD] font-mono mt-0.5">{currentUser.email}</div>
                </div>

                <div className="px-4 py-2 border-b border-[#E2E8F0]">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-[#64748B]">Hak Akses Aktif:</span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#3C50E0]/10 text-[#3C50E0]">
                      {role}
                    </span>
                  </div>
                </div>

                {role === 'Owner' && (
                  <div className="p-1 border-b border-[#E2E8F0]">
                    <button
                      onClick={() => {
                        setActiveTab('users');
                        setIsRoleDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 flex items-center gap-2.5 rounded hover:bg-[#F1F5F9] text-[#1C2434] transition-colors cursor-pointer"
                    >
                      <User className="w-4 h-4 text-[#3C50E0]" />
                      <div>
                        <div className="text-xs font-bold text-[#1C2434]">User Management</div>
                        <div className="text-[10px] text-[#64748B]">Buat & kelola akun staf tim</div>
                      </div>
                    </button>
                  </div>
                )}

                {/* Ganti Kata Sandi (Untuk Semua Role) */}
                <div className="p-1 border-b border-[#E2E8F0]">
                  <button
                    onClick={() => {
                      setIsRoleDropdownOpen(false);
                      setPasswordError(null);
                      setPasswordSuccess(false);
                      setNewPassword('');
                      setConfirmPassword('');
                      setIsPasswordModalOpen(true);
                    }}
                    className="w-full text-left px-3 py-2 flex items-center gap-2.5 rounded hover:bg-[#F1F5F9] text-[#1C2434] transition-colors cursor-pointer"
                  >
                    <KeyRound className="w-4 h-4 text-[#3C50E0]" />
                    <div>
                      <div className="text-xs font-bold text-[#1C2434]">Ganti Kata Sandi</div>
                      <div className="text-[10px] text-[#64748B]">Perbarui kata sandi akun Anda</div>
                    </div>
                  </button>
                </div>

                <div className="pt-2 mt-1 border-t border-[#E2E8F0]">
                  <button
                    onClick={() => {
                      setIsRoleDropdownOpen(false);
                      logout();
                    }}
                    className="w-full text-left px-4 py-2.5 flex items-center gap-2.5 text-[#D34053] hover:bg-[#D34053]/10 font-bold transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Keluar / Logout Akun</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal Ganti Kata Sandi */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0] bg-[#F8FAFC]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#3C50E0]/10 flex items-center justify-center text-[#3C50E0]">
                  <KeyRound className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#1C2434]">Ganti Kata Sandi Akun</h3>
                  <p className="text-[11px] text-[#64748B]">Perbarui kata sandi untuk login selanjutnya</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsPasswordModalOpen(false)}
                className="p-1.5 rounded text-[#64748B] hover:text-[#1C2434] hover:bg-slate-200 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdatePassword} className="p-5 space-y-4">
              {passwordError && (
                <div className="p-3 rounded-md bg-[#D34053]/10 border border-[#D34053]/30 text-[#D34053] text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{passwordError}</span>
                </div>
              )}

              {passwordSuccess && (
                <div className="p-3 rounded-md bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981] text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Kata sandi berhasil diperbarui!</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-[#1C2434] mb-1.5">
                  Kata Sandi Baru
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Minimal 6 karakter..."
                    className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-md pl-9 pr-10 py-2 text-xs text-[#1C2434] focus:border-[#3C50E0] focus:ring-1 focus:ring-[#3C50E0] focus:outline-none transition font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#1C2434] p-0.5 transition cursor-pointer"
                    tabIndex={-1}
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1C2434] mb-1.5">
                  Konfirmasi Kata Sandi Baru
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Ulangi kata sandi baru..."
                    className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-md pl-9 pr-3 py-2 text-xs text-[#1C2434] focus:border-[#3C50E0] focus:ring-1 focus:ring-[#3C50E0] focus:outline-none transition font-mono"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#E2E8F0]">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="px-4 py-2 rounded-md bg-[#F1F5F9] text-[#64748B] text-xs font-semibold hover:bg-[#E2E8F0] transition cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSavingPassword}
                  className="px-4 py-2 rounded-md bg-[#3C50E0] hover:bg-[#2F41C2] text-white text-xs font-bold transition shadow-xs disabled:opacity-60 cursor-pointer flex items-center gap-1.5"
                >
                  {isSavingPassword ? (
                    <span>Menyimpan...</span>
                  ) : (
                    <span>Simpan Kata Sandi</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
