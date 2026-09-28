'use client';

import React, { useState } from 'react';
import { useProject } from '@/context/ProjectContext';
import { Partner } from '@/lib/types';
import { 
  Building2, 
  Users2, 
  Plus, 
  MapPin, 
  Search,
  CheckCircle2,
  X,
  Phone,
  Briefcase
} from 'lucide-react';
import { formatCompactRupiah, formatRupiah } from '@/lib/utils';
import { TableScrollWrapper } from '@/components/TableScrollWrapper';

export function PartnerView() {
  const { partners, projects, setSelectedProjectDetail } = useProject();
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<string>('Semua');
  const [isAddPartnerOpen, setIsAddPartnerOpen] = useState(false);

  const filteredPartners = partners.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.contactPerson.toLowerCase().includes(search.toLowerCase());
    const matchesType = selectedType === 'Semua' || p.type === selectedType;
    return matchesSearch && matchesType;
  });

  const totalPartnerValue = partners.reduce((acc, p) => acc + p.totalContractValue, 0);

  return (
    <div className="space-y-6">
      {/* TailAdmin Page Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C2434]">
            Partner & Klien B2B
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            Direktori Relasi Rekanan Arsitek, F&B Holding, dan Developer Multi-Project
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <nav>
            <ol className="hidden sm:flex items-center gap-1.5 text-xs text-[#64748B] mr-2">
              <li><span>Dashboard</span></li>
              <li>/</li>
              <li className="text-[#3C50E0] font-semibold">Partner & Klien</li>
            </ol>
          </nav>

          <button
            onClick={() => setIsAddPartnerOpen(true)}
            className="btn-tail-primary text-xs w-full sm:w-auto justify-center py-2.5 px-4 min-h-[38px]"
          >
            <Plus className="w-4 h-4" />
            <span>+ Tambah Partner Baru</span>
          </button>
        </div>
      </div>

      {/* TailAdmin 3 Metric Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
        <div className="rounded-sm border border-[#E2E8F0] bg-white py-5 px-6 shadow-sm">
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-[#EFF2F7] text-[#3C50E0]">
            <Building2 className="w-6 h-6" />
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-2xl font-bold text-[#1C2434]">
                {formatCompactRupiah(totalPartnerValue)}
              </h4>
              <span className="text-xs font-medium text-[#64748B]">Akumulasi Portofolio Deal</span>
            </div>
            <span className="badge-tail badge-tail-primary text-xs">Total Pipeline</span>
          </div>
        </div>

        <div className="rounded-sm border border-[#E2E8F0] bg-white py-5 px-6 shadow-sm">
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-[#EFF2F7] text-[#10B981]">
            <Users2 className="w-6 h-6" />
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-2xl font-bold text-[#1C2434]">
                {partners.length} Rekanan
              </h4>
              <span className="text-xs font-medium text-[#64748B]">Konsultan Arsitek & Developer</span>
            </div>
            <span className="badge-tail badge-tail-success text-xs">100% Aktif</span>
          </div>
        </div>

        <div className="rounded-sm border border-[#E2E8F0] bg-white py-5 px-6 shadow-sm">
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-[#EFF2F7] text-[#F0950C]">
            <Briefcase className="w-6 h-6" />
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-2xl font-bold text-[#1C2434]">
                85%
              </h4>
              <span className="text-xs font-medium text-[#64748B]">Tingkat Repeat Order B2B</span>
            </div>
            <span className="badge-tail badge-tail-warning text-xs">Rata-rata 2-4 Proyek</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="tail-card p-3 sm:p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Cari nama partner atau PIC..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="tail-input pl-9 text-xs w-full min-h-[38px]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1.5 md:pb-0 no-scrollbar">
          {['Semua', 'Arsitek / Konsultan', 'F&B Holding', 'Corporate Client', 'Property Developer'].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`text-xs px-3 py-2 rounded-sm font-medium transition whitespace-nowrap min-h-[36px] ${
                selectedType === type
                  ? 'bg-[#3C50E0] text-white font-semibold'
                  : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* TailAdmin Table */}
      <div className="tail-card">
        <div className="tail-card-header">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-[#1C2434]">
              Direktori Partner & Hubungan Multi-Project
            </h3>
            <p className="text-xs text-[#64748B] mt-0.5">
              Satu partner rekanan menaungi beberapa proyek cabang / end-user interior
            </p>
          </div>
          <span className="badge-tail badge-tail-gray text-xs">
            {filteredPartners.length} Entri Ditemukan
          </span>
        </div>

        <TableScrollWrapper minWidth="min-w-[800px]" hint="Geser direktori partner B2B">
          <table className="tail-table">
            <thead>
              <tr>
                <th>Nama Perusahaan / Studio</th>
                <th>Tipe Partner</th>
                <th>Kontak Person (PIC)</th>
                <th>Proyek Terkait (1-to-Many)</th>
                <th className="text-right">Nilai Portofolio</th>
                <th className="text-center">Skor Termin</th>
                <th>Catatan Khusus</th>
              </tr>
            </thead>
            <tbody>
              {filteredPartners.map((partner) => {
                const partnerProjects = projects.filter(p => p.partnerId === partner.id);
                return (
                  <tr key={partner.id}>
                    <td>
                      <div className="font-bold text-[#1C2434]">{partner.name}</div>
                      <div className="text-xs text-[#64748B] flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-[#64748B] shrink-0" />
                        <span className="truncate max-w-[220px]">{partner.address}</span>
                      </div>
                    </td>
                    <td>
                      <span className="badge-tail badge-tail-primary text-xs">
                        {partner.type}
                      </span>
                    </td>
                    <td>
                      <div className="font-bold text-[#1C2434]">{partner.contactPerson}</div>
                      <div className="text-xs text-[#64748B] font-mono">{partner.phone}</div>
                    </td>
                    <td>
                      <div className="space-y-1">
                        {partnerProjects.length === 0 ? (
                          <span className="text-xs text-[#64748B] italic">Belum ada proyek</span>
                        ) : (
                          partnerProjects.map((prj) => (
                            <button
                              key={prj.id}
                              onClick={() => setSelectedProjectDetail(prj)}
                              className="text-left text-xs font-medium text-[#3C50E0] hover:underline block truncate max-w-[220px]"
                            >
                              • {prj.code} ({prj.progress}%): {prj.name}
                            </button>
                          ))
                        )}
                      </div>
                    </td>
                    <td className="text-right font-mono font-bold text-[#1C2434]">
                      {formatRupiah(partner.totalContractValue)}
                    </td>
                    <td className="text-center">
                      <span className={`badge-tail ${
                        partner.paymentScore === 'Sangat Baik'
                          ? 'badge-tail-success'
                          : partner.paymentScore === 'Baik'
                          ? 'badge-tail-primary'
                          : 'badge-tail-warning'
                      }`}>
                        {partner.paymentScore}
                      </span>
                    </td>
                    <td className="text-xs text-[#64748B] max-w-[200px]">
                      {partner.notes}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </TableScrollWrapper>

        <div className="px-4 sm:px-6 py-3 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[#64748B]">
          <span>Menampilkan seluruh rekanan terverifikasi</span>
          <span className="text-[#10B981] font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Database Sora B2B
          </span>
        </div>
      </div>

      {/* Add Partner TailAdmin Modal */}
      {isAddPartnerOpen && (
        <AddPartnerModal onClose={() => setIsAddPartnerOpen(false)} />
      )}
    </div>
  );
}

function AddPartnerModal({ onClose }: { onClose: () => void }) {
  const { addPartner } = useProject();
  const [name, setName] = useState('');
  const [type, setType] = useState<Partner['type']>('Arsitek / Konsultan');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [paymentScore, setPaymentScore] = useState<Partner['paymentScore']>('Sangat Baik');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !contactPerson) return;
    addPartner({
      name,
      type,
      contactPerson,
      phone: phone || '0812-XXXX-XXXX',
      email: email || 'contact@partner.com',
      address: address || 'Jakarta, Indonesia',
      paymentScore,
      notes: notes || 'Partner B2B terdaftar di database Sora Project.',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs">
      <form 
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white rounded-md border border-[#E2E8F0] shadow-2xl max-h-[85vh] sm:max-h-[88vh] flex flex-col overflow-hidden my-auto"
      >
        {/* Pinned Modal Header */}
        <div className="px-4 sm:px-6 py-3.5 border-b border-[#E2E8F0] flex items-center justify-between shrink-0 bg-white">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3C50E0]" />
            <h3 className="font-bold text-sm sm:text-base text-[#1C2434]">
              Formulir Partner / Rekanan Baru
            </h3>
          </div>
          <button 
            type="button"
            onClick={onClose} 
            className="text-[#64748B] hover:text-[#1C2434] p-1.5 rounded hover:bg-[#EFF2F7] transition"
            aria-label="Tutup Formulir"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-1 min-h-0 overflow-y-auto modal-scroll p-4 sm:p-6 space-y-3 sm:space-y-4 text-xs overscroll-contain">
          <div>
            <label className="block text-[#1C2434] font-semibold mb-1">Nama Perusahaan / Studio</label>
            <input
              type="text"
              required
              placeholder="Contoh: PT Arkana Design Studio"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="tail-input min-h-[38px]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[#1C2434] font-semibold mb-1">Tipe Partner</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="tail-input min-h-[38px]"
              >
                <option value="Arsitek / Konsultan">Arsitek / Konsultan</option>
                <option value="F&B Holding">F&B Holding</option>
                <option value="Corporate Client">Corporate Client</option>
                <option value="Property Developer">Property Developer</option>
              </select>
            </div>
            <div>
              <label className="block text-[#1C2434] font-semibold mb-1">Skor Pembayaran Termin</label>
              <select
                value={paymentScore}
                onChange={(e) => setPaymentScore(e.target.value as any)}
                className="tail-input min-h-[38px]"
              >
                <option value="Sangat Baik">Sangat Baik (Lancar)</option>
                <option value="Baik">Baik (Sesuai Termin)</option>
                <option value="Perlu Follow-up">Perlu Follow-up</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[#1C2434] font-semibold mb-1">Kontak Person (PIC)</label>
              <input
                type="text"
                required
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                className="tail-input min-h-[38px]"
              />
            </div>
            <div>
              <label className="block text-[#1C2434] font-semibold mb-1">WhatsApp / Telepon</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="tail-input min-h-[38px]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#1C2434] font-semibold mb-1">Alamat Kantor</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="tail-input min-h-[38px]"
            />
          </div>

          <div>
            <label className="block text-[#1C2434] font-semibold mb-1">Catatan Preferensi Desain / Material</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="tail-input"
            />
          </div>
        </div>

        {/* Pinned Modal Footer */}
        <div className="px-4 sm:px-6 py-3 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-end gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="btn-tail-secondary py-2 px-4 text-xs font-semibold"
          >
            Batal
          </button>
          <button
            type="submit"
            className="btn-tail-primary py-2 px-5 text-xs font-semibold shadow-xs"
          >
            Simpan Data Partner
          </button>
        </div>
      </form>
    </div>
  );
}
