const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
    app.use(
        "/admin",
        createProxyMiddleware({
            target: "http://localhost:3002/admin", // 后台服务地址以及端口号
            changeOrigin: true, // 是否开启代理
            pathRewrite: {
              "/admin": "", // 代理名称
          },
        })
    );
};