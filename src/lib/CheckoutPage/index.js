import React, { useEffect, useState } from 'react'
import useReactRouter from 'use-react-router'
import { useCart } from 'use-cart'
import {Elements, StripeProvider} from 'react-stripe-elements'
import Cart from './Cart'
import PaymentForm from './PaymentForm'
import './elements.css'

import {
  Button,
  Card,
  Col,
  Drawer,
  Form,
  Icon,
  Input,
  Row,
  Result,
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
  const { history } = useReactRouter()
  const { items: cartItems, removeLineItem } = useCart()
  const [productCache, setProductCache] = useState([])
  const [confirmationVisible, setConfirmationVisible] = useState(false)

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
                  <Form.Item label="E-mail">
                    <Input />
                  </Form.Item>
                </Form>
              </CardDiv>
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
                    setConfirmationVisible(true)
                  }, 1000)
                }}>
                  Show Confirmation
                </Button>
              </CardDiv>
              </>
              ) : ''
            }
          </Col>

        </Row>
        <div>
          <Drawer
            placement="bottom"
            closable={false}
            visible={confirmationVisible}
            onClose={() => {
              setConfirmationVisible(false)
              const purchaseDone = true
              if(purchaseDone) {
                cartItems.forEach(({ sku }) => {
                  //removeLineItem(sku)
                })
                setTimeout(() => {
                  history.push("/")
                }, 300)
              }
            }}
            height={`70vh`}
          >
            <Result
              status="success"
              title="Ditt köp är klart"
              subTitle={(
                <p>Ordernummer: 20190719105809888<br />Du får snart en bekräftelse via e-mail.</p>
              )}
            />
          </Drawer>
        </div>
      </div>
    </StripeProvider>
  )
}
