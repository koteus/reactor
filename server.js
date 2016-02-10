var path = require('path');
var express = require('express');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config.dev');

var app = express();
var port = 8080;
var compiler = webpack(config);

app.use(webpackDevMiddleware(compiler,
  { noInfo: true, publicPath: config.output.publicPath }));

app.use(webpackHotMiddleware(compiler));

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
})

app.listen(port, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info('Listening at http://localhost:' + port);
  }
});