export interface Booking {
  id: string
  bookingNumber: string
  customerName: string
  corporationName: string
  checkInDate: string
  checkOutDate: string
  roomType: string
  nights: number
  pricePerNight: number
  totalPrice: number
  status: 'pending' | 'confirmed' | 'checked-in' | 'checked-out'
  gstApplicable: boolean
}

export interface AttachmentMeta {
  name: string
  size: number
  type: string
}

export interface AttachedDocumentsMeta {
  ledgerStatement?: AttachmentMeta
  arCoveringLetter?: AttachmentMeta
  eInvoice?: AttachmentMeta
  pmsInvoice?: AttachmentMeta
  posSupporting?: AttachmentMeta
}

export interface SkippedDocumentsMeta {
  ledgerStatement?: boolean
  arCoveringLetter?: boolean
  eInvoice?: boolean
  pmsInvoice?: boolean
  posSupporting?: boolean
}

export const mockBookings: Booking[] = [
  {
    id: '1',
    bookingNumber: 'BK-001',
    customerName: 'John Smith',
    corporationName: 'Acme Corporation',
    checkInDate: '2024-02-10',
    checkOutDate: '2024-02-15',
    roomType: 'Deluxe Suite',
    nights: 5,
    pricePerNight: 350,
    totalPrice: 1750,
    status: 'pending',
    gstApplicable: true,
  },
  {
    id: '2',
    bookingNumber: 'BK-002',
    customerName: 'Sarah Johnson',
    corporationName: 'Tech Innovations Inc',
    checkInDate: '2024-02-12',
    checkOutDate: '2024-02-14',
    roomType: 'Standard Room',
    nights: 2,
    pricePerNight: 200,
    totalPrice: 400,
    status: 'confirmed',
    gstApplicable: false,
  },
  {
    id: '3',
    bookingNumber: 'BK-003',
    customerName: 'Michael Chen',
    corporationName: 'Global Finance Ltd',
    checkInDate: '2024-02-08',
    checkOutDate: '2024-02-20',
    roomType: 'Presidential Suite',
    nights: 12,
    pricePerNight: 500,
    totalPrice: 6000,
    status: 'checked-in',
    gstApplicable: true,
  },
  {
    id: '4',
    bookingNumber: 'BK-004',
    customerName: 'Emily Davis',
    corporationName: 'Startup Ventures LLC',
    checkInDate: '2024-02-05',
    checkOutDate: '2024-02-07',
    roomType: 'Standard Room',
    nights: 2,
    pricePerNight: 200,
    totalPrice: 400,
    status: 'checked-out',
    gstApplicable: false,
  },
  {
    id: '5',
    bookingNumber: 'BK-005',
    customerName: 'Robert Wilson',
    corporationName: 'Enterprise Solutions',
    checkInDate: '2024-02-16',
    checkOutDate: '2024-02-18',
    roomType: 'Deluxe Suite',
    nights: 2,
    pricePerNight: 350,
    totalPrice: 700,
    status: 'pending',
    gstApplicable: true,
  },
  {
    id: '6',
    bookingNumber: 'BK-006',
    customerName: 'Lisa Anderson',
    corporationName: 'Digital Transformations Co',
    checkInDate: '2024-02-11',
    checkOutDate: '2024-02-13',
    roomType: 'Standard Room',
    nights: 2,
    pricePerNight: 200,
    totalPrice: 400,
    status: 'confirmed',
    gstApplicable: true,
  },
]

export function getBookingById(id: string): Booking | undefined {
  return mockBookings.find(b => b.id === id)
}

export function saveAttachments(bookingId: string, docs: AttachedDocumentsMeta) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(`booking_attachments_${bookingId}`, JSON.stringify(docs))
  }
}

export function loadAttachments(bookingId: string): AttachedDocumentsMeta | null {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(`booking_attachments_${bookingId}`)
    if (stored) return JSON.parse(stored)
  }
  return null
}

export function clearAttachments(bookingId: string) {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(`booking_attachments_${bookingId}`)
  }
}

export function saveSkippedAttachments(bookingId: string, skipped: SkippedDocumentsMeta) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(`booking_skipped_${bookingId}`, JSON.stringify(skipped))
  }
}

export function loadSkippedAttachments(bookingId: string): SkippedDocumentsMeta | null {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(`booking_skipped_${bookingId}`)
    if (stored) return JSON.parse(stored)
  }
  return null
}
