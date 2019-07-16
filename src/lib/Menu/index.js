import React, { Component } from 'react'
import { Link, matchPath, withRouter } from 'react-router-dom'

import {
  Layout,
  Menu,
} from 'antd'

class SideMenu extends Component {

  static defaultProps = {
    onCollapse: () => {},
    collapsed: false,
    categories: [
      {
        path: '/orhangen',
        title: 'Örhängen',
        icon: '/icons/earrings-600x600.png',
      },
    ],
  }

  getActiveCategoryKeys = () => {
    let activeRoutes = []
    this.props.categories
      .forEach((category, key) => {
        const match = matchPath(this.props.location.pathname, {...category})
        if(match) activeRoutes.push(String(key))
      })
    return activeRoutes
  }

  getCategoryItems = () => {
    return this.props.categories
    .map((category, key) => (
      <Menu.Item key={key}>
        <Link to={'/'+category.path}>
          <img src={category.icon} style={{ width: '24px', marginRight: 8 }} alt=""/>
          <span>{ category.title }</span>
        </Link>
      </Menu.Item>
    ))
  }

  render() {
    return (
      <Layout.Sider
        trigger={null}
        collapsible
        collapsed={this.props.collapsed}
        onCollapse={this.props.onCollapse}
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => { console.log('menu has breakpoint', broken); }}
        theme="light"
      >
        <Link to={'/'} title="Till startsidan">
          <div className="logo" />
        </Link>
        <Menu
          defaultSelectedKeys={this.getActiveCategoryKeys()}
          mode="inline"
        >
          {
            this.getCategoryItems()
          }
          <Menu.SubMenu
            key="sub1"
            title={<span>Övrigt</span>}
          >
            <Menu.Item><Link to={'/kontakt'}>Kontakt</Link></Menu.Item>
            <Menu.Item><Link to={'/kopvillkor'}>Köpvillkor</Link></Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Layout.Sider>
    )
  }
}

export default withRouter(SideMenu)
