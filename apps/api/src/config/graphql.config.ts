import { ApolloDriverConfig } from '@nestjs/apollo'
import { Injectable } from '@nestjs/common'
import { GqlOptionsFactory } from '@nestjs/graphql'
import { join } from 'path'
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  createGqlOptions(): ApolloDriverConfig {
    return {
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      autoSchemaFile: join(process.cwd(), 'src/shared/graphql/schema.gql'),
      playground: false,
      installSubscriptionHandlers: true,
      introspection: true,
      context: (ctx) => {
        return ctx
      },
      subscriptions: {
        'graphql-ws': {
          path: '/subscriptions',
        },
      },
    }
  }
}
