import React, { useRef } from 'react'
import { Link, matchPath, withRouter } from 'react-router-dom'
import useClickAway from 'react-use/lib/useClickAway'
import {
  Affix,
  Layout,
  Menu,
} from 'antd'
import './index.css'

function SideMenu({ onCollapse, collapsed, setCollapsed, isResponsive, location, categories }) {
  const ref = useRef(null)

  useClickAway(ref, () => {
    if(isResponsive) setCollapsed(true)
  })

  const getActiveCategoryKeys = () => {
    let activeRoutes = []
    categories
      .forEach((category, key) => {
        const match = matchPath(location.pathname, {...category})
        if(match) activeRoutes.push(String(key))
      })
    return activeRoutes
  }

  const getCategoryItems = () => {
    return categories
    .map((category, key) => (
      <Menu.Item key={key}>
        <Link to={'/'+category.path}>
          <img src={category.icon} style={{ width: '24px', marginRight: 8 }} alt=""/>
          <span>{ category.title }</span>
        </Link>
      </Menu.Item>
    ))
  }

  return (
    <Layout.Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => { console.log('menu has breakpoint', broken); }}
      style={ isResponsive && !collapsed ? { borderRight: '1px solid #f0f2f5', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.09)' } : {} }
      theme="light"
    >
      <Affix offsetTop={0}>
      <div className="menuWrapper menuClickTarget" ref={ref}>
        <Link to={'/'} title="Till startsidan" onClick={() => isResponsive && setCollapsed(true)}>
          <div className="logo" />
        </Link>
        <Menu
          defaultSelectedKeys={getActiveCategoryKeys()}
          mode="inline"
          onClick={() => isResponsive && setCollapsed(true)}
        >
          {
            getCategoryItems()
          }
          <Menu.SubMenu
            key="sub1"
            title={<span>Övrigt</span>}
          >
            <Menu.Item><Link to={'/kontakt'}>Kontakt</Link></Menu.Item>
            <Menu.Item><Link to={'/kopvillkor'}>Köpvillkor</Link></Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </div>
      </Affix>
    </Layout.Sider>
  )
}

export default withRouter(SideMenu)
