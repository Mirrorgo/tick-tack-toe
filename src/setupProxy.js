// const proxy = require("http-proxy-middleware");
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api1", {
      target: "http://localhost:5000/",
      //   target: "localhost:9000/",
      //   target: "http://172.20.255.250:5000/",
      //+/
      // Error occurred while proxying request localhost:3000/request to http://localhost:5000/ [ECONNREFUSED]
      changeOrigin: true,
      pathRewrite: { "^/api1": "" },
    })
  );
};
