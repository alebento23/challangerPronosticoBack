const { PORT } = require("../config/config");
exports.options = {
    routePrefix: "/documentacion",
    exposeRoute: true,
    swagger: {
        info: {
            title: "Documentacion api",
            description: " api ",
            version: "v1"
        },
        externalsDocs: {
            url: "swagger.io",
            description: "api"
        }
    },
    host: `localhost:${PORT}`,
    schemas: ["http"],
    cosumes: ["application/json"],
    produces: ["application/json"]
};
