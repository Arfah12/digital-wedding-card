import { useEffect, useRef, useState } from 'react'

import Hero from './components/Hero'
import Countdown from './components/Countdown'
import Details from './components/Details'
import Location from './components/Location'
import RSVP from './components/RSVP'
import Wishes from './components/Wishes'
import Footer from './components/Footer'

import butterfly from './assets/butterfly_transparent.gif'
import weddingMusic from './assets/LAGU WEDDING.mp3'

import './App.css'

function App() {

  const [isOpened, setIsOpened] = useState(false)

  const bgMusicRef = useRef(null)

  // ==========================================
  // SCROLL REVEAL
  // ==========================================

  useEffect(() => {

    if (!isOpened) {
      return undefined
    }

    const textTargets = Array.from(
      document.querySelectorAll(`
        .section-label,
        .couple-content h2,
        .couple-story,
        .countdown-title,
        .countdown-number,
        .countdown-label,
        .details-title,
        .details-date,
        .event-timeline,
        .event-label,
        .event-time,
        .event-venue,
        .event-address,
        .location-title,
        .basmalah-text,
        .dress-code-paragraph,
        .dress-code-list li,
        .rsvp-title,
        .rsvp-description,
        .rsvp-deadline,
        .wishes-title,
        .wishes-description,
        .leave-wish-button,
        .footer-names,
        .footer-message,
        .footer-date,
        .footer-credit
      `)
    )

    if (textTargets.length === 0) {
      return undefined
    }

    const prefersReducedMotion =
      window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches

    textTargets.forEach((element) => {
      element.classList.add('scroll-reveal')
    })

    if (prefersReducedMotion) {

      textTargets.forEach((element) => {
        element.classList.add(
          'scroll-reveal-visible'
        )
      })

      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              'scroll-reveal-visible'
            )

            observer.unobserve(entry.target)
          }

        })

      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -10% 0px',
      }
    )

    textTargets.forEach((element) => {
      observer.observe(element)
    })

    return () => {
      observer.disconnect()
    }

  }, [isOpened])


  // ==========================================
  // OPEN INVITATION
  // ==========================================
const fadeInMusic = () => {
  const audio = bgMusicRef.current

  if (!audio) return

  audio.volume = 0
  audio.play().catch((error) => {
    console.warn(
      'Music could not be played:',
      error
    )
  })

  let volume = 0

  const fade = setInterval(() => {
    if (volume < 0.6) {
      volume += 0.03
      audio.volume = volume
    } else {
      audio.volume = 0.6
      clearInterval(fade)
    }
  }, 150)
}

const handleOpenInvitation = () => {

  if (bgMusicRef.current) {
    bgMusicRef.current.currentTime = 0
  }

  fadeInMusic()

  setIsOpened(true)

}


  // ==========================================
  // CREATE 10 BUTTERFLIES
  // ==========================================

  const gatheringButterflies = Array.from(
    { length: 10 },
    (_, index) => index
  )


  return (

    <div className="page-background">

      {/* ==========================================
          OPENING SCREEN
      ========================================== */}

   <div 
  className={`
    opening-screen 
    ${isOpened ? 'opening-screen-hidden' : ''}
  `}
>

        {/* ========================================
            BUTTERFLIES
        ======================================== */}

        <div className="opening-butterflies">

          {gatheringButterflies.map((index) => (

            <img
              key={index}
              src={butterfly}
              alt=""
              className={`
                opening-butterfly
                opening-butterfly-${index + 1}
              `}
            />

          ))}

        </div>


        {/* ==========================================
            OPENING CARD
        ========================================== */}

        <div className="opening-content">

          <div className="opening-flower">
            ✦
          </div>

          <p className="opening-label">
            THE ENGAGEMENT OF
          </p>

          <h1 className="opening-names">

            Iera

            <span>&amp;</span>

            Izz

          </h1>

          <p className="opening-date">
            26 · 12 · 2026
          </p>

          <div className="opening-divider">

            <span></span>

            <i>♡</i>

            <span></span>

          </div>

          <button
            type="button"
            className="open-invitation-button"
            onClick={handleOpenInvitation}
          >

            <span className="button-icon">
              ♡
            </span>

            Open Invitation

          </button>

          <p className="opening-hint">
            Tap to enter our special day
          </p>

        </div>

      </div>


      {/* ==========================================
          INVITATION CARD
      ========================================== */}

      <main
        className={`
          invitation-card
          ${
            isOpened
              ? 'invitation-card-visible'
              : 'invitation-card-hidden'
          }
        `}
      >

        <Hero />

        <Details />

        <Countdown />

        <RSVP />

        <Location />

        <Wishes />

        <Footer />

      </main>

      {isOpened && (
        <div className="global-snow-container" aria-hidden="true">
          {Array.from({ length: 35 }, (_, index) => index + 1).map((number) => (
            <span
              key={number}
              className={`snowflake snowflake-${number}`}
            >
              ❀
            </span>
          ))}
        </div>
      )}


      {/* ==========================================
          BACKGROUND MUSIC
      ========================================== */}

      <audio
        ref={bgMusicRef}
        src={weddingMusic}
        loop
        preload="auto"
      />

    </div>

  )
}

export default App