const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

app.use('/proxy', createProxyMiddleware({
    target: 'https://anitube.in.ua',
    changeOrigin: true,
    pathRewrite: { '^/proxy': '' },
    onProxyReq: (proxyReq, req, res) => {
        proxyReq.removeHeader('origin');
        proxyReq.removeHeader('referer');
        proxyReq.setHeader('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    }
}));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`CORS-проксі запущено на порту ${PORT}`));
