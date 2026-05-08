import { useState, useEffect } from 'react'

const STORAGE_KEY = 'calendar_events'

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function persist(events) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events))
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6)
}

export function useEvents() {
  const [events, setEvents] = useState(loadFromStorage)

  useEffect(() => {
    persist(events)
  }, [events])

  function addEvent({ title, date, time, description }) {
    const event = { id: generateId(), title, date, time, description }
    setEvents(prev => [...prev, event])
  }

  function updateEvent(updated) {
    setEvents(prev => prev.map(e => (e.id === updated.id ? updated : e)))
  }

  function deleteEvent(id) {
    setEvents(prev => prev.filter(e => e.id !== id))
  }

  return { events, addEvent, updateEvent, deleteEvent }
}
