import React, { useEffect, useState } from 'react'
import useReactRouter from 'use-react-router'
import {
  PageHeader,
} from 'antd'

export default function CustomPageHeader() {
  const { history, location } = useReactRouter()

  const[routes, setRoutes] = useState([{path: '/', breadcrumbName: 'Startsidan'}])

  const breadcrumbNameMap = {
    '': 'Startsidan',
    '/halsband': 'Halsband',
    '/ringar-och-armband': 'Ringar & Armband',
    '/orhangen': 'Örhängen',
    '/apps/2/detail': 'Detail',
  }

  useEffect(() => {
    const routeList = Object.keys(breadcrumbNameMap).reduce((routeList, key) => {
      if(location.pathname.startsWith(key)) routeList.push({
        path: key,
        breadcrumbName: breadcrumbNameMap[key],
      })
      return routeList
    }, [])
    const segments = location.pathname.split('/')
    if(segments.length === 3 && segments[2]) routeList.push({
      path: location.pathname,
      breadcrumbName: 'PRODUCT PAGE'
    })
    setRoutes(routeList)
  }, [location])

  return (
    <div className="pageHeader" style={{ marginTop: 16 }}>
      {routes.length < 2 ? '' :
        <PageHeader
          onBack={() => history.push(routes.slice(-2, -1)[0].path)}
          subTitle={`Tillbaka till ${routes.slice(-2, -1)[0].breadcrumbName}`}
        />
      }
    </div>
  )
}
