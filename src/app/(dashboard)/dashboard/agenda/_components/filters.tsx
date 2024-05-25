'use client'
import React from 'react'
import queryString from 'query-string';
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"


import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { PlusCircle, Search } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { ScheduleServiceDialog } from './schedule-service-dialog';

const formSchema = z.object({
  name: z.string(),
  phone_number: z.string(),
  status: z.string(),
})
export const Filters = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { handleSubmit, register, control, watch } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone_number: "",
      status: "",
    },
  })
 
  function onSubmit(values: z.infer<typeof formSchema>) {
    const url = queryString.stringifyUrl({
      url: pathname,
      query: {
        name: values.name,
        phone_number: values.phone_number,
        status: values.status !== 'all' ? values.status : null
      }
    }, {
      skipNull: true,
      skipEmptyString: true
    })
  
    router.push(url)
  }
  return (
      <form 
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col lg:flex-row items-start lg:items-center gap-3"
      >
        <div className="w-full flex flex-col md:flex-row flex-wrap gap-3">
            <Input
              {...register('name')}
              className="lg:max-w-[280px]"
              placeholder="Pesquise por nome de cliente ou barbeiro"
            />
            <Input 
              {...register('phone_number')}
              className="lg:max-w-[180px]"
              placeholder="Pesquise por telefone"
            />
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="lg:max-w-[180px]">
                    <SelectValue  placeholder="Filtrar por status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="pending">Pendente</SelectItem>
                    <SelectItem value="completed">Finalizado</SelectItem>
                    <SelectItem value="canceled">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            <Select >
              <SelectTrigger className="lg:w-[180px]">
                <SelectValue  placeholder="Selecione um filtro" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hoje">Hoje</SelectItem>
                <SelectItem value="essa_semana">Essa semana</SelectItem>
                <SelectItem value="essa_mes">Esse mês</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex flex-col md:flex-row gap-3 w-full lg:w-min">
              <Button type="submit" className="h-10 lg:w-fit w-full">
                <Search size={24}/>
              </Button>
              <div className="lg:hidden block w-full">
                <ScheduleServiceDialog>
                  <Button className="gap-2 font-semibold w-full">
                    <PlusCircle />
                    Agendar novo
                  </Button>
                </ScheduleServiceDialog>
              </div>
            </div>
        </div>
      </form>
  )
}
