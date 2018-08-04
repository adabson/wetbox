const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");
const WebpackShellPlugin = require("webpack-shell-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = args => {
  const env = args.NODE_ENV;
  const defaultEnv = "development";
  const configIndex = settings[env] != null ? env : defaultEnv;
  const envSettings = settings[configIndex];
  console.log( "\n\t\tRunning webpack with config set to:",configIndex,"\n\n");
  return envSettings;
}

var settings = {
  "development": {
    mode: "development",
    entry: {
      main: [ "./app.js", "./style.scss" ]
    },
    output: {
      path: path.resolve(__dirname, "./dev"),
      filename: "bundled_app.js"
    },
    module: {
      rules: [
        {
          test: /\.svg$/,
          use: "svg-url-loader"
        },
        {
          test: /\.scss$/,
          use: [ 
            "style-loader", 
            "css-loader", 
            "sass-loader"
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template:"./page.html"
      })
    ]
  }, 

  /*
   * In prod, we want to:
   *   Optimize and minify all the js/css/html
   *   Compile & minify sass to css (decrease dependence on loaders)
   */
  "production": {
    mode: "production",
    entry: {
      main: [ "./app.js", "./style.scss" ]
    },
    output: {
      path: path.resolve(__dirname, "../"),
      filename: "bundled_app.js"
    },
    module: {
      rules: [
        {
          test: /\.svg$/,
          use: "svg-url-loader"
        },
        {
          test: /\.scss$/,
          use: [ 
            MiniCssExtractPlugin.loader, 
            "css-loader", 
            "sass-loader" 
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "compiled_stylesheet.css"
      }),
      new HtmlWebpackPlugin({
        template: "./page.html",
        minify: {
          collapseInlineTagWhitespace: true,
          collapseWhitespace: true
        },
        inlineSource: ".(js|css)$" // Embed all javascript and css inline
      }),
      new HtmlWebpackInlineSourcePlugin(),
      new WebpackShellPlugin({onBuildEnd:["rm ../bundled_app.js", "rm ../compiled_stylesheet.css"]}), // cleanup external file(s) (now that we have them inline)
    ]
  }
};