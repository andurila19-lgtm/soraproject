'use client';

import React, { useState } from 'react';
import { useProject } from '@/context/ProjectContext';
import { ActivityLog } from '@/lib/types';
import { 
  History, 
  Search, 
  Filter, 
  User, 
  Clock, 
  FolderKanban,
  DollarSign,
  ShoppingBag,
  CreditCard,
  TrendingUp,
  FileText,
  Users2,
  CheckCircle2
} from 'lucide-react';
import { TableScrollWrapper } from '@/components/TableScrollWrapper';

function formatLogTimestamp(ts: string): string {
  const d = new Date(ts);
  const day = String(d.getDate()).padStart(2, '0');
  const monthNames = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Ags','Sep','Okt','Nov','Des'];
  const month = monthNames[d.getMonth()];
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${day} ${month} ${d.getFullYear()}, ${hours}:${minutes}`;
}

const entityIcons: Record<ActivityLog['entityType'], React.ElementType> = {
  project: FolderKanban,
  expense: DollarSign,
  po: ShoppingBag,
  termin: CreditCard,
  partner: Users2,
  progress: TrendingUp,
  boq: FileText,
  addendum: FileText,
  opname: CheckCircle2,
};

const entityColors: Record<ActivityLog['entityType'], string> = {
  project: 'text-[#3C50E0] bg-[#3C50E0]/10',
  expense: 'text-[#F0950C] bg-[#F0950C]/10',
  po: 'text-[#10B981] bg-[#10B981]/10',
  termin: 'text-[#3C50E0] bg-[#3C50E0]/10',
  partner: 'text-[#64748B] bg-[#64748B]/10',
  progress: 'text-[#10B981] bg-[#10B981]/10',
  boq: 'text-[#F0950C] bg-[#F0950C]/10',
  addendum: 'text-[#3C50E0] bg-[#3C50E0]/10',
  opname: 'text-[#10B981] bg-[#10B981]/10',
};

export function ActivityLogView() {
  const { activityLogs, projects } = useProject();

  const [search, setSearch] = useState('');
  const [entityFilter, setEntityFilter] = useState<string>('Semua');
  const [projectFilter, setProjectFilter] = useState<string>('Semua');

  const filteredLogs = activityLogs.filter((log) => {
    const matchesSearch = log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.entityName.toLowerCase().includes(search.toLowerCase()) ||
      log.userName.toLowerCase().includes(search.toLowerCase()) ||
      log.details.toLowerCase().includes(search.toLowerCase());
    const matchesEntity = entityFilter === 'Semua' || log.entityType === entityFilter;
    const matchesProject = projectFilter === 'Semua' || log.entityId === projectFilter || log.entityName.toLowerCase().includes(
      projects.find(p => p.id === projectFilter)?.name.toLowerCase() || '---'
    );
    return matchesSearch && matchesEntity && matchesProject;
  });

  const entityTypes = ['Semua', 'project', 'expense', 'po', 'termin', 'progress', 'partner', 'boq'];
  const entityLabels: Record<string, string> = {
    'Semua': 'Semua',
    'project': 'Proyek',
    'expense': 'Pengeluaran',
    'po': 'Purchase Order',
    'termin': 'Termin',
    'progress': 'Progress',
    'partner': 'Partner',
    'boq': 'BOQ',
  };

  return (
    <div className="space-y-6">
      {/* TailAdmin Page Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C2434]">
            Riwayat Aktivitas Sistem
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            Log lengkap perubahan, approval, dan aktivitas seluruh user Sora Project
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <nav>
            <ol className="hidden sm:flex items-center gap-1.5 text-xs text-[#64748B] mr-2">
              <li><span>Dashboard</span></li>
              <li>/</li>
              <li className="text-[#3C50E0] font-semibold">Riwayat Aktivitas</li>
            </ol>
          </nav>
          <span className="badge-tail badge-tail-gray text-xs">
            {activityLogs.length} Total Log
          </span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        <div className="rounded-sm border border-[#E2E8F0] bg-white py-4 px-5 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EFF2F7] text-[#3C50E0]">
            <History className="w-5 h-5" />
          </div>
          <div className="mt-3">
            <h4 className="text-xl font-bold text-[#1C2434]">{activityLogs.length}</h4>
            <span className="text-xs font-medium text-[#64748B]">Total Aktivitas</span>
          </div>
        </div>
        <div className="rounded-sm border border-[#E2E8F0] bg-white py-4 px-5 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EFF2F7] text-[#F0950C]">
            <DollarSign className="w-5 h-5" />
          </div>
          <div className="mt-3">
            <h4 className="text-xl font-bold text-[#F0950C]">
              {activityLogs.filter(l => l.entityType === 'expense').length}
            </h4>
            <span className="text-xs font-medium text-[#64748B]">Log Pengeluaran</span>
          </div>
        </div>
        <div className="rounded-sm border border-[#E2E8F0] bg-white py-4 px-5 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EFF2F7] text-[#10B981]">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div className="mt-3">
            <h4 className="text-xl font-bold text-[#10B981]">
              {activityLogs.filter(l => l.entityType === 'po').length}
            </h4>
            <span className="text-xs font-medium text-[#64748B]">Log PO</span>
          </div>
        </div>
        <div className="rounded-sm border border-[#E2E8F0] bg-white py-4 px-5 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EFF2F7] text-[#3C50E0]">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="mt-3">
            <h4 className="text-xl font-bold text-[#3C50E0]">
              {activityLogs.filter(l => l.entityType === 'progress').length}
            </h4>
            <span className="text-xs font-medium text-[#64748B]">Log Progress</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="tail-card p-3 sm:p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full md:w-auto flex-1">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Cari aksi, user, atau entitas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="tail-input pl-9 text-xs w-full min-h-[38px]"
            />
          </div>

          <select
            value={projectFilter}
            onChange={(e) => setProjectFilter(e.target.value)}
            className="tail-input text-xs w-full sm:w-auto min-w-[140px] min-h-[38px]"
          >
            <option value="Semua">Semua Proyek</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>{p.code} - {p.name}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1.5 md:pb-0 no-scrollbar">
          {entityTypes.map((et) => (
            <button
              key={et}
              onClick={() => setEntityFilter(et)}
              className={`text-xs px-3 py-2 rounded-sm font-medium transition whitespace-nowrap min-h-[36px] ${
                entityFilter === et
                  ? 'bg-[#3C50E0] text-white font-semibold'
                  : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]'
              }`}
            >
              {entityLabels[et] || et}
            </button>
          ))}
        </div>
      </div>

      {/* Activity Log Table */}
      <div className="tail-card">
        <div className="tail-card-header">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-[#1C2434]">
              Timeline Riwayat Aktivitas
            </h3>
            <p className="text-xs text-[#64748B] mt-0.5">
              Jejak audit siapa melakukan apa dan kapan, untuk transparansi operasional
            </p>
          </div>
          <span className="badge-tail badge-tail-gray text-xs">
            {filteredLogs.length} Entri
          </span>
        </div>

        <TableScrollWrapper minWidth="min-w-[780px]" hint="Geser log aktivitas">
          <table className="tail-table">
            <thead>
              <tr>
                <th>Waktu</th>
                <th>User</th>
                <th>Role</th>
                <th>Tipe</th>
                <th>Aksi</th>
                <th>Entitas</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => {
                const Icon = entityIcons[log.entityType];
                const colorClass = entityColors[log.entityType];
                return (
                  <tr key={log.id}>
                    <td className="font-mono text-xs text-[#64748B] whitespace-nowrap">
                      {formatLogTimestamp(log.timestamp)}
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#EFF2F7] flex items-center justify-center text-[#3C50E0]">
                          <User className="w-3 h-3" />
                        </div>
                        <span className="font-bold text-[#1C2434] text-xs">{log.userName}</span>
                      </div>
                    </td>
                    <td>
                      <span className="badge-tail badge-tail-gray text-[10px]">{log.role}</span>
                    </td>
                    <td>
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-sm text-[10px] font-bold ${colorClass}`}>
                        <Icon className="w-3 h-3" />
                        {entityLabels[log.entityType] || log.entityType}
                      </span>
                    </td>
                    <td className="font-bold text-[#1C2434] text-xs max-w-[200px]">
                      {log.action}
                    </td>
                    <td className="text-xs text-[#3C50E0] font-medium max-w-[200px] truncate">
                      {log.entityName}
                    </td>
                    <td className="text-xs text-[#64748B] max-w-[280px]">
                      {log.details}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </TableScrollWrapper>

        <div className="px-4 sm:px-6 py-3 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[#64748B]">
          <span>Menampilkan {filteredLogs.length} dari {activityLogs.length} log aktivitas</span>
          <span className="text-[#10B981] font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Audit trail aktif & real-time
          </span>
        </div>
      </div>
    </div>
  );
}
