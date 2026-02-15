import type { Metadata } from 'next'
import OrganizationsClient from './OrganizationsClient'

export const metadata: Metadata = {
  title: 'Corporate Organizations'
}

export default function OrganizationsPage() {
  return <OrganizationsClient />
}
