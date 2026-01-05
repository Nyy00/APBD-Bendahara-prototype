'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { User, Save, Edit } from 'lucide-react'

export function ProfilBendahara() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    nama: 'Drs. Ahmad Suryadi, M.Si',
    nip: '196512121990031001',
    skpd: 'Dinas Pendidikan Kota Bandung',
    nomorRekening: '1234567890',
    periodeMulai: '2024-01-01',
    periodeSelesai: '2024-12-31',
    jabatan: 'Bendahara Pengeluaran',
    alamat: 'Jl. Merdeka No. 123, Bandung',
    telepon: '022-1234567',
    email: 'ahmad.suryadi@bandung.go.id'
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Profile updated:', formData)
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Profil Bendahara</h2>
        <p className="text-gray-600">Kelola informasi profil dan data bendahara</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Informasi Bendahara</span>
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit className="h-4 w-4 mr-2" />
              {isEditing ? 'Batal' : 'Edit'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Nama Lengkap"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                disabled={!isEditing}
                required
              />
              
              <Input
                label="NIP"
                name="nip"
                value={formData.nip}
                onChange={handleChange}
                disabled={!isEditing}
                required
              />
            </div>

            <Input
              label="SKPD/Unit Kerja"
              name="skpd"
              value={formData.skpd}
              onChange={handleChange}
              disabled={!isEditing}
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Jabatan"
                name="jabatan"
                value={formData.jabatan}
                onChange={handleChange}
                disabled={!isEditing}
                required
              />
              
              <Input
                label="Nomor Rekening"
                name="nomorRekening"
                value={formData.nomorRekening}
                onChange={handleChange}
                disabled={!isEditing}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Periode Tugas Mulai"
                type="date"
                name="periodeMulai"
                value={formData.periodeMulai}
                onChange={handleChange}
                disabled={!isEditing}
                required
              />
              
              <Input
                label="Periode Tugas Selesai"
                type="date"
                name="periodeSelesai"
                value={formData.periodeSelesai}
                onChange={handleChange}
                disabled={!isEditing}
                required
              />
            </div>

            <Input
              label="Alamat"
              name="alamat"
              value={formData.alamat}
              onChange={handleChange}
              disabled={!isEditing}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Telepon"
                name="telepon"
                value={formData.telepon}
                onChange={handleChange}
                disabled={!isEditing}
              />
              
              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            {isEditing && (
              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                >
                  Batal
                </Button>
                <Button type="submit" className="flex items-center space-x-2">
                  <Save className="h-4 w-4" />
                  <span>Simpan Perubahan</span>
                </Button>
              </div>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Data Anggaran */}
      <Card>
        <CardHeader>
          <CardTitle>Data Anggaran</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-600 font-medium">Total Pagu Anggaran</p>
              <p className="text-2xl font-bold text-blue-700">Rp 1.000.000.000</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-600 font-medium">Realisasi</p>
              <p className="text-2xl font-bold text-green-700">Rp 725.000.000</p>
              <p className="text-xs text-green-600">72.5%</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-sm text-yellow-600 font-medium">Sisa Anggaran</p>
              <p className="text-2xl font-bold text-yellow-700">Rp 275.000.000</p>
              <p className="text-xs text-yellow-600">27.5%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}