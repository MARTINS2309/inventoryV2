import React, { useEffect, useState } from 'react';
import {StockDetail} from './StockDetail';
import {fetchProducts, fetchStockEvents} from './utils/API'


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
        if (isSubscribed){
            fetchProducts({setFectechedProducts}).catch(console.error)
            fetchStockEvents({setFetchedStockEvents}).catch(console.error)
            setIsSubscribed(false)
        }
    },[isSubscribed]);
    

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