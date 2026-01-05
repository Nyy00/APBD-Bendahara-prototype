'use client'

import { 
  Home, 
  TrendingUp, 
  TrendingDown, 
  BookOpen, 
  FileText, 
  Settings,
  Search,
  Archive,
  AlertTriangle,
  X
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  activeTab: string
  onTabChange: (tab: string) => void
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'penerimaan', label: 'Penerimaan', icon: TrendingUp },
  { id: 'pengeluaran', label: 'Pengeluaran', icon: TrendingDown },
  { id: 'buku-kas', label: 'Buku Kas', icon: BookOpen },
  { id: 'spj', label: 'Laporan SPJ', icon: FileText },
  { id: 'pencarian', label: 'Pencarian', icon: Search },
  { id: 'arsip', label: 'Arsip Digital', icon: Archive },
  { id: 'rekonsiliasi', label: 'Rekonsiliasi', icon: AlertTriangle },
  { id: 'pengaturan', label: 'Pengaturan', icon: Settings },
]

export function Sidebar({ isOpen, onClose, activeTab, onTabChange }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        'fixed left-0 top-0 z-50 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:z-auto',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200 lg:hidden">
          <h2 className="text-lg font-semibold">Menu</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id)
                  onClose()
                }}
                className={cn(
                  'w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors',
                  activeTab === item.id
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-50'
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            )
          })}
        </nav>
      </aside>
    </>
  )
}