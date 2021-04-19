import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isAuthenticated } from '../util'

const RouteAuth = ({ component: Component, ...rest }) => {
  return (
    <>
      <Route
        {...rest}
        render={(props) => {
          if (isAuthenticated()) {
            return <Component {...props} />
          } else {
            return <Redirect to='/signin' />
          }
        }}
      />
    </>
  )
}

export default RouteAuth
