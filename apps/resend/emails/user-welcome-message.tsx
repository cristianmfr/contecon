import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'

interface UserWelcomeMessageEmailProps {
  links: {
    title: string
    href: string
  }[]
}

export const UserWelcomeMessageEmail = ({ links }: UserWelcomeMessageEmailProps) => {
  return (
    <Html>
      <Head />
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: '#2250f4',
                offwhite: '#fafbfb',
              },
              spacing: {
                0: '0px',
                20: '20px',
                45: '45px',
              },
            },
          },
        }}
      >
        <Preview>Bem-vindo à Contecon!</Preview>
        <Body className='bg-offwhite font-sans text-base'>
          <Container className='bg-white p-45'>
            <Heading className='my-2 text-center flex items-center justify-center gap-2'>
              Bem-vindo à Contecon! <Img src={`/static/party-popper.png`} alt='Party Popper' className='w-10 h-10' />
            </Heading>
            <Section>
              <Row>
                <Text className='text-base text-center text-sm font-normal'>
                  Obrigado por se cadastrar no nosso sistema. Para começar a usar, você precisa confirmar seu email.
                </Text>
                <Section className='text-center'>
                  <Button className='rounded-lg bg-brand px-[18px] py-3 text-white cursor-pointer'>
                    Ir para o seu dashboard
                  </Button>
                </Section>
                <Text className='text-base text-center text-gray-400 text-sm font-light'>
                  Se você não solicitou este cadastro, apenas ignore e exclua esta mensagem.
                </Text>
              </Row>
            </Section>
            <Section className='mt-45'>
              <Row>
                {links?.map((link) => (
                  <Column key={link.title}>
                    <Link className='font-bold text-black underline' href={link.href}>
                      {link.title}
                    </Link>{' '}
                    <span className='text-green-500'>→</span>
                  </Column>
                ))}
              </Row>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default UserWelcomeMessageEmail
