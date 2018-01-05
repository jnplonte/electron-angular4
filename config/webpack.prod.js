var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');
var CopyWebpackPlugin = require('copy-webpack-plugin');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
  devtool: 'source-map',

  output: {
    path: helpers.root('dist'),
    publicPath: './',
    filename: '_[name].otomeyt.js',
    chunkFilename: '_[id].otomeyt.chunk.js'
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
      mangle: {
        keep_fnames: true
      }
    }),
    new ExtractTextPlugin('_[name].otomeyt.css'),

    new OptimizeCssAssetsPlugin({
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: {removeAll: true } },
      canPrint: true
    }),

    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV)
      }
    }),

    new webpack.LoaderOptionsPlugin({
      htmlLoader: {
        minimize: false // workaround for ng2
      }
    }),

    new CopyWebpackPlugin([
      // { from: 'config/site/client/*.json' },
      { from: 'config/site/language/*.json' },
      { from: 'config/electron/icons/*' },
      { from: 'config/electron/main-site.js', to: 'main-site.js' }
      // { from: 'config/electron/setup-events.js', to: 'setup-events.js' },
      // { from: 'config/electron/build-windows.js', to: 'build-windows.js' }
    ], {
        ignore: [
            'test-*.json'
        ]
    })
  ]
});
