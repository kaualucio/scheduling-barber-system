import { format, isBefore } from "date-fns"
import { timetable } from "./timetable"

export const getAvailableDays = (data: any[]) => {
  let timeData = data.map(time => time.time)
  return timetable.filter(horario => !timeData.includes(horario))
}