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
  ChevronDown
} from 'lucide-react';
import { formatRupiah, formatCompactRupiah, formatDateIndo } from '@/lib/utils';
import Image from 'next/image';

export function ProjectDetailDrawer() {
  const { 
    role,
    selectedProjectDetail, 
    setSelectedProjectDetail, 
    updateProjectProgress, 
    sitePhotos, 
    dailyReports 
  } = useProject();

  const [activeTab, setActiveTab] = useState<'overview' | 'milestones' | 'photos' | 'reports'>('overview');
  const [sliderProgress, setSliderProgress] = useState<number>(selectedProjectDetail?.progress || 0);

  if (!selectedProjectDetail) return null;

  const projectPhotos = sitePhotos.filter(p => p.projectId === selectedProjectDetail.id);
  const projectReports = dailyReports.filter(r => r.projectId === selectedProjectDetail.id);

  const profit = selectedProjectDetail.contractValue - selectedProjectDetail.actualCost;
  const currentMargin = Math.round((profit / (selectedProjectDetail.contractValue || 1)) * 100);

  const handleSaveProgress = () => {
    updateProjectProgress(selectedProjectDetail.id, sliderProgress);
    selectedProjectDetail.progress = sliderProgress;
  };

  return (
    <div 
      onClick={() => setSelectedProjectDetail(null)}
      className="fixed inset-0 z-50 flex flex-col justify-end sm:justify-center sm:items-end bg-black/60 backdrop-blur-xs"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-2xl h-[86vh] sm:h-full bg-white rounded-t-2xl sm:rounded-none border-t sm:border-t-0 sm:border-l border-[#E2E8F0] shadow-2xl flex flex-col overflow-hidden text-[#1C2434] transition-all"
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

        {/* Drawer Header TailAdmin with Simple, Easily Reachable Back & Close Navigation */}
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

        {/* Project Title Subheader */}
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
          <div className="text-xs text-[#64748B] mt-0.5 flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span>Partner: <strong className="text-[#1C2434]">{selectedProjectDetail.partnerName}</strong></span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#64748B]" /> {selectedProjectDetail.location}</span>
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
          {[
            { id: 'overview', label: 'Ringkasan & Biaya', icon: Building2 },
            { id: 'milestones', label: `Milestones (${selectedProjectDetail.milestones.length})`, icon: Calendar },
            { id: 'photos', label: `Foto Lapangan (${projectPhotos.length})`, icon: Camera },
            { id: 'reports', label: `Laporan Site (${projectReports.length})`, icon: FileText },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 sm:py-2.5 px-2.5 sm:px-3 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition whitespace-nowrap ${
                  isActive
                    ? 'border-[#3C50E0] text-[#3C50E0]'
                    : 'border-transparent text-[#64748B] hover:text-[#1C2434]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="flex-1 min-h-0 overflow-y-auto modal-scroll p-4 sm:p-6 space-y-4 sm:space-y-5 overscroll-contain">
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
            </div>
          )}

          {activeTab === 'milestones' && (
            <div className="space-y-3 text-xs">
              {selectedProjectDetail.milestones.map((m) => (
                <div 
                  key={m.id}
                  className="p-3.5 bg-white border border-[#E2E8F0] rounded-sm flex items-center justify-between gap-3 hover:border-[#3C50E0] transition"
                >
                  <div className="space-y-1">
                    <div className="font-bold text-[#1C2434]">{m.title}</div>
                    <div className="text-[11px] text-[#64748B] flex items-center gap-2">
                      <span>Target: {formatDateIndo(m.endDate)}</span>
                      <span>•</span>
                      <span>Bobot Fisik: <strong>{m.weight}%</strong></span>
                    </div>
                  </div>
                  <span className={`badge-tail ${
                    m.status === 'Selesai'
                      ? 'badge-tail-success'
                      : m.status === 'Sedang Berjalan'
                      ? 'badge-tail-primary'
                      : 'badge-tail-gray'
                  }`}>
                    {m.status}
                  </span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'photos' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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
          )}

          {activeTab === 'reports' && (
            <div className="space-y-3 text-xs">
              {projectReports.map((dr) => (
                <div key={dr.id} className="tail-card p-4 space-y-2">
                  <div className="flex justify-between font-bold text-xs">
                    <span className="text-[#3C50E0]">{formatDateIndo(dr.date)} • {dr.weather}</span>
                    <span className="text-[#1C2434] font-mono">{dr.tukangCount} Tukang</span>
                  </div>
                  <p className="text-[#64748B] leading-relaxed">{dr.summary}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Mobile Thumb Navigation Footer (Always within easy thumb reach) */}
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
