import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Patient pages
import Home1 from './pages/patient/Home1';
import About from './pages/patient/About1';
import Layout from './pages/patient/layout';
import UploadImage from './pages/patient/UploadImage';
import ReportHistory from './pages/patient/ReportHistory';
import Contact from './pages/patient/Contact';
// Auth pages
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';

// Admin pages
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import ManageDoctor from './pages/admin/ManageDoctor';
import ManagePatient from './pages/admin/ManagePatient';
import ViewReports from './pages/admin/ViewReports';
import DoctorLayout from './pages/doctor/DoctorLayout';

//doctor pages
import DoctorRegister from './pages/doctor/doctor_login'
import DoctorViewReports from './pages/doctor/View_Reports';
import DoctorReportHistory from './pages/doctor/DoctorReportHistory'
import DoctorDashboard from './pages/doctor/dashboard_doctor'
function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<ForgotPassword />} />

        {/* Patient Module */}
        <Route element={<Layout />}>
  <Route path="/home" element={<Home1 />} />
  <Route path="/about" element={<About />} />
  <Route path="/upload" element={<UploadImage />} />
  <Route path="/report" element={<ReportHistory />} />
  <Route path="/contact" element={<Contact />} />
</Route>

        {/* Admin Module */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="doctor" element={<ManageDoctor />} />
          <Route path="patient" element={<ManagePatient />} />
          <Route path="reports" element={<ViewReports />} />
        </Route>

        {/* Doctor Module */}
        <Route path="/doctor-register" element={<DoctorRegister />} />
        <Route path="/doctor" element={<DoctorLayout />}>
         <Route index element={<DoctorDashboard />} />
 <Route path="view-report" element={<DoctorViewReports />}></Route>
  <Route path="give-suggestion" element={<DoctorReportHistory />}></Route>
          {/* You can define nested doctor dashboard routes here */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;