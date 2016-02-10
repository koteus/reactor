import express from 'express'
import webpack from 'webpack'
import handleRender from './app/serverRendering'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config from './webpack.config.dev'

const app = express()
const port = 8080
const compiler = webpack(config)

app.use(webpackDevMiddleware(compiler,
  { noInfo: true, publicPath: config.output.publicPath }))

app.use(webpackHotMiddleware(compiler))

app.use(handleRender)

app.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info('Listening at http://localhost:' + port)
  }
})