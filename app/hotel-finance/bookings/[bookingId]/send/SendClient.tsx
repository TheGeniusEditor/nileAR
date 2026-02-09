"use client"

import Header from '@/app/components/Header'
import Sidebar from '@/app/components/Sidebar'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { getBookingById, loadAttachments, clearAttachments, type Booking, type AttachedDocumentsMeta } from '../../data'

const docLabels: Record<string, { label: string; icon: string }> = {
  ledgerStatement: { label: 'Ledger Statement', icon: 'account_balance' },
  arCoveringLetter: { label: 'AR Covering Letter', icon: 'description' },
  eInvoice: { label: 'E-Invoice', icon: 'receipt' },
  pmsInvoice: { label: 'PMS Invoice', icon: 'receipt_long' },
  posSupporting: { label: 'POS Supporting', icon: 'article' },
}

export default function SendClient({ bookingId }: { bookingId: string }) {
  const router = useRouter()
  const booking = getBookingById(bookingId)
  const [attachments, setAttachments] = useState<AttachedDocumentsMeta | null>(null)
  const [recipientEmail, setRecipientEmail] = useState('')
  const [ccEmail, setCcEmail] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [activeTab, setActiveTab] = useState<'preview' | 'details'>('preview')

  useEffect(() => {
    const saved = loadAttachments(bookingId)
    setAttachments(saved)
  }, [bookingId])

  if (!booking) {
    return (
      <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark">
        <Sidebar title="Hotel Finance" logoIcon="domain" />
        <main className="flex-1 flex flex-col h-full overflow-hidden">
          <Header />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <span className="material-symbols-outlined text-[64px] text-slate-300 dark:text-slate-600">error</span>
              <h2 className="text-xl font-bold mt-4">Booking Not Found</h2>
              <Link href="/hotel-finance/bookings" className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-semibold">
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                Back to Bookings
              </Link>
            </div>
          </div>
        </main>
      </div>
    )
  }

  const attachmentKeys = attachments ? Object.keys(attachments) as (keyof AttachedDocumentsMeta)[] : []
  const attachmentCount = attachmentKeys.length
  const paymentDays = 30
  const mailSubject = `Payment Due of Rs.${booking.totalPrice.toLocaleString()}/- from ${paymentDays} days. Please pay`
  const paymentLink = `https://corporate-portal.example.com/payments?booking=${booking.bookingNumber}`

  const handleSend = async () => {
    if (!recipientEmail) {
      alert('Please enter the recipient email address')
      return
    }
    setIsSending(true)
    // Simulate sending
    await new Promise(resolve => setTimeout(resolve, 2500))
    setIsSending(false)
    setIsSent(true)
  }

  const handleDone = () => {
    clearAttachments(bookingId)
    router.push('/hotel-finance/bookings')
  }

  // Sent success screen
  if (isSent) {
    return (
      <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark transition-colors duration-200">
        <Sidebar title="Hotel Finance" logoIcon="domain" />
        <main className="flex-1 flex flex-col h-full overflow-hidden bg-background-light dark:bg-background-dark relative">
          <Header />
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center max-w-md">
              <div className="mx-auto w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-6 animate-bounce">
                <span className="material-symbols-outlined text-[40px] text-emerald-500">check_circle</span>
              </div>
              <h2 className="text-2xl font-extrabold text-text-main-light dark:text-text-main-dark">Email Sent Successfully!</h2>
              <p className="text-text-sub-light dark:text-text-sub-dark mt-3 leading-relaxed">
                Payment notification for <span className="font-semibold">{booking.bookingNumber}</span> has been sent to <span className="font-semibold text-primary">{recipientEmail}</span>
              </p>
              <div className="mt-4 p-4 bg-surface-light dark:bg-surface-dark rounded-xl border border-slate-100 dark:border-slate-800">
                <div className="flex justify-between text-sm">
                  <span className="text-text-sub-light dark:text-text-sub-dark">Organization</span>
                  <span className="font-semibold">{booking.corporationName}</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-text-sub-light dark:text-text-sub-dark">Amount</span>
                  <span className="font-semibold">₹{booking.totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-text-sub-light dark:text-text-sub-dark">Attachments</span>
                  <span className="font-semibold">{attachmentCount} document(s)</span>
                </div>
              </div>
              <button
                onClick={handleDone}
                className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors shadow-lg shadow-primary/25"
              >
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                Back to Bookings
              </button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark transition-colors duration-200">
      <Sidebar title="Hotel Finance" logoIcon="domain" />

      <main className="flex-1 flex flex-col h-full overflow-hidden bg-background-light dark:bg-background-dark relative">
        <Header />

        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 scroll-smooth">
          <div className="mx-auto max-w-5xl flex flex-col gap-6">

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm">
              <Link href="/hotel-finance/bookings" className="text-text-sub-light dark:text-text-sub-dark hover:text-primary transition-colors flex items-center gap-1">
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                Bookings
              </Link>
              <span className="text-slate-300 dark:text-slate-600">/</span>
              <Link href={`/hotel-finance/bookings/${bookingId}/attach`} className="text-text-sub-light dark:text-text-sub-dark hover:text-primary transition-colors">
                {booking.bookingNumber}
              </Link>
              <span className="text-slate-300 dark:text-slate-600">/</span>
              <span className="text-primary font-semibold">Send Email</span>
            </div>

            {/* Step Indicator */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px] text-emerald-500">check</span>
                </div>
                <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Documents Attached</span>
              </div>
              <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700"></div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px] text-white">mail</span>
                </div>
                <span className="text-sm font-semibold text-primary">Review & Send</span>
              </div>
            </div>

            {/* Main Content - Two Column */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* Left Column - Email Settings */}
              <div className="lg:col-span-1 flex flex-col gap-4">
                {/* Booking Quick Info */}
                <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm">
                  <h3 className="text-sm font-bold text-text-sub-light dark:text-text-sub-dark uppercase tracking-wider mb-3">Booking</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-text-sub-light dark:text-text-sub-dark">Booking #</p>
                      <p className="font-semibold">{booking.bookingNumber}</p>
                    </div>
                    <div>
                      <p className="text-xs text-text-sub-light dark:text-text-sub-dark">Organization</p>
                      <p className="font-semibold">{booking.corporationName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-text-sub-light dark:text-text-sub-dark">Guest</p>
                      <p className="font-semibold">{booking.customerName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-text-sub-light dark:text-text-sub-dark">Amount Due</p>
                      <p className="text-xl font-extrabold text-primary">₹{booking.totalPrice.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                {/* Recipient */}
                <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm">
                  <h3 className="text-sm font-bold text-text-sub-light dark:text-text-sub-dark uppercase tracking-wider mb-3">Recipient</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-text-main-light dark:text-text-main-dark mb-1.5">To *</label>
                      <input
                        type="email"
                        value={recipientEmail}
                        onChange={(e) => setRecipientEmail(e.target.value)}
                        placeholder="accounts@organization.com"
                        className="w-full px-3 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-sm text-text-main-light dark:text-text-main-dark placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-text-main-light dark:text-text-main-dark mb-1.5">CC</label>
                      <input
                        type="email"
                        value={ccEmail}
                        onChange={(e) => setCcEmail(e.target.value)}
                        placeholder="Optional CC address"
                        className="w-full px-3 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-sm text-text-main-light dark:text-text-main-dark placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Attachments */}
                <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-text-sub-light dark:text-text-sub-dark uppercase tracking-wider">
                      Attachments
                    </h3>
                    <span className="text-xs font-bold text-primary bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-full">
                      {attachmentCount}
                    </span>
                  </div>
                  {attachmentCount > 0 ? (
                    <div className="space-y-2">
                      {attachmentKeys.map((key) => {
                        const doc = docLabels[key]
                        const att = attachments![key]!
                        return (
                          <div key={key} className="flex items-center gap-2.5 p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                            <span className="material-symbols-outlined text-primary text-[18px]">{doc.icon}</span>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-text-main-light dark:text-text-main-dark truncate">{att.name}</p>
                              <p className="text-[11px] text-text-sub-light dark:text-text-sub-dark">{doc.label}</p>
                            </div>
                            <span className="material-symbols-outlined text-emerald-500 text-[16px]">check_circle</span>
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <span className="material-symbols-outlined text-[32px] text-slate-300 dark:text-slate-600">folder_off</span>
                      <p className="text-sm text-text-sub-light dark:text-text-sub-dark mt-2">No documents attached</p>
                      <Link href={`/hotel-finance/bookings/${bookingId}/attach`} className="text-xs text-primary font-semibold mt-2 inline-block hover:underline">
                        Go back to attach
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column - Email Preview */}
              <div className="lg:col-span-2">
                <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
                  {/* Tab Header */}
                  <div className="flex border-b border-slate-200 dark:border-slate-700">
                    <button
                      onClick={() => setActiveTab('preview')}
                      className={`flex-1 px-4 py-3 text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
                        activeTab === 'preview'
                          ? 'border-b-2 border-primary text-primary bg-blue-50/50 dark:bg-blue-900/10'
                          : 'text-text-sub-light dark:text-text-sub-dark hover:text-text-main-light'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">visibility</span>
                      Email Preview
                    </button>
                    <button
                      onClick={() => setActiveTab('details')}
                      className={`flex-1 px-4 py-3 text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
                        activeTab === 'details'
                          ? 'border-b-2 border-primary text-primary bg-blue-50/50 dark:bg-blue-900/10'
                          : 'text-text-sub-light dark:text-text-sub-dark hover:text-text-main-light'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">info</span>
                      Booking Details
                    </button>
                  </div>

                  {activeTab === 'preview' && (
                    <div className="p-6">
                      {/* Email Header */}
                      <div className="space-y-3 pb-4 border-b border-slate-200 dark:border-slate-700">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-text-sub-light dark:text-text-sub-dark uppercase w-16">From</span>
                          <span className="text-sm text-text-main-light dark:text-text-main-dark">finance@hotelname.com</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-text-sub-light dark:text-text-sub-dark uppercase w-16">To</span>
                          <span className="text-sm text-text-main-light dark:text-text-main-dark">
                            {recipientEmail || <span className="text-slate-400 italic">Enter recipient email →</span>}
                          </span>
                        </div>
                        {ccEmail && (
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-text-sub-light dark:text-text-sub-dark uppercase w-16">CC</span>
                            <span className="text-sm text-text-main-light dark:text-text-main-dark">{ccEmail}</span>
                          </div>
                        )}
                        <div className="flex items-start gap-2">
                          <span className="text-xs font-bold text-text-sub-light dark:text-text-sub-dark uppercase w-16 mt-0.5">Subject</span>
                          <span className="text-sm font-semibold text-primary">{mailSubject}</span>
                        </div>
                      </div>

                      {/* Email Body */}
                      <div className="mt-6 space-y-4 text-sm text-text-main-light dark:text-text-main-dark leading-relaxed">
                        <p>Dear Sir/Madam,</p>
                        <p>Greetings from our side.</p>
                        <p>
                          Please find below the Statement of Accounts for your reference, reflecting the transactions recorded in our books up to date. As per our records, an outstanding balance of{' '}
                          <span className="font-bold text-primary">Rs.{booking.totalPrice.toLocaleString()}</span>{' '}
                          is currently due for payment. We request you to kindly review the statement and arrange for payment at the earliest.
                        </p>
                        <p>
                          <strong>Payment Link:</strong>{' '}
                          <a href={paymentLink} className="text-primary hover:underline break-all">{paymentLink}</a>
                        </p>

                        {/* Booking Details Box */}
                        <div className="bg-blue-50 dark:bg-blue-900/15 border border-blue-200 dark:border-blue-800 rounded-xl p-4 my-4">
                          <p className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider mb-3">Booking Details</p>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <span className="text-blue-600/70 dark:text-blue-400/70">Booking #</span>
                              <p className="font-semibold">{booking.bookingNumber}</p>
                            </div>
                            <div>
                              <span className="text-blue-600/70 dark:text-blue-400/70">Organization</span>
                              <p className="font-semibold">{booking.corporationName}</p>
                            </div>
                            <div>
                              <span className="text-blue-600/70 dark:text-blue-400/70">Guest</span>
                              <p className="font-semibold">{booking.customerName}</p>
                            </div>
                            <div>
                              <span className="text-blue-600/70 dark:text-blue-400/70">Room</span>
                              <p className="font-semibold">{booking.roomType}</p>
                            </div>
                            <div>
                              <span className="text-blue-600/70 dark:text-blue-400/70">Check-in</span>
                              <p className="font-semibold">{new Date(booking.checkInDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                            </div>
                            <div>
                              <span className="text-blue-600/70 dark:text-blue-400/70">Check-out</span>
                              <p className="font-semibold">{new Date(booking.checkOutDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                            </div>
                            <div className="col-span-2">
                              <span className="text-blue-600/70 dark:text-blue-400/70">Amount Due</span>
                              <p className="font-bold text-lg text-blue-700 dark:text-blue-300">Rs.{booking.totalPrice.toLocaleString()}</p>
                            </div>
                          </div>
                        </div>

                        <p>
                          In case of any discrepancy, kindly inform us within 48 hours, so that we can reconcile the same promptly. Your timely support in clearing the dues will be highly appreciated and will help us maintain smooth business operations.
                        </p>

                        <div className="pt-2">
                          <p>Best regards,</p>
                          <p className="font-bold">Hotel Finance Team</p>
                        </div>
                      </div>

                      {/* Attachments Bar */}
                      {attachmentCount > 0 && (
                        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                          <p className="text-xs font-bold text-text-sub-light dark:text-text-sub-dark uppercase tracking-wider mb-2 flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">attach_file</span>
                            {attachmentCount} Attachment(s)
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {attachmentKeys.map((key) => {
                              const att = attachments![key]!
                              return (
                                <div key={key} className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg">
                                  <span className="material-symbols-outlined text-[14px] text-primary">{docLabels[key].icon}</span>
                                  <span className="text-xs font-medium text-text-main-light dark:text-text-main-dark truncate max-w-[150px]">{att.name}</span>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'details' && (
                    <div className="p-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h3 className="text-sm font-bold text-text-sub-light dark:text-text-sub-dark uppercase tracking-wider">Booking Information</h3>
                          {[
                            { label: 'Booking #', value: booking.bookingNumber },
                            { label: 'Status', value: booking.status.replace('-', ' ').toUpperCase() },
                            { label: 'Room Type', value: booking.roomType },
                            { label: 'Nights', value: booking.nights.toString() },
                          ].map(({ label, value }) => (
                            <div key={label}>
                              <p className="text-xs text-text-sub-light dark:text-text-sub-dark">{label}</p>
                              <p className="font-semibold text-text-main-light dark:text-text-main-dark">{value}</p>
                            </div>
                          ))}
                        </div>
                        <div className="space-y-4">
                          <h3 className="text-sm font-bold text-text-sub-light dark:text-text-sub-dark uppercase tracking-wider">Guest & Company</h3>
                          {[
                            { label: 'Guest Name', value: booking.customerName },
                            { label: 'Organization', value: booking.corporationName },
                            { label: 'Check-in', value: new Date(booking.checkInDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) },
                            { label: 'Check-out', value: new Date(booking.checkOutDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) },
                          ].map(({ label, value }) => (
                            <div key={label}>
                              <p className="text-xs text-text-sub-light dark:text-text-sub-dark">{label}</p>
                              <p className="font-semibold text-text-main-light dark:text-text-main-dark">{value}</p>
                            </div>
                          ))}
                        </div>
                        <div className="sm:col-span-2">
                          <h3 className="text-sm font-bold text-text-sub-light dark:text-text-sub-dark uppercase tracking-wider mb-3">Billing Summary</h3>
                          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-text-sub-light dark:text-text-sub-dark">Room Charges ({booking.nights} nights × ₹{booking.pricePerNight.toLocaleString()})</span>
                              <span className="font-semibold">₹{booking.totalPrice.toLocaleString()}</span>
                            </div>
                            {booking.gstApplicable && (
                              <div className="flex justify-between text-sm">
                                <span className="text-text-sub-light dark:text-text-sub-dark">GST (included)</span>
                                <span className="font-semibold text-emerald-600 dark:text-emerald-400">Applicable</span>
                              </div>
                            )}
                            <div className="flex justify-between text-sm pt-2 border-t border-slate-200 dark:border-slate-700">
                              <span className="font-bold text-text-main-light dark:text-text-main-dark">Total Amount Due</span>
                              <span className="font-extrabold text-primary text-lg">₹{booking.totalPrice.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between py-4 border-t border-slate-200 dark:border-slate-700">
              <Link
                href={`/hotel-finance/bookings/${bookingId}/attach`}
                className="flex items-center gap-2 px-5 py-2.5 border border-slate-300 dark:border-slate-600 rounded-xl text-text-main-light dark:text-text-main-dark hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                Back to Attach
              </Link>
              <button
                onClick={handleSend}
                disabled={!recipientEmail || isSending || attachmentCount === 0}
                className="flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-blue-700 text-white rounded-xl font-semibold transition-all duration-200 shadow-sm hover:shadow-lg hover:shadow-primary/25 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none"
              >
                {isSending ? (
                  <>
                    <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
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
      </main>
    </div>
  )
}
