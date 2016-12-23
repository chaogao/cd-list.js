var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var path = require('path');
var env = require('yargs').argv.mode;

var libraryName = 'CdList';

var plugins = [], outputFile;

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  outputFile = libraryName.toLowerCase() + '.min';
} else {
  outputFile = libraryName.toLowerCase();
}

// exclude third lib
function isExternal(module) {
  var userRequest = module.userRequest;

  if (typeof userRequest !== 'string') {
    return false;
  }

  return userRequest.indexOf('bower_components') >= 0 ||
         userRequest.indexOf('node_modules') >= 0 ||
         userRequest.indexOf('libraries') >= 0;
}

var entry = {};

entry[outputFile] = [__dirname + '/src/index.js'];

var config = {
  entry: entry,

  devtool: 'source-map',

  output: {
    path: __dirname + '/lib',
    publicPath: 'lib',
    filename: '[name].js',
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },

  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'es3ify-loader!babel',
        exclude: /(node_modules|bower_components)/
      }
    ]
  },

  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js']
  },

  externals: {
    "jquery": "jQuery"
  },

  plugins: plugins
};

module.exports = config;
