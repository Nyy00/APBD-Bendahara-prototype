'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { FileText, Download, Plus, Eye, Send } from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'

export function LaporanSPJ() {
  const [selectedPeriod, setSelectedPeriod] = useState({
    bulan: '',
    tahun: '2024'
  })

  // Mock data
  const spjReports = [
    {
      id: '1',
      periode: 'Februari 2024',
      tanggalBuat: new Date('2024-03-01'),
      totalPenerimaan: 80000000,
      totalPengeluaran: 65000000,
      saldoAkhir: 15000000,
      status: 'DRAFT' as const,
      tanggalSubmit: undefined
    },
    {
      id: '2',
      periode: 'Januari 2024',
      tanggalBuat: new Date('2024-02-01'),
      totalPenerimaan: 75000000,
      totalPengeluaran: 45000000,
      saldoAkhir: 30000000,
      status: 'SUBMITTED' as const,
      tanggalSubmit: new Date('2024-02-05')
    },
    {
      id: '3',
      periode: 'Desember 2023',
      tanggalBuat: new Date('2024-01-02'),
      totalPenerimaan: 100000000,
      totalPengeluaran: 85000000,
      saldoAkhir: 15000000,
      status: 'APPROVED' as const,
      tanggalSubmit: new Date('2024-01-05')
    },
    {
      id: '4',
      periode: 'November 2023',
      tanggalBuat: new Date('2023-12-01'),
      totalPenerimaan: 60000000,
      totalPengeluaran: 55000000,
      saldoAkhir: 5000000,
      status: 'APPROVED' as const,
      tanggalSubmit: new Date('2023-12-05')
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DRAFT':
        return 'bg-gray-100 text-gray-800'
      case 'SUBMITTED':
        return 'bg-yellow-100 text-yellow-800'
      case 'APPROVED':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'DRAFT':
        return 'Draft'
      case 'SUBMITTED':
        return 'Diajukan'
      case 'APPROVED':
        return 'Disetujui'
      default:
        return 'Draft'
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="px-1">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Laporan SPJ</h2>
        <p className="text-sm sm:text-base text-gray-600">Generate dan kelola laporan Surat Pertanggungjawaban</p>
      </div>

      {/* Generate New SPJ */}
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
            <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
            <span>Buat Laporan SPJ Baru</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">
                Bulan
              </label>
              <select
                value={selectedPeriod.bulan}
                onChange={(e) => setSelectedPeriod(prev => ({ ...prev, bulan: e.target.value }))}
                className="flex h-11 sm:h-10 w-full rounded-lg border-2 border-gray-300 bg-white px-3 py-2 text-base sm:text-sm text-gray-900 font-medium focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 touch-manipulation relative z-20"
              >
                <option value="">Pilih Bulan</option>
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
              placeholder="2024"
            />
            
            <Button className="flex items-center justify-center space-x-2 w-full sm:w-auto">
              <FileText className="h-4 w-4" />
              <span>Generate SPJ</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* SPJ Reports List */}
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="text-base sm:text-lg">Riwayat Laporan SPJ</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          {/* Mobile Card Layout */}
          <div className="block sm:hidden space-y-3">
            {spjReports.map((report) => (
              <div key={report.id} className="bg-gray-50 rounded-lg p-3 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-sm text-gray-900">{report.periode}</p>
                    <p className="text-xs text-gray-500">{formatDate(report.tanggalBuat)}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                    {getStatusText(report.status)}
                  </span>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-xs text-gray-500">Penerimaan</p>
                    <p className="text-sm font-semibold text-green-600">
                      {formatCurrency(report.totalPenerimaan)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Pengeluaran</p>
                    <p className="text-sm font-semibold text-red-600">
                      {formatCurrency(report.totalPengeluaran)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Saldo Akhir</p>
                    <p className="text-sm font-semibold text-blue-600">
                      {formatCurrency(report.saldoAkhir)}
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-center space-x-2">
                  <Button variant="ghost" size="sm" className="p-2">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-2">
                    <Download className="h-4 w-4" />
                  </Button>
                  {report.status === 'DRAFT' && (
                    <Button variant="ghost" size="sm" className="p-2">
                      <Send className="h-4 w-4 text-blue-500" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table Layout */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 font-medium text-gray-700 text-sm">Periode</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-700 text-sm">Tanggal Buat</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-700 text-sm">Penerimaan</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-700 text-sm">Pengeluaran</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-700 text-sm">Saldo Akhir</th>
                  <th className="text-center py-3 px-2 font-medium text-gray-700 text-sm">Status</th>
                  <th className="text-center py-3 px-2 font-medium text-gray-700 text-sm">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {spjReports.map((report) => (
                  <tr key={report.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-2 text-sm font-medium">
                      {report.periode}
                    </td>
                    <td className="py-3 px-2 text-sm">
                      {formatDate(report.tanggalBuat)}
                    </td>
                    <td className="py-3 px-2 text-sm text-right font-semibold text-green-600">
                      {formatCurrency(report.totalPenerimaan)}
                    </td>
                    <td className="py-3 px-2 text-sm text-right font-semibold text-red-600">
                      {formatCurrency(report.totalPengeluaran)}
                    </td>
                    <td className="py-3 px-2 text-sm text-right font-semibold text-blue-600">
                      {formatCurrency(report.saldoAkhir)}
                    </td>
                    <td className="py-3 px-2 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                        {getStatusText(report.status)}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex justify-center space-x-1">
                        <Button variant="ghost" size="sm" title="Lihat Detail" className="p-2">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" title="Download PDF" className="p-2">
                          <Download className="h-4 w-4" />
                        </Button>
                        {report.status === 'DRAFT' && (
                          <Button variant="ghost" size="sm" title="Kirim SPJ" className="p-2">
                            <Send className="h-4 w-4 text-blue-500" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* SPJ Template Preview - Hidden on mobile */}
      <Card className="hidden sm:block">
        <CardHeader>
          <CardTitle>Template SPJ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="text-center mb-6">
              <h3 className="text-lg font-bold">SURAT PERTANGGUNGJAWABAN</h3>
              <p className="text-sm text-gray-600">Bendahara Pengeluaran</p>
              <p className="text-sm text-gray-600">Periode: [Bulan Tahun]</p>
            </div>
            
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p><strong>SKPD:</strong> [Nama SKPD]</p>
                  <p><strong>Bendahara:</strong> [Nama Bendahara]</p>
                  <p><strong>NIP:</strong> [NIP Bendahara]</p>
                </div>
                <div>
                  <p><strong>Periode:</strong> [Bulan Tahun]</p>
                  <p><strong>No. Rekening:</strong> [Nomor Rekening]</p>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-2">REKAPITULASI:</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-white p-3 rounded">
                    <p className="text-xs text-gray-600">Total Penerimaan</p>
                    <p className="font-semibold text-green-600">[Jumlah]</p>
                  </div>
                  <div className="bg-white p-3 rounded">
                    <p className="text-xs text-gray-600">Total Pengeluaran</p>
                    <p className="font-semibold text-red-600">[Jumlah]</p>
                  </div>
                  <div className="bg-white p-3 rounded">
                    <p className="text-xs text-gray-600">Saldo Akhir</p>
                    <p className="font-semibold text-blue-600">[Jumlah]</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}