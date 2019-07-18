const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/api', { 
       target: 'https://douban.uieee.com/v2',
       secure: false,
       changeOrigin: true,
       pathRewrite: {
        "^/api": "/"
       },
       // cookieDomainRewrite: "http://localhost:3000"
    }));
}
