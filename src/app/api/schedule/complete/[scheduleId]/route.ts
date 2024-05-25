import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { format } from "date-fns";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/lib/auth-config";

export async function PATCH(req: Request, { params }: { params: { scheduleId: string } }) {

    try {
        const session = await getServerSession(nextAuthOptions)

        if(!session) return new NextResponse('Você precisa estar logado para realizar essa ação.', { status: 405 })
    
        const scheduleExists = await db.schedule.findUnique({
            where: {
                id: params.scheduleId
            }
        })

        if(!scheduleExists) return new NextResponse('Agendamento não encontrado.', { status: 404 })

        const schedule = await db.schedule.update({
            where: {
                id: params.scheduleId
            },
            data: {
                status: "completed"
            }
        })
      
          return NextResponse.json(schedule)
    } catch (error) {
        console.log('COMPLETE_SCHEDULE_APPOINTMENT_ERROR', error)
        return new NextResponse('Ocorreu um erro, tente novamente.', { status: 400 })
    }
}