"use client"

import "../styles/results.css"

const Results = () => {
  const results = [
    {
      category: "Performance",
      items: [
        {
          label: "Time to Travel 100m",
          before: "70 seconds",
          after: "45 seconds",
          improvement: "35.7%",
        },
        { label: "System Response Time", value: "1.12 seconds", highlight: true },
        {
          label: "Emergency Gate Response",
          value: "846.66ms",
          highlight: false,
        },
      ],
    },
    {
      category: "AI Model Accuracy",
      items: [
        {
          label: "Coefficient of Determination (R²)",
          value: "0.996",
          highlight: true,
        },
        { label: "Mean Absolute Error (MAE)", value: "2.05", highlight: false },
        {
          label: "Prediction Error Reduction",
          value: "52.5%",
          highlight: false,
        },
      ],
    },
    {
      category: "Environmental Impact",
      items: [
        { label: "CO₂ Reduction", value: "20%", highlight: true },
        {
          label: "MQ-135 Sensor Error",
          value: "11.73%",
          highlight: false,
        },
        { label: "System Efficiency", value: "64.95%", highlight: false },
      ],
    },
  ]

  return (
    <section id="results" className="results">
      <div className="container">
        <h2 className="section-title">Results & Performance</h2>
        <div className="results-grid">
          {results.map((result, idx) => (
            <div key={idx} className="result-card">
              <h3 className="result-category">{result.category}</h3>
              <div className="result-items">
                {result.items.map((item, i) => (
                  <div key={i} className={`result-item ${item.highlight ? "highlight" : ""}`}>
                    <span className="result-label">{item.label}</span>
                    <div className="result-values">
                      {item.before && <span className="before">{item.before}</span>}
                      <span className={`value ${item.highlight ? "primary" : ""}`}>{item.value || item.after}</span>
                      {item.improvement && <span className="improvement">↓ {item.improvement}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Results
