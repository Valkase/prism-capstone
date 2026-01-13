"use client"

import "../styles/hero.css"
import { Link as RouterLink, useLocation } from "react-router-dom"
const Hero = () => {
  return (
    <section className="hero" id="hero">
      <div className="hero-content">
        <h1 className="hero-title">PRISM</h1>
        <p className="hero-subtitle">Smart Traffic Management System</p>
        <p className="hero-description">
          Reducing urban congestion and emissions through AI-powered adaptive traffic control
        </p>
        <RouterLink to="/simulation" className={`${location.pathname === "/simulation" ? "active" : ""}`}>
          <button className="cta-button">
            Try the Simulation
          </button>
        </RouterLink>

      </div>
      <div className="hero-animation">
        <div className="animated-grid"></div>
      </div>
    </section>
  )
}

export default Hero
