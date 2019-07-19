import React, { useEffect } from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import { useCart } from "use-cart"
import CheckoutForm from './CheckoutForm';
import './elements.css'

import {
  Card,
  Col,
  Form,
  Icon,
  Input,
  Row,
  Result,
  Statistic,
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

const CardDiv = ({ children }) => {
  // the div here can interchangably be switched for the Card component
  return (
    <div>{ children }</div>
  )
}

export default function CheckoutPage() {
  const { items: cartItems } = useCart()

  useEffect(() => {
    document.title = `Kassan | GEJA Smycken`
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
                  cartItems.map((item, i) => (
                    <li key={i}>{item.quantity}x {item.sku}</li>
                  ))
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
