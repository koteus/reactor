import React from 'react'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import { Router, RouterContext, match, createMemoryHistory } from 'react-router'
import App from './components/App'
import configureStore from './configureStore'
import routes from './routes'

// TODO: use real async call
function fetchInitialState(callback) {
  callback({ counter: 999 })
}

export default function handleRender(req, res) {
  // location: req.originalUrl
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      console.error('ROUTER ERROR: ', error)
      res.status(500).send(error.message)
    }
    else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    }
    else if (renderProps) {
      // Query the API asynchronously
      fetchInitialState(initialState => {
        const history = createMemoryHistory()
        // Create a new Redux store instance
        const store = configureStore(initialState, history)
        // Render the component to a string
        const html = renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps}/>
          </Provider>
        )
        // Send the rendered page back to the client
        res.status(200).send(renderFullPage(html, store.getState()))
      })
    }
    else {
      res.status(404).send('Not found')
    }
  })
}

function renderFullPage(html, state) {
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
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(state)}
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
    `
}