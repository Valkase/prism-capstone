"use client"

import { useState } from "react"
import { Link as RouterLink, useLocation } from "react-router-dom"
import "../styles/navigation.css"

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <nav className="navigation">
      <div className="nav-container">
        <RouterLink to="/" className="nav-logo" onClick={() => setIsMenuOpen(false)}>
          <img src="src\assets\Website logo.png" alt="PRISM Logo" className="nav-logo" />
        </RouterLink>

        {/* Desktop Navigation */}
        <div className="nav-links-desktop">
          <RouterLink to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`}>
            Home
          </RouterLink>
          <a href="/#about" className="nav-link">
            About
          </a>
          <a href="/#results" className="nav-link">
            Results
          </a>
          <RouterLink to="/resources" className={`nav-link ${location.pathname === "/resources" ? "active" : ""}`}>
            Resources
          </RouterLink>
          <RouterLink
            to="/simulation"
            className={`nav-link nav-link-highlight ${location.pathname === "/simulation" ? "active" : ""}`}
          >
            Simulation
          </RouterLink>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={`menu-toggle ${isMenuOpen ? "active" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="nav-links-mobile">
          <RouterLink to="/" className="nav-link-mobile" onClick={() => setIsMenuOpen(false)}>
            Home
          </RouterLink>
          <a href="/#about" className="nav-link-mobile" onClick={() => setIsMenuOpen(false)}>
            About
          </a>
          <a href="/#results" className="nav-link-mobile" onClick={() => setIsMenuOpen(false)}>
            Results
          </a>
          <RouterLink to="/resources" className="nav-link-mobile" onClick={() => setIsMenuOpen(false)}>
            Resources
          </RouterLink>
          <RouterLink
            to="/simulation"
            className="nav-link-mobile nav-link-highlight"
            onClick={() => setIsMenuOpen(false)}
          >
            Simulation
          </RouterLink>
        </div>
      )}
    </nav>
  )
}

export default Navigation
