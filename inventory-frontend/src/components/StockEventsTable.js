import React, { useEffect, useState } from 'react';
import {StockDetail} from './StockDetail';
import {fetchData} from './utils.js';
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
            created_at:	"2022-02-18T10:47:49.151Z",
            updated_at:	"2022-02-18T10:58:40.866Z",
            published_at:	"2022-02-18T10:58:40.865Z"
          }
        ] 
    );
    const [fetchedStockEvents, setFetchedStockEvents] = useState(
      [
        {
          id: 1,
          type: 'add',
          qty: 100,
          created_at:	"2022-02-18T10:59:02.976Z",
          updated_at:	"2022-02-18T10:59:23.930Z",
          published_at:	"2022-02-18T10:59:23.929Z",
          product_id: 1
        }
      ]
    );

    

    // data retrival
    useEffect(()=>{
        const controller = new AbortController();
        const signal = controller.signal;

        fetchData({setData: setFectechedProducts, url: `http://localhost:3001/api/products`, signal: signal});
        fetchData({setData: setFetchedStockEvents, url: `http://localhost:3001/api/stockevents`, signal: signal});

        return () => {controller.abort();};
    }, [])

    //map stock events to products
    //filter stock events by product
    // calculate quantity
    // pass each (product details, quantity and relevant stockEvents) to stock detail
    return (
        <div className="StockEventTable" data-testid= "s-e-t">
            {(fetchedProducts ?? []).map(product => {
                const {id} = product

                const relevantStockEvents = fetchedStockEvents.filter(se => se.product_id === id)
                
                const stockTotal = relevantStockEvents.reduce((accumulator, currentElem) =>{
                    return accumulator + currentElem.qty
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
                            id={id}
                        />
                    </div>
                )
            })}
        </div>
    )
};

/*

*/