import React, { useState } from 'react'

export const StockDetail = ({name, total, stockEvents}) => {
    const [show, setShow] = useState(false);

    const listStockEvents = stockEvents.map(stockEvent => (
        <div 
            className="StockEventsTable_Card"
            key={'s'+stockEvent.id}
        >
            <p>ID: {stockEvent.id}</p>
            <p>TYPE: {stockEvent.attributes.type}</p>
            <p>QUANTITY: {stockEvent.attributes.qty}</p>
            <p>TIMESTAMP: {stockEvent.attributes.publishedAt}</p>
        </div>
    ))

    return (
        <div className="StockDetail" onClick={() => setShow(!show)}>
            <h2>Product: {name} | Total: {total}</h2>
            {show &&
                <div>
                    {listStockEvents}
                </div>
            }
        </div>
    );
}