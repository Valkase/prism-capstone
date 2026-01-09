"use client"

import { useState } from "react"
import "../styles/header.css"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMenuOpen(false)
    }
  }

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <span className="logo-icon">⚡</span>
          <span className="logo-text">PRISM</span>
        </div>

        <nav className="nav">
          <button className="nav-link" onClick={() => scrollToSection("abstract")}>
            Abstract
          </button>
          <button className="nav-link" onClick={() => scrollToSection("problem")}>
            Problem
          </button>
          <button className="nav-link" onClick={() => scrollToSection("results")}>
            Results
          </button>
          <button className="nav-link" onClick={() => scrollToSection("tech")}>
            Technology
          </button>
          <button className="nav-link" onClick={() => scrollToSection("team")}>
            Team
          </button>
        </nav>

        <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {isMenuOpen && (
        <nav className="mobile-nav">
          <button className="nav-link" onClick={() => scrollToSection("abstract")}>
            Abstract
          </button>
          <button className="nav-link" onClick={() => scrollToSection("problem")}>
            Problem
          </button>
          <button className="nav-link" onClick={() => scrollToSection("results")}>
            Results
          </button>
          <button className="nav-link" onClick={() => scrollToSection("tech")}>
            Technology
          </button>
          <button className="nav-link" onClick={() => scrollToSection("team")}>
            Team
          </button>
        </nav>
      )}
    </header>
  )
}

export default Header
