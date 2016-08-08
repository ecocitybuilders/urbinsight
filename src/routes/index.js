import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { routerActions } from 'react-router-redux'
import { UserAuthWrapper } from 'redux-auth-wrapper'
import Homepage from 'components/homepage'
import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import MapView from 'views/MapView/MapView'
import AdminPanel from 'containers/Admin'

// NOTE: here we're making use of the `resolve.root` configuration
// option in webpack, which allows us to specify import paths as if
// they were from the root of the ~/src directory. This makes it
// very easy to navigate to files regardless of how deeply nested
// your current file is.

const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.auth,
  redirectAction: routerActions.replace,
  failureRedirectPath: '/',
  wrapperDisplayName: 'UserIsAuthenticated',
  predicate: auth => auth.isAuthenticated
})

const UserIsAdmin = UserAuthWrapper({
  authSelector: state => state.auth,
  redirectAction: routerActions.replace,
  failureRedirectPath: '/',
  wrapperDisplayName: 'UserIsAdmin',
  predicate: user => user.isAdmin,
  allowRedirectBack: false
})

export default (store) => (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={Homepage} />
    <Route path='admin' component={UserIsAuthenticated(AdminPanel)} />
    <Route path=':city' component={MapView} />

  </Route>
)
