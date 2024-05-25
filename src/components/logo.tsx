import Link from 'next/link'
import React from 'react'

export const Logo = () => {
  return (
    <Link href="/dashboard" className="text-xl text-primary font-black text-center">
      Nome da barbearia
    </Link>
  )
}
