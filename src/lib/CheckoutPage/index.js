import React, {Component} from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import { useCart } from "use-cart"
import CheckoutForm from './CheckoutForm';
import './elements.css'

import {
  Card,
  Form,
  Icon,
  Input,
  Timeline,
  Typography,
} from 'antd'

const {
  Title,
} = Typography

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
}

export default function CheckoutPage() {
  const { items: cartItems } = useCart()

  return (
    <StripeProvider apiKey="pk_lKbdxdGwZ0pfDoEOssP69tH4Eqvl0">
      <>
      <ul class="cart">
        {
        cartItems.map((item, i) => (
          <li key={i}>{item.quantity}x {item.sku}</li>
        ))
        }
      </ul>
      <div className="checkout" style={{ padding: 24, background: '#fff', minHeight: 160 }}>
        <Title>Kassa</Title>

        <Timeline>
          <Timeline.Item dot={<Icon type="home" style={{ fontSize: '16px' }} />}>
            <Card style={{ maxWidth: 400 }}>

              <Form {...formItemLayout}>
                <p>Fyll i dina adressuppgifter</p>
                <Form.Item label="E-mail">
                  <Input />
                </Form.Item>
              </Form>

            </Card>
          </Timeline.Item>
          <Timeline.Item dot={<Icon type="credit-card" />}>
            <Card style={{ maxWidth: 400 }}>

              <Elements locale={'sv-SE'}>
                <CheckoutForm />
              </Elements>

            </Card>
          </Timeline.Item>
        </Timeline>
      </div>
      </>
    </StripeProvider>
  )
}
