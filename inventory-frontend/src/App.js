import React from 'react';
import './App.css';
import StockEventsTable from './components/StockEventsTable';

//2 data types

// Product
const fetchedProducts = [
  {id: 1, name: "product", thumbnail: "https://www.nicepng.com/png/detail/443-4431327_png-file-fa-fa-product-icon.png"},
  {id: 2, name: "other", thumbnail: "https://www.nicepng.com/png/detail/443-4431327_png-file-fa-fa-product-icon.png"},
  {id: 3, name: "stuff", thumbnail: "https://www.nicepng.com/png/detail/443-4431327_png-file-fa-fa-product-icon.png"}
];

//Stock Events
const fetchedStockEvents = [
  {id: 1, type: 'add', qty: 200, product: fetchedProducts[0]},
  {id: 2, type: 'add', qty: 100, product: fetchedProducts[0]},
  {id: 3, type: 'remove', qty: -200, product: fetchedProducts[0]},
  {id: 4, type: 'add', qty: 200, product: fetchedProducts[1]},
  {id: 5, type: 'remove', qty: -100, product: fetchedProducts[1]},
  {id: 6, type: 'add', qty: 200, product: fetchedProducts[1]},
  {id: 7, type: 'add', qty: -50, product: fetchedProducts[0]},
  {id: 8, type: 'remove', qty: -50, product: fetchedProducts[1]},
  {id: 9, type: 'add', qty: 50, product: fetchedProducts[2]},
];

//fetch all stock events

//separate by different products

//Display them



function App() {
  return (
    <div className="App">
        <StockEventsTable 
          products={fetchedProducts}
          stockEvents={fetchedStockEvents}  
        />
    </div>
  )
};

export default App;
