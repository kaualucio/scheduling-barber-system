import React from 'react'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { Logo } from '@/components/logo'
import { Navigation } from './navigation'


export const MobileSidebar = () => {
  return (
    <div>
      <div className="block lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="px-0">
            <div className="p-2 py-10 text-center">
              <Logo />
            </div>
            <Navigation />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
