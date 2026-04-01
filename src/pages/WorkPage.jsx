import './WorkPage.css'

export default function WorkPage() {
  return (
    <div className="workPage">
      <h1>Our Work</h1>
      <p>Case studies from our recent clients.</p>
      <div className="workList">
        <div className="workItem"><h3>Brand Refresh</h3><p>40% conversion growth.</p></div>
        <div className="workItem"><h3>Product Launch</h3><p>500+ qualified leads in first quarter.</p></div>
        <div className="workItem"><h3>SEO Overhaul</h3><p>300% organic growth.</p></div>
      </div>
    </div>
  )
}
