//This component is used to create, update and delete products.
//This component displays a list of all products in the database.
//to the right of each product is a button to edit and another to delete it.
//There is a form to enter the details for creating and editing products.
import React from "react";
import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { fetchData } from "./utils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

export const CRUDProduct = () => {
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({});
    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("");

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
                setProducts([...products, res[0]]);
                return;
            }
        } catch (error) {
            handleAlert(`Error creating product: ${event.target.name.value} error: ${error}`, "danger");
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
        setShow(true);
        setShowDelete(false);
        setProduct({});
    }

    //Show form to update a product
    const handleShowUpdate = product => {
        setShow(true);
        setShowDelete(false);
        setProduct(product);
    }

    //Show form to delete a product
    const handleShowDelete = product => {
        setShow(true);
        setShowDelete(true);
        setProduct(product);
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
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Created at</th>
                            <th>Updated at</th>
                            <th>Published at</th>
                            <th>
                                <button className="btn btn-success" onClick={handleShowCreate}>
                                    Create Product
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.created_at}</td>
                                <td>{product.updated_at}</td>
                                <td>{product.published_at}</td>
                                <td>
                                    <button className="btn btn-primary" onClick={() => handleShowUpdate(product)}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button className="btn btn-danger" onClick={() => handleShowDelete(product)}>
                                        <FontAwesomeIcon icon={faTrashAlt} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{showDelete ? "Delete product" : product.id ? "Edit product" : "Create product"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={showDelete ? handleDelete : product.id ? handleUpdate : handleCreate}>
                        {showDelete ?(
                            <div className="form-group">
                                 <p>Are you sure you want to delete {product.name}?</p>
                            </div>) : ( 
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" className="form-control" id="name" name="name" defaultValue={product.name} />
                            </div>)
                        }
                        <div className="form-buttons">
                            <button type="submit" className={showDelete ? "btn btn-danger" : "btn btn-primary"}>{showDelete ? "Delete" : product.id ? "Update" : "Create"}</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

            <Modal show={showAlert} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{alertType}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{alertMessage}</p>
                </Modal.Body>
            </Modal>
            

            
        </div>
    );


}