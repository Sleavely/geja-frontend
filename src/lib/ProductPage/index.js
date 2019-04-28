import React, { Component } from 'react'
import './index.css';
import {
  Row,
  Col,
  Typography,
  Carousel,
} from 'antd'

import RelatedProducts from '../RelatedProducts'

const {
  Title,
  Paragraph,
} = Typography

export default class ProductPage extends Component {

  static defaultProps = {
    productId: undefined,
  }

  render() {
    return (
      <div className="product" style={{ padding: 24, background: '#fff', minHeight: 160 }}>
        <Row gutter={16}>
          <Col md={12}>
            <Title>Halsband Classic 790</Title>
            <div className="slider-mobile">
              <Carousel autoplay>
                <img style={{ maxWidth: '100%' }} src="images/pexels-photo-247115.jpeg" alt="" />
                <img style={{ maxWidth: '100%' }} src="images/pexels-photo-247115.jpeg" alt="" />
              </Carousel>
            </div>
            <Paragraph>
              790 är ett ett av våra vackraste och mest exklusiva halsband. Dom tjocka pärlorna fångar blickar och din accessoar blir en av kvällens samtalsämnen.
            </Paragraph>
            <Paragraph>
              Halsband Classic 790 kommer från en bortglömd pärlfiskarby i sydöstra Asien där man fortfarande känner av effekterna från Vietnamkriget. Halsbandet är resultatet av åratals slit och en hel samhällighets förenade krafter. Slipat till perfektion av ett underbetalt barn. Polerat av en svältande sexbarnsmamma. Köper du inte det här halsbandet kommer alla dö en hemsk död.
            </Paragraph>
          </Col>
          <Col md={12}>
            <div className="slider-desktop">
              <Carousel autoplay>
                <img style={{ maxWidth: '100%' }} src="images/pexels-photo-247115.jpeg" alt="" />
                <img style={{ maxWidth: '100%' }} src="images/pexels-photo-247115.jpeg" alt="" />
              </Carousel>
            </div>
          </Col>
        </Row>
        <RelatedProducts productId={this.props.productId} style={{ marginTop: 2000 }} />
      </div>
    )
  }
}
