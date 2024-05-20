import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Pricing from './pages/PaymentsAndPlans';
import Signup from './components/Signup';
import Homepage from './pages/Homepage';
import Login from './components/Login';
import Profilepage from './pages/ProfilePage';
import { AuthProvider } from './context/AuthContext';
import ProfileSettings from './pages/profile-settings';
import Dashboard from './components/Dashboard';
import ForgotPassword from './components/ForgotPassword';
import Sidebar from './components/Sidebar';
import Carousel from './components/carousel';

import {} from "./context/AuthContext"
import Logout from './components/Logout';
import ProfilePage from './pages/ProfilePage';
import ProfileList from './components/ProfileList';

const App = () => {
  

  return (
    <Router>
      <AuthProvider>
        <div>
        <Navbar  />

          <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/logout" element={<Logout />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/pricing" element={<Pricing />} />
            <Route exact path="/profile-page" element={<ProfileList />} />
            <Route exact path="/profiles" element={<Profilepage />} />
            <Route exact path="/Dashboard" element={<Dashboard />} />
            <Route exact path="/profile-settings" element={<ProfileSettings />} />
            <Route exact path="/forgotPassword" element={<ForgotPassword />} />
            <Route exact path="/Sidebar" element={<Sidebar />} />
            <Route exact path="/carousel" element={<Carousel />} />
            
          </Routes>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;


