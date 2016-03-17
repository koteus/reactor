import React from 'react'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import { RouterContext, match, createMemoryHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from '../config/store'
import routes from '../routes'
//import { fetchData } from './app/api/reddit'

export default function serverRendering(req, res) {
  const memoryHistory = createMemoryHistory(req.url)
  let store = configureStore(undefined, memoryHistory)
  const history = syncHistoryWithStore(memoryHistory, store)

  match({ history, routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      console.error('ROUTER ERROR: ', error)
      res.status(500).send(error.message)
    }
    else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    }
    else if (renderProps) {
      //fetchData().then(() => {
        store = configureStore(store.getState(), memoryHistory)
        const Root = () => (
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        )
        const html = renderToString(<Root />)
        res.status(200).send(renderFullPage(html, store.getState()))
      //})
    }
    else {
      res.status(404).send('Not found')
    }
  })
}

// function fetchData() {
//   const { query, params } = renderProps
//   return new Promise(function(resolve, reject) {
//     const comp = renderProps.components[renderProps.components.length - 1].WrappedComponent
//     const url = req.protocol + '://' + req.get('host')
//     resolve(comp.fetchData({ params, store, url }))
//   })
// }

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
