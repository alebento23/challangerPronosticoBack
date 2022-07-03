const fastify = require("fastify")({ logger: true });

const config = require("./config/config");
const routes = require("./routes/location.routes");
const swagger = require("./utils/swagger");

//plugins
fastify.register(require("fastify-swagger"), swagger.options);
fastify.register(
    (fastify, opts, next) => {
        routes.forEach((route) => {
            fastify.route(route);
        });
        next();
    },
    { prefix: "v1" }
);

fastify.register(require("fastify-cors"), {
    origin: true
});

fastify.get("/", (request, reply) => {
    reply.send({ mensaje: "api on" });
});

const start = async () => {
    await fastify.listen(config.PORT);
    fastify.log.info(`server on port ${fastify.server.address().port}`);
};

start();
