import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import {StockEventsTable} from './components/StockEventsTable';

//fetch all stock events
//separate by different products
//Display them


/*
//2 data types
// Product
const fetchedProducts = [
  {
    id: 1,
    attributes:{
      name: "test",
      createdAt:	"2022-02-18T10:47:49.151Z",
      updatedAt:	"2022-02-18T10:58:40.866Z",
      publishedAt:	"2022-02-18T10:58:40.865Z", 
    }
  }
]
//Stock Events
const fetchedStockEvents = [
  {
    id: 1,
    attributes:{
      type: 'add',
      qty: 100,
      createdAt:	"2022-02-18T10:59:02.976Z",
      updatedAt:	"2022-02-18T10:59:23.930Z",
      publishedAt:	"2022-02-18T10:59:23.929Z",
      product: {
        data: fetchedProducts[0]
      }
    }
  }
]

class App extends React.Component{
  state = {
    fetchedProducts,
    fetchedStockEvents
  }

  async componentDidMount(){
    
    const productsRes = await axios({
      method: 'GET',
      url: 'http://localhost:1337/api/products'
    })

    const stockEventsRes = await axios({
      method: 'GET',
      url: 'http://localhost:1337/api/stockevents',
      params: {
        populate: '*'
      },
    })
    
    const fetchedProducts = productsRes.data.data
    const fetchedStockEvents = stockEventsRes.data.data
    
    this.setState({fetchedProducts,fetchedStockEvents})
  }

  render(){
    const {fetchedProducts,fetchedStockEvents} = this.state
    
    return (
      <div className="App">
        <h1>Inventory v2</h1>
        <StockEventsTable 
          products={fetchedProducts}
          stockEvents={fetchedStockEvents}
        />
      </div>
    )
  }
}

export default App;
*/
export const App = () => {
  const [fetchedProducts, setFectechedProducts] = useState(
    [
      {
        id: 1,
        attributes:{
          name: "test",
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
            data: fetchedProducts[0]
          }
        }
      }
    ]
  );

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
    
    fetchProducts().catch(console.error)
    fetchStockEvents().catch(console.error)
  },[]);

  return (
    <div className="App">
      <h1>Inventory v2</h1>
      <StockEventsTable 
        products={fetchedProducts}
        stockEvents={fetchedStockEvents}
      />
    </div>
  )

}
