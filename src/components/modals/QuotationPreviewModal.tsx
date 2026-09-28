'use client';

import React from 'react';
import { useProject } from '@/context/ProjectContext';
import { X, Printer, Share2, FileSpreadsheet } from 'lucide-react';
import { formatRupiah, formatCompactRupiah, formatDateIndo } from '@/lib/utils';
import { TableScrollWrapper } from '@/components/TableScrollWrapper';

export function QuotationPreviewModal() {
  const { 
    isQuotationPreviewOpen, 
    setIsQuotationPreviewOpen, 
    boqItems, 
    projects, 
    selectedProjectId,
    showToast 
  } = useProject();

  if (!isQuotationPreviewOpen) return null;

  const currentProject = selectedProjectId === 'all' 
    ? projects[0] 
    : projects.find(p => p.id === selectedProjectId) || projects[0];

  const totalQuotationDPP = boqItems.reduce((acc, item) => acc + item.quotationPrice, 0);
  const ppn = totalQuotationDPP * 0.11;
  const grandTotal = totalQuotationDPP + ppn;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    showToast('Tautan dokumen penawaran resmi telah disalin ke clipboard.');
  };

  return (
    <div 
      onClick={(e) => { if (e.target === e.currentTarget) setIsQuotationPreviewOpen(false); }}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/40 backdrop-blur-xs overscroll-contain modal-backdrop-lock"
    >
      <div className="w-full max-w-4xl bg-white border border-[#E2E8F0] rounded-lg sm:rounded-md shadow-2xl flex flex-col max-h-[92dvh] sm:max-h-[90vh] overflow-hidden text-[#1C2434] my-auto modal-content-lock touch-pan-y">
        {/* Top Control Bar */}
        <div className="px-3 sm:px-6 py-3 sm:py-4 border-b border-[#E2E8F0] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-2 no-print bg-white shrink-0">
          <div className="flex items-center justify-between sm:justify-start gap-2">
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-[#3C50E0] shrink-0" />
              <h3 className="font-bold text-sm sm:text-base text-[#1C2434] truncate">
                Dokumen SPK & Penawaran Harga
              </h3>
            </div>
            <button
              onClick={() => setIsQuotationPreviewOpen(false)}
              className="sm:hidden p-1.5 rounded text-[#64748B] hover:text-[#1C2434] hover:bg-[#F1F5F9]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleCopyLink}
              className="btn-tail-secondary text-xs flex-1 sm:flex-initial justify-center py-2 px-3 min-h-[36px]"
            >
              <Share2 className="w-4 h-4" />
              <span>Salin Link</span>
            </button>
            <button
              onClick={handlePrint}
              className="btn-tail-primary text-xs flex-1 sm:flex-initial justify-center py-2 px-3 min-h-[36px]"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / PDF</span>
            </button>
            <button
              onClick={() => setIsQuotationPreviewOpen(false)}
              className="hidden sm:flex p-1.5 rounded text-[#64748B] hover:text-[#1C2434] hover:bg-[#F1F5F9] ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Sheet */}
        <div className="flex-1 min-h-0 overflow-y-auto modal-scroll p-4 sm:p-8 md:p-10 bg-white space-y-5 sm:space-y-6 print:p-0 print:m-0 text-xs overscroll-contain">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b-2 border-[#1C2434] pb-4">
            <div>
              <div className="text-xl sm:text-2xl font-bold tracking-tight text-[#1C2434]">
                PT SORA KARYA KREASI
              </div>
              <div className="text-xs font-semibold text-[#3C50E0] mt-0.5">
                General Contractor & Commercial Interior Fit-out
              </div>
              <div className="text-[11px] text-[#64748B] max-w-md mt-1 leading-normal">
                Head Office: Treasury Tower Lt. 18, SCBD Jakarta Selatan | Workshop: Kawasan Industri Cibubur, Jakarta Timur.<br />
                Telepon: +62 21 5590 2211 | Email: project@soraproject.co.id
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[10px] uppercase font-bold text-[#64748B] block">DOKUMEN RESMI</span>
              <span className="font-mono font-bold text-sm text-[#1C2434] block">NO: SRA/SPK/2026/09-082</span>
              <span className="text-xs text-[#64748B] block mt-0.5">Tanggal: 28 September 2026</span>
            </div>
          </div>

          {/* Client & Project Specs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-sm">
            <div>
              <span className="text-[10px] font-bold uppercase text-[#64748B] block mb-1">Ditujukan Kepada:</span>
              <div className="font-bold text-[#1C2434] text-sm">{currentProject.partnerName}</div>
              <div className="text-[#64748B] text-xs">PIC: {currentProject.endUser}</div>
              <div className="text-[#64748B] text-xs mt-0.5">Lokasi: {currentProject.location}</div>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase text-[#64748B] block mb-1">Ruang Lingkup Proyek:</span>
              <div className="font-bold text-[#1C2434] text-sm">{currentProject.name}</div>
              <div className="text-[#64748B] text-xs">Tipe: {currentProject.projectType} Fit-out</div>
              <div className="text-[#64748B] text-xs mt-0.5">Durasi Pelaksanaan: 75 Hari Kalender Kerja</div>
            </div>
          </div>

          {/* BOQ Table */}
          <div>
            <span className="font-bold uppercase text-xs text-[#1C2434] block mb-2 tracking-wider">
              Rincian Rencana Anggaran Biaya (BOQ)
            </span>
            <div className="border border-[#E2E8F0] rounded-sm overflow-hidden w-full">
              <TableScrollWrapper minWidth="min-w-[650px]" hint="Geser rincian penawaran harga">
                <table className="tail-table">
                <thead>
                  <tr>
                    <th className="w-12 text-center">No</th>
                    <th>Deskripsi Pekerjaan & Spesifikasi</th>
                    <th className="w-24 text-center">Volume</th>
                    <th className="text-right w-36">Harga Satuan</th>
                    <th className="text-right w-40">Jumlah Total (Rp)</th>
                  </tr>
                </thead>
                <tbody>
                  {boqItems.map((item, idx) => (
                    <tr key={item.id}>
                      <td className="text-center font-mono text-xs">{idx + 1}</td>
                      <td>
                        <div className="font-bold text-[#1C2434] text-xs">{item.itemDescription}</div>
                        <div className="text-[11px] text-[#64748B] mt-0.5">{item.specification}</div>
                      </td>
                      <td className="text-center font-mono font-semibold text-xs text-[#1C2434]">
                        {item.volume} {item.unit}
                      </td>
                      <td className="text-right font-mono text-xs text-[#64748B]">
                        {formatRupiah(item.quotationPrice / item.volume)}
                      </td>
                      <td className="text-right font-mono font-bold text-xs text-[#1C2434]">
                        {formatRupiah(item.quotationPrice)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-[#F7F9FC] font-bold border-t border-[#E2E8F0]">
                  <tr>
                    <td colSpan={4} className="text-right text-xs uppercase text-[#1C2434]">
                      Subtotal Penawaran (DPP):
                    </td>
                    <td className="text-right font-mono text-xs text-[#1C2434]">
                      {formatRupiah(totalQuotationDPP)}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4} className="text-right text-xs uppercase text-[#1C2434]">
                      Pajak Pertambahan Nilai (PPN 11%):
                    </td>
                    <td className="text-right font-mono text-xs text-[#1C2434]">
                      {formatRupiah(ppn)}
                    </td>
                  </tr>
                  <tr className="bg-[#EFF2F7] text-sm font-bold text-[#3C50E0]">
                    <td colSpan={4} className="text-right uppercase">
                      Grand Total Kontrak:
                    </td>
                    <td className="text-right font-mono text-base font-extrabold text-[#3C50E0]">
                      {formatRupiah(grandTotal)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </TableScrollWrapper>
          </div>
          </div>

          {/* Payment Terms */}
          <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-sm space-y-2">
            <span className="font-bold uppercase text-xs text-[#1C2434] block">
              Ketentuan Jadwal Termin Pembayaran:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-[#64748B] text-xs">
              <div>• <strong>Termin I (DP 30%):</strong> Saat Tanda Tangan SPK Kontrak Kerja.</div>
              <div>• <strong>Termin II (30%):</strong> Progres Fisik 40% (MEP & Rangka Gypsum).</div>
              <div>• <strong>Termin III (30%):</strong> Progres Fisik 80% (Pemasangan Joinery Cabinet).</div>
              <div>• <strong>Retensi (10%):</strong> 60 Hari Masa Pemeliharaan Garansi setelah BAST.</div>
            </div>
          </div>

          {/* Signatures */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 pt-6 border-t border-[#E2E8F0] text-center">
            <div className="space-y-12 sm:space-y-16">
              <span className="block font-semibold text-xs text-[#1C2434]">
                Disiapkan & Diajukan Oleh,<br />
                <strong className="text-sm">PT SORA KARYA KREASI</strong>
              </span>
              <div>
                <span className="font-bold underline block text-sm text-[#1C2434]">Ir. Hendra Gunawan, S.T.</span>
                <span className="text-xs text-[#64748B]">Direktur Operasional</span>
              </div>
            </div>

            <div className="space-y-12 sm:space-y-16">
              <span className="block font-semibold text-xs text-[#1C2434]">
                Disetujui & Diterima Oleh,<br />
                <strong className="text-sm">{currentProject.partnerName}</strong>
              </span>
              <div>
                <span className="font-bold underline block text-sm text-[#1C2434]">( ............................................ )</span>
                <span className="text-xs text-[#64748B]">Authorized Representative</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
