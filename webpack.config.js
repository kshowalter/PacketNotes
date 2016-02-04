//var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './browser/app.js',
  output: {
    path: './public/',
    filename: 'index.js'
    //devtoolLineToLine: true,
  },
  //devtool: 'eval',
  //devtool: 'eval-source-map',

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('dev')
    })
  ],
  module: {
    loaders: [
      {
        //test: /\.es6$/,
        test: /\.js$/,
        //test: path.join(__dirname, 'src_browser'),
        exclude: /(node_modules|bower_components)/,
        //exclude: /node_modules/,
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
