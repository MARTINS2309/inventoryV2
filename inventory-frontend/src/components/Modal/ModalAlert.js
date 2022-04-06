import { Modal } from "react-bootstrap"

const ModalAlert = ({showAlert, handleClose, alertType, alertMessage}) => {
   return(
        <div className="ModalAlert">
            <Modal show={showAlert} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{alertType}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{alertMessage}</p>
                </Modal.Body>
            </Modal>
        </div>
   )
}

export default ModalAlert