var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
      'webpack-hot-middleware/client',
      './app/main'
    ],
    output: {
        path: path.join(__dirname, 'build'),
        publicPath: '/static/',
        filename: 'bundle.js'
    },
    plugins: [
      // new webpack.optimize.CommonsChunkPlugin('main.js'),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ],
    module: {
      loaders: [
        {
          test: /\.(js|jsx)$/,
          loaders: [ 'babel' ],
          include: path.join(__dirname, 'app')
        },
        {
          test: /\.less$/,
          loader: 'style!css!less' // use ! to chain loaders
        },
        {
          test: /\.css$/,
          loader: 'style!css'
        },
        {
          test: /\.(png|jpg|gif)$/,
          loader: 'url?limit=8192' // inline base64 URLs for <=8k images, direct URLs for the rest
        }
      ]
    }
};
