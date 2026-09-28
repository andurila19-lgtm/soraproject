'use client';

import React from 'react';
import { useProject } from '@/context/ProjectContext';
import { 
  Building2, 
  TrendingUp, 
  AlertTriangle, 
  Clock, 
  DollarSign, 
  CreditCard, 
  Plus, 
  Receipt, 
  ArrowUpRight, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  HardHat,
  ShoppingBag,
  Camera,
  FileText,
  ShieldCheck,
  CheckSquare,
  Sun,
  Wrench,
  Layers
} from 'lucide-react';
import { formatCompactRupiah, formatRupiah, formatDateIndo } from '@/lib/utils';
import { TableScrollWrapper } from '@/components/TableScrollWrapper';

export function DashboardView() {
  const { 
    role, 
    projects, 
    selectedProjectId, 
    termins, 
    expenses, 
    purchaseOrders,
    workers,
    setActiveTab,
    setSelectedProjectDetail,
    setIsCreateProjectOpen,
    setIsAddExpenseOpen,
    setIsCreatePOOpen,
  } = useProject();

  const filteredProjects = selectedProjectId === 'all' 
    ? projects 
    : projects.filter(p => p.id === selectedProjectId);

  const totalContract = filteredProjects.reduce((acc, p) => acc + p.contractValue, 0);
  const totalHPP = filteredProjects.reduce((acc, p) => acc + p.hppBudget, 0);
  const totalActual = filteredProjects.reduce((acc, p) => acc + p.actualCost, 0);
  const avgProgress = Math.round(
    filteredProjects.reduce((acc, p) => acc + p.progress, 0) / (filteredProjects.length || 1)
  );

  const grossProfitEstimate = totalContract - totalHPP;
  const currentMargin = Math.round(((totalContract - totalActual) / (totalContract || 1)) * 100);

  const pendingTermins = termins.filter(t => t.status === 'Jatuh Tempo' || t.status === 'Menunggu Pembayaran');
  const totalPendingTerminAmount = pendingTermins.reduce((acc, t) => acc + t.amount, 0);

  const pendingPOs = purchaseOrders.filter(p => p.status === 'Pending Approval');
  const overbudgetExpenses = expenses.filter(e => e.variance < 0);
  const activeWorkersCount = workers.filter(w => w.status === 'Aktif di Site' || w.status === 'Workshop Cibubur').length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-xl sm:text-2xl font-bold text-[#1C2434]">
              {role === 'Owner' && 'Dashboard Eksekutif & Finansial'}
              {role === 'Kepala Produksi' && 'Dashboard Operasional Produksi & Workshop'}
              {role === 'Admin Keuangan' && 'Dashboard Keuangan & Cost Control'}
              {role === 'Pengawas Lapangan' && 'Dashboard Pengawasan Site Lapangan'}
            </h2>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
              role === 'Owner' ? 'bg-[#3C50E0]/10 text-[#3C50E0]' :
              role === 'Kepala Produksi' ? 'bg-[#F0950C]/10 text-[#F0950C]' :
              role === 'Admin Keuangan' ? 'bg-[#10B981]/10 text-[#10B981]' :
              'bg-purple-100 text-purple-700'
            }`}>
              {role}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5 leading-relaxed">
            {role === 'Owner' && 'Monitoring 360° Portofolio Proyek, Margin HPP, Termin Penagihan, dan Laba-Rugi Sora'}
            {role === 'Kepala Produksi' && 'Monitoring Fabrikasi Workshop Cibubur, Material PO, Personil Tukang & Timeline Site'}
            {role === 'Admin Keuangan' && 'Monitoring Arus Kas Masuk, Termin Invoicing, Realisasi HPP vs Plafon, dan Pembukuan'}
            {role === 'Pengawas Lapangan' && 'Monitoring Harian Site Fit-out, Absensi Personil Lapangan, Log Cuaca & Kendala'}
          </p>
        </div>
        
        <div className="flex items-center flex-wrap sm:flex-nowrap gap-2 sm:gap-3">
          <nav>
            <ol className="hidden sm:flex items-center gap-1.5 text-xs text-[#64748B] mr-2">
              <li><span>Home</span></li>
              <li>/</li>
              <li className="text-[#3C50E0] font-semibold">{role}</li>
            </ol>
          </nav>

          {/* Action buttons tailored to role */}
          {role === 'Owner' && (
            <>
              <button
                onClick={() => setIsAddExpenseOpen(true)}
                className="btn-tail-secondary text-xs flex-1 sm:flex-initial justify-center min-h-[38px] py-2 px-3"
              >
                <Receipt className="w-4 h-4 text-[#10B981]" />
                <span>+ Catat Biaya</span>
              </button>
              <button
                onClick={() => setIsCreateProjectOpen(true)}
                className="btn-tail-primary text-xs flex-1 sm:flex-initial justify-center min-h-[38px] py-2 px-3"
              >
                <Plus className="w-4 h-4" />
                <span>+ Proyek Baru</span>
              </button>
            </>
          )}

          {role === 'Kepala Produksi' && (
            <>
              <button
                onClick={() => setIsCreatePOOpen(true)}
                className="btn-tail-secondary text-xs flex-1 sm:flex-initial justify-center min-h-[38px] py-2 px-3"
              >
                <ShoppingBag className="w-4 h-4 text-[#F0950C]" />
                <span>+ Buat PO Bahan</span>
              </button>
              <button
                onClick={() => setIsCreateProjectOpen(true)}
                className="btn-tail-primary text-xs flex-1 sm:flex-initial justify-center min-h-[38px] py-2 px-3"
              >
                <Plus className="w-4 h-4" />
                <span>+ Proyek Baru</span>
              </button>
            </>
          )}

          {role === 'Admin Keuangan' && (
            <>
              <button
                onClick={() => setIsAddExpenseOpen(true)}
                className="btn-tail-secondary text-xs flex-1 sm:flex-initial justify-center min-h-[38px] py-2 px-3"
              >
                <Receipt className="w-4 h-4 text-[#10B981]" />
                <span>+ Catat Biaya Kas</span>
              </button>
              <button
                onClick={() => setActiveTab('termin')}
                className="btn-tail-primary text-xs flex-1 sm:flex-initial justify-center min-h-[38px] py-2 px-3"
              >
                <CreditCard className="w-4 h-4" />
                <span>+ Tagih Termin</span>
              </button>
            </>
          )}

          {role === 'Pengawas Lapangan' && (
            <>
              <button
                onClick={() => setActiveTab('progress')}
                className="btn-tail-secondary text-xs flex-1 sm:flex-initial justify-center min-h-[38px] py-2 px-3"
              >
                <Camera className="w-4 h-4 text-[#3C50E0]" />
                <span>+ Upload Foto</span>
              </button>
              <button
                onClick={() => setActiveTab('progress')}
                className="btn-tail-primary text-xs flex-1 sm:flex-initial justify-center min-h-[38px] py-2 px-3"
              >
                <FileText className="w-4 h-4" />
                <span>+ Lapor Harian Site</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Role-Specific Metric Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4">
        {/* ================= OWNER METRICS ================= */}
        {role === 'Owner' && (
          <>
            <div className="rounded-sm border border-[#E2E8F0] bg-white py-5 px-6 shadow-sm">
              <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-[#EFF2F7] text-[#3C50E0]">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <h4 className="text-2xl font-bold text-[#1C2434]">{formatCompactRupiah(totalContract)}</h4>
                  <span className="text-xs font-medium text-[#64748B]">Total Nilai Kontrak Deal</span>
                </div>
                <span className="flex items-center gap-1 text-xs font-semibold text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded-full">
                  {filteredProjects.length} Proyek <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            <div className="rounded-sm border border-[#E2E8F0] bg-white py-5 px-6 shadow-sm">
              <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-[#EFF2F7] text-[#10B981]">
                <DollarSign className="w-6 h-6" />
              </div>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <h4 className="text-2xl font-bold text-[#1C2434]">{formatCompactRupiah(totalActual)}</h4>
                  <span className="text-xs font-medium text-[#64748B]">Budget HPP: {formatCompactRupiah(totalHPP)}</span>
                </div>
                <span className="flex items-center gap-1 text-xs font-semibold text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded-full">
                  ~{currentMargin}% Margin
                </span>
              </div>
            </div>

            <div className="rounded-sm border border-[#E2E8F0] bg-white py-5 px-6 shadow-sm">
              <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-[#EFF2F7] text-[#F0950C]">
                <Clock className="w-6 h-6" />
              </div>
              <div className="mt-4 flex items-end justify-between">
                <div className="w-full">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-2xl font-bold text-[#1C2434]">{avgProgress}%</h4>
                    <span className="text-xs font-semibold text-[#3C50E0]">On Schedule</span>
                  </div>
                  <span className="text-xs font-medium text-[#64748B]">Rata-rata Fisik Lapangan</span>
                  <div className="w-full bg-[#E2E8F0] h-1.5 rounded-full overflow-hidden mt-2">
                    <div className="bg-[#3C50E0] h-full rounded-full transition-all duration-500" style={{ width: `${avgProgress}%` }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-sm border border-[#E2E8F0] bg-white py-5 px-6 shadow-sm">
              <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-[#EFF2F7] text-[#D34053]">
                <CreditCard className="w-6 h-6" />
              </div>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <h4 className="text-2xl font-bold text-[#D34053]">{formatCompactRupiah(totalPendingTerminAmount)}</h4>
                  <span className="text-xs font-medium text-[#64748B]">Termin Menunggu / Tempo</span>
                </div>
                <button
                  onClick={() => setActiveTab('termin')}
                  className="flex items-center gap-1 text-xs font-semibold text-[#3C50E0] hover:underline"
                >
                  {pendingTermins.length} Invoice <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </>
        )}

        {/* ================= KEPALA PRODUKSI METRICS ================= */}
        {role === 'Kepala Produksi' && (
          <>
            <div className="rounded-sm border border-[#E2E8F0] bg-white py-5 px-6 shadow-sm">
              <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-[#EFF2F7] text-[#3C50E0]">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <h4 className="text-2xl font-bold text-[#1C2434]">{filteredProjects.length} Proyek</h4>
                  <span className="text-xs font-medium text-[#64748B]">Sedang Dalam Fabrikasi & Site</span>
                </div>
                <span className="text-xs font-semibold text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded-full">
                  Aktif Berjalan
                </span>
              </div>
            </div>

            <div className="rounded-sm border border-[#E2E8F0] bg-white py-5 px-6 shadow-sm">
              <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-[#EFF2F7] text-[#F0950C]">
                <HardHat className="w-6 h-6" />
              </div>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <h4 className="text-2xl font-bold text-[#1C2434]">{activeWorkersCount} Personil</h4>
                  <span className="text-xs font-medium text-[#64748B]">Tukang HPL, Kayu, Mandor & MEP</span>
                </div>
                <button
                  onClick={() => setActiveTab('tk-vendor')}
                  className="flex items-center gap-1 text-xs font-semibold text-[#3C50E0] hover:underline"
                >
                  Tim Site <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="rounded-sm border border-[#E2E8F0] bg-white py-5 px-6 shadow-sm">
              <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-[#EFF2F7] text-[#3C50E0]">
                <Clock className="w-6 h-6" />
              </div>
              <div className="mt-4 flex items-end justify-between">
                <div className="w-full">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-2xl font-bold text-[#1C2434]">{avgProgress}%</h4>
                    <span className="text-xs font-semibold text-[#3C50E0]">On Schedule</span>
                  </div>
                  <span className="text-xs font-medium text-[#64748B]">Rata-rata Fisik & Fabrikasi</span>
                  <div className="w-full bg-[#E2E8F0] h-1.5 rounded-full overflow-hidden mt-2">
                    <div className="bg-[#3C50E0] h-full rounded-full transition-all duration-500" style={{ width: `${avgProgress}%` }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-sm border border-[#E2E8F0] bg-white py-5 px-6 shadow-sm">
              <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-[#EFF2F7] text-[#F0950C]">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <h4 className="text-2xl font-bold text-[#F0950C]">{pendingPOs.length} PO Baru</h4>
                  <span className="text-xs font-medium text-[#64748B]">Pengajuan Bahan Material</span>
                </div>
                <button
                  onClick={() => setActiveTab('procurement')}
                  className="flex items-center gap-1 text-xs font-semibold text-[#3C50E0] hover:underline"
                >
                  Cek PO <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </>
        )}

        {/* ================= ADMIN KEUANGAN METRICS ================= */}
        {role === 'Admin Keuangan' && (
          <>
            <div className="rounded-sm border border-[#E2E8F0] bg-white py-5 px-6 shadow-sm">
              <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-[#EFF2F7] text-[#3C50E0]">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <h4 className="text-2xl font-bold text-[#1C2434]">{formatCompactRupiah(totalContract)}</h4>
                  <span className="text-xs font-medium text-[#64748B]">Portofolio Kontrak Deal</span>
                </div>
                <span className="text-xs font-semibold text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded-full">
                  {filteredProjects.length} Proyek
                </span>
              </div>
            </div>

            <div className="rounded-sm border border-[#E2E8F0] bg-white py-5 px-6 shadow-sm">
              <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-[#EFF2F7] text-[#10B981]">
                <Receipt className="w-6 h-6" />
              </div>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <h4 className="text-2xl font-bold text-[#1C2434]">{formatCompactRupiah(totalActual)}</h4>
                  <span className="text-xs font-medium text-[#64748B]">Plafon HPP: {formatCompactRupiah(totalHPP)}</span>
                </div>
                <button
                  onClick={() => setActiveTab('cost-control')}
                  className="text-xs font-semibold text-[#3C50E0] hover:underline"
                >
                  Detail Serapan
                </button>
              </div>
            </div>

            <div className="rounded-sm border border-[#E2E8F0] bg-white py-5 px-6 shadow-sm">
              <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-[#EFF2F7] text-[#D34053]">
                <CreditCard className="w-6 h-6" />
              </div>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <h4 className="text-2xl font-bold text-[#D34053]">{formatCompactRupiah(totalPendingTerminAmount)}</h4>
                  <span className="text-xs font-medium text-[#64748B]">Termin Piutang (AR) Jatuh Tempo</span>
                </div>
                <button
                  onClick={() => setActiveTab('termin')}
                  className="flex items-center gap-1 text-xs font-semibold text-[#3C50E0] hover:underline"
                >
                  {pendingTermins.length} Invoice <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="rounded-sm border border-[#E2E8F0] bg-white py-5 px-6 shadow-sm">
              <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-[#EFF2F7] text-[#10B981]">
                <DollarSign className="w-6 h-6" />
              </div>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <h4 className="text-2xl font-bold text-[#10B981]">{formatCompactRupiah(grossProfitEstimate)}</h4>
                  <span className="text-xs font-medium text-[#64748B]">Estimasi Laba Kotor Proyek</span>
                </div>
                <span className="text-xs font-semibold text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded-full">
                  ~{currentMargin}% Margin
                </span>
              </div>
            </div>
          </>
        )}

        {/* ================= PENGAWAS LAPANGAN METRICS ================= */}
        {role === 'Pengawas Lapangan' && (
          <>
            <div className="rounded-sm border border-[#E2E8F0] bg-white py-5 px-6 shadow-sm">
              <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-[#EFF2F7] text-[#3C50E0]">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <h4 className="text-2xl font-bold text-[#1C2434]">{filteredProjects.length} Lokasi</h4>
                  <span className="text-xs font-medium text-[#64748B]">Site On-Fitout & Finishing</span>
                </div>
                <span className="text-xs font-semibold text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded-full">
                  Aktif On-Site
                </span>
              </div>
            </div>

            <div className="rounded-sm border border-[#E2E8F0] bg-white py-5 px-6 shadow-sm">
              <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-[#EFF2F7] text-[#F0950C]">
                <HardHat className="w-6 h-6" />
              </div>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <h4 className="text-2xl font-bold text-[#1C2434]">{activeWorkersCount} Tukang</h4>
                  <span className="text-xs font-medium text-[#64748B]">Hadir di Lokasi Hari Ini</span>
                </div>
                <span className="text-xs font-semibold text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded-full">
                  100% Hadir
                </span>
              </div>
            </div>

            <div className="rounded-sm border border-[#E2E8F0] bg-white py-5 px-6 shadow-sm">
              <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-[#EFF2F7] text-[#3C50E0]">
                <Clock className="w-6 h-6" />
              </div>
              <div className="mt-4 flex items-end justify-between">
                <div className="w-full">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-2xl font-bold text-[#1C2434]">{avgProgress}%</h4>
                    <span className="text-xs font-semibold text-[#3C50E0]">Sesuai Kurva S</span>
                  </div>
                  <span className="text-xs font-medium text-[#64748B]">Capaian Fisik Lapangan</span>
                  <div className="w-full bg-[#E2E8F0] h-1.5 rounded-full overflow-hidden mt-2">
                    <div className="bg-[#3C50E0] h-full rounded-full transition-all duration-500" style={{ width: `${avgProgress}%` }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-sm border border-[#E2E8F0] bg-white py-5 px-6 shadow-sm">
              <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-[#EFF2F7] text-[#10B981]">
                <FileText className="w-6 h-6" />
              </div>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <h4 className="text-2xl font-bold text-[#10B981]">2 Laporan</h4>
                  <span className="text-xs font-medium text-[#64748B]">Log Site & Foto Terverifikasi</span>
                </div>
                <button
                  onClick={() => setActiveTab('progress')}
                  className="flex items-center gap-1 text-xs font-semibold text-[#3C50E0] hover:underline"
                >
                  Upload <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Role-Aware Operational Attention Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* PO Alert for Owner, Kepala Produksi, Admin Keuangan */}
        {(role === 'Owner' || role === 'Kepala Produksi') && pendingPOs.length > 0 && (
          <div className="rounded-sm border border-[#F0950C]/30 bg-[#F0950C]/5 p-4 flex items-start gap-3">
            <div className="p-2 rounded-full bg-[#F0950C]/15 text-[#F0950C] shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h5 className="text-sm font-bold text-[#1C2434]">Otorisasi PO Bahan Diperlukan</h5>
                <span className="badge-tail badge-tail-warning">Approval Pending</span>
              </div>
              <p className="text-xs text-[#64748B] mt-1">
                <strong>{pendingPOs[0].projectName}</strong>: {pendingPOs[0].itemsSummary} senilai <strong className="text-[#1C2434]">{formatRupiah(pendingPOs[0].totalAmount)}</strong>
              </p>
              <div className="mt-2.5 flex items-center justify-between">
                <span className="text-xs text-[#64748B]">Pemohon: {pendingPOs[0].picRequest}</span>
                <button
                  onClick={() => setActiveTab('procurement')}
                  className="text-xs font-semibold text-[#3C50E0] hover:underline flex items-center gap-1"
                >
                  Buka Modul PO <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Workshop Readiness Alert for Kepala Produksi */}
        {role === 'Kepala Produksi' && (
          <div className="rounded-sm border border-[#3C50E0]/30 bg-[#3C50E0]/5 p-4 flex items-start gap-3">
            <div className="p-2 rounded-full bg-[#3C50E0]/15 text-[#3C50E0] shrink-0">
              <Wrench className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h5 className="text-sm font-bold text-[#1C2434]">Jadwal Delivery Fabrikasi Workshop</h5>
                <span className="badge-tail badge-tail-primary">Workshop Cibubur</span>
              </div>
              <p className="text-xs text-[#64748B] mt-1">
                Batch kabinet & kisi-kisi kayu SCBD Lt. 24 siap packing untuk pengiriman fit-out Kamis lusa.
              </p>
              <div className="mt-2.5 flex items-center justify-between">
                <span className="text-xs text-[#64748B]">PIC: Budi Santoso (Kepala Produksi)</span>
                <button
                  onClick={() => setActiveTab('projects')}
                  className="text-xs font-semibold text-[#3C50E0] hover:underline flex items-center gap-1"
                >
                  Timeline Proyek <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Financial Variance Alert for Owner and Admin Keuangan ONLY */}
        {(role === 'Owner' || role === 'Admin Keuangan') && overbudgetExpenses.length > 0 && (
          <div className="rounded-sm border border-[#D34053]/30 bg-[#D34053]/5 p-4 flex items-start gap-3">
            <div className="p-2 rounded-full bg-[#D34053]/15 text-[#D34053] shrink-0">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h5 className="text-sm font-bold text-[#1C2434]">Peringatan Variansi Biaya Aktual</h5>
                <span className="badge-tail badge-tail-danger">Over Budget</span>
              </div>
              <p className="text-xs text-[#64748B] mt-1">
                <strong>{overbudgetExpenses[0].projectName}</strong>: {overbudgetExpenses[0].description} melebihi HPP sebesar <strong className="text-[#D34053]">{formatRupiah(Math.abs(overbudgetExpenses[0].variance))}</strong>
              </p>
              <div className="mt-2.5 flex items-center justify-between">
                <span className="text-xs text-[#64748B]">Kategori: {overbudgetExpenses[0].category}</span>
                <button
                  onClick={() => setActiveTab('cost-control')}
                  className="text-xs font-semibold text-[#3C50E0] hover:underline flex items-center gap-1"
                >
                  Cek Cost Control <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Invoice Due Alert for Admin Keuangan */}
        {role === 'Admin Keuangan' && pendingTermins.length > 0 && (
          <div className="rounded-sm border border-[#10B981]/30 bg-[#10B981]/5 p-4 flex items-start gap-3">
            <div className="p-2 rounded-full bg-[#10B981]/15 text-[#10B981] shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h5 className="text-sm font-bold text-[#1C2434]">Jatuh Tempo Penagihan Termin Klien</h5>
                <span className="badge-tail badge-tail-success">Invoice Pending</span>
              </div>
              <p className="text-xs text-[#64748B] mt-1">
                <strong>{pendingTermins[0].projectName}</strong>: {pendingTermins[0].terminName} senilai <strong className="text-[#1C2434]">{formatRupiah(pendingTermins[0].amount)}</strong> ke {pendingTermins[0].clientName}.
              </p>
              <div className="mt-2.5 flex items-center justify-between">
                <span className="text-xs text-[#64748B]">Jatuh Tempo: {formatDateIndo(pendingTermins[0].dueDate)}</span>
                <button
                  onClick={() => setActiveTab('termin')}
                  className="text-xs font-semibold text-[#3C50E0] hover:underline flex items-center gap-1"
                >
                  Proses Tagihan <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Site Safety & Weather Alert for Pengawas Lapangan */}
        {role === 'Pengawas Lapangan' && (
          <>
            <div className="rounded-sm border border-[#3C50E0]/30 bg-[#3C50E0]/5 p-4 flex items-start gap-3">
              <div className="p-2 rounded-full bg-[#3C50E0]/15 text-[#3C50E0] shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h5 className="text-sm font-bold text-[#1C2434]">Izin Kerja Fit-out Gedung Aktif</h5>
                  <span className="badge-tail badge-tail-success">K3 Verified</span>
                </div>
                <p className="text-xs text-[#64748B] mt-1">
                  Surat Izin Masuk Barang & Pekerjaan Malam SCBD Lt. 24 telah disetujui Building Management (valid s/d 22:00 WIB).
                </p>
                <div className="mt-2.5 flex items-center justify-between">
                  <span className="text-xs text-[#64748B]">PIC Lapangan: Rian Pratama</span>
                  <button
                    onClick={() => setActiveTab('progress')}
                    className="text-xs font-semibold text-[#3C50E0] hover:underline flex items-center gap-1"
                  >
                    Buka Checklist <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="rounded-sm border border-[#F0950C]/30 bg-[#F0950C]/5 p-4 flex items-start gap-3">
              <div className="p-2 rounded-full bg-[#F0950C]/15 text-[#F0950C] shrink-0">
                <Sun className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h5 className="text-sm font-bold text-[#1C2434]">Kondisi Cuaca & Pengiriman Bahan</h5>
                  <span className="badge-tail badge-tail-warning">Site Alert</span>
                </div>
                <p className="text-xs text-[#64748B] mt-1">
                  Cuaca cerah berawan di area Jakarta Pusat & Selatan. Loading material kaca & multipleks dari armada ekspedisi berjalan lancar.
                </p>
                <div className="mt-2.5 flex items-center justify-between">
                  <span className="text-xs text-[#64748B]">Log: 10:15 WIB</span>
                  <button
                    onClick={() => setActiveTab('progress')}
                    className="text-xs font-semibold text-[#3C50E0] hover:underline flex items-center gap-1"
                  >
                    Log Harian Site <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Main Row: Projects Table & Side Reports */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left 2 Cols: Master TailAdmin Table */}
        <div className="xl:col-span-2">
          <div className="tail-card">
            <div className="tail-card-header">
              <div>
                <h3 className="text-base font-bold text-[#1C2434]">
                  {role === 'Owner' && 'Daftar Portofolio Proyek & Monitoring Nilai'}
                  {role === 'Kepala Produksi' && 'Jadwal Produksi Fabrikasi & Monitoring Site'}
                  {role === 'Admin Keuangan' && 'Audit Biaya Proyek & Serapan HPP'}
                  {role === 'Pengawas Lapangan' && 'Daftar Lokasi Proyek & Status Lapangan'}
                </h3>
                <p className="text-xs text-[#64748B] mt-0.5">
                  {(role === 'Owner' || role === 'Admin Keuangan') 
                    ? 'Realisasi progres fisik lapangan dan efisiensi serapan biaya kontrak'
                    : 'Realisasi timeline fabrikasi, PIC mandor lapangan, dan target serah terima'}
                </p>
              </div>
              <button
                onClick={() => setActiveTab('projects')}
                className="text-xs font-semibold text-[#3C50E0] hover:underline flex items-center gap-1"
              >
                Lihat Semua <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <TableScrollWrapper minWidth="min-w-[720px]" hint="Geser tabel portofolio proyek">
              <table className="tail-table">
                <thead>
                  {/* Financial Columns for Owner & Admin Keuangan */}
                  {(role === 'Owner' || role === 'Admin Keuangan') ? (
                    <tr>
                      <th>Kode</th>
                      <th>Nama Proyek & Klien</th>
                      <th className="text-right">Kontrak Deal</th>
                      <th className="text-right">Biaya Aktual</th>
                      <th className="text-center">Progres Fisik</th>
                      <th className="text-center">Status</th>
                      <th className="text-center">Aksi</th>
                    </tr>
                  ) : role === 'Kepala Produksi' ? (
                    /* Operational Columns for Kepala Produksi */
                    <tr>
                      <th>Kode</th>
                      <th>Nama Proyek & Klien</th>
                      <th>PIC Lapangan</th>
                      <th>Target Selesai</th>
                      <th className="text-center">Progres Fisik</th>
                      <th className="text-center">Status</th>
                      <th className="text-center">Aksi</th>
                    </tr>
                  ) : (
                    /* Site Supervisor Columns for Pengawas Lapangan */
                    <tr>
                      <th>Kode</th>
                      <th>Nama Proyek & Area</th>
                      <th>Mandor Lapangan</th>
                      <th>Target Selesai</th>
                      <th className="text-center">Progres Site</th>
                      <th className="text-center">Status</th>
                      <th className="text-center">Aksi</th>
                    </tr>
                  )}
                </thead>
                <tbody>
                  {filteredProjects.map((p) => (
                    <tr key={p.id}>
                      <td className="font-mono font-bold text-[#3C50E0] text-xs">
                        {p.code}
                      </td>
                      <td>
                        <div className="font-bold text-[#1C2434] hover:text-[#3C50E0] cursor-pointer" onClick={() => setSelectedProjectDetail(p)}>
                          {p.name}
                        </div>
                        <div className="text-xs text-[#64748B]">
                          Partner: {p.partnerName} • 📍 {p.location}
                        </div>
                      </td>

                      {/* Financial values only for Owner & Admin Keuangan */}
                      {(role === 'Owner' || role === 'Admin Keuangan') ? (
                        <>
                          <td className="text-right font-mono font-bold text-[#1C2434]">
                            {formatCompactRupiah(p.contractValue)}
                          </td>
                          <td className="text-right font-mono">
                            <div className="text-[#1C2434] font-semibold">{formatCompactRupiah(p.actualCost)}</div>
                            <div className="text-[11px] text-[#64748B]">HPP: {formatCompactRupiah(p.hppBudget)}</div>
                          </td>
                        </>
                      ) : role === 'Kepala Produksi' ? (
                        /* PIC and Target Date for Kepala Produksi */
                        <>
                          <td>
                            <div className="font-medium text-[#1C2434] text-xs">{p.picLapangan}</div>
                            <div className="text-[10px] text-[#64748B]">Fabrikasi: {p.picProduksi}</div>
                          </td>
                          <td className="text-xs text-[#64748B]">
                            {formatDateIndo(p.targetCompletion)}
                          </td>
                        </>
                      ) : (
                        /* Site details for Pengawas Lapangan */
                        <>
                          <td>
                            <div className="font-medium text-[#1C2434] text-xs">{p.picLapangan}</div>
                            <div className="text-[10px] text-[#64748B]">Mandor Kayu & MEP</div>
                          </td>
                          <td className="text-xs text-[#64748B]">
                            {formatDateIndo(p.targetCompletion)}
                          </td>
                        </>
                      )}

                      <td>
                        <div className="flex items-center gap-2 justify-center">
                          <div className="w-16 bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                            <div className="bg-[#3C50E0] h-full rounded-full" style={{ width: `${p.progress}%` }} />
                          </div>
                          <span className="font-mono font-bold text-xs text-[#1C2434]">{p.progress}%</span>
                        </div>
                      </td>
                      <td className="text-center">
                        <span className={`badge-tail ${
                          p.health === 'On Track' ? 'badge-tail-success' : 'badge-tail-warning'
                        }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="text-center">
                        <button
                          onClick={() => setSelectedProjectDetail(p)}
                          className="btn-tail-secondary text-xs py-1 px-2.5"
                        >
                          Detail
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TableScrollWrapper>

            <div className="px-6 py-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B]">
              <span>Menampilkan {filteredProjects.length} proyek aktif terdaftar</span>
              <span className="text-[#10B981] font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Data sinkron sesuai hak akses {role}
              </span>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Role-Specific Side Cards */}
        <div className="space-y-6">
          {/* Card 1 for Owner & Admin Keuangan: Struktur Realisasi HPP */}
          {(role === 'Owner' || role === 'Admin Keuangan') && (
            <div className="tail-card p-5">
              <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
                <h4 className="text-sm font-bold text-[#1C2434]">
                  Struktur Realisasi HPP
                </h4>
                <span className="badge-tail badge-tail-primary text-[10px]">Komposisi Biaya</span>
              </div>

              <div className="space-y-3.5 mt-4 text-xs">
                <div>
                  <div className="flex justify-between text-[#1C2434] mb-1">
                    <span className="font-medium">Material & Hardware:</span>
                    <span className="font-mono font-bold text-[#3C50E0]">52% (Rp 480 Jt)</span>
                  </div>
                  <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#3C50E0] h-full rounded-full" style={{ width: '52%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[#1C2434] mb-1">
                    <span className="font-medium">Upah Tukang & Mandor:</span>
                    <span className="font-mono font-bold text-[#10B981]">28% (Rp 260 Jt)</span>
                  </div>
                  <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#10B981] h-full rounded-full" style={{ width: '28%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[#1C2434] mb-1">
                    <span className="font-medium">Vendor Subkon (Kaca/MEP):</span>
                    <span className="font-mono font-bold text-[#F0950C]">14% (Rp 130 Jt)</span>
                  </div>
                  <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#F0950C] h-full rounded-full" style={{ width: '14%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[#1C2434] mb-1">
                    <span className="font-medium">Overhead & Logistik:</span>
                    <span className="font-mono font-bold text-[#64748B]">6% (Rp 55 Jt)</span>
                  </div>
                  <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#64748B] h-full rounded-full" style={{ width: '6%' }} />
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E2E8F0] text-xs space-y-1.5 text-[#64748B]">
                  <div className="flex justify-between">
                    <span>Estimasi Laba Kotor:</span>
                    <strong className="text-[#10B981] font-mono text-sm">{formatCompactRupiah(grossProfitEstimate)}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Rata-rata Margin Kontrak:</span>
                    <strong className="text-[#1C2434]">~30.4% Target</strong>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('cost-control')}
                  className="btn-tail-secondary w-full text-xs mt-2"
                >
                  Buku Besar Cost Control
                </button>
              </div>
            </div>
          )}

          {/* Card 1 for Kepala Produksi: Status Fabrikasi Workshop Cibubur */}
          {role === 'Kepala Produksi' && (
            <div className="tail-card p-5">
              <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
                <h4 className="text-sm font-bold text-[#1C2434]">
                  Kesiapan Workshop Cibubur
                </h4>
                <span className="badge-tail badge-tail-primary text-[10px]">Pabrikasi Kayu</span>
              </div>

              <div className="space-y-3.5 mt-4 text-xs">
                <div>
                  <div className="flex justify-between text-[#1C2434] mb-1">
                    <span className="font-medium">Kesiapan Bahan Baku & Multipleks:</span>
                    <span className="font-mono font-bold text-[#3C50E0]">92% Ready</span>
                  </div>
                  <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#3C50E0] h-full rounded-full" style={{ width: '92%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[#1C2434] mb-1">
                    <span className="font-medium">Perakitan Rangka Kabinet:</span>
                    <span className="font-mono font-bold text-[#10B981]">80% Tuntas</span>
                  </div>
                  <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#10B981] h-full rounded-full" style={{ width: '80%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[#1C2434] mb-1">
                    <span className="font-medium">Laminasi HPL & Duco:</span>
                    <span className="font-mono font-bold text-[#F0950C]">65% Berjalan</span>
                  </div>
                  <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#F0950C] h-full rounded-full" style={{ width: '65%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[#1C2434] mb-1">
                    <span className="font-medium">QC Hardware & Packing Foam:</span>
                    <span className="font-mono font-bold text-[#64748B]">88% Siap Kirim</span>
                  </div>
                  <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#64748B] h-full rounded-full" style={{ width: '88%' }} />
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E2E8F0] text-xs space-y-1.5 text-[#64748B]">
                  <div className="flex justify-between">
                    <span>Kapasitas Produksi Aktif:</span>
                    <strong className="text-[#10B981] font-semibold">85% Terpakai</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Pengiriman Berikutnya:</span>
                    <strong className="text-[#1C2434]">Kamis, SCBD Lt. 24</strong>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('projects')}
                  className="btn-tail-secondary w-full text-xs mt-2"
                >
                  Kelola Jadwal Produksi
                </button>
              </div>
            </div>
          )}

          {/* Card 1 for Pengawas Lapangan: Checklist K3 & Kondisi Lapangan */}
          {role === 'Pengawas Lapangan' && (
            <div className="tail-card p-5">
              <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
                <h4 className="text-sm font-bold text-[#1C2434]">
                  Checklist Keselamatan & Site K3
                </h4>
                <span className="badge-tail badge-tail-success text-[10px]">On-Site Safe</span>
              </div>

              <div className="space-y-3 mt-4 text-xs">
                <div className="flex items-center justify-between p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-sm">
                  <div className="flex items-center gap-2">
                    <CheckSquare className="w-4 h-4 text-[#10B981]" />
                    <span className="font-medium text-[#1C2434]">Izin Kerja Gedung (SIK)</span>
                  </div>
                  <span className="text-[10px] font-bold text-[#10B981]">Aktif</span>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-sm">
                  <div className="flex items-center gap-2">
                    <CheckSquare className="w-4 h-4 text-[#10B981]" />
                    <span className="font-medium text-[#1C2434]">Penggunaan APD & Rompi</span>
                  </div>
                  <span className="text-[10px] font-bold text-[#10B981]">100% Lengkap</span>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-sm">
                  <div className="flex items-center gap-2">
                    <CheckSquare className="w-4 h-4 text-[#10B981]" />
                    <span className="font-medium text-[#1C2434]">Kebersihan Koridor & Loading</span>
                  </div>
                  <span className="text-[10px] font-bold text-[#10B981]">Clear</span>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-sm">
                  <div className="flex items-center gap-2">
                    <CheckSquare className="w-4 h-4 text-[#10B981]" />
                    <span className="font-medium text-[#1C2434]">APAR & Kotak P3K di Site</span>
                  </div>
                  <span className="text-[10px] font-bold text-[#10B981]">Tersedia</span>
                </div>

                <button
                  onClick={() => setActiveTab('progress')}
                  className="btn-tail-secondary w-full text-xs mt-2"
                >
                  Buka Modul Laporan Lapangan
                </button>
              </div>
            </div>
          )}

          {/* Daily Site Activity Log (Shown to all roles) */}
          <div className="tail-card p-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <h4 className="text-sm font-bold text-[#1C2434]">
                Aktivitas Lapangan Hari Ini
              </h4>
              <span className="badge-tail badge-tail-success text-[10px]">Real-Time Site</span>
            </div>

            <div className="space-y-3 mt-3.5">
              <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-sm">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-xs text-[#1C2434]">SCBD Lt. 24 (14 Tukang)</span>
                  <span className="text-[10px] text-[#64748B] font-mono bg-[#EFF2F7] px-1.5 py-0.5 rounded">09.30 WIB</span>
                </div>
                <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                  Pemasangan kaca curved & rangka baffle ceiling. Tes kabel LAN server room tuntas tanpa kendala.
                </p>
              </div>

              <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-sm">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-xs text-[#1C2434]">Senopati Cafe (8 Tukang)</span>
                  <span className="text-[10px] text-[#64748B] font-mono bg-[#EFF2F7] px-1.5 py-0.5 rounded">10.15 WIB</span>
                </div>
                <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                  Finishing touchup cat semen ekspos & uji fungsi drainase barista counter bar lancar.
                </p>
              </div>

              {(role === 'Owner' || role === 'Kepala Produksi' || role === 'Pengawas Lapangan') && (
                <button
                  onClick={() => setActiveTab('progress')}
                  className="text-xs font-semibold text-[#3C50E0] hover:underline flex items-center justify-center gap-1 w-full pt-1"
                >
                  Lihat Seluruh Laporan Harian Site <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
