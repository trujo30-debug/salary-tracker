import Dashboard from "./components/Dashboard"

import ShiftHistory from "./components/ShiftHistory"

import { useEffect, useState } from "react"

import CalendarView from "./components/calendarView"

import PayrollSummary from "./components/PayrollPanel"

import ConfigPanel from "./components/ConfigPanel"

import { loadShifts } from "./utils/storage"

function App() {

  const [shifts, setShifts] = useState([])

  const refreshShifts = () => {

    const data = loadShifts()

    setShifts(data)
  }

  useEffect(() => {

    refreshShifts()

  }, [])

  return (

    <div className="min-h-screen bg-gray-900 p-6">

      <h1 className="text-4xl text-white font-bold mb-6">
        Salary Tracker
      </h1>

      <ConfigPanel />

      <PayrollSummary shifts={shifts} />

      <Dashboard shifts={shifts} />

      <ShiftHistory shifts={shifts} />

      <CalendarView
        shifts={shifts}
        refreshShifts={refreshShifts}
      />

    </div>
  )
}

export default App