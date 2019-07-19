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

          <Col xs={24} md={14}>
            <Card className="cart">
              <ul>
                {
                  cartItems.map((item, i) => (
                    <li key={i}>{item.quantity}x {item.sku}</li>
                  ))
                }
              </ul>
              <Statistic title="Total kostnad" value={1612893} suffix={'SEK'} decimalSeparator={','} groupSeparator={' '} />
            </Card>
          </Col>

          <Col xs={24} md={10}>
            <Card style={{ marginBottom: 16 }}>
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
            </Card>
            <Card>
              <Title level={4}>
                <Icon type="credit-card" />
                &nbsp;
                Betalning
              </Title>
              <Elements locale={'sv-SE'}>
                <CheckoutForm />
              </Elements>

            </Card>
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
