'use client'

import { cn } from "@/lib/utils"
import { Calendar, Home, PersonStanding, PiggyBank, Star, User, Users } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const links = [
  {
    href: "/dashboard",
    label: "Início",
    Icon: Home
  },
  {
    href: "/dashboard/agenda",
    label: "Agenda",
    Icon: Calendar,
  },
  {
    href: "/dashboard/barbeiros",
    label: "Barbeiros",
    Icon: User,
  },
  {
    href: "/dashboard/clientes",
    label: "Clientes",
    Icon: Users,
  },
  // {
  //   href: "/dashboard/fidelizacao",
  //   label: "Fidelização",
  //   Icon: Star,
  // },
  {
    href: "/dashboard/financeiro",
    label: "Financeiro",
    Icon: PiggyBank,
  },
]

export const Navigation = () => {
  const pathname = usePathname()
  return (
    <nav className="flex flex-col p-2 gap-1">
      {
        links.map(({label, href, Icon}) => (
          <Link 
            key={label} 
            href={href}
            className={cn(
              "w-full p-3 text-md font-bold text-slate-600 flex items-center gap-2 hover:bg-slate-200 hover:text-slate-900 transition-colors duration-150 rounded-sm",
              pathname === href && "bg-slate-200 text-slate-900"
            )}  
          >
            <Icon className="size-5" />
            {
              label
            }
          </Link>
        ))
      }
    </nav>
  )
}
