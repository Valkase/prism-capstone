"use client"

import "../styles/hero.css"

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">PRISM</h1>
        <p className="hero-subtitle">Smart Traffic Management System</p>
        <p className="hero-description">
          Reducing urban congestion and emissions through AI-powered adaptive traffic control
        </p>
        <button className="cta-button">Learn More</button>
      </div>
      <div className="hero-animation">
        <div className="animated-grid"></div>
      </div>
    </section>
  )
}

export default Hero
