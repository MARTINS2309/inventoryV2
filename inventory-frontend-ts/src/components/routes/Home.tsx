import React, { FC } from "react";
import Nav from "../areas/Nav";
import SideBar from "../areas/sidebar/SideBar";
import LeftMenu from "../areas/LeftMenu";
import Main from "../areas/main/Main";
import RightMenu from "../areas/rightMenu/RightMenu";
import "./Home.css";

const Home: FC = () => {
  return (
    <React.Fragment>
    <div className="screen-root-container home-container">
      <div className="navigation">
        <Nav />
      </div>
      <SideBar />
      <LeftMenu />
      <Main />
      <RightMenu />
    </div>
    </React.Fragment>
  );
};

export default Home;
