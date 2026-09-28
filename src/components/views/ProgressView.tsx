'use client';

import React, { useState } from 'react';
import { useProject } from '@/context/ProjectContext';
import { 
  CalendarRange, 
  Camera, 
  FileText, 
  Plus, 
  X,
  MapPin,
  CheckCircle2,
  Calendar,
  CloudSun
} from 'lucide-react';
import { formatDateIndo } from '@/lib/utils';
import Image from 'next/image';

export function ProgressView() {
  const { 
    projects, 
    sitePhotos, 
    dailyReports, 
    selectedProjectId, 
    setSelectedProjectId,
    addSitePhoto,
    addDailyReport
  } = useProject();

  const [activeSubTab, setActiveSubTab] = useState<'photos' | 'timeline' | 'daily-report'>('photos');
  const [photoFilter, setPhotoFilter] = useState<string>('Semua');
  const [isUploadPhotoOpen, setIsUploadPhotoOpen] = useState(false);
  const [isDailyReportOpen, setIsDailyReportOpen] = useState(false);

  const activeProject = selectedProjectId === 'all' 
    ? projects[0] 
    : projects.find(p => p.id === selectedProjectId) || projects[0];

  const filteredPhotos = sitePhotos.filter((sp) => {
    const matchesProject = selectedProjectId === 'all' || sp.projectId === selectedProjectId;
    const matchesType = photoFilter === 'Semua' || sp.type === photoFilter;
    return matchesProject && matchesType;
  });

  const filteredReports = dailyReports.filter((dr) => 
    selectedProjectId === 'all' || dr.projectId === selectedProjectId
  );

  return (
    <div className="space-y-6">
      {/* TailAdmin Page Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C2434]">
            Dokumentasi & Progres Fisik
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            Audit Foto Lapangan On-Site, Kurva Prestasi Milestone, dan Rekap Log Mandor Harian
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
          <nav>
            <ol className="hidden sm:flex items-center gap-1.5 text-xs text-[#64748B] mr-2">
              <li><span>Dashboard</span></li>
              <li>/</li>
              <li className="text-[#3C50E0] font-semibold">Progres Fisik</li>
            </ol>
          </nav>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setIsUploadPhotoOpen(true)}
              className="btn-tail-secondary text-xs justify-center py-2.5 px-4 min-h-[38px]"
            >
              <Camera className="w-4 h-4 text-[#3C50E0]" />
              <span>Upload Foto Site</span>
            </button>
            <button
              onClick={() => setIsDailyReportOpen(true)}
              className="btn-tail-primary text-xs justify-center py-2.5 px-4 min-h-[38px]"
            >
              <Plus className="w-4 h-4" />
              <span>+ Input Laporan Harian</span>
            </button>
          </div>
        </div>
      </div>

      {/* Control Bar: Project Select & Subtab Navigation */}
      <div className="tail-card p-3 sm:p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full md:w-auto">
          <span className="text-xs font-semibold text-[#1C2434] whitespace-nowrap">Filter Proyek:</span>
          <select
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="tail-input text-xs w-full md:w-auto min-w-[220px] min-h-[38px]"
          >
            <option value="all">Semua Proyek Aktif</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>{p.code} - {p.name}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center bg-[#F1F5F9] p-1 rounded-sm border border-[#E2E8F0] overflow-x-auto w-full md:w-auto no-scrollbar">
          <button
            onClick={() => setActiveSubTab('photos')}
            className={`flex-1 sm:flex-initial text-center px-3 py-2 sm:py-1.5 rounded-xs text-xs font-semibold transition whitespace-nowrap min-h-[36px] flex items-center justify-center ${
              activeSubTab === 'photos'
                ? 'bg-white text-[#3C50E0] shadow-sm'
                : 'text-[#64748B] hover:text-[#1C2434]'
            }`}
          >
            Foto Lapangan ({filteredPhotos.length})
          </button>
          <button
            onClick={() => setActiveSubTab('timeline')}
            className={`flex-1 sm:flex-initial text-center px-3 py-2 sm:py-1.5 rounded-xs text-xs font-semibold transition whitespace-nowrap min-h-[36px] flex items-center justify-center ${
              activeSubTab === 'timeline'
                ? 'bg-white text-[#3C50E0] shadow-sm'
                : 'text-[#64748B] hover:text-[#1C2434]'
            }`}
          >
            Milestone Timeline
          </button>
          <button
            onClick={() => setActiveSubTab('daily-report')}
            className={`flex-1 sm:flex-initial text-center px-3 py-2 sm:py-1.5 rounded-xs text-xs font-semibold transition whitespace-nowrap min-h-[36px] flex items-center justify-center ${
              activeSubTab === 'daily-report'
                ? 'bg-white text-[#3C50E0] shadow-sm'
                : 'text-[#64748B] hover:text-[#1C2434]'
            }`}
          >
            Laporan Harian ({filteredReports.length})
          </button>
        </div>
      </div>

      {/* Subtab: Photos Gallery */}
      {activeSubTab === 'photos' && (
        <div className="space-y-4">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 no-scrollbar">
            {['Semua', 'Sebelum', 'Dalam Proses', 'Selesai', 'Temuan / Issue'].map((type) => (
              <button
                key={type}
                onClick={() => setPhotoFilter(type)}
                className={`text-xs px-3 py-2 rounded-sm font-medium transition whitespace-nowrap min-h-[36px] ${
                  photoFilter === type
                    ? 'bg-[#3C50E0] text-white font-semibold'
                    : 'bg-white border border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC]'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredPhotos.map((photo) => (
              <div key={photo.id} className="tail-card overflow-hidden group hover:border-[#3C50E0] transition-all">
                <div className="relative aspect-video w-full bg-[#EFF2F7] overflow-hidden">
                  <Image
                    src={photo.imageUrl}
                    alt={photo.area}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <span className={`absolute top-3 right-3 badge-tail ${
                    photo.type === 'Selesai'
                      ? 'badge-tail-success'
                      : photo.type === 'Dalam Proses'
                      ? 'badge-tail-primary'
                      : 'badge-tail-warning'
                  } shadow-sm backdrop-blur-xs`}>
                    {photo.type}
                  </span>
                </div>
                <div className="p-4 space-y-2">
                  <div className="font-bold text-sm text-[#1C2434] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#3C50E0]" />
                    {photo.area}
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed line-clamp-2">{photo.caption}</p>
                  <div className="flex justify-between items-center text-[11px] text-[#64748B] pt-3 border-t border-[#E2E8F0]">
                    <span>Oleh: <strong className="text-[#1C2434]">{photo.uploader.split(' ')[0]}</strong></span>
                    <span>{formatDateIndo(photo.date)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Subtab: Milestone Timeline */}
      {activeSubTab === 'timeline' && (
        <div className="tail-card">
          <div className="tail-card-header">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#1C2434]">
                Checklist Milestone: {activeProject.name}
              </h3>
              <p className="text-xs text-[#64748B] mt-0.5">
                Rencana bobot kemajuan fisik dan persentase realisasi aktual
              </p>
            </div>
            <span className="badge-tail badge-tail-primary text-xs">
              Total Progres: {activeProject.progress}% Selesai
            </span>
          </div>

          <div className="p-4 sm:p-6 space-y-4">
            {activeProject.milestones.map((ms, idx) => (
              <div key={ms.id} className="p-3 sm:p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-sm space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                  <span className="font-bold text-sm text-[#1C2434]">
                    {idx + 1}. {ms.title}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className={`badge-tail ${
                      ms.status === 'Selesai' ? 'badge-tail-success' : 'badge-tail-warning'
                    }`}>
                      {ms.status}
                    </span>
                    <span className="font-mono font-bold text-xs text-[#1C2434]">{ms.progress}%</span>
                  </div>
                </div>
                <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${ms.status === 'Selesai' ? 'bg-[#10B981]' : 'bg-[#3C50E0]'}`}
                    style={{ width: `${ms.progress}%` }}
                  />
                </div>
                <div className="flex flex-col sm:flex-row justify-between text-xs text-[#64748B] gap-1">
                  <span>Periode: {formatDateIndo(ms.startDate)} - {formatDateIndo(ms.endDate)}</span>
                  <span>Bobot Proyek: <strong className="text-[#1C2434]">{ms.weight}%</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Subtab: Daily Reports */}
      {activeSubTab === 'daily-report' && (
        <div className="space-y-4">
          {filteredReports.map((dr) => (
            <div key={dr.id} className="tail-card p-4 sm:p-5 space-y-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#E2E8F0] pb-3">
                <div className="flex items-center gap-2">
                  <CloudSun className="w-4 h-4 text-[#F0950C]" />
                  <span className="font-bold text-sm text-[#1C2434]">{formatDateIndo(dr.date)}</span>
                  <span className="badge-tail badge-tail-primary text-xs">{dr.weather}</span>
                </div>
                <span className="text-xs font-semibold text-[#1C2434] bg-[#EFF2F7] px-2.5 py-1 rounded">
                  {dr.tukangCount} Tukang Lapangan
                </span>
              </div>
              <p className="text-xs text-[#1C2434] leading-relaxed">{dr.summary}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-sm">
                  <strong className="text-xs text-[#10B981] block mb-1">Material Masuk Site:</strong>
                  <span className="text-xs text-[#64748B]">{dr.materialsReceived}</span>
                </div>
                <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-sm">
                  <strong className="text-xs text-[#F0950C] block mb-1">Kendala / Isu Lapangan:</strong>
                  <span className="text-xs text-[#64748B]">{dr.obstacles}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Photo Modal */}
      {isUploadPhotoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-sm border border-[#E2E8F0] shadow-xl overflow-hidden max-h-[92vh] flex flex-col">
            <div className="px-4 sm:px-6 py-4 border-b border-[#E2E8F0] flex items-center justify-between shrink-0">
              <h3 className="font-bold text-base text-[#1C2434]">
                Upload Foto Dokumentasi Site
              </h3>
              <button onClick={() => setIsUploadPhotoOpen(false)} className="text-[#64748B] hover:text-[#1C2434] p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 sm:p-6 space-y-3 sm:space-y-4 text-xs overflow-y-auto">
              <div>
                <label className="block text-[#1C2434] font-semibold mb-1">Area / Ruangan</label>
                <input type="text" placeholder="Contoh: Bar Counter / Board Room" className="tail-input min-h-[38px]" />
              </div>
              <div>
                <label className="block text-[#1C2434] font-semibold mb-1">Status Progres</label>
                <select className="tail-input min-h-[38px]">
                  <option value="Dalam Proses">Dalam Proses</option>
                  <option value="Selesai">Selesai</option>
                  <option value="Sebelum">Sebelum</option>
                  <option value="Temuan / Issue">Temuan / Issue</option>
                </select>
              </div>
              <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3 pt-3 border-t border-[#E2E8F0]">
                <button
                  onClick={() => setIsUploadPhotoOpen(false)}
                  className="btn-tail-secondary justify-center py-2.5 min-h-[38px]"
                >
                  Batal
                </button>
                <button
                  onClick={() => {
                    addSitePhoto({
                      projectId: activeProject.id,
                      area: 'Area Kerja & Ceiling Baffle',
                      caption: 'Instalasi framing partisi & finishing',
                      uploader: 'Pengawas Lapangan (Sora)',
                      imageUrl: '/images/project-office.jpg',
                      type: 'Dalam Proses',
                    });
                    setIsUploadPhotoOpen(false);
                  }}
                  className="btn-tail-primary justify-center py-2.5 min-h-[38px]"
                >
                  Unggah Foto
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Daily Report Modal */}
      {isDailyReportOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-sm border border-[#E2E8F0] shadow-xl overflow-hidden max-h-[92vh] flex flex-col">
            <div className="px-4 sm:px-6 py-4 border-b border-[#E2E8F0] flex items-center justify-between shrink-0">
              <h3 className="font-bold text-base text-[#1C2434]">
                Input Laporan Harian Site
              </h3>
              <button onClick={() => setIsDailyReportOpen(false)} className="text-[#64748B] hover:text-[#1C2434] p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 sm:p-6 space-y-3 sm:space-y-4 text-xs overflow-y-auto">
              <div>
                <label className="block text-[#1C2434] font-semibold mb-1">Jumlah Tukang Hadir</label>
                <input type="number" defaultValue={10} className="tail-input min-h-[38px]" />
              </div>
              <div>
                <label className="block text-[#1C2434] font-semibold mb-1">Ringkasan Pekerjaan Hari Ini</label>
                <textarea rows={2} placeholder="Pemasangan HPL & fitting kabel LAN..." className="tail-input" />
              </div>
              <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3 pt-3 border-t border-[#E2E8F0]">
                <button
                  onClick={() => setIsDailyReportOpen(false)}
                  className="btn-tail-secondary justify-center py-2.5 min-h-[38px]"
                >
                  Batal
                </button>
                <button
                  onClick={() => {
                    addDailyReport({
                      projectId: activeProject.id,
                      weather: 'Cerah',
                      tukangCount: 12,
                      pic: 'Pengawas Lapangan (Sora)',
                      summary: 'Pekerjaan partisi kaca dan setting built-in cabinet berjalan normal.',
                      materialsReceived: 'Plywood 18mm 20 lembar',
                      obstacles: 'Tidak ada kendala',
                    });
                    setIsDailyReportOpen(false);
                  }}
                  className="btn-tail-primary justify-center py-2.5 min-h-[38px]"
                >
                  Simpan Laporan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
