import { useState, useEffect } from "react"

import {
  loadSettings,
  saveSettings
} from "../utils/storage"

function ConfigPanel() {

  const [hourlyRate, setHourlyRate] = useState(10000)
  const [
  dailyTransportAid,
  setDailyTransportAid
  ] = useState(6500)

  useEffect(() => {

    const settings = loadSettings()

    setHourlyRate(settings.hourlyRate)
    
    setDailyTransportAid(
    settings.dailyTransportAid || 6500
    )

  }, [])

  const handleSave = () => {

    saveSettings({

    hourlyRate: Number(hourlyRate),

    dailyTransportAid:
    Number(dailyTransportAid)
    })

    alert("Configuración guardada")
  }

  return (

    <div className="bg-white rounded-2xl p-4 shadow-lg mb-6">

      <h2 className="text-2xl font-bold mb-4">
        Configuración
      </h2>

      <div className="flex flex-col md:flex-row gap-4 items-center">

        <div className="w-full">

          <label className="block mb-2 font-semibold">

            Valor hora

                </label>
                    <div className="w-full">

        <label className="block mb-2 font-semibold">

            Auxilio transporte diario

        </label>

        <input
            type="number"
            value={dailyTransportAid}
            onChange={(e) =>
            setDailyTransportAid(
                e.target.value
            )
            }
            className="w-full border rounded-lg p-2"
         />

        </div>
          <input
            type="number"
            value={hourlyRate}
            onChange={(e) =>
              setHourlyRate(e.target.value)
            }
            className="w-full border rounded-lg p-2"
          />

        </div>

        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-2 rounded-xl mt-6"
        >

          Guardar

        </button>

      </div>

    </div>
  )
}

export default ConfigPanel