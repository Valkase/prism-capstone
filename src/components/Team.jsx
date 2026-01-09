"use client"

import "../styles/team.css"

const Team = () => {
  const team = [
    {
      name: "Ahmed Mohsen",
      school: "Bani-sweif STEM",
      grade: "Grade 12",
    },
    {
      name: "Mohamed Gaber",
      school: "Bani-sweif STEM",
      grade: "Grade 12",
    },
    {
      name: "Yousseff Mohamed",
      school: "Bani-sweif STEM",
      grade: "Grade 12",
    },
  ]

  return (
    <section id="team" className="team">
      <div className="container">
        <h2 className="section-title">The Team</h2>
        <p className="team-subtitle">Group 24305 | 2025 - 2026</p>
        <div className="team-grid">
          {team.map((member, idx) => (
            <div key={idx} className="team-card">
              <div className="team-avatar">{member.name.charAt(0)}</div>
              <h3>{member.name}</h3>
              <p className="team-school">{member.school}</p>
              <p className="team-grade">{member.grade}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Team
