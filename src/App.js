import react from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styling/Global.scss';
import Data from './pages/ChampionList';
import Home from './pages/Home';
import Other from './pages/Other';
import ChampionDetails from './components/ChampionDetails';


function App() {
  return (
    <>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/champions" element={<Data />} />
        <Route path="/other" element={<Other />} />
        <Route path="/:championName" element={<ChampionDetails />} />
      </Routes>
    </>
  );
}

export default App;
