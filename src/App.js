import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { CartProvider } from 'use-cart'
import useMedia from 'react-use/lib/useMedia'

import './App.css'
import {
  Layout,
} from 'antd'

import HeaderMenu from './utils/HeaderMenu'
import SideMenu from './lib/Menu'
import HomePage from './lib/HomePage'
import NotFoundPage from './lib/NotFoundPage'
import CategoryPage from './lib/CategoryPage'
import CheckoutPage from './lib/CheckoutPage'
import ProductPage from './lib/ProductPage'
import ContactPage from './lib/ContactPage'
import TermsPage from './lib/TermsPage'

import { LoadCart, SaveCart } from './utils/cartStorage'
import PageHeader from './utils/PageHeader'

const {
  Content,
  Footer,
} = Layout

const {
  REACT_APP_API_BASE_PATH: API_BASE_PATH
} = process.env

function App() {
  const isWide = useMedia('(min-width: 1480px)')
  const [collapsed, setCollapsed] = useState(false)
  const [isResponsive, setIsResponsive] = useState(undefined)
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetch(`${API_BASE_PATH}/contentful/categories`)
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
    <CartProvider initialCart={LoadCart()}>
      <SaveCart />
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <SideMenu
            isResponsive={isResponsive}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            onCollapse={onCollapse}
            categories={categories}
          />
          <Layout>
            <HeaderMenu
              collapsed={collapsed}
              isResponsive={isResponsive}
              toggleMenu={toggleMenu}
            />
            <Content style={!isResponsive && !isWide ? { margin: '0 16px' } : {}}>
              <PageHeader />

              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/kassa" component={CheckoutPage} />
                <Route path="/kontakt" component={ContactPage} />
                <Route path="/kopvillkor" component={TermsPage} />
                {
                  categories.map((category, i) => (
                    <Route key={i} path={`/${category.path}/:product?`} render={({ match }) => {
                      if(match.params.product) return (<ProductPage category={category} slug={match.params.product} />)
                      return (<CategoryPage category={category} />)
                    }} />
                  ))
                }

                <Route component={({ match }) => (
                  <NotFoundPage match={match} loading={loading} />
                )} />
              </Switch>

            </Content>
            <Footer style={{ textAlign: 'center' }}>
              <Link to={'/kontakt'}>GEJA Trading HB</Link> &copy; 2019
            </Footer>
          </Layout>
        </Layout>
      </Router>
    </CartProvider>
  );

}

export default App;
