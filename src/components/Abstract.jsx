"use client"

import "../styles/abstract.css"

const Abstract = () => {
  return (
    <section id="about" className="abstract">
      <div className="section-container">
        <h2 className="section-title">Overview</h2>
        <div className="abstract-content">
          <p className="abstract-text">
            Our challenge addresses the rising density of vehicles, which leads to severe consequences like urban
            congestion, specifically within the context of Egypt. This directly addresses one of the challenge's main
            goals: lowering air pollution.
          </p>
          <div className="key-metrics">
            <div className="metric stagger-item">
              <div className="metric-value">64.95%</div>
              <div className="metric-label">System Efficiency</div>
            </div>
            <div className="metric stagger-item">
              <div className="metric-value">1.12s</div>
              <div className="metric-label">Response Time</div>
            </div>
            <div className="metric stagger-item">
              <div className="metric-value">20%</div>
              <div className="metric-label">CO₂ Reduction</div>
            </div>
            <div className="metric stagger-item">
              <div className="metric-value">35.7%</div>
              <div className="metric-label">Time Improvement</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Abstract
