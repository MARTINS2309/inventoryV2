import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {StockDetail} from './StockDetail';


//fetch all stock events
//separate by different products
//Display them
export const StockEventsTable = () => {
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
        <div className="StockEventTable" data-testid= "s-e-t">
            {(fetchedProducts ?? []).map(product => {
                const {id} = product

                const relevantStockEvents = fetchedStockEvents.filter(se => se.attributes.product.data.id === id)
                
                const stockTotal = relevantStockEvents.reduce((accumulator, currentElem) =>{
                    return accumulator + currentElem.attributes.qty
                }, 0)

                return (
                    <div 
                        className="StockEventTable_Container" 
                        data-testid= "s-e-t-container" 
                        key={'p'+id}
                    >
                        <StockDetail 
                            name={product.attributes.name} 
                            total={stockTotal} 
                            stockEvents= {relevantStockEvents}
                        />
                    </div>
                )
            })}
        </div>
    )
};