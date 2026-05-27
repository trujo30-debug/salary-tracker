
export function timeToMinutes(time) {

  if (!time) return 0

  const [hours, minutes] = time.split(":").map(Number)

  return hours * 60 + minutes
}

export function calculateBreakMinutes(breaks) {

  let total = 0

  breaks.forEach((breakItem) => {

    const start = timeToMinutes(breakItem.start)

    const end = timeToMinutes(breakItem.end)

    total += end - start
  })

  return total
}

export function calculateWorkedHours(
  shiftStart,
  shiftEnd,
  breaks
) {

  const start = timeToMinutes(shiftStart)

  let end = timeToMinutes(shiftEnd)

  // Soporte para turnos que cruzan medianoche
  if (end < start) {
    end += 24 * 60
  }

  const totalMinutes = end - start

  const breakMinutes = calculateBreakMinutes(breaks)

  const workedMinutes = totalMinutes - breakMinutes

  return (workedMinutes / 60).toFixed(2)
}
import payrollConfig from "../data/payrollConfig"

import { loadSettings } from "./storage"

export function calculatePayrollDetails(
  selectedDate,
  shiftStart,
  shiftEnd,
  breaks,
) {
  const settings = loadSettings()
  const hourlyRate =
    settings.hourlyRate ||
    payrollConfig.hourlyRate
  const dailyTransportAid =
  settings.dailyTransportAid || 0

  const [year, month, day] =
  selectedDate.split("-").map(Number)

  const date =
  new Date(year, month - 1, day)

  const isSunday =
  date.getDay() === 0

  let start = timeToMinutes(shiftStart)

  let end = timeToMinutes(shiftEnd)

  if (end < start) {
    end += 24 * 60
  }

  const breakMinutes = calculateBreakMinutes(breaks)

  const workedMinutes = end - start - breakMinutes

  const workedHours = workedMinutes / 60

  let normalHours = 0
  let overtimeHours = 0
  let nightHours = 0
  let overtimeNightHours = 0
  let sundayHours = 0

  // Recorrido hora por hora
  for (let i = 0; i < workedHours; i++) {

    const currentHour =
      ((start / 60) + i) % 24

    const isNight =
      currentHour >= payrollConfig.nightStart ||
      currentHour < payrollConfig.nightEnd

    const isOvertime =
      i >= payrollConfig.normalDailyHours

    if (isSunday) {

  sundayHours++

}

if (isNight && isOvertime) {

  overtimeNightHours++

} else if (isNight) {

  nightHours++

} else if (isOvertime) {

  overtimeHours++

} else {

  normalHours++
}
  }

  // SALARIO BASE

const basePay =
  workedHours * hourlyRate

// RECARGOS

const overtimeBonus =

  overtimeHours *

  hourlyRate *

  payrollConfig.overtimeMultiplier

const nightBonus =

  nightHours *

  hourlyRate *

  payrollConfig.nightMultiplier

const overtimeNightBonus =

  overtimeNightHours *

  hourlyRate *

  payrollConfig.overtimeNightMultiplier

const sundayBonus =

  sundayHours *

  hourlyRate *

  payrollConfig.sundayMultiplier

// TOTAL

const totalPay =

  basePay +

  overtimeBonus +

  nightBonus +

  overtimeNightBonus +

  sundayBonus +

  dailyTransportAid

  return {

    workedHours,

    normalHours,

    overtimeHours,

    nightHours,

    overtimeNightHours,

    sundayHours,

    basePay,

    overtimeBonus,

    nightBonus,

    overtimeNightBonus,

    sundayBonus,

    totalPay
  }
}