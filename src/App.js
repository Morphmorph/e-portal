import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Admin page/ADashboard';
import Usersform from './Users/Usersform';
import Users from './Admin page/Users';
import TDashboard from './Teacher page/TDashboard';

function App() {
  return (
    <Router>
      <Routes>
      <Route path='/' element={<Dashboard />} />
        
      </Routes>
    </Router>
  );
}

export default App;
