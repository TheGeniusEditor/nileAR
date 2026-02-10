"use client"

import Header from '@/app/components/Header'
import Sidebar from '@/app/components/Sidebar'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useRef, useCallback, useEffect } from 'react'
import { getBookingById, saveAttachments, loadAttachments, saveSkippedAttachments, loadSkippedAttachments, type AttachedDocumentsMeta, type AttachmentMeta, type SkippedDocumentsMeta } from '../../data'

interface BillType {
  key: keyof AttachedDocumentsMeta
  label: string
  icon: string
  description: string
  color: string
  bgColor: string
}

const serviceBillTypes: BillType[] = [
  {
    key: 'roomCharges',
    label: 'Room Charges',
    icon: 'hotel',
    description: 'Room tariff & accommodation bill',
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
  },
  {
    key: 'foodBeverage',
    label: 'Food & Restaurant',
    icon: 'restaurant',
    description: 'Restaurant & dining bills',
    color: 'text-orange-600 dark:text-orange-400',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
  },
  {
    key: 'barLounge',
    label: 'Bar & Lounge',
    icon: 'local_bar',
    description: 'Bar, lounge & beverage service bills',
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
  },
  {
    key: 'roomService',
    label: 'Room Service',
    icon: 'room_service',
    description: 'In-room dining & service orders',
    color: 'text-teal-600 dark:text-teal-400',
    bgColor: 'bg-teal-50 dark:bg-teal-900/20',
  },
  {
    key: 'laundry',
    label: 'Laundry & Dry Cleaning',
    icon: 'local_laundry_service',
    description: 'Laundry, dry cleaning & pressing bills',
    color: 'text-cyan-600 dark:text-cyan-400',
    bgColor: 'bg-cyan-50 dark:bg-cyan-900/20',
  },
  {
    key: 'spaWellness',
    label: 'Spa & Wellness',
    icon: 'spa',
    description: 'Spa treatments, gym & wellness charges',
    color: 'text-pink-600 dark:text-pink-400',
    bgColor: 'bg-pink-50 dark:bg-pink-900/20',
  },
  {
    key: 'minibar',
    label: 'Minibar',
    icon: 'kitchen',
    description: 'In-room minibar consumption',
    color: 'text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-50 dark:bg-amber-900/20',
  },
  {
    key: 'conferenceHall',
    label: 'Conference & Banquet',
    icon: 'groups',
    description: 'Meeting rooms, conference & banquet hall',
    color: 'text-indigo-600 dark:text-indigo-400',
    bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
  },
  {
    key: 'parking',
    label: 'Parking & Valet',
    icon: 'local_parking',
    description: 'Parking, valet & transportation charges',
    color: 'text-slate-600 dark:text-slate-400',
    bgColor: 'bg-slate-100 dark:bg-slate-800/50',
  },
  {
    key: 'miscellaneous',
    label: 'Miscellaneous',
    icon: 'more_horiz',
    description: 'Any other service bills or charges',
    color: 'text-rose-600 dark:text-rose-400',
    bgColor: 'bg-rose-50 dark:bg-rose-900/20',
  },
]

