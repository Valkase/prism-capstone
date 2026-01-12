"use client"

import "../styles/header.css"

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="header-title">PRISM: Intelligent Traffic Management</h1>
        <p className="header-subtitle">Revolutionary AI-Powered Solutions for Smarter Cities</p>
        <button className="header-cta">Learn More</button>
      </div>
      <div className="header-background"></div>
    </header>
  )
}

export default Header
