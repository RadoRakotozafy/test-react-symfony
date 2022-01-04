import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import CarsList from '../components/CarsList/CarsList';
import Header from '../components/Layouts/Header';
import Login from '../components/Login';

function App() {
  return (
    <Router>
        <Header />
        <Routes>
          <Route path="/" element={<CarsList />} />
          <Route path="/login" element={<Login />} />
        </Routes>
    </Router>
    
  );
}

export default App;