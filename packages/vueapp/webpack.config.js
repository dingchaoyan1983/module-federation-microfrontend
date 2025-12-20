const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('@module-federation/enhanced/webpack');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    publicPath: 'auto',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    // new ModuleFederationPlugin({
    //   name: 'vueApp',
    //   exposes: {
    //     './App': './src/App.vue',
    //     './routes': './src/routes.js',
    //     './lifecycle': './src/lifecycle.js',
    //   },
    //   shared: {
    //     vue: {
    //       singleton: true,
    //       requiredVersion: '^3.0.0',
    //     },
    //     'vue-router': {
    //       singleton: true,
    //       requiredVersion: '^4.0.0',
    //     }
    //   },
    //   shareStrategy: "loaded-first",
    //   manifest: true,
    // }),
  ],
  devServer: {
    port: 3003,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*', // 允许跨域请求
    },
  },
};