"use client"

import Link from 'next/link'
import { useParams } from 'next/navigation'
import Header from '@/app/components/Header'
import Sidebar from '@/app/components/Sidebar'
import { useState } from 'react'

interface Guest {
  id: string
  name: string
  room: string
  checkOut: string
  expenses: { [key: string]: number }
  verified: boolean
}

interface Document {
  id: string
  name: string
  type: 'image' | 'pdf'
  url: string
}

interface LineItem {
  id: string
  description: string
  category: string
  date: string
  amount: number
}

export default function InvoiceDetailClient() {
  const params = useParams()
  const invoiceId = params.invoiceId as string

  const [expandedGuest, setExpandedGuest] = useState<string>('1')
  const [verifyExpenses, setVerifyExpenses] = useState(false)
  const [comment, setComment] = useState('')

  // Sample data for invoice details
  const lineItems: LineItem[] = [
    {
      id: '1',
      description: 'Standard King Room (3 Nights)',
      category: 'Room',
      date: 'Oct 21-24',
      amount: 850.00
    },
    {
      id: '2',
      description: 'In-Room Dining (Dinner)',
      category: 'F&B',
      date: 'Oct 21',
      amount: 65.50
    },
    {
      id: '3',
      description: 'Lobby Bar',
      category: 'F&B',
      date: 'Oct 22',
      amount: 42.00
    },
    {
      id: '4',
      description: 'Laundry Service (Express)',
      category: 'Laundry',
      date: 'Oct 23',
      amount: 125.00
    },
    {
      id: '5',
      description: 'Standard King Room (1 Night - Extension)',
      category: 'Room',
      date: 'Oct 24',
      amount: 280.00
    }
  ]

  const guests: Guest[] = [
    {
      id: '0',
      name: 'Jim Halpert',
      room: '402',
      checkOut: 'Oct 23',
      expenses: { Room: 425.00, 'F&B': 107.50 },
      verified: true
    },
    {
      id: '1',
      name: 'Michael Scott',
      room: '505',
      checkOut: 'Oct 24',
      expenses: { Room: 705.00, 'F&B': 107.50, Laundry: 125.00 },
      verified: false
    }
  ]

  const documents: Document[] = [
    {
      id: '1',
      name: 'dinner_receipt_1021.pdf',
      type: 'image',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYhLaWzTlxJAIRIuScXS7L651jFUeb2YwQ7C6jS3InS265MKeqabHK618yY3o9DFLIQDOZm1Lp5HMbH-zZ9UFvFuoKsN_U5MYasjIPr1kM5cBbs1WK6G_fV6Ce5Om7K3IktfIPlWFs1xG0UkqCSA9kGpKjMmCUnNUp9A5Hb7FmbzpdLlLfWeApR6demMoNFxEr3BO4xESCI4vZS1KJRnrfqB_7pPCL-YHUqIXw2USutFLBEm5c81M-tRlX9Zgc7FTvRA8gOoYr3m8'
    },
    {
      id: '2',
      name: 'laundry_bill.pdf',
      type: 'pdf',
      url: ''
    }
  ]

  const subtotal = lineItems.reduce((sum, item) => sum + item.amount, 0)
  const taxes = 90.00
  const totalAmount = subtotal + taxes

  const verifiedCount = guests.filter(g => g.verified).length

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark">
      <Sidebar title="TravelCorp" logoIcon="apartment" />
      
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        <Header />
        
        <div className="flex-1 overflow-y-auto scroll-smooth">
          {/* Breadcrumbs & Header */}
          <div className="shrink-0 px-6 pt-6 pb-2 bg-white dark:bg-[#161f2c] border-b border-slate-200 dark:border-slate-800">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-wrap gap-2 mb-4 items-center">
                <Link className="text-primary hover:text-blue-700 text-sm font-medium leading-normal transition-colors" href="/corporate-portal/invoices">
                  Invoices
                </Link>
                <span className="text-slate-400 text-sm font-medium leading-normal material-symbols-outlined text-[16px]">
                  chevron_right
                </span>
                <span className="text-slate-900 dark:text-white text-sm font-medium leading-normal">#{invoiceId}</span>
              </div>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3">
                    <h1 className="text-2xl md:text-3xl font-black leading-tight tracking-tight text-slate-900 dark:text-white">
                      Invoice #{invoiceId}
                    </h1>
                    <span className="inline-flex items-center rounded-md bg-amber-50 dark:bg-amber-900/30 px-3 py-1 text-xs font-semibold text-amber-700 dark:text-amber-400 ring-1 ring-inset ring-amber-600/20">
                      Pending Verification
                    </span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-normal">
                    Hotel Grand Plaza • Issued Oct 24, 2023
                  </p>
                </div>
                <div className="flex gap-3">
                  <button className="flex items-center justify-center overflow-hidden rounded-lg h-10 px-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm font-bold shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                    Dispute
                  </button>
                  <Link
                    href={`/corporate-portal/invoices/${invoiceId}/checkout`}
                    className="flex items-center justify-center overflow-hidden rounded-lg h-10 px-6 bg-primary hover:bg-blue-700 text-white text-sm font-bold shadow-sm transition-colors gap-2"
                  >
                    <span className="material-symbols-outlined text-[20px]">check</span>
                    Approve &amp; Pay
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Split View Container */}
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden p-6 gap-6 max-w-7xl mx-auto w-full">
            {/* LEFT PANE: Invoice Breakdown */}
            <div className="flex-1 lg:flex-[1.2] bg-white dark:bg-[#161f2c] dark:border dark:border-slate-800 rounded-xl shadow-sm flex flex-col overflow-hidden h-full">
              <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-slate-400">receipt_long</span>
                  Invoice Details
                </h3>
                <div className="text-right">
                  <p className="text-xs text-slate-500 uppercase font-semibold">Total Amount</p>
                  <p className="text-xl font-black text-slate-900 dark:text-white">${totalAmount.toFixed(2)}</p>
                </div>
              </div>
              <div className="overflow-y-auto flex-1 p-0">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50 dark:bg-slate-800/50 sticky top-0 z-10">
                    <tr>
                      <th className="py-3 px-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Description</th>
                      <th className="py-3 px-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                      <th className="py-3 px-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                      <th className="py-3 px-5 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm text-slate-700 dark:text-slate-300">
                    {lineItems.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="py-4 px-5 font-medium">{item.description}</td>
                        <td className="py-4 px-5">
                          <span className="inline-flex items-center rounded-md bg-blue-50 dark:bg-blue-900/30 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-400">
                            {item.category}
                          </span>
                        </td>
                        <td className="py-4 px-5">{item.date}</td>
                        <td className="py-4 px-5 text-right">${item.amount.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
                  <div className="flex justify-end gap-12 mb-2">
                    <span className="text-sm text-slate-500">Subtotal</span>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-end gap-12 mb-2">
                    <span className="text-sm text-slate-500">Taxes (City &amp; State)</span>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">${taxes.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-end gap-12 pt-3 border-t border-slate-200 dark:border-slate-700 mt-2">
                    <span className="text-base font-bold text-slate-900 dark:text-white">Grand Total</span>
                    <span className="text-base font-bold text-primary">${totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT PANE: Verification */}
            <div className="flex-1 bg-white dark:bg-[#161f2c] dark:border dark:border-slate-800 rounded-xl shadow-sm flex flex-col overflow-hidden h-full">
              <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-slate-400">verified_user</span>
                  Guest Stay Verification
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-slate-500">
                    {verifiedCount} of {guests.length} Verified
                  </span>
                  <div className="w-16 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 transition-all"
                      style={{ width: `${(verifiedCount / guests.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="overflow-y-auto flex-1 bg-slate-50/50 dark:bg-[#161f2c]">
                {guests.map((guest, index) => (
                  <div key={guest.id} className="border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-[#161f2c]">
                    <div
                      className={`p-4 flex items-center justify-between cursor-pointer transition-colors ${
                        expandedGuest === guest.id
                          ? 'bg-primary/5 dark:bg-primary/10 border-l-4 border-primary'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                      }`}
                      onClick={() => setExpandedGuest(expandedGuest === guest.id ? '' : guest.id)}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`size-10 rounded-full flex items-center justify-center font-bold text-sm ${
                            guest.verified
                              ? 'bg-green-100 text-green-600'
                              : 'bg-primary/10 text-primary'
                          }`}
                        >
                          {guest.verified ? (
                            <span className="material-symbols-outlined text-[20px]">check</span>
                          ) : (
                            guest.name.split(' ').map(n => n[0]).join('')
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white text-sm">{guest.name}</p>
                          <p className="text-xs text-slate-500">
                            Room {guest.room} • Checked out {guest.checkOut}
                          </p>
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-slate-400">
                        {expandedGuest === guest.id ? 'expand_less' : 'expand_more'}
                      </span>
                    </div>

                    {/* Detailed View for Expanded Guest */}
                    {expandedGuest === guest.id && (
                      <div className="p-5 bg-white dark:bg-[#161f2c] border-t border-slate-100 dark:border-slate-800">
                        <div className="mb-5">
                          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Associated Expenses</p>
                          <div className="flex flex-wrap gap-2">
                            {Object.entries(guest.expenses).map(([category, amount]) => (
                              <span
                                key={category}
                                className="inline-flex items-center rounded-md bg-slate-100 dark:bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-slate-300"
                              >
                                {category}: ${amount.toFixed(2)}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mb-6">
                          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Supporting Documents ({documents.length})</p>
                          <div className="grid grid-cols-2 gap-3">
                            {documents.map((doc) => (
                              <div
                                key={doc.id}
                                className="group relative aspect-[4/3] rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 cursor-pointer"
                              >
                                {doc.type === 'image' ? (
                                  <>
                                    <div
                                      className="absolute inset-0 bg-cover bg-center"
                                      style={{ backgroundImage: `url('${doc.url}')` }}
                                    ></div>
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                      <span className="material-symbols-outlined text-white text-3xl">visibility</span>
                                    </div>
                                  </>
                                ) : (
                                  <div className="absolute inset-0 bg-slate-100 dark:bg-slate-800 flex flex-col items-center justify-center text-slate-400">
                                    <span className="material-symbols-outlined text-4xl mb-1">picture_as_pdf</span>
                                    <p className="text-[10px]">{doc.name}</p>
                                  </div>
                                )}
                                <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-white">
                                  <p className="text-[10px] truncate">{doc.name}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                          <button className="mt-3 text-primary text-xs font-bold hover:underline flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">add_circle</span>
                            Upload Missing Receipt
                          </button>
                        </div>

                        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700">
                          <label className="flex items-start gap-3 cursor-pointer">
                            <div className="relative flex items-center">
                              <input
                                className="peer size-5 cursor-pointer appearance-none rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 checked:border-primary checked:bg-primary transition-all"
                                type="checkbox"
                                checked={verifyExpenses}
                                onChange={(e) => setVerifyExpenses(e.target.checked)}
                              />
                              <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                  <path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd"></path>
                                </svg>
                              </span>
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-bold text-slate-900 dark:text-white">Verify Expenses</p>
                              <p className="text-xs text-slate-500 mt-0.5">
                                I confirm the uploaded documents match the invoice line items.
                              </p>
                            </div>
                          </label>
                          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                            <label className="block text-xs font-medium text-slate-500 mb-1" htmlFor="comment">
                              Flag discrepancy or add note
                            </label>
                            <div className="relative">
                              <textarea
                                className="block w-full rounded-md border-0 py-1.5 text-slate-900 dark:text-white dark:bg-slate-800 shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-600 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 resize-none"
                                id="comment"
                                placeholder="Optional comment..."
                                rows={2}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                              ></textarea>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
