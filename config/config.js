// config.js
module.exports = {
  // ...
  dev: {
    proxyTable: {
      // proxy all requests starting with /papi to jsonplaceholder
      '/papi*': {
        target: 'http://127.0.0.1/',
        //changeOrigin: true,
		secure: false
/*         pathRewrite: {
          '^/papi': ''
        } */
      }
    }
  }
}