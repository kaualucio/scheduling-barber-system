'use client'
import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Prisma } from '@prisma/client'
import Image from 'next/image'
import { formatPhoneNumber } from '@/utils/formar-phone-number'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MoreVertical, PlusCircle } from 'lucide-react'
import { Actions } from './actions'
import { AddNewBarberDialog } from './add-new-barber-dialog'
import { Session } from 'next-auth'

interface BarberTableProps {
  data: Prisma.BarberGetPayload<{
    include: {
      Schedule: {
        select: {
          status: true 
        }
      }
    }
  }>[],
  session?: Session | null
}

export const BarberTable = ({ data, session }: BarberTableProps) => {
  return (
    <>
    {
      session?.user.role === "ADMIN" && (
        <div className="flex items-center justify-end mb-3">
          <AddNewBarberDialog>
            <Button className="gap-2 font-bold">
              <PlusCircle />
              Novo barbeiro
            </Button>
          </AddNewBarberDialog>
        </div>
      )
    }
      <div className="w-full rounded-md border">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-[300px]">Nome Barbeiro</TableHead>
              <TableHead>Whatsapp</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>Serviços Pendentes</TableHead>
              <TableHead>Disponibilidade</TableHead>
              <TableHead className="">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="w-full">
            {
              data.map(barber => (
                <TableRow key={barber.id}>
                  <TableCell>
                    <div className="flex items-center md:justify-start justify-center gap-2">
                      <div className="w-8 h-8 rounded-full relative">
                        <Image 
                          src={barber.picture}
                          alt={barber.name}
                          fill
                          sizes="50vw"
                          className="rounded-full object-cover"
                        />
                      </div>
                      <p className="text-sm md:block hidden">{barber.name}</p>
                    </div>
                  </TableCell>
                  <TableCell>{formatPhoneNumber(barber.phone!)}</TableCell>
                  <TableCell>{barber.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {
                        barber.Schedule.filter(schedule => schedule.status === "pending").length
                      }
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {
                      barber.available ? (
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-emerald-500" />
                          Disponível
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-red-500" />
                          Indisponível
                        </div>
                      )
                    }
                  </TableCell>
                  <TableCell>
                    <Actions barber={barber} userSessionRole={session!.user.role}>
                      {
                        (session?.user.id === barber.id) || (session?.user.role === "ADMIN") && (
                          <Button variant="ghost" size="icon">
                            <MoreVertical />
                          </Button>
                        ) 
                      }
                    </Actions>
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
