import React, { useState } from "react";
import Auth from "./Auth";
import "./Header.css";
import {withRouter} from 'react-router-dom'
import logo from '../Solar Realty-logo 2/vector/default-monochrome.svg'

const Header = props => {
  const [showAuth, setShowAuth] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="header">
      <img src={logo} onClick={()=> props.history.push('/')} alt='Logo'></img>
      <button className='menu_button' onClick={() => setShowMenu(!showMenu)}>&#9776;</button>
      {showMenu && 
      <div className='menu'>
        <button onClick={() => setShowAuth(true)}>Login</button>
        <button onClick={() => setShowAuth(true)}>Sign Up</button>
        <button onClick={()=> props.history.push('/products')} >Products</button>
        <button onClick={()=> props.history.push('/cart')} >Cart</button>
      </div>
      }
      {showAuth ? <Auth toggleFn={setShowAuth} /> : null}
    </div>
  );
};

export default withRouter(Header);