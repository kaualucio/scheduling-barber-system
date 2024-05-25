import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
    try {
        const services = await db.service.findMany({
            orderBy: {
                created_at: 'asc',
            },
        })
    
        return NextResponse.json(services)
    } catch (error) {
        console.log('GET_SERVICES', error)
        return new NextResponse('Ocorreu um erro, tente novamente.', { status: 400 })
    }
}