import { useEffect, useContext } from 'react'
import { Navigate, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import logo from './assets/nexora-logo.png'
import './App.css'
import { AuthProvider, AuthContext } from './contexts/AuthContext'
import { MessagesProvider } from './contexts/MessagesContext'
import { AdminProvider } from './contexts/AdminContext'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { ForgotPasswordPage } from './pages/ForgotPasswordPage'
import { DashboardPage } from './pages/DashboardPage'
import { ProtectedRoute } from './components/ProtectedRoute'
import AdminProtectedRoute from './components/AdminProtectedRoute'
import AdminLoginPage from './pages/AdminLoginPage'
import AdminDashboard from './pages/AdminDashboard'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import GoalPage from './pages/GoalPage'
import DataLedPerformancePage from './pages/DataLedPerformancePage'
import CreativeAdvantagePage from './pages/CreativeAdvantagePage'
import StrategicPartnershipPage from './pages/StrategicPartnershipPage'
import MissionPage from './pages/MissionPage'
import WorkPage from './pages/WorkPage'
import ContactPage from './pages/ContactPage'

function AppContent() {
  const location = useLocation()
  const { user } = useContext(AuthContext)

  const isAuthPage = ['/login', '/register', '/forgot-password'].includes(location.pathname)
  const isAdminPage = ['/admin-login', '/admin-dashboard'].includes(location.pathname)
  const isDashboard = location.pathname === '/dashboard'
  const showLayout = !isAuthPage && !isAdminPage && !isDashboard

  return (
    <div className="page">
      {showLayout && (
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
              <TopNavLink to="/" end>Back to Reality</TopNavLink>
              <TopNavLink to="/about">Who Even Are We?</TopNavLink>
              <TopNavLink to="/goal">What We Think We’re Doing</TopNavLink>
              <TopNavLink to="/mission">Big Words Section</TopNavLink>
              {user ? (
                <NavLink className="btn btnSmall" to="/dashboard">Dashboard</NavLink>
              ) : (
                <NavLink className="btn btnSmall" to="/login">Prove You Exist</NavLink>
              )}
              <NavLink className="btn btnSmall" to="/contact">Complain Here</NavLink>
            </nav>

            <details className="navMobile">
              <summary className="navMobileSummary" aria-label="Open menu">
                <span className="hamburger" aria-hidden="true" />
              </summary>
              <div className="navMobilePanel">
                <MobileNavLink to="/" currentPath={location.pathname}>Back to Reality</MobileNavLink>
                <MobileNavLink to="/about" currentPath={location.pathname}>Who Even Are We?</MobileNavLink>
                <MobileNavLink to="/goal" currentPath={location.pathname}>What We Think We’re Doing</MobileNavLink>
                <MobileNavLink to="/mission" currentPath={location.pathname}>Big Words Section</MobileNavLink>
                {user ? (
                  <MobileNavLink to="/dashboard" currentPath={location.pathname}>Dashboard</MobileNavLink>
                ) : (
                  <MobileNavLink to="/login" currentPath={location.pathname}>Prove You Exist</MobileNavLink>
                )}
                <NavLink className="btn" to="/contact">Complain Here</NavLink>
              </div>
            </details>
          </div>
        </header>
      )}

      <main className="main">
        <ScrollToTop />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/admin-login" element={<AdminLoginPage />} />
          <Route path="/admin-dashboard" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/goal" element={<GoalPage />} />
          <Route path="/goal/data-led-performance" element={<DataLedPerformancePage />} />
          <Route path="/goal/creative-advantage" element={<CreativeAdvantagePage />} />
          <Route path="/goal/strategic-partnership" element={<StrategicPartnershipPage />} />
          <Route path="/mission" element={<MissionPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {showLayout && (
        <footer className="footer">
          <div className="container footerInner">
            <div className="footerBrand">
              <div className="brandLogoWrap footerLogoWrap">
                <img src={logo} alt="" className="brandLogo" />
              </div>
              <div className="footerTag">Elevating Brands With Excellence</div>
            </div>
            <div className="footerCopy">© {new Date().getFullYear()} Nexora Lift. All rights reserved.</div>
          </div>
        </footer>
      )}
    </div>
  )
}

function App() {
  return (
    <AdminProvider>
      <AuthProvider>
        <MessagesProvider>
          <AppContent />
        </MessagesProvider>
      </AuthProvider>
    </AdminProvider>
  )
}

function TopNavLink({ children, ...props }) {
  return (
    <NavLink {...props} className={({ isActive }) => `navLink ${isActive ? 'navLinkActive' : ''}`}>
      {children}
    </NavLink>
  )
}

function MobileNavLink({ children, to, currentPath }) {
  const active = currentPath === to
  return <NavLink className={`navMobileLink ${active ? 'navMobileLinkActive' : ''}`} to={to}>{children}</NavLink>
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, [pathname])
  return null
}

export default App
