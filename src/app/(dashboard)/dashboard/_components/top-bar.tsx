import React from 'react'
import { MobileSidebar } from './mobile-sidebar'
import { Profile } from './profile'
import { OpenBarberShop } from './open-barber-shop'
import { getServerSession } from 'next-auth'
import { nextAuthOptions } from '@/lib/auth-config'
import { db } from '@/lib/db'

export const TopBar = async () => {
  const session = await getServerSession(nextAuthOptions)
  const barberShop = await db.barberShop.findUnique({
    where: {
      id: '6651e4e1dabe3cd796c7acbf'
    }
  })
  return (
    <div className="w-full h-16 flex items-center justify-between gap-5 border-b px-3 ">
      <MobileSidebar />
      <div className="flex items-center gap-10">
        <OpenBarberShop isOpen={barberShop?.isOpen} />
        <Profile session={session} />
      </div>
    </div>
  )
}
