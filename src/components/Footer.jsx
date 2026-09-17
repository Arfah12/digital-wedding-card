import { useState } from 'react'
import * as XLSX from 'xlsx'

import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore'



import db from '../firebase/firestore'

import './Footer.css'

function Footer() {

  // =========================
  // ADMIN STATES
  // =========================

  const [showPasswordModal, setShowPasswordModal] =
    useState(false)

  const [showAdminMenu, setShowAdminMenu] =
    useState(false)

  const [accessCode, setAccessCode] =
    useState('')

  const [errorMessage, setErrorMessage] =
    useState('')

  const [adminView, setAdminView] =
    useState('menu')

  const [rsvpList, setRsvpList] = useState([])

  const [wishList, setWishList] = useState([])

  const [isLoadingRsvps, setIsLoadingRsvps] =
    useState(false)

  const [isLoadingWishes, setIsLoadingWishes] =
    useState(false)

  const [deletingWishId, setDeletingWishId] =
    useState(null)


  const totalAttend = rsvpList.filter(
    (rsvp) => rsvp.attendance === 'Hadir'
  ).length

  const totalNotAttend = rsvpList.filter(
    (rsvp) =>
      rsvp.attendance === 'Tidak Hadir'
  ).length

  const totalGuestsAttending = rsvpList
    .filter((rsvp) => rsvp.attendance === 'Hadir')
    .reduce(
      (total, rsvp) =>
        total +
        (typeof rsvp.guests === 'number'
          ? rsvp.guests
          : 0),
      0
    )


  // =========================
  // CHECK ACCESS CODE
  // =========================

  const handleAccessSubmit = (event) => {

    event.preventDefault()


    if (accessCode === 'IeraIzz2026') {

      setShowPasswordModal(false)

      setShowAdminMenu(true)

      setAdminView('menu')

      setAccessCode('')

      setErrorMessage('')

    } else {

      setErrorMessage(
        'Incorrect access code. Please try again.'
      )

    }

  }


  // =========================
  // READ RSVP
  // =========================

  const handleReadRSVP = () => {

    setAdminView('rsvp')

    loadRsvps()

  }


  // =========================
  // MANAGE WISHES
  // =========================

  const handleManageWishes = () => {

    setAdminView('wishes')

    loadWishes()

  }


  const loadRsvps = async () => {

    setIsLoadingRsvps(true)

    try {

      const rsvpQuery = query(
        collection(db, 'rsvps'),
        orderBy('createdAt', 'desc')
      )

      const snapshot = await getDocs(rsvpQuery)

      const formatted = snapshot.docs.map((docItem) => ({
        id: docItem.id,
        ...docItem.data(),
      }))

      setRsvpList(formatted)

    } catch (error) {

      console.error('Error loading RSVPs:', error)

      alert('Unable to load RSVP data.')

    } finally {

      setIsLoadingRsvps(false)

    }

  }

// =========================
// EXPORT RSVP TO EXCEL
// =========================

const handleExportRSVP = () => {

  if (rsvpList.length === 0) {
    alert('No RSVP data available to export.')
    return
  }

  const exportData = rsvpList.map((rsvp, index) => ({
    No: index + 1,
    Name: rsvp.name || '-',
    Attendance: rsvp.attendance || '-',
    Guests:
      typeof rsvp.guests === 'number'
        ? rsvp.guests
        : 0,
    Submitted:
      rsvp.createdAt?.toDate
        ? rsvp.createdAt.toDate().toLocaleString('en-MY')
        : '-',
  }))

  const worksheet =
    XLSX.utils.json_to_sheet(exportData)

  const workbook =
    XLSX.utils.book_new()

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    'RSVP'
  )

  XLSX.writeFile(
    workbook,
    'Iera-Izz-RSVP.xlsx'
  )
}

  const loadWishes = async () => {

    setIsLoadingWishes(true)

    try {

      const wishesQuery = query(
        collection(db, 'wishes'),
        orderBy('createdAt', 'desc')
      )

      const snapshot = await getDocs(wishesQuery)

      const formatted = snapshot.docs.map((docItem) => ({
        id: docItem.id,
        ...docItem.data(),
      }))

      setWishList(formatted)

    } catch (error) {

      console.error('Error loading wishes:', error)

      alert('Unable to load wishes data.')

    } finally {

      setIsLoadingWishes(false)

    }

  }

  // =========================
