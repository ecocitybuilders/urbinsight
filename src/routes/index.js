import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Homepage from 'components/homepage'

// NOTE: here we're making use of the `resolve.root` configuration
// option in webpack, which allows us to specify import paths as if
// they were from the root of the ~/src directory. This makes it
// very easy to navigate to files regardless of how deeply nested
// your current file is.
import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import MapView from 'views/MapView/MapView'

export default (store) => (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={Homepage} />
    <Route path=':city' component={MapView} />
  </Route>
)
