import type { Metadata } from 'next'
import ReconciliationClient from './ReconciliationClient'

export const metadata: Metadata = {
  title: 'Organization Reconciliation - Hotel Finance'
}

export default function ReconciliationPage({ params }: { params: { organizationId: string } }) {
  return <ReconciliationClient organizationId={params.organizationId} />
}
