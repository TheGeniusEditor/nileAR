import type { Metadata } from 'next'
import HotelReconciliationClient from './HotelReconciliationClient'

export const metadata: Metadata = {
  title: 'Hotel Reconciliation'
}

export default async function HotelReconciliationPage({ params }: { params: Promise<{ hotelId: string }> }) {
  const { hotelId } = await params
  return <HotelReconciliationClient hotelId={hotelId} />
}
