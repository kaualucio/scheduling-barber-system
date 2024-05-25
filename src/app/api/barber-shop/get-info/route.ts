import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { format } from "date-fns";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/lib/auth-config";

export async function GET(req: Request) {
    try {
        const barberShop = await db.barberShop.findFirst({
          where: {
            imutable_id: '1'
          },
        })
    
        return NextResponse.json(barberShop)
    } catch (error) {
        console.log('BARBERSHOP_INFO_ERROR', error)
        return new NextResponse('Ocorreu um erro, tente novamente.', { status: 400 })
    }
}