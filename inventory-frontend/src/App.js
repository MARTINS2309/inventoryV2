import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import {StockEventsTable} from './components/StockEventsTable';
import {Navibar} from './components/Navbar';
import {Home} from './components/Home';

export const App = () => {

  return (
    <div className="App" data-testid="app">
      <BrowserRouter>
          <Navibar />
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path="/stockevents" element={< StockEventsTable />} />
          </Routes>
        </BrowserRouter>
    </div>
  )
}