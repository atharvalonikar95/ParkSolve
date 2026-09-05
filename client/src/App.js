import { Route, Routes } from 'react-router-dom';
import './App.css';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import ForgotPassword from './pages/ForgotPassword';
import VerifyOTP from './pages/VerifyOTP';
import ResetPassword from './pages/ResetPassword';
import ProtectedRoute from './Routes/ProtectedRoute';
import AdminRoutes from './Routes/AdminRoute';
import Layout from './components/Layout';
import Home from './pages/Home';
import VerifyPhone from './components/VerifyPhone';
import ContactDetails from './components/ContactDetails';
import Profile from './components/Profile';
import QRCode from './components/QRCode';
import OwnerDetails from './pages/OwnerDetails';
import AdminDashboard from './pages/AdminDashboard';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/LandingPage';
import ScrollToTop from './helpers/ScrollToTop';

//path='/home'
function App() {
  return (
    <div className="App">
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route element={<Layout />}>
          {/* protected route */}
          <Route element={<ProtectedRoute />}>
            <Route path='/home' element={<Home />} >
              <Route path='profile' element={<Profile />} />
              <Route path='verify-phone' element={<VerifyPhone />} />
              <Route path='contact-details' element={<ContactDetails />} />
              <Route path='qr' element={<QRCode />} />
            </Route>
          </Route>
          {/* admin route */}
          <Route element={<AdminRoutes />}>
            <Route path='/dashboard' element={<AdminDashboard />} />
          </Route>
        </Route>
        <Route path='/vehicle/:qrToken' element={<OwnerDetails />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/verify-otp' element={<VerifyOTP />} />
        <Route path='/reset-password' element={<ResetPassword />} />

      </Routes>
      <ScrollToTop />
    </div>
  );
}

export default App;
