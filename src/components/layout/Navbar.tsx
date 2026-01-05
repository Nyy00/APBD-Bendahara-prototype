'use client'

import { Bell, User, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface NavbarProps {
  activeTab: string
}

const getPageTitle = (tab: string) => {
  switch (tab) {
    case 'dashboard':
      return 'Dashboard'
    case 'penerimaan':
      return 'Penerimaan'
    case 'pengeluaran':
      return 'Pengeluaran'
    case 'buku-kas':
      return 'Buku Kas'
    case 'spj':
      return 'Laporan SPJ'
    case 'pencarian':
      return 'Pencarian'
    case 'arsip':
      return 'Arsip Digital'
    case 'rekonsiliasi':
      return 'Rekonsiliasi'
    case 'pengaturan':
      return 'Pengaturan'
    default:
      return 'APBD Bendahara'
  }
}

export function Navbar({ activeTab }: NavbarProps) {
  return (
    <nav className="bg-white border-b-2 border-gray-300 px-4 py-3 sticky top-0 z-30 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Left side - Title */}
        <div className="flex items-center space-x-2">
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-900">
              {getPageTitle(activeTab)}
            </h1>
            <p className="text-xs text-gray-700 font-medium md:hidden">
              Dinas Pendidikan Kota Bandung
            </p>
          </div>
        </div>
        
        {/* Right side - Actions */}
        <div className="flex items-center space-x-2">
          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative p-2">
            <Bell className="h-5 w-5 text-gray-700" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
              3
            </span>
          </Button>
          
          {/* Profile */}
          <Button variant="ghost" size="sm" className="flex items-center space-x-2 p-2">
            <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-blue-800" />
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-bold text-gray-900">Ahmad S.</p>
              <p className="text-xs text-gray-700 font-medium">Bendahara</p>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-600 hidden sm:block" />
          </Button>
        </div>
      </div>
    </nav>
  )
}