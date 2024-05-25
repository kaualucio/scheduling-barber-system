import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
    try {
        const barbers = await db.barber.findMany({
        where: {
            available: true,
        },
        orderBy: {
            created_at: 'asc',
        },
        include: {
            Schedule: {
                select: {
                    date: true,
                    date_time: true,
                    time: true,
                }
            }
        }
        })
    
        return NextResponse.json(barbers)
    } catch (error) {
        console.log('GET_BARBERS_ROOT', error)
        return new NextResponse('Ocorreu um erro, tente novamente.', { status: 400 })
    }
}