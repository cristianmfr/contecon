import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Favorecidos',
}

export default function BeneficiariesLayout({
  children,
  modal,
}: {
  modal: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <>
      {modal}
      {children}
    </>
  )
}
