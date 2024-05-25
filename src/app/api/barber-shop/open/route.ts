import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { format } from "date-fns";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/lib/auth-config";

export async function PATCH(req: Request) {
    try {
        const session = await getServerSession(nextAuthOptions)

        if(!session) return new NextResponse('Você precisa estar logado para realizar essa ação.', { status: 401 })

          const barberShop = await db.barberShop.update({
            where: {
              id: '6651e4e1dabe3cd796c7acbf'
            },
            data: {
              isOpen: true
            }
          })
    
        return NextResponse.json(barberShop)
    } catch (error) {
        console.log('OPEN_BARBERSHOP_ERROR', error)
        return new NextResponse('Ocorreu um erro, tente novamente.', { status: 400 })
    }
}