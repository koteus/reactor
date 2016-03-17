// process.env.NODE_ENV = process.env.NODE_ENV || 'development'
import path from 'path'
import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config from './webpack.config'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { RouterContext, match, createMemoryHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from './app/config/store'
//import { fetchData } from './app/api/reddit'
import routes from './app/routes'

const app = express()
const port = 8080
const compiler = webpack(config)

app.use(webpackDevMiddleware(compiler, {
  noInfo: true, publicPath: config.output.publicPath }))

app.use(webpackHotMiddleware(compiler))

app.use((req, res) => {
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
})

app.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info('Listening at http://localhost:' + port)
  }
})

function renderFullPage(html, initialState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Async Universal Example</title>
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

// function fetchData() {
//   const { query, params } = renderProps
//   return new Promise(function(resolve, reject) {
//     const comp = renderProps.components[renderProps.components.length - 1].WrappedComponent
//     const url = req.protocol + '://' + req.get('host')
//     resolve(comp.fetchData({ params, store, url }))
//   })
// }
