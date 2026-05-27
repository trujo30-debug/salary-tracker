import Modal from "react-modal"

import { useState, useEffect } from "react"

import {
  calculatePayrollDetails
} from "../utils/payrollUtils"

import {
  saveShift,
  getShiftByDate,
  deleteShift
} from "../utils/storage"

Modal.setAppElement("#root")

function DayModal({
  isOpen,
  onClose,
  selectedDate
}) {

  const [shiftStart, setShiftStart] = useState("")

  const [shiftEnd, setShiftEnd] = useState("")

  const [breaks, setBreaks] = useState([
    {
      start: "",
      end: ""
    }
  ])

  useEffect(() => {

    if (!selectedDate) return

    const existingShift =
      getShiftByDate(selectedDate)

    if (existingShift) {

      setShiftStart(
        existingShift.shiftStart || ""
      )

      setShiftEnd(
        existingShift.shiftEnd || ""
      )

      setBreaks(
        existingShift.breaks?.length
          ? existingShift.breaks
          : [{ start: "", end: "" }]
      )

    } else {

      setShiftStart("")

      setShiftEnd("")

      setBreaks([
        {
          start: "",
          end: ""
        }
      ])
    }

  }, [selectedDate])

  const addBreak = () => {

    setBreaks([
      ...breaks,
      {
        start: "",
        end: ""
      }
    ])
  }

  const updateBreak = (
    index,
    field,
    value
  ) => {

    const updatedBreaks = [...breaks]

    updatedBreaks[index][field] = value

    setBreaks(updatedBreaks)
  }

  const handleSave = () => {

    const payrollDetails = calculatePayrollDetails(
  selectedDate,
  shiftStart,
  shiftEnd,
  breaks
  )

    const shiftData = {

      selectedDate,

      shiftStart,
      shiftEnd,

      breaks,

      ...payrollDetails
    }

    saveShift(shiftData)

    console.log(shiftData)

    alert(`
Horas trabajadas:
${payrollDetails.workedHours}

Normales:
${payrollDetails.normalHours}

Extras:
${payrollDetails.overtimeHours}

Nocturnas:
${payrollDetails.nightHours}

Dominicales:
${payrollDetails.sundayHours}

Extra nocturna:
${payrollDetails.overtimeNightHours}

Pago:
$${payrollDetails.totalPay.toLocaleString()}
    `)

    onClose()
  }

  const handleDelete = () => {

    const confirmDelete =
      window.confirm(
        "¿Eliminar este turno?"
      )

    if (!confirmDelete) return

    deleteShift(selectedDate)

    onClose()
  }

  return (

    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="relative z-50 bg-white max-w-xl w-full mx-4 mt-20 rounded-2xl p-6 outline-none"
      overlayClassName="fixed inset-0 z-50 bg-black/60 flex justify-center items-start overflow-y-auto"
    >

      <h2 className="text-2xl font-bold mb-6">
        Turno del día
      </h2>

      <p className="mb-4 text-gray-600">
        Fecha: {selectedDate}
      </p>

      <div className="grid grid-cols-2 gap-4 mb-6">

        <div>

          <label className="block mb-2 font-semibold">
            Hora entrada
          </label>

          <input
            type="time"
            value={shiftStart}
            onChange={(e) =>
              setShiftStart(e.target.value)
            }
            className="w-full border rounded-lg p-2"
          />

        </div>

        <div>

          <label className="block mb-2 font-semibold">
            Hora salida
          </label>

          <input
            type="time"
            value={shiftEnd}
            onChange={(e) =>
              setShiftEnd(e.target.value)
            }
            className="w-full border rounded-lg p-2"
          />

        </div>

      </div>

      <div className="mb-6">

        <div className="flex justify-between items-center mb-4">

          <h3 className="text-xl font-semibold">
            Descansos
          </h3>

          <button
            onClick={addBreak}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Agregar
          </button>

        </div>

        {
          breaks.map((breakItem, index) => (

            <div
              key={index}
              className="grid grid-cols-2 gap-4 mb-4"
            >

              <input
                type="time"
                value={breakItem.start}
                onChange={(e) =>
                  updateBreak(
                    index,
                    "start",
                    e.target.value
                  )
                }
                className="border rounded-lg p-2"
              />

              <input
                type="time"
                value={breakItem.end}
                onChange={(e) =>
                  updateBreak(
                    index,
                    "end",
                    e.target.value
                  )
                }
                className="border rounded-lg p-2"
              />

            </div>
          ))
        }

      </div>

      <div className="flex justify-between gap-4">

        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Eliminar
        </button>

        <div className="flex gap-4">

          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded-lg"
          >
            Cancelar
          </button>

          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Guardar
          </button>

        </div>

      </div>

    </Modal>
  )
}

export default DayModal