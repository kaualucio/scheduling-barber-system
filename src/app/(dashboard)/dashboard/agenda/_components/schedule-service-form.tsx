'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Textarea } from "@/components/ui/textarea"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MultiSelect } from "@/components/multi-select"
import validator from "validator"
import { DialogClose } from "@/components/ui/dialog"

const formSchema = z.object({
  name: z.string().min(1, { message: "Campo obrigatório" }),
  phone: z.string().refine((data) => validator.isMobilePhone(data, "pt-BR"), { message: "Número inválido"}),
  barber: z.string().min(1, { message: "Campo obrigatório" }),
  services: z.string().array().min(1, { message: "Mínimo de 1 serviço" }),
  remarks: z.string()
})
export const ScheduleServiceForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      barber: "",
      services: [],
      remarks: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }
  console.log(form.watch('services'))
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <div className="flex items-center gap-3 w-full">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-0 w-full">
                <FormLabel className="font-semibold">Nome</FormLabel>
                <FormControl>
                  <Input className=" w-full" placeholder="Nome do cliente..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="space-y-0 w-full">
                <FormLabel className="font-semibold">Whatsapp</FormLabel>
                <FormControl>
                  <Input placeholder="Whatsapp do cliente..." {...field} />
                  </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="barber"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel className="font-semibold">Barbeiro</FormLabel>
              <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um barbeiro" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem  value="barber-1">Barbeiro 1</SelectItem>
                  <SelectItem value="barber-2">Barbeiro 2</SelectItem>
                  <SelectItem value="barber-3">Barbeiro 3</SelectItem>
                </SelectContent>
              </Select>
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
                  options={[
                    {
                      label: "Serviço 1",
                      value: "servico-1",
                    },
                    {
                      label: "Serviço 2",
                      value: "servico-2",
                    },
                  ]}
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
        <FormField
          control={form.control}
          name="remarks"
          render={({ field }) => (
            <FormItem className="space-y-0 w-full">
              <FormLabel className="font-semibold">Observação</FormLabel>
              <FormControl>
                <Textarea className="w-full h-32 resize-y" placeholder="Nome do cliente..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-end gap-3">
          <DialogClose>
            <Button type="button" variant="outline" className="font-semibold">Cancelar</Button>
          </DialogClose>
          <Button type="submit" className="self-end px-8 font-semibold">Agendar serviço</Button>
        </div>
      </form>
    </Form>
  )
}
