import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import User from "./Routes/User";
import Admin from './Routes/Admin'
import Docter from'./Routes/Docter'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<User />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/docter/*" element={<Docter />} />
        
      </Routes>
    </Router>
  );
}

export default App;
