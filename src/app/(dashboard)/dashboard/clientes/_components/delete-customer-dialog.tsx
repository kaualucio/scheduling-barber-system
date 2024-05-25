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

interface AddNewBarberDialogProps {
  children: ReactNode,
  customerId: string;
}

export const AddNewBarberDialog = ({ children, customerId }: AddNewBarberDialogProps) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false)

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="md:max-w-[500px] rounded-md">
        <DialogHeader>
          <DialogTitle>Deletetar</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
