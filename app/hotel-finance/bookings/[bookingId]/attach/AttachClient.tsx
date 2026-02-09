"use client"

import Header from '@/app/components/Header'
import Sidebar from '@/app/components/Sidebar'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useRef, useCallback, useEffect } from 'react'
import { getBookingById, saveAttachments, loadAttachments, type Booking, type AttachedDocumentsMeta, type AttachmentMeta } from '../../data'

interface DocType {
  key: keyof AttachedDocumentsMeta
  label: string
  icon: string
  description: string
  color: string
  bgColor: string
  borderColor: string
  required: boolean
  visible: boolean
}

export default function AttachClient({ bookingId }: { bookingId: string }) {
  const router = useRouter()
  const booking = getBookingById(bookingId)
  const [attachments, setAttachments] = useState<AttachedDocumentsMeta>({})
  const [dragOver, setDragOver] = useState<string | null>(null)
  const [recentlyAttached, setRecentlyAttached] = useState<string | null>(null)
  const fileRefs = {
    ledgerStatement: useRef<HTMLInputElement>(null),
    arCoveringLetter: useRef<HTMLInputElement>(null),
    eInvoice: useRef<HTMLInputElement>(null),
    pmsInvoice: useRef<HTMLInputElement>(null),
    posSupporting: useRef<HTMLInputElement>(null),
  }

  // Load previously saved attachments
  useEffect(() => {
    const saved = loadAttachments(bookingId)
    if (saved) setAttachments(saved)
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
              <p className="text-text-sub-light dark:text-text-sub-dark mt-2">The booking you're looking for doesn't exist.</p>
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

  const documentTypes: DocType[] = [
    {
      key: 'ledgerStatement',
      label: 'Ledger Statement',
      icon: 'account_balance',
      description: 'Upload the ledger statement for this booking',
      color: 'text-violet-600 dark:text-violet-400',
      bgColor: 'bg-violet-50 dark:bg-violet-900/20',
      borderColor: 'border-violet-200 dark:border-violet-800',
      required: true,
      visible: true,
    },
    {
      key: 'arCoveringLetter',
      label: 'AR Covering Letter',
      icon: 'description',
      description: 'Accounts receivable covering letter',
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
      required: true,
      visible: true,
    },
    {
      key: 'eInvoice',
      label: 'E-Invoice',
      icon: 'receipt',
      description: 'GST E-Invoice document',
      color: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
      borderColor: 'border-emerald-200 dark:border-emerald-800',
      required: false,
      visible: booking.gstApplicable,
    },
    {
      key: 'pmsInvoice',
      label: 'PMS Invoice',
      icon: 'receipt_long',
      description: 'Property Management System invoice',
      color: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-50 dark:bg-amber-900/20',
      borderColor: 'border-amber-200 dark:border-amber-800',
      required: true,
      visible: true,
    },
    {
      key: 'posSupporting',
      label: 'POS Supporting',
      icon: 'article',
      description: 'Point of Sale supporting document',
      color: 'text-rose-600 dark:text-rose-400',
      bgColor: 'bg-rose-50 dark:bg-rose-900/20',
      borderColor: 'border-rose-200 dark:border-rose-800',
      required: true,
      visible: true,
    },
  ]

  const visibleDocs = documentTypes.filter(d => d.visible)
  const attachedCount = Object.keys(attachments).length
  const totalVisible = visibleDocs.length
  const progress = totalVisible > 0 ? (attachedCount / totalVisible) * 100 : 0

  const handleFileSelect = (key: keyof AttachedDocumentsMeta, file: File | null) => {
    if (!file) return
    const meta: AttachmentMeta = { name: file.name, size: file.size, type: file.type }
    const updated = { ...attachments, [key]: meta }
    setAttachments(updated)
    saveAttachments(bookingId, updated)
    setRecentlyAttached(key)
    setTimeout(() => setRecentlyAttached(null), 1500)
  }

  const handleRemove = (key: keyof AttachedDocumentsMeta) => {
    const updated = { ...attachments }
    delete updated[key]
    setAttachments(updated)
    saveAttachments(bookingId, updated)
  }

  const handleDrop = useCallback((key: keyof AttachedDocumentsMeta, e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(null)
    const file = e.dataTransfer.files?.[0]
    if (file) handleFileSelect(key, file)
  }, [attachments, bookingId])

  const handleDragOver = (key: string, e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(key)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const handleContinueToSend = () => {
    if (attachedCount === 0) {
      alert('Please attach at least one document before continuing.')
      return
    }
    router.push(`/hotel-finance/bookings/${bookingId}/send`)
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
              <span className="text-text-main-light dark:text-text-main-dark font-medium">{booking.bookingNumber}</span>
              <span className="text-slate-300 dark:text-slate-600">/</span>
              <span className="text-primary font-semibold">Attach Documents</span>
            </div>

            {/* Booking Info Card */}
            <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 rounded-2xl p-6 text-white shadow-lg shadow-blue-500/20">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4"></div>
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-2.5 py-1 bg-white/20 rounded-lg text-xs font-bold uppercase tracking-wider">
                        {booking.bookingNumber}
                      </span>
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${
                        booking.status === 'checked-in' ? 'bg-emerald-400/20 text-emerald-200' :
                        booking.status === 'checked-out' ? 'bg-slate-400/20 text-slate-200' :
                        booking.status === 'confirmed' ? 'bg-sky-400/20 text-sky-200' :
                        'bg-amber-400/20 text-amber-200'
                      }`}>
                        {booking.status.replace('-', ' ')}
                      </span>
                      {booking.gstApplicable && (
                        <span className="px-2.5 py-1 bg-emerald-400/20 text-emerald-200 rounded-lg text-xs font-bold">GST</span>
                      )}
                    </div>
                    <h1 className="text-2xl font-bold">{booking.corporationName}</h1>
                    <p className="text-blue-100 mt-1">Guest: {booking.customerName} • {booking.roomType}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-blue-200 text-sm">Total Amount</p>
                    <p className="text-3xl font-extrabold">₹{booking.totalPrice.toLocaleString()}</p>
                    <p className="text-blue-200 text-sm mt-1">
                      {new Date(booking.checkInDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })} — {new Date(booking.checkOutDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Section */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">task_alt</span>
                  <span className="font-semibold text-text-main-light dark:text-text-main-dark">
                    Attachment Progress
                  </span>
                </div>
                <span className="text-sm font-bold text-primary">
                  {attachedCount} / {totalVisible} documents
                </span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out bg-gradient-to-r from-blue-500 to-indigo-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              {attachedCount === totalVisible && totalVisible > 0 && (
                <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium mt-2 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  All documents attached — ready to send!
                </p>
              )}
            </div>

            {/* Document Upload Grid */}
            <div>
              <h2 className="text-lg font-bold text-text-main-light dark:text-text-main-dark mb-4">Select & Upload Documents</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {visibleDocs.map((doc) => {
                  const isAttached = !!attachments[doc.key]
                  const isDragging = dragOver === doc.key
                  const justAttached = recentlyAttached === doc.key

                  return (
                    <div key={doc.key} className="relative">
                      <input
                        ref={fileRefs[doc.key]}
                        type="file"
                        onChange={(e) => handleFileSelect(doc.key, e.target.files?.[0] || null)}
                        className="hidden"
                        accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                      />
                      <div
                        onDrop={(e) => handleDrop(doc.key, e)}
                        onDragOver={(e) => handleDragOver(doc.key, e)}
                        onDragLeave={() => setDragOver(null)}
                        onClick={() => !isAttached && fileRefs[doc.key].current?.click()}
                        className={`
                          relative overflow-hidden rounded-xl border-2 transition-all duration-300 cursor-pointer
                          ${isAttached
                            ? `border-emerald-300 dark:border-emerald-700 bg-emerald-50/50 dark:bg-emerald-900/10`
                            : isDragging
                              ? `border-primary bg-blue-50 dark:bg-blue-900/20 scale-[1.02] shadow-lg shadow-blue-500/10`
                              : `border-dashed border-slate-300 dark:border-slate-600 hover:border-primary dark:hover:border-primary hover:shadow-md bg-surface-light dark:bg-surface-dark`
                          }
                          ${justAttached ? 'ring-2 ring-emerald-400 ring-offset-2 dark:ring-offset-slate-900' : ''}
                        `}
                      >
                        <div className="p-5">
                          <div className="flex items-start gap-4">
                            {/* Icon */}
                            <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${doc.bgColor} flex items-center justify-center transition-transform duration-300 ${isDragging ? 'scale-110' : ''}`}>
                              <span className={`material-symbols-outlined text-[24px] ${doc.color}`}>
                                {isAttached ? 'check_circle' : doc.icon}
                              </span>
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-text-main-light dark:text-text-main-dark">
                                  {doc.label}
                                </h3>
                                {doc.required && !isAttached && (
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-1.5 py-0.5 rounded">
                                    Required
                                  </span>
                                )}
                              </div>

                              {!isAttached ? (
                                <div className="mt-2">
                                  <p className="text-sm text-text-sub-light dark:text-text-sub-dark">{doc.description}</p>
                                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">cloud_upload</span>
                                    Click to browse or drag & drop
                                  </p>
                                </div>
                              ) : (
                                <div className="mt-2">
                                  <div className="flex items-center gap-2 bg-white dark:bg-slate-800 rounded-lg px-3 py-2 border border-emerald-200 dark:border-emerald-800">
                                    <span className="material-symbols-outlined text-emerald-500 text-[18px]">insert_drive_file</span>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-medium text-text-main-light dark:text-text-main-dark truncate">
                                        {attachments[doc.key]?.name}
                                      </p>
                                      <p className="text-xs text-text-sub-light dark:text-text-sub-dark">
                                        {formatFileSize(attachments[doc.key]?.size || 0)}
                                      </p>
                                    </div>
                                    <button
                                      onClick={(e) => { e.stopPropagation(); handleRemove(doc.key) }}
                                      className="flex-shrink-0 p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors group"
                                      title="Remove file"
                                    >
                                      <span className="material-symbols-outlined text-[18px] text-slate-400 group-hover:text-red-500">close</span>
                                    </button>
                                  </div>
                                  <button
                                    onClick={(e) => { e.stopPropagation(); fileRefs[doc.key].current?.click() }}
                                    className="text-xs text-primary font-medium mt-2 hover:underline flex items-center gap-1"
                                  >
                                    <span className="material-symbols-outlined text-[14px]">swap_horiz</span>
                                    Replace file
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Accepted formats info */}
            <div className="flex items-center gap-2 text-xs text-text-sub-light dark:text-text-sub-dark bg-slate-50 dark:bg-slate-800/50 rounded-lg px-4 py-3">
              <span className="material-symbols-outlined text-[16px]">info</span>
              Accepted formats: PDF, DOC, DOCX, XLS, XLSX, JPG, JPEG, PNG
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between py-4 border-t border-slate-200 dark:border-slate-700">
              <Link
                href="/hotel-finance/bookings"
                className="flex items-center gap-2 px-5 py-2.5 border border-slate-300 dark:border-slate-600 rounded-xl text-text-main-light dark:text-text-main-dark hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                Back to Bookings
              </Link>
              <button
                onClick={handleContinueToSend}
                disabled={attachedCount === 0}
                className="flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-blue-700 text-white rounded-xl font-semibold transition-all duration-200 shadow-sm hover:shadow-lg hover:shadow-primary/25 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none"
              >
                <span>Continue to Send</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}
