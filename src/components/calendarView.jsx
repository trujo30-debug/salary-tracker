import tippy from "tippy.js"
import "tippy.js/dist/tippy.css"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

import { useState, useEffect } from "react"

import DayModal from "./DayModal"

import { loadShifts } from "../utils/storage"

function CalendarView({
  shifts,
  refreshShifts
}) {

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [selectedDate, setSelectedDate] = useState("")
  
  const events = shifts.map((shift) => {

  let backgroundColor = "#2563eb"

  // Extras
  if (shift.overtimeHours > 0) {
    backgroundColor = "#ea580c"
  }

  // Nocturnas
  if (shift.nightHours > 0) {
    backgroundColor = "#9333ea"
  }

  // Extra nocturna
  if (shift.overtimeNightHours > 0) {
    backgroundColor = "#dc2626"
  }

  return {

    title:
      `${Number(shift.workedHours).toFixed(1)}h | ` +
      `$${Math.round(shift.totalPay / 1000)}k`,

    date: shift.selectedDate,

    backgroundColor,

    borderColor: backgroundColor
  }
})

  const handleDateClick = (info) => {

    setSelectedDate(info.dateStr)

    setIsModalOpen(true)
  }

  const handleCloseModal = () => {

    setIsModalOpen(false)

    refreshShifts()
  }

  return (
    <>

      <div className="bg-white rounded-2xl p-4 shadow-lg relative z-0">

        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          dateClick={handleDateClick}
          events={events}
          height="auto"
          eventDidMount={(info) => {

  const shift =
    shifts.find(
      s => s.selectedDate === info.event.startStr
    )

  if (!shift) return

  tippy(info.el, {

    content: `
      <div>

        <strong>Horas:</strong>
        ${shift.workedHours}<br/>

        <strong>Extras:</strong>
        ${shift.overtimeHours}<br/>

        <strong>Nocturnas:</strong>
        ${shift.nightHours}<br/>

        <strong>Pago:</strong>
        $${shift.totalPay.toLocaleString()}

      </div>
    `,

    allowHTML: true
  })
}}
        />

      </div>

      <DayModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedDate={selectedDate}
      />

    </>
  )
}

export default CalendarView