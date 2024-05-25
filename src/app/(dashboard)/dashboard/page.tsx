import { getMonthSchedule } from "@/app/actions/get-month-schedule";
import { Metric } from "@/components/metric";
import { api } from "@/lib/api";
import { formatPrice } from "@/utils/format-price";
import { getTodayInvoice, getTotalCanceledAppointmentsToday, getTotalCustomersToday, getTotalInvoice } from "@/utils/metrics";
import { CircleX, PiggyBank, Users } from "lucide-react";

export default async function Dashboard() {

  const schedulesForCurrentMonth = await getMonthSchedule()
  const totalInvoice = getTotalInvoice(schedulesForCurrentMonth)
  const todayInvoice = getTodayInvoice(schedulesForCurrentMonth)
  const totalCustomersToday = getTotalCustomersToday(schedulesForCurrentMonth)
  const totalCancelsToday = getTotalCanceledAppointmentsToday(schedulesForCurrentMonth)
  return (
   <>
    <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      <Metric 
       icon={PiggyBank}
       title="Faturamento Total"
       description="Faturamento total do mês."
       value={formatPrice(totalInvoice)}
     />
     <Metric 
       icon={PiggyBank}
       title="Faturamento"
       description="Faturamento total do dia de hoje."
       value={formatPrice(todayInvoice)}
      />
      <Metric 
        icon={Users}
        title="Clientes Hoje"
        description="Quantidade de clientes atendidos no dia de hoje."
        value={totalCustomersToday}
      />
      <Metric 
        icon={CircleX}
        title="Agendamentos Cancelados"
        description="Quantidade de atendimentos cancelados hoje."
        value={totalCancelsToday}
      />
    </section>
   </>
  );
}
