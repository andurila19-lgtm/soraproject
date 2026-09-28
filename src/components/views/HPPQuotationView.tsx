'use client';

import React, { useState } from 'react';
import { useProject } from '@/context/ProjectContext';
import { BOQItem } from '@/lib/types';
import { 
  Calculator, 
  Plus, 
  FileSpreadsheet, 
  DollarSign,
  X,
  Percent,
  Receipt,
  CheckCircle2
} from 'lucide-react';
import { formatRupiah, formatCompactRupiah } from '@/lib/utils';
import { TableScrollWrapper } from '@/components/TableScrollWrapper';

export function HPPQuotationView() {
  const { 
    boqItems, 
    addBOQItem, 
    projects, 
    selectedProjectId, 
    setSelectedProjectId,
    setIsQuotationPreviewOpen 
  } = useProject();

  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [contingencyPercent, setContingencyPercent] = useState<number>(5);
  const [includePPN, setIncludePPN] = useState<boolean>(true);
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);

  const categories = [
    'Semua',
    'Material & Hardware',
    'Tenaga Kerja',
    'Subkontraktor Spesialis',
    'Overhead & Operasional',
  ];

  const filteredItems = activeCategory === 'Semua' 
    ? boqItems 
    : boqItems.filter(i => i.category === activeCategory);

  // Summary Calculations
  const rawHPP = boqItems.reduce((acc, item) => acc + item.totalHPP, 0);
  const contingencyAmount = (rawHPP * contingencyPercent) / 100;
  const totalHPPWithContingency = rawHPP + contingencyAmount;
  
  const totalQuotationDPP = boqItems.reduce((acc, item) => acc + item.quotationPrice, 0) + contingencyAmount;
  const ppnAmount = includePPN ? totalQuotationDPP * 0.11 : 0;
  const finalQuotationGrandTotal = totalQuotationDPP + ppnAmount;
  const estimatedGrossProfit = totalQuotationDPP - totalHPPWithContingency;

  return (
    <div className="space-y-6">
      {/* TailAdmin Page Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1C2434]">
            Estimator HPP & BOQ
          </h2>
          <p className="text-sm text-[#64748B] mt-0.5">
            Kalkulator Modal Dasar Proyek, Markup Margin, dan Generator Dokumen Quotation Deal
          </p>
        </div>

        <div className="flex items-center gap-3">
          <nav>
            <ol className="hidden sm:flex items-center gap-1.5 text-xs text-[#64748B] mr-2">
              <li><span>Dashboard</span></li>
              <li>/</li>
              <li className="text-[#3C50E0] font-semibold">HPP & BOQ</li>
            </ol>
          </nav>

          <button
            onClick={() => setIsAddItemOpen(true)}
            className="btn-tail-secondary text-xs"
          >
            <Plus className="w-4 h-4 text-[#3C50E0]" />
            <span>+ Tambah Item BOQ</span>
          </button>
          <button
            onClick={() => setIsQuotationPreviewOpen(true)}
            className="btn-tail-primary text-xs"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Cetak SPK / Quotation</span>
          </button>
        </div>
      </div>

      {/* TailAdmin 4 KPI Metric Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4">
        <div className="rounded-sm border border-[#E2E8F0] bg-white py-5 px-6 shadow-sm">
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-[#EFF2F7] text-[#3C50E0]">
            <Calculator className="w-6 h-6" />
          </div>
          <div className="mt-4">
            <h4 className="text-2xl font-bold text-[#1C2434]">
              {formatCompactRupiah(rawHPP)}
            </h4>
            <span className="text-xs font-medium text-[#64748B]">Modal Dasar (HPP Murni)</span>
            <div className="mt-2 text-[11px] text-[#64748B] flex justify-between">
              <span>Kontingensi ({contingencyPercent}%):</span>
              <strong className="text-[#1C2434]">{formatCompactRupiah(contingencyAmount)}</strong>
            </div>
          </div>
        </div>

        <div className="rounded-sm border border-[#E2E8F0] bg-white py-5 px-6 shadow-sm">
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-[#EFF2F7] text-[#10B981]">
            <DollarSign className="w-6 h-6" />
          </div>
          <div className="mt-4">
            <h4 className="text-2xl font-bold text-[#10B981]">
              {formatCompactRupiah(totalQuotationDPP)}
            </h4>
            <span className="text-xs font-medium text-[#64748B]">Nilai Penawaran (DPP)</span>
            <div className="mt-2 text-[11px] text-[#10B981] font-semibold flex justify-between">
              <span>Estimasi Laba Kotor:</span>
              <strong>+{formatCompactRupiah(estimatedGrossProfit)}</strong>
            </div>
          </div>
        </div>

        <div className="rounded-sm border border-[#E2E8F0] bg-white py-5 px-6 shadow-sm">
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-[#EFF2F7] text-[#F0950C]">
            <Receipt className="w-6 h-6" />
          </div>
          <div className="mt-4">
            <h4 className="text-2xl font-bold text-[#1C2434]">
              {formatCompactRupiah(finalQuotationGrandTotal)}
            </h4>
            <span className="text-xs font-medium text-[#64748B]">Total Kontrak Quotation (+PPN)</span>
            <div className="mt-2 text-[11px] text-[#64748B] flex justify-between">
              <span>PPN 11%:</span>
              <strong className="text-[#1C2434]">{formatCompactRupiah(ppnAmount)}</strong>
            </div>
          </div>
        </div>

        <div className="rounded-sm border border-[#E2E8F0] bg-white py-5 px-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#64748B]">Target Gross Margin</span>
              <span className="badge-tail badge-tail-primary text-xs">Standard Deal</span>
            </div>
            <h4 className="text-2xl font-bold text-[#3C50E0] mt-2">
              ~30.5%
            </h4>
            <span className="text-xs text-[#64748B]">Berdasarkan markup bertingkat</span>
          </div>

          <label className="text-xs text-[#1C2434] font-medium cursor-pointer flex items-center gap-2 mt-4 pt-3 border-t border-[#E2E8F0]">
            <input
              type="checkbox"
              checked={includePPN}
              onChange={(e) => setIncludePPN(e.target.checked)}
              className="rounded text-[#3C50E0] focus:ring-[#3C50E0]"
            />
            <span>Sertakan PPN 11% Faktur Resmi</span>
          </label>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="tail-card p-3 flex items-center gap-2 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-xs px-3.5 py-1.5 rounded-sm font-medium transition whitespace-nowrap ${
              activeCategory === cat
                ? 'bg-[#3C50E0] text-white font-semibold'
                : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* TailAdmin BOQ Table */}
      <div className="tail-card">
        <div className="tail-card-header">
          <div>
            <h3 className="text-base font-bold text-[#1C2434]">
              Rincian Bill of Quantities (BOQ) & Komposisi HPP
            </h3>
            <p className="text-xs text-[#64748B] mt-0.5">
              Transparansi struktur biaya bahan mentah, tukang spesialis, dan overhead
            </p>
          </div>
          <span className="badge-tail badge-tail-gray text-xs">
            {filteredItems.length} Item Pekerjaan
          </span>
        </div>

        <TableScrollWrapper minWidth="min-w-[850px]" hint="Geser rincian item BOQ & HPP">
          <table className="tail-table">
            <thead>
              <tr>
                <th>Kategori</th>
                <th>Deskripsi Item Pekerjaan</th>
                <th>Spesifikasi Teknis / Merek</th>
                <th className="text-center">Volume</th>
                <th className="text-right">HPP Satuan</th>
                <th className="text-right">Total HPP Modal</th>
                <th className="text-center">Markup</th>
                <th className="text-right">Harga Penawaran</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <span className="badge-tail badge-tail-primary text-xs">
                      {item.category}
                    </span>
                  </td>
                  <td className="font-bold text-[#1C2434]">{item.itemDescription}</td>
                  <td className="text-xs text-[#64748B]">{item.specification}</td>
                  <td className="text-center font-mono font-semibold text-xs text-[#1C2434]">
                    {item.volume} {item.unit}
                  </td>
                  <td className="text-right font-mono text-xs text-[#64748B]">
                    {formatRupiah(item.unitPriceHPP)}
                  </td>
                  <td className="text-right font-mono font-bold text-xs text-[#1C2434]">
                    {formatRupiah(item.totalHPP)}
                  </td>
                  <td className="text-center font-mono font-bold text-xs text-[#10B981]">
                    +{item.markupPercent}%
                  </td>
                  <td className="text-right font-mono font-bold text-xs text-[#3C50E0]">
                    {formatRupiah(item.quotationPrice)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-[#F7F9FC] font-bold border-t border-[#E2E8F0]">
              <tr>
                <td colSpan={5} className="text-right uppercase text-xs text-[#1C2434]">
                  Subtotal Modal HPP:
                </td>
                <td className="text-right font-mono text-sm text-[#1C2434]">
                  {formatRupiah(rawHPP)}
                </td>
                <td className="text-center text-xs text-[#10B981]">
                  ~30% Avg
                </td>
                <td className="text-right font-mono text-sm text-[#3C50E0]">
                  {formatRupiah(totalQuotationDPP - contingencyAmount)}
                </td>
              </tr>
            </tfoot>
          </table>
        </TableScrollWrapper>

        <div className="px-6 py-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B]">
          <span>Perhitungan terhubung otomatis ke kalkulator profit margin</span>
          <span className="text-[#10B981] font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Rumus Akuntansi Aktif
          </span>
        </div>
      </div>

      {/* Add BOQ Item Modal */}
      {isAddItemOpen && (
        <AddBOQItemModal onClose={() => setIsAddItemOpen(false)} />
      )}
    </div>
  );
}

function AddBOQItemModal({ onClose }: { onClose: () => void }) {
  const { addBOQItem } = useProject();
  const [category, setCategory] = useState<BOQItem['category']>('Material & Hardware');
  const [itemDescription, setItemDescription] = useState('');
  const [specification, setSpecification] = useState('');
  const [unit, setUnit] = useState('Lembar');
  const [volume, setVolume] = useState<number>(10);
  const [unitPriceHPP, setUnitPriceHPP] = useState<number>(250000);
  const [markupPercent, setMarkupPercent] = useState<number>(30);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemDescription) return;
    addBOQItem({
      category,
      itemDescription,
      specification: specification || 'Standar Spesifikasi Arsitektur',
      unit,
      volume: Number(volume),
      unitPriceHPP: Number(unitPriceHPP),
      markupPercent: Number(markupPercent),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs">
      <form 
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white rounded-md border border-[#E2E8F0] shadow-2xl max-h-[85vh] sm:max-h-[88vh] flex flex-col overflow-hidden my-auto"
      >
        {/* Pinned Modal Header */}
        <div className="px-4 sm:px-6 py-3.5 border-b border-[#E2E8F0] flex items-center justify-between shrink-0 bg-white">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3C50E0]" />
            <h3 className="font-bold text-sm sm:text-base text-[#1C2434]">
              Tambah Item Pekerjaan BOQ (RAB)
            </h3>
          </div>
          <button 
            type="button"
            onClick={onClose} 
            className="text-[#64748B] hover:text-[#1C2434] p-1.5 rounded hover:bg-[#EFF2F7] transition"
            aria-label="Tutup Formulir"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-1 min-h-0 overflow-y-auto modal-scroll p-4 sm:p-6 space-y-3 sm:space-y-4 text-xs overscroll-contain">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[#1C2434] font-semibold mb-1">Kategori Biaya</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="tail-input min-h-[38px]"
              >
                <option value="Material & Hardware">Material & Hardware</option>
                <option value="Tenaga Kerja">Tenaga Kerja</option>
                <option value="Subkontraktor Spesialis">Subkontraktor Spesialis</option>
                <option value="Overhead & Operasional">Overhead & Operasional</option>
              </select>
            </div>
            <div>
              <label className="block text-[#1C2434] font-semibold mb-1">Satuan</label>
              <input
                type="text"
                required
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="tail-input min-h-[38px]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#1C2434] font-semibold mb-1">Nama Item Pekerjaan</label>
            <input
              type="text"
              required
              placeholder="Contoh: Pembuatan Cabinet Pantry HPL"
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
              className="tail-input min-h-[38px]"
            />
          </div>

          <div>
            <label className="block text-[#1C2434] font-semibold mb-1">Spesifikasi Merek / Material</label>
            <input
              type="text"
              placeholder="Contoh: Taco HPL TH-882J + Plywood 18mm"
              value={specification}
              onChange={(e) => setSpecification(e.target.value)}
              className="tail-input min-h-[38px]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[#1C2434] font-semibold mb-1">Volume</label>
              <input
                type="number"
                min="0.1"
                step="any"
                required
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="tail-input min-h-[38px]"
              />
            </div>
            <div>
              <label className="block text-[#1C2434] font-semibold mb-1">HPP Satuan (Rp)</label>
              <input
                type="number"
                min="0"
                step="1000"
                required
                value={unitPriceHPP}
                onChange={(e) => setUnitPriceHPP(Number(e.target.value))}
                className="tail-input font-mono min-h-[38px]"
              />
            </div>
            <div>
              <label className="block text-[#1C2434] font-semibold mb-1">Markup (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                required
                value={markupPercent}
                onChange={(e) => setMarkupPercent(Number(e.target.value))}
                className="tail-input font-mono min-h-[38px]"
              />
            </div>
          </div>
        </div>

        {/* Pinned Modal Footer */}
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
            Simpan ke BOQ Proyek
          </button>
        </div>
      </form>
    </div>
  );
}
