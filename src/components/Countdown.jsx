import { useEffect, useState } from 'react'
import weddingData from '../data/weddingData'
import butterfly from '../assets/butterfly_transparent.gif'
import './Countdown.css'

function Countdown() {
  const calculateTimeLeft = () => {
    const targetDate = new Date(weddingData.engagementDateTime).getTime()
    const now = new Date().getTime()
    const difference = targetDate - now

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    }
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const timeUnits = [
    { label: 'Days', value: String(timeLeft.days) },
    { label: 'Hours', value: String(timeLeft.hours).padStart(2, '0') },
    { label: 'Minutes', value: String(timeLeft.minutes).padStart(2, '0') },
    { label: 'Seconds', value: String(timeLeft.seconds).padStart(2, '0') },
  ]

  return (
    <section className="countdown-section" id="countdown">
      {/* Decorative Butterflies */}
      <div className="countdown-butterfly countdown-butterfly-one">
        <img src={butterfly} alt="" aria-hidden="true" />
      </div>
      <div className="countdown-butterfly countdown-butterfly-two">
        <img src={butterfly} alt="" aria-hidden="true" />
      </div>
      <div className="countdown-butterfly countdown-butterfly-three">
        <img src={butterfly} alt="" aria-hidden="true" />
      </div>
      <div className="countdown-butterfly countdown-butterfly-four">
        <img src={butterfly} alt="" aria-hidden="true" />
      </div>

      {/* Glass Container */}
      <div className="countdown-container">
        <p className="section-label">Counting Down to Our Day</p>
        <h2 className="countdown-title">A Special Moment Awaits</h2>

        <div className="countdown-grid">
          {timeUnits.map((unit) => (
            <div key={unit.label} className="countdown-item">
              <span className="countdown-number">{unit.value}</span>
              <span className="countdown-label">{unit.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Countdown