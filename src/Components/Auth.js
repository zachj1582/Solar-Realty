import React, { useState } from "react";
import { connect } from "react-redux";
import { getUser } from "../redux/UserReducer";
import axios from "axios";
import "./Auth.css";

const Auth = props => {
  const [emailInput, setEmailInput] = useState("");
  const [passInput, setPassInput] = useState("");

  const login = () => {
    axios
      .post("/auth/login", { email: emailInput, password: passInput })
      .then(res => {
        props.getUser(res.data)
        props.toggleFn && props.toggleFn()
      })
      .catch(err => alert(err.response.request.response));
  };

  const register = () => {
    axios
      .post("/auth/register", { email: emailInput, password: passInput })
      .then(res => {
        props.getUser(res.data)
        props.toggleFn && props.toggleFn()
      })
      .catch(err => alert(err.response.request.response));
  };

  return (
    <div className="auth">
      <div>
        <p>Login or Reister</p>
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
        <button onClick={register}>Register</button>
        {props.toggleFn &&
        <button onClick={() => props.toggleFn()}>Close</button>
        }
      </div>
    </div>
  );
};

export default connect(null, { getUser })(Auth);
