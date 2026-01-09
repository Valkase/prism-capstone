import Header from "./components/Header"
import Hero from "./components/Hero"
import Abstract from "./components/Abstract"
import ProblemSolution from "./components/ProblemSolution"
import Results from "./components/Results"
import Technology from "./components/Technology"
import Team from "./components/Team"
import Footer from "./components/Footer"
import "./styles/app.css"

function App() {
  return (
    <div className="app">
      <Header />
      <Hero />
      <Abstract />
      <ProblemSolution />
      <Results />
      <Technology />
      <Team />
      <Footer />
    </div>
  )
}

export default App
