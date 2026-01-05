'use client'

import { 
  Home, 
  TrendingUp, 
  TrendingDown, 
  BookOpen, 
  FileText,
  Menu
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface BottomNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
  onMenuClick: () => void
}

const bottomNavItems = [
  { id: 'dashboard', label: 'Home', icon: Home },
  { id: 'penerimaan', label: 'Terima', icon: TrendingUp },
  { id: 'pengeluaran', label: 'Keluar', icon: TrendingDown },
  { id: 'buku-kas', label: 'Kas', icon: BookOpen },
  { id: 'menu', label: 'Menu', icon: Menu },
]

export function BottomNavigation({ activeTab, onTabChange, onMenuClick }: BottomNavigationProps) {
  const handleItemClick = (itemId: string) => {
    if (itemId === 'menu') {
      onMenuClick()
    } else {
      onTabChange(itemId)
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-300 z-50 safe-area-bottom md:hidden shadow-lg">
      <div className="grid grid-cols-5 h-16">
        {bottomNavItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          
          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={cn(
                'flex flex-col items-center justify-center space-y-1 transition-colors touch-manipulation',
                isActive && item.id !== 'menu'
                  ? 'text-blue-700 bg-blue-100 font-semibold' 
                  : 'text-gray-700 hover:text-gray-900 active:bg-gray-100 font-medium'
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs">{item.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}