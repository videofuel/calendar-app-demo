import { useState, useEffect } from 'react'
import { formatDisplayDate } from '../utils/dateHelpers'
import './EventModal.css'

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
    <div className="modal-overlay" onClick={handleOverlayClick} onKeyDown={handleKeyDown} tabIndex={-1}>
      <div className="modal-box" role="dialog" aria-modal="true">
        <div className="modal-header">
          <div>
            <div className="modal-title">{isEditing ? 'Edit Event' : 'New Event'}</div>
            {selectedDate && (
              <div className="modal-date-label">{formatDisplayDate(selectedDate)}</div>
            )}
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">&#x2715;</button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group" style={{ marginBottom: '14px' }}>
            <label className="form-label" htmlFor="event-title">Title *</label>
            <input
              id="event-title"
              className={`form-input${error ? ' has-error' : ''}`}
              type="text"
              value={form.title}
              onChange={e => handleChange('title', e.target.value)}
              placeholder="Add a title"
              autoFocus
            />
            {error && <span className="form-error">{error}</span>}
          </div>

          <div className="form-row" style={{ marginBottom: '14px' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="event-date">Date</label>
              <input
                id="event-date"
                className="form-input"
                type="date"
                value={selectedDate || ''}
                readOnly
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="event-time">Time</label>
              <input
                id="event-time"
                className="form-input"
                type="time"
                value={form.time}
                onChange={e => handleChange('time', e.target.value)}
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '4px' }}>
            <label className="form-label" htmlFor="event-description">Description</label>
            <textarea
              id="event-description"
              className="form-textarea"
              value={form.description}
              onChange={e => handleChange('description', e.target.value)}
              placeholder="Optional notes"
            />
          </div>

          <div className="modal-footer">
            <div>
              {isEditing && (
                <button type="button" className="btn-danger" onClick={() => onDelete(event.id)}>
                  Delete
                </button>
              )}
            </div>
            <div className="modal-footer-right">
              <button type="submit" className="btn-primary">
                {isEditing ? 'Save Changes' : 'Add Event'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
