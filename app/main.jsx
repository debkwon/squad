'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'

const ExampleApp = connect(
  ({ auth }) => ({ member: auth })
) (
  ({ member, children }) =>
    <div>
      <nav>
        {member ? <WhoAmI/> : <Login/>}
      </nav>
      {children}
    </div>
)

render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={ExampleApp}>
        <Route path="/login" component={Login} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
