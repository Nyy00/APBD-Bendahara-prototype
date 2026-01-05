'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Plus, Save, Upload } from 'lucide-react'

export function PengeluaranForm() {
  const [formData, setFormData] = useState({
    tanggal: '',
    penerima: '',
    keperluan: '',
    jumlah: '',
    kodeRekening: '',
    nomorBukti: '',
    sumberDana: 'APBD_MURNI',
    buktiFile: null as File | null
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData(prev => ({
      ...prev,
      buktiFile: file
    }))
  }

  return (
    <Card className="relative z-10">
      <CardHeader className="pb-3 sm:pb-6">
        <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
          <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
          <span>Tambah Pengeluaran Baru</span>
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
              label="Nomor Bukti"
              name="nomorBukti"
              value={formData.nomorBukti}
              onChange={handleChange}
              placeholder="Nomor kuitansi/bukti"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Penerima"
              name="penerima"
              value={formData.penerima}
              onChange={handleChange}
              placeholder="Nama penerima"
              required
            />
            
            <Input
              label="Kode Rekening"
              name="kodeRekening"
              value={formData.kodeRekening}
              onChange={handleChange}
              placeholder="5.1.1.01.01"
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
                className="flex h-10 w-full rounded-lg border-2 border-gray-300 bg-white px-3 py-2 text-sm font-medium focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 relative z-10"
                required
              >
                <option value="APBD_MURNI">APBD Murni</option>
                <option value="APBD_PERUBAHAN">APBD Perubahan</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">
              Keperluan
            </label>
            <textarea
              name="keperluan"
              value={formData.keperluan}
              onChange={handleChange}
              placeholder="Deskripsi keperluan pengeluaran"
              className="flex min-h-[80px] w-full rounded-lg border-2 border-gray-300 bg-white px-3 py-2 text-base sm:text-sm text-gray-900 placeholder:text-gray-500 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 touch-manipulation resize-none font-medium"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">
              Upload Bukti Pengeluaran
            </label>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileChange}
                className="hidden"
                id="bukti-file"
              />
              <label
                htmlFor="bukti-file"
                className="flex items-center justify-center space-x-2 px-4 py-3 sm:py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 w-full sm:w-auto touch-manipulation"
              >
                <Upload className="h-4 w-4" />
                <span className="text-sm">Pilih File</span>
              </label>
              {formData.buktiFile && (
                <span className="text-sm text-gray-600 px-2">
                  {formData.buktiFile.name}
                </span>
              )}
            </div>
          </div>

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