// manual proxy for firefox hot reloading: https://github.com/facebook/create-react-app/issues/6720#issuecomment-486641448
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:8001",
      changeOrigin: true
    })
  );
};
