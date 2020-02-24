import React, { useState } from "react";
import Auth from "./Auth";
import "./Header.css";
import { withRouter } from "react-router-dom";
import logo from "../Solar Realty-logo 2/vector/default-monochrome.svg";
import axios from "axios";
import {connect} from 'react-redux'
import {getUser} from '../redux/UserReducer'

const Header = props => {
  const [showAuth, setShowAuth] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div>
    <div className="header">
      <img src={logo} onClick={() => props.history.push("/")} alt="Logo"></img>
      <button className="menu_button" onClick={() => setShowMenu(!showMenu)}>
        &#9776;
      </button>
      {showAuth ? <Auth toggleFn={setShowAuth} /> : null}
    </div>

    <div className='head_form_container'>
      {showMenu && (
        <div className="menu">
          {!props.user.customer_order_id ? (
            <div className='login_holder' >
              <button onClick={() => setShowAuth(true)}>Login</button>
              <button onClick={() => setShowAuth(true)}>Sign Up</button>
            </div>
          ) : (
            <div>
              <button
                onClick={() =>
                  axios.post("/auth/logout").then(res => {
                    props.getUser({})
                    props.history.push("/")
                  })
                }
                >
                Logout
              </button>
            </div>
          )}
          <button onClick={() => props.history.push("/products")}>
            Products
          </button>
          <button onClick={()=> props.history.push('/map')} >Map</button>
          <button onClick={() => props.history.push("/cart")}>Cart</button>
        </div>
      )}
      </div>
      </div>
  );
};

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps, { getUser })(withRouter(Header));
