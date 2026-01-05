'use client'

import { 
  FileText, 
  Search,
  Archive,
  AlertTriangle,
  Settings,
  X,
  User,
  Bell
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface MenuModalProps {
  isOpen: boolean
  onClose: () => void
  activeTab: string
  onTabChange: (tab: string) => void
}

const menuItems = [
  { id: 'spj', label: 'Laporan SPJ', icon: FileText, description: 'Generate laporan SPJ' },
  { id: 'pencarian', label: 'Pencarian', icon: Search, description: 'Cari transaksi' },
  { id: 'arsip', label: 'Arsip Digital', icon: Archive, description: 'Kelola dokumen' },
  { id: 'rekonsiliasi', label: 'Rekonsiliasi', icon: AlertTriangle, description: 'Rekonsiliasi bank' },
  { id: 'pengaturan', label: 'Pengaturan', icon: Settings, description: 'Profil & setting' },
]

const quickActions = [
  { id: 'profile', label: 'Profil', icon: User },
  { id: 'notifications', label: 'Notifikasi', icon: Bell },
]

export function MenuModal({ isOpen, onClose, activeTab, onTabChange }: MenuModalProps) {
  const handleItemClick = (itemId: string) => {
    onTabChange(itemId)
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-x-0 bottom-0 bg-white rounded-t-3xl z-50 md:hidden animate-in slide-in-from-bottom duration-300">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1 bg-gray-300 rounded-full" />
        </div>
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Menu</h2>
            <p className="text-sm text-gray-500">APBD Bendahara</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="p-2">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Aksi Cepat</h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <button
                  key={action.id}
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 active:bg-gray-200 transition-colors touch-manipulation"
                >
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Icon className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">{action.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Menu Items */}
        <div className="px-6 py-4 max-h-96 overflow-y-auto">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Fitur Lainnya</h3>
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.id
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={cn(
                    'w-full flex items-center space-x-4 p-4 rounded-xl transition-colors touch-manipulation text-left',
                    isActive 
                      ? 'bg-blue-50 border border-blue-200' 
                      : 'hover:bg-gray-50 active:bg-gray-100'
                  )}
                >
                  <div className={cn(
                    'p-2 rounded-lg',
                    isActive ? 'bg-blue-100' : 'bg-gray-100'
                  )}>
                    <Icon className={cn(
                      'h-5 w-5',
                      isActive ? 'text-blue-600' : 'text-gray-600'
                    )} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={cn(
                      'font-medium',
                      isActive ? 'text-blue-900' : 'text-gray-900'
                    )}>
                      {item.label}
                    </p>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Safe area for devices with home indicator */}
        <div className="h-6 safe-area-bottom" />
      </div>
    </>
  )
}