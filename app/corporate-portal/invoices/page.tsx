import type { Metadata } from 'next'
import InvoicesClient from './InvoicesClient'

export const metadata: Metadata = {
  title: 'Invoice History & Tracking'
}

export default function InvoicesPage() {
  return <InvoicesClient />
}
