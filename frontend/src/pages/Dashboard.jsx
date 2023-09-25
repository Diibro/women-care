import UserDashboard from "./UserDashboard"
import AdminDashboard from "./AdminDashboard"
import DoctorDashboard from "./DoctorDashboard";
import './dashboard.css';

import {Routes, Route} from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className="Dashboard">
     <Routes>
          <Route path="user/*" element={<UserDashboard />} />
          <Route path="admin/*" element={<AdminDashboard />} />
          <Route path="doctor/*" element={<DoctorDashboard />} />
     </Routes>
    </div>
  )
}

export default Dashboard;