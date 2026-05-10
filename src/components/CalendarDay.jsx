const MAX_VISIBLE = 3

const CHIP_COLORS = [
  '#1a73e8', '#0b8043', '#8e24aa',
  '#e67c73', '#f4511e', '#33b679', '#039be5',
]

function getChipColor(id) {
  let hash = 0
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) & 0xffffffff
  }
  return CHIP_COLORS[Math.abs(hash) % CHIP_COLORS.length]
}

export default function CalendarDay({ dateStr, dayNumber, isCurrentMonth, isToday, isWeekend, events, onDayClick, onEventClick }) {
  if (!dateStr) {
    return <div className="border-r border-b border-gray-200 p-1 overflow-hidden flex flex-col gap-0.5 cursor-default bg-gray-100" />
  }

  const visible = events.slice(0, MAX_VISIBLE)
  const overflow = events.length - MAX_VISIBLE

  const cellCls = [
    'border-r border-b border-gray-200 p-1 cursor-pointer overflow-hidden flex flex-col gap-0.5 transition-colors',
    !isCurrentMonth
      ? 'bg-gray-50'
      : isWeekend
        ? 'bg-gray-50 hover:bg-gray-100'
        : 'bg-white hover:bg-gray-50',
  ].join(' ')

  const dayNumCls = [
    'text-[0.78rem] w-6 h-6 flex items-center justify-center rounded-full',
    isToday
      ? 'bg-[#1a73e8] text-white font-bold'
      : !isCurrentMonth
        ? 'text-gray-400 font-medium'
        : 'text-gray-900 font-medium',
  ].join(' ')

  return (
    <div className={cellCls} onClick={() => onDayClick(dateStr)}>
      <div className="flex justify-center py-0.5 shrink-0">
        <span className={dayNumCls}>{dayNumber}</span>
      </div>
      <div className="flex flex-col gap-0.5 overflow-hidden flex-1 min-h-0">
        {visible.map(event => (
          <button
            key={event.id}
            className="text-white border-none rounded-[3px] px-1.5 py-0.5 text-[0.7rem] font-medium text-left cursor-pointer w-full truncate transition hover:brightness-90 shrink-0 leading-relaxed"
            style={{ background: getChipColor(event.id) }}
            onClick={e => { e.stopPropagation(); onEventClick(event) }}
            title={event.title}
          >
            {event.time ? `${event.time} ${event.title}` : event.title}
          </button>
        ))}
        {overflow > 0 && (
          <button
            className="bg-transparent border-none text-gray-500 text-[0.68rem] font-semibold px-1.5 py-px cursor-pointer text-left rounded-sm transition-colors hover:bg-gray-100 hover:text-gray-900 shrink-0"
            onClick={e => e.stopPropagation()}
          >
            +{overflow} more
          </button>
        )}
      </div>
    </div>
  )
}
