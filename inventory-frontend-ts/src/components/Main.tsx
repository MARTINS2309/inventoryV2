import React, { FunctionComponent } from "react";
import { Modal } from './modal/modal/modal'
import { ConfirmationModal } from './modal/confirmation-modal/confirmation-modal'
import { useModal } from './modal/useModal';

const Main: FunctionComponent = () => {
    const { isShown, toggle } = useModal();
  
    const onConfirm = () => toggle();
    const onCancel = () => toggle();

    return (
        <main className="content">
            <button onClick={toggle}>Open modal</button>
            <Modal
                isShown={isShown}
                hide={toggle}
                headerText='Confirmation'
                modalContent={
                    <ConfirmationModal 
                        onConfirm={onConfirm} 
                        onCancel={onCancel}
                        message='Are you sure you want to delete element?'
                    />
                }
            />
        </main>
    );
};

export default Main;