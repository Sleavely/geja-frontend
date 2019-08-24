
import React from 'react'
import { Link } from 'react-router-dom'

import './ProductGrid.css'
import {
  Card,
  Skeleton,
  Spin,
} from 'antd'

export default function ProductGrid({ products, category = null }) {

  return (
    <div className="product-grid">
      { products === false
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
      : products.map((product, i) => product.categories.length ? (
        <div
        className="productCard"
        key={i}
        >
          <Link to={`/${category ? category.path : product.categories[0].path}/${product.slug}`}>
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

      ) : console.warn('Product is missing categories!', product) && <></> )}
    </div>
  )

}
