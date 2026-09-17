import { useState } from 'react'

import {
  collection,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore'

import db from '../firebase/firestore'
import butterfly from '../assets/butterfly_transparent.gif'

import './RSVP.css'


function RSVP() {

  const [name, setName] = useState('')

  const [attendance, setAttendance] = useState('')

  const [guests, setGuests] = useState('1')

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [submitted, setSubmitted] = useState(false)


  const handleSubmit = async (event) => {

    event.preventDefault()


    if (!name.trim() || !attendance) {
      return
    }


    setIsSubmitting(true)


    try {

      await addDoc(
        collection(db, 'rsvps'),
        {
          name: name.trim(),

          attendance,

          guests:
            attendance === 'Hadir'
              ? Number(guests)
              : 0,

          createdAt:
            serverTimestamp(),
        }
      )


      setSubmitted(true)

      setName('')

      setAttendance('')

      setGuests('1')


    } catch (error) {

      console.error(
        'Error submitting RSVP:',
        error
      )

      alert(
        'Sorry, your RSVP could not be submitted. Please try again.'
      )

    } finally {

      setIsSubmitting(false)

    }

  }


  return (

    <section
      className="rsvp-section"
      id="rsvp"
    >

      <div className="section-butterflies" aria-hidden="true">
        <img src={butterfly} alt="" className="section-butterfly section-butterfly-left" />
        <img src={butterfly} alt="" className="section-butterfly section-butterfly-right" />
      </div>

      <div className="rsvp-container">


        <p className="section-label">
          RSVP
        </p>


        <h2 className="rsvp-title">
          Will You Join Us?
        </h2>


        <p className="rsvp-description">
          We would be delighted to celebrate
          this special moment with you.
        </p>


        <div className="rsvp-deadline">

          <span>💌</span>

          <p>
            Please RSVP by
            <strong>
              {' '}5 December 2026
            </strong>
          </p>

        </div>


        {submitted ? (

          <div className="rsvp-success">

            <div className="success-icon">
              💜
            </div>

            <h3>
              Thank You!
            </h3>

            <p>
              Your RSVP has been received.
              We can't wait to celebrate
              with you!
            </p>

            <button
              type="button"
              onClick={() =>
                setSubmitted(false)
              }
            >
              Submit Another RSVP
            </button>

          </div>

        ) : (

          <form
            className="rsvp-form"
            onSubmit={handleSubmit}
          >


            {/* NAME */}

            <div className="rsvp-form-group">

              <label htmlFor="rsvp-name">
                Your Name
              </label>

              <input
                id="rsvp-name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                required
              />

            </div>


            {/* ATTENDANCE */}

            <div className="rsvp-form-group">

              <label>
                Will you be attending?
              </label>

              <div className="attendance-options">

                <label
                  className={
                    attendance === 'Hadir'
                      ? 'attendance-option active'
                      : 'attendance-option'
                  }
                >

                  <input
                    type="radio"
                    name="attendance"
                    value="Hadir"
                    checked={
                      attendance === 'Hadir'
                    }
                    onChange={(event) =>
                      setAttendance(
                        event.target.value
                      )
                    }
                  />

                  <span>
                    💜 Yes, I'll Be There
                  </span>

                </label>


                <label
                  className={
                    attendance === 'Tidak Hadir'
                      ? 'attendance-option active'
                      : 'attendance-option'
                  }
                >

                  <input
                    type="radio"
                    name="attendance"
                    value="Tidak Hadir"
                    checked={
                      attendance ===
                      'Tidak Hadir'
                    }
                    onChange={(event) =>
                      setAttendance(
                        event.target.value
                      )
                    }
                  />

                  <span>
                    🤍 Sorry, I Can't Attend
                  </span>

                </label>

              </div>

            </div>


            {/* NUMBER OF GUESTS */}

            {attendance === 'Hadir' && (

              <div className="rsvp-form-group">

                <label htmlFor="guests">
                  Number of Guests
                </label>

                <select
                  id="guests"
                  value={guests}
                  onChange={(event) =>
                    setGuests(
                      event.target.value
                    )
                  }
                >

                  <option value="1">
                    1 Guest
                  </option>

                  <option value="2">
                    2 Guests
                  </option>

                  <option value="3">
                    3 Guests
                  </option>

                  <option value="4">
                    4 Guests
                  </option>

                  
                  <option value="5">
                    5 Guests
                  </option>


                </select>

              </div>

            )}


            {/* SUBMIT */}

            <button
              type="submit"
              className="rsvp-submit-button"
              disabled={isSubmitting}
            >

              {isSubmitting
                ? 'Sending...'
                : 'Send RSVP 💌'
              }

            </button>


          </form>

        )}

      </div>

    </section>

  )
}


export default RSVP