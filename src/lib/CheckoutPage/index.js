import React, { useEffect, useState } from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import { useCart } from "use-cart"
import CheckoutForm from './CheckoutForm';
import './elements.css'

import {
  Avatar,
  Button,
  Col,
  Form,
  Icon,
  Input,
  Row,
  Result,
  Skeleton,
  Statistic,
  Typography,
} from 'antd'

const ButtonGroup = Button.Group
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
    <div>{ children }</div>
  )
}

export default function CheckoutPage() {
  const { items: cartItems, addItem, removeItem } = useCart()
  const [productCache, setProductCache] = useState([])

  useEffect(() => {
    document.title = `Kassan | GEJA Smycken`

    Promise.all(cartItems.map((item) => {
      return fetch(`${API_BASE_PATH}/contentful/products/${item.sku}`)
        .then((data) => data.json())
    }))
    .then(setProductCache)
  }, [])

  return (
    <StripeProvider apiKey="pk_lKbdxdGwZ0pfDoEOssP69tH4Eqvl0">
      <div className="checkout page">
        <Title>Kassa</Title>

        <Row gutter={32}>

          <Col xs={24} xl={14}>
            <CardDiv className="cart" style={{ marginBottom: 16 }}>
              <Title level={4}>
                <Icon type="shopping-cart" />
                &nbsp;
                Varukorgen
              </Title>
              <ul>
                {
                  cartItems.map((cartItem, i) => {
                    const product = productCache.find((product) => product.slug === cartItem.sku)
                    if(!product) return (
                      <li key={i}>
                        <Skeleton active avatar={true} paragraph={false}></Skeleton>
                      </li>
                    )
                    return (
                      <li key={i}>
                        <Avatar src={product.image[0].file.url} shape="square" size="large" />
                        {cartItem.quantity}x {product.sku}
                        <ButtonGroup>
                          <Button onClick={() => { removeItem(cartItem.sku) }}>
                            <Icon type="minus" />
                          </Button>
                          <Button onClick={() => { addItem(cartItem.sku) }}>
                            <Icon type="plus" />
                          </Button>
                        </ButtonGroup>
                      </li>
                    )
                  })
                }
              </ul>
              <Statistic title="Total kostnad" value={1612893} suffix={'SEK'} decimalSeparator={','} groupSeparator={' '} />
            </CardDiv>
          </Col>

          <Col xs={24} xl={10}>
            <CardDiv style={{ marginBottom: 16 }}>
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
                <CheckoutForm />
              </Elements>

            </CardDiv>
          </Col>

        </Row>
        <div>
          <Result
            status="success"
            title="Ditt köp är klart"
            subTitle={(
              <p>Ordernummer: 20190719105809888<br />Du får snart en bekräftelse via e-mail.</p>
            )}
          />
        </div>
      </div>
    </StripeProvider>
  )
}
