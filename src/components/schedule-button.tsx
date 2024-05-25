'use client'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { useState } from "react";
import { X } from "lucide-react";
import { Barber, Service } from "@prisma/client";
import { ScheduleForm } from "./schedule-form";

interface BarberButtonProps {
  services: Service[]
  barbers: Barber[]
}

export const ScheduleButton = ({ services, barbers }: BarberButtonProps) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false)

  const handleCloseDiolog = () => {
    setOpenDialog(false)
  }

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="w-full rounded-md h-16 px-5 border-2 bg-white border-slate-300 gap-3 text-md hover:scale-105 duration-300 transition-transform">
          Agendar um horário
        </Button>
      </DialogTrigger>
      <DialogContent hideCloseBtn className="w-full max-w-[380px] gap-0">
          <Button onClick={() => setOpenDialog(false)} size="icon" variant="ghost" className="absolute top-4 right-4 rounded-full text-primary hover:bg-transparent hover:text-slate-100">
            <X className="size-5" />
            <span className="sr-only">Fechar</span>
          </Button>
            <ScheduleForm 
              barbers={barbers}
              handleCloseDialog={handleCloseDiolog}
              services={services}
            />
      </DialogContent>
    </Dialog>
  )
}