export default function AttachClient({ bookingId }: { bookingId: string }) {
  const router = useRouter()
  const booking = getBookingById(bookingId)
  const [attachments, setAttachments] = useState<AttachedDocumentsMeta>({})
  const [skipped, setSkipped] = useState<SkippedDocumentsMeta>({})
  const [dragOver, setDragOver] = useState<string | null>(null)
  const [recentlyAttached, setRecentlyAttached] = useState<string | null>(null)

  const fileRefs = {
    roomCharges: useRef<HTMLInputElement>(null),
    foodBeverage: useRef<HTMLInputElement>(null),
    barLounge: useRef<HTMLInputElement>(null),
    roomService: useRef<HTMLInputElement>(null),
    laundry: useRef<HTMLInputElement>(null),
    spaWellness: useRef<HTMLInputElement>(null),
    minibar: useRef<HTMLInputElement>(null),
    conferenceHall: useRef<HTMLInputElement>(null),
    parking: useRef<HTMLInputElement>(null),
    miscellaneous: useRef<HTMLInputElement>(null),
  } as Record<string, React.RefObject<HTMLInputElement>>

  useEffect(() => {
    const saved = loadAttachments(bookingId)
    if (saved) setAttachments(saved)
    const savedSkipped = loadSkippedAttachments(bookingId)
    if (savedSkipped) setSkipped(savedSkipped)
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
              <p className="text-text-sub-light dark:text-text-sub-dark mt-2">The booking you&apos;re looking for doesn&apos;t exist.</p>
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

  const attachedCount = Object.keys(attachments).length
  const skippedCount = Object.keys(skipped).filter(k => skipped[k as keyof SkippedDocumentsMeta]).length
  const completedCount = attachedCount + skippedCount
  const totalBills = serviceBillTypes.length
  const progress = totalBills > 0 ? (completedCount / totalBills) * 100 : 0

  const handleFileSelect = (key: keyof AttachedDocumentsMeta, file: File | null) => {
    if (!file) return
    const meta: AttachmentMeta = { name: file.name, size: file.size, type: file.type }
    const updated = { ...attachments, [key]: meta }
    setAttachments(updated)
    saveAttachments(bookingId, updated)
    if (skipped[key as keyof SkippedDocumentsMeta]) {
      const updatedSkipped = { ...skipped }
      delete updatedSkipped[key as keyof SkippedDocumentsMeta]
      setSkipped(updatedSkipped)
      saveSkippedAttachments(bookingId, updatedSkipped)
    }
    setRecentlyAttached(key)
    setTimeout(() => setRecentlyAttached(null), 1500)
  }

  const handleRemove = (key: keyof AttachedDocumentsMeta) => {
    const updated = { ...attachments }
    delete updated[key]
    setAttachments(updated)
    saveAttachments(bookingId, updated)
  }

  const handleSkip = (key: keyof SkippedDocumentsMeta) => {
    const updatedSkipped = { ...skipped, [key]: true }
    setSkipped(updatedSkipped)
    saveSkippedAttachments(bookingId, updatedSkipped)
  }

  const handleUnskip = (key: keyof SkippedDocumentsMeta) => {
    const updatedSkipped = { ...skipped }
    delete updatedSkipped[key]
    setSkipped(updatedSkipped)
    saveSkippedAttachments(bookingId, updatedSkipped)
  }

  const handleDrop = useCallback((key: keyof AttachedDocumentsMeta, e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(null)
    const file = e.dataTransfer.files?.[0]
    if (file) handleFileSelect(key, file)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attachments, bookingId, skipped])

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
      alert('Please attach at least one service bill before continuing.')
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
              <span className="text-primary font-semibold">Attach Service Bills</span>
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
                    </div>
                    <h1 className="text-2xl font-bold">{booking.corporationName}</h1>
                    <p className="text-blue-100 mt-1">Guest: {booking.customerName} &bull; {booking.roomType}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-blue-200 text-sm">Total Amount</p>
                    <p className="text-3xl font-extrabold">&#8377;{booking.totalPrice.toLocaleString()}</p>
                    <p className="text-blue-200 text-sm mt-1">
                      {new Date(booking.checkInDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })} &mdash; {new Date(booking.checkOutDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Section */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">receipt_long</span>
                  <span className="font-semibold text-text-main-light dark:text-text-main-dark">
                    Service Bills
                  </span>
                </div>
                <span className="text-sm font-bold text-primary">
                  {attachedCount} attached{skippedCount > 0 ? ` · ${skippedCount} skipped` : ''} / {totalBills} categories
                </span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out bg-gradient-to-r from-blue-500 to-indigo-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              {attachedCount > 0 && attachedCount + skippedCount >= totalBills && (
                <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium mt-2 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  All categories addressed — ready to proceed!
                </p>
              )}
            </div>

            {/* Service Bills Upload Grid */}
            <div>
              <h2 className="text-lg font-bold text-text-main-light dark:text-text-main-dark mb-1">Attach Service Bills</h2>
              <p className="text-sm text-text-sub-light dark:text-text-sub-dark mb-4">Upload individual bills for each service the guest used during their stay. Skip any that don&apos;t apply.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {serviceBillTypes.map((bill) => {
                  const isAttached = !!attachments[bill.key]
                  const isSkipped = !!skipped[bill.key as keyof SkippedDocumentsMeta] && !isAttached
                  const isDragging = dragOver === bill.key
                  const justAttached = recentlyAttached === bill.key

                  return (
                    <div key={bill.key} className="relative">
                      <input
                        ref={fileRefs[bill.key]}
                        type="file"
                        onChange={(e) => handleFileSelect(bill.key, e.target.files?.[0] || null)}
                        className="hidden"
                        accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                      />
                      <div
                        onDrop={(e) => handleDrop(bill.key, e)}
                        onDragOver={(e) => handleDragOver(bill.key, e)}
                        onDragLeave={() => setDragOver(null)}
                        onClick={() => !isAttached && !isSkipped && fileRefs[bill.key]?.current?.click()}
                        className={`
                          relative overflow-hidden rounded-xl border-2 transition-all duration-300
                          ${isAttached
                            ? 'border-emerald-300 dark:border-emerald-700 bg-emerald-50/50 dark:bg-emerald-900/10'
                            : isSkipped
                              ? 'border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 opacity-60'
                              : isDragging
                                ? 'border-primary bg-blue-50 dark:bg-blue-900/20 scale-[1.02] shadow-lg shadow-blue-500/10'
                                : 'border-dashed border-slate-300 dark:border-slate-600 hover:border-primary dark:hover:border-primary hover:shadow-md bg-surface-light dark:bg-surface-dark'
                          }
                          ${!isSkipped ? 'cursor-pointer' : ''}
                          ${justAttached ? 'ring-2 ring-emerald-400 ring-offset-2 dark:ring-offset-slate-900' : ''}
                        `}
                      >
                        <div className="p-4">
                          <div className="flex items-start gap-3">
                            <div className={`flex-shrink-0 w-11 h-11 rounded-xl ${isSkipped ? 'bg-slate-100 dark:bg-slate-800' : isAttached ? 'bg-emerald-50 dark:bg-emerald-900/20' : bill.bgColor} flex items-center justify-center transition-transform duration-300 ${isDragging ? 'scale-110' : ''}`}>
                              <span className={`material-symbols-outlined text-[22px] ${isSkipped ? 'text-slate-400 dark:text-slate-500' : isAttached ? 'text-emerald-600 dark:text-emerald-400' : bill.color}`}>
                                {isAttached ? 'check_circle' : isSkipped ? 'block' : bill.icon}
                              </span>
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <h3 className={`font-semibold text-sm ${isSkipped ? 'text-text-sub-light dark:text-text-sub-dark line-through' : 'text-text-main-light dark:text-text-main-dark'}`}>
                                  {bill.label}
                                </h3>
                                {isSkipped && (
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                                    N/A
                                  </span>
                                )}
                              </div>

                              {isSkipped ? (
                                <div className="mt-1.5 flex items-center gap-3">
                                  <button
                                    onClick={(e) => { e.stopPropagation(); handleUnskip(bill.key as keyof SkippedDocumentsMeta) }}
                                    className="text-xs text-primary font-medium hover:underline flex items-center gap-1"
                                  >
                                    <span className="material-symbols-outlined text-[14px]">undo</span>
                                    Undo
                                  </button>
                                  <button
                                    onClick={(e) => { e.stopPropagation(); fileRefs[bill.key]?.current?.click() }}
                                    className="text-xs text-emerald-600 dark:text-emerald-400 font-medium hover:underline flex items-center gap-1"
                                  >
                                    <span className="material-symbols-outlined text-[14px]">upload_file</span>
                                    Attach
                                  </button>
                                </div>
                              ) : !isAttached ? (
                                <div className="mt-1.5">
                                  <p className="text-xs text-text-sub-light dark:text-text-sub-dark">{bill.description}</p>
                                  <div className="flex items-center justify-between mt-2">
                                    <p className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center gap-1">
                                      <span className="material-symbols-outlined text-[13px]">cloud_upload</span>
                                      Click or drag &amp; drop
                                    </p>
                                    <button
                                      onClick={(e) => { e.stopPropagation(); handleSkip(bill.key as keyof SkippedDocumentsMeta) }}
                                      className="text-xs font-semibold flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-300 dark:border-slate-600 text-text-sub-light dark:text-text-sub-dark hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                    >
                                      <span className="material-symbols-outlined text-[14px]">block</span>
                                      N/A
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div className="mt-1.5">
                                  <div className="flex items-center gap-2 bg-white dark:bg-slate-800 rounded-lg px-2.5 py-1.5 border border-emerald-200 dark:border-emerald-800">
                                    <span className="material-symbols-outlined text-emerald-500 text-[16px]">insert_drive_file</span>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-xs font-medium text-text-main-light dark:text-text-main-dark truncate">
                                        {attachments[bill.key]?.name}
                                      </p>
                                      <p className="text-[11px] text-text-sub-light dark:text-text-sub-dark">
                                        {formatFileSize(attachments[bill.key]?.size || 0)}
                                      </p>
                                    </div>
                                    <button
                                      onClick={(e) => { e.stopPropagation(); handleRemove(bill.key) }}
                                      className="flex-shrink-0 p-0.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors group"
                                      title="Remove"
                                    >
                                      <span className="material-symbols-outlined text-[16px] text-slate-400 group-hover:text-red-500">close</span>
                                    </button>
                                  </div>
                                  <button
                                    onClick={(e) => { e.stopPropagation(); fileRefs[bill.key]?.current?.click() }}
                                    className="text-[11px] text-primary font-medium mt-1.5 hover:underline flex items-center gap-1"
                                  >
                                    <span className="material-symbols-outlined text-[13px]">swap_horiz</span>
                                    Replace
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
