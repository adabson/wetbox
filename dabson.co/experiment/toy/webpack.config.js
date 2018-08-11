let HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: [],
  output: {},
  mode: "development",
  plugins: [ 
    new HtmlWebpackPlugin({template:"./milkydrop/circlenoshader.html"}),
    new HtmlWebpackPlugin({template:"./milkydrop/rawfeed.html"}),
    new HtmlWebpackPlugin({template:"./milkydrop/rawestfeed.html"}),
    new HtmlWebpackPlugin({template:"./index.html"}),
  ]
};