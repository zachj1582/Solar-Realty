import React, { Component } from 'react';
import './Stripe.css';
import StripeCheckout from 'react-stripe-checkout';
import stripe from './stripeKey';
import axios from 'axios';

class Stripe extends Component {
  onToken = (token) => {
    token.card = void 0;
    console.log('token', token);
    axios.post('/api/payment', { token, amount: 100 } ).then(response => {
      alert('we are in business')
    });
  }

  render() {
    return (
      <div className="stripe">
        <StripeCheckout
          token={this.onToken}
          stripeKey= 'pk_test_GhYQPCyhp1LBOBzeW1cJMOwd00xVKtKBQS'
          amount={1000}
        />
      </div>
    );
  }
}

export default Stripe;