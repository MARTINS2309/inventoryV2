//This component is used to create, update and delete products.
//At the top of this component we have a form to create a new product in a box.
//Then this component displays a list of all products in the database.
//to the right of each product is a button to edit and another to delete it.

import React from "react";
import { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { fetchData } from "./utils";

export const CRUDProduct = () => {
    const [products, setProducts] = useState([]);
    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("");
    const [product, setProduct] = useState({});

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
                setShow(false);
                setAlertMessage("Product created successfully");
                setAlertType("success");
                setShowAlert(true);
                //extract product from response
                const res = await response.json();
                setProducts([...products, res[0]]);
                return;
            }
        } catch (error) {
            if (error.name === "AbortError") {
                return;
            }
        }
        setAlertMessage("Failed to create product");
        setAlertType("danger");
        setShowAlert(true);
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
                setShow(false);
                setAlertMessage("Product updated successfully");
                setAlertType("success");
                setShowAlert(true);
                //remove old product from list with id
                const newProducts = products.filter(p => p.id !== product.id);
                //extract product from response
                const res = await response.json();
                setProducts([...newProducts, res[0]]);
                return;
            }
        } catch (error) {
            if (error.name === "AbortError") {
                return;
            }
        }
        setAlertMessage("Failed to update product");
        setAlertType("danger");
        setShowAlert(true);
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
                setShow(false);
                setAlertMessage("Product deleted successfully");
                setAlertType("success");
                setShowAlert(true);
                //remove old product from list with id
                const newProducts = products.filter(p => p.id !== product.id);
                setProducts(newProducts);
                return;
            }
        } catch (error) {
            if (error.name === "AbortError") {
                return;
            }
        }
        setAlertMessage("Failed to delete product");
        setAlertType("danger");
        setShowAlert(true);
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

    //Close alert message
    const handleClose = () => {
        setShowAlert(false);
    }

    //Hide form after cancelling
    const handleCancel = () => {
        setProduct({});
        setShow(false);
        setShowDelete(false);
    }

    return (
        <div className="CRUDProduct">
            <Alert show={showAlert} variant={alertType} onClose={handleClose} dismissible>
                <p>{alertMessage}</p>
            </Alert>

            <div className="product-list">
                <ul>
                    {products.map(product => (
                        <li key={product.id}>
                            <span className="product-name">{product.name}</span>
                            <span className="button-group">
                                <Button onClick={() => handleShowUpdate(product)}>Edit</Button>
                                <Button onClick={() => handleShowDelete(product)}>Delete</Button>
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="create-product-button">
                <Button onClick={handleShowCreate}>Create New Product</Button>
            </div>

            {show&& 
                <div className="create-product-form">
                    <Form onSubmit={product.id ? handleUpdate : handleCreate }>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" defaultValue={product.name} />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            {product.id ? "Update" : "Create"}
                        </Button>

                        {showDelete &&  
                            <Button variant="danger" onClick={handleDelete}>Delete</Button>
                        }

                        {product.id && (
                            <Button variant="secondary" onClick={() => handleCancel }>
                                Cancel
                            </Button>
                        )}
                    </Form>
                </div>}
            
        </div>
    );


}