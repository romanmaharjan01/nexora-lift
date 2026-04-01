import { useEffect, useState, useContext } from 'react'
import { Navigate, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import logo from './assets/nexora-logo.png'
import './App.css'
import { AuthProvider, AuthContext } from './contexts/AuthContext'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { DashboardPage } from './pages/DashboardPage'
import { ProtectedRoute } from './components/ProtectedRoute'

function AppContent() {
  const location = useLocation()
  const { user } = useContext(AuthContext)

  // Check if current route is an auth page
  const isAuthPage = ['/login', '/register'].includes(location.pathname)
  const isDashboard = location.pathname === '/dashboard'

  // If on dashboard or auth pages, show minimal layout
  if (isDashboard || isAuthPage) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    )
  }

  // Otherwise show main site with header and footer
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
            {user ? (
              <>
                <NavLink className="btn btnSmall" to="/dashboard">
                  Dashboard
                </NavLink>
              </>
            ) : (
              <NavLink className="btn btnSmall" to="/login">
                Login
              </NavLink>
            )}
            <NavLink className="btn btnSmall" to="/contact">
              Let's Talk
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
              {user ? (
                <MobileNavLink to="/dashboard" currentPath={location.pathname}>
                  Dashboard
                </MobileNavLink>
              ) : (
                <MobileNavLink to="/login" currentPath={location.pathname}>
                  Login
                </MobileNavLink>
              )}
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
          <Route path="/work" element={<WorkPage />} />
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
            <div className="footerTag">Elevating Brands With Excellence</div>
          </div>
          <div className="footerCopy">
            © {new Date().getFullYear()} Nexora Lift. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
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
            <NavLink className="btn btnGhost" to="/work">
              View Our Work
            </NavLink>
          </div>

          <div className="metrics">
            <div className="metric">
              <div className="metricValue">Strategy</div>
              <div className="metricLabel">Deep-dive planning & positioning</div>
            </div>
            <div className="metric">
              <div className="metricValue">Creative</div>
              <div className="metricLabel">Bold designs that stand out</div>
            </div>
            <div className="metric">
              <div className="metricValue">Growth</div>
              <div className="metricLabel">Data-driven performance marketing</div>
            </div>
          </div>
        </div>

        <div className="heroGraphic">
          <div className="heroPanels">
            <button
              className={`heroPanel heroPanelLeft ${heroPanel === 'founded' ? 'heroPanelActive' : ''}`}
              onClick={toggleFounded}
            >
              <div className="heroPanelLabel">Founded</div>
              <div className="heroPanelContent">
                <p>We launched Nexora Lift with a singular mission: to partner with visionary brands and help them reach their full potential through authentic, results-driven marketing.</p>
              </div>
            </button>
            <button
              className={`heroPanel heroPanelRight ${heroPanel === 'fullservice' ? 'heroPanelActive' : ''}`}
              onClick={toggleFullService}
            >
              <div className="heroPanelLabel">Full-Service</div>
              <div className="heroPanelContent">
                <p>From brand strategy and creative design to paid advertising and growth hacking, we handle it all. One unified team, one cohesive vision for your success.</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function AboutPage() {
  return (
    <section className="aboutPage">
      <div className="container">
        <div className="sectionHeader">
          <p className="kicker">About Us</p>
          <h2 className="sectionTitle">Who we are & what we believe</h2>
        </div>

        <div className="aboutGrid">
          <div className="aboutCard">
            <h3>Our Story</h3>
            <p>
              Nexora Lift was founded by a team of marketing strategists, creative directors, and growth experts who believed that brands deserve more than surface-level campaigns. We saw a gap in the market for agencies that combine deep strategic thinking with bold creative execution.
            </p>
          </div>

          <div className="aboutCard">
            <h3>Our Values</h3>
            <p>
              We believe in transparency, collaboration, and measurable results. Your success is our success. We don't do cookie-cutter solutions—every strategy is tailored to your unique goals and market position.
            </p>
          </div>

          <div className="aboutCard">
            <h3>Our Team</h3>
            <p>
              Our team brings decades of combined experience across strategy, design, copywriting, paid advertising, SEO, and brand building. We're curious, collaborative, and constantly innovating.
            </p>
          </div>

          <div className="aboutCard">
            <h3>Our Approach</h3>
            <p>
              We start with discovery. We get to know your brand, your audience, your competition, and your goals. From there, we build a integrated strategy that touches every customer touchpoint.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function GoalPage() {
  return (
    <section className="goalPage">
      <div className="container">
        <div className="sectionHeader">
          <p className="kicker">Our Goal</p>
          <h2 className="sectionTitle">Elevate your brand to new heights</h2>
          <p className="sectionLead">
            We're dedicated to helping businesses transform their marketing and unlock new levels of growth. Here's what we aim to deliver for every client:
          </p>
        </div>

        <div className="goalGrid">
          <div className="goalCard">
            <div className="goalIcon">📈</div>
            <h3>Measurable Growth</h3>
            <p>We focus on metrics that matter: conversions, revenue, market share. Every campaign is tied to clear KPIs.</p>
          </div>

          <div className="goalCard">
            <div className="goalIcon">💡</div>
            <h3>Strategic Innovation</h3>
            <p>We challenge convention and explore new channels, techniques, and platforms to keep your brand ahead of the curve.</p>
          </div>

          <div className="goalCard">
            <div className="goalIcon">✨</div>
            <h3>Brand Excellence</h3>
            <p>Your brand voice, visual identity, and message should be unmistakable. We craft brands that resonate and endure.</p>
          </div>

          <div className="goalCard">
            <div className="goalIcon">🤝</div>
            <h3>True Partnership</h3>
            <p>We're not just vendors—we're an extension of your team, invested in your long-term success and growth.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function MissionPage() {
  return (
    <section className="missionPage">
      <div className="container">
        <div className="sectionHeader">
          <p className="kicker">Our Mission</p>
          <h2 className="sectionTitle">Empower brands through smart, bold marketing</h2>
          <p className="sectionLead">
            Our mission is simple: to be the marketing partner that brands trust to drive growth, build loyalty, and create lasting impact in their industries.
          </p>
        </div>

        <div className="missionValues">
          <div className="value">
            <h3>Strategic Clarity</h3>
            <p>We believe every brand has a unique position in the market. Our job is to uncover it, articulate it, and leverage it.</p>
          </div>

          <div className="value">
            <h3>Creative Courage</h3>
            <p>We're not afraid to be different. Great marketing often breaks the rules—and we're here to help you do that responsibly.</p>
          </div>

          <div className="value">
            <h3>Data Intelligence</h3>
            <p>Strategy without data is guesswork. We use advanced analytics, market research, and testing to validate every decision.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function WorkPage() {
  const works = [
    {
      title: "E-Commerce Brand Refresh",
      category: "Brand Strategy & Design",
      description: "Complete brand refresh for a fashion retailer, including new positioning, visual identity, and campaign strategy that increased conversions by 40%.",
      results: "40% conversion increase"
    },
    {
      title: "SaaS Product Launch",
      category: "Digital Marketing & Growth",
      description: "End-to-end launch campaign for a B2B SaaS platform, featuring content marketing, paid ads, and PR that drove 500+ qualified leads in the first quarter.",
      results: "500+ qualified leads"
    },
    {
      title: "Local Business SEO Overhaul",
      category: "SEO & Performance",
      description: "Comprehensive SEO strategy for a local service business, optimizing content, technical SEO, and local listings to dominate search results.",
      results: "300% organic traffic growth"
    },
    {
      title: "Non-Profit Awareness Campaign",
      category: "Social Impact & Creative",
      description: "Multi-channel campaign for a non-profit organization, combining social media, influencer partnerships, and events to increase donations by 60%.",
      results: "60% donation increase"
    },
    {
      title: "Mobile App Marketing",
      category: "App Marketing & ASO",
      description: "Performance marketing campaign for a mobile app launch, utilizing app store optimization, paid user acquisition, and retention strategies.",
      results: "10K+ app downloads"
    },
    {
      title: "B2B Content Strategy",
      category: "Content Marketing",
      description: "Developed a comprehensive content marketing strategy for a B2B tech company, producing thought leadership articles, case studies, and webinars.",
      results: "25% lead quality improvement"
    }
  ]

  return (
    <section className="workPage">
      <div className="container">
        <div className="sectionHeader">
          <p className="kicker">Our Work</p>
          <h2 className="sectionTitle">Recent campaigns & projects</h2>
          <p className="sectionLead">
            Here's a selection of recent work that showcases our strategy, creativity, and results across various industries.
          </p>
        </div>

        <div className="workGrid">
          {works.map((work, index) => (
            <div key={index} className="workCard">
              <div className="workCategory">{work.category}</div>
              <h3>{work.title}</h3>
              <p>{work.description}</p>
              <div className="workResult">
                <strong>Result:</strong> {work.results}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactPage() {
  return (
    <section className="contactPage">
      <div>
        <p className="kicker">Contact</p>
        <h2 className="sectionTitle">Ready to elevate your brand?</h2>
        <p className="sectionLead">
          Tell us what you're building. We'll respond with next steps and a
          simple plan to move forward.
        </p>
        <div className="contactGrid">
          <div className="contactCard">
            <div className="contactLabel">Email</div>
            <a className="contactValue" href="mailto:nexoralift@gmail.com">
              nexoralift@gmail.com
            </a>
          </div>
          <div className="contactCard">
            <div className="contactLabel">Response time</div>
            <div className="contactValue">Within 24–48 hours</div>
          </div>
        </div>
      </div>

      <form className="contactForm">
        <div className="formRow">
          <div className="formField">
            <span className="fieldLabel">Name</span>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              required
            />
          </div>

          <div className="formField">
            <span className="fieldLabel">Email</span>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              required
            />
          </div>
        </div>

        <div className="formField">
          <span className="fieldLabel">Message</span>
          <textarea
            name="message"
            placeholder="Tell us about your business and goals..."
            rows="6"
            required
          ></textarea>
        </div>

        <button type="submit" className="btn">
          Send Message
        </button>

        <p className="formHint">
          This opens your email app to send the message.
        </p>
      </form>
    </section>
  )
}

export default App
