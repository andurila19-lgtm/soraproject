'use client';

import React, { useState } from 'react';
import { useProject } from '@/context/ProjectContext';
import { UserRole } from '@/lib/types';
import { ROLE_CONFIGS } from '@/lib/rbac';
import { TableScrollWrapper } from '@/components/TableScrollWrapper';
import { 
  Users2, 
  UserPlus, 
  ShieldCheck, 
  HardHat, 
  DollarSign, 
  Eye, 
  Search, 
  CheckCircle2, 
  X, 
  Phone, 
  Mail, 
  KeyRound, 
  Copy, 
  Trash2, 
  Edit3, 
  Lock, 
  Sparkles,
  RefreshCw,
  AlertTriangle,
  Zap,
  Send,
  Check
} from 'lucide-react';

export function UserManagementView() {
  const { 
    teamMembers, 
    addTeamMember, 
    deleteTeamMember, 
    updateTeamMemberRole, 
    currentUser,
    showToast 
  } = useProject();

  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('Semua');
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);
  const [editRoleValue, setEditRoleValue] = useState<UserRole>('Pengawas Lapangan');

  // Form states for new user
  const [formData, setFormData] = useState<{
    fullName: string;
    email: string;
    role: UserRole;
    phone: string;
    password: string;
  }>({
    fullName: '',
    email: '',
    role: 'Pengawas Lapangan',
    phone: '',
    password: 'Sora123',
  });

  const [hasManuallyEditedEmail, setHasManuallyEditedEmail] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Success dialog state after creation
  const [createdSuccessData, setCreatedSuccessData] = useState<{
    fullName: string;
    email: string;
    role: UserRole;
    phone: string;
    password: string;
  } | null>(null);

  // Smart Auto-Fill Email as Name is typed
  const handleNameChange = (val: string) => {
    setFormData(prev => {
      const updated = { ...prev, fullName: val };
      if (!hasManuallyEditedEmail) {
        // Simple clean slug for email
        const cleanName = val
          .toLowerCase()
          .replace(/[^a-z0-9\s]/g, '')
          .trim()
          .split(/\s+/)[0]; // take first name or short slug
        if (cleanName) {
          updated.email = `${cleanName}@soraproject.com`;
        } else {
          updated.email = '';
        }
      }
      return updated;
    });
  };



  const handleOpenAddModal = () => {
    setFormData({
      fullName: '',
      email: '',
      role: 'Pengawas Lapangan',
      phone: '',
      password: 'Sora123',
    });
    setHasManuallyEditedEmail(false);
    setFormError(null);
    setCreatedSuccessData(null);
    setIsAddUserOpen(true);
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      setFormError('Nama lengkap tim wajib diisi.');
      return;
    }
    if (!formData.email.trim()) {
      setFormError('Email login tim wajib diisi.');
      return;
    }
    if (!formData.password || formData.password.length < 6) {
      setFormError('Password minimal 6 karakter.');
      return;
    }

    setIsSubmitting(true);
    setFormError(null);

    const submissionData = {
      fullName: formData.fullName.trim(),
      email: formData.email.trim().toLowerCase(),
      role: formData.role,
      phone: formData.phone.trim() || '-',
      password: formData.password,
    };

    const res = await addTeamMember(submissionData);
    setIsSubmitting(false);

    if (res.success) {
      setIsAddUserOpen(false);
      setCreatedSuccessData(submissionData);
    } else {
      setFormError(res.message || 'Gagal menambahkan akun');
    }
  };

  const generateWhatsAppMessage = (data: { fullName: string; email: string; role: string; password?: string }) => {
    const appUrl = typeof window !== 'undefined' ? window.location.origin : 'https://soraproject.reaksy.com';
    return `*AKSES LOGIN SORA PROJECT*\n\nHalo ${data.fullName},\nBerikut adalah akses akun sistem manajemen proyek interior Sora Project Anda:\n\n• *Role:* ${data.role}\n• *Email:* ${data.email}\n• *Password:* ${data.password || 'Sora123'}\n• *Portal Login:* ${appUrl}\n\nSilakan simpan informasi ini dan login ke sistem.`;
  };

  const handleCopyCredentials = (member: { fullName: string; email: string; role: string; phone: string; password?: string }) => {
    const text = generateWhatsAppMessage(member);
    navigator.clipboard.writeText(text);
    showToast('Kredensial disalin ke clipboard! Siap dikirim ke WhatsApp tim.');
  };

  const handleSendToWhatsApp = (member: { fullName: string; email: string; role: string; phone: string; password?: string }) => {
    const text = encodeURIComponent(generateWhatsAppMessage(member));
    const cleanPhone = (member.phone || '').replace(/[^0-9]/g, '');
    let formattedPhone = cleanPhone;
    if (formattedPhone.startsWith('0')) {
      formattedPhone = '62' + formattedPhone.slice(1);
    }
    const url = formattedPhone.length >= 10 
      ? `https://wa.me/${formattedPhone}?text=${text}`
      : `https://wa.me/?text=${text}`;
    window.open(url, '_blank');
  };

  const handleUpdateRole = (id: string) => {
    updateTeamMemberRole(id, editRoleValue);
    setEditingMemberId(null);
  };

  // Filter team members
  const filteredMembers = teamMembers.filter((m) => {
    const matchesSearch = 
      m.fullName.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.phone.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'Semua' || m.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  // Metric counts
  const totalUsers = teamMembers.length;
  const ownerCount = teamMembers.filter(m => m.role === 'Owner').length;
  const prodCount = teamMembers.filter(m => m.role === 'Kepala Produksi').length;
  const finCount = teamMembers.filter(m => m.role === 'Admin Keuangan').length;
  const fieldCount = teamMembers.filter(m => m.role === 'Pengawas Lapangan').length;

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'Owner':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#3C50E0]/10 text-[#3C50E0] border border-[#3C50E0]/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Owner / Direksi</span>
          </span>
        );
      case 'Kepala Produksi':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#F0950C]/10 text-[#F0950C] border border-[#F0950C]/20">
            <HardHat className="w-3.5 h-3.5" />
            <span>Kepala Produksi</span>
          </span>
        );
      case 'Admin Keuangan':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20">
            <DollarSign className="w-3.5 h-3.5" />
            <span>Admin Keuangan</span>
          </span>
        );
      case 'Pengawas Lapangan':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
            <Eye className="w-3.5 h-3.5" />
            <span>Pengawas Lapangan</span>
          </span>
        );
      default:
        return <span className="badge-tail">{role}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl sm:text-2xl font-bold text-[#1C2434]">
              Manajemen Pengguna & Tim
            </h2>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#3C50E0] text-white tracking-wider uppercase">
              <ShieldCheck className="w-3 h-3" />
              Khusus Owner
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#64748B]">
            Pusat otorisasi akun tim kerja, hierarki hak akses (RBAC), dan pembuatan akun anggota baru.
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={handleOpenAddModal}
            className="btn-tail-primary text-xs w-full sm:w-auto justify-center py-2.5 px-4 min-h-[40px] flex items-center gap-2 shadow-sm font-semibold cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>+ Tambah Akun Tim Baru</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="tail-card p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#64748B]">Total Tim Terdaftar</span>
            <div className="w-9 h-9 rounded-full bg-[#3C50E0]/10 flex items-center justify-center text-[#3C50E0]">
              <Users2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-[#1C2434]">{totalUsers}</span>
            <span className="text-[11px] text-[#10B981] font-semibold">Semua Aktif</span>
          </div>
          <p className="text-[11px] text-[#64748B] mt-1">Akun staf & pimpinan internal</p>
        </div>

        <div className="tail-card p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#64748B]">Owner / Direksi</span>
            <div className="w-9 h-9 rounded-full bg-[#3C50E0]/10 flex items-center justify-center text-[#3C50E0]">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-[#3C50E0]">{ownerCount}</span>
            <span className="text-[11px] text-[#64748B]">Akses 360° Penuh</span>
          </div>
          <p className="text-[11px] text-[#64748B] mt-1">Pemegang kendali otorisasi tertinggi</p>
        </div>

        <div className="tail-card p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#64748B]">Produksi & Lapangan</span>
            <div className="w-9 h-9 rounded-full bg-[#F0950C]/10 flex items-center justify-center text-[#F0950C]">
              <HardHat className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-[#F0950C]">{prodCount + fieldCount}</span>
            <span className="text-[11px] text-[#64748B]">Workshop & Site</span>
          </div>
          <p className="text-[11px] text-[#64748B] mt-1">{prodCount} Kepala Produksi, {fieldCount} Pengawas</p>
        </div>

        <div className="tail-card p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#64748B]">Keuangan & HPP</span>
            <div className="w-9 h-9 rounded-full bg-[#10B981]/10 flex items-center justify-center text-[#10B981]">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-[#10B981]">{finCount}</span>
            <span className="text-[11px] text-[#64748B]">Finance Control</span>
          </div>
          <p className="text-[11px] text-[#64748B] mt-1">Invoicing, PO, & Pembukuan</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="tail-card p-4 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari berdasarkan nama tim, email, atau telepon..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="tail-input pl-10 text-xs w-full"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {['Semua', 'Owner', 'Kepala Produksi', 'Admin Keuangan', 'Pengawas Lapangan'].map((r) => (
              <button
                key={r}
                onClick={() => setRoleFilter(r)}
                className={`px-3 py-1.5 rounded-sm text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  roleFilter === r
                    ? 'bg-[#3C50E0] text-white shadow-sm'
                    : 'bg-[#F1F5F9] text-[#64748B] hover:text-[#1C2434]'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="tail-card overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-[#E2E8F0] flex items-center justify-between">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-[#1C2434]">
              Daftar Anggota Tim & Akun Aktif
            </h3>
            <p className="text-xs text-[#64748B] mt-0.5">
              Menampilkan {filteredMembers.length} dari {teamMembers.length} akun terdaftar
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse"></span>
            <span className="text-xs font-medium text-[#10B981]">Supabase Sync Active</span>
          </div>
        </div>

        <TableScrollWrapper>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC] text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">
                <th className="py-3 px-4">Nama & Akun</th>
                <th className="py-3 px-4">Role / Peran</th>
                <th className="py-3 px-4">No. WhatsApp / HP</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Terdaftar</th>
                <th className="py-3 px-4 text-center">Tindakan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] text-xs">
              {filteredMembers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#64748B]">
                    <div className="max-w-xs mx-auto space-y-2">
                      <Users2 className="w-8 h-8 text-[#94A3B8] mx-auto opacity-50" />
                      <p className="font-semibold text-[#1C2434]">Tidak ada pengguna ditemukan</p>
                      <p className="text-xs text-[#94A3B8]">
                        Coba gunakan kata kunci pencarian yang lain atau ubah filter role.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredMembers.map((member) => {
                  const isCurrent = currentUser?.email === member.email;
                  const isEditingThis = editingMemberId === member.id;

                  return (
                    <tr key={member.id} className="hover:bg-[#F8FAFC]/80 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[#3C50E0]/10 text-[#3C50E0] font-bold flex items-center justify-center text-xs shrink-0">
                            {member.fullName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-[#1C2434]">{member.fullName}</span>
                              {isCurrent && (
                                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#10B981]/15 text-[#10B981]">
                                  Anda
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-1 text-[11px] text-[#64748B] mt-0.5">
                              <Mail className="w-3 h-3 text-[#94A3B8]" />
                              <span>{member.email}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        {isEditingThis ? (
                          <div className="flex items-center gap-2">
                            <select
                              value={editRoleValue}
                              onChange={(e) => setEditRoleValue(e.target.value as UserRole)}
                              className="tail-input text-xs py-1 px-2"
                            >
                              <option value="Owner">Owner</option>
                              <option value="Kepala Produksi">Kepala Produksi</option>
                              <option value="Admin Keuangan">Admin Keuangan</option>
                              <option value="Pengawas Lapangan">Pengawas Lapangan</option>
                            </select>
                            <button
                              onClick={() => handleUpdateRole(member.id)}
                              className="px-2.5 py-1 bg-[#10B981] text-white rounded text-[11px] font-semibold cursor-pointer"
                            >
                              Simpan
                            </button>
                            <button
                              onClick={() => setEditingMemberId(null)}
                              className="px-2.5 py-1 bg-[#E2E8F0] text-[#64748B] rounded text-[11px] cursor-pointer"
                            >
                              Batal
                            </button>
                          </div>
                        ) : (
                          getRoleBadge(member.role)
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        {member.phone && member.phone !== '-' ? (
                          <a
                            href={`https://wa.me/${member.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-[#3C50E0] hover:underline font-mono"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>{member.phone}</span>
                          </a>
                        ) : (
                          <span className="text-[#94A3B8]">-</span>
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-[#10B981]/10 text-[#10B981]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
                          <span>Aktif</span>
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-[#64748B] font-mono text-[11px]">
                        {member.createdAt}
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => handleCopyCredentials(member)}
                            title="Salin Kredensial untuk WhatsApp"
                            className="p-1.5 text-[#64748B] hover:text-[#3C50E0] hover:bg-[#3C50E0]/10 rounded transition-colors cursor-pointer"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => {
                              setEditingMemberId(member.id);
                              setEditRoleValue(member.role);
                            }}
                            title="Ubah Role"
                            className="p-1.5 text-[#64748B] hover:text-[#F0950C] hover:bg-[#F0950C]/10 rounded transition-colors cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          {!isCurrent && (
                            <button
                              onClick={() => {
                                if (confirm(`Yakin ingin menonaktifkan akun "${member.fullName}"?`)) {
                                  deleteTeamMember(member.id);
                                }
                              }}
                              title="Hapus / Nonaktifkan"
                              className="p-1.5 text-[#64748B] hover:text-[#D34053] hover:bg-[#D34053]/10 rounded transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </TableScrollWrapper>
      </div>

      {/* RBAC Permission Matrix Reference */}
      <div className="tail-card overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-[#E2E8F0]">
          <h3 className="text-sm sm:text-base font-bold text-[#1C2434] flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#3C50E0]" />
            <span>Matriks Batasan & Hak Akses Fitur (RBAC)</span>
          </h3>
          <p className="text-xs text-[#64748B] mt-0.5">
            Panduan otorisasi peran dalam aplikasi Sora Project untuk menjaga pembagian tugas dan kerahasiaan data perusahaan.
          </p>
        </div>

        <TableScrollWrapper>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC] text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">
                <th className="py-3 px-4">Modul Sistem</th>
                <th className="py-3 px-4 text-center">Owner / Direksi</th>
                <th className="py-3 px-4 text-center">Kepala Produksi</th>
                <th className="py-3 px-4 text-center">Admin Keuangan</th>
                <th className="py-3 px-4 text-center">Pengawas Lapangan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] text-xs">
              <tr className="hover:bg-[#F8FAFC]/50">
                <td className="py-3 px-4 font-semibold text-[#1C2434]">
                  Dashboard Utama & KPI
                </td>
                <td className="py-3 px-4 text-center text-[#10B981] font-semibold">✅ 360° Executive</td>
                <td className="py-3 px-4 text-center text-[#F0950C] font-semibold">✅ Operasional</td>
                <td className="py-3 px-4 text-center text-[#10B981] font-semibold">✅ Finansial</td>
                <td className="py-3 px-4 text-center text-purple-600 font-semibold">✅ Site & Progres</td>
              </tr>
              <tr className="hover:bg-[#F8FAFC]/50">
                <td className="py-3 px-4 font-semibold text-[#1C2434]">
                  Portofolio & Manajemen Proyek
                </td>
                <td className="py-3 px-4 text-center text-[#10B981] font-semibold">✅ Akses Penuh</td>
                <td className="py-3 px-4 text-center text-[#10B981] font-semibold">✅ Akses Penuh</td>
                <td className="py-3 px-4 text-center text-[#10B981] font-semibold">✅ Akses Penuh</td>
                <td className="py-3 px-4 text-center text-[#10B981] font-semibold">✅ Lihat Proyek</td>
              </tr>
              <tr className="hover:bg-[#F8FAFC]/50">
                <td className="py-3 px-4 font-semibold text-[#1C2434]">
                  HPP & BOQ / SPK Deals
                </td>
                <td className="py-3 px-4 text-center text-[#10B981] font-semibold">✅ Buat & Deal SPK</td>
                <td className="py-3 px-4 text-center text-[#94A3B8]">❌ Dibatasi</td>
                <td className="py-3 px-4 text-center text-[#10B981] font-semibold">✅ Monitoring HPP</td>
                <td className="py-3 px-4 text-center text-[#94A3B8]">❌ Dibatasi</td>
              </tr>
              <tr className="hover:bg-[#F8FAFC]/50">
                <td className="py-3 px-4 font-semibold text-[#1C2434]">
                  Cost Control & Pengeluaran Real
                </td>
                <td className="py-3 px-4 text-center text-[#10B981] font-semibold">✅ Approval & Plafon</td>
                <td className="py-3 px-4 text-center text-[#94A3B8]">❌ Dibatasi</td>
                <td className="py-3 px-4 text-center text-[#10B981] font-semibold">✅ Input & Pembukuan</td>
                <td className="py-3 px-4 text-center text-[#94A3B8]">❌ Dibatasi</td>
              </tr>
              <tr className="hover:bg-[#F8FAFC]/50">
                <td className="py-3 px-4 font-semibold text-[#1C2434]">
                  Procurement & PO Material
                </td>
                <td className="py-3 px-4 text-center text-[#10B981] font-semibold">✅ Approval PO</td>
                <td className="py-3 px-4 text-center text-[#10B981] font-semibold">✅ Terbitkan PO Bahan</td>
                <td className="py-3 px-4 text-center text-[#10B981] font-semibold">✅ Validasi Bayar PO</td>
                <td className="py-3 px-4 text-center text-[#94A3B8]">❌ Dibatasi</td>
              </tr>
              <tr className="hover:bg-[#F8FAFC]/50">
                <td className="py-3 px-4 font-semibold text-[#1C2434]">
                  Termin & Invoicing Klien
                </td>
                <td className="py-3 px-4 text-center text-[#10B981] font-semibold">✅ Pantau Tagihan</td>
                <td className="py-3 px-4 text-center text-[#94A3B8]">❌ Dibatasi</td>
                <td className="py-3 px-4 text-center text-[#10B981] font-semibold">✅ Terbitkan & Tagih</td>
                <td className="py-3 px-4 text-center text-[#94A3B8]">❌ Dibatasi</td>
              </tr>
              <tr className="hover:bg-[#F8FAFC]/50">
                <td className="py-3 px-4 font-semibold text-[#1C2434]">
                  Dokumentasi Progres & Joint Opname
                </td>
                <td className="py-3 px-4 text-center text-[#10B981] font-semibold">✅ Approval Opname</td>
                <td className="py-3 px-4 text-center text-[#10B981] font-semibold">✅ Kontrol Jadwal</td>
                <td className="py-3 px-4 text-center text-[#94A3B8]">❌ Dibatasi</td>
                <td className="py-3 px-4 text-center text-[#10B981] font-semibold">✅ Upload Foto & Laporan</td>
              </tr>
              <tr className="hover:bg-[#F8FAFC]/50">
                <td className="py-3 px-4 font-semibold text-[#1C2434]">
                  User Management (Buat Akun Tim)
                </td>
                <td className="py-3 px-4 text-center text-[#10B981] font-bold">⭐ Otoritas Khusus</td>
                <td className="py-3 px-4 text-center text-[#94A3B8]">❌ Dibatasi</td>
                <td className="py-3 px-4 text-center text-[#94A3B8]">❌ Dibatasi</td>
                <td className="py-3 px-4 text-center text-[#94A3B8]">❌ Dibatasi</td>
              </tr>
            </tbody>
          </table>
        </TableScrollWrapper>
      </div>

      {/* ========================================================= */}
      {/* MODAL 1: Tambah Akun Tim Baru (Dioptimalkan Super Mudah) */}
      {/* ========================================================= */}
      {isAddUserOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-lg border border-[#E2E8F0] shadow-2xl w-full max-w-lg max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0] bg-[#F8FAFC] shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#3C50E0]/10 flex items-center justify-center text-[#3C50E0]">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#1C2434]">
                    Tambah Akun Tim Baru
                  </h3>
                  <p className="text-[11px] text-[#64748B]">
                    Registrasi anggota tim ke Supabase Auth & hak akses peran
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAddUserOpen(false)}
                className="p-1.5 rounded-md text-[#64748B] hover:text-[#1C2434] hover:bg-slate-200 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>


            {/* Modal Body / Scrollable Form */}
            <form onSubmit={handleCreateUser} className="p-5 space-y-4 overflow-y-auto flex-1 modal-scroll">
              {formError && (
                <div className="p-3 bg-[#D34053]/10 border border-[#D34053]/30 rounded-md text-[#D34053] text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* 1. Nama Lengkap */}
              <div>
                <label className="block text-xs font-bold text-[#1C2434] mb-1.5">
                  1. Nama Lengkap Staf / Karyawan <span className="text-[#D34053]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ketik nama, misal: Rian Pratama..."
                  value={formData.fullName}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className="w-full bg-white border border-[#CBD5E1] focus:border-[#3C50E0] focus:ring-2 focus:ring-[#3C50E0]/15 rounded-md px-3.5 py-2.5 text-sm text-[#1C2434] placeholder:text-[#94A3B8] transition outline-none"
                />
                <p className="text-[10px] text-[#64748B] mt-1">
                  💡 Email login akan terisi otomatis saat Anda mengetik nama di atas.
                </p>
              </div>

              {/* 2. Role Selector (Grid Cards) */}
              <div>
                <label className="block text-xs font-bold text-[#1C2434] mb-1.5">
                  2. Pilih Role / Jabatan Akses <span className="text-[#D34053]">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['Pengawas Lapangan', 'Kepala Produksi', 'Admin Keuangan', 'Owner'] as UserRole[]).map((r) => {
                    const isSelected = formData.role === r;
                    const config = ROLE_CONFIGS[r];
                    return (
                      <div
                        key={r}
                        onClick={() => setFormData({ ...formData, role: r })}
                        className={`p-2.5 rounded-md border-2 cursor-pointer transition-all ${
                          isSelected
                            ? 'border-[#3C50E0] bg-[#3C50E0]/5 text-[#1C2434] shadow-xs'
                            : 'border-[#E2E8F0] hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-bold ${isSelected ? 'text-[#3C50E0]' : 'text-[#1C2434]'}`}>
                            {r}
                          </span>
                          {isSelected ? (
                            <CheckCircle2 className="w-4 h-4 text-[#3C50E0]" />
                          ) : (
                            <span className="w-3.5 h-3.5 rounded-full border border-slate-300" />
                          )}
                        </div>
                        <p className="text-[10px] text-[#64748B] mt-1 line-clamp-1">
                          {config?.scope || ''}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 3. Email Login */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-[#1C2434]">
                    3. Email Login Akun <span className="text-[#D34053]">*</span>
                  </label>
                  {/* Quick Domain Switchers */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        const base = formData.email.split('@')[0] || 'nama';
                        setFormData({ ...formData, email: `${base}@soraproject.com` });
                        setHasManuallyEditedEmail(true);
                      }}
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-100 hover:bg-[#3C50E0]/10 hover:text-[#3C50E0] text-[#64748B] font-mono cursor-pointer transition"
                    >
                      @soraproject.com
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const base = formData.email.split('@')[0] || 'nama';
                        setFormData({ ...formData, email: `${base}@gmail.com` });
                        setHasManuallyEditedEmail(true);
                      }}
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-100 hover:bg-[#3C50E0]/10 hover:text-[#3C50E0] text-[#64748B] font-mono cursor-pointer transition"
                    >
                      @gmail.com
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <Mail className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    required
                    placeholder="nama@soraproject.com"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      setHasManuallyEditedEmail(true);
                    }}
                    className="w-full bg-white border border-[#CBD5E1] focus:border-[#3C50E0] focus:ring-2 focus:ring-[#3C50E0]/15 rounded-md pl-10 pr-3.5 py-2.5 text-sm text-[#1C2434] placeholder:text-[#94A3B8] transition outline-none font-mono text-xs sm:text-sm"
                  />
                </div>
              </div>

              {/* 4. Password Awal (Ramah & Gampang) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-[#1C2434]">
                    4. Password Awal <span className="text-[#D34053]">*</span>
                  </label>
                  {/* Preset Password Chips */}
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-[#94A3B8] mr-0.5">Pilihan cepat:</span>
                    {['Sora123', 'Sora2026', '12345678'].map((pwd) => (
                      <button
                        key={pwd}
                        type="button"
                        onClick={() => setFormData({ ...formData, password: pwd })}
                        className={`text-[10px] px-2 py-0.5 rounded font-mono cursor-pointer transition ${
                          formData.password === pwd
                            ? 'bg-[#3C50E0] text-white font-bold'
                            : 'bg-slate-100 text-[#64748B] hover:bg-slate-200'
                        }`}
                      >
                        {pwd}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <KeyRound className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Minimal 6 karakter..."
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full bg-white border border-[#CBD5E1] focus:border-[#3C50E0] focus:ring-2 focus:ring-[#3C50E0]/15 rounded-md pl-10 pr-10 py-2.5 text-sm text-[#1C2434] placeholder:text-[#94A3B8] transition outline-none font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#1C2434] p-1 cursor-pointer"
                  >
                    {showPassword ? <Eye className="w-4 h-4" /> : <Eye className="w-4 h-4 text-slate-400" />}
                  </button>
                </div>
                <p className="text-[10px] text-[#64748B] mt-1">
                  Gunakan password yang mudah diingat tim saat pertama login.
                </p>
              </div>

              {/* 5. Nomor WhatsApp Tim (Opsional) */}
              <div>
                <label className="block text-xs font-bold text-[#1C2434] mb-1.5">
                  5. Nomor WhatsApp Tim <span className="text-[11px] font-normal text-[#64748B]">(Opsional untuk kirim kredensial)</span>
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3.5 flex items-center gap-1 text-[#64748B] pointer-events-none text-xs font-semibold">
                    <Phone className="w-3.5 h-3.5 text-[#94A3B8]" />
                    <span>+62</span>
                  </div>
                  <input
                    type="tel"
                    placeholder="812-3456-7890"
                    value={formData.phone.replace(/^\+?62/, '').replace(/^0/, '')}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/[^0-9]/g, '');
                      setFormData({ ...formData, phone: digits ? `0${digits}` : '' });
                    }}
                    className="w-full bg-white border border-[#CBD5E1] focus:border-[#3C50E0] focus:ring-2 focus:ring-[#3C50E0]/15 rounded-md pl-16 pr-3.5 py-2.5 text-sm text-[#1C2434] placeholder:text-[#94A3B8] transition outline-none font-mono"
                  />
                </div>
              </div>

              {/* Ringkasan Akun Live Preview */}
              <div className="p-3 bg-[#F8FAFC] rounded-md border border-[#E2E8F0] space-y-1 text-xs">
                <span className="font-bold text-[#1C2434] flex items-center gap-1.5 text-[11px] text-[#3C50E0]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#3C50E0]" />
                  <span>Ringkasan Akun:</span>
                </span>
                <p className="text-[11px] text-[#475569] leading-relaxed">
                  Akun atas nama <strong>{formData.fullName || '(Belum diisi)'}</strong> sebagai role <strong>{formData.role}</strong> dengan email login <code className="text-[#3C50E0] font-mono">{formData.email || '...'}</code> dan password <code className="font-mono text-slate-800">{formData.password}</code>.
                </p>
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E2E8F0]">
                <button
                  type="button"
                  onClick={() => setIsAddUserOpen(false)}
                  className="px-4 py-2.5 border border-[#CBD5E1] rounded-md text-xs font-semibold text-[#64748B] hover:bg-slate-100 transition cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-tail-primary text-xs py-2.5 px-6 flex items-center gap-2 font-bold cursor-pointer shadow-md shadow-[#3C50E0]/20 disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Mendaftarkan ke Supabase...</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4" />
                      <span>Buat Akun Tim Sekarang</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 2: Dialog Sukses & Bagikan Langsung ke WhatsApp      */}
      {/* ========================================================= */}
      {createdSuccessData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-lg border border-[#E2E8F0] shadow-2xl w-full max-w-md p-6 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-[#10B981]/15 text-[#10B981] flex items-center justify-center mx-auto">
                <Check className="w-7 h-7 stroke-[3]" />
              </div>
              <h3 className="text-lg font-bold text-[#1C2434]">
                Akun Tim Berhasil Dibuat!
              </h3>
              <p className="text-xs text-[#64748B] max-w-xs mx-auto">
                Akun telah terdaftar di Supabase Auth dan dapat langsung digunakan untuk login ke sistem Sora Project.
              </p>
            </div>

            {/* Credential summary box */}
            <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-md space-y-2 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-slate-200">
                <span className="text-[#64748B]">Nama Anggota:</span>
                <span className="font-bold text-[#1C2434]">{createdSuccessData.fullName}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-200">
                <span className="text-[#64748B]">Role / Akses:</span>
                <span className="font-bold text-[#3C50E0]">{createdSuccessData.role}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-200">
                <span className="text-[#64748B]">Email Login:</span>
                <span className="font-mono font-semibold text-[#1C2434]">{createdSuccessData.email}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-[#64748B]">Kata Sandi:</span>
                <span className="font-mono font-bold text-[#10B981]">{createdSuccessData.password}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => handleSendToWhatsApp(createdSuccessData)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-md bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#25D366]/20 transition cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Kredensial via WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={() => handleCopyCredentials(createdSuccessData)}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-md border border-[#CBD5E1] bg-white hover:bg-slate-50 text-[#1C2434] text-xs font-semibold transition cursor-pointer"
              >
                <Copy className="w-4 h-4 text-[#64748B]" />
                <span>Salin Teks Kredensial</span>
              </button>

              <button
                type="button"
                onClick={() => setCreatedSuccessData(null)}
                className="w-full py-2 text-xs text-[#64748B] hover:text-[#1C2434] font-medium text-center cursor-pointer"
              >
                Tutup Saja
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
