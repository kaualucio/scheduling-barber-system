'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Session } from "next-auth"
import { signOut } from "next-auth/react"
import { FormDialog } from "@/components/form-dialog"
import { UpdateBarberForm } from "./update-barber-form"
import { getAcronyms } from "@/utils/get-acronyms"

interface ProfileProps {
  session: Session | null
}

export const Profile = ({ session }: ProfileProps) => {
  const acronyms = getAcronyms(session?.user.name!)

  const handleLogout = async () => {
    await signOut({
      callbackUrl: "/login/dashboard"
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center gap-2 px-2 py-1 rounded-md border">
          <Avatar className="w-8 h-8 rounded-full">
            <AvatarImage src={session?.user.picture! || ""}/>
            <AvatarFallback>{acronyms}</AvatarFallback>
          </Avatar>
          <p className="text-sm font-bold">{session?.user.name!}</p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
          <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
            <FormDialog
              title="Editar meu perfil"
              triggerLabel="Editar perfil"
            >
              <UpdateBarberForm barber={session?.user!} />
            </FormDialog>
          </div>
        <DropdownMenuItem>Mudar senha</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLogout()}>Sair</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
