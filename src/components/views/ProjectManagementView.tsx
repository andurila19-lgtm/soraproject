'use client';

import React, { useState } from 'react';
import { useProject } from '@/context/ProjectContext';
import { Project, ProjectStatus } from '@/lib/types';
import { 
  FolderKanban, 
  Plus, 
  Search, 
  LayoutGrid, 
  List, 
  Building2, 
  Clock, 
  User, 
  ArrowUpRight,
  Filter,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { formatCompactRupiah, formatRupiah, formatDateIndo } from '@/lib/utils';
import { TableScrollWrapper } from '@/components/TableScrollWrapper';

export function ProjectManagementView() {
  const { 
    role,
    projects, 
    searchQuery, 
    setSelectedProjectDetail, 
    setIsCreateProjectOpen
  } = useProject();

  const [viewMode, setViewMode] = useState<'table' | 'grid' | 'kanban'>('table');
  const [statusFilter, setStatusFilter] = useState<string>('Semua');
  const [localSearch, setLocalSearch] = useState('');

  const effectiveSearch = searchQuery || localSearch;

  const filteredProjects = projects.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(effectiveSearch.toLowerCase()) ||
      p.code.toLowerCase().includes(effectiveSearch.toLowerCase()) ||
      p.partnerName.toLowerCase().includes(effectiveSearch.toLowerCase()) ||
      p.location.toLowerCase().includes(effectiveSearch.toLowerCase());
    const matchesStatus = statusFilter === 'Semua' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statuses: ProjectStatus[] = [
    'Tender & Estimasi',
    'Deal & SPK',
    'Persiapan Workshop',
    'On-Site Fit-out',
    'Finishing & QC',
    'Handover & Retensi',
  ];

  return (
    <div className="space-y-6">
      {/* TailAdmin Page Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C2434]">
            Project Management
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            Pelacakan Milestone, Timeline Fabrikasi Workshop Cibubur & Pekerjaan On-Site
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <nav>
            <ol className="hidden sm:flex items-center gap-1.5 text-xs text-[#64748B] mr-2">
              <li><span>Dashboard</span></li>
              <li>/</li>
              <li className="text-[#3C50E0] font-semibold">Semua Proyek</li>
            </ol>
          </nav>

          <button
            onClick={() => setIsCreateProjectOpen(true)}
            className="btn-tail-primary text-xs w-full sm:w-auto justify-center py-2.5 px-4 min-h-[38px]"
          >
            <Plus className="w-4 h-4" />
            <span>+ Buat Proyek Baru</span>
          </button>
        </div>
      </div>

      {/* Control Bar: Search, Filters & View Toggle */}
      <div className="tail-card p-3 sm:p-4 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 sm:gap-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full lg:w-auto flex-1">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Cari kode, nama proyek, lokasi..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="tail-input pl-9 text-xs w-full min-h-[38px]"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 sm:pb-0 w-full sm:w-auto no-scrollbar">
            {['Semua', 'On-Site Fit-out', 'Finishing & QC', 'Persiapan Workshop', 'Deal & SPK'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`text-xs px-3 py-2 rounded-sm font-medium transition whitespace-nowrap min-h-[36px] ${
                  statusFilter === st
                    ? 'bg-[#3C50E0] text-white font-semibold'
                    : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center bg-[#F1F5F9] p-1 rounded-sm border border-[#E2E8F0] shrink-0 w-full sm:w-auto justify-center">
          <button
            onClick={() => setViewMode('table')}
            className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-xs text-xs flex items-center justify-center gap-1.5 font-medium transition min-h-[34px] ${
              viewMode === 'table' ? 'bg-white text-[#3C50E0] shadow-sm font-bold' : 'text-[#64748B] hover:text-[#1C2434]'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>Tabel</span>
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-xs text-xs flex items-center justify-center gap-1.5 font-medium transition min-h-[34px] ${
              viewMode === 'grid' ? 'bg-white text-[#3C50E0] shadow-sm font-bold' : 'text-[#64748B] hover:text-[#1C2434]'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Grid</span>
          </button>
          <button
            onClick={() => setViewMode('kanban')}
            className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-xs text-xs flex items-center justify-center gap-1.5 font-medium transition min-h-[34px] ${
              viewMode === 'kanban' ? 'bg-white text-[#3C50E0] shadow-sm font-bold' : 'text-[#64748B] hover:text-[#1C2434]'
            }`}
          >
            <FolderKanban className="w-3.5 h-3.5" />
            <span>Kanban</span>
          </button>
        </div>
      </div>

      {/* Table Mode */}
      {viewMode === 'table' && (
        <div className="tail-card">
          <div className="tail-card-header">
            <div>
              <h3 className="text-base font-bold text-[#1C2434]">
                Master Portofolio Proyek Interior Sora
              </h3>
              <p className="text-xs text-[#64748B] mt-0.5">
                Total {filteredProjects.length} proyek aktif terdaftar
              </p>
            </div>
            <span className="badge-tail badge-tail-primary text-xs">
              Live Monitoring
            </span>
          </div>

          <TableScrollWrapper minWidth="min-w-[840px]" hint="Geser tabel master proyek">
            <table className="tail-table">
              <thead>
                <tr>
                  <th>Kode</th>
                  <th>Nama Proyek & Lokasi</th>
                  <th>Partner / End-User</th>
                  {(role === 'Owner' || role === 'Admin Keuangan') ? (
                    <>
                      <th className="text-right">Kontrak Deal</th>
                      <th className="text-right">HPP Budget</th>
                      <th className="text-right">Biaya Aktual</th>
                    </>
                  ) : (
                    <>
                      <th>Mulai SPK</th>
                      <th>Target Selesai</th>
                      <th>PIC Fabrikasi</th>
                    </>
                  )}
                  <th className="text-center">Progres Fisik</th>
                  <th className="text-center">Status</th>
                  <th>PIC Lapangan</th>
                  <th className="text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <FolderKanban className="w-10 h-10 text-[#94A3B8] mb-2" />
                        <p className="text-sm font-semibold text-[#1C2434]">Belum Ada Proyek Aktif</p>
                        <p className="text-xs text-[#64748B] mt-1 max-w-sm">
                          Sistem dalam keadaan bersih (0 proyek). Buat proyek fit-out pertama Anda untuk memulai manajemen proyek.
                        </p>
                        <button
                          onClick={() => setIsCreateProjectOpen(true)}
                          className="mt-3.5 btn-tail-primary text-xs py-2 px-3.5"
                        >
                          + Tambah Proyek Baru
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredProjects.map((p) => (
                    <tr key={p.id}>
                      <td className="font-mono font-bold text-[#3C50E0] text-xs">
                        {p.code}
                      </td>
                      <td>
                        <div className="font-bold text-[#1C2434] hover:text-[#3C50E0] cursor-pointer" onClick={() => setSelectedProjectDetail(p)}>
                          {p.name}
                        </div>
                        <div className="text-xs text-[#64748B]">📍 {p.location}</div>
                      </td>
                      <td>
                        <div className="font-bold text-[#1C2434]">{p.partnerName}</div>
                        <div className="text-xs text-[#64748B]">{p.endUser}</div>
                      </td>
                      {(role === 'Owner' || role === 'Admin Keuangan') ? (
                        <>
                          <td className="text-right font-mono font-bold text-[#1C2434]">
                            {formatRupiah(p.contractValue)}
                          </td>
                          <td className="text-right font-mono text-[#64748B]">
                            {formatRupiah(p.hppBudget)}
                          </td>
                          <td className="text-right font-mono font-bold text-[#1C2434]">
                            {formatRupiah(p.actualCost)}
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="text-xs text-[#64748B]">
                            {formatDateIndo(p.startDate)}
                          </td>
                          <td className="text-xs font-semibold text-[#1C2434]">
                            {formatDateIndo(p.targetCompletion)}
                          </td>
                          <td className="text-xs text-[#64748B]">
                            {p.picProduksi}
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
                      <td className="text-xs text-[#1C2434] font-medium">
                        {p.picLapangan.split(' ')[0]}
                      </td>
                      <td className="text-center">
                        <button
                          onClick={() => setSelectedProjectDetail(p)}
                          className="btn-tail-secondary text-xs py-1 px-3"
                        >
                          Detail
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </TableScrollWrapper>

          <div className="px-6 py-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B]">
            <span>Menampilkan {filteredProjects.length} proyek</span>
            <span className="text-[#10B981] font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Data sinkron real-time
            </span>
          </div>
        </div>
      )}

      {/* Grid Mode */}
      {viewMode === 'grid' && (
        filteredProjects.length === 0 ? (
          <div className="tail-card p-12 text-center">
            <FolderKanban className="w-12 h-12 text-[#94A3B8] mx-auto mb-3" />
            <h3 className="text-base font-bold text-[#1C2434]">Belum Ada Proyek Aktif</h3>
            <p className="text-xs text-[#64748B] mt-1 max-w-sm mx-auto">
              Sistem dalam keadaan bersih (0 proyek). Buat proyek fit-out pertama Anda untuk melihat ringkasan visual.
            </p>
            <button
              onClick={() => setIsCreateProjectOpen(true)}
              className="mt-4 tail-btn tail-btn-primary text-xs py-2 px-4 mx-auto"
            >
              + Tambah Proyek Baru
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((p) => (
            <div
              key={p.id}
              onClick={() => setSelectedProjectDetail(p)}
              className="tail-card p-5 cursor-pointer hover:border-[#3C50E0] transition-all space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[#3C50E0] text-xs bg-[#EFF2F7] px-2 py-0.5 rounded">
                      {p.code}
                    </span>
                    <span className={`badge-tail ${
                      p.health === 'On Track' ? 'badge-tail-success' : 'badge-tail-warning'
                    }`}>
                      {p.status}
                    </span>
                  </div>
                  <h3 className="font-bold text-[#1C2434] text-base mt-2">{p.name}</h3>
                  <div className="text-xs text-[#64748B]">Partner: {p.partnerName} • {p.location}</div>
                </div>

                {(role === 'Owner' || role === 'Admin Keuangan') ? (
                  <div className="text-right">
                    <div className="font-mono font-bold text-[#1C2434] text-base">{formatCompactRupiah(p.contractValue)}</div>
                    <div className="text-xs text-[#64748B] font-mono">HPP: {formatCompactRupiah(p.hppBudget)}</div>
                  </div>
                ) : (
                  <div className="text-right">
                    <div className="font-bold text-[#1C2434] text-xs">PIC: {p.picLapangan.split(' ')[0]}</div>
                    <div className="text-[11px] text-[#64748B]">Target: {formatDateIndo(p.targetCompletion)}</div>
                  </div>
                )}
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-[#64748B]">Progres Realisasi Lapangan:</span>
                  <span className="font-mono font-bold text-[#3C50E0]">{p.progress}% Selesai</span>
                </div>
                <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#3C50E0] h-full rounded-full" style={{ width: `${p.progress}%` }} />
                </div>
              </div>

              <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B]">
                <span>PIC Fabrikasi: <strong className="text-[#1C2434]">{p.picProduksi}</strong></span>
                <span className="flex items-center gap-1 text-[#64748B]">
                  <Calendar className="w-3.5 h-3.5" />
                  Target: {formatDateIndo(p.targetCompletion)}
                </span>
              </div>
            </div>
          ))}
        </div>
      ))}

      {/* Kanban Mode */}
      {viewMode === 'kanban' && (
        <div className="flex md:grid md:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto pb-4 -webkit-overflow-scrolling-touch">
          {statuses.map((status) => {
            const columnProjects = filteredProjects.filter(p => p.status === status);
            return (
              <div key={status} className="tail-card p-3 min-w-[220px] space-y-3 bg-[#F8FAFC]">
                <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2 text-xs font-bold text-[#1C2434]">
                  <span className="truncate">{status}</span>
                  <span className="w-5 h-5 rounded-full bg-[#EFF2F7] flex items-center justify-center text-xs font-bold text-[#3C50E0]">
                    {columnProjects.length}
                  </span>
                </div>
                <div className="space-y-2.5">
                  {columnProjects.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => setSelectedProjectDetail(p)}
                      className="p-3 bg-white border border-[#E2E8F0] rounded-sm shadow-xs space-y-2 cursor-pointer hover:border-[#3C50E0] transition"
                    >
                      <div className="font-mono text-[11px] font-bold text-[#3C50E0]">{p.code}</div>
                      <div className="font-bold text-[#1C2434] text-xs leading-snug">{p.name}</div>
                      {(role === 'Owner' || role === 'Admin Keuangan') ? (
                        <div className="text-[11px] text-[#64748B] font-mono">{formatCompactRupiah(p.contractValue)}</div>
                      ) : (
                        <div className="text-[11px] text-[#64748B] truncate">📍 {p.location}</div>
                      )}
                      <div className="w-full bg-[#E2E8F0] h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#3C50E0] h-full rounded-full" style={{ width: `${p.progress}%` }} />
                      </div>
                    </div>
                  ))}
                  {columnProjects.length === 0 && (
                    <div className="p-4 text-center text-xs text-[#64748B] italic">
                      Tidak ada proyek
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
