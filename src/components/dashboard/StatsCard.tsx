import { Card, CardContent } from '@/components/ui/Card'
import { formatCurrency } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: number
  icon: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
  color: 'blue' | 'green' | 'red' | 'yellow'
}

export function StatsCard({ title, value, icon: Icon, trend, color }: StatsCardProps) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-700',
    red: 'bg-red-100 text-red-700',
    yellow: 'bg-yellow-100 text-yellow-700',
  }

  return (
    <Card className="h-full">
      <CardContent className="p-3 sm:p-4 lg:p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm font-bold text-gray-800 mb-1">{title}</p>
            <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-1">
              {formatCurrency(value)}
            </p>
            {trend && (
              <p className={`text-xs sm:text-sm font-semibold ${trend.isPositive ? 'text-green-700' : 'text-red-700'}`}>
                {trend.isPositive ? '+' : ''}{trend.value}% dari bulan lalu
              </p>
            )}
          </div>
          <div className={`p-2 sm:p-3 rounded-full flex-shrink-0 ${colorClasses[color]}`}>
            <Icon className="h-4 w-4 sm:h-5 w-5 lg:h-6 lg:w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}