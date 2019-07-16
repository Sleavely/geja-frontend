import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { CartProvider } from "use-cart"
import useLocalStorage from "react-use-localstorage"

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
import CheckoutPage from './lib/CheckoutPage'
import ProductPage from './lib/ProductPage'
import ContactPage from './lib/ContactPage'
import TermsPage from './lib/TermsPage'

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

function App() {
  const [collapsed, setCollapsed] = useState(false)
  const [isResponsive, setIsResponsive] = useState(undefined)
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState([])
  const [cart] = useLocalStorage(
    "cart",
    JSON.stringify([])
  )

  useEffect(() => {
    fetch(`${API_BASE}/contentful/categories`)
      .then((data) => data.json())
      .then((body) => {
        setCategories(body.map((category) => ({
          title: category.title,
          path: category.path, //TODO: contentful should define this as slug for consistency
          icon: category.icon.file.url,
          description: category.categoryDescription
        })))
        setLoading(false)
      })
  }, [])


  const onCollapse = (collapsed, type) => {
    console.log(collapsed, type)

    setCollapsed(collapsed)
    setIsResponsive(collapsed && type === 'responsive')
  }

  const toggleMenu = () => {
    setCollapsed(!collapsed)
  }

  return (
    <CartProvider initialCart={JSON.parse(cart)}>
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <SideMenu collapsed={collapsed} onCollapse={onCollapse} categories={categories} />
          <Layout>
            <Header style={{ background: '#fff', padding: '0 16px' }}>
              <Button icon="menu" onClick={toggleMenu} style={isResponsive ? { marginRight: 16 } : { display: 'none' }} />
              <Search
                placeholder="Sök i butiken"
                onSearch={value => console.log(value)}
                style={{ maxWidth: 300 }}
              />
              <Link to={'/kassa'}>
                {isResponsive
                  ? <Button icon="shopping-cart" style={{ marginLeft: 16 }} />
                  : <Button icon="shopping-cart" style={{ marginLeft: 16 }}>Kassa</Button>
                }

              </Link>

            </Header>
            <Content style={{ margin: '0 16px' }}>
              <Breadcrumb style={{ margin: '16px' }} routes={routes} />
              {routes.length < 2 ? '' :
                <PageHeader
                  onBack={() => null}
                  title=""
                  subTitle={`Tillbaka till ${routes.slice(-2, -1)[0].breadcrumbName}`}
                />
              }

              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/kassa" component={CheckoutPage} />
                <Route path="/kontakt" component={ContactPage} />
                <Route path="/kopvillkor" component={TermsPage} />
                {
                  categories.map((category) => (
                    <Route key={category.path} path={`/${category.path}`} render={({ match }) => (
                      <CategoryPage category={category} />
                    )} />
                  ))
                }
                <Route path="/products/:slug" render={({ match }) => (
                  <ProductPage slug={match.params.slug} />
                )} />
                <Route component={({ match }) => (
                  <NotFoundPage match={match} loading={loading} />
                )} />
              </Switch>

            </Content>
            <Footer style={{ textAlign: 'center' }}>
              GEJA Trading HB &copy; 2019
            </Footer>
          </Layout>
        </Layout>
      </Router>
    </CartProvider>
  );

}

export default App;
