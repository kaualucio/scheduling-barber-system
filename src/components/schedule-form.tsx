'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import validator from "validator"
import { Barber, Service } from "@prisma/client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { DialogClose } from "./ui/dialog"
import { MultiSelect } from "./multi-select"
import { api } from "@/lib/api"
import { useToast } from "./ui/use-toast"
import { useEffect, useMemo, useState } from "react"
import { eachDayOfInterval, isBefore, lastDayOfMonth } from "date-fns"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"
import { getAvailableDays } from "@/utils/get-available-days"
import { formatPrice } from "@/utils/format-price"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Image from "next/image"
interface ScheduleFormProps {
  services: Service[] | null;
  barbers: Barber[] | null;
  handleCloseDialog: () => void;
}

function getCurrentMonthDays() {
  const dataAtual = new Date();
  const ultimoDiaDoMes = lastDayOfMonth(dataAtual);
  const diasDoMes = eachDayOfInterval({ start: new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 1), end: ultimoDiaDoMes });

  return diasDoMes;
}

const formSchema = z.object({
  date: z.string(),
  time: z.string(),
  name: z.string().min(1, { message: "Campo obrigatório" }),
  phone: z.string().refine((data) => validator.isMobilePhone(data, "pt-BR"), { message: "Número inválido"}),
  barber: z.string().min(1, { message: "Campo obrigatório" }),
  total_price: z.number(),
  services: z.string().array().min(1, { message: "Mínimo de 1 serviço" }),
}).refine((data) => {
  const [hours, minutes] = data.time.split(":")
  let date = new Date()
  date.setDate(Number(data.date))
  date.setHours(Number(hours))
  date.setMinutes(Number(minutes))
  return !isBefore(date, new Date())
}, { 
  message: "O horário não pode ser antes do horário atual.", 
  path: ['time'] 
})

