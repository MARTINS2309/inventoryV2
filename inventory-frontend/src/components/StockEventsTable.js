import React from 'react'
import {StockDetail} from './StockDetail'

//Main function of this component is to split up the products array and extract relavant stockEvents from all stockEvents then pass the product and its stockEvents to StockDetails component repeat this for all products
export const StockEventsTable = ({products, stockEvents}) => {
   
    return (
        <div className="StockEventTable" data-testid= "s-e-t">
            {(products ?? []).map(product => {
                const {id} = product

                const relevantStockEvents = stockEvents.filter(se => se.attributes.product.data.id === id)
                
                const stockTotal = relevantStockEvents.reduce((accumulator, currentElem) =>{
                    return accumulator + currentElem.attributes.qty
                }, 0)

                return (
                    <div className="StockEventTable_Container" data-testid= "s-e-t-container" key={'p'+id}>
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