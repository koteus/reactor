var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var precss = require('precss');

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
          loader: 'babel',
          include: path.join(__dirname, 'app'),
          query: {
            plugins: [
              ['react-transform', {
                transforms: [{
                  transform: 'react-transform-hmr',
                  imports: ['react'],
                  locals: ['module']
                }, {
                  transform: 'react-transform-catch-errors',
                  imports: ['react', 'redbox-react']
                }]
              }]
            ]
          }
        },
        {
          test: /\.css$/,
          loader: 'style!css!postcss'
        },
        {
          test: /\.(png|jpg|gif)$/,
          loader: 'url?limit=8192' // inline base64 URLs for <=8k images, direct URLs for the rest
        }
      ]
    },
    postcss: function () {
        return [autoprefixer, precss];
    }
};
