import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
	shared: {
		NEXT_PUBLIC_GRAPHQL_URL: z.string(),
		NEXT_PUBLIC_WS_URL: z.string(),
	},
	runtimeEnv: {
		NEXT_PUBLIC_GRAPHQL_URL: process.env.NEXT_PUBLIC_GRAPHQL_URL,
		NEXT_PUBLIC_WS_URL: process.env.NEXT_PUBLIC_WS_URL,
	},
	emptyStringAsUndefined: true,
})
