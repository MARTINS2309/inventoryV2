//This component is used to create, update and delete items.
//This component displays a table of all items in the database using Table component.
// to the right of each item is a button to edit and another to delete it.
// to perform these actions we use ModalCrUpDel and ModalAlert component.
// you can call this component with the following props: columns, url,(optional) url2,(optional: only used when url2 is also used) prod_id 
// if url2 is passed then it goes with the stockevent version of the component else it goes with the product version.
// if prod_id is also passed then it goes with the stockent version of the component and it filters the table by the product_id.
import React from "react";
import { useState, useEffect } from "react";
import { fetchData } from "../utils";
import TableT from "../Table/TableT";
import ModalCrUpDel from "../Modal/ModalCrUpDel";
import ModalAlert from "../Modal/ModalAlert";

export const CRUDTable = ({columns, url, url2, prod_id}) => {
    const [items, setItems] = useState([]);
    const [item, setItem] = useState({});
    const [items2, setItems2] = useState([]);
    const [showDelete, setShowDelete] = useState(false);
    const [show, setShow] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("");

    //columns are imported

    //data retrival
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        if( url2 ){
            fetchData({
                setData: setItems,
                url: `http://localhost:3001/api/${url}`,
                signal: signal
            });
                    
            fetchData({
                setData:setItems2,
                url: `http://localhost:3001/api/${url2}`,
                signal: signal
            });        
        }
        else{
            fetchData({
                setData: setItems,
                url: `http://localhost:3001/api/${url}`,
                signal: signal
            });
        }

        return () => {
        controller.abort();
        };
    }, []);

    //Create a new item
    const handleCreate = async event => {
        event.preventDefault();

        const controller = new AbortController();
        const signal = controller.signal;

        let body = {};

        if( url2 ){
            body = {
                type: event.target.type.value,
                qty: event.target.qty.value,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                published_at: new Date().toISOString(),
                product_id: event.target.product_id.value
            };
        }
        else{
            body = {
                name: event.target.name.value,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                published_at: new Date().toISOString()
            };
        }

        try {
            const response = await fetch(`http://localhost:3001/api/${url}`, {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json"
                },
                signal: signal
            });

            if (response.status === 200) {
                handleClose();
                handleAlert(`${url2? "Stock Event": event.target.name.value } created successfully`, "success");
                const res = await response.json();
                setItems([...items, {...body,id: res[0].id}]);    
            }
        } catch (error) {
            handleAlert(`Error creating ${url2 ? "Stock Event": event.target.name.value} error: ${error}`, "danger");
            console.log('error', error);
        }
    }

    //Update an item
    const handleUpdate = async event => {
        event.preventDefault();

        const controller = new AbortController();
        const signal = controller.signal;

        let body = {};

        if( url2 ){
            body = {
                type: event.target.type.value,
                qty: event.target.qty.value,
                created_at: item.created_at,
                updated_at: new Date().toISOString(),
                published_at: item.published_at,
                product_id: event.target.product_id.value
            };
        }else{
            body = {
                name: event.target.name.value,
                created_at: item.created_at,
                updated_at: new Date().toISOString(),
                published_at: item.published_at
            };
        }
        
        try{
            const response = await fetch(`http://localhost:3001/api/${url}/${item.id}`, {
                method: "PUT",
                body: JSON.stringify(body),
                headers: {
                "Content-Type": "application/json"
                },
                signal: signal
            });

            if(response.status === 200){
                handleClose();
                handleAlert(`${url2 ? "Stock Event": event.target.name.value} updated successfully`, "success");
                const res = await response.json();
                const newItems = items.filter(it => it.id !== item.id)
                setItems([...newItems,{...body,id: res[0].stockevent_id}]);
            }
        }catch(error){
            handleAlert(`Error updating ${url2 ? "Stock Event": event.target.name.value} error: ${error}`, "danger");
            console.log('error', error);
        }
    }

    //Delete an item
    const handleDelete = async event => {
        event.preventDefault();

        const controller = new AbortController();
        const signal = controller.signal;

        try{
            const response = await fetch(`http://localhost:3001/api/${url}/${item.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                signal: signal
            });

            if(response.status === 200){
                handleClose();
                handleAlert(`${url2 ? "Stock Event": item.name} deleted successfully`, "success");
                setItems(items.filter(it => it.id !== item.id));
            }
        }catch(error){
            handleAlert(`Error deleting ${url2 ? "Stock Event": item.name} error: ${error}`, "danger");
            console.log('error', error);
        }
    }
    
    
    //Show the modal to create a new item
    const handleShowCreate = () => {
        setItem({});
        setShowDelete(false);
        setShow(true);
    }

    //Show the modal to edit an item
    const handleShowUpdate = item => {
        setItem(item);
        setShowDelete(false);
        setShow(true);
    }

    //Show the modal to delete an item
    const handleShowDelete = item => {
        setItem(item);
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
        setItem({});
        setAlertMessage("");
        setAlertType("");      
    }

    return(
        <div className={`CRUDTable_${url}`}>
            <div className="Table">
                <TableT
                    columns={columns}
                    data={prod_id ? items.filter(it => it.product_id === prod_id) : items}
                    caption={url2 ? "Stock Event": "Product"}
                    handleShowUpdate={handleShowUpdate}
                    handleShowDelete={handleShowDelete}
                    handleShowCreate={handleShowCreate}
                />
            </div>

            <ModalAlert 
                showAlert={showAlert}
                handleClose={handleClose}
                alertType={alertType}
                alertMessage={alertMessage}
            />
            
            <ModalCrUpDel
                show={show}
                showDelete={showDelete}
                handleClose={handleClose}
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
                handleCreate={handleCreate}
                item={item}
                item_type={"Stock Event"}
                items={url2 ? items2: null}
                default_item={prod_id}
            />
        </div>
    )

}
