'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ReactNode, useEffect, useState } from "react"
import { ScheduleForm } from "@/components/schedule-form"
import { Barber, Service } from "@prisma/client";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

interface ScheduleServiceDialogProps {
  children: ReactNode;
}

export const ScheduleServiceDialog = ({children}: ScheduleServiceDialogProps) => {
  const [barbersData, setBarbersData] = useState<Barber[] | null >(null)
  const [servicesData, setServicesData] = useState<Service[] | null>(null)
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const router = useRouter()

  const handleCloseDiolog = () => {
    router.refresh()
    setOpenDialog(false)
  }

  useEffect(() => {
    async function getData() {
      const [{ data: barbersData }, { data: servicesData }] = await Promise.all([
        api.get('/api/root/barber/get-barbers'),
        api.get('/api/services/get')
      ])

      setBarbersData(barbersData)
      setServicesData(servicesData)
    }

    if(!barbersData && !servicesData) { 
      getData()
    }
  }, [barbersData, servicesData])
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="rounded-md">
        <ScheduleForm barbers={barbersData} services={servicesData} handleCloseDialog={handleCloseDiolog} />
      </DialogContent>
    </Dialog>
  )
}
