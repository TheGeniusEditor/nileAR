import type { Metadata } from 'next'
import SendClient from './SendClient'

export const metadata: Metadata = {
  title: 'Send Invoice Email - Hotel Finance'
}

export default function SendPage({ params }: { params: { bookingId: string } }) {
  return <SendClient bookingId={params.bookingId} />
}
