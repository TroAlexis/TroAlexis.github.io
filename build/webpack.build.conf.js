const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const ImageMinPlugin = require('imagemin-webpack-plugin').default;
const ImageMinMozJpeg = require('imagemin-mozjpeg');

const buildWebpackConfig = merge(baseWebpackConfig, {
  // BUILD config
  mode: 'production',
  plugins: [
          // Optimize images
    new ImageMinPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      jpegtran: null,
      optipng: { optimizationLevel: 4 },
      gifsicle: { optimizationLevel: 3 },
      plugins: [
          ImageMinMozJpeg({
            quality: 73,
            progressive: true
          })
      ]
    }),
  ]
})

module.exports = new Promise((resolve, reject) => {
  resolve(buildWebpackConfig)
})