// EXPORT WISHES TO EXCEL
// =========================

const handleExportWishes = () => {

  if (wishList.length === 0) {
    alert('No wishes available to export.')
    return
  }

  const exportData = wishList.map((wish, index) => ({
    No: index + 1,
    Name: wish.name || '-',
    Wish: wish.message || '-',
    Submitted:
      wish.createdAt?.toDate
        ? wish.createdAt.toDate().toLocaleString('en-MY')
        : '-',
  }))

  const worksheet =
    XLSX.utils.json_to_sheet(exportData)

  const workbook =
    XLSX.utils.book_new()

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    'Wishes'
  )

  XLSX.writeFile(
    workbook,
    'Iera-Izz-Wishes.xlsx'
  )
}

  const handleDeleteWish = async (wishId) => {

    if (!wishId) {
      return
    }

    const shouldDelete = window.confirm(
      'Delete this wish?'
    )

    if (!shouldDelete) {
      return
    }

    setDeletingWishId(wishId)

    try {

      await deleteDoc(doc(db, 'wishes', wishId))

      setWishList((currentWishList) =>
        currentWishList.filter(
          (wishItem) => wishItem.id !== wishId
        )
      )

    } catch (error) {

      console.error('Error deleting wish:', error)

      alert('Unable to delete this wish.')

    } finally {

      setDeletingWishId(null)

    }

  }


  return (

    <>

      {/* =========================
          FOOTER
      ========================= */}

      <footer className="footer">

      

        <div className="footer-content">

          <p className="footer-names">

         #IeraForIzz

          </p>


          <p className="footer-message">

            Thank you for celebrating
            this beautiful beginning with us.

          </p>




          {/* =========================
              ADMIN ACCESS BUTTON
          ========================= */}

          <button
            type="button"
            className="admin-access-button"
            onClick={() =>
              setShowPasswordModal(true)
            }
          >

            💗

          </button>

        </div>

      </footer>



      {/* =========================
          ACCESS CODE MODAL
      ========================= */}

      {showPasswordModal && (

        <div className="admin-overlay">

          <div className="admin-modal">


            {/* CLOSE */}

            <button
              type="button"
              className="admin-close-button"
              onClick={() => {

                setShowPasswordModal(false)

                setAccessCode('')

                setErrorMessage('')

              }}
            >

              ×

            </button>


            <div className="admin-icon">

              🔐

            </div>


            <h3>

              Admin Access

            </h3>


            <p>

              Enter the access code to manage
              your invitation.

            </p>


            <form
              onSubmit={handleAccessSubmit}
            >

              <input
                type="password"
                value={accessCode}
                onChange={(event) => {

                  setAccessCode(
                    event.target.value
                  )

                  setErrorMessage('')

                }}
                placeholder="Enter access code"
                autoFocus
              />


              {errorMessage && (

                <p className="admin-error">

                  {errorMessage}

                </p>

              )}


              <button
                type="submit"
                className="admin-submit-button"
              >

                Enter

              </button>

            </form>

          </div>

        </div>

      )}



      {/* =========================
          ADMIN MENU
      ========================= */}

      {showAdminMenu && (

        <div className="admin-overlay">

          <div className="admin-modal admin-menu">


            {/* CLOSE */}

            <button
              type="button"
              className="admin-close-button"
              onClick={() => {
                setAdminView('menu')
                setShowAdminMenu(false)
              }}
            >

              ×

            </button>


            {adminView === 'menu' && (
              <>
                <div className="admin-icon">

                  ⚙️

                </div>


                <h3>

                  Invitation Manager

                </h3>


                <p>

                  What would you like to manage?

                </p>


                <button
                  type="button"
                  className="admin-menu-button"
                  onClick={handleReadRSVP}
                >

                  <span className="admin-button-icon">
                    📋
                  </span>

                  <span>

                    <strong>
                      Read RSVP
                    </strong>

                    <small>
                      View guest responses
                    </small>

                  </span>

                </button>


                <button
                  type="button"
                  className="admin-menu-button"
                  onClick={handleManageWishes}
                >

                  <span className="admin-button-icon">
                    💌
                  </span>

                  <span>

                    <strong>
                      Manage Wishes
                    </strong>

                    <small>
                      View and delete wishes
                    </small>

                  </span>

                </button>


                <button
                  type="button"
                  className="admin-logout-button"
                  onClick={() =>
                    setShowAdminMenu(false)
                  }
                >

                  Close

                </button>
              </>
            )}


            {adminView === 'rsvp' && (
              <div className="admin-data-panel">

                <h3>
                  RSVP Responses
                </h3>

                <p>
                  Guest responses submitted from the RSVP form.
                </p>

                <div className="admin-rsvp-summary">
                       <div className="admin-rsvp-summary-item">
                    <span>Total Guests Attending</span>

                    <strong>{totalGuestsAttending}</strong>
                  </div>

                  <div className="admin-rsvp-summary-item">
                    <span>Total Not Attend</span>

                    <strong>{totalNotAttend}</strong>
                  </div>

             
                </div>

                {isLoadingRsvps ? (
                  <p className="admin-data-note">
                    Loading RSVP data...
                  </p>
                ) : rsvpList.length === 0 ? (
                  <p className="admin-data-note">
                    No RSVP data found.
                  </p>
                ) : (
                  <ul className="admin-data-list">
                    {rsvpList.map((rsvp) => (
                      <li
                        key={rsvp.id}
                        className="admin-data-item"
                      >
                        <p>
                          <strong>Name:</strong> {rsvp.name || '-'}
                        </p>

                        <p>
                          <strong>Status:</strong> {rsvp.attendance || '-'}
                        </p>

                        <p>
                          <strong>Guests:</strong> {typeof rsvp.guests === 'number' ? rsvp.guests : '-'}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}

               <div className="admin-actions-row">

  <button
    type="button"
    className="admin-secondary-button"
    onClick={() => setAdminView('menu')}
  >
    Back
  </button>

  <button
    type="button"
    className="admin-primary-button"
    onClick={handleExportRSVP}
    disabled={rsvpList.length === 0}
  >
    📥 Export Excel
  </button>

  <button
    type="button"
    className="admin-secondary-button"
    onClick={loadRsvps}
    disabled={isLoadingRsvps}
  >
    Refresh
  </button>

</div>

              </div>
            )}


            {adminView === 'wishes' && (
              <div className="admin-data-panel">

                <h3>
                  Wishes Manager
                </h3>

                <p>
                  Review wishes and delete any entry.
                </p>

                {isLoadingWishes ? (
                  <p className="admin-data-note">
                    Loading wishes...
                  </p>
                ) : wishList.length === 0 ? (
                  <p className="admin-data-note">
                    No wishes found.
                  </p>
                ) : (
                  <ul className="admin-data-list">
                    {wishList.map((wish) => (
                      <li
                        key={wish.id}
                        className="admin-data-item"
                      >
                        <p>
                          <strong>Name:</strong> {wish.name || '-'}
                        </p>

                        <p>
                          <strong>Wish:</strong> {wish.message || '-'}
                        </p>

                        <button
                          type="button"
                          className="admin-delete-button"
                          onClick={() =>
                            handleDeleteWish(wish.id)
                          }
                          disabled={deletingWishId === wish.id}
                        >
                          {deletingWishId === wish.id
                            ? 'Deleting...'
                            : 'Delete'}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="admin-actions-row">

  <button
    type="button"
    className="admin-secondary-button"
    onClick={() => setAdminView('menu')}
  >
    Back
  </button>

  <button
    type="button"
    className="admin-primary-button"
    onClick={handleExportWishes}
    disabled={wishList.length === 0}
  >
    📥 Export Excel
  </button>

  <button
    type="button"
    className="admin-secondary-button"
    onClick={loadWishes}
    disabled={isLoadingWishes}
  >
    Refresh
  </button>

</div>

              </div>
            )}


          </div>

        </div>

      )}

    </>

  )
}

export default Footer