import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import './App.css'

// Pages
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import ContactUs from './pages/ContactUs'
import About from './pages/About'
import Services from './pages/Services'
import Logout from './pages/Logout'
import AdminDashboard from './pages/admin/AdminDashboard'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'
import AdminContactUs from './pages/admin/AdminContactUs'
import OneContacUs from './pages/admin/OneContacUs'
import EditContactUs from './pages/admin/EditContactUs'
import Watch from './pages/Watch'
import AdminProduct from './pages/admin/AdminProduct'
import AdminProductCreate from './pages/admin/AdminProductCreate'
import OneProduct from './pages/admin/OneProduct'
import EditProduct from './pages/admin/EditeProduct'

function App() {
  return (
    <Router>
      <Routes>
        {/* Public/Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User Layout Routes */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/watch" element={<Watch />} />
          <Route path="/logout" element={<Logout />} />

        </Route>

        {/* Admin Layout Routes */}
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProduct />} />
          <Route path="/admin/products/create" element={<AdminProductCreate />} />
          <Route path="/admin/contact" element={<AdminContactUs />} />
          <Route path="/admin/contact/:id" element={<OneContacUs />} />
          <Route path="/admin/contact/edit/:id" element={<EditContactUs />} />
          <Route path="/admin/products/:id" element={<OneProduct />} />
          <Route path="/admin/products/edit/:id" element={<EditProduct />} />
        </Route>
      </Routes>
    </Router>
  )
}

// Layout Components
function UserLayout() {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App


const AdminLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 w-full flex flex-col min-h-screen bg-gray-100">


        <main className="flex-1 p-6">
          <Outlet />
        </main>

      </div>
    </div>
  );
};
