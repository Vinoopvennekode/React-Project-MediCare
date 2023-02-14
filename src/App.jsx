import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import User from './Routes/User';
function App() {
  return (
    <div className="App">
   <Router>
        <Routes>
          <Route path='/*' element={<User />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
