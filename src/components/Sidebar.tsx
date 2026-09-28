'use client';

import React from 'react';
import { useProject } from '@/context/ProjectContext';
import { 
  LayoutDashboard, 
  Users2, 
  FolderKanban, 
  CalendarRange, 
  Calculator, 
  TrendingDown, 
  HardHat, 
  ShoppingBag, 
  CreditCard, 
  FileBarChart2,
  History,
  X,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';
import { formatCompactRupiah } from '@/lib/utils';
import { isTabAllowed, ROLE_CONFIGS } from '@/lib/rbac';

interface SidebarProps {
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export function Sidebar({ isMobileOpen, onCloseMobile }: SidebarProps) {
  const { 
    activeTab, 
    setActiveTab, 
    projects, 
    termins, 
    workers,
    purchaseOrders,
    role, 
    isSidebarCollapsed, 
    toggleSidebarCollapse 
  } = useProject();

  const totalContract = projects.reduce((acc, p) => acc + p.contractValue, 0);
  const pendingTerminCount = termins.filter(t => t.status === 'Jatuh Tempo' || t.status === 'Menunggu Pembayaran').length;
  const totalPendingTerminAmount = termins
    .filter(t => t.status === 'Jatuh Tempo' || t.status === 'Menunggu Pembayaran')
    .reduce((acc, t) => acc + t.amount, 0);
  const pendingPOCount = purchaseOrders?.filter(p => p.status === 'Pending Approval').length || 0;
  const activeWorkersCount = workers?.filter(w => w.status === 'Aktif di Site' || w.status === 'Workshop Cibubur').length || 0;

  const menuSections = [
    {
      title: 'MENU UTAMA',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
        { id: 'partners', label: 'Partner / Klien B2B', icon: Users2, badge: null },
        { id: 'projects', label: 'Project Management', icon: FolderKanban, badge: `${projects.length}` },
      ],
    },
    {
      title: 'OPERASIONAL & LAPANGAN',
      items: [
        { id: 'progress', label: 'Progres & Foto Site', icon: CalendarRange, badge: 'Live' },
        { id: 'tk-vendor', label: 'Tenaga Kerja & Vendor', icon: HardHat, badge: null },
        { id: 'procurement', label: 'Procurement PO', icon: ShoppingBag, badge: pendingPOCount > 0 ? `${pendingPOCount} Baru` : null },
      ],
    },
    {
      title: 'KEUANGAN & COST CONTROL',
      items: [
        { id: 'hpp-quotation', label: 'Estimator HPP & BOQ', icon: Calculator, badge: null },
        { id: 'cost-control', label: 'Cost Control HPP', icon: TrendingDown, badge: 'Alert' },
        { id: 'termin', label: 'Termin Invoicing', icon: CreditCard, badge: pendingTerminCount > 0 ? `${pendingTerminCount}` : null },
        { id: 'laporan', label: 'Laporan P&L Proyek', icon: FileBarChart2, badge: null },
        { id: 'activity-log', label: 'Riwayat Aktivitas', icon: History, badge: null },
      ],
    },
  ];

  // RBAC Filter: Only render sections and items permitted for the current user role
  const visibleSections = menuSections
    .map(section => ({
      ...section,
      items: section.items.filter(item => isTabAllowed(role, item.id)),
    }))
    .filter(section => section.items.length > 0);

  const handleSelect = (id: string) => {
    setActiveTab(id);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-xs"
        />
      )}

      {/* TailAdmin Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 shrink-0 h-screen h-[100dvh] max-h-[100dvh] lg:h-screen bg-[#1C2434] text-[#DEE4EE] flex flex-col transition-all duration-300 ease-in-out overflow-x-hidden select-none ${
          isMobileOpen 
            ? 'translate-x-0 w-72' 
            : '-translate-x-full lg:translate-x-0'
        } ${isSidebarCollapsed ? 'lg:w-20' : 'lg:w-72'}`}
      >
        {/* Brand Header */}
        <div className={`flex items-center justify-between border-b border-[#2E3A47] shrink-0 ${
          isSidebarCollapsed ? 'px-3 py-4.5 justify-center' : 'px-5 py-4.5'
        }`}>
          <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center w-full' : 'gap-3 min-w-0'}`}>
            <div 
              onClick={isSidebarCollapsed ? toggleSidebarCollapse : undefined}
              className={`w-9 h-9 rounded-lg bg-gradient-to-br from-[#3C50E0] to-[#2F41C2] flex items-center justify-center text-white font-black text-lg shadow-md shrink-0 ${
                isSidebarCollapsed ? 'cursor-pointer hover:scale-105 transition-transform' : ''
              }`}
              title={isSidebarCollapsed ? "Klik untuk memperluas sidebar" : "Sora Project B2B OS"}
            >
              S
            </div>

            {!isSidebarCollapsed && (
              <div className="overflow-hidden min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-lg font-bold tracking-tight text-white font-sans truncate">
                    Sora<span className="text-[#3C50E0]">.</span>Project
                  </span>
                </div>
                <p className="text-[10px] text-[#8A99AD] font-medium tracking-wider uppercase truncate">
                  Contractor B2B OS
                </p>
              </div>
            )}
          </div>

          {/* Desktop Minimize Toggle in Header */}
          {!isSidebarCollapsed && (
            <button
              id="btn-sidebar-collapse"
              onClick={toggleSidebarCollapse}
              className="hidden lg:flex items-center justify-center w-8 h-8 rounded-md text-[#8A99AD] hover:text-white hover:bg-[#2E3A47] transition shrink-0 ml-2"
              title="Perkecil Sidebar"
              aria-label="Minimize Sidebar"
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
          )}

          {/* Mobile Close Button */}
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-md text-[#8A99AD] hover:text-white hover:bg-[#2E3A47]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar Nav Items (Clean, No ugly scrollbars!) */}
        <div className={`flex-1 min-h-0 overflow-y-auto overflow-x-hidden no-scrollbar py-3.5 space-y-3.5 ${
          isSidebarCollapsed ? 'px-2' : 'px-3'
        }`}>
          {visibleSections.map((section) => (
            <div key={section.title}>
              {!isSidebarCollapsed ? (
                <h3 className="mb-1.5 text-[10.5px] font-bold uppercase text-[#8A99AD] tracking-wider px-3 whitespace-nowrap overflow-hidden">
                  {section.title}
                </h3>
              ) : (
                <div className="my-2 border-t border-[#2E3A47] mx-2" title={section.title} />
              )}

              <ul className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => handleSelect(item.id)}
                        title={item.label}
                        className={`group relative flex w-full items-center rounded-md font-medium duration-150 ease-in-out text-sm ${
                          isSidebarCollapsed 
                            ? 'justify-center p-3' 
                            : 'justify-between py-2 px-3'
                        } ${
                          isActive
                            ? 'bg-[#333A48] text-white font-semibold shadow-xs'
                            : 'text-[#DEE4EE] hover:bg-[#24303F] hover:text-white'
                        }`}
                      >
                        <div className={`flex items-center min-w-0 ${isSidebarCollapsed ? 'justify-center' : 'gap-3'}`}>
                          <Icon className={`w-5 h-5 shrink-0 transition-colors ${
                            isActive ? 'text-[#3C50E0]' : 'text-[#8A99AD] group-hover:text-white'
                          }`} />
                          {!isSidebarCollapsed && (
                            <span className="truncate text-[13px]">{item.label}</span>
                          )}
                        </div>

                        {item.badge && !isSidebarCollapsed && (
                          <span
                            className={`rounded-full py-0.5 px-2 text-[10px] font-semibold shrink-0 ml-2 ${
                              item.badge === 'Live'
                                ? 'bg-[#10B981] text-white'
                                : item.badge === 'Alert'
                                ? 'bg-[#D34053] text-white'
                                : 'bg-[#3C50E0] text-white'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}

                        {item.badge && isSidebarCollapsed && (
                          <span
                            className={`w-2 h-2 rounded-full absolute top-2 right-2 ${
                              item.badge === 'Live'
                                ? 'bg-[#10B981]'
                                : item.badge === 'Alert'
                                ? 'bg-[#D34053]'
                                : 'bg-[#3C50E0]'
                            }`}
                          />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section (Comfortably padded above mobile safe area & dev tools) */}
        <div 
          className="shrink-0 px-3 pt-2 pb-4 lg:pb-6"
          style={{ paddingBottom: 'max(1rem, calc(env(safe-area-inset-bottom, 0px) + 0.5rem))' }}
        >
          {!isSidebarCollapsed ? (
            <div className="p-3 rounded-lg bg-[#24303F] border border-[#2E3A47] text-xs space-y-2 shadow-xs">
              <div className="flex items-center justify-between text-[#8A99AD]">
                <span className="text-[11px] font-medium">
                  {role === 'Owner' && 'Pipeline Kontrak Deal:'}
                  {role === 'Kepala Produksi' && 'Target Fabrikasi:'}
                  {role === 'Admin Keuangan' && 'Termin Piutang (AR):'}
                  {role === 'Pengawas Lapangan' && 'Tenaga Kerja Site:'}
                </span>
                <span className="font-bold text-white font-mono text-[12px]">
                  {role === 'Owner' && formatCompactRupiah(totalContract)}
                  {role === 'Kepala Produksi' && `${projects.length} Proyek`}
                  {role === 'Admin Keuangan' && formatCompactRupiah(totalPendingTerminAmount)}
                  {role === 'Pengawas Lapangan' && `${activeWorkersCount} Personil`}
                </span>
              </div>
              <div className="w-full bg-[#1C2434] h-1.5 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${
                    role === 'Owner' ? 'bg-[#3C50E0]' :
                    role === 'Kepala Produksi' ? 'bg-[#F0950C]' :
                    role === 'Admin Keuangan' ? 'bg-[#10B981]' : 'bg-purple-500'
                  }`} 
                  style={{ 
                    width: role === 'Owner' ? '68%' :
                           role === 'Kepala Produksi' ? '75%' :
                           role === 'Admin Keuangan' ? '50%' : 
                           workers && workers.length > 0 ? `${Math.round((activeWorkersCount / workers.length) * 100)}%` : '85%'
                  }} 
                />
              </div>
              <div className="flex items-center justify-between text-[11px] pt-1 border-t border-[#2E3A47]/70">
                <span className="flex items-center gap-1.5 font-semibold text-white">
                  <span className={`w-2 h-2 rounded-full animate-pulse ${
                    role === 'Owner' ? 'bg-[#3C50E0]' :
                    role === 'Kepala Produksi' ? 'bg-[#F0950C]' :
                    role === 'Admin Keuangan' ? 'bg-[#10B981]' : 'bg-purple-500'
                  }`} />
                  {role}
                </span>
                <button
                  id="btn-sidebar-bottom-collapse"
                  onClick={toggleSidebarCollapse}
                  className="hidden lg:flex items-center gap-1 text-[11px] text-[#8A99AD] hover:text-white px-2 py-0.5 rounded hover:bg-[#1C2434] transition"
                  title="Perkecil Sidebar"
                >
                  <PanelLeftClose className="w-3.5 h-3.5" />
                  <span>Minimize</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center pt-2">
              <button
                id="btn-sidebar-expand"
                onClick={toggleSidebarCollapse}
                className="hidden lg:flex items-center justify-center w-10 h-10 rounded-lg bg-[#24303F] border border-[#2E3A47] text-[#8A99AD] hover:text-white hover:bg-[#3C50E0] hover:border-[#3C50E0] transition shadow-xs"
                title="Perluas Sidebar"
                aria-label="Expand Sidebar"
              >
                <PanelLeftOpen className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
