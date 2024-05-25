import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { format } from "date-fns";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/lib/auth-config";

export async function PATCH(req: Request) {
    try {
        const session = await getServerSession(nextAuthOptions)

        if(!session) return new NextResponse('Você precisa estar logado para realizar essa ação.', { status: 401 })

        const barberShop = await db.barberShop.updateMany({
          where: {
            imutable_id: '1'
          },
          data: {
            isOpen: false
          }
        })
    
        return NextResponse.json(barberShop)
    } catch (error) {
        console.log('CLOSE_BARBERSHOP_ERROR', error)
        return new NextResponse('Ocorreu um erro, tente novamente.', { status: 400 })
    }
}