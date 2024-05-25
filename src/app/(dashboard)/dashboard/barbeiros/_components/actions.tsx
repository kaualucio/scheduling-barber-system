'use client'
import { api } from "@/lib/api";
import { ReactNode, useState } from "react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast";
import { ConfirmActionDialog } from "@/components/confirm-action-dialog";
import { useRouter } from "next/navigation";
import { Barber } from "@prisma/client";

interface ActionsProps {
  children: ReactNode,
  barber: Barber,
  userSessionRole: "ADMIN" | "REGULAR"
}

export const Actions = ({children, barber, userSessionRole}: ActionsProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleDeleteBarber = async () => {
    try {
      setIsLoading(true)
      const result = await api.delete(`/api/schedule/delete/`)
      toast({
        title: "Sucesso!",
        description: "Barbeiro deletado com sucesso!"
      })
      router.refresh()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro!",
        description: "Ocorreu um erro ao excluir o barbeiro, tente novamente!"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChangerBarberAvailability = async () => {
    try {
      setIsLoading(true)
      const result = await api.patch(`/api/barber/change-availability/${barber.id}`)
      toast({
        title: "Sucesso!",
        description: "A disponibilidade do barbeiro foi alterado com sucesso!"
      })
      router.refresh()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro!",
        description: "Ocorreu um erro ao mudar a disponibilidade do barbeiro, tente novamente!"
      })
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          className="cursor-pointer"
          disabled={isLoading}
          onClick={handleChangerBarberAvailability}
        >
          Mudar Disponibilidade
        </DropdownMenuItem>
        {
          userSessionRole === "ADMIN" && (
            <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer">
              <ConfirmActionDialog 
                isLoading={isLoading}
                handleConfirmAction={handleDeleteBarber}
              >
                <span>Excluir</span>
              </ConfirmActionDialog>
            </DropdownMenuItem>
          )
        }
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
