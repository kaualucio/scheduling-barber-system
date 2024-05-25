import { Title } from "@/components/title";
import { db } from "@/lib/db";
import { api } from "@/lib/api";
import { ScheduleTable } from "./_components/schedule-table";

export default async function Agenda({ searchParams }: { searchParams: { name: string, phone_number: string, status: string } }) {

  const data = await db.schedule.findMany({
    where: { 
      //ADD SEARCH FOR BARBERS NAME
        customer: {
          name: {
            contains: searchParams.name,
          },
          phone_number: {
            contains: searchParams.phone_number
          }
        },
      status: searchParams.status 
    },
    orderBy: {
      created_at: "desc",
    },
    include: {
      barber: {
        select: {
          picture: true,
          name: true,
        }
      },
      customer: {
        select: {
          name: true,
          phone_number: true,
        }
      },
    }
  })
  return (
   <div className="py-10">
    <Title title="Agendamentos" />
    <div className="mt-10">
      <ScheduleTable 
        data={data} 
      />
    </div>
   </div>
  );
}
