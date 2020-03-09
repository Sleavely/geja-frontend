import React, { useEffect } from 'react'
import ReactGA from 'react-ga'
import useLocation from 'react-use/lib/useLocation'

const {
  NODE_ENV = '',
  REACT_APP_GOOGLE_ANALYTICS_ID: ANALYTICS_ID = 'UA-XXXXXXXX-Y',
} = process.env

const PageviewTracker = ({ children }) => {
  const location = useLocation()

  useEffect(() => {
    ReactGA.initialize(ANALYTICS_ID, { testMode: NODE_ENV === 'test' })
  }, [])

  useEffect(() => {
    ReactGA.pageview(location.pathname)
  }, [location])


  return (
    <>{ children }</>
  )
}

export default PageviewTracker
