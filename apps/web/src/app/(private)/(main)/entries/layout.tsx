import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lançamentos',
}

export default function EntriesLayout({ children, modal }: { modal: React.ReactNode; children: React.ReactNode }) {
  return (
    <>
      {modal}
      {children}
    </>
  )
}
