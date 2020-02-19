import React, { Component } from "react";
import axios from "axios";
import Auth from "./Auth";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getUser } from "../redux/UserReducer";
import "./Products.css";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      showAuth: false
    };
  }

  componentDidMount() {
    axios
      .get("/api/products")
      .then(res => {
        this.setState({ products: res.data });
      })
      .catch(err => console.log(err));
  }

  addToCart = (id, price) => {
    if (this.props.user.email) {
      axios
        .post("/api/cart", {
          customer_order_id: this.props.user.customer_order_id,
          product_id: id,
          price
        })
        .then(res => {
          window.alert("Item added to cart");
        })
        .catch(err => console.log(err));
    } else {
      this.handleToggle();
    }
  };

  handleToggle = () => {
    this.setState({ showAuth: !this.state.showAuth });
  };
  itemToggle = () => {
    this.setState({ showItem: !this.state.showItem });
  };
  render() {
    const mappedProducts = this.state.products.map((e, i) => {
      return (
        <div key={i} className="product_container">
            <div onClick={()=> this.props.history.push(`/item/${e.product_id}`)} >
          <div className="img_container" >
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
            </div>
            <button
              className="add_button"
              onClick={() => this.addToCart(e.product_id, e.price)}
            >
              Add to cart
            </button>
        </div>
      );
    });
    return (
      <div className="products">
        {mappedProducts}
        {this.state.showAuth ? <Auth toggleFn={this.handleToggle} /> : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps, { getUser })(withRouter(Products));
