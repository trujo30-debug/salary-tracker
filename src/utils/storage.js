const STORAGE_KEY = "salary_tracker_shifts"

export function loadShifts() {

  const saved = localStorage.getItem(STORAGE_KEY)

  return saved ? JSON.parse(saved) : []
}

export function saveShift(newShift) {

  const shifts = loadShifts()

  const existingIndex = shifts.findIndex(
    shift => shift.selectedDate === newShift.selectedDate
  )

  // Si ya existe ese día → reemplazar
  if (existingIndex !== -1) {

    shifts[existingIndex] = newShift

  } else {

    shifts.push(newShift)
  }

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(shifts)
  )
}
const SETTINGS_KEY = "salary_tracker_settings"

export function loadSettings() {

  const saved = localStorage.getItem(SETTINGS_KEY)

  return saved
    ? JSON.parse(saved)
    : {
        hourlyRate: 10000,
        dailyTransportAid: 6500
      }
}

export function saveSettings(settings) {

  localStorage.setItem(
    SETTINGS_KEY,
    JSON.stringify(settings)
  )
}
export function getShiftByDate(date) {

  const shifts = loadShifts()

  return shifts.find(
    shift => shift.selectedDate === date
  )
}
export function deleteShift(date) {

  const shifts = loadShifts()

  const filtered = shifts.filter(
    shift => shift.selectedDate !== date
  )

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(filtered)
  )
}