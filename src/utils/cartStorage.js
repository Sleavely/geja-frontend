import React from 'react'

const useStateWithLocalStorage = localStorageKey => {
  const [value, setValue] = React.useState(
    JSON.parse(localStorage.getItem(localStorageKey)) || []
  )

  React.useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(value))
  }, [value])

  return [value, setValue]
}

let initializedHook = null
const cartStorage = {
  addProduct: (product, qty = 1) => {
    const [cart, setCart] = cartStorage.getHook()
    // Check if already there, in which case just increase the quantity
    const productInCart = cart.find((existingProduct) => existingProduct.productId === product.productId) || product

      productInCart.qty = productInCart.qty ? productInCart.qty + qty : qty
    } else {
      cart.push({

      })
    }
    setCart(cart)
  },
  removeProduct: (productId, qty = 1) => {
    // Either subtract one or remove the product altogether
  },
  getHook: () => {
    if (!initializedHook) {
      initializedHook = useStateWithLocalStorage('geja-cart')
    }
    return initializedHook
  }
}

export default cartStorage
