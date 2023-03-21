import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import User from "./Routes/User";
import Admin from './Routes/Admin'
import Doctor from'./Routes/Doctor'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<User />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/doctor/*" element={<Doctor />} />
        
      </Routes>
    </Router>
  );
}

export default App;
