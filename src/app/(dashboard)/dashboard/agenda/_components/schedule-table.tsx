'use client'
import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Barber, Customer, Prisma, Schedule, Service } from '@prisma/client';
import { formatPhoneNumber } from '@/utils/formar-phone-number';
import Image from 'next/image';
import { format, isToday } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/utils/format-price';
import { Actions } from './actions';
import { Button } from '@/components/ui/button';
import { MoreVertical, PlusCircle } from 'lucide-react';
import { ScheduleServiceDialog } from './schedule-service-dialog';
import { Filters } from './filters';

interface ScheduleTableProps {
  data: Prisma.ScheduleGetPayload<{
    include: {
      barber: {
        select: {
          picture: true,
          name: true,
        }
      },
      customer: {
        select: {
          name: true,
          phone_number: true,
        }
      },
    }
  }>[],
}

export const ScheduleTable = ({ data }: ScheduleTableProps) => {

  return (
    <>
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 mb-3">
        <Filters />
        <div className="hidden lg:block">
          <ScheduleServiceDialog>
            <Button className="gap-2 font-semibold md:w-fit w-full">
              <PlusCircle />
              Agendar novo
            </Button>
          </ScheduleServiceDialog>
        </div>
      </div>
      <div className="w-full rounded-md border">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-[150px]">Nome cliente</TableHead>
              <TableHead>Whatsapp</TableHead>
              <TableHead>Barbeiro</TableHead>
              <TableHead>Horário</TableHead>
              <TableHead className="">Serviços</TableHead>
              <TableHead className="">Status</TableHead>
              <TableHead className="">Valor total</TableHead>
              <TableHead className="">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="w-full">
            {
              data.map(item => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium w-fit">{item.customer.name}</TableCell>
                  <TableCell>{formatPhoneNumber(item.customer.phone_number)}</TableCell>
                  <TableCell>
                  <div className="flex items-center md:justify-start justify-center gap-2">
                    <div className="w-8 h-8 rounded-full relative">
                      <Image 
                        src={item.barber.picture}
                        alt={item.barber.name}
                        fill
                        sizes="50vw"
                        className="rounded-full object-cover"
                      />
                    </div>
                    <p className="text-sm md:block hidden">{item.barber.name}</p>
                  </div>
                  </TableCell>
                  <TableCell>
                    {
                      isToday(item.date_time) 
                        ? `Hoje às ${item.time}`
                        : format(item.date_time, 'dd/MM/yyyy HH:mm')
                    }
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {item.services_id.length}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {
                      item.status === "pending" 
                        ? (
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-yellow-600" />
                            Pendente
                          </div>
                        )
                        :  item.status === "completed" 
                        ? (
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-emerald-500" />
                            Finalizado
                          </div>
                        )
                        : (
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-red-500" />
                            Cancelado
                          </div>
                        )
                    }
                  </TableCell>
                  <TableCell>
                    {
                      formatPrice(item.total_value)
                    }
                  </TableCell>
                  <TableCell>
                    <Actions scheduleId={item.id} scheduleStatus={item.status as any}>
                      <Button variant="ghost" size="icon">
                        <MoreVertical />
                      </Button>
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
