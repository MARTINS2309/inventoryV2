import React from 'react';
import { Routes, Route} from 'react-router-dom';
import {StockEventsTable} from './components/StockEventsTable';
import {Navibar} from './components/Navibar';
import {Home} from './components/Home';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CRUDProduct } from './components/CRUDProduct';
import { CRUDStockEvent } from './components/CRUDStockEvent';
import { TableTest } from './components/TableTest';


//Main app comonent to deal with routing and calling components
export const App = () => {

  return (
    <div className="App" data-testid="app">
      <Navibar />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path="/stockeventstable" element={< StockEventsTable />} />
          <Route path="/products" element={< CRUDProduct />} />
          <Route path="/stockevents" element={< CRUDStockEvent />} />
          <Route path="/tabletest" element={ <TableTest/>} />
          <Route path='*' element={ <div>Not Found</div>} />
        </Routes>
        
    </div>
  )
}