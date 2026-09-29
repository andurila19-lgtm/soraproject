'use client';

import React, { useState } from 'react';
import { useProject } from '@/context/ProjectContext';
import { X } from 'lucide-react';

export function CreatePOModal() {
  const { isCreatePOOpen, setIsCreatePOOpen, addPurchaseOrder, projects, vendors } = useProject();

  const [projectId, setProjectId] = useState(projects[0]?.id || '');
  const [vendorName, setVendorName] = useState(vendors[0]?.name || '');
  const [itemsSummary, setItemsSummary] = useState('');
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [deliveryDate, setDeliveryDate] = useState('2026-10-05');
  const [picRequest, setPicRequest] = useState('Rian Pratama (Site Supervisor)');

  if (!isCreatePOOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemsSummary || !vendorName) return;

    const prj = projects.find(p => p.id === projectId);
    const projectName = prj ? prj.name : projects[0]?.name || 'Fit-out Proyek B2B';

    addPurchaseOrder({
      projectId,
      projectName,
      vendorName,
      itemsSummary,
      totalAmount: Number(totalAmount),
      requestDate: new Date().toISOString().split('T')[0],
      deliveryDate,
      picRequest,
    });

    setIsCreatePOOpen(false);
  };

  return (
    <div 
      onClick={(e) => { if (e.target === e.currentTarget) setIsCreatePOOpen(false); }}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs overscroll-contain modal-backdrop-lock"
    >
      <form 
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white rounded-lg sm:rounded-md border border-[#E2E8F0] shadow-2xl max-h-[92dvh] sm:max-h-[88vh] flex flex-col overflow-hidden my-auto modal-content-lock touch-pan-y"
      >
        {/* Pinned Modal Header */}
        <div className="px-4 sm:px-6 py-3.5 border-b border-[#E2E8F0] flex items-center justify-between shrink-0 bg-white">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3C50E0]" />
            <h3 className="font-bold text-sm sm:text-base text-[#1C2434]">
              Penerbitan Purchase Order (PO) Material
            </h3>
          </div>
          <button 
            type="button"
            onClick={() => setIsCreatePOOpen(false)} 
            className="text-[#64748B] hover:text-[#1C2434] p-1.5 rounded hover:bg-[#EFF2F7] transition"
            aria-label="Tutup Formulir"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-1 min-h-0 overflow-y-auto modal-scroll p-4 sm:p-6 space-y-3 sm:space-y-4 text-xs overscroll-contain touch-pan-y">
          <div>
            <label className="block text-[#1C2434] font-semibold mb-1">Pilih Proyek Penerima</label>
            {projects.length === 0 ? (
              <p className="text-xs text-[#D34053] bg-red-50 p-2 rounded border border-red-200">
                Belum ada proyek terdaftar. Harap buat proyek baru terlebih dahulu sebelum menerbitkan PO.
              </p>
            ) : (
              <select
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="tail-input min-h-[38px]"
                required
              >
                <option value="">-- Pilih Proyek --</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>{p.code} - {p.name}</option>
                ))}
              </select>
            )}
          </div>

          <div>
            <label className="block text-[#1C2434] font-semibold mb-1">Supplier / Vendor Rekanan</label>
            {vendors.length === 0 ? (
              <input
                type="text"
                required
                placeholder="Nama Supplier atau Toko Material..."
                value={vendorName}
                onChange={(e) => setVendorName(e.target.value)}
                className="tail-input min-h-[38px]"
              />
            ) : (
              <select
                value={vendorName}
                onChange={(e) => setVendorName(e.target.value)}
                className="tail-input min-h-[38px]"
                required
              >
                <option value="">-- Pilih Supplier Rekanan --</option>
                {vendors.map((v) => (
                  <option key={v.id} value={v.name}>{v.name} ({v.category})</option>
                ))}
              </select>
            )}
          </div>

          <div>
            <label className="block text-[#1C2434] font-semibold mb-1">Rincian Material & Volume</label>
            <textarea
              rows={2}
              required
              placeholder="Contoh: Taco HPL TH-001G (20 Lbr), Multipleks 18mm (15 Lbr)"
              value={itemsSummary}
              onChange={(e) => setItemsSummary(e.target.value)}
              className="tail-input"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[#1C2434] font-semibold mb-1">Estimasi Nilai PO (Rp)</label>
              <input
                type="number"
                min="0"
                step="50000"
                required
                value={totalAmount}
                onChange={(e) => setTotalAmount(Number(e.target.value))}
                className="tail-input font-mono min-h-[38px]"
              />
            </div>
            <div>
              <label className="block text-[#1C2434] font-semibold mb-1">Target Pengiriman Site</label>
              <input
                type="date"
                required
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                className="tail-input min-h-[38px]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#1C2434] font-semibold mb-1">PIC Pemohon</label>
            <select
              value={picRequest}
              onChange={(e) => setPicRequest(e.target.value)}
              className="tail-input min-h-[38px]"
            >
              <option value="Rian Pratama (Site Supervisor)">Rian Pratama (Site Supervisor SCBD)</option>
              <option value="Hendra Gunawan (Site Supervisor)">Hendra Gunawan (Site Supervisor Senopati)</option>
              <option value="Agus Salim (Workshop Manager)">Agus Salim (Workshop Joinery Cibubur)</option>
            </select>
          </div>
        </div>

        {/* Pinned Modal Footer */}
        <div className="px-4 sm:px-6 py-3 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-end gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => setIsCreatePOOpen(false)}
            className="btn-tail-secondary py-2 px-4 text-xs font-semibold"
          >
            Batal
          </button>
          <button
            type="submit"
            className="btn-tail-primary py-2 px-5 text-xs font-semibold shadow-xs"
          >
            Ajukan Order PO
          </button>
        </div>
      </form>
    </div>
  );
}
