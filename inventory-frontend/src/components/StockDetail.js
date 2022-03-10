import React, { useState } from 'react'

export const StockDetail = ({name, total, stockEvents}) => {
    const [show, setShow] = useState(false);

    const listStockEvents = (stockEvents ?? []).map(stockEvent => (
        <div 
            className="StockDetail_Card"
            data-testid="stock-detail-card"
            key={'s'+stockEvent.id}
        >
            <p data-testid="p-id">ID: {stockEvent.id}</p>
            <p data-testid="p-type">TYPE: {stockEvent.attributes.type}</p>
            <p data-testid="p-qty">QUANTITY: {stockEvent.attributes.qty}</p>
            <p data-testid="p-time">TIMESTAMP: {stockEvent.attributes.publishedAt}</p>
        </div>
    ))

    return (
        <div 
            className="StockDetail" 
            data-testid="stock-detail"
        >
            <div
                className="StockDetail_Heading"
                data-testid="stock-detail-heading"
                onClick={() => setShow(!show)}
            >
                <h2>Product: {name} | Total: {total}</h2>
            </div>
            
            {show &&
                <div className="StockDetail_Body" data-testid="stock-detail-body">
                    {listStockEvents}
                </div>
            }

        </div>
    );
}