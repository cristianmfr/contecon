import { FastifyInstance } from 'fastify'
import resend from '@/lib/resend-client'

export async function sendPasswordRecoveryEmail(app: FastifyInstance) {
  app.post(
    '/user/password-recovery',
    {
      schema: {
        body: {
          type: 'object',
          required: ['email'],
          properties: {
            email: { type: 'string', format: 'email' },
          },
        },
      },
    },
    async (request, reply) => {
      const { email } = request.body as { email: string }

      const { error } = await resend.emails.send({
        from: 'dev@contecon.tech',
        to: email,
        subject: 'Hello World',
        html: '<p>Congrats on sending your <strong>first email</strong>!</p>',
      })

      if (error) {
        return reply.status(500).send({
          message: 'Error sending email',
          error: error.message,
        })
      }

      return reply.status(201).send({
        message: 'Password recovery email sent',
      })
    }
  )
}
