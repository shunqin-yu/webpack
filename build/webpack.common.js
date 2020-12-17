const path = require('path')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const devConfig = require('./webpack.dev.js')
const prodConfig = require('./webpack.prod.js')

module.exports = (env) => {
  const IS_DEV = env === 'development'

  const baseConfig = {
    entry: path.resolve(__dirname, '../src/index.tsx'),
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, '../dist'),
    },
    module: {
      rules: [
        {
          test: /\.(tsx|js)$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.s?css$/,
          use: [
            IS_DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                // css文件里引入了其他格式文件，就用这个loader之后两个loader解析
                importLoaders: 2,
              },
            },
            'postcss-loader',
            'sass-loader',
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.(woff|ttf|eot|svg)$/,
          use: 'file-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(jpe?g|png|gif|webp)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 80 * 1024,
              name: 'images/[contenthash].[ext]',
            },
          },
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../public/index.html'),
        filename: 'index.html',
        // 非开发环境下压缩
        minify: !IS_DEV && {
          // html折叠成一行
          collapseWhitespace: true,
        },
      }),
      new CleanWebpackPlugin(),
    ],
  }

  return merge(baseConfig, IS_DEV ? devConfig : prodConfig)
}
