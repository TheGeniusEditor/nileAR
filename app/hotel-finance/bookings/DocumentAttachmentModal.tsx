"use client"

import { useState, useRef } from 'react'

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

export default function DocumentAttachmentModal({ 
  booking,
  gstApplicable,
  onClose 
}: { 
  booking: Booking
  gstApplicable: boolean
  onClose: (documents?: AttachedDocuments) => void 
}) {
  const [attachedDocuments, setAttachedDocuments] = useState<AttachedDocuments>({})
  const ledgerStatementRef = useRef<HTMLInputElement>(null)
  const arCoveringLetterRef = useRef<HTMLInputElement>(null)
  const eInvoiceRef = useRef<HTMLInputElement>(null)
  const pmsInvoiceRef = useRef<HTMLInputElement>(null)
  const posSupportingRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (type: keyof AttachedDocuments, file: File | null) => {
    if (file) {
      setAttachedDocuments(prev => ({ ...prev, [type]: file }))
    }
  }

  const handleAttach = (type: keyof AttachedDocuments, ref: React.RefObject<HTMLInputElement>) => {
    ref.current?.click()
  }

  const handleConfirm = () => {
    if (Object.keys(attachedDocuments).length === 0) {
      alert('Please attach at least one document')
      return
    }
    onClose(attachedDocuments)
  }

  const documentTypes = [
    {
      key: 'ledgerStatement' as keyof AttachedDocuments,
      label: 'Ledger Statement',
      ref: ledgerStatementRef,
      icon: 'account_balance',
      required: true
    },
    {
      key: 'arCoveringLetter' as keyof AttachedDocuments,
      label: 'AR Covering Letter',
      ref: arCoveringLetterRef,
      icon: 'description',
      required: true
    },
    {
      key: 'eInvoice' as keyof AttachedDocuments,
      label: 'E-Invoice',
      ref: eInvoiceRef,
      icon: 'receipt',
      required: false,
      visible: gstApplicable
    },
    {
      key: 'pmsInvoice' as keyof AttachedDocuments,
      label: 'PMS Invoice',
      ref: pmsInvoiceRef,
      icon: 'receipt_long',
      required: true
    },
    {
      key: 'posSupporting' as keyof AttachedDocuments,
      label: 'POS Supporting',
      ref: posSupportingRef,
      icon: 'article',
      required: true
    }
  ]

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-2xl max-w-lg w-full border border-slate-100 dark:border-slate-800">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-text-main-light dark:text-text-main-dark">
              Attach Documents
            </h2>
            <p className="text-sm text-text-sub-light dark:text-text-sub-dark mt-1">
              Booking #{booking.bookingNumber} - {booking.corporationName}
            </p>
            {gstApplicable && (
              <p className="text-xs text-green-600 dark:text-green-400 font-medium mt-1">
                ✓ GST Applicable - E-Invoice will be available
              </p>
            )}
            {!gstApplicable && (
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                GST Not Applicable - E-Invoice option hidden
              </p>
            )}
          </div>
          <button
            onClick={() => onClose()}
            className="text-text-sub-light dark:text-text-sub-dark hover:text-text-main-light dark:hover:text-text-main-dark"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          <div className="space-y-4">
            {documentTypes.map(({ key, label, ref, icon, visible = true }) => (
              visible && (
                <div key={key} className="relative">
                  <input
                    ref={ref}
                    type="file"
                    onChange={(e) => handleFileSelect(key, e.target.files?.[0] || null)}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                  />
                  <button
                    onClick={() => handleAttach(key, ref)}
                    className="w-full p-4 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg hover:border-primary dark:hover:border-primary hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors flex items-center gap-3"
                  >
                    <span className="material-symbols-outlined text-primary">{icon}</span>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-text-main-light dark:text-text-main-dark">
                        {label}
                      </p>
                      {attachedDocuments[key] && (
                        <p className="text-xs text-success font-medium mt-1">
                          ✓ {attachedDocuments[key]?.name}
                        </p>
                      )}
                    </div>
                    {!attachedDocuments[key] && (
                      <span className="material-symbols-outlined text-slate-400 ml-auto">
                        upload_file
                      </span>
                    )}
                    {attachedDocuments[key] && (
                      <span className="material-symbols-outlined text-success ml-auto">
                        check_circle
                      </span>
                    )}
                  </button>
                </div>
              )
            ))}
          </div>

          {Object.keys(attachedDocuments).length > 0 && (
            <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-sm font-semibold text-green-700 dark:text-green-400">
                ✓ {Object.keys(attachedDocuments).length} document(s) attached
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 flex gap-3 justify-end">
          <button
            onClick={() => onClose()}
            className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-text-main-light dark:text-text-main-dark hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-primary hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={Object.keys(attachedDocuments).length === 0}
          >
            Confirm & Continue
          </button>
        </div>
      </div>
    </div>
  )
}
