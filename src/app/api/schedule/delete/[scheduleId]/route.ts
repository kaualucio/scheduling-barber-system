import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { format } from "date-fns";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/lib/auth-config";

export async function DELETE(req: Request, { params }: { params: { scheduleId: string } }) {

    try {
          const session = await getServerSession(nextAuthOptions)

          if(!session) return new NextResponse('Você precisa estar logado para realizar essa ação.', { status: 405 })

          const schedule = await db.schedule.delete({
                where: {
                    id: params.scheduleId
                }
          })
      
          return NextResponse.json(schedule)
    } catch (error) {
        console.log('DELETE_SCHEDULE_APPOINTMENT_ERROR', error)
        return new NextResponse('Ocorreu um erro, tente novamente.', { status: 400 })
    }
}