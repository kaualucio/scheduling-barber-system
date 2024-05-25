import { db } from "@/lib/db"
import { partsOfDate } from "@/utils/parts-of-date"
import { lastDayOfMonth } from "date-fns"


export const getMonthSchedule = async () => {
  try {
    
    const schedulesForCurrentMonth = await db.schedule.findMany({
      where: {
        created_at: {
          gte: new Date(partsOfDate.year, partsOfDate.month, 1),
          lte: new Date(partsOfDate.year, partsOfDate.month, new Date(lastDayOfMonth(new Date())).getDate())
        }
      }
    })

    return schedulesForCurrentMonth

  } catch (error) {
    console.log('METRIC_TOTAL_INVOICE_ERROR', error)
    return []
  }
}