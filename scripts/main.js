import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'

import NotFound from './components/NotFound'
import StorePicker from './components/StorePicker'
import App from './components/App'

/*
  Routes
 */

const routes = (
  <Router history={browserHistory}>
    <Route path='/' component={StorePicker}/>
    <Route path='/store/:storeId' component={App} />
    <Route path='*' component={NotFound} />
  </Router>
)

render(routes, document.getElementById('main'))
