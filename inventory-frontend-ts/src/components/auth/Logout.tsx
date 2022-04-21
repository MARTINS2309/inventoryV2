import React, { FC } from "react";
import { Modal } from "../modal/modal/modal";
import { ModalProps } from "../types/ModalProps";
import "./Logout.css";

const Logout: FC<ModalProps> = ({ isOpen, onClickToggle }) => {

    const onClickLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        onClickToggle();
    };

    const onClickCancel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        onClickToggle();
    };

    return (
        <Modal
            isOpen={isOpen}
            hide={onClickToggle}
            headerText="Logout"
            modalContent={
                <form>
                <div className="logout-inputs">
                    Are you sure you want to logout?
                </div>
                <div className="form-buttons form-buttons-sm">
                    <div className="form-btn-left">
                        <button
                            style={{ marginLeft: ".5em" }}
                            className="action-btn"
                            onClick={onClickLogin}
                        >
                        Logout
                        </button>
                        <button
                            style={{ marginLeft: ".5em" }}
                            className="cancel-btn"
                            onClick={onClickCancel}
                        >
                        Close
                        </button>
                    </div>
                </div>
            </form>
            }
        />
    )
}

export default Logout;