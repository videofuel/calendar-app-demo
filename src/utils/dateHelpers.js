export function toDateString(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function isToday(dateStr) {
  return dateStr === toDateString(new Date())
}

export function formatMonthYear(date) {
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

export function formatDisplayDate(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

export function buildCalendarGrid(date) {
  const year = date.getFullYear()
  const month = date.getMonth()

  const firstDay = new Date(year, month, 1)
  const startDayOfWeek = firstDay.getDay() // 0=Sun..6=Sat
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells = []

  // Leading empty slots
  for (let i = 0; i < startDayOfWeek; i++) {
    cells.push({ dateStr: null, dayNumber: null, isCurrentMonth: false })
  }

  // Days of month
  for (let d = 1; d <= daysInMonth; d++) {
    const cellDate = new Date(year, month, d)
    cells.push({ dateStr: toDateString(cellDate), dayNumber: d, isCurrentMonth: true })
  }

  // Trailing empty slots to fill out the last week row
  while (cells.length % 7 !== 0) {
    cells.push({ dateStr: null, dayNumber: null, isCurrentMonth: false })
  }

  return cells
}
