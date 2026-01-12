"use client"

import SimulationInterface from "../components/SimulationInterface"
import "../styles/simulation-page.css"

const SimulationPage = () => {
  return (
    <div className="page-wrapper">
      <section className="simulation-header">
        <div className="section-container">
          <h1 className="page-title">AI Traffic Simulator</h1>
          <p className="page-subtitle">Experience PRISM's intelligent traffic management system in action</p>
        </div>
      </section>
      <section className="page-content">
        <SimulationInterface />
      </section>
    </div>
  )
}

export default SimulationPage
