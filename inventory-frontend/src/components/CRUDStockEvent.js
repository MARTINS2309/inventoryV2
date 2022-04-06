//This component is used to create, update and delete stockevents.
//This component displays a list of all stockevents in the database.
//to the right of each stockevent is a button to edit and another to delete it.
//Then we have a form to create/edit a stockevent.
import React from "react";
import { useState, useEffect } from "react";
import { fetchData } from "./utils";
import { Modal } from "react-bootstrap";
import  TableT  from "./Table/Table";
import ModalCrUpDel from "./Modal/ModalCrUpDel";
import ModalAlert from "./Modal/ModalAlert";

export const CRUDStockEvent = () => {
    const [stockevents, setStockevents] = useState([]);
    const [products, setProducts] = useState([]);
    const [stockevent, setStockevent] = useState({});
    const [showDelete, setShowDelete] = useState(false);
    const [show, setShow] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("");

    const columns = [
        { label: "id", accessor: "id", sortable: true },
        { label: "Product", accessor: "product_id", sortable: true },
        { label: "Type", accessor: "type", sortable: true },
        { label: "Quantity", accessor: "qty", sortable: true },
        { label: "Created At", accessor: "created_at", sortable: true },
        { label: "Updated At", accessor: "updated_at", sortable: true },
        { label: "Published At", accessor: "published_at", sortable: true }
    ];

    //data retrival
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        fetchData({
        setData: setStockevents,
        url: `http://localhost:3001/api/stockevents`,
        signal: signal
        });

        fetchData({
        setData: setProducts,
        url: `http://localhost:3001/api/products`,
        signal: signal
        });

        return () => {
        controller.abort();
        };
    }, []);

    //Create a new stockevent
    const handleCreate = async event => {
        event.preventDefault();

        const controller = new AbortController();
        const signal = controller.signal;

        const body = {
            type: event.target.type.value,
            qty: event.target.qty.value,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            published_at: new Date().toISOString(),
            product_id: event.target.product_id.value
        };

        try {
            const response = await fetch("http://localhost:3001/api/stockevents", {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json"
                },
                signal: signal
            });

            if (response.status === 200) {
                handleClose();
                handleAlert("Stock event created successfully", "success");
                const res = await response.json();
                setStockevents([...stockevents, {...body, id: res[0].id}]);
            }
        } catch (error) {
            handleAlert(`Failed to create stockevent - error - ${error}`, "danger");
            console.log('error', error)
        }
    }

    //Update a stockevent
    const handleUpdate = async event => {
        event.preventDefault();

        const controller = new AbortController();
        const signal = controller.signal;

        const body = {
            type: event.target.type.value,
            qty: event.target.qty.value,
            updated_at: new Date().toISOString(),
            product_id: event.target.product_id.value
        };

        try {
            const response = await fetch(`http://localhost:3001/api/stockevents/${stockevent.id}`, {
                method: "PUT",
                body: JSON.stringify(body),
                headers: {
                "Content-Type": "application/json"
                },
                signal: signal
            });

            if (response.status === 200) {
                handleClose();
                handleAlert("Stock event updated successfully", "success");
                const res = await response.json();
                const newStockevents = stockevents.filter(se => se.id !== stockevent.id)
                setStockevents([...newStockevents,res[0]]);
            }
        } catch (error) {
            handleAlert(`Failed to update stockevent - ${error}`, "danger");
            console.log('error', error)
        }
    }

    //Delete a stockevent
    const handleDelete = async event => {
        event.preventDefault();
        
        const controller = new AbortController();
        const signal = controller.signal;
        
        try {
            const response = await fetch(`http://localhost:3001/api/stockevents/${stockevent.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                signal: signal
            });

            if (response.status === 200) {
                handleClose();
                handleAlert("Stock event deleted successfully", "success");
                setStockevents(stockevents.filter(se => se.id !== stockevent.id));
            }
        } catch (error) {
            handleAlert(`Failed to delete stockEvent - error - ${error}`, "danger");
            console.log('error', error);
        }
    }
    
    //Show the modal to create a new stockevent
    const handleShowCreate = () => {
        setStockevent({});
        setShowDelete(false);
        setShow(true);
    }

    //Show the modal to edit a stockevent
    const handleShowUpdate = stockevent => {
        setStockevent(stockevent);
        setShowDelete(false);
        setShow(true);
    }

    //Show the modal to delete a stockevent
    const handleShowDelete = stockevent => {
        setStockevent(stockevent);
        setShowDelete(true);
        setShow(true);
    }

    //pass the alert and display it
    const handleAlert = (message, type) => {
        setAlertMessage(message);
        setAlertType(type);
        setShowAlert(true);
    }

    //Close the Modal and clear the state
    const handleClose = () => {
        setShowDelete(false);
        setShow(false);
        setShowAlert(false);
        setStockevent({});
        setAlertMessage("");
        setAlertType("");      
    }

    return (
        <div className="CRUDStockEvent">
            <div className="se-table">
                <TableT
                    columns={columns}
                    data={stockevents}
                    caption={"Stockevent"}
                    handleShowUpdate={handleShowUpdate}
                    handleShowDelete={handleShowDelete}
                    handleShowCreate={handleShowCreate}
                />
            </div>

            <ModalCrUpDel
                show={show}
                showDelete={showDelete}
                handleClose={handleClose}
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
                handleCreate={handleCreate}
                item={stockevent}
                item_type={"Stock Event"}
                items={products}
            />

            <ModalAlert 
                show={showAlert}
                handleClose={handleClose}
                alertType={alertType}
                alertMessage={alertMessage}
            />
        </div>
    );
}