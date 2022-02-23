import React from 'react'
import StockDetail from './StockDetail'

function StockEventsTable(props){
    const {products, stockEvents} = props

    return (
        <div className="StockEventTable">
            {products.map(product => {
                const {id} = product

                const relevantStockEvents = stockEvents.filter(se => se.attributes.product.data.id === product.id)
                
                const stockTotal = relevantStockEvents.reduce((accumulator, currentElem) =>{
                    return accumulator + currentElem.attributes.qty
                }, 0)

                return (
                    <div className="StockEventTable_ProductsContainer">
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

export default StockEventsTable;