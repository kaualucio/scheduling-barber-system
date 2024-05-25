import { Button } from "@/components/ui/button";
import { Scissors } from "lucide-react";
import { LoginForm } from "./_components/login-form";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function LoginDashboard() {
  const session = await getServerSession(nextAuthOptions)

  if(session) redirect('/dashboard')

  return (
    <div className="container relative min-h-screen flex-col items-center justify-center antialiased md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col border-r border-foreground/5 bg-muted p-10 text-muted-foreground dark:border-r lg:flex">
        <div className="flex items-center gap-3 text-lg font-medium text-foreground">
          <Scissors className="h-5 w-5" />
          <span className="font-semibold">Barbearia</span>
        </div>
        <div className="mt-auto">
          <footer className="text-sm">
            Painel do administrativo &copy; Barbearia - {new Date().getFullYear()}
          </footer>
        </div>
      </div>

      <div className="relative flex min-h-screen flex-col items-center justify-center">
        <LoginForm />
      </div>
    </div>
  )
}