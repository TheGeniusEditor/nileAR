import type { Metadata } from 'next'
import AttachClient from './AttachClient'

export const metadata: Metadata = {
  title: 'Attach Documents - Hotel Finance'
}

export default function AttachPage({ params }: { params: { bookingId: string } }) {
  return <AttachClient bookingId={params.bookingId} />
}
