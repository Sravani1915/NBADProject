import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css'
import Menu from './Menu/Menu';
import HomePage from './HomePage/HomePage';
import AboutPage from './AboutPage/AboutPage';
import LoginPage from './LoginPage/LoginPage';
import RegisterPage from './RegisterPage/RegisterPage';
import Configuration from './Configuration/Configuration';
import BudgetDetails from './BudgetDetails/BudgetDetails';
function App() {
  return (
    <Router>
      <Menu />
      <div className="mainContainer">
        <Routes>
          <Route path="/aboutpage" element={<AboutPage />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/Configuration" element={<Configuration />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/BudgetDetails" element={<BudgetDetails />} />
          <Route
            path="/"
            element={<Navigate to="/login" />} // Update this based on your authentication logic
          />
        </Routes>
      </div>
      
    </Router>
  );
}

export default App;
