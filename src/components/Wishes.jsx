import { useEffect, useState } from 'react'

import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore'

import db from '../firebase/firestore'
import butterfly from '../assets/butterfly_transparent.gif'

import './Wishes.css'


function Wishes() {

  // ==========================================
  // FLOWER EMOJIS
  // ==========================================

  const flowerEmojis = [
    '🌸',
    '🌷',
    '🌹',
    '🌺',
    '🌼',
    '💐',
    '🪻',
  ]


  // ==========================================
  // STATES
  // ==========================================

  const [showForm, setShowForm] = useState(false)

  const [selectedWish, setSelectedWish] = useState(null)

  const [name, setName] = useState('')

  const [message, setMessage] = useState('')

  const [wishes, setWishes] = useState([])


  // ==========================================
  // LOAD WISHES FROM FIRESTORE
  // ==========================================

  useEffect(() => {

    const loadWishes = async () => {

      try {

        const wishesQuery = query(
          collection(db, 'wishes'),
          orderBy('createdAt', 'desc')
        )

        const snapshot = await getDocs(
          wishesQuery
        )

        const firestoreWishes =
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))

        setWishes(firestoreWishes)

      } catch (error) {

        console.error(
          'Error loading wishes:',
          error
        )

      }

    }

    loadWishes()

  }, [])


  // ==========================================
  // CREATE SHORT PREVIEW
  // ==========================================

  const getPreview = (
    text,
    limit = 100
  ) => {

    if (!text) {
      return ''
    }

    if (text.length <= limit) {
      return text
    }

    return (
      text.substring(0, limit) +
      '...'
    )

  }


  // ==========================================
  // SUBMIT NEW WISH
  // ==========================================

  const handleSubmit = async (event) => {

    event.preventDefault()

    if (
      !name.trim() ||
      !message.trim()
    ) {
      return
    }


    // RANDOM FLOWER

    const randomFlower =
      flowerEmojis[
        Math.floor(
          Math.random() *
          flowerEmojis.length
        )
      ]


    try {

      // SAVE TO FIRESTORE

      const docRef = await addDoc(
        collection(db, 'wishes'),
        {
          name: name.trim(),

          message: message.trim(),

          flower: randomFlower,

          createdAt:
            serverTimestamp(),
        }
      )


      // ADD NEW WISH

      const newWish = {

        id: docRef.id,

        name: name.trim(),

        message: message.trim(),

        flower: randomFlower,

      }


      setWishes(
        (currentWishes) => [
          newWish,
          ...currentWishes,
        ]
      )


      // RESET FORM

      setName('')

      setMessage('')

      setShowForm(false)


    } catch (error) {

      console.error(
        'Error adding wish:',
        error
      )

      alert(
        'Sorry, your wish could not be sent. Please try again.'
      )

    }

  }


  // ==========================================
  // WISH CARD
  // ==========================================

  const WishCard = ({ wish }) => {

    if (!wish) {
      return null
    }


    const isLong =
      wish.message &&
      wish.message.length > 100


    return (

      <div className="wish-card">

        {/* FLOWER */}

        <div className="wish-flower">

          {wish.flower}

        </div>


        {/* MESSAGE */}

        <p className="wish-message">

          "{getPreview(
            wish.message
          )}"

        </p>


        {/* READ MORE */}

        {isLong && (

          <button
            type="button"
            className="read-more-button"
            onClick={() =>
              setSelectedWish(wish)
            }
          >

            Read more

          </button>

        )}


        {/* NAME */}

        <p className="wish-name">

          — {wish.name}

        </p>

      </div>

    )

  }


  // ==========================================
  // PAGE
  // ==========================================

  return (

    <section
      className="wishes-section"
      id="wishes"
    >

      <div className="section-butterflies" aria-hidden="true">
        <img src={butterfly} alt="" className="section-butterfly section-butterfly-left" />
        <img src={butterfly} alt="" className="section-butterfly section-butterfly-right" />
      </div>

      <div className="wishes-container">


        {/* SECTION HEADING */}

        <p className="section-label">

          WITH LOVE

        </p>


        <h2 className="wishes-title">

          Wishes For Us

        </h2>


        <p className="wishes-description">

          Leave your wishes and blessings
          for the happy couple.

        </p>


        {/* LEAVE WISH BUTTON */}

        <button
          type="button"
          className="leave-wish-button"
          onClick={() =>
            setShowForm(true)
          }
        >

          💌 Leave a Wish

        </button>


        {/* ==================================
            MOVING CAROUSEL
        ================================== */}

        {wishes.length === 0 ? (

          <div className="no-wishes">

            <div className="no-wishes-flower">

              🌸

            </div>

            <p>

              Be the first to leave
              a wish for Iera & Izz.

            </p>

          </div>

        ) : (

          <div className="wish-carousel">

            <div className="wish-carousel-track">

              {/* FIRST SET */}

              {wishes.map((wish) => (

                <WishCard
                  key={`first-${wish.id}`}
                  wish={wish}
                />

              ))}


              {/* DUPLICATE SET */}

              {wishes.map((wish) => (

                <WishCard
                  key={`second-${wish.id}`}
                  wish={wish}
                />

              ))}

            </div>

          </div>

        )}


        {/* ==================================
            LEAVE WISH FORM
        ================================== */}

        {showForm && (

          <div className="wish-form-overlay">

            <div className="wish-form-card">


              {/* CLOSE */}

              <button
                type="button"
                className="close-button"
                onClick={() =>
                  setShowForm(false)
                }
              >

                ×

              </button>


              {/* TITLE */}

              <h3>

                Leave a Wish 💜

              </h3>


              <form
                onSubmit={handleSubmit}
              >


                {/* NAME */}

                <div className="form-group">

                  <label htmlFor="name">

                    Your Name

                  </label>


                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(event) =>
                      setName(
                        event.target.value
                      )
                    }
                    placeholder="Enter your name"
                    maxLength="50"
                    required
                  />

                </div>


                {/* MESSAGE */}

                <div className="form-group">

                  <label htmlFor="message">

                    Your Wish

                  </label>


                  <textarea
                    id="message"
                    value={message}
                    onChange={(event) =>
                      setMessage(
                        event.target.value
                      )
                    }
                    placeholder="Write your wishes..."
                    rows="5"
                    maxLength="500"
                    required
                  />

                </div>


                {/* SEND */}

                <button
                  type="submit"
                  className="send-wish-button"
                >

                  Send Wish

                </button>


              </form>

            </div>

          </div>

        )}


        {/* ==================================
            READ MORE MODAL
        ================================== */}

        {selectedWish && (

          <div className="wish-form-overlay">

            <div className="wish-form-card read-wish-card">


              {/* CLOSE */}

              <button
                type="button"
                className="close-button"
                onClick={() =>
                  setSelectedWish(null)
                }
              >

                ×

              </button>


              {/* FLOWER */}

              <div className="full-wish-flower">

                {selectedWish.flower}

              </div>


              {/* TITLE */}

              <h3>

                A Wish For Iera & Izz

              </h3>


              {/* FULL MESSAGE */}

              <p className="full-wish-message">

                "{selectedWish.message}"

              </p>


              {/* NAME */}

              <p className="full-wish-name">

                — {selectedWish.name}

              </p>

            </div>

          </div>

        )}

      </div>

    </section>

  )

}


export default Wishes