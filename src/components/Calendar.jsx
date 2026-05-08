import { buildCalendarGrid, formatMonthYear, isToday } from '../utils/dateHelpers'
import CalendarDay from './CalendarDay'
import './Calendar.css'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function Calendar({ currentDate, events, onPrevMonth, onNextMonth, onDayClick, onEventClick }) {
  const grid = buildCalendarGrid(currentDate)

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button className="calendar-nav-btn" onClick={onPrevMonth}>&#8249;</button>
        <h1 className="calendar-title">{formatMonthYear(currentDate)}</h1>
        <button className="calendar-nav-btn" onClick={onNextMonth}>&#8250;</button>
      </div>

      <div className="calendar-weekdays">
        {WEEKDAYS.map(day => <span key={day}>{day}</span>)}
      </div>

      <div className="calendar-grid">
        {grid.map((cell, i) => {
          const cellEvents = cell.dateStr
            ? events.filter(e => e.date === cell.dateStr)
            : []
          return (
            <CalendarDay
              key={i}
              dateStr={cell.dateStr}
              dayNumber={cell.dayNumber}
              isCurrentMonth={cell.isCurrentMonth}
              isToday={cell.dateStr ? isToday(cell.dateStr) : false}
              events={cellEvents}
              onDayClick={onDayClick}
              onEventClick={onEventClick}
            />
          )
        })}
      </div>

      {events.length === 0 && (
        <p className="calendar-empty-state">Click any day to add an event</p>
      )}
    </div>
  )
}
