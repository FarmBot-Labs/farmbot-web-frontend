var path = require('path');
require('es6-promise').polyfill();

module.exports = {
  module: {
    loaders: [{
      test: /\.tsx?$/,
      exclude: /(bower_components|node_modules)/,
      loader: 'ts'
    }],
  },
  entry: {
    app: './src/fb_frontend.tsx'
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/src/",
    filename: "bundle.js"
  },
  ts: {
    configFileName: "tsconfig.json"
  },
  resolve: {
    extensions: [
      '',
      '.js',
      '.ts',
      '.tsx'
    ],
  },
  devServer: {
    historyApiFallback: {
      index: 'default.html',
    }
  }
};
