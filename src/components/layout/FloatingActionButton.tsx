'use client'

import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface FloatingActionButtonProps {
  activeTab: string
  onAction: () => void
}

export function FloatingActionButton({ activeTab, onAction }: FloatingActionButtonProps) {
  // Only show FAB on specific tabs
  const showFAB = ['penerimaan', 'pengeluaran'].includes(activeTab)
  
  if (!showFAB) return null

  const getActionText = () => {
    switch (activeTab) {
      case 'penerimaan':
        return 'Tambah Penerimaan'
      case 'pengeluaran':
        return 'Tambah Pengeluaran'
      default:
        return 'Tambah'
    }
  }

  return (
    <div className="fixed bottom-20 right-4 z-40 md:hidden">
      <Button
        onClick={onAction}
        className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-shadow bg-blue-600 hover:bg-blue-700"
        title={getActionText()}
      >
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  )
}