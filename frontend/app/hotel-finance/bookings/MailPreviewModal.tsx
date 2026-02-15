"use client"

import { useState } from 'react'

interface Booking {
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

interface AttachedDocuments {
  ledgerStatement?: File
  arCoveringLetter?: File
  eInvoice?: File
  pmsInvoice?: File
  posSupporting?: File
}

interface MailPreviewModalProps {
  booking: Booking
  attachedDocuments: AttachedDocuments
  onClose: () => void
  onSend: () => void
}

const calculateDaysForPayment = (amount: number) => {
  return 30
}

export default function MailPreviewModal({ 
  booking, 
  attachedDocuments,
  onClose,
  onSend 
}: MailPreviewModalProps) {
  const [isSending, setIsSending] = useState(false)
  const [recipientEmail, setRecipientEmail] = useState('')
  const paymentDays = calculateDaysForPayment(booking.totalPrice)
  const mailSubject = `Payment Due of Rs.${booking.totalPrice.toLocaleString()}/- from ${paymentDays} days. Please pay`
  const paymentLink = `https://corporate-portal.example.com/payments?booking=${booking.bookingNumber}`

  const handleSend = async () => {
    if (!recipientEmail) {
      alert('Please enter recipient email address')
      return
    }

    setIsSending(true)
    try {
      // Simulate email sending
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // In a real application, this would call an API endpoint to send the email
      console.log('Sending email to:', recipientEmail)
      console.log('Subject:', mailSubject)
      console.log('Attached documents:', Object.keys(attachedDocuments))
      
      onSend()
    } catch (error) {
      alert('Failed to send email. Please try again.')
    } finally {
      setIsSending(false)
    }
  }

  const attachmentCount = Object.keys(attachedDocuments).length

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-2xl max-w-2xl w-full border border-slate-100 dark:border-slate-800 my-8">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-text-main-light dark:text-text-main-dark">
              Email Preview
            </h2>
            <p className="text-sm text-text-sub-light dark:text-text-sub-dark mt-1">
              Review and send payment notification email
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-text-sub-light dark:text-text-sub-dark hover:text-text-main-light dark:hover:text-text-main-dark"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-6">
          {/* Recipient Email */}
          <div>
            <label className="block text-sm font-semibold text-text-main-light dark:text-text-main-dark mb-2">
              Send to Organization
            </label>
            <input
              type="email"
              placeholder="Enter organization email address"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-text-main-light dark:text-text-main-dark placeholder-text-sub-light dark:placeholder-text-sub-dark focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <p className="text-xs text-text-sub-light dark:text-text-sub-dark mt-2">
              Organization: {booking.corporationName}
            </p>
          </div>

          {/* Email Preview */}
          <div>
            <label className="block text-sm font-semibold text-text-main-light dark:text-text-main-dark mb-2">
              Email Preview
            </label>
            <div className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg p-6 space-y-4">
              {/* From/To */}
              <div className="space-y-2 pb-4 border-b border-slate-200 dark:border-slate-700">
                <div>
                  <p className="text-xs font-semibold text-text-sub-light dark:text-text-sub-dark uppercase">From</p>
                  <p className="text-sm text-text-main-light dark:text-text-main-dark">finance@hotelname.com</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-text-sub-light dark:text-text-sub-dark uppercase">To</p>
                  <p className="text-sm text-text-main-light dark:text-text-main-dark">{recipientEmail || 'recipient@organization.com'}</p>
                </div>
              </div>

              {/* Subject */}
              <div>
                <p className="text-xs font-semibold text-text-sub-light dark:text-text-sub-dark uppercase mb-1">Subject</p>
                <p className="text-sm font-semibold text-primary">{mailSubject}</p>
              </div>

              {/* Body */}
              <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                <p className="text-sm text-text-main-light dark:text-text-main-dark">Dear Sir/Madam,</p>
                
                <p className="text-sm text-text-main-light dark:text-text-main-dark leading-relaxed">
                  Greetings from our side.
                </p>

                <p className="text-sm text-text-main-light dark:text-text-main-dark leading-relaxed">
                  Please find below the Statement of Accounts for your reference, reflecting the transactions recorded in our books up to date. As per our records, an outstanding balance of <span className="font-bold text-primary">Rs.{booking.totalPrice.toLocaleString()}</span> is currently due for payment. We request you to kindly review the statement and arrange for payment at the earliest.
                </p>

                <p className="text-sm text-text-main-light dark:text-text-main-dark leading-relaxed">
                  <strong>Payment Link:</strong> <a href={paymentLink} className="text-primary hover:underline">{paymentLink}</a>
                </p>

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded p-3 mt-4">
                  <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 mb-2">Booking Details:</p>
                  <div className="text-xs text-text-main-light dark:text-text-main-dark space-y-1">
                    <p>• <strong>Booking #:</strong> {booking.bookingNumber}</p>
                    <p>• <strong>Organization:</strong> {booking.corporationName}</p>
                    <p>• <strong>Guest:</strong> {booking.customerName}</p>
                    <p>• <strong>Room:</strong> {booking.roomType}</p>
                    <p>• <strong>Check-in:</strong> {new Date(booking.checkInDate).toLocaleDateString()}</p>
                    <p>• <strong>Check-out:</strong> {new Date(booking.checkOutDate).toLocaleDateString()}</p>
                    <p>• <strong>Amount Due:</strong> Rs.{booking.totalPrice.toLocaleString()}</p>
                  </div>
                </div>

                <p className="text-sm text-text-main-light dark:text-text-main-dark leading-relaxed">
                  In case of any discrepancy, kindly inform us within 48 hours, so that we can reconcile the same promptly. Your timely support in clearing the dues will be highly appreciated and will help us maintain smooth business operations.
                </p>

                <p className="text-sm text-text-main-light dark:text-text-main-dark">
                  Best regards,<br/>
                  <strong>Hotel Finance Team</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Attachments Summary */}
          <div>
            <label className="block text-sm font-semibold text-text-main-light dark:text-text-main-dark mb-2">
              Attachments ({attachmentCount})
            </label>
            <div className="space-y-2">
              {attachedDocuments.ledgerStatement && (
                <div className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-800/50 rounded">
                  <span className="material-symbols-outlined text-primary text-[20px]">attach_file</span>
                  <div className="text-sm">
                    <p className="font-semibold text-text-main-light dark:text-text-main-dark">
                      {attachedDocuments.ledgerStatement.name}
                    </p>
                    <p className="text-xs text-text-sub-light dark:text-text-sub-dark">
                      Ledger Statement
                    </p>
                  </div>
                </div>
              )}
              {attachedDocuments.arCoveringLetter && (
                <div className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-800/50 rounded">
                  <span className="material-symbols-outlined text-primary text-[20px]">attach_file</span>
                  <div className="text-sm">
                    <p className="font-semibold text-text-main-light dark:text-text-main-dark">
                      {attachedDocuments.arCoveringLetter.name}
                    </p>
                    <p className="text-xs text-text-sub-light dark:text-text-sub-dark">
                      AR Covering Letter
                    </p>
                  </div>
                </div>
              )}
              {attachedDocuments.eInvoice && booking.gstApplicable && (
                <div className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-800/50 rounded">
                  <span className="material-symbols-outlined text-primary text-[20px]">attach_file</span>
                  <div className="text-sm">
                    <p className="font-semibold text-text-main-light dark:text-text-main-dark">
                      {attachedDocuments.eInvoice.name}
                    </p>
                    <p className="text-xs text-text-sub-light dark:text-text-sub-dark">E-Invoice</p>
                  </div>
                </div>
              )}
              {attachedDocuments.pmsInvoice && (
                <div className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-800/50 rounded">
                  <span className="material-symbols-outlined text-primary text-[20px]">attach_file</span>
                  <div className="text-sm">
                    <p className="font-semibold text-text-main-light dark:text-text-main-dark">
                      {attachedDocuments.pmsInvoice.name}
                    </p>
                    <p className="text-xs text-text-sub-light dark:text-text-sub-dark">PMS Invoice</p>
                  </div>
                </div>
              )}
              {attachedDocuments.posSupporting && (
                <div className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-800/50 rounded">
                  <span className="material-symbols-outlined text-primary text-[20px]">attach_file</span>
                  <div className="text-sm">
                    <p className="font-semibold text-text-main-light dark:text-text-main-dark">
                      {attachedDocuments.posSupporting.name}
                    </p>
                    <p className="text-xs text-text-sub-light dark:text-text-sub-dark">
                      POS Supporting
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-text-main-light dark:text-text-main-dark hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            disabled={!recipientEmail || isSending}
            className="px-4 py-2 bg-primary hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSending ? (
              <>
                <span className="material-symbols-outlined text-[18px] animate-spin">schedule</span>
                <span>Sending...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[18px]">send</span>
                <span>Send Email</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
