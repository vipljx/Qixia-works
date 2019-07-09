module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  devServer: {
    compress: true,
    disableHostCheck: true,   // That solved it
  },
  productionSourceMap: false,
  lintOnSave:false
}