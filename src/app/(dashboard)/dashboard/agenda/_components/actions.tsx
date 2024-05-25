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

interface ActionsProps {
  children: ReactNode,
  scheduleId: string;
  scheduleStatus: 'pending' | 'completed' | 'canceled';
}

export const Actions = ({children, scheduleId, scheduleStatus}: ActionsProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleDeleteScheduleItem = async () => {
    try {
      setIsLoading(true)
      const result = await api.delete(`/api/schedule/delete/${scheduleId}`)
      toast({
        title: "Sucesso!",
        description: "Item da agenda foi deletado com sucesso!"
      })
      router.refresh()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro!",
        description: "Ocorreu um erro ao excluir o item da agenda, tente novamente!"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCompleteScheduleItem = async () => {
    try {
      setIsLoading(true)
      const result = await api.patch(`/api/schedule/complete/${scheduleId}`)
      toast({
        title: "Sucesso!",
        description: "Item da agenda foi finalizado com sucesso!"
      })
      router.refresh()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro!",
        description: "Ocorreu um erro ao finalizar o item da agenda, tente novamente!"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancelScheduleItem = async () => {
    setIsLoading(true)
    try {
      const result = await api.patch(`/api/schedule/cancel/${scheduleId}`)
      toast({
        title: "Sucesso!",
        description: "Item da agenda foi cancelado com sucesso!"
      })
      router.refresh()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro!",
        description: "Ocorreu um erro ao cancelar o item da agenda, tente novamente!"
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
      <DropdownMenuContent>
        {
          !!(scheduleStatus === 'pending') && (
            <>
              <DropdownMenuItem className="cursor-pointer">Confirmar</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={handleCompleteScheduleItem}>Finalizar</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">Editar</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={handleCancelScheduleItem}>Cancelar</DropdownMenuItem>
            </>
          )
        }
        <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer">
          <ConfirmActionDialog 
            isLoading={isLoading}
            handleConfirmAction={handleDeleteScheduleItem}
          >
            <span>Excluir</span>
          </ConfirmActionDialog>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
