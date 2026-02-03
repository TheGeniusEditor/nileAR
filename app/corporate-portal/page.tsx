import type { Metadata } from 'next'
import CorporatePortalClient from './CorporatePortalClient'

export const metadata: Metadata = {
  title: 'Corporate Client Dashboard'
}

export default function CorporatePortalPage() {
  return <CorporatePortalClient />
}
