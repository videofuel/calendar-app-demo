# Calendar App — Plan

## Brief
React + Vite single-page calendar app with month view, localStorage event persistence, and an add/edit/delete modal. No backend, no TypeScript, plain CSS only.

## Acceptance Criteria
- Month grid displays correct days for the current month, properly aligned by weekday
- Today's date is visually highlighted
- Prev/Next navigation changes the displayed month
- Clicking a day opens a modal pre-filled with that date
- Submitting the modal with a non-empty title adds the event to that day
- Event chips appear on the correct day cells
- Clicking a chip opens the modal pre-filled with that event's data
- Saving the modal in edit mode updates the event in place
- Clicking Delete in edit mode removes the event
- Empty title shows an inline error message; no event is saved
- All events survive a page refresh (localStorage persistence)

---

## Checklist

### Phase 1 — Scaffold
- [x] Scaffold Vite + React project: create package.json, vite.config.js, index.html, src/main.jsx
  - Acceptance: `npm run dev` starts a dev server with a blank React root
- [x] Create tasks/todo.md with checklist and acceptance criteria
  - Acceptance: this file exists

### Phase 2 — Utilities and Hook
- [x] Create src/utils/dateHelpers.js with buildCalendarGrid, formatMonthYear, toDateString, isToday, formatDisplayDate
  - Acceptance: buildCalendarGrid returns correct grid with proper leading/trailing slots
- [x] Create src/hooks/useEvents.js with load-from-localStorage on mount, addEvent, updateEvent, deleteEvent
  - Acceptance: events survive a page refresh

### Phase 3 — App Shell
- [x] Create src/App.css with global CSS resets and CSS custom properties
  - Acceptance: body has no default margin; --color-accent is defined
- [x] Create src/App.jsx with currentDate state, modalState, prev/next handlers, and useEvents wired up
  - Acceptance: App renders without errors

### Phase 4 — Calendar Component
- [x] Create src/components/Calendar.css with 7-column grid layout
  - Acceptance: .calendar-grid is display:grid with 7 equal columns and fixed row height
- [x] Create src/components/Calendar.jsx rendering the header, weekday labels, and grid of CalendarDay components
  - Acceptance: month view renders correct number of cells; weekday headers align with day numbers

### Phase 5 — CalendarDay Component
- [x] Create src/components/CalendarDay.css with cell, today highlight, other-month dimming, and chip styles
  - Acceptance: today's cell has a colored circle; chips are full-width within cell
- [x] Create src/components/CalendarDay.jsx rendering the day number and event chips
  - Acceptance: chips appear on correct days; chip click does not bubble to day click

### Phase 6 — EventModal Component
- [x] Create src/components/EventModal.css with overlay, modal box, form, and button styles
  - Acceptance: modal renders centered on screen with a dark overlay behind it
- [x] Create src/components/EventModal.jsx with controlled form, validation, save, delete, overlay-close, Escape-close
  - Acceptance: empty title shows error; valid submit calls onSave; delete calls onDelete; Escape closes modal

### Phase 7 — Integration
- [x] Wire Calendar -> CalendarDay -> EventModal in App.jsx for full add/edit/delete flow
  - Acceptance: full add/edit/delete flow works end to end
- [x] Verify localStorage persistence: add an event, refresh page, confirm it appears
  - Acceptance: event survives hard refresh

### Phase 8 — Polish
- [x] Add responsive CSS: at max-width 640px reduce grid row height and modal max-width
  - Acceptance: calendar is usable on a 375px-wide viewport
- [x] Add empty-state hint text beneath the grid when no events exist
  - Acceptance: hint appears on first load and disappears after first event is added

---

## Review

All 14 files created from scratch. Build passes with zero errors or warnings.

**What was built:**

| File | Purpose |
|------|---------|
| `package.json` / `vite.config.js` / `index.html` | React 19 + Vite 6 project scaffold |
| `src/main.jsx` | Mounts `<App>` into `#root` |
| `src/App.css` | Global reset + CSS custom properties (design tokens) |
| `src/App.jsx` | Root: owns `currentDate` and `modalState`, wires all handlers |
| `src/utils/dateHelpers.js` | Pure calendar math — `buildCalendarGrid`, `formatMonthYear`, `toDateString`, `isToday`, `formatDisplayDate` |
| `src/hooks/useEvents.js` | localStorage CRUD hook — `addEvent`, `updateEvent`, `deleteEvent` with auto-persist |
| `src/components/Calendar.jsx` + CSS | Month header, Prev/Next nav, weekday labels, 7-column CSS Grid |
| `src/components/CalendarDay.jsx` + CSS | Day cell, today highlight, event chips with `stopPropagation` |
| `src/components/EventModal.jsx` + CSS | Overlay modal — controlled form, inline validation, Escape/overlay-click close |

**Key decisions:**
- Dates stored as `YYYY-MM-DD` strings to avoid timezone shift bugs
- `modalState` as a single atomic object to prevent inconsistent intermediate renders
- `grid-auto-rows: 120px` (fixed) so event chips never expand cells
- Responsive breakpoint at 640px: smaller cells (80px) and full-width modal
