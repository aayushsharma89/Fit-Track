import React, { useState, useEffect } from 'react'
import Dashboard from './components/Dashboard'
import WorkoutPlanner from './components/WorkoutPlanner'
import CalorieTracker from './components/CalorieTracker'
import ActivityLogger from './components/ActivityLogger'

function App() {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('fittrack_user')
    return raw ? JSON.parse(raw) : { name: 'Guest', age: 25, heightCm: 170, weightKg: 70 }
  })

  useEffect(() => {
    localStorage.setItem('fittrack_user', JSON.stringify(user))
  }, [user])

  return (
    <div className="app-root">
      <header className="app-header">
        <h1>FitTrack</h1>
        <div className="user-box">
          <strong>{user.name}</strong>
          <small>{user.age} yrs</small>
        </div>
      </header>

      <main className="app-main">
        <div className="left-col">
          <Dashboard user={user} setUser={setUser} />
          <ActivityLogger />
        </div>

        <div className="right-col">
          <WorkoutPlanner />
          <CalorieTracker />
        </div>
      </main>

      <footer className="app-footer">Built with ❤️ — Aayush Sharma</footer>
    </div>
  )
}

export default App

