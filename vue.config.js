module.exports = {
    devServer: {
        port: 5173, // 端口
        proxy: {
            '/get': {
                target: 'http://localhost:10086/',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/get': ''
                }
            },
        }
    },
    lintOnSave: true // 取消 eslint 验证
}

