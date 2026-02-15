import type { Metadata } from 'next'
import HotelFinanceClient from './HotelFinanceClient'

export const metadata: Metadata = {
  title: 'CFO Dashboard Overview - Hotel Finance'
}

export default function HotelFinancePage() {
  return <HotelFinanceClient />
}
