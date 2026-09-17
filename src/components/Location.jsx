import './Location.css'
import dress1 from '../assets/dress1.jpg'
import dress2 from '../assets/dress2.jpg'

function Location() {
  return (
    <section className="location-section" id="location">
      <div className="location-container">

        <p className="section-label">DRESS CODE</p>

        <h2 className="location-title">
          Silver / Grey
        </h2>

        <div className="dress-code-card">

          <p className="basmalah-text" lang="ar" dir="rtl">
            بِسْمِ اللهِ الرَّحْمنِ الرَّحِيمِ          </p>

          <p className="dress-code-paragraph">
            With the grace of God and with the blessings of our beloved
            families, we are filled with joy to invite you to witness and
            celebrate our engagement ceremony.
          </p>

          <p className="dress-code-paragraph">
            Help us snap some memories on our special day.
            Use our hashtag
            <strong> #IeraForIzz </strong>
            and don't forget to tag us when you post the engagement pics.
          </p>

          <p className="dress-code-paragraph">
            We'd love it if you could follow our color theme
            <strong> SILVER / GREY </strong>
            so we all look beautiful together in the photos.
          </p>

          <ul className="dress-code-list">

            <li>
              <strong>Women:</strong> Dress / Kurung
            </li>

            <li>
              <strong>Men:</strong> Kurta / Black pants
            </li>

          </ul>


          {/* =========================
              DRESS REFERENCE IMAGES
          ========================= */}
<div className="dress-reference-grid">

  <div className="dress-reference-box">
    <img
      src={dress1}
      alt="Women dress reference"
      className="dress-reference-image"
    />
  </div>

  <div className="dress-reference-box">
    <img
      src={dress2}
      alt="Men dress reference"
      className="dress-reference-image"
    />
  </div>

</div>


          <p className="dress-code-footer-note">
            Thank you for dressing with love and celebrating with us.
          </p>

        </div>

      </div>
    </section>
  )
}

export default Location