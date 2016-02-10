import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/App'
import configureStore from './configureStore';

// Grab the state from a global injected into server-generated HTML
const initialState = window.__INITIAL_STATE__
const store = configureStore(initialState)

function render() {
  ReactDOM.render(
    <Provider store={ store }>
      <App />
    </Provider>,
    document.getElementById('root')
  )
}

render()
// store.subscribe(render)