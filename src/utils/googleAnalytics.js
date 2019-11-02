import React, { useEffect } from 'react'
import ReactGA from 'react-ga'
import useLocation from 'react-use/lib/useLocation'

const {
  REACT_APP_GOOGLE_ANALYTICS_ID: ANALYTICS_ID,
} = process.env

const PageviewTracker = ({ children }) => {
  const location = useLocation()

  useEffect(() => {
    console.log('Initializing GA')
    ReactGA.initialize(ANALYTICS_ID)
  }, [])

  useEffect(() => {
    ReactGA.pageview(location.pathname)
  }, [location])


  return (
    <>{ children }</>
  )
}

export default PageviewTracker
