import AttachBillsClient from '../../AttachBillsClient'

export default function AttachBillsPage({ params }: { params: { bookingId: string } }) {
  return <AttachBillsClient bookingId={params.bookingId} />
}
