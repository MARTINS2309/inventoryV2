import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import React from "react";
import "./Nav.css";
import SideBarMenus from "./sidebar/SideBarMenus";
import { Modal } from '../modal/modal/modal';
import { useModal } from '../modal/useModal';

const Nav = () => {
    const {isOpen , onClickToggle} = useModal();
    const { width } = useWindowDimensions();

    const getMobileMenu = () => {
        if (width <= 768) {
            return (
                <FontAwesomeIcon 
                    onClick={onClickToggle}
                    icon={faBars} 
                    size="lg" 
                    className="nav-mobile-menu" 
                />
            );
        }
        return null;
    };

    return (
        <React.Fragment>
            <Modal
                isOpen={isOpen}
                hide={onClickToggle}
                headerBtn={false}
                modalContent={
                    <SideBarMenus/>
                }
            />
            <nav>
                {getMobileMenu()}
                <strong>InventoryMangment</strong>
            </nav>
        </React.Fragment>
    );
};

export default Nav;