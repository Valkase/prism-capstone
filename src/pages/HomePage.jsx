"use client"

import Header from "../components/Header"
import Hero from "../components/Hero"
import Abstract from "../components/Abstract"
import ProblemSolution from "../components/ProblemSolution"
import Results from "../components/Results"
import Technology from "../components/Technology"
import Team from "../components/Team"

const HomePage = () => {
  return (
    <div className="page-wrapper">
      <Header />
      <Hero />
      <Abstract />
      <ProblemSolution />
      <Results />
      <Technology />
      <Team />
    </div>
  )
}

export default HomePage
