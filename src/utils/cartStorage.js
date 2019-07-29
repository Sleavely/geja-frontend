import React, { useEffect } from 'react'
import { useCart } from 'use-cart'
import storage from 'react-use/lib/useLocalStorage';

const getCartStorage = () => {
  return storage(
    'cart',
    []
  )
}

// Regular function to be used inline
export const LoadCart = () => {
  const [cart] = getCartStorage()
  // Make sure the cart ID is set
  getCartId()
  return cart
}

// Functional component to be placed under CartProvider
export function SaveCart() {
  const { items } = useCart()
  const [ , setCart ] = getCartStorage()
  useEffect(() => {
    setCart(items)
  }, [ items ])

  return (
    <></>
  )
}

export const getCartId = () => {
  let [cartId, setCartId] = storage(
    'cartId',
    ''
  )
  if (!cartId) {
    // Invent one
    cartId = resetCartId([cartId, setCartId])
  }
  return cartId
}

export const resetCartId = (state) => {
  let [cartId, setCartId] = state || storage(
    'cartId',
    ''
  )
  // Invent a new one
  cartId = Math.random().toString(36).substr(2, 10)
  setCartId(cartId)
  return cartId
}
