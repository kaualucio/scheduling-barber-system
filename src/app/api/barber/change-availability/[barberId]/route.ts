import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { nextAuthOptions } from "../@/lib/auth-config"

export async function PATCH(req: Request, { params }: { params: { barberId: string} }) {
  try {
    const session = await getServerSession(nextAuthOptions)

    if(!session) return new NextResponse('Você precisa estar logado para realizar essa ação.', { status: 401 })

    const barberExists = await db.barber.findUnique({
      where: {
        id: params.barberId,
      }
    })

    if(!barberExists) return new NextResponse('Barbeiro não encontrado.', { status: 404 })

    if(session.user.id !== params.barberId) {
      if(session.user.role !== "ADMIN") {
        return new NextResponse('Você não pode realizar essa ação.', { status: 400 })
      }
    }

    const updatedUser = await db.barber.update({
      where:{
        id: params.barberId,
      },
      data: {
        available: !barberExists.available
      }
    })
    
    return NextResponse.json(updatedUser)

  } catch (error) {
    console.log('CHANGE_BARBER_AVAILABILITY_ERROR', error)
    return new NextResponse('Ocorreu um erro ao mudar a disponibilidade do barbeiro, tente novamente.', { status: 400})
  }
}