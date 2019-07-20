import React from 'react';
import { Link } from 'react-router-dom'
import { useCart } from "use-cart"
import {
  Avatar,
  Button,
  List,
  Skeleton,
  Statistic,
} from 'antd'

export default function Cart({ productCache }) {
  const { items: cartItems, removeItem } = useCart()

  return (
    <>
    { cartItems.length
    ? <List
        itemLayout="horizontal"
        dataSource={cartItems}
        renderItem={cartItem => {
          const product = productCache.find((product) => product.slug === cartItem.sku)
          if(!product) return (
            <List.Item>
              <Skeleton active avatar={true} paragraph={false}></Skeleton>
            </List.Item>
          )
          return (
          <List.Item actions={[
            <Button onClick={() => { removeItem(cartItem.sku) }}>
              Ta bort
            </Button>
          ]}>
            <>
            <List.Item.Meta
              avatar={
                <Avatar src={product.image[0].file.url} shape="square" size="large" />
              }
              title={<Link to={`/${product.categories[0].path}/${product.slug}`}>{product.productName}</Link>}
            />
            <div>
              {cartItem.quantity}st á {product.price} SEK
            </div>

            </>
          </List.Item>
        )}}
      >
        <List.Item>
          <Skeleton loading={!cartItems.every(cartItem => productCache.some(cached => cached.slug === cartItem.sku))}>
            <List.Item.Meta />
            <Statistic
              style={{ marginRight: 120 }}
              title="Total kostnad"
              value={cartItems.reduce((total, cartItem) => {
                const product = productCache.find((product) => product.slug === cartItem.sku)
                if(!product) return 0
                total = total + (cartItem.quantity * product.price)
                return total
              }, 0)}
              suffix={'SEK'}
              groupSeparator={' '}
              decimalSeparator={','}
            />
          </Skeleton>
        </List.Item>
      </List>
    : <p>Din varukorg är tom.</p>
    }
    </>
  )
}
