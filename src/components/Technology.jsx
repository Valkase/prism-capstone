"use client"

import "../styles/technology.css"

const Technology = () => {
  const techStack = [
    {
      category: "Vision & Detection",
      items: ["OpenCV", "Computer Vision", "Camera Module", "Real-time Detection"],
    },
    {
      category: "Machine Learning",
      items: ["Scikit-learn", "Gradient Boosting", "Decision Trees", "Random Forest"],
    },
    {
      category: "Sensors & Hardware",
      items: ["MQ-135 Sensor", "RF Transmitter/Receiver", "Microcontroller", "Camera Module"],
    },
    {
      category: "Data Analysis",
      items: ["Python", "Statistical Analysis", "Data Processing", "Model Validation"],
    },
  ]

  return (
    <section id="tech" className="technology">
      <div className="container">
        <h2 className="section-title">Technology Stack</h2>
        <div className="tech-grid">
          {techStack.map((tech, idx) => (
            <div key={idx} className="tech-card">
              <h3>{tech.category}</h3>
              <ul className="tech-list">
                {tech.items.map((item, i) => (
                  <li key={i}>
                    <span className="tech-dot">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Technology
