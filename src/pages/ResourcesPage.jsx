"use client"

import ResourcesSection from "../components/ResourcesSection"
import "../styles/resources-page.css"

const ResourcesPage = () => {
  return (
    <div className="page-wrapper">
      <section className="resources-header">
        <div className="section-container">
          <h1 className="page-title">Project Resources</h1>
          <p className="page-subtitle">Download all project files and documentation</p>
        </div>
      </section>
      <section className="page-content">
        <ResourcesSection />
      </section>
    </div>
  )
}

export default ResourcesPage
