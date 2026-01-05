import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 touch-manipulation',
          {
            'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-sm': variant === 'primary',
            'bg-gray-200 text-gray-900 hover:bg-gray-300 active:bg-gray-400': variant === 'secondary',
            'border-2 border-gray-400 bg-white text-gray-800 hover:bg-gray-50 active:bg-gray-100': variant === 'outline',
            'text-gray-800 hover:bg-gray-200 active:bg-gray-300': variant === 'ghost',
            'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-sm': variant === 'danger',
          },
          {
            'h-8 px-3 text-sm min-w-[2rem]': size === 'sm',
            'h-10 px-4 min-w-[2.5rem]': size === 'md',
            'h-12 px-6 text-lg min-w-[3rem]': size === 'lg',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export { Button }