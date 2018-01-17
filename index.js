import Hapi from 'hapi';
import { createLogger, transports } from 'winston';
import { graphqlHapi, graphiqlHapi } from 'apollo-server-hapi';
import { makeExecutableSchema } from 'graphql-tools';
import typeDefs from './typedefs';
import resolvers from './resolvers';

const logger = createLogger({
  level: 'info',
  transports: [new transports.Console()],
});

const Server = new Hapi.Server({
  port: 3001,
  host: 'localhost',
  routes: { log: { collect: true } },
});

const schema = makeExecutableSchema({ typeDefs: [typeDefs], resolvers });

async function StartServer() {
  await Server.register([
    {
      plugin: graphqlHapi,
      options: {
        path: '/graphql',
        graphqlOptions: { schema },
        route: { cors: true },
      },
    },
    {
      plugin: graphiqlHapi,
      options: {
        path: '/graphiql',
        graphiqlOptions: {
          endpointURL: '/graphql',
        },
      },
    },
  ]);

  try {
    await Server.start();
  } catch (err) {
    console.log(`Error starting server: ${err.message}`);
  }
  console.log(`Server running at: ${Server.info.uri}`);

  Server.events.on('response', request => {
    logger.info(request.payload);
    logger.info(request.response.source);
  });
}

StartServer();
