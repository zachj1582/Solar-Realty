import React, { useState } from "react";
import AdminLogin from "./AdminLogin";
import "./Footer.css";
import Logo from '../Solar Realty-logo 2/vector/default-monochrome-white.svg'

const Footer = props => {
  const [showAuth, setShowAuth] = useState(false);

  

  return (
    <div className="footer">
      <img className='footer_logo' src={Logo} alt='logo' />
      <button onClick={() => setShowAuth(!showAuth)}>Admins</button>
      <p className='boring_info'>
        Solar Realty, Inc. is a real estate franchise company. Each
        Solar Realty office is independently owned and operated. Solar Realty, Inc. is an Equal Opportunity Employer and supports the
        Fair Housing Act. <br/> All information provided is deemed reliable but is not
        guaranteed and should be independently verified. Properties subject to
        prior sale or rental. <br/> IDX information is provided via Smarter Agent
        exclusively for consumers’ personal, non-commercial use and may not be
        used for any purpose other than to identify prospective properties
        consumers may be interested in purchasing. Copyright © 2000-2020 Solar Realty.
      </p>
      {showAuth && <AdminLogin toggleFn={setShowAuth} />}
    </div>
  );
};

export default Footer;
