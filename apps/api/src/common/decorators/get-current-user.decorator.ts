import { createParamDecorator } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

export const GetCurrentUser = createParamDecorator((data: unknown, context: GqlExecutionContext) => {
  const ctx = GqlExecutionContext.create(context).getContext()
  return ctx.user
})
