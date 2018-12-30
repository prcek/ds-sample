
import { DataSource, DataSourceConfig } from 'apollo-datasource';
import { ApolloServer, gql } from 'apollo-server';
import { createTestClient } from 'apollo-server-testing';

const typeDefs = gql`
  type Query {
    hello: String
    hello2: String
  }
  type Mutation {
      increment: Int!
    }
`;

const resolvers = {
  Query: {
    hello: () => 'hi',
    hello2: (_:any, __:any, { person }:{person:any}) => {
        console.log("HELLO WOW!");
        return `hello ${person}`;
      },
  },
  Mutation: {
    increment: () => 1,
  },
};


export async function sampleFunction(x: number): Promise<number> {
    const sampleDS = new SampleDS();
    const sampleDS2 = new SampleDS();
    const datasources = { sampleDS, sampleDS2 };
    const server = new ApolloServer({
        typeDefs,
        context: () => ({ person: 'tom' }),
        resolvers,
        dataSources: ()=> datasources,
    })


    const query = `{ hello2 }`;
    const client = createTestClient(server);

    const res = await client.query({ query });
    console.log(res);
    return sampleDS.doit(x);
}


export class SampleDS<TContext = any> extends DataSource<TContext> {
    context!: TContext;
    initialize(config: DataSourceConfig<TContext>): void {
        this.context = config.context;
        console.log("HELLO WOWX!");
    }
    doit(x:number):number {
        console.log("HELLO!")
        return x+x+x;
    }
}





