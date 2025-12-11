import React, { useMemo } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend } from 'chart.js'

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend)

const sampleProgress = () => {
  const labels = []
  const weights = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    labels.push(d.toLocaleDateString())
    weights.push(70 + Math.round(Math.sin(i / 2) * 1.5 + Math.random() * 0.8))
  }
  return { labels, weights }
}

export default function Dashboard({ user }) {
  const data = useMemo(() => sampleProgress(), [])

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Weight (kg)',
        data: data.weights,
        tension: 0.4,
        fill: false
      }
    ]
  }

  return (
    <section className="card">
      <h2>Dashboard</h2>
      <div className="metrics">
        <div className="metric">
          <h3>BMI</h3>
          <p>{calcBMI(user.weightKg, user.heightCm).toFixed(1)}</p>
        </div>
        <div className="metric">
          <h3>Daily Steps</h3>
          <p>{Math.floor(3000 + Math.random() * 7000)}</p>
        </div>
        <div className="metric">
          <h3>Calories</h3>
          <p>{Math.floor(1600 + Math.random() * 1000)}</p>
        </div>
      </div>

      <div className="chart-wrap">
        <Line data={chartData} />
      </div>
    </section>
  )
}

function calcBMI(weightKg = 70, heightCm = 170) {
  const m = heightCm / 100
  return weightKg / (m * m)
}