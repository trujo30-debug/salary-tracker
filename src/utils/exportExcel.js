import * as XLSX from "xlsx"

import { saveAs } from "file-saver"

export function exportShiftsToExcel(shifts) {

  const formattedData =

    shifts.map((shift) => ({

      Fecha:
        shift.selectedDate,

      Entrada:
        shift.shiftStart,

      Salida:
        shift.shiftEnd,

      Horas:
        Number(
          shift.workedHours
        ).toFixed(2),

      Pago:
        Math.round(
          shift.totalPay
        ),

      Base:
        Math.round(
          shift.basePay || 0
        ),

      Dominical:
        Math.round(
          shift.sundayBonus || 0
        ),

      Nocturna:
        Math.round(
          shift.nightBonus || 0
        ),

      Extra:
        Math.round(
          shift.overtimeBonus || 0
        ),

      ExtraNocturna:
        Math.round(
          shift.overtimeNightBonus || 0
        )
    }))

  // CREAR HOJA

  const worksheet =

    XLSX.utils.json_to_sheet(
      formattedData
    )

  // CREAR LIBRO

  const workbook =
    XLSX.utils.book_new()

  XLSX.utils.book_append_sheet(

    workbook,

    worksheet,

    "Turnos"
  )

  // GENERAR ARCHIVO

  const excelBuffer =

    XLSX.write(

      workbook,

      {

        bookType: "xlsx",

        type: "array"
      }
    )

  const data =

    new Blob(

      [excelBuffer],

      {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
      }
    )

  saveAs(
    data,
    "historial_turnos.xlsx"
  )
}