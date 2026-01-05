'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Search, Filter, Download, Eye, Calendar } from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'

export function PencarianTransaksi() {
  const [searchParams, setSearchParams] = useState({
    keyword: '',
    tanggalMulai: '',
    tanggalSelesai: '',
    jenis: 'semua',
    kodeRekening: '',
    jumlahMin: '',
    jumlahMax: ''
  })

  // Mock search results
  const searchResults = [
    {
      id: '1',
      tanggal: new Date('2024-01-05'),
      jenis: 'pengeluaran',
      keterangan: 'Pembayaran ATK Kantor',
      penerima: 'CV. Maju Jaya',
      jumlah: -2500000,
      kodeRekening: '5.1.1.01.01',
      nomorBukti: 'KWT-001/2024'
    },
    {
      id: '2',
      tanggal: new Date('2024-01-04'),
      jenis: 'penerimaan',
      keterangan: 'Penerimaan SP2D-001/2024',
      penerima: 'Kas Daerah',
      jumlah: 50000000,
      kodeRekening: '-',
      nomorBukti: 'SP2D-001/2024'
    },
    {
      id: '3',
      tanggal: new Date('2024-01-03'),
      jenis: 'pengeluaran',
      keterangan: 'Biaya Perjalanan Dinas',
      penerima: 'Drs. Ahmad Suryadi',
      jumlah: -5000000,
      kodeRekening: '5.1.2.05.01',
      nomorBukti: 'KWT-002/2024'
    }
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Search params:', searchParams)
    // Implement search logic
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSearchParams(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const resetFilters = () => {
    setSearchParams({
      keyword: '',
      tanggalMulai: '',
      tanggalSelesai: '',
      jenis: 'semua',
      kodeRekening: '',
      jumlahMin: '',
      jumlahMax: ''
    })
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="px-1">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Pencarian Transaksi</h2>
        <p className="text-sm sm:text-base text-gray-600">Cari dan filter transaksi berdasarkan kriteria tertentu</p>
      </div>

      {/* Search Form */}
      <Card className="relative z-10">
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
            <Search className="h-4 w-4 sm:h-5 sm:w-5" />
            <span>Filter Pencarian</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <form onSubmit={handleSearch} className="space-y-4 relative z-10">
            {/* Keyword Search */}
            <Input
              label="Kata Kunci"
              name="keyword"
              value={searchParams.keyword}
              onChange={handleChange}
              placeholder="Cari berdasarkan keterangan, penerima, atau nomor bukti..."
            />

            {/* Date Range */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Tanggal Mulai"
                type="date"
                name="tanggalMulai"
                value={searchParams.tanggalMulai}
                onChange={handleChange}
              />
              <Input
                label="Tanggal Selesai"
                type="date"
                name="tanggalSelesai"
                value={searchParams.tanggalSelesai}
                onChange={handleChange}
              />
            </div>

            {/* Transaction Type and Account Code */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Jenis Transaksi
                </label>
                <select
                  name="jenis"
                  value={searchParams.jenis}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-lg border-2 border-gray-300 bg-white px-3 py-2 text-sm font-medium focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 relative z-20"
                >
                  <option value="semua">Semua Transaksi</option>
                  <option value="penerimaan">Penerimaan</option>
                  <option value="pengeluaran">Pengeluaran</option>
                </select>
              </div>
              
              <Input
                label="Kode Rekening"
                name="kodeRekening"
                value={searchParams.kodeRekening}
                onChange={handleChange}
                placeholder="5.1.1.01.01"
              />
            </div>

            {/* Amount Range */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Jumlah Minimum (Rp)"
                type="number"
                name="jumlahMin"
                value={searchParams.jumlahMin}
                onChange={handleChange}
                placeholder="0"
              />
              <Input
                label="Jumlah Maksimum (Rp)"
                type="number"
                name="jumlahMax"
                value={searchParams.jumlahMax}
                onChange={handleChange}
                placeholder="0"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2">
              <Button type="submit" className="flex items-center justify-center space-x-2">
                <Search className="h-4 w-4" />
                <span>Cari Transaksi</span>
              </Button>
              <Button type="button" variant="outline" onClick={resetFilters}>
                Reset Filter
              </Button>
              <Button type="button" variant="outline" className="flex items-center justify-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Export Hasil</span>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Search Results */}
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base sm:text-lg">Hasil Pencarian</CardTitle>
            <span className="text-sm text-gray-500 font-medium">
              {searchResults.length} transaksi ditemukan
            </span>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {/* Mobile Card Layout */}
          <div className="block sm:hidden space-y-3">
            {searchResults.map((item) => (
              <div key={item.id} className="bg-gray-50 rounded-lg p-3 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-sm text-gray-900">{item.penerima}</p>
                    <p className="text-xs text-gray-500">{formatDate(item.tanggal)}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.jenis === 'penerimaan' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {item.jenis === 'penerimaan' ? 'Penerimaan' : 'Pengeluaran'}
                  </span>
                </div>
                
                <p className="text-sm text-gray-700">{item.keterangan}</p>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className={`text-lg font-bold ${item.jumlah > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(Math.abs(item.jumlah))}
                    </p>
                    <p className="text-xs text-gray-500">
                      Kode: {item.kodeRekening}
                    </p>
                  </div>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm" className="p-2">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table Layout */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 font-medium text-gray-700 text-sm">Tanggal</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-700 text-sm">Jenis</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-700 text-sm">Keterangan</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-700 text-sm">Penerima/Sumber</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-700 text-sm">Jumlah</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-700 text-sm">Kode Rek</th>
                  <th className="text-center py-3 px-2 font-medium text-gray-700 text-sm">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-2 text-sm">
                      {formatDate(item.tanggal)}
                    </td>
                    <td className="py-3 px-2 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.jenis === 'penerimaan' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {item.jenis === 'penerimaan' ? 'Penerimaan' : 'Pengeluaran'}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-sm">
                      <div className="max-w-xs truncate" title={item.keterangan}>
                        {item.keterangan}
                      </div>
                    </td>
                    <td className="py-3 px-2 text-sm font-medium">
                      {item.penerima}
                    </td>
                    <td className="py-3 px-2 text-sm text-right font-semibold">
                      <span className={item.jumlah > 0 ? 'text-green-600' : 'text-red-600'}>
                        {formatCurrency(Math.abs(item.jumlah))}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-sm">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {item.kodeRekening}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex justify-center">
                        <Button variant="ghost" size="sm" className="p-2">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {searchResults.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Tidak ada transaksi yang ditemukan
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Filters */}
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
            <Filter className="h-4 w-4 sm:h-5 sm:w-5" />
            <span>Filter Cepat</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            <Button variant="outline" size="sm" className="flex items-center justify-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Hari Ini</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center justify-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Minggu Ini</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center justify-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Bulan Ini</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center justify-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Tahun Ini</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}