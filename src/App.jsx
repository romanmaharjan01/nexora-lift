import { useEffect, useState } from 'react'
import { Navigate, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import logo from './assets/nexora-logo.png'
import './App.css'

function App() {
  const location = useLocation()

  return (
    <div className="page">
      <header className="header">
        <div className="container headerInner">
          <NavLink className="brand brandButton" to="/" aria-label="Nexora Lift — home">
            <span className="brandLogoWrap">
              <img src={logo} alt="Nexora Lift logo" className="brandLogo" />
            </span>
            <span className="brandTextGroup">
              <span className="brandText">Nexora Lift</span>
              <span className="brandSub">Digital Marketing Studio</span>
            </span>
          </NavLink>

          <nav className="nav" aria-label="Primary navigation">
            <TopNavLink to="/" end>
              Home
            </TopNavLink>
            <TopNavLink to="/about">About</TopNavLink>
            <TopNavLink to="/goal">Our Goal</TopNavLink>
            <TopNavLink to="/mission">Mission</TopNavLink>
            <NavLink className="btn btnSmall" to="/contact">
              Let’s Talk
            </NavLink>
          </nav>

          <details className="navMobile">
            <summary className="navMobileSummary" aria-label="Open menu">
              <span className="hamburger" aria-hidden="true" />
            </summary>
            <div className="navMobilePanel">
              <MobileNavLink to="/" currentPath={location.pathname}>
                Home
              </MobileNavLink>
              <MobileNavLink to="/about" currentPath={location.pathname}>
                About
              </MobileNavLink>
              <MobileNavLink to="/goal" currentPath={location.pathname}>
                Our Goal
              </MobileNavLink>
              <MobileNavLink to="/mission" currentPath={location.pathname}>
                Mission
              </MobileNavLink>
              <NavLink className="btn" to="/contact">
                Book a Call
              </NavLink>
            </div>
          </details>
        </div>
      </header>

      <main className="main">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/goal" element={<GoalPage />} />
          <Route path="/mission" element={<MissionPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer className="footer">
        <div className="container footerInner">
          <div className="footerBrand">
            <div className="brandLogoWrap footerLogoWrap">
              <img src={logo} alt="" className="brandLogo" />
            </div>
            <div>
              <div className="footerName">Nexora Lift</div>
              <div className="footerTag">Strategy • Creative • Growth</div>
            </div>
          </div>
          <div className="footerLinks">
            <NavLink className="footerLinkBtn" to="/">
              Home
            </NavLink>
            <NavLink className="footerLinkBtn" to="/about">
              About
            </NavLink>
            <NavLink className="footerLinkBtn" to="/goal">
              Our Goal
            </NavLink>
            <NavLink className="footerLinkBtn" to="/mission">
              Mission
            </NavLink>
            <NavLink className="footerLinkBtn" to="/contact">
              Contact
            </NavLink>
          </div>
          <div className="footerCopy">
            © {new Date().getFullYear()} Nexora Lift. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

function TopNavLink({ children, ...props }) {
  return (
    <NavLink
      {...props}
      className={({ isActive }) => `navLink ${isActive ? 'navLinkActive' : ''}`}
    >
      {children}
    </NavLink>
  )
}

function MobileNavLink({ children, to, currentPath }) {
  const active = currentPath === to
  return (
    <NavLink className={`navMobileLink ${active ? 'navMobileLinkActive' : ''}`} to={to}>
      {children}
    </NavLink>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])
  return null
}

function HomePage() {
  const [heroPanel, setHeroPanel] = useState(null)

  const toggleFounded = () => {
    setHeroPanel((p) => (p === 'founded' ? null : 'founded'))
  }
  const toggleFullService = () => {
    setHeroPanel((p) => (p === 'fullservice' ? null : 'fullservice'))
  }

  return (
    <section className="hero heroPage">
      <div className="container heroGrid">
        <div className="heroCopy">
          <p className="eyebrow">Digital Marketing Agency</p>
          <h1 className="heroTitle">Marketing that understands your vision.</h1>
          <p className="heroLead">
            Nexora Lift blends strategy with creative excellence to build
            campaigns that connect, convert, and scale—so your brand can grow
            with confidence.
          </p>
          <div className="heroCtas">
            <NavLink className="btn" to="/contact">
              Book a Free Strategy Call
            </NavLink>
            <button type="button" className="btn btnGhost">
              View Our Work
            </button>
          </div>

          <div className="metrics">
            <div className="metric">
              <div className="metricValue">Strategy</div>
              <div className="metricLabel">clear plans that perform</div>
            </div>
            <div className="metric">
              <div className="metricValue">Creative</div>
              <div className="metricLabel">design + content that resonates</div>
            </div>
            <div className="metric">
              <div className="metricValue">Growth</div>
              <div className="metricLabel">measurable, sustainable results</div>
            </div>
          </div>
        </div>

        <div className="heroCard heroCardFramed" aria-label="Highlights">
          <div className="heroCardTop">
            <button
              type="button"
              className={`heroBadge heroBadgeBtn ${heroPanel === 'founded' ? 'heroBadgeActive' : ''}`}
              onClick={toggleFounded}
              aria-pressed={heroPanel === 'founded'}
            >
              Founded 2020
            </button>
            <button
              type="button"
              className={`heroBadge heroBadgeAlt heroBadgeBtn ${heroPanel === 'fullservice' ? 'heroBadgeActive' : ''}`}
              onClick={toggleFullService}
              aria-pressed={heroPanel === 'fullservice'}
            >
              Full-service
            </button>
          </div>

          <div className="heroPanelStage">
            <div className="heroPanelTrack" key={heroPanel ?? 'default'}>
              {heroPanel === null && (
                <div className="heroSlidePane">
                  <h2 className="heroCardTitle">Elevate your brand across industries.</h2>
                  <p className="heroCardText">
                    We don’t just create beautiful campaigns—we build strategies that
                    drive conversions and unlock growth. Tap the badges above to read
                    our story or see what full service includes.
                  </p>
                  <ul className="checklist" aria-label="What you get">
                    <li>Positioning & messaging that feels authentic</li>
                    <li>Campaigns engineered for performance</li>
                    <li>Reporting built around real business goals</li>
                  </ul>
                </div>
              )}

              {heroPanel === 'founded' && (
                <div className="heroSlidePane heroSlidePaneFounded">
                  <p className="heroFoundedText">
                    Nexora Lift began in 2020 with one belief: marketing should feel
                    like a real partnership—not a one-way pitch. We’re a focused team
                    of strategists and creatives who help brands grow with clarity,
                    craft, and measurable outcomes.
                  </p>
                  <p className="heroFoundedText">
                    From first campaigns to long-term retainers, we work shoulder to
                    shoulder with founders and marketing leaders who want marketing
                    that finally matches their ambition.
                  </p>
                </div>
              )}

              {heroPanel === 'fullservice' && (
                <div className="heroSlidePane heroSlidePaneServices">
                  <p className="heroFullLead">
                    Full service means one partner for the whole journey—strategy,
                    creative, channels, and measurement—so nothing falls through the
                    cracks.
                  </p>
                  <ul className="heroFullList" aria-label="Full-service offerings">
                    <li>
                      <strong>Brand & strategy</strong> — positioning, messaging,
                      go-to-market
                    </li>
                    <li>
                      <strong>Creative & content</strong> — copy, design, storytelling
                    </li>
                    <li>
                      <strong>Paid & organic</strong> — paid media, social, SEO
                    </li>
                    <li>
                      <strong>Lifecycle & web</strong> — email, landing pages,
                      CRO-friendly sites
                    </li>
                    <li>
                      <strong>Analytics</strong> — reporting tied to real business
                      goals
                    </li>
                  </ul>
                  <NavLink className="heroCardMore heroCardMoreInline" to="/contact">
                    Book a call to map your stack →
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="heroGlow" aria-hidden="true" />
    </section>
  )
}

function AboutPage() {
  return (
    <section className="section pageSection">
      <div className="container">
        <div className="sectionHead sectionHeadCenter">
          <p className="kicker">Where It All Began</p>
          <h2 className="sectionTitle">
            Built on partnership, powered by creativity.
          </h2>
          <p className="sectionLead">
            Founded in 2020, Nexora Lift emerged from a simple belief: businesses
            deserve marketing that truly understands their vision. What started as
            a small team of passionate creatives has grown into a full-service
            marketing agency dedicated to elevating brands across industries.
          </p>
        </div>

        <div className="split">
          <div className="card cardSoft">
            <h3 className="cardTitle">The gap we saw</h3>
            <p className="cardText">
              Businesses needed more than just campaigns; they needed partners who
              could blend strategy with creativity to deliver measurable results.
            </p>
            <div className="pillRow" aria-label="Values">
              <span className="pill">Team collaboration</span>
              <span className="pill">Business growth</span>
              <span className="pill">Measurable outcomes</span>
            </div>
          </div>

          <div className="card">
            <h3 className="cardTitle">What we do today</h3>
            <p className="cardText">
              We craft end-to-end marketing experiences—strategy, creative, and
              optimization—so every touchpoint supports your growth.
            </p>
            <div className="grid3">
              <div className="mini">
                <div className="miniTitle">Brand Strategy</div>
                <div className="miniText">clarity, positioning, messaging</div>
              </div>
              <div className="mini">
                <div className="miniTitle">Campaign Creative</div>
                <div className="miniText">content, design, storytelling</div>
              </div>
              <div className="mini">
                <div className="miniTitle">Performance</div>
                <div className="miniText">testing, tracking, iteration</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function GoalPage() {
  return (
    <section className="section sectionAlt pageSection">
      <div className="container">
        <div className="split splitReverse">
          <div className="card">
            <p className="kicker">Our Goal</p>
            <h2 className="sectionTitle">Driving Measurable Growth</h2>
            <p className="cardText">
              Our goal is simple yet ambitious: to help every client achieve
              exceptional growth through strategic marketing that delivers real,
              measurable results.
            </p>
            <p className="cardText">
              Whether you’re a startup finding your voice or an established brand
              seeking reinvention, we craft solutions that amplify your presence
              and accelerate your success.
            </p>
          </div>

          <div className="card cardSoft">
            <h3 className="cardTitle">How we build growth</h3>
            <ul className="steps" aria-label="Growth approach">
              <li>
                <span className="stepNum">01</span>
                <div>
                  <div className="stepTitle">Strategy first</div>
                  <div className="stepText">
                    We align goals, audience, and messaging before launching.
                  </div>
                </div>
              </li>
              <li>
                <span className="stepNum">02</span>
                <div>
                  <div className="stepTitle">Creative that converts</div>
                  <div className="stepText">
                    We design experiences that earn attention and drive action.
                  </div>
                </div>
              </li>
              <li>
                <span className="stepNum">03</span>
                <div>
                  <div className="stepTitle">Measure, learn, improve</div>
                  <div className="stepText">
                    We optimize continuously to keep performance trending up.
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function MissionPage() {
  return (
    <section className="section pageSection">
      <div className="container">
        <div className="mission">
          <div className="missionCopy">
            <p className="kicker">Our Mission</p>
            <h2 className="sectionTitle">
              Empowering Brands to Reach Their Full Potential
            </h2>
            <p className="sectionLead">
              We believe every brand has a unique story worth telling. Our mission
              is to amplify that story through innovative strategies, creative
              excellence, and unwavering dedication to our clients’ success. We’re
              not just marketers—we’re partners in your journey to greatness.
            </p>
          </div>
          <div className="quote" aria-label="Brand promise">
            <div className="quoteMark" aria-hidden="true">
              “”
            </div>
            <p className="quoteText">
              We don’t chase vanity metrics. We build marketing you can feel—and
              results you can measure.
            </p>
            <div className="quoteBy">Nexora Lift Team</div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactPage() {
  return (
    <section className="section sectionAlt pageSection">
      <div className="container">
        <div className="contact">
          <div>
            <p className="kicker">Contact</p>
            <h2 className="sectionTitle">Ready to elevate your brand?</h2>
            <p className="sectionLead">
              Tell us what you’re building. We’ll respond with next steps and a
              simple plan to move forward.
            </p>
            <div className="contactGrid">
              <div className="contactCard">
                <div className="contactLabel">Email</div>
                <a className="contactValue" href="mailto:hello@nexoralift.com">
                  hello@nexoralift.com
                </a>
              </div>
              <div className="contactCard">
                <div className="contactLabel">Response time</div>
                <div className="contactValue">Within 24–48 hours</div>
              </div>
            </div>
          </div>

          <form
            className="form"
            action="mailto:hello@nexoralift.com"
            method="post"
            encType="text/plain"
          >
            <label className="field">
              <span className="fieldLabel">Name</span>
              <input className="input" name="name" placeholder="Your name" required />
            </label>
            <label className="field">
              <span className="fieldLabel">Email</span>
              <input
                className="input"
                type="email"
                name="email"
                placeholder="you@example.com"
                required
              />
            </label>
            <label className="field">
              <span className="fieldLabel">Message</span>
              <textarea
                className="input textarea"
                name="message"
                placeholder="Tell us about your business and goals..."
                required
              />
            </label>
            <button className="btn" type="submit">
              Send Message
            </button>
            <p className="formNote">
              This opens your email app to send the message.
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}

export default App
