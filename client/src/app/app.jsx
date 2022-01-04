import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import AddComment from '../components/AddComment';
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
          <Route path="/comment/:id/:slug" element={<AddComment />} />
        </Routes>
    </Router>
    
  );
}

export default App;