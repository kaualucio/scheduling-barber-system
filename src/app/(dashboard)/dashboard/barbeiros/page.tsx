import { Title } from "@/components/title";
import { db } from "@/lib/db";
import { BarberTable } from "./_components/barber-table";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";


export default async function Agenda({ searchParams }: { searchParams: { name: string, phone_number: string, status: string } }) {
  const session = await getServerSession(nextAuthOptions)
  const data = await db.barber.findMany({
    orderBy: {
      created_at: "desc",
    },
    include: {
      Schedule: {
        select: {
          status: true 
        }
      }
    }
  })

  return (
   <div className="py-10">
    <Title title="Barbeiros" />
    <div className="mt-10">
      <BarberTable data={data} session={session} />
    </div>
   </div>
  );
}
