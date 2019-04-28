import React, { Component } from 'react'
import './App.css'
import {
  Layout,
  PageHeader,
  Breadcrumb,
  Input,
  Button,
} from 'antd'

import ProductPage from './lib/ProductPage'
import SideMenu from './lib/Menu'

const {
  Header,
  Content,
  Footer,
} = Layout
const { Search } = Input

const routes = [
  {
    path: '/',
    breadcrumbName: 'Startsidan',
  },
  {
    path: 'halsband',
    breadcrumbName: 'Halsband',
  },
  {
    path: 'halsband-classic-790',
    breadcrumbName: 'Halsband Classic 790',
  },
]

class App extends Component {
  state = {
    collapsed: false,
    isResponsive: undefined,
    routes,
  };

  onCollapse = (collapsed, type) => {
    console.log(collapsed, type);

    this.setState({ collapsed, isResponsive: (collapsed && type === 'responsive') });
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <SideMenu collapsed={this.state.collapsed} onCollapse={this.onCollapse} />
        <Layout>
          <Header style={{ background: '#fff', padding: '0 16px' }}>
            <Button icon="menu" onClick={this.toggle} style={this.state.isResponsive ? { marginRight: 16 } : { display: 'none' }} />
            <Search
              placeholder="Sök i butiken"
              onSearch={value => console.log(value)}
              style={{ maxWidth: 300 }}
            />
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px' }} routes={this.state.routes} />
            {this.state.routes.length < 2 ? '' :
              <PageHeader
                onBack={() => null}
                title=""
                subTitle={`Tillbaka till ${this.state.routes.slice(-2, -1)[0].breadcrumbName}`}
              />
            }

            <ProductPage productID={this.state.productId} />

          </Content>
          <Footer style={{ textAlign: 'center' }}>
            GEJA Trading HB &copy; 2019
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default App;
