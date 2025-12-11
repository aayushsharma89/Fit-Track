import React, { useState } from 'react'

const defaultWorkouts = [
  { id: 1, name: 'Full Body HIIT', timeMin: 25 },
  { id: 2, name: 'Upper Body Strength', timeMin: 40 },
  { id: 3, name: 'Yoga Flow', timeMin: 30 }
]

export default function WorkoutPlanner() {
  const [plans, setPlans] = useState(() => {
    const raw = localStorage.getItem('fittrack_plans')
    return raw ? JSON.parse(raw) : defaultWorkouts
  })

  function addPlan(e) {
    e.preventDefault()
    const form = e.target
    const name = form.name.value
    const timeMin = Number(form.timeMin.value)
    const item = { id: Date.now(), name, timeMin }
    setPlans(prev => [item, ...prev])
    form.reset()
  }

  function remove(id) {
    setPlans(prev => prev.filter(p => p.id !== id))
  }

  return (
    <section className="card">
      <h2>Workout Planner</h2>
      <form onSubmit={addPlan} className="plan-form">
        <input name="name" placeholder="Workout name" required />
        <input name="timeMin" type="number" placeholder="Minutes" required />
        <button type="submit">Add</button>
      </form>

      <ul className="plans">
        {plans.map(p => (
          <li key={p.id}>
            <div>
              <strong>{p.name}</strong>
              <small>{p.timeMin} min</small>
            </div>
            <button className="btn-link" onClick={() => remove(p.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </section>
  )
}