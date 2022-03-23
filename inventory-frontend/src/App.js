import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {StockEventsTable} from './components/StockEventsTable';
import {Navibar} from './components/Navbar';
import {Home} from './components/Home';


//Main app comonent to deal with routing and calling components
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