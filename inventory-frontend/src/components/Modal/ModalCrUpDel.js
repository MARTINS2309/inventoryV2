import { Modal } from "react-bootstrap"

const ModalCrUpDel = ({show, showDelete, handleClose, handleDelete, handleUpdate, handleCreate, item, item_type, items, default_item}) => {
       
    return(
        <div className="ModalCrUpDel">
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{showDelete ? `Delete ${item_type}` : item.id ? `Update ${item_type}` : `Create ${item_type}`}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={showDelete ? handleDelete : item.id ? handleUpdate : handleCreate}>
                        {showDelete ? (
                            <div className="form-group">
                                <p>Are you sure you want to delete {item.name ? item.name : `this ${item_type}`}?</p>
                            </div>)
                            : items ? (
                                <>
                                    <div className="form-group">
                                        <label>Type</label>
                                        <select defaultValue={item.type} name="type">
                                            <option value="add">ADD</option>
                                            <option value="remove">REMOVE</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Qty</label>
                                        <input type="number" className="form-control" name="qty" defaultValue={item.qty} />
                                    </div>
                                    <div className="form-group">
                                        <label>Product ID</label>
                                        <select defaultValue={default_item ? default_item :item.product_id} name="product_id">
                                            {items.map(product => (
                                                <option key={product.id} value={product.id}>{product.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </>
                            )
                            : ( 
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" className="form-control" id="name" name="name" defaultValue={item.name} />
                                </div>)
                            
                        }
                        <div className="form-buttons">
                            <button type="submit" className={showDelete ? "btn btn-danger" : "btn btn-primary"}>{showDelete ? "Delete" : item.id ? "Update" : "Create"}</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ModalCrUpDel