import { buildCalendarGrid, formatMonthYear, isToday } from '../utils/dateHelpers'
import CalendarDay from './CalendarDay'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function Calendar({ currentDate, events, onPrevMonth, onNextMonth, onDayClick, onEventClick }) {
  const grid = buildCalendarGrid(currentDate)

  return (
    <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-gray-200 shrink-0">
        <button
          className="bg-transparent border border-gray-200 rounded-full w-8 h-8 cursor-pointer text-base text-gray-500 flex items-center justify-center hover:bg-gray-100 transition-colors shrink-0"
          onClick={onPrevMonth}
        >
          &#8249;
        </button>
        <button
          className="bg-transparent border border-gray-200 rounded-full w-8 h-8 cursor-pointer text-base text-gray-500 flex items-center justify-center hover:bg-gray-100 transition-colors shrink-0"
          onClick={onNextMonth}
        >
          &#8250;
        </button>
        <h1 className="text-xl font-normal text-gray-900 min-w-[150px]">{formatMonthYear(currentDate)}</h1>
      </div>

      <div className="grid grid-cols-7 bg-gray-800 shrink-0">
        {WEEKDAYS.map(day => (
          <span key={day} className="py-2.5 text-center text-[0.68rem] font-semibold text-white uppercase tracking-widest">
            {day}
          </span>
        ))}
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-7 auto-rows-fr border-l border-t border-gray-200 overflow-hidden">
        {grid.map((cell, i) => {
          const colIndex = i % 7
          const isWeekend = colIndex === 0 || colIndex === 6
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
              isWeekend={isWeekend}
              events={cellEvents}
              onDayClick={onDayClick}
              onEventClick={onEventClick}
            />
          )
        })}
      </div>
    </div>
  )
}
