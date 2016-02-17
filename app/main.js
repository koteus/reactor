import './main.css'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import configureStore from './configureStore'
import routes from './routes'

const initialState = window.__INITIAL_STATE__
const store = configureStore(initialState, browserHistory)
const rootElement = document.getElementById('root')

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      {routes}
    </Router>
  </Provider>,
  rootElement
)

