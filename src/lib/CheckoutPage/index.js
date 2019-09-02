import React, { useEffect, useState } from 'react'
import { useCart } from 'use-cart'
import {Elements, StripeProvider} from 'react-stripe-elements'
import Cart from './Cart'
import Confirmation from './Confirmation'
import { useCartId } from '../../utils/cartStorage'
import PaymentForm from './PaymentForm'
import './elements.css'

import {
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
  REACT_APP_API_BASE_PATH: API_BASE_PATH,
  REACT_APP_STRIPE_PUBKEY: STRIPE_PUBKEY,
} = process.env

const CardDiv = ({ children }) => {
  // the div here can interchangably be switched for the Card component
  return (
    <Card style={{ marginBottom: 32 }}>{ children }</Card>
  )
}

export default function CheckoutPage() {
  const { items: cartItems, clearCart } = useCart()
  const [productCache, setProductCache] = useState([])
  const [customerInfo, setCustomerInfo] = useState(null)
  const [confirmationVisible, setConfirmationVisible] = useState(false)
  const [paymentIntent, setPaymentIntent] = useState(null)
  const [cartId, setCartId] = useCartId()

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
    // Dont try to create a paymentIntent when cart has been emptied post-purchase
    if(!cartItems.length) return undefined

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
      if (res.error) throw new Error(res.error)
      setPaymentIntent(res.paymentIntent)
      setCartId(res.paymentIntent.id)
      console.log('Retrieved cart info from backend.', res)
    })
    .catch((err) => {
      // Something went sideways in the backend while fetching the PaymentIntent
      console.error(err)
    })
  }, [cartItems])

  const paymentConfirmed = () => {
    setCartId('')
    clearCart()
    setConfirmationVisible(true)
  }

  return (
    <StripeProvider apiKey={STRIPE_PUBKEY}>
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
              {
                confirmationVisible
                ? <p>Din varukorg har tömts.</p>
                : <Cart productCache={productCache} />
              }
            </CardDiv>
          </Col>

          <Col xs={24} xl={10}>
            {
              cartItems.length ? (
              <>
              <CardDiv>
                <Form {...formItemLayout} onChange={(e) => {
                  e.persist()
                  const newCustomerInfo = customerInfo
                    ? { ...customerInfo, [e.target.name]: e.target.value }
                    : { [e.target.name]: e.target.value}
                  setCustomerInfo(newCustomerInfo)
                  console.log('form changed', newCustomerInfo)
                }}>
                  <Title level={4}>
                    <Icon type="home" />
                    &nbsp;
                    Adressuppgifter
                  </Title>
                  <br />
                  <Form.Item label="E-postadress">
                    <Input name="email" type="email" />
                  </Form.Item>
                  <Form.Item label="Telefonnummer">
                    <Input name="phone" type="tel" />
                  </Form.Item>
                  <Form.Item label="Förnamn">
                    <Input name="firstname" />
                  </Form.Item>
                  <Form.Item label="Efternamn">
                    <Input name="lastname" />
                  </Form.Item>
                  <Form.Item label="Gatuadress">
                    <Input name="street" />
                  </Form.Item>
                  <Form.Item label="Postnummer">
                    <Input name="zipcode" type="number" />
                  </Form.Item>
                  <Form.Item label="Postort">
                    <Input name="city" />
                  </Form.Item>
                </Form>
              </CardDiv>
              <div style={{ transition: 'all 0.3s', transitionProperty: 'max-height', overflow: 'hidden', maxHeight: customerInfo ? 500 : 600 }}>
              <CardDiv>
                <Title level={4}>
                  <Icon type="credit-card" />
                  &nbsp;
                  Betalning
                </Title>
                <Elements locale={'sv-SE'}>
                  <PaymentForm {...{paymentIntent, customerInfo, paymentConfirmed}} />
                </Elements>
              </CardDiv>
              </div>
              </>
              ) : ''
            }
          </Col>
        </Row>
        {
          confirmationVisible ? <Confirmation paymentIntent={paymentIntent} /> : ''
        }
      </div>
    </StripeProvider>
  )
}
