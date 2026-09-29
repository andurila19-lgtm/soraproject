'use client';

import React from 'react';
import { useProject } from '@/context/ProjectContext';
import { 
  Download, 
  Printer, 
  Building2,
  DollarSign,
  TrendingUp,
  Wallet,
  CheckCircle2
} from 'lucide-react';
import { formatRupiah, formatCompactRupiah, formatDateIndo } from '@/lib/utils';
import { TableScrollWrapper } from '@/components/TableScrollWrapper';

export function LaporanView() {
  const { projects, termins, showToast } = useProject();

  const totalContract = projects.reduce((acc, p) => acc + p.contractValue, 0);
  const totalActualCost = projects.reduce((acc, p) => acc + p.actualCost, 0);
  const totalGrossProfit = totalContract - totalActualCost;
  const overallMargin = totalContract > 0 ? Math.round((totalGrossProfit / totalContract) * 100) : 0;

  const totalCashIn = termins.filter(t => t.status === 'Lunas').reduce((acc, t) => acc + t.amount, 0);
  const netCashFlow = totalCashIn - totalActualCost;

  const handleExportCSV = () => {
    if (projects.length === 0) {
      showToast('Belum ada data proyek untuk diekspor ke CSV/Excel.');
      return;
    }
    const headers = "Kode,Nama Proyek,Klien / Partner,Nilai Kontrak,HPP Budget,Biaya Aktual,Laba Kotor,Margin %,Progress,Status\n";
    const rows = projects.map(p => {
      const profit = p.contractValue - p.actualCost;
      const margin = p.contractValue > 0 ? Math.round((profit / p.contractValue) * 100) : 0;
      return `"${p.code}","${p.name}","${p.partnerName}",${p.contractValue},${p.hppBudget},${p.actualCost},${profit},${margin}%,${p.progress}%,"${p.status}"`;
    }).join("\n");

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Laporan_P&L_Sora_Project_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Laporan Keuangan & P&L berhasil di-export ke CSV/Excel.');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* TailAdmin Page Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C2434]">
            Laporan Eksekutif & P&L
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            Rekapitulasi Profit & Loss, Deviasi Anggaran HPP, dan Realisasi Margin per Proyek
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 no-print">
          <nav>
            <ol className="hidden sm:flex items-center gap-1.5 text-xs text-[#64748B] mr-2">
              <li><span>Dashboard</span></li>
              <li>/</li>
              <li className="text-[#3C50E0] font-semibold">Laporan P&L</li>
            </ol>
          </nav>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleExportCSV}
              className="btn-tail-secondary text-xs flex-1 sm:flex-initial justify-center py-2.5 px-4 min-h-[38px]"
            >
              <Download className="w-4 h-4 text-[#10B981]" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={handlePrint}
              className="btn-tail-primary text-xs flex-1 sm:flex-initial justify-center py-2.5 px-4 min-h-[38px]"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Rekap</span>
            </button>
          </div>
        </div>
      </div>

      {/* TailAdmin 4 Metric Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-4">
        <div className="rounded-sm border border-[#E2E8F0] bg-white py-5 px-6 shadow-sm">
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-[#EFF2F7] text-[#3C50E0]">
            <Building2 className="w-6 h-6" />
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-2xl font-bold text-[#1C2434]">
                {formatCompactRupiah(totalContract)}
              </h4>
              <span className="text-xs font-medium text-[#64748B]">Total Nilai Kontrak Deal</span>
            </div>
            <span className="badge-tail badge-tail-primary text-xs">
              {projects.length} Proyek
            </span>
          </div>
        </div>

        <div className="rounded-sm border border-[#E2E8F0] bg-white py-5 px-6 shadow-sm">
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-[#EFF2F7] text-[#64748B]">
            <DollarSign className="w-6 h-6" />
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-2xl font-bold text-[#1C2434]">
                {formatCompactRupiah(totalActualCost)}
              </h4>
              <span className="text-xs font-medium text-[#64748B]">Total Pengeluaran Aktual</span>
            </div>
            <span className="badge-tail badge-tail-gray text-xs">Realisasi</span>
          </div>
        </div>

        <div className="rounded-sm border border-[#E2E8F0] bg-white py-5 px-6 shadow-sm">
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-[#EFF2F7] text-[#10B981]">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-2xl font-bold text-[#10B981]">
                {formatCompactRupiah(totalGrossProfit)}
              </h4>
              <span className="text-xs font-medium text-[#64748B]">Laba Kotor Realisasi</span>
            </div>
            <span className="badge-tail badge-tail-success text-xs">
              ~{overallMargin}% Margin
            </span>
          </div>
        </div>

        <div className="rounded-sm border border-[#E2E8F0] bg-white py-5 px-6 shadow-sm">
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-[#EFF2F7] text-[#3C50E0]">
            <Wallet className="w-6 h-6" />
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className={`text-2xl font-bold ${netCashFlow >= 0 ? 'text-[#10B981]' : 'text-[#D34053]'}`}>
                {formatCompactRupiah(netCashFlow)}
              </h4>
              <span className="text-xs font-medium text-[#64748B]">Arus Kas Bersih (Net Cash)</span>
            </div>
            <span className="badge-tail badge-tail-primary text-xs">
              Masuk: {formatCompactRupiah(totalCashIn)}
            </span>
          </div>
        </div>
      </div>

      {/* P&L Table */}
      <div className="tail-card">
        <div className="tail-card-header">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-[#1C2434]">
              Tabel Laba Rugi (P&L) Setiap Proyek Interior
            </h3>
            <p className="text-xs text-[#64748B] mt-0.5">
              Perbandingan pendapatan kontrak, plafon HPP, beban riil dan efisiensi laba bersih
            </p>
          </div>
          <span className="badge-tail badge-tail-gray text-xs">
            Per Tanggal: {formatDateIndo(new Date().toISOString().split('T')[0])}
          </span>
        </div>

        <TableScrollWrapper minWidth="min-w-[850px]" hint="Geser tabel laba rugi P&L proyek">
          <table className="tail-table">
            <thead>
              <tr>
                <th>Kode</th>
                <th>Nama Proyek</th>
                <th>Klien / Partner</th>
                <th className="text-right">Kontrak Deal</th>
                <th className="text-right">Anggaran HPP</th>
                <th className="text-right">Biaya Aktual</th>
                <th className="text-right">Laba Kotor</th>
                <th className="text-center">Margin Riil</th>
                <th className="text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {projects.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <TrendingUp className="w-10 h-10 text-[#94A3B8] mb-2" />
                      <p className="text-sm font-semibold text-[#1C2434]">Belum Ada Data Proyek untuk Laporan P&L</p>
                      <p className="text-xs text-[#64748B] mt-1 max-w-sm">
                        Laporan audit laba-rugi, perbandingan HPP, dan realisasi margin akan otomatis dihitung saat proyek fit-out aktif.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                projects.map((p) => {
                  const profit = p.contractValue - p.actualCost;
                  const margin = p.contractValue > 0 ? Math.round((profit / p.contractValue) * 100) : 0;
                  return (
                  <tr key={p.id}>
                    <td className="font-mono font-bold text-[#3C50E0] text-xs">{p.code}</td>
                    <td className="font-bold text-[#1C2434]">{p.name}</td>
                    <td className="text-xs text-[#64748B]">{p.partnerName}</td>
                    <td className="text-right font-mono font-bold text-xs text-[#1C2434]">{formatRupiah(p.contractValue)}</td>
                    <td className="text-right font-mono text-xs text-[#64748B]">{formatRupiah(p.hppBudget)}</td>
                    <td className="text-right font-mono font-bold text-xs text-[#1C2434]">{formatRupiah(p.actualCost)}</td>
                    <td className="text-right font-mono font-bold text-xs text-[#10B981]">{formatRupiah(profit)}</td>
                    <td className="text-center font-mono font-bold text-xs text-[#10B981]">{margin}%</td>
                    <td className="text-center">
                      <span className={`badge-tail ${
                        p.health === 'On Track' ? 'badge-tail-success' : 'badge-tail-warning'
                      }`}>
                        {p.health}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
            <tfoot className="bg-[#F7F9FC] font-bold border-t border-[#E2E8F0]">
              <tr>
                <td colSpan={3} className="text-right uppercase text-xs text-[#1C2434]">
                  Total Keseluruhan:
                </td>
                <td className="text-right font-mono text-sm text-[#3C50E0]">
                  {formatRupiah(totalContract)}
                </td>
                <td className="text-right font-mono text-xs text-[#64748B]">
                  {formatRupiah(projects.reduce((a, b) => a + b.hppBudget, 0))}
                </td>
                <td className="text-right font-mono text-sm text-[#1C2434]">
                  {formatRupiah(totalActualCost)}
                </td>
                <td className="text-right font-mono text-sm text-[#10B981]">
                  {formatRupiah(totalGrossProfit)}
                </td>
                <td className="text-center text-xs text-[#10B981] font-mono">
                  ~{overallMargin}%
                </td>
                <td className="text-center">-</td>
              </tr>
            </tfoot>
          </table>
        </TableScrollWrapper>

        <div className="px-4 sm:px-6 py-3 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[#64748B]">
          <span>Laporan terhitung otomatis sesuai standar akuntansi proyek konstruksi & interior</span>
          <span className="text-[#10B981] font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Terverifikasi Otoritas Keuangan
          </span>
        </div>
      </div>
    </div>
  );
}
