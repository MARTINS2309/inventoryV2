import React, { FunctionComponent, useEffect } from "react";
import FocusLock from "react-focus-lock";
import ReactDOM from "react-dom";

import {
  Wrapper,
  Header,
  StyledModal,
  HeaderText,
  CloseButton,
  Content,
  Backdrop
} from "./modal.style";

export interface ModalProps {
  isOpen: boolean;
  hide: () => void;
  modalContent: JSX.Element;
  headerBtn?: boolean;
  headerText?: string;
}

export const Modal: FunctionComponent<ModalProps> = ({
  isOpen,
  hide,
  modalContent,
  headerBtn = true,
  headerText = ""
}) => {
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.code === 'Escape' && isOpen) {
      event.preventDefault();
      hide();
    }
  };

  useEffect(() => {
    isOpen
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
    document.addEventListener("keydown", onKeyDown, false);
    return () => {
      document.removeEventListener("keydown", onKeyDown, false);
    };
  });

  const modal = (
    <React.Fragment>
      <Backdrop onClick={hide} />
      <FocusLock>
        <Wrapper
          aria-modal
          aria-labelledby={headerText}
          tabIndex={-1}
          role="dialog"
        >
          <StyledModal>
            <Header>
              <HeaderText>{headerText}</HeaderText>
              {headerBtn && (
                <CloseButton onClick={hide}>X</CloseButton>
              )}
            </Header>
            <Content>{modalContent}</Content>
          </StyledModal>
        </Wrapper>
      </FocusLock>
    </React.Fragment>
  );

  return isOpen ? ReactDOM.createPortal(modal, document.body) : null;
};