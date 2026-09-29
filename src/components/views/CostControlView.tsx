'use client';

import React, { useState } from 'react';
import { useProject } from '@/context/ProjectContext';
import { CostExpense, ProjectAddendum, Project } from '@/lib/types';
import { 
  Plus, 
  Search, 
  DollarSign, 
  Receipt, 
  AlertTriangle,
  CheckCircle2,
  TrendingDown,
  TrendingUp,
  FileText,
  Clock,
  CheckSquare,
  X
} from 'lucide-react';
import { formatRupiah, formatCompactRupiah, formatDateIndo } from '@/lib/utils';
import { TableScrollWrapper } from '@/components/TableScrollWrapper';

export function CostControlView() {
  const { 
    expenses, 
    approveExpense, 
    addendums,
    addProjectAddendum,
    updateAddendumStatus,
    projects, 
    selectedProjectId, 
    setSelectedProjectId,
    setIsAddExpenseOpen,
    role 
  } = useProject();

  const [activeView, setActiveView] = useState<'expenses' | 'addendums'>('expenses');
  const [categoryFilter, setCategoryFilter] = useState<string>('Semua');
  const [search, setSearch] = useState<string>('');
  const [isCreateAddendumOpen, setIsCreateAddendumOpen] = useState(false);

  const filteredExpenses = expenses.filter((e) => {
    const matchesProject = selectedProjectId === 'all' || e.projectId === selectedProjectId;
    const matchesCategory = categoryFilter === 'Semua' || e.category === categoryFilter;
    const matchesSearch = e.description.toLowerCase().includes(search.toLowerCase()) ||
      e.projectName.toLowerCase().includes(search.toLowerCase()) ||
      e.vendorOrRecipient.toLowerCase().includes(search.toLowerCase()) ||
      e.receiptNo.toLowerCase().includes(search.toLowerCase());
    return matchesProject && matchesCategory && matchesSearch;
  });

  const filteredAddendums = addendums.filter((a) => {
    const matchesProject = selectedProjectId === 'all' || a.projectId === selectedProjectId;
    const matchesSearch = a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.projectName.toLowerCase().includes(search.toLowerCase()) ||
      a.addendumNumber.toLowerCase().includes(search.toLowerCase()) ||
      a.description.toLowerCase().includes(search.toLowerCase());
    return matchesProject && matchesSearch;
  });

  const totalAddendumAmount = filteredAddendums.reduce((acc, a) => acc + a.amount, 0);
  const approvedAddendumAmount = filteredAddendums
    .filter(a => a.status === 'Disetujui Klien')
    .reduce((acc, a) => acc + a.amount, 0);
  const pendingAddendumCount = filteredAddendums.filter(a => a.status === 'Waiting Approval').length;
  const pendingAddendumAmount = filteredAddendums
    .filter(a => a.status === 'Waiting Approval')
    .reduce((acc, a) => acc + a.amount, 0);

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
            Cost Control & Addendum Kontrak
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            Buku Besar Realisasi Pengeluaran HPP, Kontrol Plafon RAB, dan Addendum Pekerjaan Tambahan
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

          {activeView === 'expenses' ? (
            <button
              onClick={() => setIsAddExpenseOpen(true)}
              className="btn-tail-primary text-xs w-full sm:w-auto justify-center py-2.5 px-4 min-h-[38px]"
            >
              <Plus className="w-4 h-4" />
              <span>+ Catat Pengeluaran Baru</span>
            </button>
          ) : (
            <button
              onClick={() => setIsCreateAddendumOpen(true)}
              className="btn-tail-primary text-xs w-full sm:w-auto justify-center py-2.5 px-4 min-h-[38px]"
            >
              <Plus className="w-4 h-4" />
              <span>+ Terbitkan Addendum Baru</span>
            </button>
          )}
        </div>
      </div>

      {/* Subtab Switcher: Realisasi HPP vs Addendum */}
      <div className="flex items-center bg-[#F1F5F9] p-1 rounded-sm border border-[#E2E8F0] overflow-x-auto w-full sm:w-fit no-scrollbar">
        <button
          onClick={() => setActiveView('expenses')}
          className={`flex-1 sm:flex-initial px-4 py-2 sm:py-1.5 rounded-xs text-xs font-semibold transition whitespace-nowrap min-h-[36px] flex items-center justify-center gap-1.5 ${
            activeView === 'expenses'
              ? 'bg-white text-[#3C50E0] shadow-sm font-bold'
              : 'text-[#64748B] hover:text-[#1C2434]'
          }`}
        >
          <Receipt className="w-3.5 h-3.5" />
          <span>Buku Besar Realisasi HPP</span>
        </button>
        <button
          onClick={() => setActiveView('addendums')}
          className={`flex-1 sm:flex-initial px-4 py-2 sm:py-1.5 rounded-xs text-xs font-semibold transition whitespace-nowrap min-h-[36px] flex items-center justify-center gap-1.5 ${
            activeView === 'addendums'
              ? 'bg-white text-[#3C50E0] shadow-sm font-bold'
              : 'text-[#64748B] hover:text-[#1C2434]'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Addendum & Perubahan Pekerjaan ({filteredAddendums.length})</span>
        </button>
      </div>

      {/* View 1: Realisasi Pengeluaran HPP */}
      {activeView === 'expenses' && (
        <>
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
                  {filteredExpenses.length === 0 ? (
                    <tr>
                      <td colSpan={11} className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <Receipt className="w-10 h-10 text-[#94A3B8] mb-2" />
                          <p className="text-sm font-semibold text-[#1C2434]">Belum Ada Catatan Pengeluaran Kas</p>
                          <p className="text-xs text-[#64748B] mt-1 max-w-sm">
                            Sistem dalam keadaan bersih (0 pengeluaran). Mulai catat pengeluaran kas lapangan, belanja material, atau upah tukang.
                          </p>
                          <button
                            onClick={() => setIsAddExpenseOpen(true)}
                            className="mt-3.5 btn-tail-primary text-xs py-2 px-3.5"
                          >
                            + Catat Pengeluaran Baru
                          </button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredExpenses.map((exp) => {
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
                  })
                )}
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
        </>
      )}

      {/* View 2: Addendum & Perubahan Pekerjaan */}
      {activeView === 'addendums' && (
        <>
          {/* Addendum 3 Metric Cards */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
            <div className="rounded-sm border border-[#E2E8F0] bg-white py-5 px-6 shadow-sm">
              <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-[#EFF2F7] text-[#3C50E0]">
                <FileText className="w-6 h-6" />
              </div>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <h4 className="text-2xl font-bold text-[#1C2434]">
                    {formatCompactRupiah(totalAddendumAmount)}
                  </h4>
                  <span className="text-xs font-medium text-[#64748B]">Total Nilai Diajukan</span>
                </div>
                <span className="badge-tail badge-tail-primary text-xs">{filteredAddendums.length} Dokumen</span>
              </div>
            </div>

            <div className="rounded-sm border border-[#E2E8F0] bg-white py-5 px-6 shadow-sm">
              <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-[#EFF2F7] text-[#10B981]">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <h4 className="text-2xl font-bold text-[#10B981]">
                    {formatCompactRupiah(approvedAddendumAmount)}
                  </h4>
                  <span className="text-xs font-medium text-[#64748B]">Disetujui Klien / Owner</span>
                </div>
                <span className="badge-tail badge-tail-success text-xs">Menambah Kontrak</span>
              </div>
            </div>

            <div className="rounded-sm border border-[#E2E8F0] bg-white py-5 px-6 shadow-sm">
              <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-[#EFF2F7] text-[#F0950C]">
                <Clock className="w-6 h-6" />
              </div>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <h4 className="text-2xl font-bold text-[#F0950C]">
                    {formatCompactRupiah(pendingAddendumAmount)}
                  </h4>
                  <span className="text-xs font-medium text-[#64748B]">Menunggu Approval Klien</span>
                </div>
                <span className="badge-tail badge-tail-warning text-xs">{pendingAddendumCount} Berkas Menunggu</span>
              </div>
            </div>
          </div>

          {/* SOP Addendum Notice Box */}
          <div className="p-4 rounded-sm border border-[#E2E8F0] bg-[#F8FAFC] flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#3C50E0]/10 flex items-center justify-center text-[#3C50E0] shrink-0 mt-0.5">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-[#1C2434] text-xs">Standar Tata Kelola Addendum & Scope Change (CO) Sora OS</p>
                <p className="text-[#64748B] text-[11px] leading-relaxed mt-0.5">
                  Setiap pekerjaan tambahan, modifikasi spesifikasi material, atau penyesuaian volume opname bersama yang menambah/mengurangi biaya wajib diterbitkan berkas Addendum. Persetujuan Klien akan otomatis menambah plafon kontrak proyek dan memperbarui skema termin penagihan.
                </p>
              </div>
            </div>
          </div>

          {/* Addendum Filter & Search */}
          <div className="tail-card p-3 sm:p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Cari no. addendum, proyek, lingkup..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="tail-input pl-9 text-xs w-full min-h-[38px]"
              />
            </div>

            <select
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              className="tail-input text-xs w-full sm:w-auto min-w-[180px] min-h-[38px]"
            >
              <option value="all">Semua Proyek</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>{p.code} — {p.name}</option>
              ))}
            </select>
          </div>

          {/* Addendum Register Table */}
          <div className="tail-card">
            <div className="tail-card-header">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-[#1C2434]">
                  Daftar Addendum Kontrak & Perubahan Lingkup (Change Order)
                </h3>
                <p className="text-xs text-[#64748B] mt-0.5">
                  Rekapitulasi formal pekerjaan tambahan yang mempengaruhi nilai kontrak dan jadwal pelaksanaan
                </p>
              </div>
              <span className="badge-tail badge-tail-primary text-xs">
                {filteredAddendums.length} Dokumen
              </span>
            </div>

            <TableScrollWrapper minWidth="min-w-[920px]" hint="Geser daftar addendum">
              <table className="tail-table">
                <thead>
                  <tr>
                    <th>No. Addendum</th>
                    <th>Tanggal</th>
                    <th>Proyek & Klien</th>
                    <th>Jenis Addendum</th>
                    <th>Judul & Rincian Lingkup</th>
                    <th className="text-right">Nilai Tambah / Kurang</th>
                    <th className="text-center">Dampak Waktu</th>
                    <th>Diajukan Oleh</th>
                    <th className="text-center">Status</th>
                    <th className="text-center">Aksi Otorisasi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAddendums.length === 0 ? (
                    <tr>
                      <td colSpan={10} className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <FileText className="w-10 h-10 text-[#94A3B8] mb-2" />
                          <p className="text-sm font-semibold text-[#1C2434]">Belum Ada Pengajuan Addendum</p>
                          <p className="text-xs text-[#64748B] mt-1 max-w-sm">
                            Addendum kontrak untuk pekerjaan tambah/kurang dan variasi scope akan muncul di sini.
                          </p>
                          <button
                            onClick={() => setIsCreateAddendumOpen(true)}
                            className="mt-3.5 btn-tail-primary text-xs py-2 px-3.5"
                          >
                            + Ajukan Addendum Baru
                          </button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredAddendums.map((add) => {
                    const isApproved = add.status === 'Disetujui Klien';
                    const isRejected = add.status === 'Ditolak';
                    return (
                      <tr key={add.id}>
                        <td className="font-mono text-xs font-bold text-[#3C50E0]">
                          {add.addendumNumber}
                        </td>
                        <td className="font-mono text-xs text-[#64748B]">
                          {formatDateIndo(add.submissionDate || add.date)}
                        </td>
                        <td>
                          <div className="font-bold text-[#1C2434] text-xs">{add.projectName}</div>
                          <div className="text-[11px] text-[#64748B]">{add.clientName || 'Klien B2B'}</div>
                        </td>
                        <td>
                          <span className="badge-tail badge-tail-primary text-xs">
                            {add.type}
                          </span>
                        </td>
                        <td className="max-w-[280px]">
                          <div className="font-bold text-[#1C2434] text-xs">{add.title}</div>
                          <div className="text-[11px] text-[#64748B] line-clamp-2 mt-0.5">
                            {add.description}
                          </div>
                        </td>
                        <td className="text-right font-mono font-bold text-xs">
                          <span className={add.amount >= 0 ? 'text-[#10B981]' : 'text-[#D34053]'}>
                            {add.amount >= 0 ? '+' : ''}{formatRupiah(add.amount)}
                          </span>
                        </td>
                        <td className="text-center font-mono text-xs text-[#1C2434]">
                          {(add.timeImpactDays || 0) > 0 ? `+${add.timeImpactDays} hari` : '0 hari (paralel)'}
                        </td>
                        <td className="text-xs text-[#64748B]">
                          {add.requestedBy}
                        </td>
                        <td className="text-center">
                          <span className={`badge-tail ${
                            isApproved
                              ? 'badge-tail-success'
                              : isRejected
                              ? 'badge-tail-danger'
                              : 'badge-tail-warning'
                          }`}>
                            {add.status}
                          </span>
                        </td>
                        <td className="text-center">
                          {!isApproved && !isRejected ? (
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                onClick={() => updateAddendumStatus(add.id, 'Disetujui Klien')}
                                className="px-2.5 py-1 rounded bg-[#10B981] hover:bg-[#059669] text-white font-bold text-xs transition"
                                title="Setujui Addendum & Tambahkan ke Nilai Kontrak"
                              >
                                Setujui Klien
                              </button>
                              <button
                                onClick={() => updateAddendumStatus(add.id, 'Ditolak')}
                                className="px-2 py-1 rounded bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#D34053] font-bold text-xs transition"
                                title="Tolak Berkas Addendum"
                              >
                                Tolak
                              </button>
                            </div>
                          ) : (
                            <span className="text-xs text-[#64748B] flex items-center justify-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                              {isApproved ? 'Kontrak Terupdate' : 'Dibatalkan'}
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
              </table>
            </TableScrollWrapper>

            <div className="px-4 sm:px-6 py-3 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[#64748B]">
              <span>Setiap persetujuan addendum memicu pembaruan otomatis pada nilai kontrak proyek</span>
              <span className="text-[#3C50E0] font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Terintegrasi Modul Termin & Invoicing
              </span>
            </div>
          </div>
        </>
      )}

      {/* Modal Terbitkan Addendum Baru */}
      {isCreateAddendumOpen && (
        <CreateAddendumModal
          projects={projects}
          onClose={() => setIsCreateAddendumOpen(false)}
          onAdd={(data) => {
            addProjectAddendum(data);
            setIsCreateAddendumOpen(false);
          }}
        />
      )}
    </div>
  );
}

interface CreateAddendumModalProps {
  projects: Project[];
  onClose: () => void;
  onAdd: (data: Omit<ProjectAddendum, 'id'>) => void;
}

function CreateAddendumModal({ projects, onClose, onAdd }: CreateAddendumModalProps) {
  const [projectId, setProjectId] = useState(projects[0]?.id || '');
  const [addendumNumber, setAddendumNumber] = useState(
    `ADD/SRA-2026/0${projects[0]?.code?.slice(-1) || '1'}-02`
  );
  const [type, setType] = useState<ProjectAddendum['type']>('Pekerjaan Tambahan');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState<number>(0);
  const [timeImpactDays, setTimeImpactDays] = useState<number>(0);
  const [requestedBy, setRequestedBy] = useState('');

  const selectedProj = projects.find((p) => p.id === projectId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !projectId) return;

    onAdd({
      addendumNumber,
      projectId,
      projectName: selectedProj?.name || projects[0]?.name || 'Fit-out Proyek B2B',
      clientName: selectedProj?.partnerName || projects[0]?.partnerName || 'PT Partner Rekanan',
      date: new Date().toISOString().split('T')[0],
      submissionDate: new Date().toISOString().split('T')[0],
      type,
      title,
      description,
      amount: Number(amount) || 0,
      impactOnSchedule: timeImpactDays > 0 ? `+${timeImpactDays} hari kerja` : 'Paralel',
      timeImpactDays: Number(timeImpactDays) || 0,
      requestedBy,
      status: 'Waiting Approval',
      notes: 'Diajukan via form Addendum & Change Order Cost Control',
    });
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-xl rounded-sm border border-[#E2E8F0] bg-white p-5 sm:p-6 shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3 mb-4">
          <div>
            <h3 className="text-base font-bold text-[#1C2434]">Terbitkan Berkas Addendum Proyek</h3>
            <p className="text-xs text-[#64748B] mt-0.5">
              Pekerjaan Tambahan / Perubahan Scope / Penyesuaian Hasil Opname
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#64748B] hover:bg-[#F1F5F9] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-[#1C2434] mb-1">Pilih Proyek Terkait</label>
              <select
                value={projectId}
                onChange={(e) => {
                  setProjectId(e.target.value);
                  const p = projects.find((pr) => pr.id === e.target.value);
                  if (p) {
                    setAddendumNumber(`ADD/SRA-2026/0${p.code.slice(-1) || '1'}-02`);
                  }
                }}
                className="tail-input w-full text-xs"
                required
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.code} — {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-[#1C2434] mb-1">Nomor Berkas Addendum</label>
              <input
                type="text"
                value={addendumNumber}
                onChange={(e) => setAddendumNumber(e.target.value)}
                className="tail-input w-full text-xs font-mono"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-[#1C2434] mb-1">Jenis Addendum</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as ProjectAddendum['type'])}
                className="tail-input w-full text-xs"
              >
                <option value="Pekerjaan Tambahan">Pekerjaan Tambahan</option>
                <option value="Perubahan Desain">Perubahan Desain</option>
                <option value="Penyesuaian Opname">Penyesuaian Hasil Opname</option>
                <option value="Pengurangan Pekerjaan">Pengurangan Pekerjaan</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-[#1C2434] mb-1">Diajukan Oleh / Atas Permintaan</label>
              <input
                type="text"
                value={requestedBy}
                onChange={(e) => setRequestedBy(e.target.value)}
                className="tail-input w-full text-xs"
                placeholder="Contoh: Bambang Trihatmojo (VP GA Nexus) / Tim Lapangan"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-[#1C2434] mb-1">Judul Addendum / Pekerjaan</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Penambahan 8 Titik Floor Socket & Rerouting Data Ruang Rapat"
              className="tail-input w-full text-xs"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-[#1C2434] mb-1">Deskripsi & Rincian Lingkup Perubahan</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Jelaskan alasan perubahan, spesifikasi teknis material tambahan, atau rujukan Berita Acara Opname..."
              className="tail-input w-full text-xs"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-[#1C2434] mb-1">Nilai Tambahan Biaya (Rp)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="tail-input w-full text-xs font-mono font-bold"
                placeholder="0"
                required
              />
              <span className="text-[11px] text-[#64748B] mt-0.5 block">
                {amount > 0 ? formatRupiah(amount) : 'Gunakan nilai minus jika pengurangan'}
              </span>
            </div>

            <div>
              <label className="block font-semibold text-[#1C2434] mb-1">Dampak Tambahan Waktu (Hari)</label>
              <input
                type="number"
                value={timeImpactDays}
                onChange={(e) => setTimeImpactDays(Number(e.target.value))}
                className="tail-input w-full text-xs font-mono"
                placeholder="0"
              />
              <span className="text-[11px] text-[#64748B] mt-0.5 block">
                0 jika dikerjakan paralel tanpa memperpanjang deadline
              </span>
            </div>
          </div>

          <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded text-[11px] text-[#64748B]">
            Status awal pengajuan adalah <strong className="text-[#F0950C]">Waiting Approval</strong>. Setelah disetujui, nilai kontrak proyek akan langsung bertambah sebesar Rp {formatRupiah(amount).replace('Rp ', '')}.
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E2E8F0]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-sm border border-[#E2E8F0] text-[#64748B] hover:bg-[#F1F5F9] font-medium transition"
            >
              Batal
            </button>
            <button
              type="submit"
              className="btn-tail-primary px-5 py-2 font-bold"
            >
              Terbitkan Addendum
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

