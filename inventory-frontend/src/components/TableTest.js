import React from "react";
import { TableT } from "./Table/Table";


export const TableTest = () => {
    
    return (
        <div>
            <h1>TableTest</h1>
            <TableT
                data={[
                    {
                        id: 1,
                        name: "John",
                        age: "20",
                        
                    },
                    {
                        id: 2,
                        name: "Jane",
                        age: "30",
                        
                    },
                    {
                        id: 3,
                        name: "Joe",
                        age: "40",
                        
                    },
                ]}
                columns={[
                    { label: "id", accessor: "id", sortable: true },
                    { label: "Name", accessor: "name", sortable: true },
                    { label: "Age", accessor: "age", sortable: true },
                ]}
                caption="Table Test"
            />
        </div>
    );
}