import React, { useEffect, useState } from 'react';
import {StockDetail} from './StockDetail';
import {fetchProducts, fetchStockEvents} from './utils/API'


//fetch all stock events and products
//separate stock events by different products
//Display Product with all relevant stock events to stock Detail if viewed

export const StockEventsTable = () => {
    //example state
    const [fetchedProducts, setFectechedProducts] = useState(
        [
          {
            id: 1,
            name: "App failed to connect",
            createdAt:	"2022-02-18T10:47:49.151Z",
            updatedAt:	"2022-02-18T10:58:40.866Z",
            publishedAt:	"2022-02-18T10:58:40.865Z", 
          }
        ] 
    );
    const [fetchedStockEvents, setFetchedStockEvents] = useState(
      [
        {
          id: 1,
          type: 'add',
          qty: 100,
          createdAt:	"2022-02-18T10:59:02.976Z",
          updatedAt:	"2022-02-18T10:59:23.930Z",
          publishedAt:	"2022-02-18T10:59:23.929Z",
          product_id: 1
        }
      ]
    );
    const [isSubscribed, setIsSubscribed] = useState(true);
    // data retrival
    useEffect(()=>{
        //use isSubscibed to limit API calls
        if (isSubscribed){
            //import utils from API.js and pass state setter to function
            fetchProducts( {setFectechedProducts} ).catch(console.error)
            fetchStockEvents( {setFetchedStockEvents} ).catch(console.error)
            setIsSubscribed(false)
        }
    },[isSubscribed]);
    
    //filter stock events by product
    // calculate quantity
    // pass each (product details, quantity and relevant stockEvents) to stock detail
    return (
        <div className="StockEventTable" data-testid= "s-e-t">
            {(fetchedProducts ?? []).map(product => {
                const {id} = product

                const relevantStockEvents = fetchedStockEvents.filter(se => se.product_id === id)
                
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
                            name={product.name} 
                            total={stockTotal} 
                            stockEvents= {relevantStockEvents}
                        />
                    </div>
                )
            })}
        </div>
    )
};