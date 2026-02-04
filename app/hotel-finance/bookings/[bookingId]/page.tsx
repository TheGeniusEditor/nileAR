import type { Metadata } from 'next'
import CheckoutClient from './CheckoutClient'

export const metadata: Metadata = {
  title: 'Guest Checkout & Bill - Hotel Finance'
}

export default function CheckoutPage({ params }: { params: { bookingId: string } }) {
  return <CheckoutClient bookingId={params.bookingId} />
}
