import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { nextAuthOptions } from "../../auth/[...nextauth]/route"
import { hash } from "bcryptjs"


export async function POST(req: Request, ) {
  try {
    const session = await getServerSession(nextAuthOptions)
    const { 
      name,
      email,
      password,
      phone,
      picture_url,
    } = await req.json()

    if(!session) return new NextResponse('Você precisa estar logado para realizar essa ação.', { status: 401 })

    if(session.user.role !== 'ADMIN') return new NextResponse('Você não possui permissão para realizar essa ação.', { status: 401 })

    if(!name || !email || !phone || !password) return new NextResponse('Preencha todos os campos obriatórios para continuar.', { status: 400 })

    const barberExists = await db.barber.findUnique({
      where: {
        email
      }
    })

    if(barberExists) return new NextResponse('Já existe um barbeiro com esse e-mail cadastrado.', { status: 400 })

    const hashedPassword = await hash(password, 10)

    const newUser = await db.barber.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        picture: picture_url,
      }
    })
    
    return NextResponse.json(newUser)

  } catch (error) {
    console.log('CREATE_BARBER_ERROR', error)
    return new NextResponse('Ocorreu um erro ao adicionar um novo barbeiro, tente novamente.', { status: 400})
  }
}