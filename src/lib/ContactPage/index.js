import React, { Component } from 'react'

import {
  Typography,
} from 'antd'

const {
  Title,
  Paragraph,
} = Typography

export default class ContactPage extends Component {

  render() {
    return (
      <div className="contact" style={{ padding: 24, background: '#fff', minHeight: 160 }}>
        <Title>Kontakta oss</Title>
        <Paragraph>Rackarns, vi har tappat bort vår kontaktinformation!</Paragraph>
      </div>
    )
  }
}
