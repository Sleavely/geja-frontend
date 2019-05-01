import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import {
  Skeleton,
  Typography,
} from 'antd'

const {
  Title,
  Paragraph,
} = Typography

export default class ProductPage extends Component {

  static defaultProps = {
    loading: false
  }

  render() {
    return (
      <div className="notfound" style={{ padding: 24, background: '#fff', minHeight: 160 }}>
        <Skeleton active loading={this.props.loading}>
          <Title>404 - Sidan finns inte</Title>
          <Paragraph>Hoppsan! Den här länken verkar trasig. <Link to="/">Tillbaka till startsidan</Link>?</Paragraph>
        </Skeleton>
      </div>
    )
  }
}
