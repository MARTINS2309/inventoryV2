import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import {StockEventsTable} from './components/StockEventsTable';
import {Navibar} from './components/Navbar';
import {Home} from './components/Home';


//fetch all stock events
//separate by different products
//Display them
export const App = () => {
  const [fetchedProducts, setFectechedProducts] = useState(
    [
      {
        id: 1,
        attributes:{
          name: "App failed to connect",
          createdAt:	"2022-02-18T10:47:49.151Z",
          updatedAt:	"2022-02-18T10:58:40.866Z",
          publishedAt:	"2022-02-18T10:58:40.865Z", 
        }
      }
    ] 
  );
  const [fetchedStockEvents, setFetchedStockEvents] = useState(
    [
      {
        id: 1,
        attributes:{
          type: 'add',
          qty: 100,
          createdAt:	"2022-02-18T10:59:02.976Z",
          updatedAt:	"2022-02-18T10:59:23.930Z",
          publishedAt:	"2022-02-18T10:59:23.929Z",
          product: {
            data: {
              id: 1,
              attributes:{
                name: "App failed to connect",
                createdAt:	"2022-02-18T10:47:49.151Z",
                updatedAt:	"2022-02-18T10:58:40.866Z",
                publishedAt:	"2022-02-18T10:58:40.865Z", 
              }
            }
          }
        }
      }
    ]
  );
  const [isSubscribed, setIsSubscribed] = useState(true);

  useEffect(()=>{
    const fetchProducts = async () => {
      const productsRes =  await axios({
        method: 'GET',
        url: 'http://localhost:1337/api/products'
      })
      setFectechedProducts(productsRes.data.data)
    }

    const fetchStockEvents = async () => {
      const stockEventsRes = await axios({
        method: 'GET',
        url: 'http://localhost:1337/api/stockevents',
        params: {
          populate: '*'
        },
      })
      setFetchedStockEvents(stockEventsRes.data.data)
    }

    if (isSubscribed){
      fetchProducts().catch(console.error)
      fetchStockEvents().catch(console.error)
      setIsSubscribed(false)
    }
  },[]);

  return (
    <div className="App" data-testid="app">
      <BrowserRouter>
          <Navibar />
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path="/stockevents" element={<StockEventsTable products={fetchedProducts} stockEvents={fetchedStockEvents} />} />
          </Routes>
        </BrowserRouter>
    </div>
  )

}