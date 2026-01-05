'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Eye, Edit, Trash2 } from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'

export function PenerimaanList() {
  // Mock data
  const penerimaanData = [
    {
      id: '1',
      tanggal: new Date('2024-01-05'),
      nomorSP2D: 'SP2D-001/2024',
      jumlah: 50000000,
      keterangan: 'Penerimaan dana kegiatan operasional',
      sumberDana: 'APBD_MURNI',
      saldoSebelum: 75000000,
      saldoSesudah: 125000000
    },
    {
      id: '2',
      tanggal: new Date('2024-01-03'),
      nomorSP2D: 'SP2D-002/2024',
      jumlah: 25000000,
      keterangan: 'Penerimaan dana pembangunan',
      sumberDana: 'APBD_PERUBAHAN',
      saldoSebelum: 50000000,
      saldoSesudah: 75000000
    },
    {
      id: '3',
      tanggal: new Date('2024-01-01'),
      nomorSP2D: 'SP2D-003/2024',
      jumlah: 100000000,
      keterangan: 'Penerimaan dana awal tahun',
      sumberDana: 'APBD_MURNI',
      saldoSebelum: 0,
      saldoSesudah: 100000000
    }
  ]

  return (
    <Card>
      <CardHeader className="pb-3 sm:pb-6">
        <CardTitle className="text-base sm:text-lg">Riwayat Penerimaan</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {/* Mobile Card Layout */}
        <div className="block sm:hidden space-y-3">
          {penerimaanData.map((item) => (
            <div key={item.id} className="bg-gray-50 rounded-lg p-3 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-sm text-gray-900">{item.nomorSP2D}</p>
                  <p className="text-xs text-gray-500">{formatDate(item.tanggal)}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.sumberDana === 'APBD_MURNI' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-purple-100 text-purple-800'
                }`}>
                  {item.sumberDana === 'APBD_MURNI' ? 'APBD Murni' : 'APBD Perubahan'}
                </span>
              </div>
              
              <p className="text-sm text-gray-700">{item.keterangan}</p>
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-bold text-green-600">
                    {formatCurrency(item.jumlah)}
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
                <th className="text-left py-3 px-2 font-medium text-gray-700 text-sm">No. SP2D</th>
                <th className="text-right py-3 px-2 font-medium text-gray-700 text-sm">Jumlah</th>
                <th className="text-left py-3 px-2 font-medium text-gray-700 text-sm">Sumber Dana</th>
                <th className="text-right py-3 px-2 font-medium text-gray-700 text-sm">Saldo Akhir</th>
                <th className="text-center py-3 px-2 font-medium text-gray-700 text-sm">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {penerimaanData.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-2 text-sm">
                    {formatDate(item.tanggal)}
                  </td>
                  <td className="py-3 px-2 text-sm font-medium">
                    {item.nomorSP2D}
                  </td>
                  <td className="py-3 px-2 text-sm text-right font-semibold text-green-600">
                    {formatCurrency(item.jumlah)}
                  </td>
                  <td className="py-3 px-2 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.sumberDana === 'APBD_MURNI' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {item.sumberDana === 'APBD_MURNI' ? 'APBD Murni' : 'APBD Perubahan'}
                    </span>
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
        
        {penerimaanData.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Belum ada data penerimaan
          </div>
        )}
      </CardContent>
    </Card>
  )
}