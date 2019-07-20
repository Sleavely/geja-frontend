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
