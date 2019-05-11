import React, {Component} from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';
import './elements.css'

import {
  Typography,
} from 'antd'

const {
  Title,
} = Typography

class CheckoutPage extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
        <div className="checkout" style={{ padding: 24, background: '#fff', minHeight: 160 }}>
          <Title>Kassa</Title>
          <Elements locale={'sv-SE'}>
            <CheckoutForm />
          </Elements>
        </div>
      </StripeProvider>
    );
  }
}

export default CheckoutPage
