import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Admin page/ADashboard';
import Usersform from './Users/Usersform';
import Users from './Admin page/Users';

function App() {
  return (
    <Router>
      <Routes>
      <Route path='/' element={<Dashboard />} />
        <Route path='/users' element={<Users />}/>
        <Route path="/users/new" element={<Usersform />} />
       
      </Routes>
    </Router>
  );
}

export default App;
