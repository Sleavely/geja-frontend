import React, { Component } from 'react'

import {
  Row,
  Col,
  Card,
  Divider,
  Pagination,
} from 'antd'

const { Meta } = Card

export default class RelatedProducts extends Component {

  static defaultProps = {
    label: 'Fler produkter vi tror du kanske gillar',
    productId: undefined,
  }

  render() {
    return (
      <div className="related-products" style={{ marginTop: 100 }}>
        <Divider>
          {this.props.label}
        </Divider>
        <Row gutter={16} type="flex" justify="space-around">
          <Col span={6}>
            <Card
              hoverable
              style={{ maxWidth: 240 }}
              cover={<img alt="example" src="/images/StockSnap_GCCXOL1RI4.jpeg" />}
            >
              <Meta
                title="Halsband Classic 750"
                description="Klassiskt halsband som passar både till vardags och de speciella tillfällena."
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card
              hoverable
              style={{ maxWidth: 240 }}
              cover={<img alt="example" src="https://cdn.shopify.com/s/files/1/1248/7127/files/pearl-necklaces-freshwater-model.jpg" />}
            >
              <Meta
                title="Halsband XY980"
                description="En längre modell som blir vackert både individuellt och i lager."
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card
              hoverable
              style={{ maxWidth: 240 }}
              cover={<img alt="example" src="https://cdn.shopify.com/s/files/1/1248/7127/files/pearl-necklace-south-sea-model.jpg" />}
            >
              <Meta
                title="Halsband Classic 770"
                description="Tjockare pärlor för en stabilare look."
              />
            </Card>
          </Col>
        </Row>
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Pagination defaultCurrent={1} total={50} />
        </div>
      </div>
    )
  }
}
