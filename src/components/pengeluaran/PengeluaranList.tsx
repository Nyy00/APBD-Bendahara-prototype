'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Eye, Edit, Trash2, FileText } from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'

export function PengeluaranList() {
  // Mock data
  const pengeluaranData = [
    {
      id: '1',
      tanggal: new Date('2024-01-05'),
      penerima: 'CV. Maju Jaya',
      keperluan: 'Pembelian ATK Kantor',
      jumlah: 2500000,
      kodeRekening: '5.1.1.01.01',
      nomorBukti: 'KWT-001/2024',
      hasBukti: true,
      saldoSebelum: 127500000,
      saldoSesudah: 125000000
    },
    {
      id: '2',
      tanggal: new Date('2024-01-04'),
      penerima: 'PT. Teknologi Maju',
      keperluan: 'Maintenance Server',
      jumlah: 5000000,
      kodeRekening: '5.1.2.03.01',
      nomorBukti: 'KWT-002/2024',
      hasBukti: true,
      saldoSebelum: 132500000,
      saldoSesudah: 127500000
    },
    {
      id: '3',
      tanggal: new Date('2024-01-03'),
      penerima: 'Drs. Ahmad Suryadi',
      keperluan: 'Honorarium Narasumber',
      jumlah: 1500000,
      kodeRekening: '5.1.1.02.02',
      nomorBukti: 'KWT-003/2024',
      hasBukti: false,
      saldoSebelum: 134000000,
      saldoSesudah: 132500000
    }
  ]

  return (
    <Card>
      <CardHeader className="pb-3 sm:pb-6">
        <CardTitle className="text-base sm:text-lg">Riwayat Pengeluaran</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {/* Mobile Card Layout */}
        <div className="block sm:hidden space-y-3">
          {pengeluaranData.map((item) => (
            <div key={item.id} className="bg-gray-50 rounded-lg p-3 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-sm text-gray-900">{item.nomorBukti}</p>
                  <p className="text-xs text-gray-500">{formatDate(item.tanggal)}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {item.kodeRekening}
                  </span>
                  {item.hasBukti ? (
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <FileText className="h-3 w-3 text-green-600" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-xs text-red-600">!</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-900">{item.penerima}</p>
                <p className="text-sm text-gray-700">{item.keperluan}</p>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-bold text-red-600">
                    -{formatCurrency(item.jumlah)}
                  </p>
                  <p className="text-xs text-gray-500">
                    Saldo: {formatCurrency(item.saldoSesudah)}
                  </p>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm" className="p-2">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-2">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-2">
                    <Trash2 className="h-4 w-4 text-red-500" />
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
                <th className="text-left py-3 px-2 font-medium text-gray-700 text-sm">No. Bukti</th>
                <th className="text-left py-3 px-2 font-medium text-gray-700 text-sm">Penerima</th>
                <th className="text-right py-3 px-2 font-medium text-gray-700 text-sm">Jumlah</th>
                <th className="text-left py-3 px-2 font-medium text-gray-700 text-sm">Kode Rek</th>
                <th className="text-center py-3 px-2 font-medium text-gray-700 text-sm">Bukti</th>
                <th className="text-right py-3 px-2 font-medium text-gray-700 text-sm">Saldo Akhir</th>
                <th className="text-center py-3 px-2 font-medium text-gray-700 text-sm">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {pengeluaranData.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-2 text-sm">
                    {formatDate(item.tanggal)}
                  </td>
                  <td className="py-3 px-2 text-sm font-medium">
                    {item.nomorBukti}
                  </td>
                  <td className="py-3 px-2 text-sm">
                    <div>
                      <p className="font-medium text-gray-900">{item.penerima}</p>
                      <p className="text-xs text-gray-500 max-w-xs truncate" title={item.keperluan}>
                        {item.keperluan}
                      </p>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-sm text-right font-semibold text-red-600">
                    -{formatCurrency(item.jumlah)}
                  </td>
                  <td className="py-3 px-2 text-sm">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {item.kodeRekening}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-center">
                    {item.hasBukti ? (
                      <Button variant="ghost" size="sm" className="text-green-600 p-2">
                        <FileText className="h-4 w-4" />
                      </Button>
                    ) : (
                      <span className="text-red-500 text-xs font-medium">Tidak ada</span>
                    )}
                  </td>
                  <td className="py-3 px-2 text-sm text-right font-medium">
                    {formatCurrency(item.saldoSesudah)}
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex justify-center space-x-1">
                      <Button variant="ghost" size="sm" className="p-2">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="p-2">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="p-2">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {pengeluaranData.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Belum ada data pengeluaran
          </div>
        )}
      </CardContent>
    </Card>
  )
}