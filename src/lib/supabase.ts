import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ejeqwtqmkbbqiqtisywa.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqZXF3dHFta2JicWlxdGlzeXdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA2NjA4MTMsImV4cCI6MjEwNjIzNjgxM30.uLnDLiToGceAV67QFq4J3Vd3f_nQGmsj3wzBYMFzraU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
