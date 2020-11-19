const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/socket.io',
    createProxyMiddleware({
      target: 'http://localhost:3000/socket.io',
      changeOrigin: true,
      ws:true
    })
  );
};