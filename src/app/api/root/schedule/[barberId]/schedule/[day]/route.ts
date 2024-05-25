import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { format } from "date-fns";

export async function GET(req: Request, { params }: { params: { barberId: string, day: string } }) {
    try {
        const timetable = await db.schedule.findMany({
            where: {
                barber_id: params.barberId,
                date: format(new Date(new Date().getFullYear(), new Date().getMonth(), Number(params.day)), 'dd/MM/yyyy'),
            },
            orderBy: {
                created_at: 'asc',
            },
            select: {
                date: true,
                time: true,
                date_time: true,
            }
        })

        return NextResponse.json(timetable)
    } catch (error) {
        console.log(error)
        return new NextResponse('Algo deu errado.', { status: 400 })
    }
}