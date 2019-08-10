const HtmlWebpackPlugin = require('html-webpack-plugin');
const config =  require('./index');
module.exports = {
  entry: {
    app: './src/main.js',
    activity:'./src/activity.js',
    needleGame: './src/needleGame.js'
  },
  devHtmlWebpackPlugin: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: 'head',
      chunks:['app']
    }),
    new HtmlWebpackPlugin({
      filename: 'activity.html',
      template: 'activity.html',
      inject: true,
      chunks:['activity']
    }),
    new HtmlWebpackPlugin({
      filename: 'needleGame.html',
      template: 'needleGame.html',
      inject: true,
      chunks:['needleGame']
    })
  ],
  proHtmlWebpackPlugin: [
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'index.html',
      inject: 'head',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency',
      chunks: ['manifest','vendor','app']//需要引入的Chunk，不配置就会引入所有页面的资源
    }),
    new HtmlWebpackPlugin({
      filename: config.build.activity,
      template: 'activity.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency',
      chunks: ['manifest','vendor','activity']
    }),
    new HtmlWebpackPlugin({
      filename: config.build.needleGame,
      template: 'needleGame.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency',
      chunks: ['manifest','vendor','needleGame']
    })
  ]
};
