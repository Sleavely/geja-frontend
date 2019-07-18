import React, { useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import { useCart } from "use-cart"

import './index.css';
import {
  Row,
  Col,
  Typography,

  Alert,
  Button,
  Card,
  Carousel,
  Skeleton,
  Statistic,
} from 'antd'

const {
  Title,
  Paragraph,
} = Typography

const {
  REACT_APP_API_BASE_PATH: API_BASE_PATH
} = process.env

export default function ProductPage({ slug }) {
  const { addItem } = useCart()
  const [product, setProduct] = useState({})
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${API_BASE_PATH}/contentful/products/${slug}`)
      .then((data) => {
        //TODO: shouldnt the router be responsible for 404-like management?
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
        setProduct(body)
      })
      .catch((err) => {
        setError(err)
      })
  }, [slug])

  useEffect(() => {
    if (product.sku) document.title = `${product.productName} | GEJA Smycken`;
  }, [product])

  return (
    <div className="product page">
      {error ? (
        <Alert
          message="Hoppsan!"
          description={error.message}
          type="error"
          showIcon
        />
      ) : (
        <Skeleton active loading={!product.sku}>
          <Row gutter={16}>
            <Col md={12}>
              <Title>{product.productName}</Title>
              <Paragraph>
                <Statistic title="" value={product.price} suffix="SEK" groupSeparator=" " />
              </Paragraph>
              { product.image && (
              <div className="slider-mobile">
                <Carousel autoplay>
                  {
                    product.image.map((image, i) => (
                      <img key={i} src={image.file.url} alt="" />
                    ))
                  }
                </Carousel>
              </div>
              )}
              <div className="description">
              <Markdown source={product.productDescription} />
              </div>

              <Card>
                  <Button type="primary" block icon="shopping" size="large" onClick={() => addItem(product.slug)}>
                  Lägg i varukorgen
                </Button>
              </Card>
            </Col>
            { product.image && (
            <Col md={12}>
              <div className="slider-desktop">
                <Carousel autoplay>
                  {
                    product.image.map((image, i) => (
                      <img key={i} src={image.file.url} alt="" />
                    ))
                  }
                </Carousel>
              </div>
            </Col>
            )}
          </Row>
        </Skeleton>
      )}
    </div>
  )
}
