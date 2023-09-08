/**
 * The file is based on the material from lectures/tutorials by Yihan Lu and Le Kang.
 */

const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: process.env.REACT_APP_PROXY_HOST || 'http://localhost:8080',
            changeOrigin: true,
        })
    )
}
