import React, { useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import { Link } from 'react-router-dom'

import {
  Card,
  Divider,
  Typography,
} from 'antd'

const {
  Title,
} = Typography

export default function CategoryPage({ category }) {
  const [products, setProducts] = useState([])
  const [error, setError] = useState(null)

  const API_BASE = 'https://aws.triplehead.net/geja'

  useEffect(() => {
    fetch(`${API_BASE}/contentful/categories/${category.path}/products`)
      .then((data) => {
        //TODO: shouldnt the router be responsible to 404-like management?
        console.log('product response', data)
        if(!data.ok) {
          if(data.status === 404) {
            throw new Error('Sidan finns inte.')
          }
          throw new Error('Något gick fel när vi kontaktade servern.')
        }
        return data.json()
      })
      .then((body) => {
        if(body.error) throw new Error(body.error)

        // Set it as our state
        setProducts(body)
      })
      .catch((err) => {
        setError(err)
      })
  }, [category])

  return (
    <div className="category" style={{ padding: 24, background: '#fff', minHeight: 160 }}>
      <Title>{category.title}</Title>
      <Markdown source={category.description} />

      <div className="products" style={{ display: products.length ? undefined : 'none' }}>
        <Divider />
        { products.map((product, i) => (
          <div
          className="productCard"
          key={i}
          style={{
            maxWidth: 240,
            display: 'inline-block',
            margin: 16,
            'boxSizing': 'border-box'
          }}
          >
            <Link to={`/products/${product.slug}`}>
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
