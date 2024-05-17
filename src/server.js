const Hapi = require('@hapi/hapi');

// eslint-disable-next-line import/no-extraneous-dependencies
const inert = require('@hapi/inert');
const routes = require('./routes/routes');

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: '127.0.0.1',
  });

  server.route(routes);
  await server.register(inert);
  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

init();
