import React, { Component } from "react";
import axios from "axios";


class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: []
    };
  }

  componentDidMount(){
      axios.get(`/api/cart/${this.props.user.customer_order_id}`)
      .then(res => this.setState({cart: res.data}))
      .catch(err => console.log(err))
  }

  render() {
      const mappedCart = this.state.cart.map((e,i)=>{
          return (
              <div key={i} >
                  <img src={e.product_img} alt={e.product_name}/>
                  <p> {e.product_name} </p>
                  <p> {e.product_description} </p>
                  <p> {e.price} </p>
              </div>
          )
      })
    return (
        <div>
            {this.props.user.email
            ? (<div>{mappedCart}</div>)
        : (<Auth />)}
        </div>
    )
  }
}

export default Cart;
