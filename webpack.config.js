var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './client/app.js',
  output: {
    path: './public/',
    filename: 'index.js'
    //devtoolLineToLine: true,
  },
  //devtool: 'eval',
  //devtool: 'eval-source-map',
  devtool: '#cheap-module-eval-source-map',

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('dev')
    })
  ],
  // Fix npm link breaking exclude below
  resolve: { fallback: path.join(__dirname, 'node_modules') },
  resolveLoader: { fallback: path.join(__dirname, 'node_modules') },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          // https://github.com/babel/babel-loader#options
          cacheDirectory: true,
          presets: ['es2015', 'react']
        }
      }
    ]

  }
};
