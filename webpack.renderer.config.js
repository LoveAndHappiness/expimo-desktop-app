// webpack.renderer.config.js

const rules = require('./webpack.rules');
const { VueLoaderPlugin } = require('vue-loader');

rules.push(
  {
    test: /\.css$/,
    use: ['style-loader', 'css-loader'],
  },
  {
    test: /\.vue$/,
    loader: 'vue-loader',
  }
);

module.exports = {
  entry: './src/renderer.js',  // New line added
  module: {
    rules,
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.vue', '.json'],
  },
};