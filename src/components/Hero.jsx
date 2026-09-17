import weddingData from '../data/weddingData'
import butterfly from '../assets/butterfly_transparent.gif'
import './Hero.css'

function renderWords(text, groupName, startDelay = 0) {
  return text.split(/\s+/).map((word, index) => (
    <span
      key={`${groupName}-${word}-${index}`}
      className="hero-word"
      style={{
        '--word-delay': `${startDelay + index * 0.16}s`,
      }}
    >
      {word}
    </span>
  ))
}

function Hero() {

  return (
    <section className="hero">
      {/* Floating Butterflies */}

      <div className="butterfly butterfly-one">
        <img src={butterfly} alt="" />
      </div>

      <div className="butterfly butterfly-two">
        <img src={butterfly} alt="" />
      </div>

      <div className="butterfly butterfly-three">
        <img src={butterfly} alt="" />
      </div>

      <div className="butterfly butterfly-four">
        <img src={butterfly} alt="" />
      </div>


      {/* Hero Content */}

      <div className="hero-content">

        <p className="hero-subtitle hero-line hero-line-subtitle">
          {renderWords('THE  ENGAGEMENT  OF', 'subtitle', 0.2)}
        </p>

        <h1 className="hero-title hero-line hero-line-title">

          {renderWords(weddingData.bride, 'bride', 0.42)}

          <span className="hero-line-ampersand">&</span>

          {renderWords(weddingData.groom, 'groom', 0.9)}

        </h1>

        <p className="hero-date hero-line hero-line-date">
          {renderWords(weddingData.engagementDate, 'date', 1.35)}
        </p>

        <p className="hero-message hero-line hero-line-message">
          <span className="hero-message-line">
            {renderWords('With love and happiness, we invite you to join us', 'message-first', 1.75)}
          </span>
          <span className="hero-message-line">
            {renderWords('in celebrating this special moment with us.', 'message-second', 2.25)}
          </span>
        </p>

      </div>

    </section>
  )
}

export default Hero