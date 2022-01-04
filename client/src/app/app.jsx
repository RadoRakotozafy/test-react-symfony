import React from 'react';
import PlayerConfig from '../components/PlayerConfig/PlayerConfig';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Game from '../components/Game/Game';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<PlayerConfig />} />
          <Route path="/game" element={<Game />} />
        </Routes>
    </Router>
    
  );
}

export default App;