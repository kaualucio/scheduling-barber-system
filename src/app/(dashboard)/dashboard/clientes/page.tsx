import { Title } from "@/components/title";
import { db } from "@/lib/db";
import { CustomerTable } from "./_components/customer-table";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/lib/auth-config";


export default async function Agenda({ searchParams }: { searchParams: { name: string, phone_number: string, status: string } }) {
  const session = await getServerSession(nextAuthOptions)
  const data = await db.customer.findMany({
    orderBy: {
      created_at: "desc",
    },
    include: {
      Schedule: {
        select: {
          date_time: true,
        },
        orderBy: {
          date_time: 'desc'
        }
      }
    }
  })

  return (
   <div className="py-10">
    <Title title="Barbeiros" />
    <div className="mt-10">
      <CustomerTable data={data} />
    </div>
   </div>
  );
}
