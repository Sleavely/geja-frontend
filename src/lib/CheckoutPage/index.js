import React, { useEffect, useState } from 'react'
import { useCart } from 'use-cart'
import {Elements, StripeProvider} from 'react-stripe-elements'
import Cart from './Cart'
import Confirmation from './Confirmation'
import { getCartId } from '../../utils/cartStorage'
import PaymentForm from './PaymentForm'
import './elements.css'

import {
  Button,
  Card,
  Col,
  Form,
  Icon,
  Input,
  Row,
  Typography,
} from 'antd'

const {
  Title,
} = Typography

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
    xl: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    xl: { span: 16 },
  },
}

const {
  REACT_APP_API_BASE_PATH: API_BASE_PATH
} = process.env

const CardDiv = ({ children }) => {
  // the div here can interchangably be switched for the Card component
  return (
    <Card style={{ marginBottom: 32 }}>{ children }</Card>
  )
}

export default function CheckoutPage() {
  const { items: cartItems } = useCart()
  const [productCache, setProductCache] = useState([])
  const [customerInfo, setCustomerInfo] = useState(null)
  const [ordernumber, setOrdernumber] = useState(null)
  const cartId = getCartId()

  useEffect(() => {
    document.title = `Kassan | GEJA Smycken`

    Promise.all(cartItems.map((item) => {
      return fetch(`${API_BASE_PATH}/contentful/products/${item.sku}`)
        .then((data) => data.json())
    }))
    .then((products) => {
      setProductCache(products)
    })
  }, [])

  // Set up or update a PaymentIntent
  useEffect(() => {
    fetch(`${API_BASE_PATH}/checkout/cart`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        cartId,
        items: cartItems
      })
    })
    .then(res => res.json())
    .then((res) => {
      console.log('Retrieved cart info from backend.', res)
    })
    .catch((err) => {
      console.error('Something went sideways in the backend while fetching the PaymentIntent', err)
    })
  }, [cartItems])

  return (
    <StripeProvider apiKey="pk_lKbdxdGwZ0pfDoEOssP69tH4Eqvl0">
      <div className="checkout page">
        <Title>Kassa</Title>

        <Row gutter={32}>

          <Col xs={24} xl={14}>
            <CardDiv className="cart">
              <Title level={4}>
                <Icon type="shopping-cart" />
                &nbsp;
                Varukorgen
              </Title>
              <Cart productCache={productCache} />
            </CardDiv>
          </Col>

          <Col xs={24} xl={10}>
            {
              cartItems.length ? (
              <>
              <CardDiv>
                <Form {...formItemLayout}>
                  <Title level={4}>
                    <Icon type="home" />
                    &nbsp;
                    Adressuppgifter
                  </Title>
                  <br />
                  <Form.Item label="E-postadress">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Förnamn">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Efternamn">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Gatuadress">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Postnummer">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Postort">
                    <Input />
                  </Form.Item>
                </Form>
              </CardDiv>
              <div style={{ transition: 'all 0.3s', transitionProperty: 'max-height', overflow: 'hidden', maxHeight: customerInfo ? 500 : 0 }}>
              <CardDiv>
                <Title level={4}>
                  <Icon type="credit-card" />
                  &nbsp;
                  Betalning
                </Title>
                <Elements locale={'sv-SE'}>
                  <PaymentForm />
                </Elements>
                <Button onClick={(event) => {
                  console.log(event)
                  console.log(event.target)
                  console.log(Object.keys(event))
                  event.target.loading = true
                  setTimeout(() => {
                    setOrdernumber(1337666)
                  }, 1000)
                }}>
                  Show Confirmation
                </Button>
              </CardDiv>
              </div>
              </>
              ) : ''
            }
          </Col>

        </Row>
        <Confirmation ordernumber={ordernumber} />
      </div>
    </StripeProvider>
  )
}
