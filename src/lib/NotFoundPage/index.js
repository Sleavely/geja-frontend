import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import {
  Skeleton,
  Typography,
} from 'antd'

const {
  Title,
  Paragraph,
} = Typography

export default function ProductPage ({ loading = false }) {

  useEffect(() => {
    document.title = `404 | GEJA Smycken`
  })

  return (
    <div className="notfound page">
      <Skeleton active loading={loading}>
        <Title>404 - Sidan finns inte</Title>
        <Paragraph>Hoppsan! Den här länken verkar trasig. <Link to="/">Tillbaka till startsidan</Link>?</Paragraph>
      </Skeleton>
    </div>
  )
}
