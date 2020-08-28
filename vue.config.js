module.exports = {
  publicPath: './',
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import '@/assets/style/global.sass'`
      },
    }
  }
}