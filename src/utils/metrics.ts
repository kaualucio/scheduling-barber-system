import { Schedule } from "@prisma/client";
import { format } from "date-fns";

export const getTotalInvoice = (schedule: Schedule[]) => {
  let totalInvoice = 0
  schedule.map((appointment) => {
    if(appointment.status !== 'completed') {
      return
    }
    totalInvoice += appointment.total_value 
  })

  return totalInvoice
}

export const getTodayInvoice = (schedule: Schedule[]) => {
  let todayInvoice = 0
  schedule.map((appointment) => {
    if(appointment.status !== 'completed') {
      return
    }

    if(appointment.date !== format(new Date(), 'dd/MM/yyyy')) {
      return
    }

    todayInvoice += appointment.total_value 
  })

  return todayInvoice
}

export const getTotalCustomersToday = (schedule: Schedule[]) => {
  let totalCustomerToday = 0
  schedule.map((appointment) => {
    if(appointment.status !== 'completed') {
      return
    }

    if(appointment.date !== format(new Date(), 'dd/MM/yyyy')) {
      return
    }

    totalCustomerToday += 1
  })

  return totalCustomerToday
}

export const getTotalCanceledAppointmentsToday = (schedule: Schedule[]) => {
  let totalCanceled = 0
  schedule.map((appointment) => {
    if(appointment.status !== 'canceled') {
      return
    }

    if(appointment.date !== format(new Date(), 'dd/MM/yyyy')) {
      return
    }
    totalCanceled += 1
  })

  return totalCanceled
}