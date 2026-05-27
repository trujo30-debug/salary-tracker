import {

  Chart as ChartJS,

  CategoryScale,
  LinearScale,

  BarElement,

  Title,
  Tooltip,
  Legend

} from "chart.js"

import { Bar } from "react-chartjs-2"

ChartJS.register(

  CategoryScale,
  LinearScale,

  BarElement,

  Title,
  Tooltip,
  Legend
)

function Dashboard({ shifts }) {

  const chartData = shifts.map((shift) => ({

    date:
      shift.selectedDate
        .split("-")
        .slice(1)
        .join("/"),

    total:
      Number(shift.totalPay || 0),

    hours:
      Number(shift.workedHours || 0)
  }))

  // KPIs

  const totalHours = shifts.reduce(

    (acc, shift) =>

      acc +
      Number(shift.workedHours || 0),

    0
  )

  const totalIncome = shifts.reduce(

    (acc, shift) =>

      acc +
      Number(shift.totalPay || 0),

    0
  )

  const averagePerShift =

    shifts.length

      ? totalIncome / shifts.length

      : 0

  const bestShift =

    shifts.reduce(

      (best, current) =>

        current.totalPay >
        (best?.totalPay || 0)

          ? current

          : best,

      null
    )

  // INGRESOS

  const incomeChart = {

    labels:
      chartData.map(
        item => item.date
      ),

    datasets: [

      {

        label:
          "Ingresos",

        data:
          chartData.map(
            item => item.total
          ),

        backgroundColor:
          "rgba(34,197,94,0.7)"
      }
    ]
  }

  // HORAS

  const hoursChart = {

    labels:
      chartData.map(
        item => item.date
      ),

    datasets: [

      {

        label:
          "Horas",

        data:
          chartData.map(
            item => item.hours
          ),

        backgroundColor:
          "rgba(59,130,246,0.7)"
      }
    ]
  }

  return (

    <div className="space-y-6 mb-8">

      {/* KPI */}

      <div className="grid md:grid-cols-4 gap-4">

        <div className="bg-white rounded-2xl p-5 shadow-lg">

          <p className="text-gray-500 mb-2">

            Total ingresos

          </p>

          <h2 className="text-2xl font-bold text-green-600">

            $
            {Math.round(
              totalIncome
            ).toLocaleString()}

          </h2>

        </div>

        <div className="bg-white rounded-2xl p-5 shadow-lg">

          <p className="text-gray-500 mb-2">

            Horas trabajadas

          </p>

          <h2 className="text-2xl font-bold">

            {totalHours.toFixed(1)}h

          </h2>

        </div>

        <div className="bg-white rounded-2xl p-5 shadow-lg">

          <p className="text-gray-500 mb-2">

            Promedio por turno

          </p>

          <h2 className="text-2xl font-bold text-blue-600">

            $
            {Math.round(
              averagePerShift
            ).toLocaleString()}

          </h2>

        </div>

        <div className="bg-white rounded-2xl p-5 shadow-lg">

          <p className="text-gray-500 mb-2">

            Mejor turno

          </p>

          <h2 className="text-xl font-bold text-purple-600">

            {
              bestShift

                ? `$${Math.round(
                    bestShift.totalPay
                  ).toLocaleString()}`

                : "$0"
            }

          </h2>

        </div>

      </div>

      {/* INGRESOS */}

      <div className="bg-white rounded-2xl p-6 shadow-lg">

        <h2 className="text-2xl font-bold mb-6">

          Ingresos por día

        </h2>

        <Bar data={incomeChart} />

      </div>

      {/* HORAS */}

      <div className="bg-white rounded-2xl p-6 shadow-lg">

        <h2 className="text-2xl font-bold mb-6">

          Horas trabajadas

        </h2>

        <Bar data={hoursChart} />

      </div>

    </div>
  )
}

export default Dashboard