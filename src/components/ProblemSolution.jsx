"use client"

import "../styles/problem-solution.css"

const ProblemSolution = () => {
  const problems = [
    {
      icon: "🚗",
      title: "Vehicle Congestion",
      description: "Growing vehicle density in urban areas leads to severe congestion and environmental issues",
    },
    {
      icon: "⏱️",
      title: "Fixed Time Signals",
      description: "Traditional traffic lights cannot adapt to unpredictable changes in traffic volume",
    },
    {
      icon: "💨",
      title: "Air Pollution",
      description: "Increased idle time and congestion result in higher CO₂ emissions and poor air quality",
    },
  ]

  const solutions = [
    {
      icon: "🤖",
      title: "AI-Powered Control",
      description: "Dynamic traffic light timing based on real-time vehicle density detection",
    },
    {
      icon: "🛣️",
      title: "Emergency Lanes",
      description: "Dedicated routes for emergency vehicles using RF transmitters and receivers",
    },
    {
      icon: "📊",
      title: "Pollution Monitoring",
      description: "MQ-135 sensors track CO₂ levels and measure system environmental impact",
    },
  ]

  return (
    <section id="problem" className="problem-solution">
      <div className="container">
        <div className="problems-section">
          <h2 className="section-title">The Challenge</h2>
          <div className="cards-grid">
            {problems.map((problem, idx) => (
              <div key={idx} className="card problem-card">
                <div className="card-icon">{problem.icon}</div>
                <h3>{problem.title}</h3>
                <p>{problem.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="solution-divider"></div>

        <div className="solutions-section">
          <h2 className="section-title">Our Solution</h2>
          <div className="cards-grid">
            {solutions.map((solution, idx) => (
              <div key={idx} className="card solution-card">
                <div className="card-icon">{solution.icon}</div>
                <h3>{solution.title}</h3>
                <p>{solution.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProblemSolution
