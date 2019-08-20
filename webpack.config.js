const path               = require('path')
// const HtmlWebpackPlugin  = require('html-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin-next');

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    disableHostCheck: true,
    host: '0.0.0.0',
    port: 9000,
    watchOptions: {
      poll: true,
    },
  },
  // module: {
  //   rules: [{
  //     test: /\.json$/,
  //     use: 'fresh-loader',
  //   }],
  // },
  plugins: [
    new WebpackShellPlugin({
      onBuildExit: {
        scripts: [
          'yarn hackmyresume:build'
        ],
        blocking: true,
        parallel: false,
      },
    }),
    // new HtmlWebpackPlugin({
    //   template: 'dist/sample.html',
    // }),
  ],
  node: {
    fs: 'empty',
  },
  // resolveLoader: {
  //   modules: ['src/loader', 'node_modules']
  // },
};
