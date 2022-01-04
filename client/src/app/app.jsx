import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import CarsList from '../components/CarsList/CarsList';
import Header from '../components/Layouts/Header';
import Login from '../components/Login';
import Register from '../components/Register';

function App() {
  return (
    <Router>
        <Header />
        <Routes>
          <Route path="/" element={<CarsList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
    </Router>
    
  );
}

export default App;