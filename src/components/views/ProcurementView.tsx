'use client';

import React, { useState } from 'react';
import { useProject } from '@/context/ProjectContext';
import { PurchaseOrder } from '@/lib/types';
import { 
  ShoppingBag, 
  Plus, 
  Search, 
  CheckCircle2, 
  Truck,
  Clock,
  ArrowRight
} from 'lucide-react';
import { formatRupiah, formatCompactRupiah, formatDateIndo } from '@/lib/utils';
import { TableScrollWrapper } from '@/components/TableScrollWrapper';

export function ProcurementView() {
  const { 
    purchaseOrders, 
    updatePOStatus, 
    setIsCreatePOOpen, 
    selectedProjectId,
    setSelectedProjectId,
    projects
  } = useProject();

  const [statusFilter, setStatusFilter] = useState<string>('Semua');
  const [search, setSearch] = useState('');

  const filteredPOs = purchaseOrders.filter((po) => {
    const matchesProject = selectedProjectId === 'all' || po.projectId === selectedProjectId;
    const matchesStatus = statusFilter === 'Semua' || po.status === statusFilter;
    const matchesSearch = po.poNumber.toLowerCase().includes(search.toLowerCase()) ||
      po.projectName.toLowerCase().includes(search.toLowerCase()) ||
      po.vendorName.toLowerCase().includes(search.toLowerCase()) ||
      po.itemsSummary.toLowerCase().includes(search.toLowerCase());
    return matchesProject && matchesStatus && matchesSearch;
  });

  const totalPOAmount = filteredPOs.reduce((acc, po) => acc + po.totalAmount, 0);
  const pendingCount = purchaseOrders.filter(p => p.status === 'Pending Approval').length;

  return (
    <div className="space-y-6">
      {/* TailAdmin Page Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C2434]">
            Procurement Bahan & PO
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            Manajemen Surat Pesanan Pembelian Bahan Interior, Surat Jalan, dan BAST Fisik On-Site
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <nav>
            <ol className="hidden sm:flex items-center gap-1.5 text-xs text-[#64748B] mr-2">
              <li><span>Dashboard</span></li>
              <li>/</li>
              <li className="text-[#3C50E0] font-semibold">Procurement</li>
            </ol>
          </nav>

          <button
            onClick={() => setIsCreatePOOpen(true)}
            className="btn-tail-primary text-xs w-full sm:w-auto justify-center py-2.5 px-4 min-h-[38px]"
          >
            <Plus className="w-4 h-4" />
            <span>+ Buat PO Bahan Baru</span>
          </button>
        </div>
      </div>

      {/* TailAdmin 4 Metric Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4">
        <div className="rounded-sm border border-[#E2E8F0] bg-white py-5 px-6 shadow-sm">
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-[#EFF2F7] text-[#3C50E0]">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-2xl font-bold text-[#1C2434]">
                {formatCompactRupiah(totalPOAmount)}
              </h4>
              <span className="text-xs font-medium text-[#64748B]">Total Nilai PO Terbit</span>
            </div>
            <span className="badge-tail badge-tail-primary text-xs">
              {filteredPOs.length} PO
            </span>
          </div>
        </div>

        <div className="rounded-sm border border-[#E2E8F0] bg-white py-5 px-6 shadow-sm">
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-[#EFF2F7] text-[#F0950C]">
            <Clock className="w-6 h-6" />
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-2xl font-bold text-[#F0950C]">
                {pendingCount} PO
              </h4>
              <span className="text-xs font-medium text-[#64748B]">Menunggu Otorisasi Owner</span>
            </div>
            <span className="badge-tail badge-tail-warning text-xs">Perlu Approval</span>
          </div>
        </div>

        <div className="rounded-sm border border-[#E2E8F0] bg-white py-5 px-6 shadow-sm">
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-[#EFF2F7] text-[#3C50E0]">
            <Truck className="w-6 h-6" />
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-2xl font-bold text-[#1C2434]">
                {purchaseOrders.filter(p => p.status === 'Sedang Dikirim').length} PO
              </h4>
              <span className="text-xs font-medium text-[#64748B]">Dalam Pengiriman Logistik</span>
            </div>
            <span className="badge-tail badge-tail-primary text-xs">On Delivery</span>
          </div>
        </div>

        <div className="rounded-sm border border-[#E2E8F0] bg-white py-5 px-6 shadow-sm">
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-[#EFF2F7] text-[#10B981]">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-2xl font-bold text-[#10B981]">
                {purchaseOrders.filter(p => p.status === 'Diterima Lapangan').length} Lengkap
              </h4>
              <span className="text-xs font-medium text-[#64748B]">Diterima & BAST Site</span>
            </div>
            <span className="badge-tail badge-tail-success text-xs">Lolos QC</span>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="tail-card p-3 sm:p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full md:w-auto flex-1">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Cari no. PO, vendor, atau item..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="tail-input pl-9 text-xs w-full min-h-[38px]"
            />
          </div>

          <select
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="tail-input text-xs w-full sm:w-auto min-w-[140px] min-h-[38px]"
          >
            <option value="all">Semua Proyek</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>{p.code}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1.5 md:pb-0 no-scrollbar">
          {['Semua', 'Pending Approval', 'Disetujui', 'Sedang Dikirim', 'Diterima Lapangan'].map((st) => (
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

      {/* PO Table */}
      <div className="tail-card">
        <div className="tail-card-header">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-[#1C2434]">
              Daftar Surat Pesanan Bahan (Purchase Order)
            </h3>
            <p className="text-xs text-[#64748B] mt-0.5">
              Otorisasi persetujuan pengadaan bahan mentah dan pelacakan surat jalan
            </p>
          </div>
          <span className="badge-tail badge-tail-gray text-xs">
            {filteredPOs.length} Dokumen PO
          </span>
        </div>

        <TableScrollWrapper minWidth="min-w-[840px]" hint="Geser daftar Purchase Order">
          <table className="tail-table">
            <thead>
              <tr>
                <th>No. PO</th>
                <th>Tgl Pengajuan</th>
                <th>Proyek Tujuan</th>
                <th>Supplier / Vendor</th>
                <th>Rincian Material</th>
                <th className="text-right">Nilai PO (Rp)</th>
                <th>Jadwal Kirim</th>
                <th className="text-center">Status</th>
                <th className="text-center">Aksi Alur</th>
              </tr>
            </thead>
            <tbody>
              {filteredPOs.map((po) => (
                <tr key={po.id}>
                  <td className="font-mono font-bold text-[#3C50E0] text-xs">
                    {po.poNumber}
                  </td>
                  <td className="font-mono text-xs text-[#64748B]">
                    {formatDateIndo(po.requestDate)}
                  </td>
                  <td>
                    <div className="font-bold text-[#1C2434] truncate max-w-[170px]">{po.projectName}</div>
                    <div className="text-[11px] text-[#64748B]">Pemohon: {po.picRequest}</div>
                  </td>
                  <td className="font-bold text-xs text-[#1C2434]">{po.vendorName}</td>
                  <td className="text-xs text-[#64748B] max-w-[210px]">{po.itemsSummary}</td>
                  <td className="text-right font-mono font-bold text-xs text-[#1C2434]">
                    {formatRupiah(po.totalAmount)}
                  </td>
                  <td className="font-mono text-xs text-[#64748B]">
                    {formatDateIndo(po.deliveryDate)}
                  </td>
                  <td className="text-center">
                    <span className={`badge-tail ${
                      po.status === 'Diterima Lapangan'
                        ? 'badge-tail-success'
                        : po.status === 'Sedang Dikirim'
                        ? 'badge-tail-primary'
                        : po.status === 'Disetujui'
                        ? 'badge-tail-primary'
                        : 'badge-tail-warning'
                    }`}>
                      {po.status}
                    </span>
                  </td>
                  <td className="text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      {po.status === 'Pending Approval' && (
                        <button
                          onClick={() => updatePOStatus(po.id, 'Disetujui')}
                          className="px-3 py-1.5 bg-[#F0950C] hover:bg-[#D97706] text-white font-bold rounded text-xs transition min-h-[32px]"
                        >
                          Setujui PO
                        </button>
                      )}
                      {po.status === 'Disetujui' && (
                        <button
                          onClick={() => updatePOStatus(po.id, 'Sedang Dikirim')}
                          className="px-3 py-1.5 bg-[#3C50E0] hover:bg-[#2F41C2] text-white font-bold rounded text-xs transition min-h-[32px]"
                        >
                          Kirim Logistik
                        </button>
                      )}
                      {po.status === 'Sedang Dikirim' && (
                        <button
                          onClick={() => updatePOStatus(po.id, 'Diterima Lapangan')}
                          className="px-3 py-1.5 bg-[#10B981] hover:bg-[#059669] text-white font-bold rounded text-xs transition min-h-[32px]"
                        >
                          Terima di Site
                        </button>
                      )}
                      {po.status === 'Diterima Lapangan' && (
                        <span className="text-xs text-[#10B981] font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> BAST Selesai
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableScrollWrapper>

        <div className="px-4 sm:px-6 py-3 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[#64748B]">
          <span>Surat jalan diverifikasi fisik oleh Pengawas Lapangan saat armada tiba di site</span>
          <span className="text-[#10B981] font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Sinkron Buku Besar Cost Control
          </span>
        </div>
      </div>
    </div>
  );
}
