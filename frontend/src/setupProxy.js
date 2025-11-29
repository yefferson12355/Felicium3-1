const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // En Docker, el backend está en el servicio 'backend:3000' (puerto interno)
  const backendURL = process.env.REACT_APP_BACKEND_HOST || 'http://backend:3000';
  
  console.log('🔧 Proxy configurado para:', backendURL);
  console.log('🔧 Proxying /api/* → ' + backendURL + '/api/*');
  
  app.use(
    '/api',
    createProxyMiddleware({
      target: backendURL,
      changeOrigin: true,
      pathRewrite: undefined,
      onProxyReq: (proxyReq, req, res) => {
        console.log('🔀 Proxy request:', req.method, req.url, '→', backendURL + req.url);
      },
      onError: (err, req, res) => {
        console.error('❌ Proxy error:', err.message);
        res.status(500).json({ error: 'Proxy error: ' + err.message });
      },
      logLevel: 'debug',
    })
  );
};
