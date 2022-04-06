//This component is used to create, update and delete products.
//This component displays a list of all products in the database.
//to the right of each product is a button to edit and another to delete it.
//There is a form to enter the details for creating and editing products.
import React from "react";
import { useState, useEffect } from "react";
import { fetchData } from "./utils";
import  TableT  from "./Table/Table";
import ModalCrUpDel from "./Modal/ModalCrUpDel";
import ModalAlert from "./Modal/ModalAlert";

export const CRUDProduct = () => {
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({});
    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("");

    const columns = [
        { label: "Id", accessor: "id", sortable: true },
        { label: "Name", accessor: "name", sortable: true },
        { label: "Created At", accessor: "created_at", sortable: true },
        { label: "Updated At", accessor: "updated_at", sortable: true },
        { label: "Published At", accessor: "published_at", sortable: true }
    ];
    //data retrival
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        fetchData({
            setData: setProducts,
            url: `http://localhost:3001/api/products`,
            signal: signal
        });

        return () => {
            controller.abort();
        };
    }, []);

    //Create a new product
    const handleCreate = async event => {
        event.preventDefault();

        const controller = new AbortController();
        const signal = controller.signal;

        const body = {
            name: event.target.name.value,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            published_at: new Date().toISOString()
        };

        try {
            const response = await fetch("http://localhost:3001/api/products", {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json"
                },
                signal: signal
            });

            if (response.status === 200) {
                handleClose();
                handleAlert("Product created successfully", "success");
                //extract product from response
                const res = await response.json();
                setProducts([...products, {...body,id: res[0].id}]);
            }
        } catch (error) {
            handleAlert(`Error creating product: ${event.target.name.value} error: ${error}`, "danger");
            console.log('error', error);
        }
    }

    //Update a product
    const handleUpdate = async event => {
        event.preventDefault();

        const controller = new AbortController();
        const signal = controller.signal;

        const body = {
            name: event.target.name.value,
            updated_at: new Date().toISOString()
        };

        try {
            const response = await fetch(`http://localhost:3001/api/products/${product.id}`, {
                method: "PUT",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json"
                },
                signal: signal
            });

            if (response.status === 200) {
                handleClose();
                handleAlert("Product updated successfully", "success");
                const newProducts = products.filter(p => p.id !== product.id);
                const res = await response.json();
                setProducts([...newProducts, res[0]]);
            }
        } catch (error) {
            handleAlert(`Error updating product: ${product.name} error: ${error}`, "danger");
            console.log('error', error)
        }
        
    }

    //Delete a product
    const handleDelete = async event => {
        event.preventDefault();

        const controller = new AbortController();
        const signal = controller.signal;

        try {
            const response = await fetch(`http://localhost:3001/api/products/${product.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                signal: signal
            });

            if (response.status === 200) {
                handleClose();
                handleAlert("Product deleted successfully", "success");
                const newProducts = products.filter(p => p.id !== product.id);
                setProducts(newProducts);
            }
        } catch (error) {
            handleAlert(`Failed to delete Product: ${product.name} error: ${error}`, "danger");
            console.log('error', error)
        }
        
    }

    //Show form to create a new product
    const handleShowCreate = () => {
        setProduct({});
        setShowDelete(false);
        setShow(true);
    }

    //Show form to update a product
    const handleShowUpdate = product => {
        setProduct(product);
        setShowDelete(false);
        setShow(true);
    }

    //Show form to delete a product
    const handleShowDelete = product => {
        setProduct(product);
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
        setProduct({});
        setAlertMessage("");
        setAlertType("");      
    }

    return (
        <div className="CRUDProduct">
            <div className="p-table">
                <TableT 
                    columns={columns}
                    data={products}
                    caption={"Product"}
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
                item={product}
                item_type={"Product"}
            />

            <ModalAlert 
                showAlert={showAlert}
                handleClose={handleClose}
                alertType={alertType}
                alertMessage={alertMessage}
            />
        </div>
    );
}