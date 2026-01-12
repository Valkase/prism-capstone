import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navigation from "./components/Navigation"
import Footer from "./components/Footer"
import HomePage from "./pages/HomePage"
import SimulationPage from "./pages/SimulationPage"
import ResourcesPage from "./pages/ResourcesPage"
import "./styles/app.css"

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/simulation" element={<SimulationPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
