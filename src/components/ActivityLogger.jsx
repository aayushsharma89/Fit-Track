import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

const storageKey = 'fittrack_activities'

export default function ActivityLogger() {
  const [activities, setActivities] = useState(() => {
    const raw = localStorage.getItem(storageKey)
    return raw ? JSON.parse(raw) : []
  })
  const [form, setForm] = useState({ type: 'Walking', durationMin: 30, calories: 120 })

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(activities))
  }, [activities])

  function addActivity(e) {
    e.preventDefault()
    const item = { id: uuidv4(), ...form, date: new Date().toISOString() }
    setActivities(prev => [item, ...prev])
  }

  function remove(id) {
    setActivities(prev => prev.filter(a => a.id !== id))
  }

  return (
    <section className="card">
      <h2>Activity Logger</h2>
      <form onSubmit={addActivity} className="activity-form">
        <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
          <option>Walking</option>
          <option>Running</option>
          <option>Cycling</option>
          <option>Yoga</option>
          <option>Gym</option>
        </select>
        <input type="number" value={form.durationMin} onChange={e => setForm(f => ({ ...f, durationMin: Number(e.target.value) }))} min="1" />
        <input type="number" value={form.calories} onChange={e => setForm(f => ({ ...f, calories: Number(e.target.value) }))} min="0" />
        <button type="submit">Add</button>
      </form>

      <ul className="activity-list">
        {activities.length === 0 && <li className="muted">No activities yet — add one!</li>}
        {activities.map(a => (
          <li key={a.id}>
            <div>
              <strong>{a.type}</strong>
              <small>{new Date(a.date).toLocaleString()}</small>
            </div>
            <div className="meta">{a.durationMin} min • {a.calories} kcal</div>
            <button className="btn-link" onClick={() => remove(a.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </section>
  )
}
