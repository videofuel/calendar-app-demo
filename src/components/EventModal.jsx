import { useState, useEffect } from 'react'
import { formatDisplayDate } from '../utils/dateHelpers'

const EMPTY_FORM = { title: '', time: '', description: '' }

export default function EventModal({ isOpen, selectedDate, event, onSave, onDelete, onClose }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isOpen) return
    if (event) {
      setForm({ title: event.title, time: event.time, description: event.description })
    } else {
      setForm(EMPTY_FORM)
    }
    setError('')
  }, [isOpen, event?.id])

  if (!isOpen) return null

  function handleChange(field, value) {
    setForm(f => ({ ...f, [field]: value }))
    if (field === 'title') setError('')
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.title.trim()) {
      setError('Event title is required.')
      return
    }
    onSave({
      id: event?.id,
      title: form.title.trim(),
      date: selectedDate,
      time: form.time,
      description: form.description,
    })
  }

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) onClose()
  }

  function handleKeyDown(e) {
    if (e.key === 'Escape') onClose()
  }

  const isEditing = Boolean(event)

  return (
    <div
      className="fixed inset-0 bg-black/45 flex items-center justify-center z-[1000]"
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div className="bg-white rounded-xl px-8 py-7 w-full max-w-[440px] mx-4 shadow-2xl flex flex-col gap-[18px]" role="dialog" aria-modal="true">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-base font-bold text-gray-900">{isEditing ? 'Edit Event' : 'New Event'}</div>
            {selectedDate && (
              <div className="text-[0.8rem] text-gray-500 mt-0.5">{formatDisplayDate(selectedDate)}</div>
            )}
          </div>
          <button
            className="bg-transparent border-none text-2xl cursor-pointer text-gray-500 leading-none px-1.5 py-0.5 rounded transition-colors hover:bg-gray-100"
            onClick={onClose}
            aria-label="Close"
          >
            &#x2715;
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3.5">
          <div className="flex flex-col gap-1.5">
            <label className="text-[0.72rem] font-semibold text-gray-500 uppercase tracking-[0.06em]" htmlFor="event-title">Title *</label>
            <input
              id="event-title"
              className={`border rounded px-3 py-2 text-[0.95rem] w-full text-gray-900 outline-none transition-colors focus:border-[#1a73e8] ${error ? 'border-red-600' : 'border-gray-200'}`}
              type="text"
              value={form.title}
              onChange={e => handleChange('title', e.target.value)}
              placeholder="Add a title"
              autoFocus
            />
            {error && <span className="text-[0.78rem] text-red-600">{error}</span>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-[0.72rem] font-semibold text-gray-500 uppercase tracking-[0.06em]" htmlFor="event-date">Date</label>
              <input
                id="event-date"
                className="border border-gray-200 rounded px-3 py-2 text-[0.95rem] w-full text-gray-900 outline-none"
                type="date"
                value={selectedDate || ''}
                readOnly
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[0.72rem] font-semibold text-gray-500 uppercase tracking-[0.06em]" htmlFor="event-time">Time</label>
              <input
                id="event-time"
                className="border border-gray-200 rounded px-3 py-2 text-[0.95rem] w-full text-gray-900 outline-none transition-colors focus:border-[#1a73e8]"
                type="time"
                value={form.time}
                onChange={e => handleChange('time', e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[0.72rem] font-semibold text-gray-500 uppercase tracking-[0.06em]" htmlFor="event-description">Description</label>
            <textarea
              id="event-description"
              className="border border-gray-200 rounded px-3 py-2 text-[0.95rem] w-full text-gray-900 outline-none transition-colors focus:border-[#1a73e8] resize-y min-h-[72px]"
              value={form.description}
              onChange={e => handleChange('description', e.target.value)}
              placeholder="Optional notes"
            />
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-gray-200">
            <div>
              {isEditing && (
                <button
                  type="button"
                  className="bg-transparent text-red-600 border border-red-600 rounded px-4 py-[9px] text-sm font-semibold cursor-pointer transition-colors hover:bg-red-600 hover:text-white"
                  onClick={() => onDelete(event.id)}
                >
                  Delete
                </button>
              )}
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-[#1a73e8] text-white border-none rounded px-[22px] py-[9px] text-sm font-semibold cursor-pointer transition-opacity hover:opacity-90"
              >
                {isEditing ? 'Save Changes' : 'Add Event'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
