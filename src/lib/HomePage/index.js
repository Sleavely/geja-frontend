import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import {
  Typography,
} from 'antd'

const {
  Title,
  Paragraph,
} = Typography

export default function HomePage() {

  useEffect(() => {
    document.title = `GEJA Smycken`
  })

  return (
    <div className="home page">
      <Title>Välkommen till Geja!</Title>
      <Paragraph>Här kan man köpa fina grejer! Kolla till exempel <Link to="/products/halsband-classic-790">Halsband Classic 790</Link>!</Paragraph>
    </div>
  )
}
