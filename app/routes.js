import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './components/App'
import About from './components/About'
import Counter from './components/Counter'
import NotFound from './components/NotFound'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Counter}/>
    <Route path="about" component={About}/>
    <Route path="*" component={NotFound}/>
  </Route>
)