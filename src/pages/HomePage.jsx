import { NavLink } from 'react-router-dom'
import './HomePage.css'

export default function HomePage() {
  return (
    <div className="homePage">
      <h1>Welcome to Nexora Lift</h1>
      <p>We build marketing that understands your vision.</p>
      <div className="homeActions">
        <NavLink className="homeBtn" to="/contact">Contact Us</NavLink>
        <NavLink className="homeBtn homeBtnGhost" to="/work">View Our Work</NavLink>
      </div>
    </div>
  )
}
