import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers } from "./graphql/schema/resolvers/index.js";
import { typeDefs } from "./graphql/schema/typeDefs/index.js";

// Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });

console.log(`🚀 Server ready at ${url}`);
