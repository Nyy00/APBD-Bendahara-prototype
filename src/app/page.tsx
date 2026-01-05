'use client'

import { useState } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Sidebar } from '@/components/layout/Sidebar'
import { BottomNavigation } from '@/components/layout/BottomNavigation'
import { MenuModal } from '@/components/layout/MenuModal'
import { Dashboard } from '@/components/dashboard/Dashboard'
import { PenerimaanForm } from '@/components/penerimaan/PenerimaanForm'
import { PenerimaanList } from '@/components/penerimaan/PenerimaanList'
import { PengeluaranForm } from '@/components/pengeluaran/PengeluaranForm'
import { PengeluaranList } from '@/components/pengeluaran/PengeluaranList'
import { BukuKas } from '@/components/buku-kas/BukuKas'
import { LaporanSPJ } from '@/components/spj/LaporanSPJ'
import { ProfilBendahara } from '@/components/pengaturan/ProfilBendahara'
import { PencarianTransaksi } from '@/components/pencarian/PencarianTransaksi'
import { ArsipDigital } from '@/components/arsip/ArsipDigital'
import { Rekonsiliasi } from '@/components/rekonsiliasi/Rekonsiliasi'
import { FloatingActionButton } from '@/components/layout/FloatingActionButton'

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [menuModalOpen, setMenuModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')

  const handleFABAction = () => {
    // Scroll to form section
    const formElement = document.querySelector('form')
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />
      case 'penerimaan':
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="px-1">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Penerimaan</h2>
              <p className="text-sm sm:text-base text-gray-600">Kelola penerimaan dana dari kas daerah</p>
            </div>
            <PenerimaanForm />
            <PenerimaanList />
          </div>
        )
      case 'pengeluaran':
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="px-1">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Pengeluaran</h2>
              <p className="text-sm sm:text-base text-gray-600">Kelola pengeluaran dan pembayaran</p>
            </div>
            <PengeluaranForm />
            <PengeluaranList />
          </div>
        )
      case 'buku-kas':
        return <BukuKas />
      case 'spj':
        return <LaporanSPJ />
      case 'pencarian':
        return <PencarianTransaksi />
      case 'arsip':
        return <ArsipDigital />
      case 'rekonsiliasi':
        return <Rekonsiliasi />
      case 'pengaturan':
        return <ProfilBendahara />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar activeTab={activeTab} />
      
      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        
        <main className="flex-1 p-4 lg:p-6 lg:ml-64">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Mobile Content */}
      <div className="md:hidden">
        <main className="px-4 py-4 pb-20">
          {renderContent()}
        </main>
        
        <FloatingActionButton
          activeTab={activeTab}
          onAction={handleFABAction}
        />
        
        <BottomNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onMenuClick={() => setMenuModalOpen(true)}
        />
        
        <MenuModal
          isOpen={menuModalOpen}
          onClose={() => setMenuModalOpen(false)}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>
    </div>
  )
}