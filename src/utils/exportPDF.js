import jsPDF from "jspdf"

import autoTable from "jspdf-autotable"

export function exportShiftsToPDF(shifts) {

  const doc = new jsPDF()

  // TITULO

  doc.setFontSize(22)

  doc.text(
    "Resumen de Nómina",
    14,
    20
  )

  // FECHA

  doc.setFontSize(11)

  doc.text(

    `Generado: ${new Date().toLocaleDateString()}`,

    14,

    30
  )

  // TOTALES

  const totalIncome =

    shifts.reduce(

      (acc, shift) =>

        acc +
        Number(
          shift.totalPay || 0
        ),

      0
    )

  const totalHours =

    shifts.reduce(

      (acc, shift) =>

        acc +
        Number(
          shift.workedHours || 0
        ),

      0
    )

  doc.text(

    `Total ingresos: $${Math.round(totalIncome).toLocaleString()}`,

    14,

    40
  )

  doc.text(

    `Horas trabajadas: ${totalHours.toFixed(2)}h`,

    14,

    48
  )

  // TABLA

  const tableData =

    shifts.map((shift) => [

      shift.selectedDate,

      shift.shiftStart,

      shift.shiftEnd,

      `${Number(
        shift.workedHours
      ).toFixed(2)}h`,

      `$${Math.round(
        shift.totalPay
      ).toLocaleString()}`
    ])

  autoTable(doc, {

    startY: 60,

    head: [[

      "Fecha",

      "Entrada",

      "Salida",

      "Horas",

      "Pago"
    ]],

    body: tableData
  })

  // DESCARGA

  doc.save(
    "comprobante_nomina.pdf"
  )
}