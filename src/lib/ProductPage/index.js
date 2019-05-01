import React, { Component } from 'react'
import './index.css';
import {
  Row,
  Col,
  Typography,

  Alert,
  Button,
  Card,
  Carousel,
  Select,
  Statistic,
} from 'antd'

import RelatedProducts from '../RelatedProducts'

const {
  Title,
  Paragraph,
} = Typography

export default class ProductPage extends Component {

  static defaultProps = {
    productId: undefined,
    sizes: ['Liten', 'Stor'].map(size => <Select.Option key={size.toLowerCase()}>{size}</Select.Option>)
  }

  state = {
    loading: false,
    selectedSize: undefined,
  }

  addToCart = () => {
    this.setState({ loading: true })
    console.log(`Adding ${this.state.selectedSize} ${this.props.productId} to cart.`)
    setTimeout(() => {
      this.setState({ loading: false })
    }, 2000)
  }

  handleSizeChange = (value) => {
    console.log(`Selected: ${value}`)
    this.setState({ selectedSize: value })
  }

  render() {
    return (
      <div className="product" style={{ padding: 24, background: '#fff', minHeight: 160 }}>
        <Row gutter={16}>
          <Col md={12}>
            <Title>Halsband Classic 790</Title>
            <Paragraph>
              <Statistic title="" value={7199} suffix="SEK" groupSeparator=" " />
            </Paragraph>
            <div className="slider-mobile">
              <Carousel autoplay>
                <img style={{ maxWidth: '100%' }} src="/images/pexels-photo-247115.jpeg" alt="" />
                <img style={{ maxWidth: '100%' }} src="/images/pixabay-3090593_1920.jpeg" alt="" />
              </Carousel>
            </div>
            <Paragraph>
              Classic 790 är ett ett av våra vackraste och mest exklusiva halsband. Dom tjocka pärlorna fångar blickar och din accessoar blir en av kvällens samtalsämnen.
            </Paragraph>
            <Paragraph>
              Halsband Classic 790 kommer från en bortglömd pärlfiskarby i sydöstra Asien där man fortfarande känner av effekterna från Vietnamkriget. Halsbandet är resultatet av åratals slit och en hel samhällighets förenade krafter. Slipat till perfektion av ett underbetalt barn. Polerat av en svältande sexbarnsmamma. Köper du inte det här halsbandet kommer alla dö en hemsk död.
            </Paragraph>

            <Card>
            <Select
              placeholder="Välj storlek"
              notFoundContent="Det saknas storleksinformation för den här produkten."
              onChange={this.handleSizeChange}
              size="large" style={{ display: 'block', marginBottom: 16 }}
            >
              {this.props.sizes}
            </Select>
                  <Button type="primary" block icon="shopping" size="large" loading={this.state.loading} onClick={this.addToCart}>
                    Lägg i varukorgen
                  </Button>

            </Card>
            <Alert style={{ marginTop: '18px' }} message="Produkten är tillfälligt slut i lager. Det kan därför ta upp till tre veckor innan den levereras." type="warning" showIcon />
          </Col>
          <Col md={12}>
            <div className="slider-desktop">
              <Carousel autoplay>
                <img style={{ maxWidth: '100%' }} src="/images/pexels-photo-247115.jpeg" alt="" />
                <img style={{ maxWidth: '100%' }} src="/images/pixabay-3090593_1920.jpeg" alt="" />
              </Carousel>
            </div>
          </Col>
        </Row>
        <RelatedProducts productId={this.props.productId} style={{ marginTop: 2000 }} />
      </div>
    )
  }
}
