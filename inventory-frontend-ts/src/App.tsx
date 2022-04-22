import React from 'react';
import { Routes , Route } from 'react-router-dom';
import './App.css';
import Home from './components/routes/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/categorythreads/:categoryId" element={<Home />} />
    </Routes>
  );
}

export default App;
