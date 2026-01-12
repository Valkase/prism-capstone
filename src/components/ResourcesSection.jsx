"use client"

import "../styles/resources.css"

const ResourcesSection = () => {
  const resources = [
    {
      category: "Documentation",
      icon: "📄",
      items: [
        { name: "System Overview", file: "PRISM_Overview.pdf" },
        { name: "Technical Specifications", file: "Technical_Specs.pdf" },
        { name: "Hardware Guide", file: "Hardware_Guide.pdf" },
      ],
    },
    {
      category: "Code & Models",
      icon: "💻",
      items: [
        { name: "AI Model Training Code", file: "training_model.py" },
        { name: "Traffic Control Algorithm", file: "control_algorithm.py" },
        { name: "Sensor Integration Code", file: "sensors.cpp" },
      ],
    },
    {
      category: "Data & Research",
      icon: "📊",
      items: [
        { name: "Training Dataset", file: "traffic_data.csv" },
        { name: "Performance Metrics", file: "metrics_report.pdf" },
        { name: "Research Paper", file: "PRISM_Research.pdf" },
      ],
    },
  ]

  return (
    <section className="resources-section">
      <div className="section-container">
        <h2 className="section-title">Project Resources</h2>
        <p className="section-subtitle">Download all project files, documentation, and source code</p>

        <div className="resources-grid">
          {resources.map((group, idx) => (
            <div key={idx} className="resource-card">
              <div className="resource-header">
                <span className="resource-icon">{group.icon}</span>
                <h3>{group.category}</h3>
              </div>
              <div className="resource-items">
                {group.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="resource-item">
                    <span className="file-icon">📥</span>
                    <a href={`/files/${item.file}`} download>
                      {item.name}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="resources-note">
          <p>
            💡 <strong>Note:</strong> All files are available for download. For backend simulation setup, refer to the
            documentation and code files.
          </p>
        </div>
      </div>
    </section>
  )
}

export default ResourcesSection
