'use client';

import React, { useState } from 'react';
import { useProject } from '@/context/ProjectContext';
import { CostExpense } from '@/lib/types';
import { 
  Plus, 
  Search, 
  DollarSign, 
  Receipt, 
  AlertTriangle,
  CheckCircle2,
  TrendingDown,
  TrendingUp
} from 'lucide-react';
import { formatRupiah, formatCompactRupiah, formatDateIndo } from '@/lib/utils';
import { TableScrollWrapper } from '@/components/TableScrollWrapper';

export function CostControlView() {
  const { 
    expenses, 
    approveExpense, 
    projects, 
    selectedProjectId, 
    setSelectedProjectId,
    setIsAddExpenseOpen,
    role 
  } = useProject();

  const [categoryFilter, setCategoryFilter] = useState<string>('Semua');
  const [search, setSearch] = useState<string>('');

  const filteredExpenses = expenses.filter((e) => {
    const matchesProject = selectedProjectId === 'all' || e.projectId === selectedProjectId;
    const matchesCategory = categoryFilter === 'Semua' || e.category === categoryFilter;
    const matchesSearch = e.description.toLowerCase().includes(search.toLowerCase()) ||
      e.projectName.toLowerCase().includes(search.toLowerCase()) ||
      e.vendorOrRecipient.toLowerCase().includes(search.toLowerCase()) ||
      e.receiptNo.toLowerCase().includes(search.toLowerCase());
    return matchesProject && matchesCategory && matchesSearch;
  });

  const totalBudget = filteredExpenses.reduce((acc, e) => acc + e.budgetAllocated, 0);
  const totalActual = filteredExpenses.reduce((acc, e) => acc + e.actualAmount, 0);
  const totalVariance = totalBudget - totalActual;
  const isNetOverbudget = totalVariance < 0;

  // Breakdown by Category
  const categories = ['Material', 'Upah Tukang', 'Subkontraktor', 'Overhead'] as const;
  const projectExpenses = selectedProjectId === 'all' 
    ? expenses 
    : expenses.filter(e => e.projectId === selectedProjectId);

  const categoryStats = categories.map((cat) => {
    const items = projectExpenses.filter(e => e.category === cat);
    const budget = items.reduce((acc, e) => acc + e.budgetAllocated, 0);
    const actual = items.reduce((acc, e) => acc + e.actualAmount, 0);
    const diff = budget - actual;
    return { category: cat, budget, actual, diff };
  });

  const flaggedCount = projectExpenses.filter(e => e.variance < 0).length;

  return (
    <div className="space-y-6">
      {/* TailAdmin Page Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C2434]">
            Cost Control & Variansi HPP
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            Buku Besar Pengeluaran Lapangan vs Plafon RAB HPP untuk Proteksi Gross Margin
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <nav>
            <ol className="hidden sm:flex items-center gap-1.5 text-xs text-[#64748B] mr-2">
              <li><span>Dashboard</span></li>
              <li>/</li>
              <li className="text-[#3C50E0] font-semibold">Cost Control</li>
            </ol>
          </nav>

          <button
            onClick={() => setIsAddExpenseOpen(true)}
            className="btn-tail-primary text-xs w-full sm:w-auto justify-center py-2.5 px-4 min-h-[38px]"
          >
            <Plus className="w-4 h-4" />
            <span>+ Catat Pengeluaran Baru</span>
          </button>
        </div>
      </div>

      {/* TailAdmin 4 Metric Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4">
        <div className="rounded-sm border border-[#E2E8F0] bg-white py-5 px-6 shadow-sm">
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-[#EFF2F7] text-[#3C50E0]">
            <Receipt className="w-6 h-6" />
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-2xl font-bold text-[#1C2434]">
                {formatCompactRupiah(totalBudget)}
              </h4>
              <span className="text-xs font-medium text-[#64748B]">Total Alokasi Plafon HPP</span>
            </div>
            <span className="badge-tail badge-tail-primary text-xs">Plafon RAB</span>
          </div>
        </div>

        <div className="rounded-sm border border-[#E2E8F0] bg-white py-5 px-6 shadow-sm">
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-[#EFF2F7] text-[#10B981]">
            <DollarSign className="w-6 h-6" />
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-2xl font-bold text-[#1C2434]">
                {formatCompactRupiah(totalActual)}
              </h4>
              <span className="text-xs font-medium text-[#64748B]">Realisasi Pengeluaran Aktual</span>
            </div>
            <span className="badge-tail badge-tail-success text-xs">{filteredExpenses.length} Bukti</span>
          </div>
        </div>

        <div className="rounded-sm border border-[#E2E8F0] bg-white py-5 px-6 shadow-sm">
          <div className={`flex h-11.5 w-11.5 items-center justify-center rounded-full bg-[#EFF2F7] ${
            isNetOverbudget ? 'text-[#D34053]' : 'text-[#10B981]'
          }`}>
            {isNetOverbudget ? <TrendingDown className="w-6 h-6" /> : <TrendingUp className="w-6 h-6" />}
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className={`text-2xl font-bold ${isNetOverbudget ? 'text-[#D34053]' : 'text-[#10B981]'}`}>
                {isNetOverbudget ? '-' : '+'}{formatCompactRupiah(Math.abs(totalVariance))}
              </h4>
              <span className="text-xs font-medium text-[#64748B]">Net Variansi Selisih</span>
            </div>
            <span className={`badge-tail ${isNetOverbudget ? 'badge-tail-danger' : 'badge-tail-success'} text-xs`}>
              {isNetOverbudget ? 'Defisit' : 'Efisiensi'}
            </span>
          </div>
        </div>

        <div className="rounded-sm border border-[#E2E8F0] bg-white py-5 px-6 shadow-sm">
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-[#EFF2F7] text-[#F0950C]">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-2xl font-bold text-[#F0950C]">
                {flaggedCount} Transaksi
              </h4>
              <span className="text-xs font-medium text-[#64748B]">Item Melebihi Plafon</span>
            </div>
            <span className="badge-tail badge-tail-warning text-xs">Perlu Otorisasi</span>
          </div>
        </div>
      </div>

      {/* Category Plafon Monitoring Cards */}
      <div className="tail-card p-5">
        <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
          <div>
            <h4 className="text-sm font-bold text-[#1C2434]">
              Monitoring Penyerapan Plafon Biaya per Kategori
            </h4>
            <p className="text-xs text-[#64748B] mt-0.5">
              Peringatan dini variansi untuk mencegah pembengkakan ongkos proyek
            </p>
          </div>
          <span className="badge-tail badge-tail-gray text-xs">4 Kategori Utama</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {categoryStats.map((stat) => {
            const percent = stat.budget > 0 ? Math.round((stat.actual / stat.budget) * 100) : 0;
            const isOver = stat.diff < 0;
            return (
              <div key={stat.category} className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-sm space-y-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-[#1C2434]">{stat.category}</span>
                  <span className={`font-mono ${isOver ? 'text-[#D34053]' : 'text-[#10B981]'}`}>{percent}%</span>
                </div>
                <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${isOver ? 'bg-[#D34053]' : 'bg-[#3C50E0]'}`}
                    style={{ width: `${Math.min(100, percent)}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-[#64748B] font-mono pt-1">
                  <span>Aktual: {formatCompactRupiah(stat.actual)}</span>
                  <span>Budget: {formatCompactRupiah(stat.budget)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Control Bar: Filters & Search */}
      <div className="tail-card p-3 sm:p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full md:w-auto flex-1">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Cari deskripsi, vendor, kuitansi..."
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
          {['Semua', 'Material', 'Upah Tukang', 'Subkontraktor', 'Overhead'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`text-xs px-3 py-2 rounded-sm font-medium transition whitespace-nowrap min-h-[36px] ${
                categoryFilter === cat
                  ? 'bg-[#3C50E0] text-white font-semibold'
                  : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Ledger Table */}
      <div className="tail-card">
        <div className="tail-card-header">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-[#1C2434]">
              Buku Besar Pengeluaran & Jurnal Variansi Biaya
            </h3>
            <p className="text-xs text-[#64748B] mt-0.5">
              Pencatatan faktur kuitansi riil dan verifikasi otorisasi kas keluar
            </p>
          </div>
          <span className="badge-tail badge-tail-gray text-xs">
            {filteredExpenses.length} Transaksi Terdata
          </span>
        </div>

        <TableScrollWrapper minWidth="min-w-[880px]" hint="Geser buku besar pengeluaran">
          <table className="tail-table">
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>No. Kuitansi</th>
                <th>Proyek</th>
                <th>Kategori</th>
                <th>Deskripsi Transaksi</th>
                <th>Penerima / Vendor</th>
                <th className="text-right">Alokasi Plafon</th>
                <th className="text-right">Realisasi Aktual</th>
                <th className="text-right">Variansi</th>
                <th className="text-center">Status</th>
                <th className="text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((exp) => {
                const isOver = exp.variance < 0;
                return (
                  <tr key={exp.id}>
                    <td className="font-mono text-xs text-[#64748B]">{formatDateIndo(exp.date)}</td>
                    <td className="font-mono text-[#3C50E0] font-bold text-xs">{exp.receiptNo}</td>
                    <td className="font-bold text-[#1C2434] max-w-[160px] truncate">{exp.projectName}</td>
                    <td>
                      <span className="badge-tail badge-tail-primary text-xs">{exp.category}</span>
                    </td>
                    <td className="text-[#1C2434] text-xs">{exp.description}</td>
                    <td>
                      <div className="font-bold text-[#1C2434] text-xs">{exp.vendorOrRecipient}</div>
                      <div className="text-[11px] text-[#64748B]">{exp.paymentMethod}</div>
                    </td>
                    <td className="text-right font-mono text-xs text-[#64748B]">{formatRupiah(exp.budgetAllocated)}</td>
                    <td className="text-right font-mono font-bold text-xs text-[#1C2434]">{formatRupiah(exp.actualAmount)}</td>
                    <td className="text-right font-mono font-bold text-xs">
                      <span className={isOver ? 'text-[#D34053]' : 'text-[#10B981]'}>
                        {isOver ? '-' : '+'}{formatRupiah(Math.abs(exp.variance))}
                      </span>
                    </td>
                    <td className="text-center">
                      <span className={`badge-tail ${
                        exp.status === 'Approved' ? 'badge-tail-success' : 'badge-tail-danger'
                      }`}>
                        {exp.status}
                      </span>
                    </td>
                    <td className="text-center">
                      {exp.status !== 'Approved' && (role === 'Owner' || role === 'Admin Keuangan') ? (
                        <button
                          onClick={() => approveExpense(exp.id)}
                          className="px-3 py-1.5 rounded bg-[#10B981] hover:bg-[#059669] text-white font-bold text-xs transition min-h-[32px]"
                        >
                          Approve
                        </button>
                      ) : (
                        <span className="text-xs text-[#64748B]">Terverifikasi</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </TableScrollWrapper>

        <div className="px-4 sm:px-6 py-3 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[#64748B]">
          <span>Semua bukti kuitansi diarsipkan ke audit log proyek</span>
          <span className="text-[#10B981] font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Terintegrasi Neraca Laba Rugi
          </span>
        </div>
      </div>
    </div>
  );
}
