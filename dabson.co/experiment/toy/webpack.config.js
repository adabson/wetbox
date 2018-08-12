let HtmlWebpackPlugin = require('html-webpack-plugin');
//require('webpack-glsl!./milkydrop/frag.glsl');
let WebpackGLSL = require('webpack-glsl-loader');

module.exports = {
  entry: ['./milkydrop/frag.glsl'],
  output: {},
  mode: "development",
  plugins: [ 
    new HtmlWebpackPlugin({template:"./index.html"}),
    new HtmlWebpackPlugin({template:"./milkydrop/circlenoshader.html"}),
    new HtmlWebpackPlugin({template:"./milkydrop/rawfeed.html"}),
    new HtmlWebpackPlugin({template:"./milkydrop/rawestfeed.html"}),

    new HtmlWebpackPlugin({template:"./milkydrop/3d.html"}),
  ],
  module: {
    rules: [
      {
        test: /\.glsl$/, 
        loader: "webpack-glsl-loader" 
      }
    ]
  }
};