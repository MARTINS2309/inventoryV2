import React from 'react';
import { Routes, Route} from 'react-router-dom';
import {StockEventsTable} from './components/StockEventsTable';
import {Navibar} from './components/Navibar';
import {Home} from './components/Home';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {CRUDTable} from "./components/CRUD/CRUDTable";


//Main app comonent to deal with routing and calling components
export const App = () => {
  const columnsProduct = [
  { label: "Id", accessor: "id", sortable: true },
  { label: "Name", accessor: "name", sortable: true },
  { label: "Created At", accessor: "created_at", sortable: true },
  { label: "Updated At", accessor: "updated_at", sortable: true },
  { label: "Published At", accessor: "published_at", sortable: true }
];
const columnsStockEvent = [
  { label: "id", accessor: "id", sortable: true },
  { label: "Product", accessor: "product_id", sortable: true },
  { label: "Type", accessor: "type", sortable: true },
  { label: "Quantity", accessor: "qty", sortable: true },
  { label: "Created At", accessor: "created_at", sortable: true },
  { label: "Updated At", accessor: "updated_at", sortable: true },
  { label: "Published At", accessor: "published_at", sortable: true }
];

const url = "products";
const url2 = "stockevents";



  return (
    <div className="App" data-testid="app">
      <Navibar />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path="/stockeventstable" element={< StockEventsTable />} />
          <Route path="/products" element={<CRUDTable columns={columnsProduct} url={url} />} />
          <Route path="/stockevents" element={<CRUDTable columns={columnsStockEvent} url={url2} url2={url} />} />
          
          <Route path='*' element={ <div>Not Found</div>} />
        </Routes>
        
    </div>
  )
}