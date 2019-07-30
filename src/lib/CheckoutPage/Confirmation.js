import React from 'react'
import useReactRouter from 'use-react-router'
import { useCart } from 'use-cart'

import {
  Drawer,
  Result,
} from 'antd'

export default function Confirmation({ paymentIntent }) {
  const { history } = useReactRouter()

  return (
    <div className="confirmation-wrapper">
      <Drawer
        placement="bottom"
        closable={false}
        visible={true}
        onClose={() => {
          setTimeout(() => {
            history.push("/")
          }, 300)
        }}
        height={`70vh`}
      >
        <Result
          status="success"
          title="Ditt köp är klart"
          subTitle={(
            <p>Betalningsreferens: { paymentIntent.id.substring(3) }<br />Du får snart en bekräftelse via e-mail.</p>
          )}
        />
      </Drawer>
    </div>
  )
}
