import React, { Component } from "react";
import axios from "axios";
import Auth from "./Auth";
import { connect } from "react-redux";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: []
    };
  }

  componentDidMount() {
    this.reRender();
  }

  componentDidUpdate(){
    
  }

  reRender = () => {
    axios
      .get(`/api/cart/${this.props.user.customer_order_id}`)
      .then(res => this.setState({ cart: res.data }))
      .catch(err => console.log(err));
  };

  removeFromCart = id => {
    axios
      .delete(`/api/cart/${id}`)
      .then(res => {
        console.log(res.data);
        this.setState({
          cart: res.data
        });
        this.reRender()
      })
      .catch(err => console.log(err));
  };

  render() {
    const mappedCart = this.state.cart.map((e, i) => {
      return (
        <div key={i} className="product_container">
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
            <button onClick={() => this.removeFromCart(e.order_item_id)}>
              Remove from cart
            </button>
          </div>
        </div>
      );
    });
    return (
      <div>{this.props.user.email ? <div>{mappedCart}</div> : <Auth />}</div>
    );
  }
}
function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps)(Cart);
