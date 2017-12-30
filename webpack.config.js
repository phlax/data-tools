const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
      'extensions/tools/dist/sidebar': './src/data-tools/sidebar.js',
      'extensions/tools/dist/manager': './extensions/tools/src/manager.js',
      'extensions/tools/dist/content': './extensions/tools/src/content.js',
  },
  output: {
    // This copies each source entry into the extension dist folder named
    // after its entry config key.
      path: './',
      filename: '[name].js',
  },
  module: {
    // This transpiles all code (except for third party modules) using Babel.
    loaders: [{
      exclude: /node_modules/,
      test: /\.js$/,
      loaders: ['babel'],
    },{
	test: /\.json$/,
	loader: 'json-loader',
    }],
  },
  resolve: {
    // This allows you to import modules just like you would in a NodeJS app.
    extensions: ['', '.js', '.jsx'],
    root: [
      path.resolve(__dirname),
    ],
    modulesDirectories: [
      'src',
      'node_modules',
    ],
  },

  plugins: [
    // Since some NodeJS modules expect to be running in Node, it is helpful
    // to set this environment var to avoid reference errors.
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
  // This will expose source map files so that errors will point to your
  // original source files instead of the transpiled files.
  devtool: 'sourcemap',
};
