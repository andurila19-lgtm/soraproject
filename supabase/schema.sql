-- ====================================================================
-- SORA PROJECT — B2B CONTRACTOR OPERATING SYSTEM
-- DATABASE SCHEMA PRODUCTION (BERSIH DARI 0 — TANPA DATA DUMMY)
-- Engine: Supabase PostgreSQL
-- ====================================================================

-- Pastikan ekstensi UUID aktif
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES & ROLES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('Owner', 'Kepala Produksi', 'Admin Keuangan', 'Pengawas Lapangan')),
  avatar_url TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PARTNERS TABLE (Konsultan Arsitek, Developer, Holding F&B)
CREATE TABLE IF NOT EXISTS public.partners (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  contact_person TEXT,
  phone TEXT,
  email TEXT,
  address TEXT,
  total_projects INT DEFAULT 0,
  active_projects INT DEFAULT 0,
  total_contract_value BIGINT DEFAULT 0,
  payment_score TEXT DEFAULT 'Baik',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  partner_id TEXT REFERENCES public.partners(id) ON DELETE SET NULL,
  partner_name TEXT,
  end_user TEXT,
  project_type TEXT,
  location TEXT,
  contract_value BIGINT DEFAULT 0,
  hpp_budget BIGINT DEFAULT 0,
  actual_cost BIGINT DEFAULT 0,
  target_margin NUMERIC(5,2) DEFAULT 30.0,
  progress INT DEFAULT 0,
  status TEXT DEFAULT 'Deal & SPK',
  health TEXT DEFAULT 'On Track',
  pic_produksi TEXT,
  pic_lapangan TEXT,
  start_date DATE,
  target_completion DATE,
  image TEXT,
  description TEXT,
  milestones JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. BOQ & HPP ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.boq_items (
  id TEXT PRIMARY KEY,
  project_id TEXT REFERENCES public.projects(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  item_description TEXT NOT NULL,
  specification TEXT,
  unit TEXT,
  volume NUMERIC(12,2) DEFAULT 1,
  unit_price_hpp BIGINT DEFAULT 0,
  total_hpp BIGINT DEFAULT 0,
  markup_percent NUMERIC(5,2) DEFAULT 30.0,
  quotation_price BIGINT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. COST EXPENSES TABLE (Buku Kas Lapangan & Ledger Realisasi)
CREATE TABLE IF NOT EXISTS public.cost_expenses (
  id TEXT PRIMARY KEY,
  project_id TEXT REFERENCES public.projects(id) ON DELETE CASCADE,
  project_name TEXT,
  date DATE DEFAULT CURRENT_DATE,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  vendor_or_recipient TEXT NOT NULL,
  budget_allocated BIGINT DEFAULT 0,
  actual_amount BIGINT DEFAULT 0,
  variance BIGINT DEFAULT 0,
  status TEXT DEFAULT 'Approved',
  receipt_no TEXT,
  payment_method TEXT DEFAULT 'Transfer Bank',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. PURCHASE ORDERS TABLE (PO Material & Logistik)
CREATE TABLE IF NOT EXISTS public.purchase_orders (
  id TEXT PRIMARY KEY,
  po_number TEXT UNIQUE NOT NULL,
  project_id TEXT REFERENCES public.projects(id) ON DELETE CASCADE,
  project_name TEXT,
  vendor_name TEXT NOT NULL,
  items_summary TEXT NOT NULL,
  total_amount BIGINT DEFAULT 0,
  request_date DATE DEFAULT CURRENT_DATE,
  delivery_date DATE,
  status TEXT DEFAULT 'Pending Approval',
  pic_request TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. PAYMENT TERMINS TABLE (Multi-Termin Invoicing & Retensi)
CREATE TABLE IF NOT EXISTS public.payment_termins (
  id TEXT PRIMARY KEY,
  project_id TEXT REFERENCES public.projects(id) ON DELETE CASCADE,
  project_name TEXT,
  client_name TEXT,
  termin_name TEXT NOT NULL,
  percentage NUMERIC(5,2) NOT NULL,
  amount BIGINT DEFAULT 0,
  trigger_condition TEXT,
  due_date DATE,
  paid_date DATE,
  status TEXT DEFAULT 'Draft / Belum Ditagihkan',
  invoice_number TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. OPNAME ITEMS TABLE (Joint Opname Lapangan)
CREATE TABLE IF NOT EXISTS public.opname_items (
  id TEXT PRIMARY KEY,
  project_id TEXT REFERENCES public.projects(id) ON DELETE CASCADE,
  project_name TEXT,
  date DATE DEFAULT CURRENT_DATE,
  item_description TEXT NOT NULL,
  category TEXT NOT NULL,
  unit TEXT,
  initial_volume NUMERIC(10,2) DEFAULT 0,
  actual_volume NUMERIC(10,2) DEFAULT 0,
  difference_volume NUMERIC(10,2) DEFAULT 0,
  unit_price BIGINT DEFAULT 0,
  adjustment_value BIGINT DEFAULT 0,
  notes TEXT,
  status TEXT DEFAULT 'Waiting Approval',
  verified_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. PROJECT ADDENDUMS TABLE (Pekerjaan Tambahan / Scope Adjustment)
CREATE TABLE IF NOT EXISTS public.project_addendums (
  id TEXT PRIMARY KEY,
  project_id TEXT REFERENCES public.projects(id) ON DELETE CASCADE,
  project_name TEXT,
  client_name TEXT,
  addendum_number TEXT UNIQUE NOT NULL,
  date DATE DEFAULT CURRENT_DATE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  amount BIGINT DEFAULT 0,
  status TEXT DEFAULT 'Waiting Approval',
  impact_on_schedule TEXT,
  requested_by TEXT,
  client_approver TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. WORKERS & VENDORS TABLE
CREATE TABLE IF NOT EXISTS public.workers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  specialty TEXT NOT NULL,
  daily_rate BIGINT DEFAULT 0,
  status TEXT DEFAULT 'Aktif di Site',
  current_project TEXT,
  phone TEXT,
  rating NUMERIC(3,2) DEFAULT 5.0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.vendors (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  contact_person TEXT,
  phone TEXT,
  city TEXT,
  active_orders INT DEFAULT 0,
  rating NUMERIC(3,2) DEFAULT 5.0,
  payment_term TEXT DEFAULT 'Tempo 30 Hari',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. SITE PHOTOS & DAILY REPORTS TABLE
CREATE TABLE IF NOT EXISTS public.site_photos (
  id TEXT PRIMARY KEY,
  project_id TEXT REFERENCES public.projects(id) ON DELETE CASCADE,
  area TEXT NOT NULL,
  caption TEXT NOT NULL,
  date DATE DEFAULT CURRENT_DATE,
  uploader TEXT,
  image_url TEXT,
  type TEXT DEFAULT 'Dalam Proses',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.daily_reports (
  id TEXT PRIMARY KEY,
  project_id TEXT REFERENCES public.projects(id) ON DELETE CASCADE,
  date DATE DEFAULT CURRENT_DATE,
  weather TEXT DEFAULT 'Cerah',
  tukang_count INT DEFAULT 0,
  pic TEXT,
  summary TEXT NOT NULL,
  materials_received TEXT,
  obstacles TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. ACTIVITY AUDIT LOG TABLE
CREATE TABLE IF NOT EXISTS public.activity_logs (
  id TEXT PRIMARY KEY,
  user_name TEXT NOT NULL,
  role TEXT NOT NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT,
  entity_name TEXT,
  details TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.boq_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cost_expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchase_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_termins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opname_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_addendums ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- Allow full access for anon & authenticated roles during operational use
DO $$
DECLARE
  tbl text;
BEGIN
  FOR tbl IN 
    SELECT tablename FROM pg_tables WHERE schemaname = 'public'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS "Allow all for public" ON public.%I', tbl);
    EXECUTE format('CREATE POLICY "Allow all for public" ON public.%I FOR ALL USING (true) WITH CHECK (true)', tbl);
  END LOOP;
END $$;

-- 13. INDEXES FOR HIGH-SPEED QUERYING
CREATE INDEX IF NOT EXISTS idx_projects_partner_id ON public.projects(partner_id);
CREATE INDEX IF NOT EXISTS idx_boq_items_project_id ON public.boq_items(project_id);
CREATE INDEX IF NOT EXISTS idx_cost_expenses_project_id ON public.cost_expenses(project_id);
CREATE INDEX IF NOT EXISTS idx_purchase_orders_project_id ON public.purchase_orders(project_id);
CREATE INDEX IF NOT EXISTS idx_payment_termins_project_id ON public.payment_termins(project_id);
CREATE INDEX IF NOT EXISTS idx_opname_items_project_id ON public.opname_items(project_id);
CREATE INDEX IF NOT EXISTS idx_project_addendums_project_id ON public.project_addendums(project_id);
CREATE INDEX IF NOT EXISTS idx_site_photos_project_id ON public.site_photos(project_id);
CREATE INDEX IF NOT EXISTS idx_daily_reports_project_id ON public.daily_reports(project_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_timestamp ON public.activity_logs(timestamp DESC);

-- ====================================================================
-- SEED TIM RESMI SORA PROJECT (PROFILES ONLY - ZERO DUMMY PROJECTS)
-- ====================================================================
INSERT INTO public.profiles (email, full_name, role, phone) VALUES
  ('robith.owner@soraproject.com', 'Ir. Robith Izzudin', 'Owner', '0811-9876-5432'),
  ('budi.produksi@soraproject.com', 'Budi Santoso', 'Kepala Produksi', '0812-3344-5566'),
  ('siti.keuangan@soraproject.com', 'Siti Rahmawati', 'Admin Keuangan', '0813-7788-9900'),
  ('rian.lapangan@soraproject.com', 'Rian Pratama', 'Pengawas Lapangan', '0818-1122-3344')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role;
