import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useWindowDimensions } from "../hooks/useWindowDimensions";

const Nav = () => {
    const { width } = useWindowDimensions();

    const getMobileMenu = () => {
        if (width <= 768) {
            return (
                <FontAwesomeIcon icon={faBars} size="lg" className="nav-moble-menu" />
            );
        }
        return null;
    };

    return (
        <nav className="navigation">
            {getMobileMenu()}
            <strong>InventoryMangment</strong>
        </nav>
    );
};

export default Nav;