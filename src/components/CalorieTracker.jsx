import React, { useState, useEffect } from 'react'

const storageKey = 'fittrack_foods'

export default function CalorieTracker() {
  const [foods, setFoods] = useState(() => {
    const raw = localStorage.getItem(storageKey)
    return raw ? JSON.parse(raw) : []
  })
  const [form, setForm] = useState({ name: '', calories: 200 })

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(foods))
  }, [foods])

  function add(e) {
    e.preventDefault()
    setFoods(prev => [{ id: Date.now(), ...form, date: new Date().toISOString() }, ...prev])
    setForm({ name: '', calories: 200 })
  }

  function remove(id) {
    setFoods(prev => prev.filter(f => f.id !== id))
  }

  const total = foods.reduce((s, f) => s + Number(f.calories), 0)

  return (
    <section className="card">
      <h2>Calorie Tracker</h2>
      <form onSubmit={add} className="calorie-form">
        <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Food item" required />
        <input type="number" value={form.calories} onChange={e => setForm(f => ({ ...f, calories: Number(e.target.value) }))} min="0" required />
        <button type="submit">Add</button>
      </form>

      <div className="calorie-summary">Today: <strong>{total} kcal</strong></div>

      <ul className="food-list">
        {foods.map(f => (
          <li key={f.id}>
            <div>
              <strong>{f.name}</strong>
              <small>{new Date(f.date).toLocaleTimeString()}</small>
            </div>
            <div className="meta">{f.calories} kcal</div>
            <button className="btn-link" onClick={() => remove(f.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </section>
  )
}
