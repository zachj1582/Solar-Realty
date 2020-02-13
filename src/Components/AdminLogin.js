import React, { useState } from "react";
import { connect } from "react-redux";
import { getUser } from "../redux/UserReducer";
import {withRouter} from 'react-router-dom'
import axios from "axios";

const AdminLogin = props => {
  const [emailInput, setEmailInput] = useState("");
  const [passInput, setPassInput] = useState("");

  const login = () => {
    axios
      .post("/auth/adminlogin", { email: emailInput, password: passInput })
      .then(res => {
        props.getUser(res.data);
        props.history.push("/admin");
      })
      .catch(err => alert(err.response.request.response));
  };

  return (
    <div className="auth admin">
      <input
        value={emailInput}
        placeholder="Email"
        onChange={e => setEmailInput(e.target.value)}
      />
      <input
        type="password"
        value={passInput}
        placeholder="Password"
        onChange={e => setPassInput(e.target.value)}
      />
      <button onClick={login}>Login</button>
    </div>
  );
};

export default connect(null, { getUser })(withRouter(AdminLogin));
