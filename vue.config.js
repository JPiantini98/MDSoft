module.exports = {
    devServer: {
        proxy: {
            '^/api': {
                target: 'http://localhost:44347/',
                changeOrigin: true,
                secure: false,
                pathRewrite: { '^/api': '/api' },
                logLevel: 'debug'
            },
        }
    }
}