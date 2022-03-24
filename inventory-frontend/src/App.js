import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {StockEventsTable} from './components/StockEventsTable';
import {Navibar} from './components/Navibar';
import {Home} from './components/Home';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//Main app comonent to deal with routing and calling components
export const App = () => {

  return (
    <div className="App" data-testid="app">
      <Navibar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path="/stockevents" element={< StockEventsTable />} />
      </Routes>        
    </div>
  )
}