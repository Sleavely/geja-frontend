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
      <div className="contact page">
        <Title>Kontakta oss</Title>
        <Paragraph>Rackarns, vi har tappat bort vår kontaktinformation!</Paragraph>
      </div>
    )
  }
}
