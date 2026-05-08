import { useState } from 'react'
import { useEvents } from './hooks/useEvents'
import Calendar from './components/Calendar'
import EventModal from './components/EventModal'

const CLOSED_MODAL = { isOpen: false, selectedDate: null, event: null }

export default function App() {
  const [currentDate, setCurrentDate] = useState(() => {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), 1)
  })
  const [modalState, setModalState] = useState(CLOSED_MODAL)
  const { events, addEvent, updateEvent, deleteEvent } = useEvents()

  function handlePrevMonth() {
    setCurrentDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1))
  }

  function handleNextMonth() {
    setCurrentDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1))
  }

  function handleDayClick(dateStr) {
    setModalState({ isOpen: true, selectedDate: dateStr, event: null })
  }

  function handleEventClick(event) {
    setModalState({ isOpen: true, selectedDate: event.date, event })
  }

  function handleModalClose() {
    setModalState(CLOSED_MODAL)
  }

  function handleSave({ id, title, date, time, description }) {
    if (modalState.event) {
      updateEvent({ id, title, date, time, description })
    } else {
      addEvent({ title, date, time, description })
    }
    setModalState(CLOSED_MODAL)
  }

  function handleDelete(id) {
    deleteEvent(id)
    setModalState(CLOSED_MODAL)
  }

  return (
    <>
      <Calendar
        currentDate={currentDate}
        events={events}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        onDayClick={handleDayClick}
        onEventClick={handleEventClick}
      />
      <EventModal
        isOpen={modalState.isOpen}
        selectedDate={modalState.selectedDate}
        event={modalState.event}
        onSave={handleSave}
        onDelete={handleDelete}
        onClose={handleModalClose}
      />
    </>
  )
}
