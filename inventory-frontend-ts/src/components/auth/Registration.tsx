import React, {FC, useReducer} from "react";
import { Modal } from "../modal/modal/modal";
import "./Registration.css";
import { ModalProps } from "../types/ModalProps";
import userReducer from "./common/UserReducer";
import { allowSubmit } from "./common/Helpers";
import PasswordComparison from "./common/PasswordComparison";

const Regirstration: FC<ModalProps> = ({ isOpen , onClickToggle }) => {
    const [
        { userName, password, email, passwordConfirm, resultMsg, isSubmitDisabled },
        dispatch,
    ] = useReducer(userReducer, {
        userName: "martinsm",
        password: "",
        email: "martins2309@gmail.com",
        passwordConfirm: "",
        resultMsg: "",
        isSubmitDisabled: true,
    });

    const onChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ payload: e.target.value, type: "userName" });
        if (!e.target.value) {
            allowSubmit(dispatch, "Username cannot be empty", true);
        } else {
            allowSubmit(dispatch, "", false);
        };
    };

    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ payload: e.target.value, type: "email" });
        if (!e.target.value) {
            allowSubmit(dispatch,"Email cannot be empty", true);
        } else {
            allowSubmit(dispatch, "", false);
        };
    };

    const onClickRegister = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        onClickToggle();
    };
    const onClickCancel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        onClickToggle();
    }

    return (
        <Modal 
            isOpen={isOpen}
            hide={onClickToggle}
            headerText="Registration"
            modalContent={
                <form>
                    <div className="reg-inputs">
                        <div>
                            <label htmlFor="username">username</label>
                            <input type="text" value={userName} onChange={onChangeUserName} />
                        </div>
                        <div>
                            <label htmlFor="email">email</label>
                            <input type="text" value={email} onChange={onChangeEmail} />
                        </div>
                        <div>
                        <PasswordComparison
                            dispatch={dispatch}
                            password={password}
                            passwordConfirm={passwordConfirm}
                        />
                        </div>
                    </div>
                    <div className="form-buttons">
                        <div className="form-btn-left">
                            <button
                                style={{ marginLeft: ".5em"}}
                                className="action-btn"
                                disabled={isSubmitDisabled}
                                onClick={onClickRegister}
                            >
                                Register
                            </button>
                            <button
                                style={{ marginLeft: ".5em"}}
                                className="cancel-btn"
                                onClick={onClickCancel}
                            >
                                Cancel
                            </button>
                        </div>
                        <span className="form-btn-right">
                            <strong>{resultMsg}</strong>
                        </span>
                    </div>
                </form>
            }
        />
    );
};

export default Regirstration;

