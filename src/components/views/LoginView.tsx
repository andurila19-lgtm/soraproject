'use client';

import React, { useState } from 'react';
import { useProject } from '@/context/ProjectContext';
import { UserRole } from '@/lib/types';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  AlertCircle,
  Building2
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

export function LoginView() {
  const { login } = useProject();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError(null);

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setAuthError('Silakan masukkan alamat email.');
      setIsLoading(false);
      return;
    }

    if (!password || password.trim().length < 1) {
      setAuthError('Silakan masukkan kata sandi.');
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });

      if (error) {
        console.warn('Supabase Auth error:', error.message);
        if (error.message.includes('Invalid login credentials')) {
          setAuthError('Email atau kata sandi salah. Pastikan akun sudah didaftarkan.');
        } else if (error.message.includes('Email logins are disabled')) {
          setAuthError('Provider Email di Supabase belum aktif. Aktifkan toggle Email di Supabase Auth Providers.');
        } else if (error.message.includes('Email not confirmed')) {
          setAuthError('Akun belum aktif. Matikan "Confirm email" di Supabase Dashboard.');
        } else {
          setAuthError(`Gagal login: ${error.message}`);
        }
        setIsLoading(false);
        return;
      }

      if (data?.user) {
        let resolvedRole: UserRole = 'Owner';

        try {
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', data.user.id)
            .single();

          if (profile?.role) {
            resolvedRole = profile.role as UserRole;
          }
        } catch (pErr) {
          const metaRole = data.user.user_metadata?.role;
          if (metaRole && ['Owner', 'Kepala Produksi', 'Admin Keuangan', 'Pengawas Lapangan'].includes(metaRole)) {
            resolvedRole = metaRole as UserRole;
          }
        }

        login(resolvedRole, data.user.email || cleanEmail);
        setIsLoading(false);
        return;
      }

      setAuthError('Terjadi kesalahan tidak terduga. Silakan coba lagi.');
      setIsLoading(false);
    } catch (err: any) {
      console.error('Login exception:', err);
      setAuthError('Gagal terhubung ke server. Periksa koneksi internet Anda.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen min-h-[100dvh] w-full flex items-center justify-center p-4 bg-[#090D16] text-slate-100 font-sans relative overflow-hidden">
      {/* Subtle Ambient Background Light */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Clean Centered Login Card */}
      <div className="w-full max-w-sm relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 shadow-lg shadow-blue-500/20 mb-3.5 border border-blue-400/20">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Sora Project</h1>
          <p className="text-xs text-slate-400 mt-1">Contractor Operating System</p>
        </div>

        {/* Login Form Container */}
        <div className="bg-[#111726]/90 border border-slate-800/80 backdrop-blur-xl rounded-2xl p-6 sm:p-7 shadow-2xl shadow-black/50">
          <div className="mb-5 text-left">
            <h2 className="text-base font-semibold text-white">Masuk ke Akun</h2>
            <p className="text-xs text-slate-400 mt-0.5">Masukkan email dan kata sandi Anda</p>
          </div>

          {authError && (
            <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
              <span className="leading-relaxed">{authError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            {/* Email Input */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="w-full bg-[#0B101D] border border-slate-700/80 rounded-lg pl-10 pr-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Kata Sandi
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#0B101D] border border-slate-700/80 rounded-lg pl-10 pr-10 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 p-1 transition"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 mt-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium shadow-lg shadow-blue-600/25 transition active:scale-[0.99] disabled:opacity-60 cursor-pointer"
            >
              {isLoading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Memverifikasi...</span>
                </span>
              ) : (
                <>
                  <span>Masuk</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Minimal Footer */}
        <div className="text-center mt-6 text-[11px] text-slate-600">
          Sora Project • Contractor Enterprise OS
        </div>
      </div>
    </div>
  );
}
