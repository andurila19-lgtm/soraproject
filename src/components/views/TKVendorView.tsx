'use client';

import React, { useState } from 'react';
import { useProject } from '@/context/ProjectContext';
import { Worker, Vendor } from '@/lib/types';
import { 
  HardHat, 
  Truck, 
  Search, 
  Phone, 
  Star, 
  MapPin, 
  X,
  Users2,
  Hammer,
  CheckCircle2
} from 'lucide-react';
import { formatRupiah, formatCompactRupiah } from '@/lib/utils';
import { TableScrollWrapper } from '@/components/TableScrollWrapper';

export function TKVendorView() {
  const { workers, vendors, projects, showToast } = useProject();
  const [activeTab, setActiveTab] = useState<'workers' | 'vendors'>('workers');
  const [search, setSearch] = useState('');

  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedWorkerForAssign, setSelectedWorkerForAssign] = useState<Worker | null>(null);

  const filteredWorkers = workers.filter((w) => 
    w.name.toLowerCase().includes(search.toLowerCase()) ||
    w.specialty.toLowerCase().includes(search.toLowerCase()) ||
    w.currentProject.toLowerCase().includes(search.toLowerCase())
  );

  const filteredVendors = vendors.filter((v) => 
    v.name.toLowerCase().includes(search.toLowerCase()) ||
    v.category.toLowerCase().includes(search.toLowerCase()) ||
    v.city.toLowerCase().includes(search.toLowerCase())
  );

  const activeWorkerCount = workers.filter(w => w.status === 'Aktif di Site').length;

  return (
    <div className="space-y-6">
      {/* TailAdmin Page Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C2434]">
            Tenaga Kerja & Vendor Rekanan
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            Roster Mandor, Tukang Kayu / Finishing, dan Manajemen Supplier Bahan Interior
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
          <nav>
            <ol className="hidden sm:flex items-center gap-1.5 text-xs text-[#64748B] mr-2">
              <li><span>Dashboard</span></li>
              <li>/</li>
              <li className="text-[#3C50E0] font-semibold">TK & Vendor</li>
            </ol>
          </nav>

          <div className="flex items-center bg-[#F1F5F9] p-1 rounded-sm border border-[#E2E8F0] w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('workers')}
              className={`flex-1 sm:flex-initial text-center px-3 py-2 sm:py-1.5 text-xs font-semibold rounded-xs transition min-h-[36px] flex items-center justify-center ${
                activeTab === 'workers'
                  ? 'bg-white text-[#3C50E0] shadow-sm'
                  : 'text-[#64748B] hover:text-[#1C2434]'
              }`}
            >
              Tenaga Kerja ({workers.length})
            </button>
            <button
              onClick={() => setActiveTab('vendors')}
              className={`flex-1 sm:flex-initial text-center px-3 py-2 sm:py-1.5 text-xs font-semibold rounded-xs transition min-h-[36px] flex items-center justify-center ${
                activeTab === 'vendors'
                  ? 'bg-white text-[#3C50E0] shadow-sm'
                  : 'text-[#64748B] hover:text-[#1C2434]'
              }`}
            >
              Vendor & Subkon ({vendors.length})
            </button>
          </div>
        </div>
      </div>

      {/* TailAdmin 3 Metric Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
        <div className="rounded-sm border border-[#E2E8F0] bg-white py-5 px-6 shadow-sm">
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-[#EFF2F7] text-[#10B981]">
            <HardHat className="w-6 h-6" />
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-2xl font-bold text-[#1C2434]">
                {activeWorkerCount} Orang
              </h4>
              <span className="text-xs font-medium text-[#64748B]">Tukang Aktif di Site Proyek</span>
            </div>
            <span className="badge-tail badge-tail-success text-xs">On-Site</span>
          </div>
        </div>

        <div className="rounded-sm border border-[#E2E8F0] bg-white py-5 px-6 shadow-sm">
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-[#EFF2F7] text-[#3C50E0]">
            <Hammer className="w-6 h-6" />
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-2xl font-bold text-[#1C2434]">
                {workers.length - activeWorkerCount} Orang
              </h4>
              <span className="text-xs font-medium text-[#64748B]">Standby Workshop Cibubur</span>
            </div>
            <span className="badge-tail badge-tail-primary text-xs">Pabrikasi</span>
          </div>
        </div>

        <div className="rounded-sm border border-[#E2E8F0] bg-white py-5 px-6 shadow-sm">
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-[#EFF2F7] text-[#F0950C]">
            <Truck className="w-6 h-6" />
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-2xl font-bold text-[#1C2434]">
                {vendors.length} Supplier
              </h4>
              <span className="text-xs font-medium text-[#64748B]">Rekanan Resmi Terverifikasi</span>
            </div>
            <span className="badge-tail badge-tail-warning text-xs">TOP 14-30 Hari</span>
          </div>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="tail-card p-3 sm:p-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder={activeTab === 'workers' ? "Cari nama tukang, keahlian, proyek..." : "Cari vendor, spesialisasi, kota..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="tail-input pl-9 text-xs w-full min-h-[38px]"
          />
        </div>
      </div>

      {/* Workers Table */}
      {activeTab === 'workers' && (
        <div className="tail-card">
          <div className="tail-card-header">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#1C2434]">
                Roster Tenaga Kerja Mandor & Tukang Kayu
              </h3>
              <p className="text-xs text-[#64748B] mt-0.5">
                Alokasi kapasitas tukang dan pemantauan penugasan site
              </p>
            </div>
            <span className="badge-tail badge-tail-gray text-xs">
              {filteredWorkers.length} Orang
            </span>
          </div>

          <TableScrollWrapper minWidth="min-w-[780px]" hint="Geser daftar tenaga kerja">
            <table className="tail-table">
              <thead>
                <tr>
                  <th>Nama Tukang</th>
                  <th>Keahlian / Spesialisasi</th>
                  <th className="text-right">Upah Harian</th>
                  <th className="text-center">Status</th>
                  <th>Penugasan Saat Ini</th>
                  <th>No. WhatsApp</th>
                  <th className="text-center">Performa</th>
                  <th className="text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredWorkers.map((w) => (
                  <tr key={w.id}>
                    <td className="font-bold text-[#1C2434]">{w.name}</td>
                    <td>
                      <span className="badge-tail badge-tail-primary text-xs">{w.specialty}</span>
                    </td>
                    <td className="text-right font-mono font-bold text-xs text-[#1C2434]">
                      {formatRupiah(w.dailyRate)}
                    </td>
                    <td className="text-center">
                      <span className={`badge-tail ${
                        w.status === 'Aktif di Site' ? 'badge-tail-success' : 'badge-tail-gray'
                      }`}>
                        {w.status}
                      </span>
                    </td>
                    <td className="font-semibold text-xs text-[#1C2434]">{w.currentProject}</td>
                    <td className="font-mono text-xs text-[#64748B]">{w.phone}</td>
                    <td className="text-center text-xs font-semibold text-[#F0950C]">
                      ⭐ {w.rating} / 5.0
                    </td>
                    <td className="text-center">
                      <button
                        onClick={() => {
                          setSelectedWorkerForAssign(w);
                          setIsAssignModalOpen(true);
                        }}
                        className="btn-tail-secondary text-xs py-1.5 px-3 min-h-[32px]"
                      >
                        Mutasi Site
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableScrollWrapper>

          <div className="px-4 sm:px-6 py-3 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[#64748B]">
            <span>Absensi dan lembur tukang dicatat harian oleh Pengawas Lapangan</span>
            <span className="text-[#10B981] font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Terverifikasi K3
            </span>
          </div>
        </div>
      )}

      {/* Vendors Table */}
      {activeTab === 'vendors' && (
        <div className="tail-card">
          <div className="tail-card-header">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#1C2434]">
                Direktori Vendor & Subkontraktor Spesialis
              </h3>
              <p className="text-xs text-[#64748B] mt-0.5">
                Daftar rekanan supplier material, kaca tempered, MEP, dan finishing
              </p>
            </div>
            <span className="badge-tail badge-tail-gray text-xs">
              {filteredVendors.length} Rekanan
            </span>
          </div>

          <TableScrollWrapper minWidth="min-w-[780px]" hint="Geser direktori vendor rekanan">
            <table className="tail-table">
              <thead>
                <tr>
                  <th>Nama Rekanan Vendor</th>
                  <th>Kategori Material</th>
                  <th>PIC / Kontak</th>
                  <th>Kota / Wilayah</th>
                  <th className="text-center">Order Aktif</th>
                  <th className="text-center">Termin Tempo</th>
                  <th className="text-center">Rating</th>
                </tr>
              </thead>
              <tbody>
                {filteredVendors.map((v) => (
                  <tr key={v.id}>
                    <td className="font-bold text-[#1C2434]">{v.name}</td>
                    <td>
                      <span className="badge-tail badge-tail-warning text-xs">{v.category}</span>
                    </td>
                    <td>
                      <div className="font-bold text-xs text-[#1C2434]">{v.contactPerson}</div>
                      <div className="text-[11px] text-[#64748B] font-mono">{v.phone}</div>
                    </td>
                    <td className="text-xs text-[#64748B]">{v.city}</td>
                    <td className="text-center font-bold font-mono text-xs text-[#3C50E0]">
                      {v.activeOrders} PO
                    </td>
                    <td className="text-center">
                      <span className="badge-tail badge-tail-success text-xs">{v.paymentTerm}</span>
                    </td>
                    <td className="text-center text-xs font-semibold text-[#F0950C]">
                      ⭐ {v.rating} / 5.0
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableScrollWrapper>

          <div className="px-4 sm:px-6 py-3 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[#64748B]">
            <span>Semua vendor terdaftar memiliki surat perjanjian kerjasama dan harga grosir</span>
            <span className="text-[#10B981] font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Rekanan Resmi Sora
            </span>
          </div>
        </div>
      )}

      {/* Reassign Worker Modal */}
      {isAssignModalOpen && selectedWorkerForAssign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-md border border-[#E2E8F0] shadow-2xl max-h-[85vh] sm:max-h-[88vh] flex flex-col overflow-hidden my-auto">
            {/* Pinned Modal Header */}
            <div className="px-4 sm:px-6 py-3.5 border-b border-[#E2E8F0] flex items-center justify-between shrink-0 bg-white">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#3C50E0]" />
                <h3 className="font-bold text-sm sm:text-base text-[#1C2434]">
                  Mutasi Penugasan Tukang
                </h3>
              </div>
              <button 
                type="button"
                onClick={() => setIsAssignModalOpen(false)} 
                className="text-[#64748B] hover:text-[#1C2434] p-1.5 rounded hover:bg-[#EFF2F7] transition"
                aria-label="Tutup Formulir"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Modal Body */}
            <div className="flex-1 min-h-0 overflow-y-auto modal-scroll p-4 sm:p-6 space-y-4 text-xs overscroll-contain">
              <p className="text-[#64748B]">
                Pindahkan lokasi kerja <strong className="text-[#1C2434]">{selectedWorkerForAssign.name}</strong> ({selectedWorkerForAssign.specialty}):
              </p>

              <div>
                <label className="block text-[#1C2434] font-semibold mb-1">Pilih Proyek / Workshop Tujuan</label>
                <select
                  defaultValue={selectedWorkerForAssign.currentProject}
                  id="target-project-select-tail"
                  className="tail-input min-h-[38px]"
                >
                  <option value="Workshop Cibubur (Pabrikasi)">Workshop Cibubur (Pabrikasi)</option>
                  {projects.map((p) => (
                    <option key={p.id} value={p.name}>{p.name}</option>
                  ))}
                  <option value="Standby (Siaga)">Standby (Siaga)</option>
                </select>
              </div>
            </div>

            {/* Pinned Modal Footer */}
            <div className="px-4 sm:px-6 py-3 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-end gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => setIsAssignModalOpen(false)}
                className="btn-tail-secondary py-2 px-4 text-xs font-semibold"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  const sel = document.getElementById('target-project-select-tail') as HTMLSelectElement;
                  selectedWorkerForAssign.currentProject = sel.value;
                  showToast(`${selectedWorkerForAssign.name} berhasil dipindahkan ke: ${sel.value}`);
                  setIsAssignModalOpen(false);
                }}
                className="btn-tail-primary py-2 px-5 text-xs font-semibold shadow-xs"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
