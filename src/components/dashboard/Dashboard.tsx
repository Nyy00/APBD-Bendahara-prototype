'use client'

import { Wallet, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react'
import { StatsCard } from './StatsCard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export function Dashboard() {
  // Mock data
  const stats = [
    {
      title: 'Saldo Kas',
      value: 125000000,
      icon: Wallet,
      color: 'blue' as const,
      trend: { value: 5.2, isPositive: true }
    },
    {
      title: 'Total Penerimaan',
      value: 850000000,
      icon: TrendingUp,
      color: 'green' as const,
      trend: { value: 12.5, isPositive: true }
    },
    {
      title: 'Total Pengeluaran',
      value: 725000000,
      icon: TrendingDown,
      color: 'red' as const,
      trend: { value: 8.3, isPositive: false }
    },
    {
      title: 'Sisa Anggaran',
      value: 275000000,
      icon: AlertCircle,
      color: 'yellow' as const,
      trend: { value: 3.1, isPositive: false }
    }
  ]

  const recentTransactions = [
    { id: 1, date: '2024-01-05', description: 'Pembayaran ATK Kantor', amount: -2500000, type: 'pengeluaran' },
    { id: 2, date: '2024-01-04', description: 'Penerimaan SP2D', amount: 50000000, type: 'penerimaan' },
    { id: 3, date: '2024-01-03', description: 'Biaya Perjalanan Dinas', amount: -5000000, type: 'pengeluaran' },
    { id: 4, date: '2024-01-02', description: 'Pembayaran Honorarium', amount: -15000000, type: 'pengeluaran' },
  ]

  const alerts = [
    { id: 1, message: 'SPJ bulan Desember belum diserahkan', type: 'warning' },
    { id: 2, message: 'Saldo kas mendekati batas minimum', type: 'danger' },
    { id: 3, message: 'Backup data berhasil dilakukan', type: 'success' },
  ]

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="px-1">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-sm sm:text-base text-gray-700 font-medium">Ringkasan keuangan dan aktivitas terkini</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Recent Transactions */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base sm:text-lg">Transaksi Terkini</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm sm:text-base truncate">
                      {transaction.description}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500">{transaction.date}</p>
                  </div>
                  <div className="ml-2 flex-shrink-0">
                    <span className={`font-semibold text-sm sm:text-base ${
                      transaction.type === 'penerimaan' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'penerimaan' ? '+' : '-'}
                      {Math.abs(transaction.amount).toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 text-sm">
              Lihat Semua Transaksi
            </Button>
          </CardContent>
        </Card>

        {/* Alerts & Notifications */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base sm:text-lg">Notifikasi & Peringatan</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div key={alert.id} className={`p-2 sm:p-3 rounded-lg border-l-4 ${
                  alert.type === 'warning' ? 'bg-yellow-50 border-yellow-400' :
                  alert.type === 'danger' ? 'bg-red-50 border-red-400' :
                  'bg-green-50 border-green-400'
                }`}>
                  <p className={`text-xs sm:text-sm ${
                    alert.type === 'warning' ? 'text-yellow-800' :
                    alert.type === 'danger' ? 'text-red-800' :
                    'text-green-800'
                  }`}>
                    {alert.message}
                  </p>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 text-sm">
              Lihat Semua Notifikasi
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}