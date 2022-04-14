import React, { useEffect } from "react";
import { AppState } from "../../store/AppState";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser
} from "@fortawesome/free-solid-svg-icons";
import "./SideBarMenus.css";
import { UserProfileSetType } from "../../store/user/Reducer";

const SideBarMenus = () => {
  const user = useSelector((state: AppState) => state.user);
  const dispatch = useDispatch();

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
        <FontAwesomeIcon icon={faUser} />
        <span className="menu-name">{user?.userName}</span>
      </ul>
    </React.Fragment>
  );
};

export default SideBarMenus;
