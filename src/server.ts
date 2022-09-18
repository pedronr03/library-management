import 'reflect-metadata';
import 'dotenv/config';
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const schema = await buildSchema({ resolvers: [`${__dirname}/graphql/resolvers/*.resolver.{ts,js}`] });
  const server = new ApolloServer({ schema });
  server
    .listen({ port })
    .then(({ url }) => console.log(`Application running on ${url}`));
}

bootstrap();