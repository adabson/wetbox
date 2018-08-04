const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");
const WebpackShellPlugin = require("webpack-shell-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// pass in environment by running (requires webpack-cli installed globally):
// webpack --env.NODE_ENV=development
module.exports = args => {
  const env = args.NODE_ENV;
  const defaultEnv = "development";
  const configIndex = settings[env] != null ? env : defaultEnv;
  const envSettings = settings[configIndex];
  console.log( "\n\t\tRunning webpack with config set to:",configIndex,"\n\n");

  return envSettings; // environment-specific settings
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
        template:"./index.html"
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
      main: [ "./src/app.js", "./src/stylesheet.scss" ]
    },
    output: {
      path: path.resolve(__dirname, "dist"),
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
        template: "./src/page.html",
        minify: {
          collapseInlineTagWhitespace: true,
          collapseWhitespace: true
        },
        inlineSource: ".(js|css)$" // Embed all javascript and css inline
      }),
      new HtmlWebpackInlineSourcePlugin(),
      new WebpackShellPlugin({onBuildEnd:["rm dist/bundled_app.js", "rm dist/compiled_stylesheet.css"]}), // cleanup external file(s) (now that we have them inline)
    ]
  }
};