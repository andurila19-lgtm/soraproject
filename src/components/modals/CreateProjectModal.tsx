'use client';

import React, { useState } from 'react';
import { useProject } from '@/context/ProjectContext';
import { Project } from '@/lib/types';
import { X } from 'lucide-react';

export function CreateProjectModal() {
  const { isCreateProjectOpen, setIsCreateProjectOpen, addProject, partners } = useProject();

  const [name, setName] = useState('');
  const [partnerId, setPartnerId] = useState(partners[0]?.id || '');
  const [endUser, setEndUser] = useState('');
  const [projectType, setProjectType] = useState<Project['projectType']>('Kantor B2B');
  const [location, setLocation] = useState('');
  const [contractValue, setContractValue] = useState<number>(1000000000);
  const [hppBudget, setHppBudget] = useState<number>(700000000);
  const [targetMargin, setTargetMargin] = useState<number>(30);
  const [picProduksi, setPicProduksi] = useState('Budi Santoso (Kepala Produksi)');
  const [picLapangan, setPicLapangan] = useState('Rian Pratama (Site Supervisor)');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [targetCompletion, setTargetCompletion] = useState('2026-11-30');
  const [description, setDescription] = useState('');

  if (!isCreateProjectOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !partnerId) return;

    const partner = partners.find(p => p.id === partnerId);
    const partnerName = partner ? partner.name : 'Partner B2B';

    addProject({
      name,
      partnerId,
      partnerName,
      endUser: endUser || name,
      projectType,
      location: location || 'Jakarta, Indonesia',
      contractValue: Number(contractValue),
      hppBudget: Number(hppBudget),
      actualCost: 0,
      targetMargin: Number(targetMargin),
      progress: 5,
      status: 'Deal & SPK',
      health: 'On Track',
      picProduksi,
      picLapangan,
      startDate,
      targetCompletion,
      image: projectType === 'F&B Cafe & Resto' ? '/images/project-cafe.jpg' : '/images/project-office.jpg',
      description: description || 'Pekerjaan renovasi dan fit-out interior komersial B2B.',
    });

    setIsCreateProjectOpen(false);
  };

  return (
    <div 
      onClick={(e) => { if (e.target === e.currentTarget) setIsCreateProjectOpen(false); }}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs overscroll-contain modal-backdrop-lock"
    >
      <form 
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white rounded-lg sm:rounded-md border border-[#E2E8F0] shadow-2xl max-h-[92dvh] sm:max-h-[88vh] flex flex-col overflow-hidden my-auto modal-content-lock touch-pan-y"
      >
        {/* Pinned Modal Header */}
        <div className="px-4 sm:px-6 py-3.5 border-b border-[#E2E8F0] flex items-center justify-between shrink-0 bg-white">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3C50E0]" />
            <h3 className="font-bold text-sm sm:text-base text-[#1C2434]">
              Formulir Pendaftaran Proyek Interior Baru
            </h3>
          </div>
          <button 
            type="button"
            onClick={() => setIsCreateProjectOpen(false)} 
            className="text-[#64748B] hover:text-[#1C2434] p-1.5 rounded hover:bg-[#EFF2F7] transition"
            aria-label="Tutup Formulir"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-1 min-h-0 overflow-y-auto modal-scroll p-4 sm:p-6 space-y-3 sm:space-y-4 text-xs overscroll-contain touch-pan-y">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="sm:col-span-2">
              <label className="block text-[#1C2434] font-semibold mb-1">Nama Proyek Fit-out</label>
              <input
                type="text"
                required
                placeholder="Contoh: Fit-out Kantor FinTech Lt. 24"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="tail-input min-h-[38px]"
              />
            </div>

            <div>
              <label className="block text-[#1C2434] font-semibold mb-1">Partner / Klien Utama</label>
              <select
                value={partnerId}
                onChange={(e) => setPartnerId(e.target.value)}
                className="tail-input min-h-[38px]"
              >
                {partners.map((p) => (
                  <option key={p.id} value={p.id}>{p.name} ({p.type})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[#1C2434] font-semibold mb-1">End User / Brand Client</label>
              <input
                type="text"
                placeholder="Contoh: Tanamera Coffee / PT Nexus"
                value={endUser}
                onChange={(e) => setEndUser(e.target.value)}
                className="tail-input min-h-[38px]"
              />
            </div>

            <div>
              <label className="block text-[#1C2434] font-semibold mb-1">Tipe Proyek</label>
              <select
                value={projectType}
                onChange={(e) => setProjectType(e.target.value as any)}
                className="tail-input min-h-[38px]"
              >
                <option value="Kantor B2B">Kantor B2B (Corporate Office)</option>
                <option value="F&B Cafe & Resto">F&B Cafe & Resto</option>
                <option value="Retail Boutique">Retail Boutique Store</option>
                <option value="Luxury Residential">Luxury Residential / Penthouse</option>
              </select>
            </div>

            <div>
              <label className="block text-[#1C2434] font-semibold mb-1">Lokasi Proyek</label>
              <input
                type="text"
                required
                placeholder="Gedung, Lantai, Kota..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="tail-input min-h-[38px]"
              />
            </div>

            <div>
              <label className="block text-[#1C2434] font-semibold mb-1">Nilai Kontrak Deal (Rp)</label>
              <input
                type="number"
                min="0"
                step="1000000"
                required
                value={contractValue}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setContractValue(val);
                  setHppBudget(Math.round(val * 0.7));
                }}
                className="tail-input font-mono min-h-[38px]"
              />
            </div>

            <div>
              <label className="block text-[#1C2434] font-semibold mb-1">Alokasi Plafon HPP (Rp)</label>
              <input
                type="number"
                min="0"
                step="1000000"
                required
                value={hppBudget}
                onChange={(e) => setHppBudget(Number(e.target.value))}
                className="tail-input font-mono min-h-[38px]"
              />
            </div>

            <div>
              <label className="block text-[#1C2434] font-semibold mb-1">PIC Kepala Produksi (Workshop)</label>
              <select
                value={picProduksi}
                onChange={(e) => setPicProduksi(e.target.value)}
                className="tail-input min-h-[38px]"
              >
                <option value="Budi Santoso (Kepala Produksi)">Budi Santoso (Kepala Produksi)</option>
                <option value="Agus Salim (Workshop Manager)">Agus Salim (Workshop Manager)</option>
              </select>
            </div>

            <div>
              <label className="block text-[#1C2434] font-semibold mb-1">PIC Site Supervisor (Lapangan)</label>
              <select
                value={picLapangan}
                onChange={(e) => setPicLapangan(e.target.value)}
                className="tail-input min-h-[38px]"
              >
                <option value="Rian Pratama (Site Supervisor)">Rian Pratama (Site Supervisor)</option>
                <option value="Hendra Gunawan (Site Supervisor)">Hendra Gunawan (Site Supervisor)</option>
              </select>
            </div>

            <div>
              <label className="block text-[#1C2434] font-semibold mb-1">Tanggal Mulai SPK</label>
              <input
                type="date"
                required
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="tail-input min-h-[38px]"
              />
            </div>

            <div>
              <label className="block text-[#1C2434] font-semibold mb-1">Target Serah Terima (Handover)</label>
              <input
                type="date"
                required
                value={targetCompletion}
                onChange={(e) => setTargetCompletion(e.target.value)}
                className="tail-input min-h-[38px]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[#1C2434] font-semibold mb-1">Deskripsi Ruang Lingkup Proyek</label>
              <textarea
                rows={2}
                placeholder="Rincian pekerjaan: joinery, partisi kaca, mechanical electrical, ceiling..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="tail-input"
              />
            </div>
          </div>
        </div>

        {/* Pinned Modal Footer */}
        <div className="px-4 sm:px-6 py-3 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-end gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => setIsCreateProjectOpen(false)}
            className="btn-tail-secondary py-2 px-4 text-xs font-semibold"
          >
            Batal
          </button>
          <button
            type="submit"
            className="btn-tail-primary py-2 px-5 text-xs font-semibold shadow-xs"
          >
            Simpan & Daftarkan Proyek
          </button>
        </div>
      </form>
    </div>
  );
}
