import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { format } from "date-fns";

export async function POST(req: Request) {
    try {

        const values = await req.json()

        if(!values.name || !values.phone || !values.services || !values.date || !values.time || !values.barber || !values.total_price) {
            return new NextResponse('Campos não são permitidos.', { status: 400 })
        }

        let userExists = await db.customer.findFirst({
            where: {
                phone_number: values.phone
            }
        })

        if(!userExists) {
            userExists = await db.customer.create({
                data: {
                name: values.name,
                phone_number: values.phone.replace(/\D/g, ''),
                }
            })
        }

        const barberExists = await db.barber.findUnique({
            where: {
                id: values.barber,
                available: true
            }
        })

        if(!barberExists) return new NextResponse('Barbeiro não encontrado/disponível no momento.', { status: 404 })

        const splittedTime = values.time.split(':')
        const partsOfDate = {
            year: new Date().getFullYear(),
            month: new Date().getMonth(),
            day: Number(values.date),
            hour: Number(splittedTime[0]),
            minute: Number(splittedTime[1]),
        }
        const formatedDateTime = new Date(partsOfDate.year, partsOfDate.month, partsOfDate.day, partsOfDate.hour, partsOfDate.minute)
        const formatedDate = format(formatedDateTime, 'dd/MM/yyyy')
        const formatedTime = format(formatedDateTime, 'HH:mm')

        const hasAlreadyASchedule = await db.schedule.findFirst({
            where: {
                barber_id: barberExists.id,
                date: formatedDate,
                time: formatedTime,
                date_time: formatedDateTime,
            }
        })

        if (hasAlreadyASchedule) return new NextResponse('Esse horário já está preenchido.', { status: 400 })

        const newScheduleItem = await db.schedule.create({
            data: {
                date: formatedDate,
                date_time: formatedDateTime,
                time: formatedTime,
                barber_id: values.barber,
                services_id: values.services,
                customer_id: userExists.id,
                total_value: values.total_price
            }
        })
    
        return NextResponse.json(newScheduleItem)
    } catch (error) {
        console.log('ADD_A_SCHEDULE_APPOINTMENT_ERROR', error)
        return new NextResponse('Ocorreu um erro, tente novamente.', { status: 400 })
    }
}