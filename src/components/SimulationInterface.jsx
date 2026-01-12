"use client"

import { useState, useEffect } from "react"
import "../styles/simulation.css"

const SimulationInterface = () => {
  const [isRunning, setIsRunning] = useState(false)
  const [trafficLevel, setTrafficLevel] = useState(50)
  const [lightState, setLightState] = useState("red")
  const [vehicles, setVehicles] = useState(15)
  const [emissions, setEmissions] = useState(120)

  useEffect(() => {
    let interval
    if (isRunning) {
      interval = setInterval(() => {
        const randomTraffic = Math.random() * 100
        setTrafficLevel(randomTraffic)
        setVehicles(Math.floor(randomTraffic * 3))
        setEmissions(Math.floor(randomTraffic * 2 + 50))
        setLightState(randomTraffic > 50 ? "green" : randomTraffic > 30 ? "yellow" : "red")
      }, 1500)
    }
    return () => clearInterval(interval)
  }, [isRunning])

  const getTrafficColor = () => {
    if (trafficLevel < 30) return "#00adb5"
    if (trafficLevel < 70) return "#ffa500"
    return "#ff6b6b"
  }

  return (
    <section className="simulation-section">
      <div className="section-container">
        <h2 className="section-title">Interactive Simulation</h2>

        <div className="simulation-grid">
          {/* Traffic Visualization */}
          <div className="simulation-card">
            <h3>Traffic Density Monitor</h3>
            <div className="traffic-visualization">
              <div className="traffic-circle" style={{ borderColor: getTrafficColor() }}>
                <div className="traffic-inner" style={{ backgroundColor: getTrafficColor() }}>
                  <span className="traffic-percentage">{trafficLevel.toFixed(1)}%</span>
                </div>
              </div>
            </div>
            <p className="card-description">Real-time traffic level detection</p>
          </div>

          {/* Traffic Light Status */}
          <div className="simulation-card">
            <h3>Traffic Light Status</h3>
            <div className="light-status">
              <div className={`light-indicator ${lightState}`}></div>
              <span className="light-text">{lightState.toUpperCase()}</span>
            </div>
            <p className="card-description">AI-controlled adaptive timing</p>
          </div>

          {/* Active Vehicles */}
          <div className="simulation-card">
            <h3>Active Vehicles</h3>
            <div className="metric-display">
              <div className="metric-number">{vehicles}</div>
              <span className="metric-unit">vehicles</span>
            </div>
            <p className="card-description">Detected in intersection zone</p>
          </div>

          {/* Emissions Monitoring */}
          <div className="simulation-card">
            <h3>CO₂ Emissions</h3>
            <div className="metric-display">
              <div className="metric-number">{emissions}</div>
              <span className="metric-unit">g/min</span>
            </div>
            <p className="card-description">Real-time pollution level</p>
          </div>
        </div>

        {/* Control Panel */}
        <div className="control-panel">
          <button className={`control-btn ${isRunning ? "active" : ""}`} onClick={() => setIsRunning(!isRunning)}>
            {isRunning ? "⏸ Pause Simulation" : "▶ Start Simulation"}
          </button>
          <button
            className="control-btn reset-btn"
            onClick={() => {
              setTrafficLevel(50)
              setVehicles(15)
              setEmissions(120)
              setLightState("red")
              setIsRunning(false)
            }}
          >
            ↻ Reset
          </button>
        </div>

        {/* Information Panel */}
        <div className="info-panel">
          <h3>How It Works</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-number">1</span>
              <p>Traffic sensors detect vehicle density in real-time</p>
            </div>
            <div className="info-item">
              <span className="info-number">2</span>
              <p>AI algorithm analyzes traffic patterns and predicts flow</p>
            </div>
            <div className="info-item">
              <span className="info-number">3</span>
              <p>Traffic lights adjust timing to optimize traffic flow</p>
            </div>
            <div className="info-item">
              <span className="info-number">4</span>
              <p>System reduces congestion and emissions in real-time</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SimulationInterface
