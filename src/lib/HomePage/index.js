import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import ProductGrid from '../../utils/ProductGrid'

import {
  Divider,
  Typography,
} from 'antd'

const {
  Title,
  Paragraph,
} = Typography

const {
  REACT_APP_API_BASE_PATH: API_BASE_PATH
} = process.env

export default function HomePage() {
  const [products, setProducts] = useState(false)

  useEffect(() => {
    document.title = `GEJA Smycken`

    fetch(`${API_BASE_PATH}/contentful/products?limit=10`)
      .then((data) => data.json())
      .then(setProducts)
  }, [])

  return (
    <div className="home page">
      <Title>Välkommen till GEJA Smycken!</Title>
      <Paragraph>Här kan man köpa fina grejer! Kolla till exempel <Link to="/products/halsband-classic-790">Halsband Classic 790</Link>!</Paragraph>

      <Divider />

      <ProductGrid products={products} />
    </div>
  )
}
