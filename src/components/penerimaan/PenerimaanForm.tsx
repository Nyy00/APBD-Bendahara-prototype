'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Plus, Save } from 'lucide-react'

export function PenerimaanForm() {
  const [formData, setFormData] = useState({
    tanggal: '',
    nomorSP2D: '',
    jumlah: '',
    keterangan: '',
    sumberDana: 'APBD_MURNI'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <Card className="relative z-10">
      <CardHeader className="pb-3 sm:pb-6">
        <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
          <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
          <span>Tambah Penerimaan Baru</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Tanggal"
              type="date"
              name="tanggal"
              value={formData.tanggal}
              onChange={handleChange}
              required
            />
            
            <Input
              label="Nomor SP2D"
              name="nomorSP2D"
              value={formData.nomorSP2D}
              onChange={handleChange}
              placeholder="Masukkan nomor SP2D"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Jumlah (Rp)"
              type="number"
              name="jumlah"
              value={formData.jumlah}
              onChange={handleChange}
              placeholder="0"
              required
            />
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Sumber Dana
              </label>
              <select
                name="sumberDana"
                value={formData.sumberDana}
                onChange={handleChange}
                className="flex h-10 w-full rounded-lg border-2 border-gray-300 bg-white px-3 py-2 text-sm font-medium focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 relative z-20"
              >
                <option value="APBD_MURNI">APBD Murni</option>
                <option value="APBD_PERUBAHAN">APBD Perubahan</option>
              </select>
            </div>
          </div>

          <Input
            label="Keterangan"
            name="keterangan"
            value={formData.keterangan}
            onChange={handleChange}
            placeholder="Keterangan penerimaan"
          />

          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 pt-2">
            <Button type="button" variant="outline" className="w-full sm:w-auto">
              Batal
            </Button>
            <Button type="submit" className="flex items-center justify-center space-x-2 w-full sm:w-auto">
              <Save className="h-4 w-4" />
              <span>Simpan</span>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}