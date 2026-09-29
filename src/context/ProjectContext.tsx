'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
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
  ActivityLog,
  OpnameItem,
  ProjectAddendum 
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
  initialActivityLogs,
  initialOpnames,
  initialAddendums
} from '@/lib/mockData';
import { isTabAllowed } from '@/lib/rbac';

export interface UserProfile {
  name: string;
  role: UserRole;
  email: string;
  avatar: string;
  title: string;
}

export interface TeamMember {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  phone: string;
  createdAt: string;
  status: 'Aktif' | 'Nonaktif';
}

export const INITIAL_TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'usr-owner-1',
    fullName: 'Ir. Robith Izzudin',
    email: 'robith.owner@soraproject.com',
    role: 'Owner',
    phone: '0811-9876-5432',
    createdAt: new Date().toISOString().split('T')[0],
    status: 'Aktif',
  },
];

export const USERS_BY_ROLE: Record<UserRole, UserProfile> = {
  'Owner': {
    name: 'Ir. Robith Izzudin',
    role: 'Owner',
    email: 'robith.owner@soraproject.com',
    avatar: 'RI',
    title: 'Owner & Direktur Utama',
  },
  'Kepala Produksi': {
    name: 'Kepala Produksi',
    role: 'Kepala Produksi',
    email: '',
    avatar: 'KP',
    title: 'Kepala Produksi',
  },
  'Admin Keuangan': {
    name: 'Admin Keuangan',
    role: 'Admin Keuangan',
    email: '',
    avatar: 'AK',
    title: 'Admin Keuangan',
  },
  'Pengawas Lapangan': {
    name: 'Pengawas Lapangan',
    role: 'Pengawas Lapangan',
    email: '',
    avatar: 'PL',
    title: 'Pengawas Lapangan',
  },
};

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'warning' | 'info' | 'danger' | 'success';
  read: boolean;
}

interface ProjectContextType {
  isAuthenticated: boolean;
  isAuthLoaded: boolean;
  currentUser: UserProfile;
  login: (role?: UserRole, email?: string) => void;
  logout: () => void;
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
  opnames: OpnameItem[];
  addendums: ProjectAddendum[];

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
  addOpnameItem: (item: Omit<OpnameItem, 'id' | 'adjustmentValue'>) => void;
  updateOpnameStatus: (id: string, status: OpnameItem['status']) => void;
  addProjectAddendum: (addendum: Omit<ProjectAddendum, 'id' | 'addendumNumber'>) => void;
  updateAddendumStatus: (id: string, status: ProjectAddendum['status']) => void;
  markNotificationsAsRead: () => void;

  // User Management (Owner Only)
  teamMembers: TeamMember[];
  addTeamMember: (member: { fullName: string; email: string; role: UserRole; phone: string; password?: string }) => Promise<{ success: boolean; message?: string }>;
  deleteTeamMember: (id: string) => void;
  updateTeamMemberRole: (id: string, newRole: UserRole) => void;

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
  const [isAuthLoaded, setIsAuthLoaded] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [role, setRoleState] = useState<UserRole>('Owner');

  const currentUser = USERS_BY_ROLE[role] || USERS_BY_ROLE['Owner'];

  const login = (chosenRole: UserRole = 'Owner') => {
    setRoleState(chosenRole);
    setIsAuthenticated(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('sora_auth', 'true');
      localStorage.setItem('sora_role', chosenRole);
    }
    showToast(`Selamat datang, ${USERS_BY_ROLE[chosenRole].name}. Anda berhasil masuk sebagai ${chosenRole}.`);
  };

  const logout = async () => {
    setIsAuthenticated(false);
    if (supabase) {
      try {
        await supabase.auth.signOut();
      } catch (e) {}
    }
    if (typeof window !== 'undefined') {
      localStorage.removeItem('sora_auth');
      localStorage.removeItem('sora_role');
      localStorage.removeItem('sora_email');
    }
    showToast('Sesi kerja berakhir. Anda telah keluar dari sistem.');
  };

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
    if (typeof window !== 'undefined') {
      localStorage.setItem('sora_role', newRole);
    }
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
  const [addendums, setAddendums] = useState<ProjectAddendum[]>(initialAddendums);
  const [opnames, setOpnames] = useState<OpnameItem[]>(initialOpnames);

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(INITIAL_TEAM_MEMBERS);

