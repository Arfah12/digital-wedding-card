import weddingData from '../data/weddingData'
import icon from '../assets/icon.png'
import butterfly from '../assets/butterfly_transparent.gif'
import './Details.css'

function Details() {
  return (
    <section className="details-section" id="details">

      <div className="section-butterflies" aria-hidden="true">
        <img src={butterfly} alt="" className="section-butterfly section-butterfly-left" />
        <img src={butterfly} alt="" className="section-butterfly section-butterfly-right" />
      </div>

      <div className="details-container">

        <p className="section-label">
          THE DETAILS
        </p>

        <h2 className="details-title">
          Join Us For Our Engagement
        </h2>

        <p className="details-date">
          {weddingData.engagementDate}
        </p>


        <div className="event-card">

          <p className="event-label">
            ENGAGEMENT CEREMONY
          </p>


          {/* LOCATION */}

          <div className="event-location">

            <p className="event-address">
              {weddingData.address}
            </p>

            <a
              href={weddingData.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="google-map-icon"
              aria-label="Open location in Google Maps"
            >
              <img
                src={icon}
                alt="Google Maps"
              />
            </a>

          </div>


          {/* EVENT TIMELINE */}

          <div className="event-timeline">

            <p className="timeline-title">
              Event Timeline
            </p>

            <ul className="timeline-list">

              <li className="timeline-item">

                <span className="timeline-time">
                  11:30 AM
                </span>

                <span className="timeline-activity">
                  Family Discussion
                </span>

              </li>


              <li className="timeline-item">

                <span className="timeline-time">
                  12:00 PM
                </span>

                <span className="timeline-activity">
                  Ring Exchange Ceremony
                </span>

              </li>


              <li className="timeline-item">

                <span className="timeline-time">
                  12:30 PM
                </span>

                <span className="timeline-activity">
                  Lunch
                </span>

              </li>


              <li className="timeline-item">

                <span className="timeline-time">
                  1:30 PM
                </span>

                <span className="timeline-activity">
                  Ceremony Ends
                </span>

              </li>

            </ul>

          </div>

        </div>

      </div>

    </section>
  )
}

export default Details