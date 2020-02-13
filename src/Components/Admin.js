import React, { Component } from "react";
import axios from "axios";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleNewAdmin: false,
      name: "",
      email: "",
      password: "",
      products: []
    };
  }

  componentDidMount() {
  }

  addProduct = () => {
    axios.post("/api/products", {});
  };

  handleToggle = () => {
    this.setState({ toggleNewAdmin: !this.state.toggleNewAdmin });
  };
  handleInput = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  register = (name, email, password) => {
      axios.post('/auth/adminregister', {name, email, password})
      .then(()=> this.toggleNewAdmin)
      .catch(err => alert(err.response.request.response))
  }

  render() {
      const {name, email, password} = this.state
    return (
      <div>
        <header>
          <div onClick={() => this.handleToggle}>Register new admin</div>
        </header>
        {this.state.toggleNewAdmin && (
          <div>
            <input
              value={name}
              placeholder="Full Name"
              onChange={e => this.handleInput(e)}
            />
            <input
              value={email}
              placeholder="Email"
              onChange={e => this.handleInput(e)}
            />
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={e => this.handleInput(e)}
            />
            <button onClick={()=> this.register(name, email, password)}>Register</button>
          </div>
        )}
      </div>
    );
  }
}

export default Admin;
