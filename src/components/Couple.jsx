import weddingData from '../data/weddingData'
import './Couple.css'

function Couple() {
  return (
    <section
      className="couple-section"
      id="our-story"
    >

      <div className="couple-content">

        <p className="section-label">
          OUR STORY
        </p>

        <h2>
          {weddingData.bride}

          <span>&</span>

          {weddingData.groom}
        </h2>

        <p className="couple-story">
          {weddingData.story}
        </p>

      </div>

    </section>
  )
}

export default Couple