"use client"

import "../styles/header.css"
import { Link as RouterLink, useLocation } from "react-router-dom"

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="header-title">PRISM: Intelligent Traffic Management</h1>
        <p className="header-subtitle">Revolutionary AI-Powered Solutions for Smarter Cities</p>
        <RouterLink to="/resources" className={`${location.pathname === "/resources" ? "active" : ""}`}>
          <button className="cta-button">
            Learn More
          </button>
        </RouterLink>
      </div>
      <div className="header-background"></div>
    </header>
  )
}

export default Header
