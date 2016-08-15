const webpack = require('webpack');


module.exports = {
  devtool: 'source-map',
  entry: './src/index',
  output: {
    path: __dirname + '/src/bundle/',
    filename: 'app.js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['react-hot', 'babel-loader'],
      exclude: /node_modules/,
    },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
    }),
  ],
};
