import React from 'react'
import { Link } from 'react-router-dom'
import {
  Affix,
  Badge,
  Button,
  Layout,
} from 'antd'
import { useCart } from 'use-cart'
const { Header } = Layout

export default function HeaderMenu({ toggleMenu, isResponsive, collapsed }) {
  const { itemsCount: cartItemsCount } = useCart()

  return (
    <Affix>
    <Header style={{ background: '#fff', padding: '0 16px', borderBottom: '1px solid #f0f2f5' }}>
      <Button icon="menu" onClick={toggleMenu} style={isResponsive && collapsed ? { marginLeft: 16 } : { display: 'none' }} />

      { isResponsive && collapsed && (
        <Link to={'/'} title="Till startsidan">
          <div className="logo" />
        </Link>
      ) }

      <Badge count={cartItemsCount} title={`Du har ${cartItemsCount} varor i varukorgen.`} style={{ backgroundColor: '#1890ff' }}>
        <Link to={'/kassa'}>
          <Button icon="shopping-cart" style={{ marginLeft: 16 }}>Kassa</Button>
        </Link>
      </Badge>

    </Header>
    </Affix>
  )
}
