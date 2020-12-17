const path = require('path')

module.exports = {
  mode: 'development',
  devServer: {
    open: true,
    port: 3000,
    // gzip可以提升返回页面的速度
    compress: true,
    // 指定本地服务目录，默认为/
    contentBase: path.resolve(__dirname, '../dist'),
  },
  
}
