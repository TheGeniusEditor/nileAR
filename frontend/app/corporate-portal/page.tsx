import type { Metadata } from 'next'
import CorporatePortalClient from './CorporatePortalClient'

export const metadata: Metadata = {
  title: 'Partner Hotels'
}

export default function CorporatePortalPage() {
  return <CorporatePortalClient />
}
