import type { ReactNode } from 'react'

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div lang="en" className="font-sans text-gray-900">
      {children}
    </div>
  )
}
