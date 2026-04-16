import { Link } from 'react-router-dom'
import './GoalPage.css'

export default function GoalPage() {
  return (
    <div className="goalPage">
      <h1>Our Goal</h1>
      <p>Elevate your brand to new heights with measurable growth and innovation.</p>
      <div className="goalCards">
        <Link className="goalCard" to="/goal/data-led-performance">
          <span>Data-led performance</span>
        </Link>
        <Link className="goalCard" to="/goal/creative-advantage">
          <span>Creative advantage</span>
        </Link>
        <Link className="goalCard" to="/goal/strategic-partnership">
          <span>Strategic partnership</span>
        </Link>
      </div>
    </div>
  )
}
