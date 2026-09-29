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
  CloudSun,
  ClipboardCheck,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { formatDateIndo, formatRupiah, formatCompactRupiah } from '@/lib/utils';
import { TableScrollWrapper } from '@/components/TableScrollWrapper';
import Image from 'next/image';

export function ProgressView() {
  const { 
    projects, 
    sitePhotos, 
    dailyReports, 
    opnames,
    addOpnameItem,
    updateOpnameStatus,
    selectedProjectId, 
    setSelectedProjectId,
    addSitePhoto,
    addDailyReport,
    role
  } = useProject();

  const [activeSubTab, setActiveSubTab] = useState<'photos' | 'timeline' | 'daily-report' | 'opname'>('photos');
  const [photoFilter, setPhotoFilter] = useState<string>('Semua');
  const [isUploadPhotoOpen, setIsUploadPhotoOpen] = useState(false);
  const [isDailyReportOpen, setIsDailyReportOpen] = useState(false);
  const [isOpnameModalOpen, setIsOpnameModalOpen] = useState(false);

  // Form states for Upload Photo Modal
  const [photoArea, setPhotoArea] = useState('');
  const [photoCaption, setPhotoCaption] = useState('');
  const [photoStatus, setPhotoStatus] = useState<'Dalam Proses' | 'Selesai' | 'Sebelum' | 'Temuan / Issue'>('Dalam Proses');

  // Form states for Daily Report Modal
  const [drTukangCount, setDrTukangCount] = useState<number>(10);
  const [drWeather, setDrWeather] = useState<'Cerah' | 'Hujan' | 'Mendung'>('Cerah');
  const [drSummary, setDrSummary] = useState('');
  const [drMaterials, setDrMaterials] = useState('');
  const [drObstacles, setDrObstacles] = useState('Tidak ada kendala');

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

  const filteredOpnames = opnames.filter((opn) => 
    selectedProjectId === 'all' || opn.projectId === selectedProjectId
  );

  const totalOpnameAdjustment = filteredOpnames.reduce((acc, o) => acc + o.adjustmentValue, 0);
  const approvedOpnamesCount = filteredOpnames.filter(o => o.status === 'Disetujui Klien').length;
  const pendingOpnamesCount = filteredOpnames.filter(o => o.status === 'Waiting Approval').length;

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
            {activeSubTab === 'opname' ? (
              <button
                onClick={() => setIsOpnameModalOpen(true)}
                className="btn-tail-primary text-xs justify-center py-2.5 px-4 min-h-[38px]"
              >
                <ClipboardCheck className="w-4 h-4" />
                <span>+ Catat Hasil Opname Bersama</span>
              </button>
            ) : (
              <>
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
              </>
            )}
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
          <button
            onClick={() => setActiveSubTab('opname')}
            className={`flex-1 sm:flex-initial text-center px-3 py-2 sm:py-1.5 rounded-xs text-xs font-semibold transition whitespace-nowrap min-h-[36px] flex items-center justify-center gap-1.5 ${
              activeSubTab === 'opname'
                ? 'bg-white text-[#3C50E0] shadow-sm font-bold'
                : 'text-[#64748B] hover:text-[#1C2434]'
            }`}
          >
            <ClipboardCheck className="w-3.5 h-3.5" />
            <span>Opname & Penyesuaian ({filteredOpnames.length})</span>
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

          {filteredPhotos.length === 0 ? (
            <div className="tail-card p-12 text-center">
              <Camera className="w-12 h-12 text-[#94A3B8] mx-auto mb-3" />
              <h3 className="text-base font-bold text-[#1C2434]">Belum Ada Dokumentasi Lapangan</h3>
              <p className="text-xs text-[#64748B] mt-1 max-w-sm mx-auto">
                Unggah foto sebelum pekerjaan, saat proses fit-out, atau temuan lapangan on-site.
              </p>
              <button
                onClick={() => setIsUploadPhotoOpen(true)}
                className="mt-4 tail-btn tail-btn-primary text-xs py-2 px-4 mx-auto"
              >
                + Upload Foto Lapangan
              </button>
            </div>
          ) : (
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
          )}
        </div>
      )}

      {/* Subtab: Milestone Timeline */}
      {activeSubTab === 'timeline' && (
        <div className="tail-card">
          {!activeProject ? (
            <div className="p-12 text-center">
              <CalendarRange className="w-12 h-12 text-[#94A3B8] mx-auto mb-3" />
              <h3 className="text-base font-bold text-[#1C2434]">Belum Ada Proyek Aktif</h3>
              <p className="text-xs text-[#64748B] mt-1 max-w-sm mx-auto">
                Checklist milestone timeline akan aktif otomatis saat proyek baru dibuat.
              </p>
            </div>
          ) : (
            <>
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
                {(activeProject.milestones || []).map((ms, idx) => (
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
            </>
          )}
        </div>
      )}

      {/* Subtab: Daily Reports */}
      {activeSubTab === 'daily-report' && (
        <div className="space-y-4">
          {filteredReports.length === 0 ? (
            <div className="tail-card p-12 text-center">
              <FileText className="w-12 h-12 text-[#94A3B8] mx-auto mb-3" />
              <h3 className="text-base font-bold text-[#1C2434]">Belum Ada Laporan Harian Mandor</h3>
              <p className="text-xs text-[#64748B] mt-1 max-w-sm mx-auto">
                Catat cuaca, jumlah tukang kerja harian, material masuk, dan kendala site.
              </p>
              <button
                onClick={() => setIsDailyReportOpen(true)}
                className="mt-4 tail-btn tail-btn-primary text-xs py-2 px-4 mx-auto"
              >
                + Buat Laporan Harian
              </button>
            </div>
          ) : (
            filteredReports.map((dr) => (
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
            ))
          )}
        </div>
      )}

      {/* Subtab: Joint Opname Lapangan */}
      {activeSubTab === 'opname' && (
        <div className="space-y-6">
          {/* Opname 3 Metric Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-sm border border-[#E2E8F0] bg-white p-4 shadow-sm">
              <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider block">
                Total Penyesuaian Nilai Opname
              </span>
              <div className="mt-2 flex items-baseline justify-between">
                <span className={`text-xl font-bold font-mono ${totalOpnameAdjustment >= 0 ? 'text-[#10B981]' : 'text-[#D34053]'}`}>
                  {totalOpnameAdjustment >= 0 ? '+' : ''}{formatRupiah(totalOpnameAdjustment)}
                </span>
                <span className="badge-tail badge-tail-primary text-xs">{filteredOpnames.length} Item</span>
              </div>
            </div>

            <div className="rounded-sm border border-[#E2E8F0] bg-white p-4 shadow-sm">
              <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider block">
                Telah Disetujui Klien
              </span>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-xl font-bold font-mono text-[#10B981]">
                  {approvedOpnamesCount} Item Terverifikasi
                </span>
                <span className="badge-tail badge-tail-success text-xs">Siap Addendum</span>
              </div>
            </div>

            <div className="rounded-sm border border-[#E2E8F0] bg-white p-4 shadow-sm">
              <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider block">
                Menunggu Approval Klien
              </span>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-xl font-bold font-mono text-[#F0950C]">
                  {pendingOpnamesCount} Item Opname
                </span>
                <span className="badge-tail badge-tail-warning text-xs">Waiting Approval</span>
              </div>
            </div>
          </div>

          {/* Opname Table */}
          <div className="tail-card">
            <div className="tail-card-header flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-[#1C2434]">
                  Berita Acara Opname Pekerjaan Lapangan (Joint Opname)
                </h3>
                <p className="text-xs text-[#64748B] mt-0.5">
                  Rekapitulasi pengukuran volume aktual on-site bersama klien / konsultan arsitek sebagai dasar pengajuan addendum
                </p>
              </div>
              <button
                onClick={() => setIsOpnameModalOpen(true)}
                className="btn-tail-primary text-xs shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Catat Hasil Opname Bersama</span>
              </button>
            </div>

            <TableScrollWrapper minWidth="min-w-[960px]" hint="Geser tabel hasil opname pekerjaan">
              <table className="tail-table">
                <thead>
                  <tr>
                    <th>Tanggal</th>
                    <th>Proyek</th>
                    <th>Item Pekerjaan</th>
                    <th>Kategori</th>
                    <th className="text-center">Vol. Awal</th>
                    <th className="text-center">Vol. Aktual</th>
                    <th className="text-center">Selisih</th>
                    <th className="text-right">Harga Satuan</th>
                    <th className="text-right">Nilai Penyesuaian</th>
                    <th>Verifikator Bersama</th>
                    <th>Catatan Lapangan</th>
                    <th className="text-center">Status</th>
                    <th className="text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOpnames.map((opn) => {
                    const diffPositive = opn.differenceVolume >= 0;
                    return (
                      <tr key={opn.id}>
                        <td className="font-mono text-xs text-[#64748B] whitespace-nowrap">{formatDateIndo(opn.date)}</td>
                        <td className="font-bold text-xs text-[#1C2434] max-w-[140px] truncate">{opn.projectName}</td>
                        <td className="font-medium text-xs text-[#1C2434] max-w-[180px]">{opn.itemDescription}</td>
                        <td>
                          <span className="badge-tail badge-tail-primary text-[10px]">{opn.category}</span>
                        </td>
                        <td className="text-center font-mono text-xs text-[#64748B]">
                          {opn.initialVolume} {opn.unit}
                        </td>
                        <td className="text-center font-mono font-bold text-xs text-[#1C2434]">
                          {opn.actualVolume} {opn.unit}
                        </td>
                        <td className="text-center font-mono font-bold text-xs">
                          <span className={diffPositive ? 'text-[#10B981]' : 'text-[#D34053]'}>
                            {diffPositive ? '+' : ''}{opn.differenceVolume} {opn.unit}
                          </span>
                        </td>
                        <td className="text-right font-mono text-xs text-[#64748B]">
                          {formatRupiah(opn.unitPrice)}
                        </td>
                        <td className="text-right font-mono font-bold text-xs">
                          <span className={opn.adjustmentValue >= 0 ? 'text-[#10B981]' : 'text-[#D34053]'}>
                            {opn.adjustmentValue >= 0 ? '+' : ''}{formatRupiah(opn.adjustmentValue)}
                          </span>
                        </td>
                        <td className="text-xs text-[#64748B] max-w-[180px]">
                          {opn.verifiedBy}
                        </td>
                        <td className="text-xs text-[#64748B] max-w-[200px] leading-relaxed">
                          {opn.notes}
                        </td>
                        <td className="text-center">
                          <span className={`badge-tail ${
                            opn.status === 'Disetujui Klien' 
                              ? 'badge-tail-success' 
                              : opn.status === 'Waiting Approval'
                              ? 'badge-tail-warning'
                              : 'badge-tail-danger'
                          }`}>
                            {opn.status}
                          </span>
                        </td>
                        <td className="text-center">
                          {opn.status === 'Waiting Approval' && (role === 'Owner' || role === 'Kepala Produksi') ? (
                            <button
                              onClick={() => updateOpnameStatus(opn.id, 'Disetujui Klien')}
                              className="px-2.5 py-1 bg-[#10B981] hover:bg-[#059669] text-white font-bold rounded text-[11px] transition shadow-xs whitespace-nowrap"
                            >
                              Validasi Klien
                            </button>
                          ) : (
                            <span className="text-[11px] text-[#64748B] font-medium">Tercatat</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  {filteredOpnames.length === 0 && (
                    <tr>
                      <td colSpan={13} className="text-center py-8 text-[#64748B] text-xs">
                        Belum ada catatan joint opname untuk proyek ini.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </TableScrollWrapper>

            <div className="px-4 sm:px-6 py-3 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[#64748B]">
              <span>Hasil opname terverifikasi menjadi dasar penyesuaian nilai kontrak dan penerbitan addendum</span>
              <span className="text-[#10B981] font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Berita Acara Opname Valid
              </span>
            </div>
          </div>
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
                <input 
                  type="text" 
                  placeholder="Contoh: Bar Counter / Board Room / Koridor" 
                  value={photoArea}
                  onChange={(e) => setPhotoArea(e.target.value)}
                  className="tail-input min-h-[38px]" 
                  required
                />
              </div>
              <div>
                <label className="block text-[#1C2434] font-semibold mb-1">Keterangan / Aktivitas</label>
                <input 
                  type="text" 
                  placeholder="Contoh: Perakitan modul cabinetry & instalasi panel acoustic" 
                  value={photoCaption}
                  onChange={(e) => setPhotoCaption(e.target.value)}
                  className="tail-input min-h-[38px]" 
                  required
                />
              </div>
              <div>
                <label className="block text-[#1C2434] font-semibold mb-1">Status Progres</label>
                <select 
                  value={photoStatus}
                  onChange={(e) => setPhotoStatus(e.target.value as any)}
                  className="tail-input min-h-[38px]"
                >
                  <option value="Dalam Proses">Dalam Proses</option>
                  <option value="Selesai">Selesai</option>
                  <option value="Sebelum">Sebelum</option>
                  <option value="Temuan / Issue">Temuan / Issue</option>
                </select>
              </div>
              <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3 pt-3 border-t border-[#E2E8F0]">
                <button
                  type="button"
                  onClick={() => setIsUploadPhotoOpen(false)}
                  className="btn-tail-secondary justify-center py-2.5 min-h-[38px]"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!photoArea) return;
                    const uploaderName = role === 'Owner' 
                      ? 'Ir. Robith Izzudin (Owner)' 
                      : role === 'Kepala Produksi'
                      ? 'Budi Santoso (Kepala Produksi)'
                      : 'Rian Pratama (Site Supervisor)';
                    addSitePhoto({
                      projectId: activeProject ? activeProject.id : 'prj-general',
                      area: photoArea,
                      caption: photoCaption || `Dokumentasi pekerjaan area ${photoArea}`,
                      uploader: uploaderName,
                      imageUrl: activeProject?.image || '/images/project-office.jpg',
                      type: photoStatus,
                    });
                    setPhotoArea('');
                    setPhotoCaption('');
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
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#1C2434] font-semibold mb-1">Jumlah Tukang Hadir</label>
                  <input 
                    type="number" 
                    value={drTukangCount} 
                    onChange={(e) => setDrTukangCount(Number(e.target.value))}
                    className="tail-input min-h-[38px] font-mono font-bold" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-[#1C2434] font-semibold mb-1">Kondisi Cuaca Site</label>
                  <select
                    value={drWeather}
                    onChange={(e) => setDrWeather(e.target.value as any)}
                    className="tail-input min-h-[38px]"
                  >
                    <option value="Cerah">Cerah</option>
                    <option value="Mendung">Mendung</option>
                    <option value="Hujan">Hujan</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#1C2434] font-semibold mb-1">Ringkasan Pekerjaan Hari Ini</label>
                <textarea 
                  rows={2} 
                  placeholder="Contoh: Instalasi rangka baffle ceiling, finishing edging HPL workstation..." 
                  value={drSummary}
                  onChange={(e) => setDrSummary(e.target.value)}
                  className="tail-input" 
                  required
                />
              </div>

              <div>
                <label className="block text-[#1C2434] font-semibold mb-1">Material Diterima di Site Hari Ini</label>
                <input 
                  type="text"
                  placeholder="Contoh: Plywood 18mm 25 lbr, Sealant silicone 10 btg"
                  value={drMaterials}
                  onChange={(e) => setDrMaterials(e.target.value)}
                  className="tail-input min-h-[38px]" 
                />
              </div>

              <div>
                <label className="block text-[#1C2434] font-semibold mb-1">Kendala / Hambatan Lapangan</label>
                <input 
                  type="text"
                  placeholder="Tidak ada kendala / Antrean lift barang"
                  value={drObstacles}
                  onChange={(e) => setDrObstacles(e.target.value)}
                  className="tail-input min-h-[38px]" 
                />
              </div>

              <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3 pt-3 border-t border-[#E2E8F0]">
                <button
                  type="button"
                  onClick={() => setIsDailyReportOpen(false)}
                  className="btn-tail-secondary justify-center py-2.5 min-h-[38px]"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!drSummary) return;
                    const picName = role === 'Owner' 
                      ? 'Ir. Robith Izzudin (Owner)' 
                      : role === 'Kepala Produksi'
                      ? 'Budi Santoso (Kepala Produksi)'
                      : 'Rian Pratama (Pengawas Lapangan)';
                    addDailyReport({
                      projectId: activeProject ? activeProject.id : 'prj-general',
                      weather: drWeather,
                      tukangCount: Number(drTukangCount) || 8,
                      pic: picName,
                      summary: drSummary,
                      materialsReceived: drMaterials || 'Tidak ada pengiriman hari ini',
                      obstacles: drObstacles || 'Tidak ada kendala',
                    });
                    setDrSummary('');
                    setDrMaterials('');
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

      {/* Modal Input Hasil Joint Opname */}
      {isOpnameModalOpen && (
        <AddOpnameModal
          onClose={() => setIsOpnameModalOpen(false)}
          defaultProjectId={activeProject?.id || ''}
        />
      )}
    </div>
  );
}

function AddOpnameModal({ onClose, defaultProjectId }: { onClose: () => void; defaultProjectId: string }) {
  const { addOpnameItem, projects } = useProject();
  const [projectId, setProjectId] = useState(defaultProjectId);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [itemDescription, setItemDescription] = useState('');
  const [category, setCategory] = useState('Subkontraktor Spesialis');
  const [unit, setUnit] = useState('m2');
  const [initialVolume, setInitialVolume] = useState<number>(10);
  const [actualVolume, setActualVolume] = useState<number>(12);
  const [unitPrice, setUnitPrice] = useState<number>(500000);
  const [verifiedBy, setVerifiedBy] = useState('Rian Pratama (Sora) & Pengawas Klien');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState<'Waiting Approval' | 'Disetujui Klien'>('Waiting Approval');

  const diff = Number(actualVolume) - Number(initialVolume);
  const adjVal = diff * Number(unitPrice);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemDescription || !projectId) return;

    const prj = projects.find(p => p.id === projectId);
    const projectName = prj ? prj.name : projects[0]?.name || 'Fit-out Proyek B2B';

    addOpnameItem({
      projectId,
      projectName,
      date,
      itemDescription,
      category,
      unit,
      initialVolume: Number(initialVolume),
      actualVolume: Number(actualVolume),
      differenceVolume: diff,
      unitPrice: Number(unitPrice),
      notes: notes || 'Hasil pengukuran bersama on-site.',
      status,
      verifiedBy: verifiedBy || 'Tim Lapangan Sora & Klien',
    });

    onClose();
  };

  return (
    <div 
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs overscroll-contain modal-backdrop-lock"
    >
      <form 
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white rounded-lg sm:rounded-md border border-[#E2E8F0] shadow-2xl max-h-[92dvh] sm:max-h-[88vh] flex flex-col overflow-hidden my-auto modal-content-lock touch-pan-y"
      >
        <div className="px-4 sm:px-6 py-3.5 border-b border-[#E2E8F0] flex items-center justify-between shrink-0 bg-white">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3C50E0]" />
            <h3 className="font-bold text-sm sm:text-base text-[#1C2434]">
              Input Berita Acara Opname Bersama (Joint Opname)
            </h3>
          </div>
          <button 
            type="button" 
            onClick={onClose} 
            className="text-[#64748B] hover:text-[#1C2434] p-1.5 rounded hover:bg-[#EFF2F7] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto modal-scroll p-4 sm:p-6 space-y-3 sm:space-y-4 text-xs overscroll-contain touch-pan-y">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[#1C2434] font-semibold mb-1">Proyek Terkait</label>
              <select 
                value={projectId} 
                onChange={(e) => setProjectId(e.target.value)}
                className="tail-input min-h-[38px]"
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>{p.code} - {p.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[#1C2434] font-semibold mb-1">Tanggal Opname Bersama</label>
              <input 
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)}
                className="tail-input min-h-[38px]" 
                required 
              />
            </div>
          </div>

          <div>
            <label className="block text-[#1C2434] font-semibold mb-1">Item Pekerjaan Yang Diopname</label>
            <input 
              type="text" 
              required
              placeholder="Contoh: Partisi Kaca Tempered Curved 10mm" 
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
              className="tail-input min-h-[38px]" 
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[#1C2434] font-semibold mb-1">Kategori Pekerjaan</label>
              <select 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
                className="tail-input min-h-[38px]"
              >
                <option value="Subkontraktor Spesialis">Subkontraktor Spesialis</option>
                <option value="Material & Hardware">Material & Hardware</option>
                <option value="Tenaga Kerja">Tenaga Kerja</option>
                <option value="Overhead & Operasional">Overhead & Operasional</option>
              </select>
            </div>
            <div>
              <label className="block text-[#1C2434] font-semibold mb-1">Satuan Ukur</label>
              <select 
                value={unit} 
                onChange={(e) => setUnit(e.target.value)}
                className="tail-input min-h-[38px]"
              >
                <option value="m2">m2 (Meter Persegi)</option>
                <option value="m1">m1 (Meter Lari)</option>
                <option value="Lot">Lot</option>
                <option value="Unit">Unit</option>
                <option value="Set">Set</option>
                <option value="Titik">Titik</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-sm">
            <div>
              <label className="block text-[#64748B] font-semibold mb-1">Volume Awal</label>
              <input 
                type="number" 
                step="any"
                value={initialVolume}
                onChange={(e) => setInitialVolume(Number(e.target.value))}
                className="tail-input min-h-[36px] font-mono text-center font-bold" 
                required 
              />
            </div>
            <div>
              <label className="block text-[#64748B] font-semibold mb-1">Volume Aktual</label>
              <input 
                type="number" 
                step="any"
                value={actualVolume}
                onChange={(e) => setActualVolume(Number(e.target.value))}
                className="tail-input min-h-[36px] font-mono text-center font-bold text-[#3C50E0]" 
                required 
              />
            </div>
            <div>
              <label className="block text-[#64748B] font-semibold mb-1">Selisih Volume</label>
              <div className={`tail-input min-h-[36px] flex items-center justify-center font-mono font-bold bg-white ${diff >= 0 ? 'text-[#10B981]' : 'text-[#D34053]'}`}>
                {diff >= 0 ? '+' : ''}{diff} {unit}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[#1C2434] font-semibold mb-1">Harga Satuan SPK/Deal (Rp)</label>
              <input 
                type="number" 
                value={unitPrice}
                onChange={(e) => setUnitPrice(Number(e.target.value))}
                className="tail-input min-h-[38px] font-mono" 
                required 
              />
            </div>
            <div>
              <label className="block text-[#1C2434] font-semibold mb-1">Total Nilai Penyesuaian</label>
              <div className={`tail-input min-h-[38px] flex items-center px-3 font-mono font-bold bg-[#F8FAFC] ${adjVal >= 0 ? 'text-[#10B981]' : 'text-[#D34053]'}`}>
                {adjVal >= 0 ? '+' : ''}{formatRupiah(adjVal)}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[#1C2434] font-semibold mb-1">Tim Verifikator Bersama (Sora & Klien)</label>
            <input 
              type="text" 
              placeholder="Contoh: Rian Pratama (Sora) & Bambang Trihatmojo (VP GA Nexus)" 
              value={verifiedBy}
              onChange={(e) => setVerifiedBy(e.target.value)}
              className="tail-input min-h-[38px]" 
            />
          </div>

          <div>
            <label className="block text-[#1C2434] font-semibold mb-1">Catatan / Alasan Perubahan di Lapangan</label>
            <textarea 
              rows={2} 
              placeholder="Contoh: Penyesuaian radius lekukan partisi kaca board room lantai 24 sesuai layout executive..." 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="tail-input" 
            />
          </div>

          <div>
            <label className="block text-[#1C2434] font-semibold mb-1">Status Verifikasi</label>
            <select 
              value={status} 
              onChange={(e) => setStatus(e.target.value as any)}
              className="tail-input min-h-[38px]"
            >
              <option value="Waiting Approval">Waiting Approval (Menunggu Persetujuan Klien)</option>
              <option value="Disetujui Klien">Disetujui Klien (Telah Ditandatangani On-Site)</option>
            </select>
          </div>
        </div>

        <div className="px-4 sm:px-6 py-3 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-end gap-2.5 shrink-0">
          <button 
            type="button" 
            onClick={onClose} 
            className="btn-tail-secondary py-2 px-4 text-xs font-semibold"
          >
            Batal
          </button>
          <button 
            type="submit" 
            className="btn-tail-primary py-2 px-5 text-xs font-semibold shadow-xs"
          >
            Simpan Hasil Opname
          </button>
        </div>
      </form>
    </div>
  );
}
