import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getUser } from "../redux/UserReducer";
import { withRouter } from "react-router-dom";
import "./Admin.css";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleNewAdmin: false,
      fullName: "",
      email: "",
      password: "",
      products: [],
      showEdit: false,
      pImg: "",
      pName: "",
      pDesc: "",
      price: 0,
      propertyToggle: false,
      addImage: "",
      addName: "",
      addDesc: "",
      addPrice: 0
    };
  }

  componentDidMount() {
    this.reRender();
  }

  reRender = () => {
    if (this.props.user.admin_id) {
      axios
        .get("/api/products")
        .then(res => {
          this.setState({ products: res.data });
        })
        .catch(err => console.log(err));
    } else {
      this.props.history.push("/");
    }
  };

  addProperty = (image, name, description, price) => {
    axios
      .post("/api/product", { image, name, description, price })
      .then(res => {
        this.setState({ products: res.data });
        this.toggleProperty();
        alert("Property added");
        this.reRender();
      })
      .catch(err => console.log(err));
  };

  handleToggle = () => {
    this.setState({ toggleNewAdmin: !this.state.toggleNewAdmin });
  };
  handleInput = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  registerAdmin = (name, email, password) => {
    axios
      .post("/auth/adminregister", { name, email, password })
      .then(() => {
        this.handleToggle();
        alert("Admin successfully added");
        this.reRender();
      })
      .catch(err => alert(err.response.request.response));
  };
  showEdit = () => {
    this.setState({ showEdit: !this.state.showEdit });
  };

  delete = id => {
    axios
      .delete(`/api/product/${id}`)
      .then(res => {
        this.setState({ products: res.data });
        this.reRender();
      })
      .catch(err => console.log(err));
  };

  edit = (product_image, product_name, product_description, price, id) => {
    axios
      .put(`/api/product/${id}`, {
        product_image,
        product_name,
        product_description,
        price
      })
      .then(res => {
        this.setState({ products: res.data });
        this.showEdit();
        this.reRender();
      })
      .catch(err => console.log(err));
  };

  toggleProperty = () => {
    this.setState({ propertyToggle: !this.state.propertyToggle });
  };

  render() {
    const {
      fullName,
      email,
      password,
      addImage,
      addName,
      addDesc,
      addPrice,
      pImg,
      pDesc,
      pName,
      price
    } = this.state;
    const mappedProducts = this.state.products.map((e, i) => {
      return (
        <div key={i} className="product_container admin">
          {this.state.showEdit ? (
            <div className="edit">
              <div className="img_container edit_img">
                <img
                  className="p_img"
                  src={this.state.pImg || e.product_image}
                  alt={e.product_name}
                />
              </div>
              <input
                className="edit_field"
                name="pImg"
                value={this.state.pImg}
                Placeholder="Image URL"
                onChange={e => this.handleInput(e)}
              />
              <input
                className="edit_field"
                name="pName"
                value={this.state.pName}
                placeholder="Property Name"
                onChange={e => this.handleInput(e)}
              />
              <input
                className="edit_field"
                name="pDesc"
                value={this.state.pDesc}
                placeholder="Property Description"
                onChange={e => this.handleInput(e)}
              />
              <input
                className="edit_field"
                name="price"
                value={this.state.price}
                placeholder="Price"
                onChange={e => this.handleInput(e)}
              />
              <button
                className="submit_edit_button"
                onClick={() =>
                  this.edit(
                    pImg || e.product_image,
                    pName || e.product_name,
                    pDesc || e.product_description,
                    price || e.price,
                    e.product_id
                  )
                }
              >
                Submit
              </button>
            </div>
          ) : (
            <div>
              <div className="img_container">
                <div
                  style={{ backgroundImage: `url(${e.product_image})` }}
                  className="p_img"
                >
                  {" "}
                </div>
              </div>
              <div className="info_container">
                <p className="p_name">{e.product_name}</p>
                <p className="p_desc">{e.product_description}</p>
                <p className="p_price">${e.price}</p>
              </div>
              <div className="admin_buttons">
                <button className="add_button" onClick={() => this.showEdit()}>
                  Edit
                </button>
                <button
                  className="sold_button"
                  onClick={() => this.delete(e.product_id)}
                >
                  Sold
                </button>
              </div>
            </div>
          )}
        </div>
      );
    });
    return (
      <div>
        <header>
          <div onClick={() => this.handleToggle()}>Register new admin</div>
          <div onClick={() => this.toggleProperty()}>Add property</div>
        </header>
        {this.state.propertyToggle && (
          <div>
            <input
              name="addImage"
              value={this.state.addImage}
              placeholder="Image URL"
              onChange={e => this.handleInput(e)}
            />
            <input
              name="addName"
              value={this.state.addName}
              placeholder="Property Name"
              onChange={e => this.handleInput(e)}
            />
            <input
              name="addDesc"
              value={this.state.addDesc}
              placeholder="Property Description"
              onChange={e => this.handleInput(e)}
            />
            <input
              name="addPrice"
              value={this.state.addPrice}
              placeholder="Property Price"
              onChange={e => this.handleInput(e)}
            />
            <button
              onClick={() =>
                this.addProperty(addImage, addName, addDesc, addPrice)
              }
            >
              Add Property
            </button>
          </div>
        )}
        {this.state.toggleNewAdmin && (
          <div className="register">
            <input
              name="fullName"
              value={this.state.fullName}
              placeholder="Full Name"
              onChange={e => this.handleInput(e)}
            />
            <input
              name="email"
              value={this.state.email}
              placeholder="Email"
              onChange={e => this.handleInput(e)}
            />
            <input
              name="password"
              type="password"
              value={this.state.password}
              placeholder="Password"
              onChange={e => this.handleInput(e)}
            />
            <button
              className="register_button"
              onClick={() => this.registerAdmin(fullName, email, password)}
            >
              Register
            </button>
          </div>
        )}
        <div>{mappedProducts}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps, { getUser })(withRouter(Admin));
