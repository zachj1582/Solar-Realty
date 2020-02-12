import React, { useState } from "react";

const Header = props => {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <div>
      Logo
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
