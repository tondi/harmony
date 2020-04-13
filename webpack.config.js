const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.join(__dirname, './'),
  },
  devServer: {
    liveReload: true
  }
};