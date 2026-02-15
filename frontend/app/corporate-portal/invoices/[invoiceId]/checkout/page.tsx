import type { Metadata } from 'next'
import CheckoutClient from './CheckoutClient'

export const metadata: Metadata = {
  title: 'Secure Checkout - Invoice Payment'
}

export default function CheckoutPage() {
  return <CheckoutClient />
}
