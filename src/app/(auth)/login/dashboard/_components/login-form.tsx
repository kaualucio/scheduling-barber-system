'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { signIn } from "next-auth/react"

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
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
 
const formSchema = z.object({
  email: z.string().min(1, { message: "Campo obrigatório" }).email(),
  password: z.string().min(1, { message: "Campo obrigatório" }),
})

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const result = await signIn('credentials', {
      ...values,
      redirect: false,
    })
    console.log(result)
    if (result?.error) {
      toast({
        variant: "destructive",
        title: "Ocorreu um erro!",
        description: "Ocorreu um erro ao logar na sua conta, tente novamente."
      })
      return
    }

    router.push('/dashboard')
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="lg:p-8">

      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Acessar painel
          </h1>
          <p className="text-sm text-muted-foreground">
            Acompanhe suas vendas pelo painel do parceiro!
          </p>
        </div>

        <div className="grid gap-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input 
                        type="email"
                        placeholder="Seu email..." 
                        {...field} />
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
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          type={showPassword ? "text" :"password"} 
                          placeholder="*********" 
                          {...field} 
                        />
                        <Button 
                          type="button" 
                          onClick={handleShowPassword} 
                          className="p-0 w-5 h-5 bg-transparent hover:bg-transparent rounded-full absolute top-1/2 -translate-y-1/2 right-3 text-muted-foreground/60">
                          {
                            showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />
                          }
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">Entrar</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
