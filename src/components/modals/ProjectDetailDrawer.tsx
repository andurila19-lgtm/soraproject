'use client';

import React, { useState } from 'react';
import { useProject } from '@/context/ProjectContext';
import { 
  X, 
  ArrowLeft,
  Building2, 
  MapPin, 
  Calendar, 
  Sliders,
  Camera, 
  FileText,
  DollarSign,
  TrendingUp,
  User,
  ChevronDown,
  CreditCard,
  HardHat,
  History,
  Clock,
  Users2,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { formatRupiah, formatCompactRupiah, formatDateIndo } from '@/lib/utils';
import Image from 'next/image';

type DrawerTab = 'overview' | 'milestones' | 'cost-budget' | 'termins' | 'team-vendor' | 'field' | 'history';

export function ProjectDetailDrawer() {
  const { 
    role,
    selectedProjectDetail, 
    setSelectedProjectDetail, 
    updateProjectProgress, 
    sitePhotos, 
    dailyReports,
    expenses,
    termins,
    boqItems,
    workers,
    vendors,
    activityLogs,
    partners,
    addendums,
    opnames,
    updateAddendumStatus,
  } = useProject();

  const [activeTab, setActiveTab] = useState<DrawerTab>('overview');
  const [sliderProgress, setSliderProgress] = useState<number>(selectedProjectDetail?.progress || 0);

  if (!selectedProjectDetail) return null;

  const projectPhotos = sitePhotos.filter(p => p.projectId === selectedProjectDetail.id);
  const projectReports = dailyReports.filter(r => r.projectId === selectedProjectDetail.id);
  const projectExpenses = expenses.filter(e => e.projectId === selectedProjectDetail.id);
  const projectTermins = termins.filter(t => t.projectId === selectedProjectDetail.id);
  const projectBOQ = boqItems.filter(b => b.projectId === selectedProjectDetail.id);
  const projectAddendums = addendums.filter(a => a.projectId === selectedProjectDetail.id);
  const projectOpnames = opnames.filter(o => o.projectId === selectedProjectDetail.id);
  const projectLogs = activityLogs.filter(l => 
    l.entityId === selectedProjectDetail.id || 
    l.entityName.includes(selectedProjectDetail.name.substring(0, 20))
  );
  const projectWorkers = workers.filter(w => w.currentProject === selectedProjectDetail.name || w.currentProject.includes(selectedProjectDetail.name.substring(0, 15)));
  const partnerInfo = partners.find(p => p.id === selectedProjectDetail.partnerId);

  const profit = selectedProjectDetail.contractValue - selectedProjectDetail.actualCost;
  const currentMargin = Math.round((profit / (selectedProjectDetail.contractValue || 1)) * 100);
  const variance = selectedProjectDetail.hppBudget - selectedProjectDetail.actualCost;
  const sisaBudget = selectedProjectDetail.hppBudget - selectedProjectDetail.actualCost;
  const hppUsagePercent = Math.round((selectedProjectDetail.actualCost / (selectedProjectDetail.hppBudget || 1)) * 100);

  const totalBOQHpp = projectBOQ.reduce((acc, b) => acc + b.totalHPP, 0);
  const totalBOQQuotation = projectBOQ.reduce((acc, b) => acc + b.quotationPrice, 0);

  const terminPaid = projectTermins.filter(t => t.status === 'Lunas').reduce((acc, t) => acc + t.amount, 0);
  const terminPending = projectTermins.filter(t => t.status === 'Menunggu Pembayaran' || t.status === 'Jatuh Tempo').reduce((acc, t) => acc + t.amount, 0);

  const handleSaveProgress = () => {
    updateProjectProgress(selectedProjectDetail.id, sliderProgress);
    selectedProjectDetail.progress = sliderProgress;
  };

  const tabs = [
    { id: 'overview' as DrawerTab, label: 'Ringkasan', icon: Building2 },
    { id: 'milestones' as DrawerTab, label: `Timeline (${selectedProjectDetail.milestones.length})`, icon: Calendar },
    { id: 'cost-budget' as DrawerTab, label: 'Biaya & Addendum', icon: DollarSign },
    { id: 'termins' as DrawerTab, label: `Termin (${projectTermins.length})`, icon: CreditCard },
    { id: 'team-vendor' as DrawerTab, label: 'Tim & Vendor', icon: HardHat },
    { id: 'field' as DrawerTab, label: `Lapangan (${projectPhotos.length + projectReports.length + projectOpnames.length})`, icon: Camera },
    { id: 'history' as DrawerTab, label: `Riwayat (${projectLogs.length})`, icon: History },
  ];

  return (
    <div 
      onClick={() => setSelectedProjectDetail(null)}
      className="fixed inset-0 z-50 flex flex-col justify-end sm:justify-center sm:items-end bg-black/60 backdrop-blur-xs overscroll-contain modal-backdrop-lock"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-2xl h-[90dvh] sm:h-full bg-white rounded-t-2xl sm:rounded-none border-t sm:border-t-0 sm:border-l border-[#E2E8F0] shadow-2xl flex flex-col overflow-hidden text-[#1C2434] transition-all modal-content-lock touch-pan-y"
      >
        {/* Mobile Pull Handle Indicator (Tap to Close) */}
        <div 
          onClick={() => setSelectedProjectDetail(null)}
          className="sm:hidden flex flex-col items-center pt-2.5 pb-1 bg-white cursor-pointer select-none border-b border-transparent hover:border-[#E2E8F0]"
          title="Tutup lembar detail"
        >
          <div className="w-12 h-1.5 rounded-full bg-[#CBD5E1]" />
          <span className="text-[10px] text-[#8A99AD] font-medium mt-1 flex items-center gap-1">
            <ChevronDown className="w-3 h-3 text-[#3C50E0]" /> Geser atau ketuk untuk menutup
          </span>
        </div>

        {/* Drawer Header */}
        <div className="px-4 sm:px-6 py-2.5 sm:py-4 border-b border-[#E2E8F0] flex items-center justify-between gap-3 shrink-0 bg-white">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedProjectDetail(null)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EFF2F7] hover:bg-[#E2E8F0] text-[#1C2434] font-semibold text-xs transition active:scale-95 shadow-xs"
              aria-label="Kembali ke Daftar Proyek"
            >
              <ArrowLeft className="w-4 h-4 text-[#3C50E0]" />
              <span>Kembali</span>
            </button>
            <span className="font-mono font-bold text-[#3C50E0] text-xs px-2 py-0.5 bg-[#EFF2F7] rounded">
              {selectedProjectDetail.code}
            </span>
            <span className="badge-tail badge-tail-primary text-xs hidden sm:inline-flex">{selectedProjectDetail.projectType}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedProjectDetail(null)}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-semibold text-[#64748B] hover:text-[#1C2434] hover:bg-[#EFF2F7] transition"
              aria-label="Tutup"
              title="Tutup (Esc)"
            >
              <X className="w-4 h-4" />
              <span className="hidden sm:inline">Tutup</span>
            </button>
          </div>
        </div>

        {/* Project Title Subheader with Partner Chain */}
        <div className="px-4 sm:px-6 py-2.5 sm:py-3 border-b border-[#E2E8F0] bg-[#F8FAFC] shrink-0">
          <div className="flex items-center justify-between gap-2 mb-1 sm:hidden">
            <span className="badge-tail badge-tail-primary text-[11px]">{selectedProjectDetail.projectType}</span>
            <span className={`badge-tail text-[11px] ${
              selectedProjectDetail.health === 'On Track' ? 'badge-tail-success' : 'badge-tail-warning'
            }`}>
              {selectedProjectDetail.health}
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-[#1C2434] leading-snug">{selectedProjectDetail.name}</h2>
          {/* Partner → Project → End User chain */}
          <div className="text-xs text-[#64748B] mt-1 flex flex-wrap items-center gap-1.5">
            <span className="inline-flex items-center gap-1">
              <Users2 className="w-3 h-3 text-[#3C50E0]" />
              <strong className="text-[#1C2434]">{selectedProjectDetail.partnerName}</strong>
            </span>
            <span className="text-[#3C50E0] font-bold">→</span>
            <span className="font-mono text-[10px] text-[#3C50E0] bg-[#EFF2F7] px-1.5 py-0.5 rounded">{selectedProjectDetail.code}</span>
            <span className="text-[#3C50E0] font-bold">→</span>
            <span className="font-medium text-[#1C2434]">{selectedProjectDetail.endUser}</span>
          </div>
          <div className="text-[11px] text-[#64748B] mt-0.5 flex items-center gap-1">
            <MapPin className="w-3 h-3" /> {selectedProjectDetail.location}
          </div>
        </div>

        {/* Real-time Progress Slider Bar */}
        <div className="px-4 sm:px-6 py-2.5 sm:py-3 bg-white border-b border-[#E2E8F0] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-4 text-xs shrink-0">
          <div className="flex items-center gap-2 flex-1">
            <Sliders className="w-4 h-4 text-[#3C50E0] shrink-0" />
            <span className="text-[#1C2434] font-semibold whitespace-nowrap">Update Fisik:</span>
            <input
              type="range"
              min="0"
              max="100"
              value={sliderProgress}
              onChange={(e) => setSliderProgress(Number(e.target.value))}
              className="flex-1 accent-[#3C50E0] cursor-pointer min-h-[28px]"
            />
            <span className="font-bold text-[#3C50E0] font-mono w-10 text-right">{sliderProgress}%</span>
          </div>
          {sliderProgress !== selectedProjectDetail.progress && (
            <button
              onClick={handleSaveProgress}
              className="btn-tail-primary text-xs py-1.5 px-3 min-h-[32px] justify-center shadow-xs"
            >
              Simpan Progres
            </button>
          )}
        </div>

        {/* Tabs Bar */}
        <div className="flex items-center gap-1 sm:gap-2 px-4 sm:px-6 border-b border-[#E2E8F0] bg-white pt-1.5 overflow-x-auto no-scrollbar whitespace-nowrap shrink-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            // Hide financial tabs for non-financial roles
            if ((tab.id === 'cost-budget' || tab.id === 'termins') && role !== 'Owner' && role !== 'Admin Keuangan') return null;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 sm:py-2.5 px-2 sm:px-3 text-xs font-semibold flex items-center gap-1 border-b-2 transition whitespace-nowrap ${
                  isActive
                    ? 'border-[#3C50E0] text-[#3C50E0]'
                    : 'border-transparent text-[#64748B] hover:text-[#1C2434]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="flex-1 min-h-0 overflow-y-auto modal-scroll p-4 sm:p-6 space-y-4 sm:space-y-5 overscroll-contain">
          
          {/* ==================== RINGKASAN ==================== */}
          {activeTab === 'overview' && (
            <div className="space-y-4 text-xs">
              <div className="relative aspect-video rounded-sm overflow-hidden border border-[#E2E8F0]">
                <Image
                  src={selectedProjectDetail.image}
                  alt={selectedProjectDetail.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-xs p-3 text-white text-xs">
                  {selectedProjectDetail.description}
                </div>
              </div>

              {/* Partner Info Card */}
              {partnerInfo && (
                <div className="p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-sm space-y-2">
                  <span className="font-bold text-[10px] text-[#64748B] uppercase tracking-wider">Informasi Partner</span>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[11px] text-[#64748B]">Perusahaan</span>
                      <div className="font-bold text-[#1C2434]">{partnerInfo.name}</div>
                    </div>
                    <div>
                      <span className="text-[11px] text-[#64748B]">Tipe</span>
                      <div className="font-bold text-[#1C2434]">{partnerInfo.type}</div>
                    </div>
                    <div>
                      <span className="text-[11px] text-[#64748B]">PIC</span>
                      <div className="font-bold text-[#1C2434]">{partnerInfo.contactPerson}</div>
                    </div>
                    <div>
                      <span className="text-[11px] text-[#64748B]">Pembayaran</span>
                      <div className={`font-bold ${partnerInfo.paymentScore === 'Sangat Baik' ? 'text-[#10B981]' : partnerInfo.paymentScore === 'Baik' ? 'text-[#3C50E0]' : 'text-[#F0950C]'}`}>{partnerInfo.paymentScore}</div>
                    </div>
                  </div>
                </div>
              )}

              {(role === 'Owner' || role === 'Admin Keuangan') ? (
                <div className="tail-card p-4 space-y-3">
                  <span className="font-bold text-xs text-[#1C2434] uppercase tracking-wider block">
                    Rekapitulasi Keuangan & Margin Kontrak
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                    <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-sm">
                      <span className="text-[11px] text-[#64748B] block">Nilai Kontrak Deal</span>
                      <span className="font-bold font-mono text-sm text-[#1C2434] block mt-0.5">{formatRupiah(selectedProjectDetail.contractValue)}</span>
                    </div>
                    <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-sm">
                      <span className="text-[11px] text-[#64748B] block">Anggaran HPP</span>
                      <span className="font-bold font-mono text-sm text-[#1C2434] block mt-0.5">{formatRupiah(selectedProjectDetail.hppBudget)}</span>
                    </div>
                    <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-sm">
                      <span className="text-[11px] text-[#64748B] block">Realisasi Aktual</span>
                      <span className={`font-bold font-mono text-sm block mt-0.5 ${
                        selectedProjectDetail.actualCost > selectedProjectDetail.hppBudget ? 'text-[#D34053]' : 'text-[#1C2434]'
                      }`}>
                        {formatRupiah(selectedProjectDetail.actualCost)}
                      </span>
                    </div>
                    <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-sm">
                      <span className="text-[11px] text-[#64748B] block">Gross Margin</span>
                      <span className="font-bold font-mono text-sm text-[#10B981] block mt-0.5">{currentMargin}%</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="tail-card p-4 space-y-3">
                  <span className="font-bold text-xs text-[#1C2434] uppercase tracking-wider block">
                    Jadwal & Komando Lapangan
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-sm space-y-1">
                      <span className="text-[11px] text-[#64748B] block">PIC Kepala Produksi</span>
                      <span className="font-bold text-xs text-[#1C2434] block">{selectedProjectDetail.picProduksi}</span>
                    </div>
                    <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-sm space-y-1">
                      <span className="text-[11px] text-[#64748B] block">PIC Site Supervisor</span>
                      <span className="font-bold text-xs text-[#1C2434] block">{selectedProjectDetail.picLapangan}</span>
                    </div>
                    <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-sm space-y-1">
                      <span className="text-[11px] text-[#64748B] block">Mulai SPK</span>
                      <span className="font-mono text-xs text-[#1C2434] block">{formatDateIndo(selectedProjectDetail.startDate)}</span>
                    </div>
                    <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-sm space-y-1">
                      <span className="text-[11px] text-[#64748B] block">Target Handover</span>
                      <span className="font-mono text-xs text-[#3C50E0] font-bold block">{formatDateIndo(selectedProjectDetail.targetCompletion)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Addendum & Scope Changes Section */}
              <div className="tail-card p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-xs text-[#1C2434] uppercase tracking-wider block">
                      Addendum & Perubahan Pekerjaan
                    </span>
                    <span className="text-[11px] text-[#64748B]">
                      Pekerjaan tambahan, perubahan scope, dan penyesuaian nilai kontrak
                    </span>
                  </div>
                  <span className="badge-tail badge-tail-primary text-xs">
                    {projectAddendums.length} Dokumen
                  </span>
                </div>

                {projectAddendums.length > 0 ? (
                  <div className="space-y-2">
                    {projectAddendums.map((add) => (
                      <div key={add.id} className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-sm space-y-1.5">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="font-mono text-[11px] text-[#3C50E0] font-bold">{add.addendumNumber}</span>
                            <h5 className="font-bold text-xs text-[#1C2434] mt-0.5">{add.title}</h5>
                          </div>
                          <span className={`badge-tail text-[10px] shrink-0 ${
                            add.status === 'Disetujui Klien'
                              ? 'badge-tail-success'
                              : add.status === 'Ditolak'
                              ? 'badge-tail-danger'
                              : 'badge-tail-warning'
                          }`}>
                            {add.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#64748B] leading-relaxed">
                          {add.description}
                        </p>
                        <div className="flex items-center justify-between pt-1 border-t border-[#E2E8F0]/60 text-[11px]">
                          <span className="text-[#64748B]">Nilai: <strong className={add.amount >= 0 ? 'text-[#10B981]' : 'text-[#D34053]'}>{add.amount >= 0 ? '+' : ''}{formatRupiah(add.amount)}</strong></span>
                          <span className="text-[#64748B]">Waktu: <strong className="text-[#1C2434]">{(add.timeImpactDays || 0) > 0 ? `+${add.timeImpactDays} hari` : 'Paralel'}</strong></span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 bg-[#F8FAFC] border border-dashed border-[#CBD5E1] rounded text-center text-xs text-[#64748B]">
                    Belum ada addendum pekerjaan tambahan pada proyek ini.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ==================== MILESTONES ==================== */}
          {activeTab === 'milestones' && (
            <div className="space-y-3 text-xs">
              {selectedProjectDetail.milestones.map((m) => (
                <div 
                  key={m.id}
                  className="p-3.5 bg-white border border-[#E2E8F0] rounded-sm space-y-2 hover:border-[#3C50E0] transition"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="font-bold text-[#1C2434]">{m.title}</div>
                      <div className="text-[11px] text-[#64748B] flex items-center gap-2">
                        <span>Target: {formatDateIndo(m.endDate)}</span>
                        <span>•</span>
                        <span>Bobot Fisik: <strong>{m.weight}%</strong></span>
                      </div>
                    </div>
                    <span className={`badge-tail shrink-0 ${
                      m.status === 'Selesai'
                        ? 'badge-tail-success'
                        : m.status === 'Sedang Berjalan'
                        ? 'badge-tail-primary'
                        : 'badge-tail-gray'
                    }`}>
                      {m.status}
                    </span>
                  </div>
                  <div className="w-full bg-[#E2E8F0] h-1.5 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${
                      m.status === 'Selesai' ? 'bg-[#10B981]' : m.status === 'Sedang Berjalan' ? 'bg-[#3C50E0]' : 'bg-[#CBD5E1]'
                    }`} style={{ width: `${m.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ==================== COST & BUDGET ==================== */}
          {activeTab === 'cost-budget' && (
            <div className="space-y-4 text-xs">
              {/* Summary Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-sm">
                  <span className="text-[11px] text-[#64748B] block">Budget HPP</span>
                  <span className="font-bold font-mono text-sm text-[#1C2434] block mt-0.5">{formatCompactRupiah(selectedProjectDetail.hppBudget)}</span>
                </div>
                <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-sm">
                  <span className="text-[11px] text-[#64748B] block">Actual Cost</span>
                  <span className={`font-bold font-mono text-sm block mt-0.5 ${hppUsagePercent > 100 ? 'text-[#D34053]' : 'text-[#1C2434]'}`}>{formatCompactRupiah(selectedProjectDetail.actualCost)}</span>
                </div>
                <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-sm">
                  <span className="text-[11px] text-[#64748B] block">Variance</span>
                  <span className={`font-bold font-mono text-sm block mt-0.5 ${variance >= 0 ? 'text-[#10B981]' : 'text-[#D34053]'}`}>
                    {variance >= 0 ? '+' : '-'}{formatCompactRupiah(Math.abs(variance))}
                  </span>
                </div>
                <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-sm">
                  <span className="text-[11px] text-[#64748B] block">Sisa Budget</span>
                  <span className={`font-bold font-mono text-sm block mt-0.5 ${sisaBudget >= 0 ? 'text-[#10B981]' : 'text-[#D34053]'}`}>{formatCompactRupiah(Math.max(0, sisaBudget))}</span>
                </div>
                <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-sm">
                  <span className="text-[11px] text-[#64748B] block">Estimasi Margin</span>
                  <span className="font-bold font-mono text-sm text-[#10B981] block mt-0.5">{currentMargin}%</span>
                </div>
                <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-sm">
                  <span className="text-[11px] text-[#64748B] block">Penyerapan HPP</span>
                  <span className={`font-bold font-mono text-sm block mt-0.5 ${hppUsagePercent > 95 ? 'text-[#D34053]' : 'text-[#3C50E0]'}`}>{hppUsagePercent}%</span>
                </div>
              </div>

              {/* HPP Progress Bar */}
              <div className="p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-sm space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-[#64748B]">Penyerapan Anggaran HPP</span>
                  <span className={`font-mono font-bold ${hppUsagePercent > 95 ? 'text-[#D34053]' : 'text-[#3C50E0]'}`}>{hppUsagePercent}%</span>
                </div>
                <div className="w-full bg-[#E2E8F0] h-2.5 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all ${hppUsagePercent > 95 ? 'bg-[#D34053]' : hppUsagePercent > 80 ? 'bg-[#F0950C]' : 'bg-[#3C50E0]'}`} style={{ width: `${Math.min(100, hppUsagePercent)}%` }} />
                </div>
              </div>

              {/* BOQ Summary */}
              <div className="p-3.5 bg-white border border-[#E2E8F0] rounded-sm space-y-2">
                <span className="font-bold text-[10px] text-[#64748B] uppercase tracking-wider">Ringkasan BOQ → Quotation → Margin</span>
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center">
                    <span className="text-[11px] text-[#64748B] block">Total HPP BOQ</span>
                    <span className="font-bold font-mono text-[#1C2434] block">{formatCompactRupiah(totalBOQHpp)}</span>
                  </div>
                  <div className="text-center">
                    <span className="text-[11px] text-[#64748B] block">Total Quotation</span>
                    <span className="font-bold font-mono text-[#3C50E0] block">{formatCompactRupiah(totalBOQQuotation)}</span>
                  </div>
                  <div className="text-center">
                    <span className="text-[11px] text-[#64748B] block">Margin BOQ</span>
                    <span className="font-bold font-mono text-[#10B981] block">{totalBOQHpp > 0 ? Math.round(((totalBOQQuotation - totalBOQHpp) / totalBOQQuotation) * 100) : 0}%</span>
                  </div>
                </div>
              </div>

              {/* Recent Expenses */}
              <div className="space-y-2">
                <span className="font-bold text-[10px] text-[#64748B] uppercase tracking-wider">Pengeluaran Terbaru</span>
                {projectExpenses.slice(0, 5).map((exp) => (
                  <div key={exp.id} className="p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-sm flex items-center justify-between">
                    <div className="min-w-0">
                      <div className="font-bold text-[#1C2434] text-xs truncate">{exp.description}</div>
                      <div className="text-[11px] text-[#64748B]">{exp.vendorOrRecipient} • {formatDateIndo(exp.date)}</div>
                    </div>
                    <div className="text-right shrink-0 ml-3">
                      <div className="font-bold font-mono text-xs text-[#1C2434]">{formatCompactRupiah(exp.actualAmount)}</div>
                      <span className={`badge-tail text-[9px] ${exp.status === 'Approved' ? 'badge-tail-success' : 'badge-tail-danger'}`}>{exp.status}</span>
                    </div>
                  </div>
                ))}
                {projectExpenses.length === 0 && (
                  <div className="text-center text-[#64748B] py-4 italic">Belum ada pengeluaran tercatat</div>
                )}
              </div>

              {/* Addendums & Change Orders on Cost Tab */}
              <div className="space-y-2 pt-2 border-t border-[#E2E8F0]">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[10px] text-[#64748B] uppercase tracking-wider">
                    Addendum Kontrak & Change Order ({projectAddendums.length})
                  </span>
                  <span className="text-[11px] text-[#3C50E0] font-semibold">Penyesuaian Biaya & Scope</span>
                </div>
                {projectAddendums.map((add) => (
                  <div key={add.id} className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-sm space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-mono text-[11px] text-[#3C50E0] font-bold">{add.addendumNumber} • {add.type}</div>
                        <div className="font-bold text-xs text-[#1C2434]">{add.title}</div>
                      </div>
                      <span className={`badge-tail text-[10px] shrink-0 ${
                        add.status === 'Disetujui Klien' ? 'badge-tail-success' : add.status === 'Ditolak' ? 'badge-tail-danger' : 'badge-tail-warning'
                      }`}>
                        {add.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs pt-1 border-t border-[#E2E8F0]/60">
                      <span className="font-mono font-bold text-xs text-[#10B981]">{formatRupiah(add.amount)}</span>
                      {add.status === 'Waiting Approval' && (role === 'Owner' || role === 'Admin Keuangan') && (
                        <button
                          onClick={() => updateAddendumStatus(add.id, 'Disetujui Klien')}
                          className="px-2.5 py-1 rounded bg-[#10B981] hover:bg-[#059669] text-white font-bold text-xs transition"
                        >
                          Setujui Addendum
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {projectAddendums.length === 0 && (
                  <div className="text-center text-[#64748B] py-3 italic text-xs">Belum ada addendum biaya untuk proyek ini</div>
                )}
              </div>
            </div>
          )}

          {/* ==================== TERMINS ==================== */}
          {activeTab === 'termins' && (
            <div className="space-y-4 text-xs">
              {/* Termin Summary */}
              <div className="grid grid-cols-3 gap-2.5">
                <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-sm text-center">
                  <span className="text-[11px] text-[#64748B] block">Terbayar</span>
                  <span className="font-bold font-mono text-sm text-[#10B981] block mt-0.5">{formatCompactRupiah(terminPaid)}</span>
                </div>
                <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-sm text-center">
                  <span className="text-[11px] text-[#64748B] block">Tertunggak</span>
                  <span className="font-bold font-mono text-sm text-[#F0950C] block mt-0.5">{formatCompactRupiah(terminPending)}</span>
                </div>
                <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-sm text-center">
                  <span className="text-[11px] text-[#64748B] block">Total Kontrak</span>
                  <span className="font-bold font-mono text-sm text-[#1C2434] block mt-0.5">{formatCompactRupiah(selectedProjectDetail.contractValue)}</span>
                </div>
              </div>

              {/* Termin List */}
              {projectTermins.map((t) => (
                <div key={t.id} className="p-3.5 bg-white border border-[#E2E8F0] rounded-sm space-y-2 hover:border-[#3C50E0] transition">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-bold text-[#1C2434]">
                        {t.terminName.includes('%') ? t.terminName : `${t.terminName} (${t.percentage}%)`}
                      </div>
                      <div className="text-[11px] text-[#64748B] mt-0.5">
                        <span>Trigger: {t.triggerCondition}</span>
                      </div>
                      <div className="text-[11px] text-[#64748B]">
                        Invoice: <span className="font-mono text-[#3C50E0]">{t.invoiceNumber}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-bold font-mono text-sm text-[#1C2434]">{formatCompactRupiah(t.amount)}</div>
                      <span className={`badge-tail text-[10px] ${
                        t.status === 'Lunas' ? 'badge-tail-success' : 
                        t.status === 'Jatuh Tempo' ? 'badge-tail-danger' : 
                        t.status === 'Menunggu Pembayaran' ? 'badge-tail-warning' : 'badge-tail-gray'
                      }`}>{t.status}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#64748B] pt-1 border-t border-[#E2E8F0]">
                    <span>Jatuh tempo: <strong className="text-[#1C2434]">{formatDateIndo(t.dueDate)}</strong></span>
                    {t.paidDate && <span className="text-[#10B981]">Dibayar: {formatDateIndo(t.paidDate)}</span>}
                  </div>
                </div>
              ))}
              {projectTermins.length === 0 && (
                <div className="text-center text-[#64748B] py-4 italic">Belum ada termin pembayaran</div>
              )}
            </div>
          )}

          {/* ==================== TIM & VENDOR ==================== */}
          {activeTab === 'team-vendor' && (
            <div className="space-y-4 text-xs">
              {/* PIC */}
              <div className="space-y-2">
                <span className="font-bold text-[10px] text-[#64748B] uppercase tracking-wider">PIC Proyek</span>
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-sm">
                    <span className="text-[11px] text-[#64748B] block">Kepala Produksi</span>
                    <span className="font-bold text-[#1C2434] block mt-0.5">{selectedProjectDetail.picProduksi}</span>
                  </div>
                  <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-sm">
                    <span className="text-[11px] text-[#64748B] block">Site Supervisor</span>
                    <span className="font-bold text-[#1C2434] block mt-0.5">{selectedProjectDetail.picLapangan}</span>
                  </div>
                </div>
              </div>

              {/* Workers */}
              <div className="space-y-2">
                <span className="font-bold text-[10px] text-[#64748B] uppercase tracking-wider">Tenaga Kerja di Proyek ({projectWorkers.length})</span>
                {projectWorkers.map((w) => (
                  <div key={w.id} className="p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-sm flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#EFF2F7] flex items-center justify-center text-[#3C50E0]">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-[#1C2434]">{w.name}</div>
                        <div className="text-[11px] text-[#64748B]">{w.specialty}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`badge-tail text-[10px] ${w.status === 'Aktif di Site' ? 'badge-tail-success' : w.status === 'Workshop Cibubur' ? 'badge-tail-primary' : 'badge-tail-gray'}`}>{w.status}</span>
                      <div className="font-mono text-[11px] text-[#64748B] mt-0.5">Rp {w.dailyRate.toLocaleString('id-ID')}/hr</div>
                    </div>
                  </div>
                ))}
                {projectWorkers.length === 0 && (
                  <div className="text-center text-[#64748B] py-3 italic text-xs">Belum ada tukang yang ditugaskan</div>
                )}
              </div>

              {/* Vendors */}
              <div className="space-y-2">
                <span className="font-bold text-[10px] text-[#64748B] uppercase tracking-wider">Vendor & Supplier</span>
                {vendors.map((v) => (
                  <div key={v.id} className="p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-sm flex items-center justify-between">
                    <div>
                      <div className="font-bold text-[#1C2434]">{v.name}</div>
                      <div className="text-[11px] text-[#64748B]">{v.category} • {v.city}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-[11px] text-[#3C50E0] font-bold">{v.activeOrders} PO Aktif</div>
                      <div className="text-[11px] text-[#64748B]">{v.paymentTerm}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ==================== LAPANGAN (Photos + Reports) ==================== */}
          {activeTab === 'field' && (
            <div className="space-y-4">
              {/* Photos */}
              {projectPhotos.length > 0 && (
                <div className="space-y-2">
                  <span className="font-bold text-[10px] text-[#64748B] uppercase tracking-wider">Foto Dokumentasi Lapangan</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {projectPhotos.map((photo) => (
                      <div key={photo.id} className="tail-card overflow-hidden">
                        <div className="relative aspect-video">
                          <Image src={photo.imageUrl} alt={photo.area} fill className="object-cover" />
                        </div>
                        <div className="p-3 space-y-1">
                          <div className="font-bold text-xs text-[#1C2434]">📍 {photo.area}</div>
                          <p className="text-[#64748B] text-xs">{photo.caption}</p>
                          <div className="text-[11px] text-[#64748B] font-mono pt-1">{formatDateIndo(photo.date)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reports */}
              {projectReports.length > 0 && (
                <div className="space-y-2">
                  <span className="font-bold text-[10px] text-[#64748B] uppercase tracking-wider">Laporan Harian Site</span>
                  {projectReports.map((dr) => (
                    <div key={dr.id} className="tail-card p-4 space-y-2 text-xs">
                      <div className="flex justify-between font-bold text-xs">
                        <span className="text-[#3C50E0]">{formatDateIndo(dr.date)} • {dr.weather}</span>
                        <span className="text-[#1C2434] font-mono">{dr.tukangCount} Tukang</span>
                      </div>
                      <p className="text-[#64748B] leading-relaxed">{dr.summary}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Hasil Opname Bersama Lapangan */}
              <div className="space-y-2 pt-2 border-t border-[#E2E8F0]">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[10px] text-[#64748B] uppercase tracking-wider">
                    Hasil Joint Opname Site & Klien ({projectOpnames.length})
                  </span>
                  <span className="badge-tail badge-tail-primary text-[10px]">BA Opname Lapangan</span>
                </div>
                {projectOpnames.map((op) => (
                  <div key={op.id} className="tail-card p-3 space-y-2 text-xs">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-bold text-[#1C2434]">{op.category} — {op.itemDescription}</div>
                        <div className="text-[11px] text-[#64748B] font-mono mt-0.5">{formatDateIndo(op.date)} • {op.verifiedBy}</div>
                      </div>
                      <span className={`badge-tail text-[10px] shrink-0 ${
                        op.status === 'Disetujui Klien' ? 'badge-tail-success' : op.status === 'Ditolak' ? 'badge-tail-danger' : 'badge-tail-warning'
                      }`}>
                        {op.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-2 p-2 bg-[#F8FAFC] rounded border border-[#E2E8F0] font-mono text-[11px] text-center">
                      <div>
                        <span className="text-[10px] text-[#64748B] block">Vol Awal</span>
                        <span className="font-bold text-[#1C2434]">{op.initialVolume} {op.unit}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#64748B] block">Vol Aktual</span>
                        <span className="font-bold text-[#3C50E0]">{op.actualVolume} {op.unit}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#64748B] block">Selisih</span>
                        <span className={`font-bold ${op.differenceVolume >= 0 ? 'text-[#10B981]' : 'text-[#D34053]'}`}>
                          {op.differenceVolume >= 0 ? '+' : ''}{op.differenceVolume} {op.unit}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#64748B] block">Nilai</span>
                        <span className={`font-bold ${op.adjustmentValue >= 0 ? 'text-[#10B981]' : 'text-[#D34053]'}`}>
                          {op.adjustmentValue >= 0 ? '+' : ''}{formatCompactRupiah(op.adjustmentValue)}
                        </span>
                      </div>
                    </div>
                    <p className="text-[11px] text-[#64748B] italic">Catatan: &quot;{op.notes}&quot;</p>
                  </div>
                ))}
                {projectOpnames.length === 0 && (
                  <div className="text-center text-[#64748B] py-3 italic text-xs">Belum ada catatan opname bersama pada proyek ini</div>
                )}
              </div>

              {projectPhotos.length === 0 && projectReports.length === 0 && projectOpnames.length === 0 && (
                <div className="text-center text-[#64748B] py-6 italic text-xs">Belum ada dokumentasi lapangan</div>
              )}
            </div>
          )}

          {/* ==================== RIWAYAT AKTIVITAS ==================== */}
          {activeTab === 'history' && (
            <div className="space-y-3 text-xs">
              <span className="font-bold text-[10px] text-[#64748B] uppercase tracking-wider block">
                Timeline Aktivitas Proyek
              </span>
              {projectLogs.map((log) => (
                <div key={log.id} className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-sm space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#EFF2F7] flex items-center justify-center text-[#3C50E0]">
                        <User className="w-3 h-3" />
                      </div>
                      <span className="font-bold text-[#1C2434]">{log.userName}</span>
                      <span className="badge-tail badge-tail-gray text-[9px]">{log.role}</span>
                    </div>
                    <span className="text-[10px] text-[#64748B] font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(log.timestamp).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })}, {new Date(log.timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="font-bold text-[#3C50E0]">{log.action}</div>
                  <div className="text-[#64748B]">{log.details}</div>
                </div>
              ))}
              {projectLogs.length === 0 && (
                <div className="text-center text-[#64748B] py-4 italic">Belum ada riwayat aktivitas</div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Thumb Navigation Footer */}
        <div className="sm:hidden px-4 py-2.5 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-between shrink-0 pb-[max(0.625rem,env(safe-area-inset-bottom))]">
          <span className="text-xs text-[#64748B] font-mono">
            Progres: <strong className="text-[#3C50E0]">{selectedProjectDetail.progress}%</strong>
          </span>
          <button
            type="button"
            onClick={() => setSelectedProjectDetail(null)}
            className="btn-tail-secondary py-1.5 px-4 text-xs font-semibold flex items-center gap-1.5 shadow-xs"
          >
            <ArrowLeft className="w-4 h-4 text-[#3C50E0]" />
            <span>Tutup & Kembali</span>
          </button>
        </div>
      </div>
    </div>
  );
}
