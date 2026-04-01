import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './HomePage.css'

export default function HomePage() {
  const [active, setActive] = useState(null)

  return (
    <div className="homePage">
      <div className="heroSplit">
        <div>
          <p className="eyebrow">Digital Marketing Agency</p>
          <h1>Marketing that understands your vision.</h1>
          <p className="heroLead">
            Nexora Lift blends strategy with creative excellence to build campaigns that connect, convert, and scale—so your brand can grow with confidence.
          </p>
          <div className="heroActions">
            <NavLink className="homeBtn" to="/contact">Book a Free Strategy Call</NavLink>
            <NavLink className="homeBtn homeBtnGhost" to="/work">View Our Work</NavLink>
          </div>
        </div>

        <div className="heroPanelWrap">
          <button className={`heroPanel ${active === 'founded' ? 'heroPanelActive' : ''}`} onClick={() => setActive(active === 'founded' ? null : 'founded')}>
            <strong>Founded</strong>
            <p>We launched Nexora Lift with a mission to partner with vision-driven brands and help them reach their full potential through authentic, results-driven marketing.</p>
          </button>

          <button className={`heroPanel ${active === 'fullservice' ? 'heroPanelActive' : ''}`} onClick={() => setActive(active === 'fullservice' ? null : 'fullservice')}>
            <strong>Full-Service</strong>
            <p>From brand strategy and creative design to paid advertising and growth hacking, we handle it all with one cohesive vision for success.</p>
          </button>
        </div>
      </div>

      <div className="metrics">
        <div className="metric"><h3>Strategy</h3><p>Deep-dive planning & positioning</p></div>
        <div className="metric"><h3>Creative</h3><p>Bold designs that stand out</p></div>
        <div className="metric"><h3>Growth</h3><p>Data-driven performance marketing</p></div>
      </div>
    </div>
  )
}
