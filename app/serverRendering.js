import React from 'react'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import App from './components/App'
import configureStore from './configureStore'

export default function handleRender(req, res) {

  // Create a new Redux store instance
  const store = configureStore()

  // Render the component to a string
  const html = renderToString(
    <Provider store={ store }>
      <App />
    </Provider>
  )

  // Grab the initial state from our Redux store
  const initialState = store.getState()

  // Send the rendered page back to the client
  res.send(renderFullPage(html, initialState))
}

function renderFullPage(html, initialState) {
  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title>Redux Universal Example</title>
        <meta name="description" content="The sample todo app">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="apple-touch-icon" href="apple-touch-icon.png">
        <link rel="stylesheet" href="static/main.css">
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
    `
}