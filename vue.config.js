const path = require('path')

const resolve = dir => {
    return path.join(__dirname, dir)
}

// 项目部署基础
// 默认情况下，我们假设你的应用将被部署在域的根目录下,
// 例如：https://www.my-app.com/
// 默认：'/'
// 如果您的应用程序部署在子路径中，则需要在这指定子路径
// 例如：https://www.foobar.com/my-app/
// 需要将它改为'/my-app/'
// iview-admin线上演示打包路径： https://file.iviewui.com/admin-dist/
const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/'
    : '/'

module.exports = {

    baseUrl: BASE_URL,
    // tweak internal webpack configuration.
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    // 如果你不需要使用eslint，把lintOnSave设为false即可
    // key,value自行定义，比如.set('@@', resolve('src/components'))
    lintOnSave: true,
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('_c', resolve('src/components'))
    },
    // 设为false打包时不生成.map文件
    productionSourceMap: false,
    // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
    //  target: 'http://106.13.70.95:888', // 接口的域名
    // secure: false,  // 如果是https接口，需要配置这个参数
    // changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
    devServer: {
        proxy: {
            '/': {
                target: 'http://106.13.70.95:888',
                secure: false,
                changeOrigin: true,
            }
        }
    }
}
