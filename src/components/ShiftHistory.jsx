import { useState } from "react"

import {

  exportShiftsToExcel

} from "../utils/exportExcel"

import {

  exportShiftsToPDF

} from "../utils/exportPDF"

function ShiftHistory({ shifts }) {

  // FILTROS

  const [search, setSearch] =
    useState("")

  const [

    showOnlySunday,

    setShowOnlySunday

  ] = useState(false)

  const [sortType, setSortType] =
    useState("recent")

  // FILTRAR

  const filteredShifts =

    shifts.filter((shift) => {

      // BUSCADOR

      const matchesSearch =

        shift.selectedDate
          .includes(search)

      // DOMINICAL

      const [year, month, day] =

        shift.selectedDate
          .split("-")
          .map(Number)

      const date =

        new Date(
          year,
          month - 1,
          day
        )

      const isSunday =
        date.getDay() === 0

      const matchesSunday =

        showOnlySunday

          ? isSunday

          : true

      return (

        matchesSearch &&
        matchesSunday
      )
    })

  // ORDENAR

  const sortedShifts =

    [...filteredShifts].sort((a, b) => {

      // MAYOR PAGO

      if (sortType === "pay") {

        return (
          b.totalPay -
          a.totalPay
        )
      }

      // MÁS RECIENTE

      return (

        new Date(b.selectedDate) -

        new Date(a.selectedDate)
      )
    })

  return (

    <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">

      {/* HEADER */}

      <div className="flex justify-between items-center mb-6">

        <div>

                <h2 className="text-2xl font-bold">

                    Historial de turnos

                </h2>

                <p className="text-gray-500">

                    {shifts.length} turnos

                </p>

                </div>

                <div className="flex gap-3">

        <button

            onClick={() =>

            exportShiftsToExcel(
                sortedShifts
            )
            }

            className="bg-green-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-green-700 transition"
        >

            Excel

        </button>

        <button

            onClick={() =>

            exportShiftsToPDF(
                sortedShifts
            )
            }

            className="bg-red-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-red-700 transition"
        >

            PDF

        </button>

        </div>

      </div>

      {/* FILTROS */}

      <div className="grid md:grid-cols-3 gap-4 mb-6">

        {/* BUSCADOR */}

        <input
          type="text"
          placeholder="Buscar fecha..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="border rounded-xl p-3"
        />

        {/* DOMINICALES */}

        <label className="flex items-center gap-3 bg-gray-100 rounded-xl px-4">

          <input
            type="checkbox"
            checked={showOnlySunday}
            onChange={() =>
              setShowOnlySunday(
                !showOnlySunday
              )
            }
          />

          Solo dominicales

        </label>

        {/* ORDEN */}

        <select
          value={sortType}
          onChange={(e) =>
            setSortType(e.target.value)
          }
          className="border rounded-xl p-3"
        >

          <option value="recent">

            Más recientes

          </option>

          <option value="pay">

            Mayor pago

          </option>

        </select>

      </div>

      {/* TABLA */}

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left py-3">

                Fecha

              </th>

              <th className="text-left py-3">

                Entrada

              </th>

              <th className="text-left py-3">

                Salida

              </th>

              <th className="text-left py-3">

                Horas

              </th>

              <th className="text-left py-3">

                Tipo

              </th>

              <th className="text-left py-3">

                Pago

              </th>

            </tr>

          </thead>

          <tbody>

            {

              sortedShifts.map(

                (shift, index) => {

                  const [

                    year,
                    month,
                    day

                  ] =

                    shift.selectedDate
                      .split("-")
                      .map(Number)

                  const date =

                    new Date(
                      year,
                      month - 1,
                      day
                    )

                  const isSunday =

                    date.getDay() === 0

                  return (

                    <tr
                      key={index}
                      className="border-b hover:bg-gray-50"
                    >

                      <td className="py-4">

                        {
                          shift.selectedDate
                        }

                      </td>

                      <td>

                        {
                          shift.shiftStart
                        }

                      </td>

                      <td>

                        {
                          shift.shiftEnd
                        }

                      </td>

                      <td>

                        {
                          Number(
                            shift.workedHours
                          ).toFixed(2)
                        }h

                      </td>

                      <td>

                        <span

                          className={`px-3 py-1 rounded-full text-sm font-semibold

                          ${
                            isSunday

                              ? "bg-red-100 text-red-700"

                              : "bg-green-100 text-green-700"
                          }`}
                        >

                          {
                            isSunday

                              ? "Dominical"

                              : "Normal"
                          }

                        </span>

                      </td>

                      <td className="font-bold text-green-600">

                        $

                        {
                          Math.round(
                            shift.totalPay
                          ).toLocaleString()
                        }

                      </td>

                    </tr>
                  )
                }
              )
            }

          </tbody>

        </table>

      </div>

    </div>
  )
}

export default ShiftHistory