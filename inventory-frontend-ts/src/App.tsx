import React from 'react';
import './App.css';
import Nav from './components/areas/Nav';
import SideBar from './components/areas/sidebar/SideBar';
import LeftMenu from './components/areas/LeftMenu';
import Main from './components/areas/main/Main';
import RightMenu from './components/areas/RightMenu';

function App() {
  return (
    <div className="App">
      < Nav />
      < SideBar />
      < LeftMenu />
      < Main />
      < RightMenu />
    </div>
  );
}

export default App;
