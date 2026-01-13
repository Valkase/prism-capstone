"use client"

import { useState, useEffect } from "react"

const SimulationInterface = () => {
  const [apiConnected, setApiConnected] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  // Input states for each lane
  const [lanes, setLanes] = useState([
    { 
      id: 'north', 
      name: 'North Lane', 
      cars: 0, 
      bikes: 0, 
      buses: 0, 
      trucks: 0,
      // Results from API
      duration: null,
      status: null,
      predicted: null,
      pattern: null,
      logic: null
    },
    { 
      id: 'south', 
      name: 'South Lane', 
      cars: 0, 
      bikes: 0, 
      buses: 0, 
      trucks: 0,
      duration: null,
      status: null,
      predicted: null,
      pattern: null,
      logic: null
    },
    { 
      id: 'east', 
      name: 'East Lane', 
      cars: 0, 
      bikes: 0, 
      buses: 0, 
      trucks: 0,
      duration: null,
      status: null,
      predicted: null,
      pattern: null,
      logic: null
    }
  ])

  const API_URL = 'http://localhost:5000'

  // Check API connection on mount
  useEffect(() => {
    checkApiConnection()
  }, [])

  const checkApiConnection = async () => {
    try {
      const response = await fetch(`${API_URL}/`)
      if (response.ok) {
        const data = await response.json()
        setApiConnected(true)
        setError(null)
        console.log('API Connected:', data)
      }
    } catch (err) {
      setApiConnected(false)
      setError('API not connected. Make sure Flask server is running on localhost:5000')
      console.error('API Connection Error:', err)
    }
  }

  const handleInputChange = (laneId, field, value) => {
    setLanes(prev => prev.map(lane => 
      lane.id === laneId 
        ? { ...lane, [field]: Math.max(0, parseInt(value) || 0) }
        : lane
    ))
  }

  const handlePredict = async () => {
    if (!apiConnected) {
      setError('API is not connected. Please check the connection.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const requestData = {
        lights: lanes.map(lane => ({
          lane: lane.name,
          actual_cars: lane.cars,
          bike_count: lane.bikes,
          bus_count: lane.buses,
          truck_count: lane.trucks,
          total_vehicles: lane.cars + lane.bikes + lane.buses + lane.trucks
        }))
      }

      console.log('Sending prediction request:', requestData)

      const response = await fetch(`${API_URL}/batch_predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      })

      if (response.ok) {
        const data = await response.json()
        console.log('API Response:', data)
        
        // Update lanes with predictions
        setLanes(prev => prev.map((lane, index) => ({
          ...lane,
          duration: data.predictions[index].green_light_duration,
          status: data.predictions[index].status,
          predicted: data.predictions[index].predicted_cars,
          pattern: data.predictions[index].pattern
        })))
        
        setError(null)
      } else {
        throw new Error('API request failed')
      }
    } catch (err) {
      setError('Failed to get predictions from API. Please try again.')
      console.error('Prediction Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setLanes([
      { 
        id: 'north', 
        name: 'North Lane', 
        cars: 0, 
        bikes: 0, 
        buses: 0, 
        trucks: 0,
        duration: null,
        status: null,
        predicted: null,
        pattern: null,
        logic: null
      },
      { 
        id: 'south', 
        name: 'South Lane', 
        cars: 0, 
        bikes: 0, 
        buses: 0, 
        trucks: 0,
        duration: null,
        status: null,
        predicted: null,
        pattern: null,
        logic: null
      },
      { 
        id: 'east', 
        name: 'East Lane', 
        cars: 0, 
        bikes: 0, 
        buses: 0, 
        trucks: 0,
        duration: null,
        status: null,
        predicted: null,
        pattern: null,
        logic: null
      }
    ])
    setError(null)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'CRITICAL_FLUSH': return '#ff6b6b'
      case 'HEAVY_CLEAR': return '#ffa500'
      case 'MODERATE': return '#ffd93d'
      case 'LIGHT': return '#51cf66'
      case 'EMPTY': return '#00adb5'
      default: return '#00adb5'
    }
  }

  const getStatusDescription = (status) => {
    switch (status) {
      case 'CRITICAL_FLUSH': return 'Critical congestion - Maximum clear time'
      case 'HEAVY_CLEAR': return 'Heavy traffic - Extended green phase'
      case 'MODERATE': return 'Moderate traffic - Standard timing'
      case 'LIGHT': return 'Light traffic - Quick cycle'
      case 'EMPTY': return 'No traffic - Minimum cycle time'
      default: return 'Awaiting prediction'
    }
  }

  const totalVehicles = lanes.reduce((sum, lane) => sum + lane.cars + lane.bikes + lane.buses + lane.trucks, 0)
  const hasPredictions = lanes.some(lane => lane.duration !== null)

  return (
    <section className="simulation-section">
      <div className="section-container">
        <h2 className="section-title">AI Traffic Prediction System</h2>

        {/* API Status Banner */}
        <div className={`api-status ${apiConnected ? 'connected' : 'disconnected'}`}>
          <span className="status-indicator"></span>
          {apiConnected ? '✓ AI Model Connected' : '✗ AI Model Disconnected'}
          {error && <div className="error-text">{error}</div>}
        </div>

        {/* Input Section */}
        <div className="input-section">
          <h3 className="input-title">Enter Vehicle Count for Each Lane</h3>
          
          <div className="simulation-grid">
            {lanes.map((lane) => (
              <div key={lane.id} className="simulation-card input-card">
                <h3>{lane.name}</h3>
                
                <div className="input-group">
                  <label className="input-label">
                    <span className="label-icon">🚗</span>
                    <span>Cars</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={lane.cars}
                    onChange={(e) => handleInputChange(lane.id, 'cars', e.target.value)}
                    className="vehicle-input"
                    placeholder="0"
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">
                    <span className="label-icon">🚲</span>
                    <span>Bikes</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={lane.bikes}
                    onChange={(e) => handleInputChange(lane.id, 'bikes', e.target.value)}
                    className="vehicle-input"
                    placeholder="0"
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">
                    <span className="label-icon">🚌</span>
                    <span>Buses</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={lane.buses}
                    onChange={(e) => handleInputChange(lane.id, 'buses', e.target.value)}
                    className="vehicle-input"
                    placeholder="0"
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">
                    <span className="label-icon">🚚</span>
                    <span>Trucks</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={lane.trucks}
                    onChange={(e) => handleInputChange(lane.id, 'trucks', e.target.value)}
                    className="vehicle-input"
                    placeholder="0"
                  />
                </div>

                <div className="total-vehicles">
                  Total: {lane.cars + lane.bikes + lane.buses + lane.trucks} vehicles
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Control Buttons */}
        <div className="control-panel">
          <button 
            className="control-btn predict-btn"
            onClick={handlePredict}
            disabled={!apiConnected || loading || totalVehicles === 0}
          >
            {loading ? '⏳ Predicting...' : '🔮 Predict Traffic'}
          </button>
          <button className="control-btn reset-btn" onClick={handleReset}>
            ↻ Reset All
          </button>
          <button className="control-btn" onClick={checkApiConnection}>
            🔄 Check API
          </button>
        </div>

        {/* Results Section */}
        {hasPredictions && (
          <div className="results-section">
            <h3 className="results-title">AI Predictions</h3>
            
            <div className="simulation-grid">
              {lanes.map((lane) => (
                <div key={lane.id} className="simulation-card result-card">
                  <h3>{lane.name}</h3>
                  
                  {/* Green Light Duration - Main Result */}
                  <div className="main-result">
                    <div className="light-status">
                      <div className="light-indicator green"></div>
                    </div>
                    <div className="duration-display">
                      <div className="duration-number">{lane.duration}s</div>
                      <div className="duration-label">Green Light Duration</div>
                    </div>
                  </div>

                  {/* Congestion Status */}
                  <div className="status-display">
                    <div 
                      className="status-badge-large" 
                      style={{ backgroundColor: getStatusColor(lane.status) }}
                    >
                      {lane.status}
                    </div>
                    <p className="status-description">
                      {getStatusDescription(lane.status)}
                    </p>
                  </div>

                  {/* Detailed Metrics */}
                  <div className="traffic-info">
                    <div className="info-row">
                      <span className="info-label">Actual Vehicles:</span>
                      <span className="info-value">{lane.cars + lane.bikes + lane.buses + lane.trucks}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">AI Predicted:</span>
                      <span className="info-value">{lane.predicted}</span>
                    </div>
                    {lane.pattern && lane.pattern !== 'NORMAL' && (
                      <div className="info-row">
                        <span className="info-label">Pattern:</span>
                        <span className="pattern-badge">{lane.pattern}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Information Panel */}
        <div className="info-panel">
          <h3>How the AI Works</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-number">1</span>
              <p>Enter the number of vehicles waiting at each intersection lane</p>
            </div>
            <div className="info-item">
              <span className="info-number">2</span>
              <p>Click "Predict Traffic" to send data to the AI model (Gradient Boosting)</p>
            </div>
            <div className="info-item">
              <span className="info-number">3</span>
              <p>AI calculates optimal green light duration (10s to 150s) based on congestion</p>
            </div>
            <div className="info-item">
              <span className="info-number">4</span>
              <p>System applies multipliers: 1.2× for moderate, 1.4× for heavy, 1.6× for critical traffic</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .simulation-hero {
  background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%);
  color: var(--text-light);
  padding: 4rem var(--spacing-xl);
  text-align: center;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.simulation-hero-content h1 {
  font-size: 3rem;
  margin-bottom: var(--spacing-lg);
  color: var(--primary-light);
}

.simulation-hero-content p {
  font-size: 1.2rem;
  color: rgba(238, 238, 238, 0.85);
}

.simulation-section {
  background: var(--bg-primary);
  padding: var(--spacing-3xl) 0;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: var(--primary-light);
}

/* API Status Banner */
.api-status {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px 24px;
  border-radius: var(--radius-lg);
  margin-bottom: var(--spacing-2xl);
  font-weight: 600;
  font-size: 0.95rem;
  transition: all var(--transition-base);
}

.api-status.connected {
  background-color: rgba(81, 207, 102, 0.15);
  color: #51cf66;
  border: 2px solid #51cf66;
}

.api-status.disconnected {
  background-color: rgba(255, 107, 107, 0.15);
  color: #ff6b6b;
  border: 2px solid #ff6b6b;
}

.status-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: currentColor;
  animation: pulse-indicator 2s ease-in-out infinite;
}

@keyframes pulse-indicator {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.error-text {
  font-size: 0.85rem;
  font-weight: 400;
  margin-top: 5px;
}

/* Input Section - NEW */
.input-section {
  margin-bottom: var(--spacing-3xl);
}

.input-title {
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: var(--spacing-2xl);
  color: var(--primary);
}

.input-card {
  background: var(--bg-secondary);
  border: 2px solid var(--primary);
}

.input-group {
  margin-bottom: var(--spacing-lg);
}

.input-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
  margin-bottom: 8px;
  color: rgba(238, 238, 238, 0.9);
  font-weight: 600;
}

.label-icon {
  font-size: 1.2rem;
}

.vehicle-input {
  width: 100%;
  padding: 12px;
  border: 2px solid var(--primary);
  border-radius: var(--radius-lg);
  background: rgba(0, 173, 181, 0.1);
  color: var(--text-light);
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
  transition: all var(--transition-base);
}

.vehicle-input:focus {
  outline: none;
  border-color: var(--primary-light);
  background: rgba(0, 217, 255, 0.15);
  box-shadow: 0 0 0 3px rgba(0, 173, 181, 0.2);
}

.vehicle-input::placeholder {
  color: rgba(238, 238, 238, 0.3);
}

.total-vehicles {
  margin-top: var(--spacing-lg);
  padding-top: var(--spacing-lg);
  border-top: 2px solid rgba(0, 173, 181, 0.3);
  text-align: center;
  font-size: 1rem;
  font-weight: 700;
  color: var(--primary-light);
}

/* Results Section - NEW */
.results-section {
  margin: var(--spacing-3xl) 0;
  padding: var(--spacing-2xl);
  background: rgba(0, 173, 181, 0.05);
  border-radius: var(--radius-lg);
}

.results-title {
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: var(--spacing-2xl);
  color: var(--primary);
}

.result-card {
  background: var(--bg-secondary);
  border: 2px solid var(--primary-light);
}

.main-result {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-lg);
  margin: var(--spacing-lg) 0;
  padding: var(--spacing-lg);
  background: rgba(0, 217, 255, 0.1);
  border-radius: var(--radius-lg);
}

.duration-display {
  text-align: center;
}

.duration-number {
  font-size: 3.5rem;
  font-weight: 900;
  color: var(--primary-light);
  line-height: 1;
  text-shadow: 0 0 20px rgba(0, 217, 255, 0.3);
}

.duration-label {
  font-size: 0.95rem;
  color: rgba(238, 238, 238, 0.7);
  margin-top: 0.5rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.status-display {
  margin: var(--spacing-lg) 0;
  text-align: center;
}

.status-badge-large {
  display: inline-block;
  padding: 10px 24px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--bg-secondary);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: var(--spacing-md);
}

.status-description {
  font-size: 0.9rem;
  color: rgba(238, 238, 238, 0.7);
  font-style: italic;
}

/* Grid Layouts */
.simulation-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-2xl);
  margin-bottom: var(--spacing-3xl);
}

.metrics-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-2xl);
  margin-bottom: var(--spacing-2xl);
}

/* Cards */
.simulation-card {
  background: var(--bg-secondary);
  border: 2px solid var(--primary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-2xl);
  text-align: center;
  color: var(--text-light);
  transition: all var(--transition-base);
}

.simulation-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 25px rgba(0, 173, 181, 0.25);
  border-color: var(--primary-light);
}

.simulation-card h3 {
  font-size: 1.2rem;
  margin-bottom: var(--spacing-lg);
  color: var(--primary);
  font-weight: 700;
}

/* Traffic Visualization */
.traffic-visualization {
  display: flex;
  justify-content: center;
  margin: var(--spacing-2xl) 0;
}

.traffic-circle {
  width: 150px;
  height: 150px;
  border: 4px solid var(--primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  animation: pulse-circle 2s ease-in-out infinite;
}

@keyframes pulse-circle {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(0, 173, 181, 0.7);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(0, 173, 181, 0);
  }
}

.traffic-inner {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.8;
}

.traffic-percentage {
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--bg-secondary);
}

/* Traffic Light Status */
.light-status {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-lg);
  margin: var(--spacing-2xl) 0;
}

.light-indicator {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  animation: blink 1s infinite;
}

.light-indicator.red {
  background-color: #ff6b6b;
  box-shadow: 0 0 20px rgba(255, 107, 107, 0.6);
}

.light-indicator.yellow {
  background-color: #ffa500;
  box-shadow: 0 0 20px rgba(255, 165, 0, 0.6);
}

.light-indicator.green {
  background-color: #51cf66;
  box-shadow: 0 0 30px rgba(81, 207, 102, 0.6);
  animation: glow 2s ease-in-out infinite;
}

@keyframes blink {
  0%,
  49% {
    opacity: 1;
  }
  50%,
  100% {
    opacity: 0.6;
  }
}

@keyframes glow {
  0%,
  100% {
    box-shadow: 0 0 30px rgba(81, 207, 102, 0.6);
  }
  50% {
    box-shadow: 0 0 40px rgba(81, 207, 102, 0.9);
  }
}

.light-text {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 2px;
}

/* Traffic Info Section */
.traffic-info {
  margin-top: var(--spacing-lg);
  text-align: left;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid rgba(0, 173, 181, 0.2);
}

.info-row:last-child {
  border-bottom: none;
}

.info-label {
  font-size: 0.9rem;
  color: rgba(238, 238, 238, 0.7);
}

.info-value {
  font-weight: 700;
  color: var(--primary-light);
  font-size: 1rem;
}

.status-badge {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--bg-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.pattern-badge {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 700;
  background-color: rgba(255, 165, 0, 0.8);
  color: var(--bg-secondary);
  text-transform: uppercase;
}

/* Metric Display */
.metric-display {
  margin: var(--spacing-2xl) 0;
}

.metric-number {
  font-size: 2.5rem;
  font-weight: 900;
  color: var(--primary-light);
  display: block;
  margin-bottom: var(--spacing-sm);
}

.metric-unit {
  font-size: 0.9rem;
  color: rgba(238, 238, 238, 0.7);
  font-weight: 500;
}

.card-description {
  font-size: 0.9rem;
  color: rgba(238, 238, 238, 0.7);
  margin-top: var(--spacing-lg);
}

/* Control Panel */
.control-panel {
  display: flex;
  gap: var(--spacing-lg);
  justify-content: center;
  margin-bottom: var(--spacing-3xl);
  flex-wrap: wrap;
}

.control-btn {
  background-color: var(--primary);
  color: var(--bg-secondary);
  border: none;
  padding: var(--spacing-md) var(--spacing-2xl);
  border-radius: var(--radius-lg);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-base);
  box-shadow: 0 4px 15px rgba(0, 173, 181, 0.3);
}

.control-btn:hover:not(:disabled) {
  background-color: var(--primary-light);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 173, 181, 0.4);
}

.control-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.control-btn.active {
  background-color: var(--primary-light);
}

.predict-btn {
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
  font-size: 1.1rem;
  padding: var(--spacing-lg) 2.5rem;
}

.predict-btn:hover:not(:disabled) {
  transform: translateY(-2px) scale(1.02);
}

.reset-btn {
  background-color: var(--bg-tertiary);
  color: var(--text-light);
  box-shadow: 0 4px 15px rgba(0, 173, 181, 0.2);
}

.reset-btn:hover {
  background-color: rgba(58, 71, 80, 0.8);
}

/* Info Panel */
.info-panel {
  background: var(--bg-secondary);
  border: 2px solid var(--primary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-2xl);
  color: var(--text-light);
}

.info-panel h3 {
  font-size: 1.5rem;
  margin-bottom: var(--spacing-2xl);
  color: var(--primary);
  text-align: center;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-2xl);
}

.info-item {
  display: flex;
  gap: var(--spacing-lg);
}

.info-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: var(--primary);
  color: var(--bg-secondary);
  border-radius: 50%;
  font-weight: 700;
  flex-shrink: 0;
}

.info-item p {
  font-size: 0.95rem;
  line-height: 1.6;
  color: rgba(238, 238, 238, 0.85);
}

/* Responsive Design */
@media (max-width: 768px) {
  .simulation-hero-content h1 {
    font-size: 2rem;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .simulation-grid,
  .metrics-row {
    grid-template-columns: 1fr;
  }

  .control-panel {
    flex-direction: column;
  }

  .control-btn {
    width: 100%;
  }

  .duration-number {
    font-size: 2.5rem;
  }

  .light-indicator {
    width: 60px;
    height: 60px;
  }

  .light-text {
    font-size: 1.2rem;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }
}
      `}</style>
    </section>
  )
}

export default SimulationInterface