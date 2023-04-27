// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use('/admin',
    createProxyMiddleware({
      target: 'https://127.0.0.1:8080',
      changeOrigin: true,
    }),
  );
};
