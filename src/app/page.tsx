'use client';

import React, { useState } from 'react';
import { ProjectProvider, useProject } from '@/context/ProjectContext';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { DashboardView } from '@/components/views/DashboardView';
import { PartnerView } from '@/components/views/PartnerView';
import { ProjectManagementView } from '@/components/views/ProjectManagementView';
import { HPPQuotationView } from '@/components/views/HPPQuotationView';
import { CostControlView } from '@/components/views/CostControlView';
import { TKVendorView } from '@/components/views/TKVendorView';
import { ProcurementView } from '@/components/views/ProcurementView';
import { TerminView } from '@/components/views/TerminView';
import { ProgressView } from '@/components/views/ProgressView';
import { LaporanView } from '@/components/views/LaporanView';
import { ActivityLogView } from '@/components/views/ActivityLogView';
import { UserManagementView } from '@/components/views/UserManagementView';
import { LoginView } from '@/components/views/LoginView';

import { CreateProjectModal } from '@/components/modals/CreateProjectModal';
import { AddExpenseModal } from '@/components/modals/AddExpenseModal';
import { CreatePOModal } from '@/components/modals/CreatePOModal';
import { QuotationPreviewModal } from '@/components/modals/QuotationPreviewModal';
import { ProjectDetailDrawer } from '@/components/modals/ProjectDetailDrawer';

import { 
  LayoutDashboard, 
  Users2, 
  FolderKanban, 
  Calculator, 
  TrendingDown, 
  CheckCircle2,
  CalendarRange,
  ShoppingBag,
  CreditCard,
  HardHat,
  ShieldAlert
} from 'lucide-react';
import { isTabAllowed, ROLE_CONFIGS } from '@/lib/rbac';

