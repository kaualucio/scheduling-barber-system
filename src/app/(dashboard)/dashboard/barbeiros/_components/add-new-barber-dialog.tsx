'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ReactNode, useState } from "react"
import { AddNewBarberForm } from "./add-new-barber-form"

interface AddNewBarberDialogProps {
  children: ReactNode
}

export const AddNewBarberDialog = ({ children }: AddNewBarberDialogProps) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false)

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="md:max-w-[500px] rounded-md">
        <DialogHeader>
          <DialogTitle>Adicionar novo barbeiro</DialogTitle>
        </DialogHeader>
        <AddNewBarberForm />
      </DialogContent>
    </Dialog>
  )
}
