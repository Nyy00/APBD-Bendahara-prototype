'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Upload, 
  Download,
  RefreshCw,
  Calculator
} from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'
import { RekonsiliasiBankStatus, MutasiBank } from '@/types'

export function Rekonsiliasi() {
  const [selectedPeriod, setSelectedPeriod] = useState({
    bulan: '01',
    tahun: '2024'
  })

  // Mock data - calculate status dynamically
  const saldoBukuKas = 125000000
  const saldoBank = 123500000
  const selisih = saldoBukuKas - saldoBank
  
  const rekonsiliasi: RekonsiliasiBankStatus = {
    periode: 'Januari 2024',
    tanggalRekonsiliasi: new Date('2024-02-01'),
    saldoBukuKas,
    saldoBank,
    selisih,
    status: selisih === 0 ? 'COCOK' : 'SELISIH',
    keterangan: selisih !== 0 ? 'Terdapat selisih yang perlu disesuaikan' : 'Saldo sudah sesuai'
  }

  const mutasiBank: MutasiBank[] = [
    {
      id: '1',
      tanggal: new Date('2024-01-31'),
      keterangan: 'Biaya Administrasi Bank',
      debet: 15000,
      kredit: 0,
      saldo: 123500000,
      status: 'BELUM_COCOK'
    },
    {
      id: '2',
      tanggal: new Date('2024-01-30'),
      keterangan: 'Transfer Masuk',
      debet: 0,
      kredit: 25000000,
      saldo: 123515000,
      status: 'COCOK'
    },
    {
      id: '3',
      tanggal: new Date('2024-01-29'),
      keterangan: 'Pembayaran ATK',
      debet: 2500000,
      kredit: 0,
      saldo: 98515000,
      status: 'COCOK'
    }
  ]

  const penyesuaian = [
    {
      id: '1',
      keterangan: 'Biaya administrasi bank belum dicatat',
      jumlah: 15000,
      jenis: 'PENGELUARAN' as const,
      status: 'PENDING' as const
    }
  ]

  const getStatusColor = (status: 'COCOK' | 'SELISIH' | 'BELUM_COCOK') => {
    switch (status) {
      case 'COCOK':
        return 'text-green-600'
      case 'SELISIH':
        return 'text-red-600'
      case 'BELUM_COCOK':
        return 'text-yellow-600'
      default:
        return 'text-gray-600'
    }
  }

  const getStatusIcon = (status: 'COCOK' | 'SELISIH' | 'BELUM_COCOK') => {
    switch (status) {
      case 'COCOK':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'SELISIH':
        return <XCircle className="h-4 w-4 text-red-600" />
      case 'BELUM_COCOK':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="px-1">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Rekonsiliasi Bank</h2>
        <p className="text-sm sm:text-base text-gray-600">Pencocokan saldo kas dengan rekening bank</p>
      </div>

      {/* Period Selection */}
      <Card className="relative z-10">
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
            <Calculator className="h-4 w-4 sm:h-5 sm:w-5" />
            <span>Pilih Periode Rekonsiliasi</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4 relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Bulan
                </label>
                <select
                  value={selectedPeriod.bulan}
                  onChange={(e) => setSelectedPeriod(prev => ({ ...prev, bulan: e.target.value }))}
                  className="flex h-10 w-full rounded-lg border-2 border-gray-300 bg-white px-3 py-2 text-sm font-medium focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 relative z-20"
                >
                  <option value="01">Januari</option>
                  <option value="02">Februari</option>
                  <option value="03">Maret</option>
                  <option value="04">April</option>
                  <option value="05">Mei</option>
                  <option value="06">Juni</option>
                  <option value="07">Juli</option>
                  <option value="08">Agustus</option>
                  <option value="09">September</option>
                  <option value="10">Oktober</option>
                  <option value="11">November</option>
                  <option value="12">Desember</option>
                </select>
              </div>
              
              <Input
                label="Tahun"
                type="number"
                value={selectedPeriod.tahun}
                onChange={(e) => setSelectedPeriod(prev => ({ ...prev, tahun: e.target.value }))}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline" className="flex items-center justify-center space-x-2">
                <Upload className="h-4 w-4" />
                <span>Import Mutasi Bank</span>
              </Button>
              
              <Button className="flex items-center justify-center space-x-2">
                <RefreshCw className="h-4 w-4" />
                <span>Proses Rekonsiliasi</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reconciliation Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            {getStatusIcon(rekonsiliasi.status)}
            <span>Hasil Rekonsiliasi - {rekonsiliasi.periode}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
              <p className="text-xs sm:text-sm text-blue-600 font-medium">Saldo Buku Kas</p>
              <p className="text-lg sm:text-2xl font-bold text-blue-700">
                {formatCurrency(rekonsiliasi.saldoBukuKas)}
              </p>
            </div>
            
            <div className="bg-green-50 p-3 sm:p-4 rounded-lg">
              <p className="text-xs sm:text-sm text-green-600 font-medium">Saldo Bank</p>
              <p className="text-lg sm:text-2xl font-bold text-green-700">
                {formatCurrency(rekonsiliasi.saldoBank)}
              </p>
            </div>
            
            <div className={`p-3 sm:p-4 rounded-lg ${
              rekonsiliasi.selisih === 0 ? 'bg-green-50' : 'bg-red-50'
            }`}>
              <p className={`text-xs sm:text-sm font-medium ${
                rekonsiliasi.selisih === 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                Selisih
              </p>
              <p className={`text-lg sm:text-2xl font-bold ${
                rekonsiliasi.selisih === 0 ? 'text-green-700' : 'text-red-700'
              }`}>
                {formatCurrency(Math.abs(rekonsiliasi.selisih))}
              </p>
            </div>
            
            <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
              <p className="text-xs sm:text-sm text-gray-600 font-medium">Status</p>
              <p className={`text-sm sm:text-lg font-bold ${getStatusColor(rekonsiliasi.status)}`}>
                {rekonsiliasi.status === 'COCOK' ? 'Sesuai' : 
                 rekonsiliasi.status === 'SELISIH' ? 'Ada Selisih' : 'Belum Cocok'}
              </p>
            </div>
          </div>
          
          {rekonsiliasi.keterangan && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Catatan:</strong> {rekonsiliasi.keterangan}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bank Mutations */}
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="text-base sm:text-lg">Mutasi Rekening Bank</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          {/* Mobile Card Layout */}
          <div className="block sm:hidden space-y-3">
            {mutasiBank.map((mutasi) => (
              <div key={mutasi.id} className="bg-gray-50 rounded-lg p-3 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-sm text-gray-900">{mutasi.keterangan}</p>
                    <p className="text-xs text-gray-500">{formatDate(mutasi.tanggal)}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(mutasi.status)}
                    <span className={`text-xs font-medium ${getStatusColor(mutasi.status)}`}>
                      {mutasi.status === 'COCOK' ? 'Cocok' : 
                       mutasi.status === 'BELUM_COCOK' ? 'Belum Cocok' : 'Selisih'}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-xs text-gray-500">Debet</p>
                    {mutasi.debet > 0 ? (
                      <p className="text-sm font-semibold text-red-600">
                        {formatCurrency(mutasi.debet)}
                      </p>
                    ) : (
                      <p className="text-sm text-gray-400">-</p>
                    )}
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Kredit</p>
                    {mutasi.kredit > 0 ? (
                      <p className="text-sm font-semibold text-green-600">
                        {formatCurrency(mutasi.kredit)}
                      </p>
                    ) : (
                      <p className="text-sm text-gray-400">-</p>
                    )}
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Saldo</p>
                    <p className="text-sm font-semibold text-blue-600">
                      {formatCurrency(mutasi.saldo)}
                    </p>
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
                  <th className="text-left py-3 px-2 font-medium text-gray-700 text-sm">Keterangan</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-700 text-sm">Debet</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-700 text-sm">Kredit</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-700 text-sm">Saldo</th>
                  <th className="text-center py-3 px-2 font-medium text-gray-700 text-sm">Status</th>
                </tr>
              </thead>
              <tbody>
                {mutasiBank.map((mutasi) => (
                  <tr key={mutasi.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-2 text-sm">
                      {formatDate(mutasi.tanggal)}
                    </td>
                    <td className="py-3 px-2 text-sm font-medium">
                      {mutasi.keterangan}
                    </td>
                    <td className="py-3 px-2 text-sm text-right">
                      {mutasi.debet > 0 ? (
                        <span className="font-semibold text-red-600">
                          {formatCurrency(mutasi.debet)}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="py-3 px-2 text-sm text-right">
                      {mutasi.kredit > 0 ? (
                        <span className="font-semibold text-green-600">
                          {formatCurrency(mutasi.kredit)}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="py-3 px-2 text-sm text-right font-semibold">
                      {formatCurrency(mutasi.saldo)}
                    </td>
                    <td className="py-3 px-2 text-center">
                      <div className="flex items-center justify-center space-x-1">
                        {getStatusIcon(mutasi.status)}
                        <span className={`text-xs font-medium ${getStatusColor(mutasi.status)}`}>
                          {mutasi.status === 'COCOK' ? 'Cocok' : 
                           mutasi.status === 'BELUM_COCOK' ? 'Belum Cocok' : 'Selisih'}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Adjustments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5" />
            <span>Jurnal Penyesuaian</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {penyesuaian.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{item.keterangan}</p>
                  <p className="text-sm text-gray-500">
                    {item.jenis === 'PENGELUARAN' ? 'Pengeluaran' : 'Penerimaan'}: {formatCurrency(item.jumlah)}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {item.status === 'PENDING' ? 'Pending' : 'Selesai'}
                  </span>
                  <Button size="sm" variant="outline">
                    Proses
                  </Button>
                </div>
              </div>
            ))}
            
            {penyesuaian.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Tidak ada jurnal penyesuaian yang diperlukan
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button variant="outline" className="flex items-center space-x-2">
          <Download className="h-4 w-4" />
          <span>Export Laporan Rekonsiliasi</span>
        </Button>
        <Button variant="outline" className="flex items-center space-x-2">
          <Upload className="h-4 w-4" />
          <span>Import Template Excel</span>
        </Button>
        <Button className="flex items-center space-x-2">
          <CheckCircle className="h-4 w-4" />
          <span>Finalisasi Rekonsiliasi</span>
        </Button>
      </div>
    </div>
  )
}