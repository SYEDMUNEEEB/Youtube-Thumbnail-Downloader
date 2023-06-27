const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js', // Replace with the entry file of your application
  output: {
    path: path.resolve(__dirname, 'dist'), // Replace with the output directory for your bundled code
    filename: 'bundle.js', // Replace with the desired name for your bundled file
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // If you're using Babel for transpiling, make sure to install the necessary packages (babel-loader, @babel/core, and presets) and configure it accordingly
        },
      },
    ],
  },
  resolve: {
    fallback: {
      fs: false,
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
    },
    extensions: ['.js'], // Add any additional file extensions you want to support
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
};