function MainApp() {
  const { activeTab, setActiveTab, toastMessage, role, isAuthenticated, isAuthLoaded } = useProject();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Prevent SSR hydration mismatch: render identical loading state until client mounts and reads storage
  if (!isAuthLoaded) {
    return (
      <div className="flex h-screen h-[100dvh] w-full items-center justify-center bg-[#0B1120] text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#3C50E0] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-[#94A3B8] font-mono tracking-wider">SORA PROJECT SYSTEM...</span>
        </div>
      </div>
    );
  }

  // If not logged in, render the Enterprise Login Page
  if (!isAuthenticated) {
    return (
      <>
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-200">
            <div className="flex items-center gap-3 px-4 py-3 rounded-sm bg-white border border-[#E2E8F0] border-l-4 border-l-[#10B981] text-[#1C2434] shadow-lg text-xs font-semibold">
              <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0" />
              <span>{toastMessage}</span>
            </div>
          </div>
        )}
        <LoginView />
      </>
    );
  }

  // Role-based mobile navigation items
  const getMobileNavItems = () => {
    switch (role) {
      case 'Kepala Produksi':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'projects', label: 'Proyek', icon: FolderKanban },
          { id: 'progress', label: 'Progres', icon: CalendarRange },
          { id: 'procurement', label: 'PO Bahan', icon: ShoppingBag },
        ];
      case 'Admin Keuangan':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'cost-control', label: 'Cost', icon: TrendingDown },
          { id: 'termin', label: 'Termin', icon: CreditCard },
          { id: 'hpp-quotation', label: 'BOQ', icon: Calculator },
        ];
      case 'Pengawas Lapangan':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'projects', label: 'Proyek', icon: FolderKanban },
          { id: 'progress', label: 'Progres', icon: CalendarRange },
          { id: 'tk-vendor', label: 'Tukang', icon: HardHat },
        ];
      case 'Owner':
      default:
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'projects', label: 'Proyek', icon: FolderKanban },
          { id: 'hpp-quotation', label: 'BOQ/SPK', icon: Calculator },
          { id: 'cost-control', label: 'Cost Control', icon: TrendingDown },
        ];
    }
  };

  const mobileNavItems = getMobileNavItems();
  const isCurrentTabPermitted = isTabAllowed(role, activeTab);

  return (
    <div className="flex h-screen h-[100dvh] overflow-hidden bg-[#F1F5F9] font-sans text-[#1C2434]">
      {/* Toast Notification TailAdmin */}
      {toastMessage && (
        <div className="fixed bottom-14 sm:bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center gap-3 px-4 py-3 rounded-sm bg-white border border-[#E2E8F0] border-l-4 border-l-[#10B981] text-[#1C2434] shadow-lg text-xs font-semibold">
            <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* TailAdmin Sidebar */}
      <Sidebar
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Content Area */}
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        {/* TailAdmin Top Navbar */}
        <Navbar onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} />

        {/* Main Content Page Container */}
        <main className="flex-1 p-3 sm:p-5 md:p-6 2xl:p-10 pb-24 lg:pb-10">
          <div className="mx-auto max-w-7xl space-y-4 sm:space-y-6">
            {!isCurrentTabPermitted ? (
              <div className="tail-card p-6 sm:p-12 text-center max-w-xl mx-auto space-y-4 my-8">
                <div className="w-14 h-14 rounded-full bg-[#D34053]/10 text-[#D34053] flex items-center justify-center mx-auto">
                  <ShieldAlert className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1C2434]">Akses Halaman Dibatasi</h3>
                  <p className="text-xs text-[#64748B] mt-1 max-w-md mx-auto leading-relaxed">
                    Halaman ini dikhususkan untuk fungsi tertentu dan tidak dapat diakses oleh role <strong className="text-[#1C2434]">{role}</strong> demi menjaga kerahasiaan & integritas pembagian divisi.
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => setActiveTab('dashboard')}
                    className="btn-tail-primary text-xs mx-auto inline-flex items-center gap-2"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    <span>Kembali ke Dashboard {role}</span>
                  </button>
                </div>
              </div>
            ) : (
              <>
                {activeTab === 'dashboard' && <DashboardView />}
                {activeTab === 'partners' && <PartnerView />}
                {activeTab === 'projects' && <ProjectManagementView />}
                {activeTab === 'progress' && <ProgressView />}
                {activeTab === 'hpp-quotation' && <HPPQuotationView />}
                {activeTab === 'cost-control' && <CostControlView />}
                {activeTab === 'tk-vendor' && <TKVendorView />}
                {activeTab === 'procurement' && <ProcurementView />}
                {activeTab === 'termin' && <TerminView />}
                {activeTab === 'laporan' && <LaporanView />}
                {activeTab === 'activity-log' && <ActivityLogView />}
                {activeTab === 'users' && <UserManagementView />}
              </>
            )}
          </div>
        </main>
      </div>

      {/* Role-Aware Mobile Bottom Bar (with iOS Safe Area) */}
      <div className={`lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E2E8F0] px-2 py-1.5 flex items-center justify-around text-[10px] shadow-lg pb-[max(0.375rem,env(safe-area-inset-bottom))] transition-all duration-200 ${
        isMobileSidebarOpen ? 'translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
      }`}>
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-0.5 p-1 transition-colors ${
                isActive ? 'text-[#3C50E0] font-bold' : 'text-[#64748B]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          );
        })}
        <button
          onClick={() => setIsMobileSidebarOpen(true)}
          className="flex flex-col items-center gap-0.5 p-1 text-[#64748B] hover:text-[#1C2434] transition-colors"
        >
          <Users2 className="w-4 h-4" />
          <span>Menu</span>
        </button>
      </div>

      {/* Global Modals */}
      <CreateProjectModal />
      <AddExpenseModal />
      <CreatePOModal />
      <QuotationPreviewModal />
      <ProjectDetailDrawer />
    </div>
  );
}

export default function Page() {
  return (
    <ProjectProvider>
      <MainApp />
    </ProjectProvider>
  );
}
