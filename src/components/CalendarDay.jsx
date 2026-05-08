import './CalendarDay.css'

export default function CalendarDay({ dateStr, dayNumber, isCurrentMonth, isToday, events, onDayClick, onEventClick }) {
  if (!dateStr) {
    return <div className="day-cell empty-cell" />
  }

  function handleChipClick(e, event) {
    e.stopPropagation()
    onEventClick(event)
  }

  const classNames = ['day-cell']
  if (!isCurrentMonth) classNames.push('other-month')
  if (isToday) classNames.push('is-today')

  return (
    <div className={classNames.join(' ')} onClick={() => onDayClick(dateStr)}>
      <span className="day-number">{dayNumber}</span>
      {events.map(event => (
        <button
          key={event.id}
          className="event-chip"
          onClick={e => handleChipClick(e, event)}
          title={event.title}
        >
          {event.time ? `${event.time} ${event.title}` : event.title}
        </button>
      ))}
    </div>
  )
}
