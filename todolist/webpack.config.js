const path = require('path');

module.exports = {
    // 打包入口
    entry: {
        index: path.resolve(__dirname, './src/index.js')
    },
    // 指定输出地址及打包出来的文件名
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    resolveLoader: {
        moduleExtensions: ['-loader']
    },
    // 解析css, image等loader
    module: {
        // rules集合的每个元素都是一个文件类型的配置信息
        rules: [
            {
                test: /.js[x]?$/,
                use: 'babel-loader'
            },
        ]
    },
    // 开发环境配置项
    devServer: {},
    // 配置插件功能
    plugins: [],
    // 这个是css, image等分离文件的配置
    optimization: {},
    // mode指开发环境 "development" | "production" | "none"
    mode: 'development'
}
