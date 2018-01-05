var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts'
  },

  resolve: {
    extensions: ['.ts', '.js']
  },

  module: {
    // exprContextCritical: false,

    rules: [
      {
        test: /\.ts$/,
        loaders: [
          {
            loader: 'awesome-typescript-loader',
            options: { configFileName: helpers.root('src', 'tsconfig.json') }
          } , 'angular2-template-loader'
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico|icns)$/,
        loader: 'file-loader?name=img/[name].[hash].[ext]'
      },
      {
        test: /\.scss$/,
        exclude: [helpers.root('node_modules'), helpers.root('src', 'style')],
        use: [{
              loader: "to-string-loader"
          }, {
              loader: "css-loader"
          }, {
              loader: "sass-loader",
              options: {
                  includePaths: [helpers.root('src', 'style')]
              }
          }]
      },
      {
        test: /\.scss$/,
        include: helpers.root('src', 'style'),
        loader: ExtractTextPlugin.extract({ fallback: "style-loader", use: "css-loader!sass-loader"})
      }
    ]
  },

  plugins: [
    // Workaround for angular/angular#11580
    new webpack.ContextReplacementPlugin(
      /\@angular(\\|\/)core(\\|\/)esm5/,
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      // /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      // /angular(\\|\/)core(\\|\/)@angular/,
      helpers.root('src') // location of your src
      // {} // a map of your routes
    ),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};
