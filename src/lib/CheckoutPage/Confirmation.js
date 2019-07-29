import React, { useEffect, useState } from 'react'
import useReactRouter from 'use-react-router'
import { useCart } from 'use-cart'
import { resetCartId } from '../../utils/cartStorage'

import {
  Drawer,
  Result,
} from 'antd'

export default function Confirmation({ ordernumber }) {
  const { history } = useReactRouter()
  const { items: cartItems, removeLineItem } = useCart()

  const [confirmationVisible, setConfirmationVisible] = useState(!!ordernumber)


  return (
    <div className="confirmation-wrapper">
      <Drawer
        placement="bottom"
        closable={false}
        visible={confirmationVisible}
        onClose={() => {
          setConfirmationVisible(false)
          const purchaseDone = true
          if(purchaseDone) {
            resetCartId()
            cartItems.forEach(({ sku }) => {
              removeLineItem(sku)
            })
            setTimeout(() => {
              history.push("/")
            }, 300)
          }
        }}
        height={`70vh`}
      >
        <Result
          status="success"
          title="Ditt köp är klart"
          subTitle={(
            <p>Ordernummer: { ordernumber }<br />Du får snart en bekräftelse via e-mail.</p>
          )}
        />
      </Drawer>
    </div>
  )
}
