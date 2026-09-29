'use client';

import React, { useState } from 'react';
import { useProject } from '@/context/ProjectContext';
import { PaymentTermin } from '@/lib/types';
import { 
  CreditCard, 
  Search, 
  Send, 
  FileText, 
  X,
  CheckCircle2,
  Clock,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { formatRupiah, formatCompactRupiah, formatDateIndo } from '@/lib/utils';
import { TableScrollWrapper } from '@/components/TableScrollWrapper';

export function TerminView() {
  const { 
    termins, 
    updateTerminStatus, 
    projects, 
    selectedProjectId, 
    setSelectedProjectId,
    showToast 
  } = useProject();

  const [statusFilter, setStatusFilter] = useState<string>('Semua');
  const [search, setSearch] = useState('');
  const [isRecordPaymentOpen, setIsRecordPaymentOpen] = useState(false);
  const [selectedTerminForPay, setSelectedTerminForPay] = useState<PaymentTermin | null>(null);

  const filteredTermins = termins.filter((t) => {
    const matchesProject = selectedProjectId === 'all' || t.projectId === selectedProjectId;
    const matchesStatus = statusFilter === 'Semua' || t.status === statusFilter;
    const matchesSearch = t.projectName.toLowerCase().includes(search.toLowerCase()) ||
      t.clientName.toLowerCase().includes(search.toLowerCase()) ||
      t.terminName.toLowerCase().includes(search.toLowerCase()) ||
      t.invoiceNumber.toLowerCase().includes(search.toLowerCase());
    return matchesProject && matchesStatus && matchesSearch;
  });

  const totalBilled = filteredTermins.reduce((acc, t) => acc + t.amount, 0);
  const totalPaid = filteredTermins.filter(t => t.status === 'Lunas').reduce((acc, t) => acc + t.amount, 0);
  const totalPending = filteredTermins.filter(t => t.status === 'Menunggu Pembayaran' || t.status === 'Jatuh Tempo').reduce((acc, t) => acc + t.amount, 0);
  const totalRetention = filteredTermins.filter(t => t.terminName.toLowerCase().includes('retensi')).reduce((acc, t) => acc + t.amount, 0);

  const handleSendReminder = (t: PaymentTermin) => {
    showToast(`Pesan pengingat tagihan invoice "${t.invoiceNumber}" berhasil dikirim via WhatsApp ke ${t.clientName}.`);
  };

  return (
    <div className="space-y-6">
      {/* TailAdmin Page Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C2434]">
            Multi-Termin Pembayaran
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            Jadwal Penagihan Invoice Berbasis Milestone Fisik, Progress BAST, dan Retensi Pemeliharaan
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <nav>
            <ol className="hidden sm:flex items-center gap-1.5 text-xs text-[#64748B] mr-2">
              <li><span>Dashboard</span></li>
              <li>/</li>
              <li className="text-[#3C50E0] font-semibold">Termin Invoicing</li>
            </ol>
          </nav>

          <button
            onClick={() => showToast('Rekapitulasi seluruh invoice penagihan berhasil diunduh.')}
            className="btn-tail-secondary text-xs w-full sm:w-auto justify-center py-2.5 px-4 min-h-[38px]"
          >
            <FileText className="w-4 h-4 text-[#3C50E0]" />
            <span>Rekap Faktur Penagihan</span>
          </button>
        </div>
      </div>

      {/* TailAdmin 4 Metric Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4">
        <div className="rounded-sm border border-[#E2E8F0] bg-white py-5 px-6 shadow-sm">
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-[#EFF2F7] text-[#3C50E0]">
            <CreditCard className="w-6 h-6" />
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-2xl font-bold text-[#1C2434]">
                {formatCompactRupiah(totalBilled)}
              </h4>
              <span className="text-xs font-medium text-[#64748B]">Total Nilai Tagihan Termin</span>
            </div>
            <span className="badge-tail badge-tail-primary text-xs">
              {filteredTermins.length} Termin
            </span>
          </div>
        </div>

        <div className="rounded-sm border border-[#E2E8F0] bg-white py-5 px-6 shadow-sm">
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-[#EFF2F7] text-[#10B981]">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-2xl font-bold text-[#10B981]">
                {formatCompactRupiah(totalPaid)}
              </h4>
              <span className="text-xs font-medium text-[#64748B]">Arus Kas Masuk (Lunas)</span>
            </div>
            <span className="badge-tail badge-tail-success text-xs">Aman</span>
          </div>
        </div>

        <div className="rounded-sm border border-[#E2E8F0] bg-white py-5 px-6 shadow-sm">
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-[#EFF2F7] text-[#D34053]">
            <Clock className="w-6 h-6" />
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-2xl font-bold text-[#D34053]">
                {formatCompactRupiah(totalPending)}
              </h4>
              <span className="text-xs font-medium text-[#64748B]">Piutang Menunggu / Tempo</span>
            </div>
            <span className="badge-tail badge-tail-danger text-xs">Follow-up</span>
          </div>
        </div>

        <div className="rounded-sm border border-[#E2E8F0] bg-white py-5 px-6 shadow-sm">
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-[#EFF2F7] text-[#3C50E0]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-2xl font-bold text-[#1C2434]">
                {formatCompactRupiah(totalRetention)}
              </h4>
              <span className="text-xs font-medium text-[#64748B]">Retensi Pemeliharaan (10%)</span>
            </div>
            <span className="badge-tail badge-tail-primary text-xs">60 Hari BAST</span>
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
              placeholder="Cari invoice, klien, termin..."
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
          {['Semua', 'Lunas', 'Menunggu Pembayaran', 'Jatuh Tempo', 'Draft / Belum Ditagihkan'].map((st) => (
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

      {/* Termin Table */}
      <div className="tail-card">
        <div className="tail-card-header">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-[#1C2434]">
              Jadwal Termin Tagihan & Status Rekonsiliasi Pelunasan
            </h3>
            <p className="text-xs text-[#64748B] mt-0.5">
              Penagihan tertaut langsung dengan syarat penyelesaian progres fisik lapangan
            </p>
          </div>
          <span className="badge-tail badge-tail-gray text-xs">
            {filteredTermins.length} Tagihan
          </span>
        </div>

        <TableScrollWrapper minWidth="min-w-[860px]" hint="Geser jadwal termin penagihan">
          <table className="tail-table">
            <thead>
              <tr>
                <th>Nama Termin</th>
                <th>No. Invoice</th>
                <th>Proyek & Klien</th>
                <th>Syarat Milestone Pencairan</th>
                <th className="text-right">Nominal (Rp)</th>
                <th>Jatuh Tempo</th>
                <th>Tgl Pelunasan</th>
                <th className="text-center">Status Tagihan</th>
                <th className="text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredTermins.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <CreditCard className="w-10 h-10 text-[#94A3B8] mb-2" />
                      <p className="text-sm font-semibold text-[#1C2434]">Belum Ada Tagihan Termin</p>
                      <p className="text-xs text-[#64748B] mt-1 max-w-sm">
                        Jadwal penagihan termin faktur akan otomatis dibuat dan dipantau saat proyek baru didaftarkan.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredTermins.map((t) => (
                  <tr key={t.id}>
                  <td className="font-bold text-[#1C2434]">{t.terminName}</td>
                  <td className="font-mono text-[#3C50E0] font-bold text-xs">{t.invoiceNumber}</td>
                  <td>
                    <div className="font-bold text-[#1C2434]">{t.projectName}</div>
                    <div className="text-[11px] text-[#64748B]">{t.clientName}</div>
                  </td>
                  <td className="text-xs text-[#64748B] max-w-[220px]">{t.triggerCondition}</td>
                  <td className="text-right font-mono font-bold text-xs text-[#1C2434]">{formatRupiah(t.amount)}</td>
                  <td className={`font-mono text-xs ${t.status === 'Jatuh Tempo' ? 'text-[#D34053] font-bold' : 'text-[#64748B]'}`}>
                    {formatDateIndo(t.dueDate)}
                  </td>
                  <td className="font-mono text-xs text-[#64748B]">
                    {t.paidDate ? formatDateIndo(t.paidDate) : '-'}
                  </td>
                  <td className="text-center">
                    <span className={`badge-tail ${
                      t.status === 'Lunas'
                        ? 'badge-tail-success'
                        : t.status === 'Jatuh Tempo'
                        ? 'badge-tail-danger'
                        : t.status === 'Menunggu Pembayaran'
                        ? 'badge-tail-warning'
                        : 'badge-tail-gray'
                    }`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      {t.status !== 'Lunas' ? (
                        <>
                          <button
                            onClick={() => handleSendReminder(t)}
                            className="p-2 bg-[#F1F5F9] hover:bg-[#E2E8F0] rounded text-[#3C50E0] transition min-w-[34px] min-h-[34px] flex items-center justify-center"
                            title="Kirim Reminder WhatsApp"
                          >
                            <Send className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedTerminForPay(t);
                              setIsRecordPaymentOpen(true);
                            }}
                            className="px-3 py-1.5 bg-[#10B981] hover:bg-[#059669] text-white font-bold rounded text-xs transition min-h-[34px]"
                          >
                            Catat Lunas
                          </button>
                        </>
                      ) : (
                        <span className="text-xs text-[#10B981] font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Lunas
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
          </table>
        </TableScrollWrapper>

        <div className="px-4 sm:px-6 py-3 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[#64748B]">
          <span>Penagihan termin secara otomatis menerbitkan kuitansi tanda terima resmi</span>
          <span className="text-[#10B981] font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Administrasi Termin Terstandarisasi
          </span>
        </div>
      </div>

      {/* Record Payment Modal */}
      {isRecordPaymentOpen && selectedTerminForPay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-md border border-[#E2E8F0] shadow-2xl max-h-[85vh] sm:max-h-[88vh] flex flex-col overflow-hidden my-auto">
            {/* Pinned Modal Header */}
            <div className="px-4 sm:px-6 py-3.5 border-b border-[#E2E8F0] flex items-center justify-between shrink-0 bg-white">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                <h3 className="font-bold text-sm sm:text-base text-[#1C2434]">
                  Konfirmasi Pelunasan Termin
                </h3>
              </div>
              <button 
                type="button"
                onClick={() => setIsRecordPaymentOpen(false)} 
                className="text-[#64748B] hover:text-[#1C2434] p-1.5 rounded hover:bg-[#EFF2F7] transition"
                aria-label="Tutup Formulir"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Modal Body */}
            <div className="flex-1 min-h-0 overflow-y-auto modal-scroll p-4 sm:p-6 space-y-4 text-xs overscroll-contain">
              <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-sm space-y-1.5">
                <div className="text-[#64748B]">Nominal Dana Diterima:</div>
                <div className="text-xl font-bold text-[#1C2434] font-mono">
                  {formatRupiah(selectedTerminForPay.amount)}
                </div>
                <div className="text-xs text-[#64748B]">
                  {selectedTerminForPay.terminName} - {selectedTerminForPay.clientName}
                </div>
              </div>

              <div>
                <label className="block text-[#1C2434] font-semibold mb-1">Rekening Bank Penerima</label>
                <select className="tail-input min-h-[38px]">
                  <option value="bca">BCA Operasional (PT Sora Karya Kreasi - 8820-xxxx)</option>
                  <option value="mandiri">Mandiri Escrow Konstruksi (137-000-xxxx)</option>
                </select>
              </div>
            </div>

            {/* Pinned Modal Footer */}
            <div className="px-4 sm:px-6 py-3 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-end gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => setIsRecordPaymentOpen(false)}
                className="btn-tail-secondary py-2 px-4 text-xs font-semibold"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  updateTerminStatus(selectedTerminForPay.id, 'Lunas');
                  setIsRecordPaymentOpen(false);
                }}
                className="btn-tail-primary py-2 px-5 text-xs font-semibold shadow-xs"
              >
                Konfirmasi Dana Masuk
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
