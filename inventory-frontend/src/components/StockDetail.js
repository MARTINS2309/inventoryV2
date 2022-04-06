import React, { useState } from 'react'
import { CRUDTable } from './CRUD/CRUDTable';

export const StockDetail = ({name, total, stockEvents, id}) => {
    //use state show to determine if stockEvents are displayed
    const [show, setShow] = useState(false);


    const columnsStockEvent = [
        { label: "id", accessor: "id", sortable: true },
        { label: "Product", accessor: "product_id", sortable: true },
        { label: "Type", accessor: "type", sortable: true },
        { label: "Quantity", accessor: "qty", sortable: true },
        { label: "Created At", accessor: "created_at", sortable: true },
        { label: "Updated At", accessor: "updated_at", sortable: true },
        { label: "Published At", accessor: "published_at", sortable: true }
    ];

    const url = "products";
    const url2 = "stockevents";

    //display product with total in main window and stockEvents when clicked
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
                         <CRUDTable
                            columns={columnsStockEvent}
                            url={url2}
                            url2={url}
                            prod_id={id}
                        />
                </div>
            }

        </div>
    );
}