import React, { useEffect } from 'react'

import {
  Typography,
} from 'antd'

const {
  Title,
  Paragraph,
} = Typography

export default function ContactPage () {

  useEffect(() => {
    document.title = `Kontakt | GEJA Smycken`
  })

  return (
    <div className="contact page">
      <Title>Kontakta oss</Title>
      <Paragraph>Rackarns, vi har tappat bort vår kontaktinformation!</Paragraph>
    </div>
  )
}
