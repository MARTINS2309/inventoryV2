import React from 'react'
import {StockDetail} from './StockDetail'

export const StockEventsTable = ({products, stockEvents}) => {
   
    return (
        <div className="StockEventTable">
            {(products ?? []).map(product => {
                const {id} = product

                const relevantStockEvents = stockEvents.filter(se => se.attributes.product.data.id === id)
                
                const stockTotal = relevantStockEvents.reduce((accumulator, currentElem) =>{
                    return accumulator + currentElem.attributes.qty
                }, 0)

                return (
                    <div className="StockEventTable_ProductsContainer" key={'p'+id}>
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