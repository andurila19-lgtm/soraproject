'use client';

import React, { useState } from 'react';
import { useProject } from '@/context/ProjectContext';
import { CostExpense } from '@/lib/types';
import { X } from 'lucide-react';
import { formatRupiah } from '@/lib/utils';

export function AddExpenseModal() {
  const { isAddExpenseOpen, setIsAddExpenseOpen, addExpense, projects } = useProject();

  const [projectId, setProjectId] = useState(projects[0]?.id || '');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState<CostExpense['category']>('Material');
  const [description, setDescription] = useState('');
  const [vendorOrRecipient, setVendorOrRecipient] = useState('');
  const [budgetAllocated, setBudgetAllocated] = useState<number>(5000000);
  const [actualAmount, setActualAmount] = useState<number>(4800000);
  const [paymentMethod, setPaymentMethod] = useState<CostExpense['paymentMethod']>('Transfer Bank');
  const [receiptNo, setReceiptNo] = useState(`INV/SRA/${Date.now().toString().slice(-6)}`);

  if (!isAddExpenseOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !vendorOrRecipient) return;

    const prj = projects.find(p => p.id === projectId);
    const projectName = prj ? prj.name : 'Proyek Sora';

    addExpense({
      projectId,
      projectName,
      date,
      category,
      description,
      vendorOrRecipient,
      budgetAllocated: Number(budgetAllocated),
      actualAmount: Number(actualAmount),
      status: 'Approved',
      receiptNo,
      paymentMethod,
    });

    setIsAddExpenseOpen(false);
  };

  const calculatedVariance = budgetAllocated - actualAmount;
  const isOverbudget = calculatedVariance < 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs">
      <form 
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white rounded-md border border-[#E2E8F0] shadow-2xl max-h-[85vh] sm:max-h-[88vh] flex flex-col overflow-hidden my-auto"
      >
        {/* Pinned Modal Header */}
        <div className="px-4 sm:px-6 py-3.5 border-b border-[#E2E8F0] flex items-center justify-between shrink-0 bg-white">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
            <h3 className="font-bold text-sm sm:text-base text-[#1C2434]">
              Pencatatan Pengeluaran Biaya Lapangan
            </h3>
          </div>
          <button 
            type="button"
            onClick={() => setIsAddExpenseOpen(false)} 
            className="text-[#64748B] hover:text-[#1C2434] p-1.5 rounded hover:bg-[#EFF2F7] transition"
            aria-label="Tutup Formulir"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-1 min-h-0 overflow-y-auto modal-scroll p-4 sm:p-6 space-y-3 sm:space-y-4 text-xs overscroll-contain">
          <div>
            <label className="block text-[#1C2434] font-semibold mb-1">Pilih Proyek Terkait</label>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[#1C2434] font-semibold mb-1">Kategori Biaya</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="tail-input min-h-[38px]"
              >
                <option value="Material">Material & Hardware</option>
                <option value="Upah Tukang">Upah Tukang & Mandor</option>
                <option value="Subkontraktor">Vendor Subkontraktor</option>
                <option value="Overhead">Overhead & Logistik</option>
              </select>
            </div>
            <div>
              <label className="block text-[#1C2434] font-semibold mb-1">Tanggal Transaksi</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="tail-input min-h-[38px]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#1C2434] font-semibold mb-1">Deskripsi Pengeluaran</label>
            <input
              type="text"
              required
              placeholder="Contoh: Pembelian Lem Kuning & Amplas"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="tail-input min-h-[38px]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[#1C2434] font-semibold mb-1">Penerima / Vendor</label>
              <input
                type="text"
                required
                value={vendorOrRecipient}
                onChange={(e) => setVendorOrRecipient(e.target.value)}
                className="tail-input min-h-[38px]"
              />
            </div>
            <div>
              <label className="block text-[#1C2434] font-semibold mb-1">Metode Pembayaran</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as any)}
                className="tail-input min-h-[38px]"
              >
                <option value="Transfer Bank">Transfer Bank Rekening PT</option>
                <option value="Kas Lapangan (Petty Cash)">Kas Lapangan (Petty Cash Site)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[#1C2434] font-semibold mb-1">Alokasi Plafon HPP (Rp)</label>
              <input
                type="number"
                min="0"
                step="10000"
                required
                value={budgetAllocated}
                onChange={(e) => setBudgetAllocated(Number(e.target.value))}
                className="tail-input font-mono min-h-[38px]"
              />
            </div>
            <div>
              <label className="block text-[#1C2434] font-semibold mb-1">Nominal Aktual Keluar (Rp)</label>
              <input
                type="number"
                min="0"
                step="10000"
                required
                value={actualAmount}
                onChange={(e) => setActualAmount(Number(e.target.value))}
                className="tail-input font-mono min-h-[38px]"
              />
            </div>
          </div>

          <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-sm flex justify-between font-mono text-xs">
            <span className="text-[#64748B] font-sans">Variansi Biaya:</span>
            <span className={`font-bold ${isOverbudget ? 'text-[#D34053]' : 'text-[#10B981]'}`}>
              {isOverbudget ? 'Over Budget' : 'Hemat Budget'}: {formatRupiah(Math.abs(calculatedVariance))}
            </span>
          </div>
        </div>

        {/* Pinned Modal Footer */}
        <div className="px-4 sm:px-6 py-3 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-end gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => setIsAddExpenseOpen(false)}
            className="btn-tail-secondary py-2 px-4 text-xs font-semibold"
          >
            Batal
          </button>
          <button
            type="submit"
            className="btn-tail-primary py-2 px-5 text-xs font-semibold shadow-xs"
          >
            Simpan Pengeluaran
          </button>
        </div>
      </form>
    </div>
  );
}
