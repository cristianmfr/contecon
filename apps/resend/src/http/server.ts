import fastify from 'fastify'
import { sendPasswordRecoveryEmail } from './routes/send-password-recovery-email'

const app = fastify()

app.get('/', (req, res) => {
  res.send('Email server is running!')
})

app.register(sendPasswordRecoveryEmail)

app.listen({ port: 3001, host: '0.0.0.0' }).then(() => {
  console.log('Mail server running on port 3001')
})
