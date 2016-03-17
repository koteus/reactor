import './styles/main.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'
import configureStore from './config/store'

const initialState = window.__INITIAL_STATE__
const store = configureStore(initialState, browserHistory)
const rootElement = document.getElementById('root')

let render = () => {
  const Root = require('./components/Root').default
  ReactDOM.render(
    <Root store={store} />,
    rootElement
  )
}

if (module.hot) {
  // Support hot reloading of components
  // and display an overlay for runtime errors
  const renderApp = render
  const renderError = (error) => {
    const RedBox = require('redbox-react')
    ReactDOM.render(
      <RedBox error={error} />,
      rootElement
    )
  }

  render = () => {
    try {
      renderApp()
    } catch (error) {
      renderError(error)
    }
  }

  module.hot.accept('./components/Root', () => {
    setTimeout(render)
  })
}

render()
