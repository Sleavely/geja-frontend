import React, { useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import { Link } from 'react-router-dom'

import './index.css'
import {
  Card,
  Divider,
  Skeleton,
  Spin,
  Typography,
} from 'antd'

const {
  Title,
} = Typography

const {
  REACT_APP_API_BASE_PATH: API_BASE_PATH
} = process.env

export default function CategoryPage({ category }) {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch(`${API_BASE_PATH}/contentful/categories/${category.path}/products`)
      .then((data) => data.json())
      .then(setProducts)
  }, [category])

  return (
    <div className="category page">
      <Title>{category.title}</Title>
      <Markdown source={category.description} />


      <div className="products">
        <Divider />
        { !products.length
        ? Array.from(Array(3)).map((_,i) => (
            <div
              className="productCard"
              key={i}
            >
              <Card loading={true} cover={<Spin />}>
                <Skeleton active />
              </Card>
            </div>
          ))
        : products.map((product, i) => (
          <div
          className="productCard"
          key={i}
          >
            <Link to={`/${category.path}/${product.slug}`}>
              <Card
                hoverable
                cover={( product.image.length
                  ? <img alt={product.image[0].title} src={product.image[0].file.url} />
                  : false
                )}
              >
                <Card.Meta title={product.productName} description={`${product.price} SEK`} />
              </Card>
            </Link>
          </div>

        ))}
      </div>
    </div>
  )
}
