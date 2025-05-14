import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import ContactUs from './pages/ContactUs'
import About from './pages/About'
import Services from './pages/Services'
import Logout from './pages/Logout'

// Wrapper to use hooks like useLocation inside
function AppContent() {
  const location = useLocation()
  const hideNavbarRoutes = ['/login', '/register']
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname)

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/logout' element={<Logout />} />

        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        {/* Add other routes here */}
      </Routes>
    </>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
