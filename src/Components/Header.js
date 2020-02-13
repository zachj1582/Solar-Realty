import React, { useState } from "react";
import Auth from './Auth'
import './Header.css'


const Header = props => {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <div className='header'>
      <p>Logo</p>
      <h2>Solar Realty</h2>
      <select>
        <option onClick={() => setShowAuth(!showAuth)}>Login</option>
        <option onClick={() => setShowAuth(!showAuth)}>
          Register
        </option>
      </select>
    {showAuth
    ? (<Auth toggleFn={setShowAuth(!showAuth)}/>)
    : null}
    </div>
  );
};

export default Header;
