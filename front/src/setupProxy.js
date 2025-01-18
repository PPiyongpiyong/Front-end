const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        ["/api", "/api2"],
        createProxyMiddleware({
            target: "http://52.79.245.244",
            changeOrigin: true,
            router: {
                "/api2": "http://13.125.7.215",
            },
            logLevel: "debug",
        })
    );
};
