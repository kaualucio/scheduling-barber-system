import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { nextAuthOptions } from "../../auth/[...nextauth]/route"
import { hash } from "bcryptjs"


export async function PATCH(req: Request, ) {
  try {
    const session = await getServerSession(nextAuthOptions)
    const values = await req.json()
    if(!session) return new NextResponse('Você precisa estar logado para realizar essa ação.', { status: 401 })

    if(!values.name || !values.email || !values.phone) return new NextResponse('Preencha todos os campos obriatórios para continuar.', { status: 400 })

    const barberExists = await db.barber.findUnique({
      where: {
        email: values.email
      }
    })

    if(!barberExists) return new NextResponse('Barbeiro não encontrado', { status: 404 })

    if(barberExists.id !== session.user.id) return new NextResponse('Você não pode atualizar as informações de outro barbeiro.', { status: 400 })

    const updatedUser = await db.barber.update({
      where: {
        id: session.user.id
      },
      data: {
        ...values,
      }
    })
    return NextResponse.json(updatedUser)

  } catch (error) {
    console.log('UPDATE_BARBER_ERROR', error)
    return new NextResponse('Ocorreu um erro ao atualizar as informações do barbeiro, tente novamente.', { status: 400})
  }
}