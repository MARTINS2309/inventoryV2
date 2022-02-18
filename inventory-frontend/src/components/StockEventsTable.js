import React from "react";
import StockDetail from "./StockDetail";

function StockEventsTable(props){
    const {products, stockEvents} = props;

    return(
        <div className="StockEventTable">
            {products.map(product =>{
                const {id} = product;

                const relevantStockEvents = stockEvents.filter(se => se.product.id === product.id);

                const stockTotal = relevantStockEvents.reduce((acc, curElement) => {
                    return acc + curElement.qty
                }, 0);

                return(
                    <div className="StockEventsTable_ProductsContainer">
                      <StockDetail 
                        name={product.name} 
                        total = {stockTotal}
                        stockEvents = {relevantStockEvents}
                      />  
                      
                 </div>
                )
            })}          
        </div>
    )
};

export default StockEventsTable;