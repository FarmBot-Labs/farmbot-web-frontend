var path = require('path');
var open = require('open');

module.exports = {
  node: {
	  fs: 'empty'
  },
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

open('http://localhost:8080/app/login');
