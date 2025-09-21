import React from 'react'
import { cn } from '../utils/cn'

interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const Layout = React.forwardRef<HTMLDivElement, LayoutProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('min-h-screen bg-background', className)}
      {...props}
    >
      {children}
    </div>
  )
)
Layout.displayName = 'Layout'

const Container = React.forwardRef<HTMLDivElement, LayoutProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', className)}
      {...props}
    >
      {children}
    </div>
  )
)
Container.displayName = 'Container'

export { Layout, Container }
