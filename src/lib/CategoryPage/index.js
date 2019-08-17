import React, { useEffect, useState } from 'react'
import Markdown from 'react-markdown'

import ProductGrid from '../../utils/ProductGrid'

import {
  Divider,
  Typography,
} from 'antd'

const {
  Title,
} = Typography

const {
  REACT_APP_API_BASE_PATH: API_BASE_PATH
} = process.env

export default function CategoryPage({ category }) {
  const [products, setProducts] = useState(false)

  useEffect(() => {
    fetch(`${API_BASE_PATH}/contentful/categories/${category.path}/products`)
      .then((data) => data.json())
      .then(setProducts)
    if(category.title) document.title = `${category.title} | GEJA Smycken`
  }, [category])

  return (
    <div className="category page">
      <Title>{category.title}</Title>
      <Markdown source={category.description} />

      <Divider />

      <ProductGrid products={products} category={category} />

    </div>
  )
}
