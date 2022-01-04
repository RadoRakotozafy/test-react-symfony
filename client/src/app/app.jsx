import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import CarsList from '../components/CarsList/CarsList';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<CarsList />} />
        </Routes>
    </Router>
    
  );
}

export default App;