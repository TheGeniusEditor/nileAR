import type { Metadata } from 'next'
import BookingsClient from './BookingsClient'

export const metadata: Metadata = {
  title: 'Bookings Management - Hotel Finance'
}

export default function BookingsPage() {
  return <BookingsClient />
}
