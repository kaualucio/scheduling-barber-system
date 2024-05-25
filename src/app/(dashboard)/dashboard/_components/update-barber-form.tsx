'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ImageIcon } from "lucide-react"
import { useEdgeStore } from "@/lib/edgestore"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { api } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { Barber } from "@prisma/client"
import { User } from "next-auth"
import { useSession } from "next-auth/react"
import Image from "next/image"

interface UpdateBarberFormProps {
  barber: User
}

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Campo obrigatório.",
  }),
  phone: z.string().min(1, {
    message: "Campo obrigatório.",
  }),
  email: z.string().min(1, {
    message: "Campo obrigatório.",
  }),
  picture: z.string(),
})

export const UpdateBarberForm = ({ barber }: UpdateBarberFormProps) => {
  const session = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const { edgestore } = useEdgeStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: barber.name!,
      phone: barber.phone!,
      email: barber.email!,
      picture: barber.image!,
    },
  })
 
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true)
      const result = await api.patch('/api/barber/update', {
        ...values
      })
      await session.update({
        ...session.data,
        user: {
          ...session.data?.user,
          ...values
        }
      })
      toast({
        title: "Sucesso!",
        description: "Seus dados foram atualizados com sucesso!",
        duration: 4000
      })
      router.refresh()
    } catch (error) {
      console.log(error)
      toast({
        variant: "destructive",
        title: "Erro!",
        description: "Algo deu errado ao atualizar seus dados, tente novamente.",
        duration: 4000
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 space-y-3">
        <div className="flex flex-col md:flex-row items-center gap-5 w-full">
          <div className="w-40 h-40 rounded-full shadow relative group flex items-center justify-center bg-slate-200">
            {
              !!(form.watch('picture')) ? (
                <Image 
                  src={form.watch('picture')}
                  alt="picturem do barbeiro"
                  fill
                  className="object-cover rounded-full"
                />
              ) : (
                <div>
                  <ImageIcon />
                </div>
              )
            }
            <label htmlFor="picture" className={cn(
              "absolute top-0 left-0 w-full h-full z-50 bg-slate-200 text-white hidden group-hover:flex items-center justify-center rounded-full hover:bg-slate-500/40 cursor-pointer",
            )}>
              <p>Buscar imagem</p>
            </label>
            <input 
              type="file" 
              className="hidden"
              name="picture"
              id="picture"
              onChange={async (e) => {
                let file = e.target.files?.[0]
                if(file) {
                  const res = await edgestore.publicFiles.upload({
                    file,
                    options: {
                      replaceTargetUrl: form.watch('picture')
                    },
                    // onProgressChange: (progress) => {
                    //   setProgress(progress)

                    //   if(progress === 100) setProgress(null)
                    // },
                  });

                  form.setValue('picture', res.url)
                }
              }}
            />
          </div>
          <div className="w-full md:w-[calc(100%-160px)] flex flex-col gap-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full space-y-1">
                  <FormLabel className="font-bold">Nome</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Digite o nome do barbeiro" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="w-full space-y-1">
                  <FormLabel className="font-bold">Telefone</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o telefone do barbeiro" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="font-bold">E-mail</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Digite o email do barbeiro" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button 
          type="submit" 
          className="w-full font-bold !mt-5"
          disabled={isLoading}
        >
          Atualizar
        </Button>
      </form>
    </Form>
  )
}