  // Hydrate auth session & team members safely from localStorage on client mount (prevents SSR hydration mismatch)
  useEffect(() => {
    async function initAuth() {
      try {
        if (typeof window !== 'undefined') {
          if (supabase) {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
              setIsAuthenticated(true);
              const metaRole = session.user.user_metadata?.role as UserRole;
              if (metaRole && ['Owner', 'Kepala Produksi', 'Admin Keuangan', 'Pengawas Lapangan'].includes(metaRole)) {
                setRoleState(metaRole);
              }
            } else {
              // Sesi kosong — paksa status belum login
              setIsAuthenticated(false);
              localStorage.removeItem('sora_auth');
              localStorage.removeItem('sora_role');
            }
          } else {
            setIsAuthenticated(false);
          }
        }
      } catch (e) {
        setIsAuthenticated(false);
      } finally {
        setIsAuthLoaded(true);
      }
    }
    initAuth();
  }, []);

  // Sinkronisasi data profiles dari Supabase PostgreSQL
  useEffect(() => {
    async function syncProfiles() {
      try {
        if (!supabase) return;
        const { data, error } = await supabase.from('profiles').select('*');
        if (!error && data && data.length > 0) {
          const mapped: TeamMember[] = data.map((p: any) => ({
            id: p.id,
            fullName: p.full_name || p.email,
            email: p.email,
            role: p.role,
            phone: p.phone || '-',
            createdAt: p.created_at ? p.created_at.split('T')[0] : '2026-08-01',
            status: 'Aktif',
          }));
          setTeamMembers(mapped);
          if (typeof window !== 'undefined') {
            localStorage.setItem('sora_team_members', JSON.stringify(mapped));
          }
        }
      } catch (err) {
        console.warn('Sync profiles from Supabase notice:', err);
      }
    }
    syncProfiles();
  }, []);

  const [selectedProjectDetail, setSelectedProjectDetail] = useState<Project | null>(null);

  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [isCreatePOOpen, setIsCreatePOOpen] = useState(false);
  const [isQuotationPreviewOpen, setIsQuotationPreviewOpen] = useState(false);

  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  // ============ Activity Log Helper ============
  const logActivity = (
    action: string,
    entityType: ActivityLog['entityType'],
    entityId: string,
    entityName: string,
    details: string,
  ) => {
    const roleNames: Record<UserRole, string> = {
      'Owner': 'Ir. Robith (Owner)',
      'Kepala Produksi': 'Budi Santoso',
      'Admin Keuangan': 'Siti Rahmawati',
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

  const addOpnameItem = (itemData: Omit<OpnameItem, 'id' | 'adjustmentValue'>) => {
    const adjustmentValue = itemData.differenceVolume * itemData.unitPrice;
    const newOpn: OpnameItem = {
      ...itemData,
      id: `opn-${Date.now()}`,
      adjustmentValue,
    };
    setOpnames(prev => [newOpn, ...prev]);
    logActivity(
      'Catat hasil joint opname',
      'opname',
      newOpn.id,
      itemData.itemDescription,
      `Opname "${itemData.itemDescription}" volume ${itemData.initialVolume} -> ${itemData.actualVolume} ${itemData.unit}. Nilai penyesuaian: Rp ${adjustmentValue.toLocaleString('id-ID')}.`
    );
    showToast(`Hasil joint opname "${itemData.itemDescription}" berhasil dicatat.`);
  };

  const updateOpnameStatus = (id: string, status: OpnameItem['status']) => {
    let itemDesc = '';
    setOpnames(prev => prev.map(o => {
      if (o.id === id) {
        itemDesc = o.itemDescription;
        return { ...o, status };
      }
      return o;
    }));
    logActivity(`Update status opname ke ${status}`, 'opname', id, itemDesc, `Opname "${itemDesc}" status diubah ke "${status}".`);
    showToast(`Status opname diperbarui menjadi "${status}".`);
  };

  const addProjectAddendum = (addData: Omit<ProjectAddendum, 'id' | 'addendumNumber'>) => {
    const prj = projects.find(p => p.id === addData.projectId);
    const code = prj ? prj.code : 'SRA-2026';
    const addCount = addendums.filter(a => a.projectId === addData.projectId).length + 1;
    const addNum = `ADD/${code}/${String(addCount).padStart(2, '0')}`;
    const newAdd: ProjectAddendum = {
      ...addData,
      id: `add-${Date.now()}`,
      addendumNumber: addNum,
    };
    setAddendums(prev => [newAdd, ...prev]);
    logActivity(
      'Terbitkan addendum proyek',
      'addendum',
      newAdd.id,
      addData.title,
      `${addNum} senilai Rp ${addData.amount.toLocaleString('id-ID')} (${addData.type}). Status: ${addData.status}.`
    );
    showToast(`Addendum "${addNum}" berhasil diterbitkan. Status: ${addData.status}.`);
  };

  const updateAddendumStatus = (id: string, status: ProjectAddendum['status']) => {
    let addNum = '';
    let addTitle = '';
    let addAmount = 0;
    let addPrjId = '';
    setAddendums(prev => prev.map(a => {
      if (a.id === id) {
        addNum = a.addendumNumber;
        addTitle = a.title;
        addAmount = a.amount;
        addPrjId = a.projectId;
        return { ...a, status };
      }
      return a;
    }));

    // If addendum is approved by client, update project contractValue
    if (status === 'Disetujui Klien' && addPrjId && addAmount > 0) {
      setProjects(prev => prev.map(p => {
        if (p.id === addPrjId) {
          return {
            ...p,
            contractValue: p.contractValue + addAmount,
          };
        }
        return p;
      }));
    }

    logActivity(`Approval addendum: ${status}`, 'addendum', id, addTitle, `${addNum} disetujui klien. Nilai kontrak deal disesuaikan.`);
    showToast(`Addendum "${addNum}" ${status === 'Disetujui Klien' ? 'disetujui oleh Klien' : 'diperbarui'}.`);
  };

  const markNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // User Management (Owner Only)
  const addTeamMember = async (member: { fullName: string; email: string; role: UserRole; phone: string; password?: string }): Promise<{ success: boolean; message?: string }> => {
    try {
      let authUserId = `usr-${Date.now()}`;
      if (supabase && member.password) {
        const { data, error } = await supabase.auth.signUp({
          email: member.email,
          password: member.password,
          options: {
            data: {
              full_name: member.fullName,
              role: member.role,
              phone: member.phone,
            }
          }
        });
        if (error) {
          console.warn('Supabase signUp note:', error.message);
        } else if (data?.user?.id) {
          authUserId = data.user.id;
        }

        // Sinkronisasi record profiles
        try {
          await supabase.from('profiles').upsert({
            id: authUserId,
            email: member.email,
            full_name: member.fullName,
            role: member.role,
            phone: member.phone,
          });
        } catch (profileErr) {
          console.warn('Profile upsert note:', profileErr);
        }
      }

      const newMember: TeamMember = {
        id: authUserId,
        fullName: member.fullName,
        email: member.email,
        role: member.role,
        phone: member.phone,
        createdAt: new Date().toISOString().split('T')[0],
        status: 'Aktif',
      };

      setTeamMembers(prev => {
        const updated = [newMember, ...prev.filter(m => m.email !== member.email)];
        if (typeof window !== 'undefined') {
          localStorage.setItem('sora_team_members', JSON.stringify(updated));
        }
        return updated;
      });

      logActivity(
        'Tambah Akun Tim',
        'project',
        authUserId,
        member.fullName,
        `Akun tim ${member.fullName} (${member.role}) berhasil didaftarkan dengan email ${member.email}.`
      );
      showToast(`Akun untuk ${member.fullName} (${member.role}) berhasil dibuat!`);
      return { success: true };
    } catch (err: any) {
      console.error('Error creating team member:', err);
      return { success: false, message: err?.message || 'Gagal membuat akun tim' };
    }
  };

  const deleteTeamMember = async (id: string) => {
    setTeamMembers(prev => {
      const updated = prev.filter(m => m.id !== id);
      if (typeof window !== 'undefined') {
        localStorage.setItem('sora_team_members', JSON.stringify(updated));
      }
      return updated;
    });
    if (supabase) {
      try {
        await supabase.from('profiles').delete().eq('id', id);
      } catch (e) {}
    }
    showToast('Akun tim berhasil dinonaktifkan/dihapus.');
  };

  const updateTeamMemberRole = async (id: string, newRole: UserRole) => {
    setTeamMembers(prev => {
      const updated = prev.map(m => m.id === id ? { ...m, role: newRole } : m);
      if (typeof window !== 'undefined') {
        localStorage.setItem('sora_team_members', JSON.stringify(updated));
      }
      return updated;
    });
    if (supabase) {
      try {
        await supabase.from('profiles').update({ role: newRole }).eq('id', id);
      } catch (e) {}
    }
    showToast(`Role akun berhasil diubah menjadi ${newRole}.`);
  };

  return (
    <ProjectContext.Provider
      value={{
        isAuthenticated,
        isAuthLoaded,
        currentUser,
        login,
        logout,
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
        opnames,
        addendums,
        teamMembers,
        addTeamMember,
        deleteTeamMember,
        updateTeamMemberRole,
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
        addOpnameItem,
        updateOpnameStatus,
        addProjectAddendum,
        updateAddendumStatus,
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
