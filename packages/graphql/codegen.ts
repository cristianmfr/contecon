import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
   schema: 'http://localhost:3333/graphql',
   documents: ['src/**/*.tsx'],
   generates: {
      './src/': {
         preset: 'client',
         plugins: [],
         presetConfig: {
            gqlTagName: 'gql',
         },
      },
   },
   ignoreNoDocuments: true,
}

export default config
