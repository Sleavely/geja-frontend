import React, { Component } from 'react'

import {
  Layout,
  Menu,
} from 'antd'

export default class SideMenu extends Component {

  static defaultProps = {
    onCollapse: () => {},
    collapsed: false
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
        onBreakpoint={(broken) => { console.log(broken); }}
        theme="light"
      >
        <div className="logo" />
        <Menu
          defaultSelectedKeys={['1']}
          mode="inline"
        >
          <Menu.Item key="1">
            <img src="/icons/necklace-600x600.png" style={{ width: '24px', marginRight: 8 }} alt=""/>
            <span>Halsband</span>
          </Menu.Item>
          <Menu.Item key="2">
          <img src="/icons/earrings-600x600.png" style={{ width: '24px', marginRight: 8 }} alt=""/>
            <span>Örhängen</span>
          </Menu.Item>
          <Menu.Item key="3">
            <img src="/icons/ring-600x600.png" style={{ width: '24px', marginRight: 8 }} alt=""/>
            <span>Ringar</span>
          </Menu.Item>
          <Menu.SubMenu
            key="sub1"
            title={<span>Övrigt</span>}
          >
            <Menu.Item>Kontakt</Menu.Item>
            <Menu.Item>Om Geja</Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Layout.Sider>
    )
  }
}
