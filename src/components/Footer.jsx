"use client"

import "../styles/footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>PRISM</h4>
            <p>Smart Traffic Management System</p>
            <p className="footer-description">Reducing congestion and emissions through AI-powered traffic control</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a href="#abstract">Overview</a>
              </li>
              <li>
                <a href="#problem">Challenge</a>
              </li>
              <li>
                <a href="#results">Results</a>
              </li>
              <li>
                <a href="#tech">Technology</a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>School</h4>
            <ul>
              <li>Bani-sweif STEM</li>
              <li>Group 24305</li>
              <li>2025 - 2026</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025-2026 PRISM Project. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
