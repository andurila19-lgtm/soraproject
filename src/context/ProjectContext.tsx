'use client';

import React, { createContext, useContext, useState } from 'react';
import { 
  UserRole, 
  Partner, 
  Project, 
  BOQItem, 
  CostExpense, 
  Worker, 
  Vendor, 
  PurchaseOrder, 
  PaymentTermin, 
  SitePhoto, 
  DailyReport,
  ActivityLog 
} from '@/lib/types';
import { 
  initialPartners, 
  initialProjects, 
  initialBOQItems, 
  initialExpenses, 
  initialWorkers, 
  initialVendors, 
  initialPurchaseOrders, 
  initialTermins, 
  initialSitePhotos, 
  initialDailyReports,
  initialActivityLogs 
} from '@/lib/mockData';
import { isTabAllowed } from '@/lib/rbac';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'warning' | 'info' | 'danger' | 'success';
  read: boolean;
}

interface ProjectContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  selectedProjectId: string; // 'all' or specific ID
  setSelectedProjectId: (id: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (c: boolean) => void;
  toggleSidebarCollapse: () => void;

  // Data Collections
  partners: Partner[];
  projects: Project[];
  boqItems: BOQItem[];
  expenses: CostExpense[];
  workers: Worker[];
  vendors: Vendor[];
  purchaseOrders: PurchaseOrder[];
  termins: PaymentTermin[];
  sitePhotos: SitePhoto[];
  dailyReports: DailyReport[];
  notifications: NotificationItem[];
  activityLogs: ActivityLog[];

  // Mutators
  addPartner: (partner: Omit<Partner, 'id' | 'totalProjects' | 'activeProjects' | 'totalContractValue'>) => void;
  addProject: (project: Omit<Project, 'id' | 'code' | 'milestones'>) => void;
  updateProjectProgress: (projectId: string, newProgress: number) => void;
  addBOQItem: (item: Omit<BOQItem, 'id' | 'totalHPP' | 'quotationPrice'>) => void;
  addExpense: (expense: Omit<CostExpense, 'id' | 'variance'>) => void;
  approveExpense: (id: string) => void;
  addPurchaseOrder: (po: Omit<PurchaseOrder, 'id' | 'poNumber' | 'status'>) => void;
  updatePOStatus: (id: string, status: PurchaseOrder['status']) => void;
  updateTerminStatus: (id: string, status: PaymentTermin['status']) => void;
  addSitePhoto: (photo: Omit<SitePhoto, 'id' | 'date'>) => void;
  addDailyReport: (report: Omit<DailyReport, 'id' | 'date'>) => void;
  markNotificationsAsRead: () => void;

  // Selected project for detail view
  selectedProjectDetail: Project | null;
  setSelectedProjectDetail: (p: Project | null) => void;

  // Global modals
  isCreateProjectOpen: boolean;
  setIsCreateProjectOpen: (open: boolean) => void;
  isAddExpenseOpen: boolean;
  setIsAddExpenseOpen: (open: boolean) => void;
  isCreatePOOpen: boolean;
  setIsCreatePOOpen: (open: boolean) => void;
  isQuotationPreviewOpen: boolean;
  setIsQuotationPreviewOpen: (open: boolean) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<UserRole>('Owner');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('all');
  const [activeTab, setActiveTabState] = useState<string>('dashboard');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const toggleSidebarCollapse = () => setIsSidebarCollapsed(prev => !prev);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    if (!isTabAllowed(newRole, activeTab)) {
      setActiveTabState('dashboard');
    }
  };

  const setActiveTab = (tab: string) => {
    if (isTabAllowed(role, tab)) {
      setActiveTabState(tab);
    } else {
      setActiveTabState('dashboard');
      showToast(`Akses ke modul ini dibatasi untuk role ${role}`);
    }
  };

  const [partners, setPartners] = useState<Partner[]>(initialPartners);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [boqItems, setBOQItems] = useState<BOQItem[]>(initialBOQItems);
  const [expenses, setExpenses] = useState<CostExpense[]>(initialExpenses);
  const [workers, setWorkers] = useState<Worker[]>(initialWorkers);
  const [vendors, setVendors] = useState<Vendor[]>(initialVendors);
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>(initialPurchaseOrders);
  const [termins, setTermins] = useState<PaymentTermin[]>(initialTermins);
  const [sitePhotos, setSitePhotos] = useState<SitePhoto[]>(initialSitePhotos);
  const [dailyReports, setDailyReports] = useState<DailyReport[]>(initialDailyReports);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(initialActivityLogs);

  const [selectedProjectDetail, setSelectedProjectDetail] = useState<Project | null>(null);

  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [isCreatePOOpen, setIsCreatePOOpen] = useState(false);
  const [isQuotationPreviewOpen, setIsQuotationPreviewOpen] = useState(false);

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'nt-1',
      title: 'Termin 2 SCBD Jatuh Tempo',
      message: 'Invoice Termin 2 (Rp 435.000.000) jatuh tempo dalam 3 hari ke PT Nexus Finansial Digital.',
      time: '10 menit lalu',
      type: 'warning',
      read: false,
    },
    {
      id: 'nt-2',
      title: 'PO Bahan Menunggu Approval',
      message: 'Tambahan slab Marmer Carrara Rp 7.500.000 diajukan oleh Hendra (Tanamera Senopati).',
      time: '1 jam lalu',
      type: 'info',
      read: false,
    },
    {
      id: 'nt-3',
      title: 'Peringatan Overbudget HPL',
      message: 'Pengeluaran Taco Walnut SCBD melebihi estimasi HPP sebesar Rp 225.000 karena revisi gambar.',
      time: '3 jam lalu',
      type: 'danger',
      read: false,
    },
  ]);

  // ============ Activity Log Helper ============
  const logActivity = (
    action: string,
    entityType: ActivityLog['entityType'],
    entityId: string,
    entityName: string,
    details: string,
  ) => {
    const roleNames: Record<UserRole, string> = {
      'Owner': 'Owner',
      'Kepala Produksi': 'Budi Santoso',
      'Admin Keuangan': 'Admin Keuangan',
      'Pengawas Lapangan': 'Rian Pratama',
    };
    const newLog: ActivityLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      userName: roleNames[role] || role,
      role,
      action,
      entityType,
      entityId,
      entityName,
      details,
    };
    setActivityLogs(prev => [newLog, ...prev]);
  };

  const addPartner = (newP: Omit<Partner, 'id' | 'totalProjects' | 'activeProjects' | 'totalContractValue'>) => {
    const p: Partner = {
      ...newP,
      id: `pt-${Date.now()}`,
      totalProjects: 0,
      activeProjects: 0,
      totalContractValue: 0,
    };
    setPartners(prev => [p, ...prev]);
    logActivity('Tambah partner B2B baru', 'partner', p.id, p.name, `Partner "${p.name}" (${p.type}) ditambahkan ke database.`);
    showToast(`Partner B2B "${p.name}" berhasil ditambahkan.`);
  };

  const addProject = (data: Omit<Project, 'id' | 'code' | 'milestones'>) => {
    const codeNum = projects.length + 1;
    const code = `SRA-2026-0${codeNum}`;
    const newPrj: Project = {
      ...data,
      id: `prj-${Date.now()}`,
      code,
      milestones: [
        { id: `m-${Date.now()}-1`, title: 'Survey & Gambar Kerja SPK', startDate: data.startDate, endDate: data.targetCompletion, progress: 100, status: 'Selesai', weight: 20 },
        { id: `m-${Date.now()}-2`, title: 'Produksi Workshop & Fabrikasi', startDate: data.startDate, endDate: data.targetCompletion, progress: 30, status: 'Sedang Berjalan', weight: 40 },
        { id: `m-${Date.now()}-3`, title: 'Instalasi Lapangan & Finishing', startDate: data.startDate, endDate: data.targetCompletion, progress: 0, status: 'Belum Mulai', weight: 40 },
      ],
    };
    setProjects(prev => [newPrj, ...prev]);

    // Update partner stats
    setPartners(prev => prev.map(pt => {
      if (pt.id === data.partnerId) {
        return {
          ...pt,
          totalProjects: pt.totalProjects + 1,
          activeProjects: pt.activeProjects + 1,
          totalContractValue: pt.totalContractValue + data.contractValue,
        };
      }
      return pt;
    }));

    logActivity('Buat proyek baru', 'project', newPrj.id, newPrj.name, `Proyek "${newPrj.name}" (${code}) dibuat. Nilai kontrak Rp ${data.contractValue.toLocaleString('id-ID')}.`);
    showToast(`Proyek baru "${newPrj.name}" (${code}) berhasil dibuat!`);
  };

  const updateProjectProgress = (projectId: string, newProgress: number) => {
    let projectName = '';
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        projectName = p.name;
        return {
          ...p,
          progress: Math.min(100, Math.max(0, newProgress)),
          status: newProgress >= 100 ? 'Selesai' : newProgress >= 80 ? 'Finishing & QC' : 'On-Site Fit-out',
        };
      }
      return p;
    }));
    logActivity(`Update progress fisik menjadi ${newProgress}%`, 'progress', projectId, projectName, `Progress fisik proyek diperbarui ke ${newProgress}%.`);
    showToast(`Progress fisik proyek diperbarui menjadi ${newProgress}%.`);
  };

  const addBOQItem = (item: Omit<BOQItem, 'id' | 'totalHPP' | 'quotationPrice'>) => {
    const totalHPP = item.volume * item.unitPriceHPP;
    const quotationPrice = totalHPP * (1 + item.markupPercent / 100);
    const newBOQ: BOQItem = {
      ...item,
      id: `boq-${Date.now()}`,
      totalHPP,
      quotationPrice,
    };
    setBOQItems(prev => [...prev, newBOQ]);
    logActivity('Tambah item BOQ', 'boq', newBOQ.id, item.itemDescription, `Item BOQ "${item.itemDescription}" (HPP: Rp ${totalHPP.toLocaleString('id-ID')}, Markup: ${item.markupPercent}%).`);
    showToast(`Item BOQ "${item.itemDescription}" berhasil ditambahkan.`);
  };

  const addExpense = (exp: Omit<CostExpense, 'id' | 'variance'>) => {
    const variance = exp.budgetAllocated - exp.actualAmount;
    const isOver = variance < 0;
    const newExp: CostExpense = {
      ...exp,
      id: `exp-${Date.now()}`,
      variance,
      status: isOver ? 'Flagged Overbudget' : 'Approved',
    };
    setExpenses(prev => [newExp, ...prev]);

    // Update project actual cost
    setProjects(prev => prev.map(p => {
      if (p.id === exp.projectId) {
        const updatedCost = p.actualCost + exp.actualAmount;
        const health = updatedCost > p.hppBudget ? 'Over Budget' : updatedCost > p.hppBudget * 0.95 ? 'Perlu Perhatian' : 'On Track';
        return {
          ...p,
          actualCost: updatedCost,
          health,
        };
      }
      return p;
    }));

    logActivity(
      isOver ? 'Catat pengeluaran (OVERBUDGET)' : 'Catat pengeluaran',
      'expense',
      newExp.id,
      exp.description,
      `Rp ${exp.actualAmount.toLocaleString('id-ID')} ke ${exp.vendorOrRecipient}. ${isOver ? `Melebihi plafon Rp ${Math.abs(variance).toLocaleString('id-ID')}.` : 'Sesuai plafon.'}`
    );
    showToast(`Pengeluaran Rp ${exp.actualAmount.toLocaleString('id-ID')} berhasil dicatat.`);
  };

  const approveExpense = (id: string) => {
    let expName = '';
    setExpenses(prev => prev.map(e => {
      if (e.id === id) {
        expName = e.description;
        return { ...e, status: 'Approved' };
      }
      return e;
    }));
    logActivity('Approve pengeluaran', 'expense', id, expName, `Pengeluaran "${expName}" disetujui.`);
    showToast('Biaya telah disetujui oleh Owner / Admin Keuangan.');
  };

  const addPurchaseOrder = (poData: Omit<PurchaseOrder, 'id' | 'poNumber' | 'status'>) => {
    const poNum = `PO-SRA-2026/${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(purchaseOrders.length + 1).padStart(3, '0')}`;
    const newPO: PurchaseOrder = {
      ...poData,
      id: `po-${Date.now()}`,
      poNumber: poNum,
      status: 'Pending Approval',
    };
    setPurchaseOrders(prev => [newPO, ...prev]);
    logActivity('Ajukan PO bahan baru', 'po', newPO.id, poData.itemsSummary, `${poNum} senilai Rp ${poData.totalAmount.toLocaleString('id-ID')} ke ${poData.vendorName}.`);
    showToast(`Permintaan PO "${poNum}" diajukan. Menunggu approval Owner.`);
  };

  const updatePOStatus = (id: string, status: PurchaseOrder['status']) => {
    let poName = '';
    let poAmount = 0;
    let poProjectId = '';
    let poProjectName = '';
    setPurchaseOrders(prev => prev.map(p => {
      if (p.id === id) {
        poName = p.itemsSummary;
        poAmount = p.totalAmount;
        poProjectId = p.projectId;
        poProjectName = p.projectName;
        return { ...p, status };
      }
      return p;
    }));

    // When PO is received at site, auto-add to project actual cost
    if (status === 'Diterima Lapangan' && poProjectId && poAmount > 0) {
      setProjects(prev => prev.map(p => {
        if (p.id === poProjectId) {
          const updatedCost = p.actualCost + poAmount;
          const health = updatedCost > p.hppBudget ? 'Over Budget' : updatedCost > p.hppBudget * 0.95 ? 'Perlu Perhatian' : 'On Track';
          return {
            ...p,
            actualCost: updatedCost,
            health,
          };
        }
        return p;
      }));

      // Auto-create expense entry for the PO
      const autoExp: CostExpense = {
        id: `exp-po-${Date.now()}`,
        projectId: poProjectId,
        projectName: poProjectName,
        date: new Date().toISOString().split('T')[0],
        category: 'Material',
        description: `PO Diterima: ${poName}`,
        vendorOrRecipient: purchaseOrders.find(p => p.id === id)?.vendorName || 'Vendor PO',
        budgetAllocated: poAmount,
        actualAmount: poAmount,
        variance: 0,
        status: 'Approved',
        receiptNo: `AUTO-PO-${id}`,
        paymentMethod: 'Transfer Bank',
      };
      setExpenses(prev => [autoExp, ...prev]);
    }

    const actionMap: Record<string, string> = {
      'Disetujui': 'Setujui PO bahan',
      'Sedang Dikirim': 'Kirim PO ke logistik',
      'Diterima Lapangan': 'Terima PO di site (masuk actual cost)',
    };
    logActivity(actionMap[status] || `Update status PO ke ${status}`, 'po', id, poName, `PO "${poName}" status diubah ke "${status}". Nilai: Rp ${poAmount.toLocaleString('id-ID')}.`);
    showToast(`Status PO diperbarui ke "${status}".`);
  };

  const updateTerminStatus = (id: string, status: PaymentTermin['status']) => {
    let terminName = '';
    setTermins(prev => prev.map(t => {
      if (t.id === id) {
        terminName = `${t.terminName} - ${t.projectName}`;
        return {
          ...t,
          status,
          paidDate: status === 'Lunas' ? new Date().toISOString().split('T')[0] : t.paidDate,
        };
      }
      return t;
    }));
    logActivity(`Update termin ke "${status}"`, 'termin', id, terminName, `Status termin diubah ke "${status}".`);
    showToast(`Status Termin diperbarui menjadi "${status}".`);
  };

  const addSitePhoto = (photo: Omit<SitePhoto, 'id' | 'date'>) => {
    const newPhoto: SitePhoto = {
      ...photo,
      id: `sp-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };
    setSitePhotos(prev => [newPhoto, ...prev]);
    logActivity('Upload foto lapangan', 'progress', photo.projectId, photo.area, `Foto dokumentasi area "${photo.area}" diunggah.`);
    showToast(`Foto dokumentasi lapangan untuk area "${photo.area}" berhasil diunggah.`);
  };

  const addDailyReport = (report: Omit<DailyReport, 'id' | 'date'>) => {
    const newReport: DailyReport = {
      ...report,
      id: `dr-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };
    setDailyReports(prev => [newReport, ...prev]);
    logActivity('Buat laporan harian site', 'progress', report.projectId, `Laporan ${report.pic}`, `Cuaca: ${report.weather}. ${report.tukangCount} tukang. ${report.summary.substring(0, 80)}...`);
    showToast(`Laporan Harian Lapangan berhasil disimpan.`);
  };

  const markNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <ProjectContext.Provider
      value={{
        role,
        setRole,
        selectedProjectId,
        setSelectedProjectId,
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        toastMessage,
        showToast,
        isSidebarCollapsed,
        setIsSidebarCollapsed,
        toggleSidebarCollapse,
        partners,
        projects,
        boqItems,
        expenses,
        workers,
        vendors,
        purchaseOrders,
        termins,
        sitePhotos,
        dailyReports,
        notifications,
        activityLogs,
        addPartner,
        addProject,
        updateProjectProgress,
        addBOQItem,
        addExpense,
        approveExpense,
        addPurchaseOrder,
        updatePOStatus,
        updateTerminStatus,
        addSitePhoto,
        addDailyReport,
        markNotificationsAsRead,
        selectedProjectDetail,
        setSelectedProjectDetail,
        isCreateProjectOpen,
        setIsCreateProjectOpen,
        isAddExpenseOpen,
        setIsAddExpenseOpen,
        isCreatePOOpen,
        setIsCreatePOOpen,
        isQuotationPreviewOpen,
        setIsQuotationPreviewOpen,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
}
