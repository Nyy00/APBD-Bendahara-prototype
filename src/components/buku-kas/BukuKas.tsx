'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Calendar, Download, Filter } from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'

export function BukuKas() {
  const [selectedPeriod, setSelectedPeriod] = useState({
    start: '',
    end: ''
  })

  // Mock data
  const bukuKasData = [
    {
      id: '1',
      tanggal: new Date('2024-01-01'),
      keterangan: 'Saldo Awal',
      penerimaan: 0,
      pengeluaran: 0,
      saldo: 100000000,
      jenis: 'SALDO_AWAL' as const
    },
    {
      id: '2',
      tanggal: new Date('2024-01-02'),
      keterangan: 'Penerimaan SP2D-001/2024',
      penerimaan: 50000000,
      pengeluaran: 0,
      saldo: 150000000,
      jenis: 'PENERIMAAN' as const
    },
    {
      id: '3',
      tanggal: new Date('2024-01-03'),
      keterangan: 'Pembayaran ATK Kantor',
      penerimaan: 0,
      pengeluaran: 2500000,
      saldo: 147500000,
      jenis: 'PENGELUARAN' as const
    },
    {
      id: '4',
      tanggal: new Date('2024-01-04'),
      keterangan: 'Pembayaran Honorarium',
      penerimaan: 0,
      pengeluaran: 1500000,
      saldo: 146000000,
      jenis: 'PENGELUARAN' as const
    },
    {
      id: '5',
      tanggal: new Date('2024-01-05'),
      keterangan: 'Penerimaan SP2D-002/2024',
      penerimaan: 25000000,
      pengeluaran: 0,
      saldo: 171000000,
      jenis: 'PENERIMAAN' as const
    }
  ]

  const totalPenerimaan = bukuKasData.reduce((sum, item) => sum + item.penerimaan, 0)
  const totalPengeluaran = bukuKasData.reduce((sum, item) => sum + item.pengeluaran, 0)
  const saldoAkhir = bukuKasData[bukuKasData.length - 1]?.saldo || 0

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="px-1">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Buku Kas Umum</h2>
        <p className="text-sm sm:text-base text-gray-600">Catatan mutasi kas harian bendahara</p>
      </div>

      {/* Filter Period */}
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
            <Filter className="h-4 w-4 sm:h-5 sm:w-5" />
            <span>Filter Periode</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Tanggal Mulai"
                type="date"
                value={selectedPeriod.start}
                onChange={(e) => setSelectedPeriod(prev => ({ ...prev, start: e.target.value }))}
              />
              <Input
                label="Tanggal Selesai"
                type="date"
                value={selectedPeriod.end}
                onChange={(e) => setSelectedPeriod(prev => ({ ...prev, end: e.target.value }))}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline" className="flex items-center justify-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Filter</span>
              </Button>
              <Button variant="outline" className="flex items-center justify-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Total Penerimaan</p>
              <p className="text-xl sm:text-2xl font-bold text-green-600">
                {formatCurrency(totalPenerimaan)}
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Total Pengeluaran</p>
              <p className="text-xl sm:text-2xl font-bold text-red-600">
                {formatCurrency(totalPengeluaran)}
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Saldo Akhir</p>
              <p className="text-xl sm:text-2xl font-bold text-blue-600">
                {formatCurrency(saldoAkhir)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Buku Kas Table/Cards */}
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="text-base sm:text-lg">Mutasi Kas Harian</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          {/* Mobile Card Layout */}
          <div className="block sm:hidden space-y-3">
            {bukuKasData.map((item) => (
              <div key={item.id} className="bg-gray-50 rounded-lg p-3 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm text-gray-900">{item.keterangan}</p>
                    <p className="text-xs text-gray-500">{formatDate(item.tanggal)}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-xs text-gray-500">Penerimaan</p>
                    {item.penerimaan > 0 ? (
                      <p className="text-sm font-semibold text-green-600">
                        {formatCurrency(item.penerimaan)}
                      </p>
                    ) : (
                      <p className="text-sm text-gray-400">-</p>
                    )}
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Pengeluaran</p>
                    {item.pengeluaran > 0 ? (
                      <p className="text-sm font-semibold text-red-600">
                        {formatCurrency(item.pengeluaran)}
                      </p>
                    ) : (
                      <p className="text-sm text-gray-400">-</p>
                    )}
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Saldo</p>
                    <p className="text-sm font-semibold text-blue-600">
                      {formatCurrency(item.saldo)}
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
                  <th className="text-right py-3 px-2 font-medium text-gray-700 text-sm">Penerimaan</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-700 text-sm">Pengeluaran</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-700 text-sm">Saldo</th>
                </tr>
              </thead>
              <tbody>
                {bukuKasData.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-2 text-sm">
                      {formatDate(item.tanggal)}
                    </td>
                    <td className="py-3 px-2 text-sm">
                      {item.keterangan}
                    </td>
                    <td className="py-3 px-2 text-sm text-right">
                      {item.penerimaan > 0 ? (
                        <span className="font-semibold text-green-600">
                          {formatCurrency(item.penerimaan)}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="py-3 px-2 text-sm text-right">
                      {item.pengeluaran > 0 ? (
                        <span className="font-semibold text-red-600">
                          {formatCurrency(item.pengeluaran)}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="py-3 px-2 text-sm text-right font-semibold">
                      {formatCurrency(item.saldo)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-gray-300 bg-gray-50">
                  <td className="py-3 px-2 text-sm font-semibold" colSpan={2}>
                    TOTAL
                  </td>
                  <td className="py-3 px-2 text-sm text-right font-bold text-green-600">
                    {formatCurrency(totalPenerimaan)}
                  </td>
                  <td className="py-3 px-2 text-sm text-right font-bold text-red-600">
                    {formatCurrency(totalPengeluaran)}
                  </td>
                  <td className="py-3 px-2 text-sm text-right font-bold text-blue-600">
                    {formatCurrency(saldoAkhir)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}