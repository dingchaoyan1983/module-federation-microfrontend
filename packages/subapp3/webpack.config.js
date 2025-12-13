const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('@module-federation/enhanced/webpack');
const { DefinePlugin } = require('webpack');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: './src/main.ts',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? '[name].[contenthash].js' : '[name].js',
      publicPath: 'http://localhost:3003/',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.vue'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/]
          }
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/,
          type: 'asset/resource',
        },
      ],
    },
    plugins: [
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
      new DefinePlugin({
        __VUE_OPTIONS_API__: JSON.stringify(true),
        __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
      }),
      new ModuleFederationPlugin({
        name: 'vue',
        exposes: {
          './App': './src/boostrap.ts', // 暴露整个应用
        },
        manifest: true,
        shareStrategy: "loaded-first",
        dts: {
          generateTypes: true,
          displayErrorInTerminal: true,
        },
        bridge: {
          enableBridgeRouter: true
        }
      }),
    ],
    devServer: {
      port: 3003,
      historyApiFallback: true,
      hot: true,
      headers: {
        'Access-Control-Allow-Origin': '*', // 允许跨域请求
      },
    },
    watchOptions: {
    ignored: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.git/**',
      '**/build/**',
      '**/*.test.tsx',
      '**/*.spec.tsx',
      '**/*.test.ts',
      '**/*.spec.ts',
      '**/@mf-types/**'
    ],
    aggregateTimeout: 300,
    poll: false
  },
    optimization: {
      splitChunks: isProduction ? {
        chunks: 'all',
      } : false,
    },
  };
};