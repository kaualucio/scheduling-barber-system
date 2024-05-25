import { Logo } from '@/components/logo'
import React from 'react'
import { Navigation } from './navigation'

export const Sidebar = () => {
  return (
    <aside className="hidden lg:block w-full max-w-[230px] h-full border-r">
      <div className="p-2 py-10 text-center">
        <Logo />
      </div>
      <Navigation />
    </aside>
  )
}
