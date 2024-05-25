import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { format } from "date-fns";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";

export async function DELETE(req: Request, { params }: { params: { customerId: string } }) {
    try {
        const session = await getServerSession(nextAuthOptions)

        if(!session) return new NextResponse('Você precisa estar logado para realizar essa ação.', { status: 401 })

        if(session.user.role !== 'ADMIN') return new NextResponse('Você não possui permissão para realizar essa ação.', { status: 401 })

        const customerExists = await db.customer.findUnique({
            where: {
                id: params.customerId
            }
        })

        if(!customerExists) return new NextResponse('Cliente não encontrado.', { status: 404 })

        const customer = await db.customer.delete({
            where: {
                id: params.customerId
            }
        })
    
        return NextResponse.json(customer)
    } catch (error) {
        console.log('DELETE_CUSTOMER_ERROR', error)
        return new NextResponse('Ocorreu um erro, tente novamente.', { status: 400 })
    }
}