import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Markdown from 'react-markdown'

import {
  Typography,
} from 'antd'

const {
  Title,
  Paragraph,
} = Typography

export default class CategoryPage extends Component {

  static defaultProps = {
    category: {}
  }

  render() {
    return (
      <div className="category" style={{ padding: 24, background: '#fff', minHeight: 160 }}>
        <Title>{this.props.category.title}</Title>
        <Markdown source={this.props.category.description} />
      </div>
    )
  }
}
