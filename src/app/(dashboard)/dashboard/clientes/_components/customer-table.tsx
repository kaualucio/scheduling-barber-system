'use client'
import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Prisma } from '@prisma/client'
import { formatPhoneNumber } from '@/utils/formar-phone-number'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { format } from 'date-fns'
import { ConfirmActionDialog } from '@/components/confirm-action-dialog'
import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'

interface CustomerTableProps {
  data: Prisma.CustomerGetPayload<{
    include: {
      Schedule: {
        select: {
          date_time: true,
        },
        orderBy: {
          date_time: 'desc'
        }
      }
    }
  }>[];
}

export const CustomerTable = ({ data }: CustomerTableProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleDeleteCustomer = async (customerId: string) => {
    try {
      setIsLoading(true)
      const result = await api.delete(`/api/customer/delete/${customerId}`)
      toast({
        title: "Sucesso!",
        description: "O cliente e suas informações foram deletadas com sucesso!",
        duration: 4000
      })
      router.refresh()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro!",
        description: "Algo deu errado ao deletar o cliente, tente novamente.",
        duration: 4000
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="w-full rounded-md border">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-[300px]">Nome cliente</TableHead>
              <TableHead>Whatsapp</TableHead>
              <TableHead>Total agendamentos</TableHead>
              <TableHead>Último agendamento</TableHead>
              <TableHead>Primeiro agendamento</TableHead>
              <TableHead className="">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="w-full">
            {
              data.map(customer => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <p className="text-sm md:block hidden">{customer.name}</p>
                  </TableCell>
                  <TableCell>{formatPhoneNumber(customer.phone_number)}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                     {customer.Schedule.length}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {
                      !!(customer.Schedule.length) ? format(new Date(customer.Schedule[0].date_time), 'dd/MM/yyyy') : '-'
                    }
                  </TableCell>
                  <TableCell>
                    {
                      !!(customer.Schedule.length) ? format(new Date(customer.Schedule[customer.Schedule.length-1].date_time), 'dd/MM/yyyy') : '-'
                    }
                  </TableCell>
                  <TableCell>
                    <ConfirmActionDialog 
                      handleConfirmAction={() => handleDeleteCustomer(customer.id)}
                      isLoading={isLoading}
                    >
                      <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-800">
                        <Trash2 className="size-5" />
                      </Button>
                    </ConfirmActionDialog>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
        {
          data.length <= 0 && (
            <div className="text-md text-center w-full py-5 text-slate-500">
              Nenhum resultado encontrado
            </div>
          )
        }
      </div>
    </>
  )
}
