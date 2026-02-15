import type { Metadata } from 'next'
import InvoiceDetailClient from './InvoiceDetailClient'

export const metadata: Metadata = {
  title: 'Invoice Detail & Verification'
}

export default function InvoiceDetailPage() {
  return <InvoiceDetailClient />
}
