const path = require('path');

module.exports = {
  entry: './server.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  mode: 'production',
  resolve: {
    fallback: {
        "process": require.resolve("process/browser"),
        path: require.resolve("path-browserify"),
        crypto: require.resolve('crypto-browserify'),
        fs: false,
        util: require.resolve('util/'),
    }
},
};