export const ScheduleForm = ({ services, barbers, handleCloseDialog}: ScheduleFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: "",
      time: "",
      barber: "",
      name: "",
      phone: "",
      total_price: 0,
      services: [],
    },
  })

  const [isFirstTime, setIsFirstTime] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [timetable, setTimetable] = useState<any[]>([])
  const { toast } = useToast()
  
  const currentMonthDays = getCurrentMonthDays()
  
  
  // Get the total price based on the chosen services
  let chosenServices = form.watch('services')
  useEffect(() => {
    if(!!chosenServices.length) {
      let totalPrice = 0
      
      chosenServices.map(serviceId => totalPrice += services!.find(service => service.id === serviceId)!.price)
      form.setValue('total_price', totalPrice)
    } else {
      console.log('else')
      form.setValue('total_price', 0)
    }
  }, [form, chosenServices, services])
  
  // Return a list of timetable available for the day and for the barber
  let date = form.watch('date')
  useEffect(() => {
    if(!!date) {
      let barberId = form.watch('barber')
      setIsLoading(true)
      api.get(`/api/root/schedule/${barberId}/schedule/${date}`)
      .then(res => setTimetable(getAvailableDays(res.data)))
      .catch(error => console.log(error))
      .finally(() => setIsLoading(false))
    }
  }, [form, date])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {

      const result = await api.post('/api/schedule/add', {
        ...values
      })
      toast({
        duration: 4000,
        title: `Agendado para o dia ${String(form.watch('date')).padStart(2, '0')} de ${new Date().toLocaleString('default', { month: 'long' })} às ${form.watch('time')}`,
        description: `Enviaremos uma mensagem confirmando o agendamento assim que possível ;).`
      })
      form.reset()
      handleCloseDialog()
    } catch (error) {
      console.log(error)
      toast({
        variant: "destructive",
        title: "Algo deu errado :(",
        description: `Algo deu errado ao realizar seu agendamento, tente novamente ou entre em contato pelo whatsapp. `
      })
    }
  }

  return (
    <div className="p-1 rounded-b-md w-full overflow-hidden" >
      <h2 className="font-bold text-2xl text-primary mb-8">Novo Agendamento</h2>
      <div className="w-full flex flex-col gap-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 w-full">
            <FormField
              control={form.control}
              name="barber"
              render={({ field }) => (
                <FormItem className="space-y-1 w-full">
                  <FormLabel className="font-bold text-md">Escolha o Barbeiro</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Escolha um barbeiro" />
                      </SelectTrigger>
                      <SelectContent>
                        {
                          barbers?.map(barber => (
                            <SelectItem key={barber.id} value={barber.id}>
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full relative">
                                  <Image 
                                    src={barber.picture}
                                    alt={barber.name}
                                    fill
                                    className="object-cover rounded-full"
                                  />
                                </div>
                                <p className="text-md">{barber.name}</p>
                              </div>
                            </SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {
              !!form.watch('barber') && (
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="space-y-1 w-full">
                      <FormLabel className="font-bold text-md">Escolha um dia</FormLabel>
                      <FormControl>
                        
                            <div className=" py-1 flex items-center gap-2 overflow-x-auto">
                              {
                                currentMonthDays.map(item => {

                                if(isBefore(item.getDate(), new Date().getDate())) return

                                return (
                                  <Button 
                                    type="button"
                                    key={item.getDate()} 
                                    onClick={() =>  field.onChange(String(item.getDate()))}
                                    className={cn(
                                      "px-5 ring-1",
                                      Number(form.watch('date')) === item.getDate() && "bg-emerald-500 hover:bg-emerald-500"
                                    )}
                                  >
                                    {item.getDate() === new Date().getDate() ? 'Hoje' : item.getDate()}
                                  </Button>
                                )
                                })
                              }
                            </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )
            }
            {
              !!form.watch('date') && (
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem className="space-y-1 w-full">
                      <FormLabel className="font-bold text-md">Horários disponíveis</FormLabel>
                      <FormControl>
                            <div className="w-full py-1 flex items-center gap-2 overflow-x-auto">
                              {
                                isLoading && (
                                  <div className="w-full flex items-center justify-center overflow-hidden">
                                    <Loader2 className="animate-spin" />
                                  </div>
                                )
                              }
                              {
                                timetable.map((timetable, index) => (
                                  <Button 
                                    type="button"
                                    key={`${timetable}${index}`} 
                                    onClick={() => field.onChange(timetable)}
                                    className={cn(
                                      "ring-1",
                                      form.watch('time') === timetable && "bg-emerald-500 hover:bg-emerald-500"
                                    )}
                                  >
                                    {timetable}
                                  </Button>
                                ))
                              }
                            </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )
            }
            {
              !!(form.watch('time')) && (
                <div className="">
                  <div className="mb-5">
                    <h2 className="font-bold text-md">Preencha os campos abaixo:</h2>
                    {
                      isFirstTime ? (
                      <p className="text-zinc-400 text-sm">Não é a primeira vez fazendo o agendamento? 
                        <button 
                        onClick={() => setIsFirstTime(false)} 
                        type="button" 
                        className="ml-1 text-blue-500 underline">
                          Clique aqui
                        </button>
                      </p>
                      ) : (
                        <p className="text-zinc-400 text-sm">É a primeira vez fazendo o agendamento? 
                          <button 
                          onClick={() => setIsFirstTime(true)} 
                          type="button" 
                          className="ml-1 text-blue-500 underline">
                            Clique aqui
                          </button>
                        </p>
                      )
                    }
                  </div>
                  <div className="space-y-3">
                    {
                      isFirstTime && (
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem className="space-y-1 w-full">
                              <FormLabel className="font-bold text-sm">Seu nome</FormLabel>
                              <FormControl>
                                <Input placeholder="Digite seu nome" { ...field }/>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )
                    }
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem className="space-y-1 w-full">
                          <FormLabel className="font-bold text-sm">Seu telefone</FormLabel>
                          <FormControl>
                            <Input placeholder="Digite seu telefone" {...field}/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="services"
                      render={({ field }) => (
                        <FormItem className="space-y-0">
                          <FormLabel className="font-semibold">Serviço</FormLabel>
                          <FormControl>
                            <MultiSelect 
                              options={services?.map((item) => ({ label: `${item.name} - ${formatPrice(item.price)}`, value: item.id })) || []}
                              multiple
                              clearable
                              onValueChange={field.onChange}
                              value={field.value}
                            />
                            </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex flex-col gap-3">
                      <Button className="w-full" disabled={isLoading}>
                        Agendar agora - {formatPrice(form.watch('total_price'))}
                      </Button>
                      <DialogClose disabled={isLoading} className="w-full h-10 px-3 py-2 rounded-md border border-zinc-300 bg-zinc-100 text-zinc-500">
                        Cancelar
                      </DialogClose>
                    </div>
                  </div>
                </div>
              )
            }
          </form>
        </Form>
      </div>
    </div>
  )
}
