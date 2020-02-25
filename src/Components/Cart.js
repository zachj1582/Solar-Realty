import React, { Component } from "react";
import axios from "axios";
import Auth from "./Auth";
import { connect } from "react-redux";
import {getUser} from '../redux/UserReducer'
import StripeCheckout from 'react-stripe-checkout'
import stripe from './StripeKey'
import {setCart} from '../redux/cartReducer'

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      cartTotal: 0
    };
  }

  componentDidMount() {
    this.reRender();
  }

  componentDidUpdate(prevProps){
    console.log(this.props.user)
    if(prevProps.user.email !== this.props.user.email || prevProps.user.customer_order_id !== this.props.user.customer_order_id){
      this.reRender()
    }
  }

  reRender = () => {
    axios
      .get(`/api/cart/${this.props.user.customer_order_id}`)
      .then(res => {
        this.props.setCart(res.data)
        this.cartTotal()
      })
      .catch(err => console.log(err));
  };

  removeFromCart = id => {
    axios
      .delete(`/api/cart/${id}`)
      .then(() => {
        this.reRender()
      })
      .catch(err => console.log(err));
  };

  onToken = (token) => {
    token.card = void 0;
    axios.post('/api/payment', { token, amount: this.state.cartTotal.toFixed(2), customer_order_id: this.props.user.customer_order_id, customer_id: this.props.user.customer_id }).then(res => {
      this.props.getUser(res.data)
      alert('Payment Successful! Hello World!!')
    }).catch(err => console.log(err))
  }

  cartTotal = () => {
    const total = this.state.cart.reduce((total, curr)=>{
      return total + +curr.price
    }, 0)
    this.setState({cartTotal: total * 0.0000000001})
  }

  render() {
    const mappedCart = this.props.cart.map((e, i) => {
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
      <div>{this.props.user.email ? 
      <div className='products'>
        {mappedCart}
        <div>
          Total: ${this.state.cartTotal.toFixed(2)}
        <StripeCheckout
          token={this.onToken}
          stripeKey= {stripe.pub_key}
          amount={this.state.cartTotal * 100}
        />
        </div>
      </div> 
      : <Auth 
      />}
      </div>
    );
  }
}
function mapStateToProps(state) {
  console.log(this.props)
  return { user: state.userReducer.user, cart: state.cartReducer.cart };
}

export default connect(mapStateToProps, {getUser, setCart})(Cart);
