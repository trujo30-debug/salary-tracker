function PayrollSummary({ shifts }) {

  const now = new Date()

  const currentMonth =
    now.getMonth() + 1

  const currentYear =
    now.getFullYear()

  // FILTRAR MES ACTUAL

  const monthlyShifts =
    shifts.filter((shift) => {

      const [year, month] =

        shift.selectedDate
          .split("-")
          .map(Number)

      return (

        year === currentYear &&

        month === currentMonth
      )
    })

  // QUINCENA 1

  const quincena1Shifts =
    monthlyShifts.filter((shift) => {

      const day =
        Number(
          shift.selectedDate
            .split("-")[2]
        )

      return (
        day >= 1 &&
        day <= 15
      )
    })

  // QUINCENA 2

  const quincena2Shifts =
    monthlyShifts.filter((shift) => {

      const day =
        Number(
          shift.selectedDate
            .split("-")[2]
        )

      return (
        day >= 16
      )
    })

  // FUNCIÓN SUMAS

  const calculateTotals = (data) => {

    return data.reduce((acc, shift) => {

      acc.basePay +=
        shift.basePay || 0

      acc.sundayBonus +=
        shift.sundayBonus || 0

      acc.nightBonus +=
        shift.nightBonus || 0

      acc.overtimeBonus +=
        shift.overtimeBonus || 0

      acc.overtimeNightBonus +=
        shift.overtimeNightBonus || 0

      acc.totalPay +=
        shift.totalPay || 0

      return acc

    }, {

      basePay: 0,

      sundayBonus: 0,

      nightBonus: 0,

      overtimeBonus: 0,

      overtimeNightBonus: 0,

      totalPay: 0
    })
  }

  const quincena1Totals =
    calculateTotals(quincena1Shifts)

  const quincena2Totals =
    calculateTotals(quincena2Shifts)

  const monthlyTotals =
    calculateTotals(monthlyShifts)

  const renderCard = (title, totals, color) => (

    <div className="bg-white rounded-2xl p-6 shadow-lg">

      <h2 className="text-2xl font-bold mb-4">
        {title}
      </h2>

      <div className="space-y-2">

        <p>
          Base:
          <strong>
            {" "}
            $
            {Math.round(
              totals.basePay
            ).toLocaleString()}
          </strong>
        </p>

        <p>
          Dominical:
          <strong>
            {" "}
            $
            {Math.round(
              totals.sundayBonus
            ).toLocaleString()}
          </strong>
        </p>

        <p>
          Nocturna:
          <strong>
            {" "}
            $
            {Math.round(
              totals.nightBonus
            ).toLocaleString()}
          </strong>
        </p>

        <p>
          Extras:
          <strong>
            {" "}
            $
            {Math.round(
              totals.overtimeBonus
            ).toLocaleString()}
          </strong>
        </p>

        <p>
          Extra nocturna:
          <strong>
            {" "}
            $
            {Math.round(
              totals.overtimeNightBonus
            ).toLocaleString()}
          </strong>
        </p>

        <hr className="my-3" />

        <p className={`text-2xl font-bold ${color}`}>

          $
          {Math.round(
            totals.totalPay
          ).toLocaleString()}

        </p>

      </div>

    </div>
  )

  return (

    <div className="grid lg:grid-cols-3 gap-6 mb-6">

      {
        renderCard(
          "Quincena 1",
          quincena1Totals,
          "text-green-600"
        )
      }

      {
        renderCard(
          "Quincena 2",
          quincena2Totals,
          "text-blue-600"
        )
      }

      {
        renderCard(
          "Resumen mensual",
          monthlyTotals,
          "text-purple-600"
        )
      }

    </div>
  )
}

export default PayrollSummary