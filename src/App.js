import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './App.css'
import {
  Layout,
  PageHeader,
  Breadcrumb,
  Input,
  Button,
} from 'antd'

import SideMenu from './lib/Menu'

import HomePage from './lib/HomePage'
import NotFoundPage from './lib/NotFoundPage'
import CategoryPage from './lib/CategoryPage'
import ProductPage from './lib/ProductPage'

const {
  Header,
  Content,
  Footer,
} = Layout
const { Search } = Input

const API_BASE = 'https://aws.triplehead.net/geja'

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
    loading: true,
    routes,
    categories: [],
  }

  constructor(props) {
    super(props)

    fetch(API_BASE+'/contentful/categories')
      .then((data) => {
        console.log(data)
        return data.json()
      })
      .then((body) => {
        const categories = body.map((category) => ({
          title: category.title,
          path: category.path, //TODO: contentful should define this as slug for consistency
          icon: category.icon.file.url,
          description: category.categoryDescription
        }))
        //setTimeout(() => this.setState({ categories, loading: false }), 2000)
        this.setState({ categories, loading: false })
      })
  }

  onCollapse = (collapsed, type) => {
    console.log(collapsed, type)

    this.setState({ collapsed, isResponsive: (collapsed && type === 'responsive') })
  }

  toggleMenu = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <SideMenu collapsed={this.state.collapsed} onCollapse={this.onCollapse} categories={this.state.categories} />
          <Layout>
            <Header style={{ background: '#fff', padding: '0 16px' }}>
              <Button icon="menu" onClick={this.toggleMenu} style={this.state.isResponsive ? { marginRight: 16 } : { display: 'none' }} />
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

              <Switch>
                <Route exact path="/" render={({ match }) => (
                  <HomePage />
                )}/>
                {
                  this.state.categories.map((category) => (
                    <Route key={category.path} path={`/${category.path}`} render={({ match }) => (
                      <CategoryPage category={category} />
                    )}/>
                  ))
                }
                <Route path="/products/:productId" render={({ match }) => (
                  <ProductPage productId={match.params.productId} />
                )}/>
                <Route component={({ match }) => (
                  <NotFoundPage match={match} loading={this.state.loading} />
                )}/>
              </Switch>

            </Content>
            <Footer style={{ textAlign: 'center' }}>
              GEJA Trading HB &copy; 2019
            </Footer>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default App;
