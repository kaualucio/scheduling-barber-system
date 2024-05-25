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
import Image from "next/image"
import { cn } from "@/lib/utils"
import { api } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

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
  password: z.string().min(8, {
    message: "Campo obrigatório.",
  }),
  picture_url: z.string(),
})

export const AddNewBarberForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const { edgestore } = useEdgeStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      picture_url: "",
    },
  })
 
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true)
      const result = await api.post('/api/barber/create', {
        ...values,
      })
      toast({
        title: "Sucesso!",
        description: "Um novo barbeiro foi adicionado com sucesso!",
        duration: 4000
      })
      router.refresh()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro!",
        description: "Algo deu errado ao adicionar o novo barbeiro, tente novamente.",
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
              !!(form.watch('picture_url')) ? (
                <Image 
                  src={form.watch('picture_url')}
                  alt="Imagem do barbeiro"
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
              <p>Buscar Imagem</p>
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
                      replaceTargetUrl: form.watch('picture_url')
                    },
                    // onProgressChange: (progress) => {
                    //   setProgress(progress)

                    //   if(progress === 100) setProgress(null)
                    // },
                  });

                  form.setValue('picture_url', res.url)
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
                    <Input placeholder="Digite o nome do barbeiro" {...field} />
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="font-bold">Senha</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Digite a senha do barbeiro" {...field} />
                  </FormControl>
                  <FormDescription>
                    Mínimo de 8 caracteres.
                  </FormDescription>
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
          Adicionar novo barbeiro
        </Button>
      </form>
    </Form>
  )
}
