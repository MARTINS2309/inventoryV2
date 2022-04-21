import React, { useEffect } from "react";
import { AppState } from "../../../store/AppState";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRegistered,
  faSignInAlt,
  faSignOutAlt,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import "./SideBarMenus.css";
import { UserProfileSetType } from "../../../store/user/Reducer";
import Regirstration from "../../auth/Registration";
import { useModal } from "../../modal/useModal";
import Login from "../../auth/Login";
import Logout from "../../auth/Logout";

const SideBarMenus = () => {
  const user = useSelector((state: AppState) => state.user);
  const dispatch = useDispatch();
  const { isOpen:isOpenReg, onClickToggle: onClickToggleReg} = useModal();
  const { isOpen:isOpenLogin, onClickToggle: onClickToggleLogin} = useModal();
  const { isOpen:isOpenLogout, onClickToggle: onClickToggleLogout} = useModal();

  useEffect(() => {
    dispatch({
      type: UserProfileSetType,
      payload: {
        id: 1,
        userName: "testUser",
      },
    });
  }, [dispatch]);
  
  return(
    <React.Fragment>
      <ul>
        <li>
          <FontAwesomeIcon icon={faUser} />
          <span className="menu-name">{user?.userName}</span>
        </li>
        <li>
          <FontAwesomeIcon icon={faRegistered} />
          <span onClick={onClickToggleReg} className="menu-name">register</span>
          <Regirstration
            isOpen={isOpenReg}
            onClickToggle={onClickToggleReg}
          />
        </li>
        <li>
          <FontAwesomeIcon icon={faSignInAlt} />
          <span onClick={onClickToggleLogin} className="menu-name">login</span>
          <Login isOpen={ isOpenLogin } onClickToggle={onClickToggleLogin} />
        </li>
        <li>
          <FontAwesomeIcon icon={faSignOutAlt} />
          <span onClick={onClickToggleLogout} className="menu-name">
            logout
          </span>
          <Logout isOpen={ isOpenLogout } onClickToggle={onClickToggleLogout} />
        </li>
      </ul>
    </React.Fragment>
  );
};

export default SideBarMenus;
