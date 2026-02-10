"use client"

import Header from '@/app/components/Header'
import Sidebar from '@/app/components/Sidebar'
import { useState } from 'react'
import Link from 'next/link'

interface ReconciliationItem {
  id: string
  type: 'invoice' | 'payment'
  date: string
  dueDate?: string
  description: string
  invoiceNumber?: string
  paymentReference?: string
  amount: number
  status: 'matched' | 'unmatched' | 'partial'
  matchedWith?: string
  daysOverdue?: number
  employee?: string
}

interface HotelData {
  id: string
  name: string
  location: string
  image: string
  contactPerson: string
  email: string
  phone: string
  creditPeriod: string
  paymentTerms: string
  status: 'active' | 'on-hold' | 'settled'
  totalStays: number
  activeStays: number
}

const hotelsData: Record<string, HotelData> = {
  'HTL-001': {
    id: 'HTL-001', name: 'Grand Hyatt Seattle', location: 'Seattle, WA',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=300&fit=crop',
    contactPerson: 'Robert Anderson', email: 'finance@grandhyattseattle.com', phone: '+1 (206) 774-1234',
    creditPeriod: '30 Days', paymentTerms: 'Net 30', status: 'active', totalStays: 24, activeStays: 3
  },
  'HTL-002': {
    id: 'HTL-002', name: 'Marriott Marquis SF', location: 'San Francisco, CA',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=300&fit=crop',
    contactPerson: 'Lisa Chen', email: 'accounts@marriottsf.com', phone: '+1 (415) 896-5678',
    creditPeriod: '45 Days', paymentTerms: 'Net 45', status: 'active', totalStays: 18, activeStays: 2
  },
  'HTL-003': {
    id: 'HTL-003', name: 'W Hotel Austin', location: 'Austin, TX',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=300&fit=crop',
    contactPerson: 'James Morales', email: 'billing@waustin.com', phone: '+1 (512) 345-7890',
    creditPeriod: '15 Days', paymentTerms: 'Net 15', status: 'active', totalStays: 12, activeStays: 1
  },
  'HTL-004': {
    id: 'HTL-004', name: 'Hilton Garden Inn NYC', location: 'New York, NY',
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=300&fit=crop',
    contactPerson: 'Maria Gonzalez', email: 'finance@hiltonnyc.com', phone: '+1 (212) 555-0199',
    creditPeriod: '30 Days', paymentTerms: 'Net 30', status: 'active', totalStays: 31, activeStays: 5
  },
  'HTL-005': {
    id: 'HTL-005', name: 'Sheraton Boston', location: 'Boston, MA',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=300&fit=crop',
    contactPerson: 'Tom Richards', email: 'ap@sheratonboston.com', phone: '+1 (617) 236-2000',
    creditPeriod: '30 Days', paymentTerms: 'Net 30', status: 'settled', totalStays: 9, activeStays: 0
  },
  'HTL-006': {
    id: 'HTL-006', name: 'Radisson Blu Chicago', location: 'Chicago, IL',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=300&fit=crop',
    contactPerson: 'Kevin Park', email: 'billing@radissonchi.com', phone: '+1 (312) 787-2900',
    creditPeriod: '30 Days', paymentTerms: 'Net 30', status: 'active', totalStays: 15, activeStays: 2
  },
  'HTL-007': {
    id: 'HTL-007', name: 'Hyatt Regency Denver', location: 'Denver, CO',
    image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&h=300&fit=crop',
    contactPerson: 'Sarah Williams', email: 'finance@hyattdenver.com', phone: '+1 (303) 436-1234',
    creditPeriod: '30 Days', paymentTerms: 'Net 30', status: 'on-hold', totalStays: 7, activeStays: 1
  }
}

const mockReconciliation: Record<string, ReconciliationItem[]> = {
  'HTL-001': [
    { id: '1', type: 'invoice', date: '2026-01-15', dueDate: '2026-02-14', description: 'Room charges - Sarah Jenkins (3 nights)', invoiceNumber: 'INV-HYT-4021', amount: 845, status: 'matched', matchedWith: 'PAY-TC-0091', employee: 'Sarah Jenkins', daysOverdue: 0 },
    { id: '2', type: 'payment', date: '2026-01-20', description: 'Payment for INV-HYT-4021', paymentReference: 'PAY-TC-0091', amount: 845, status: 'matched', matchedWith: 'INV-HYT-4021' },
    { id: '3', type: 'invoice', date: '2026-01-22', dueDate: '2026-02-21', description: 'Room charges - David Kim (7 nights)', invoiceNumber: 'INV-HYT-4022', amount: 2150, status: 'unmatched', employee: 'David Kim', daysOverdue: 0 },
    { id: '4', type: 'invoice', date: '2026-01-28', dueDate: '2026-02-27', description: 'Room charges - Emily Chen (2 nights) + minibar', invoiceNumber: 'INV-HYT-4023', amount: 720, status: 'matched', matchedWith: 'PAY-TC-0094', employee: 'Emily Chen', daysOverdue: 0 },
    { id: '5', type: 'payment', date: '2026-02-01', description: 'Payment for INV-HYT-4023', paymentReference: 'PAY-TC-0094', amount: 720, status: 'matched', matchedWith: 'INV-HYT-4023' },
    { id: '6', type: 'invoice', date: '2026-02-03', dueDate: '2026-03-05', description: 'Room charges - Michael Jordan (4 nights)', invoiceNumber: 'INV-HYT-4024', amount: 1240, status: 'partial', employee: 'Michael Jordan', daysOverdue: 0 },
    { id: '7', type: 'payment', date: '2026-02-05', description: 'Partial payment for INV-HYT-4024', paymentReference: 'PAY-TC-0097', amount: 800, status: 'partial', matchedWith: 'INV-HYT-4024' },
    { id: '8', type: 'invoice', date: '2026-02-06', dueDate: '2026-02-15', description: 'Conference room + catering (Sales offsite)', invoiceNumber: 'INV-HYT-4025', amount: 3600, status: 'unmatched', employee: 'Team Event', daysOverdue: 0 },
    { id: '9', type: 'invoice', date: '2026-02-08', dueDate: '2026-03-10', description: 'Room charges - Amanda Lee (2 nights)', invoiceNumber: 'INV-HYT-4026', amount: 590, status: 'unmatched', employee: 'Amanda Lee', daysOverdue: 0 },
  ],
  'HTL-002': [
    { id: '1', type: 'invoice', date: '2026-01-10', dueDate: '2026-02-24', description: 'Room charges - Alex Turner (5 nights)', invoiceNumber: 'INV-MAR-7801', amount: 1550, status: 'matched', matchedWith: 'PAY-TC-0088', employee: 'Alex Turner', daysOverdue: 0 },
    { id: '2', type: 'payment', date: '2026-01-18', description: 'Payment for INV-MAR-7801', paymentReference: 'PAY-TC-0088', amount: 1550, status: 'matched', matchedWith: 'INV-MAR-7801' },
    { id: '3', type: 'invoice', date: '2026-01-25', dueDate: '2026-03-11', description: 'Room charges - Priya Patel (3 nights)', invoiceNumber: 'INV-MAR-7802', amount: 930, status: 'unmatched', employee: 'Priya Patel', daysOverdue: 0 },
    { id: '4', type: 'invoice', date: '2026-02-01', dueDate: '2026-03-18', description: 'Room charges + parking - Tom Wilson (4 nights)', invoiceNumber: 'INV-MAR-7803', amount: 1480, status: 'unmatched', employee: 'Tom Wilson', daysOverdue: 0 },
    { id: '5', type: 'invoice', date: '2026-02-03', dueDate: '2026-03-20', description: 'Executive suite - VP offsite (2 nights)', invoiceNumber: 'INV-MAR-7804', amount: 2800, status: 'partial', employee: 'Leadership Team', daysOverdue: 0 },
    { id: '6', type: 'payment', date: '2026-02-05', description: 'Partial payment for INV-MAR-7804', paymentReference: 'PAY-TC-0099', amount: 1500, status: 'partial', matchedWith: 'INV-MAR-7804' },
  ],
}

// Generate default data for other hotels
const defaultReconciliation: ReconciliationItem[] = [
  { id: '1', type: 'invoice', date: '2026-01-20', dueDate: '2026-02-19', description: 'Room charges - Employee stay (3 nights)', invoiceNumber: 'INV-GEN-001', amount: 960, status: 'matched', matchedWith: 'PAY-TC-0085', employee: 'John Smith', daysOverdue: 0 },
  { id: '2', type: 'payment', date: '2026-01-25', description: 'Payment for INV-GEN-001', paymentReference: 'PAY-TC-0085', amount: 960, status: 'matched', matchedWith: 'INV-GEN-001' },
  { id: '3', type: 'invoice', date: '2026-02-01', dueDate: '2026-03-02', description: 'Room charges - Employee stay (2 nights)', invoiceNumber: 'INV-GEN-002', amount: 640, status: 'unmatched', employee: 'Jane Doe', daysOverdue: 0 },
]

export default function HotelReconciliationClient({ hotelId }: { hotelId: string }) {
  const hotel = hotelsData[hotelId] || hotelsData['HTL-001']
  const items = mockReconciliation[hotelId] || defaultReconciliation

  const [filterStatus, setFilterStatus] = useState<'all' | 'matched' | 'unmatched' | 'partial'>('all')

  const invoices = items.filter(item => item.type === 'invoice')
  const payments = items.filter(item => item.type === 'payment')

  const totalInvoiced = invoices.reduce((sum, item) => sum + item.amount, 0)
  const totalPaid = payments.reduce((sum, item) => sum + item.amount, 0)
  const outstanding = totalInvoiced - totalPaid
  const matchedCount = items.filter(item => item.status === 'matched').length
  const unmatchedCount = items.filter(item => item.status === 'unmatched').length
  const partialCount = items.filter(item => item.status === 'partial').length

  const filteredItems = filterStatus === 'all' ? items : items.filter(item => item.status === filterStatus)
  const filteredInvoices = filteredItems.filter(item => item.type === 'invoice')
  const filteredPayments = filteredItems.filter(item => item.type === 'payment')

  const statusBadge = hotel.status === 'active'
    ? { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-800 dark:text-emerald-400', label: 'Active' }
    : hotel.status === 'on-hold'
      ? { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-800 dark:text-amber-400', label: 'On Hold' }
      : { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-800 dark:text-blue-400', label: 'Settled' }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display selection:bg-primary/20">
      <Sidebar title="TravelCorp" logoIcon="travel_explore" />

      <main className="flex-1 flex flex-col h-full overflow-hidden">
        <Header />

        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 scroll-smooth">
          <div className="mx-auto max-w-7xl flex flex-col gap-6">
            {/* Breadcrumbs */}
            <div className="flex flex-wrap gap-2">
              <Link href="/corporate-portal" className="text-slate-500 hover:text-primary text-sm font-medium leading-normal">Partner Hotels</Link>
              <span className="text-slate-400 text-sm font-medium leading-normal">/</span>
              <span className="text-slate-900 dark:text-slate-100 text-sm font-medium leading-normal">Reconciliation</span>
            </div>

            {/* Hotel Header */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <h1 className="text-slate-900 dark:text-white text-3xl font-extrabold">{hotel.name}</h1>
                    <span className={`inline-flex items-center gap-1 rounded-full ${statusBadge.bg} px-3 py-1 text-xs font-semibold ${statusBadge.text}`}>
                      <span className="material-symbols-outlined text-[14px]">check_circle</span>
                      {statusBadge.label}
                    </span>
                  </div>
                  <div className="grid gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px]">location_on</span>
                      <span>{hotel.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px]">person</span>
                      <span className="font-medium">Contact:</span>
                      <span>{hotel.contactPerson}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px]">mail</span>
                      <span>{hotel.email}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <Link href="/corporate-portal">
                    <button className="flex h-11 items-center justify-center rounded-lg border border-slate-200 bg-white px-5 text-slate-900 shadow-sm transition-all hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700">
                      <span className="material-symbols-outlined mr-2 text-[20px]">arrow_back</span>
                      <span className="text-sm font-bold leading-normal">Back to Hotels</span>
                    </button>
                  </Link>
                </div>
              </div>

              {/* Credit & Payment Terms */}
              <div className="grid gap-4 sm:grid-cols-3 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
                <div>
                  <p className="text-xs font-semibold uppercase text-slate-600 dark:text-slate-400">Credit Period</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white mt-1">{hotel.creditPeriod}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-slate-600 dark:text-slate-400">Payment Terms</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white mt-1">{hotel.paymentTerms}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-slate-600 dark:text-slate-400">Total / Active Stays</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white mt-1">{hotel.totalStays} total &middot; {hotel.activeStays} active</p>
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-[#1e293b]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-600 dark:text-slate-400">Total Invoiced</p>
                    <p className="text-slate-900 dark:text-white text-2xl font-bold mt-1">${totalInvoiced.toLocaleString()}</p>
                  </div>
                  <div className="flex size-12 items-center justify-center rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                    <span className="material-symbols-outlined">receipt</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-[#1e293b]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-600 dark:text-slate-400">Total Paid</p>
                    <p className="text-slate-900 dark:text-white text-2xl font-bold mt-1">${totalPaid.toLocaleString()}</p>
                  </div>
                  <div className="flex size-12 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                    <span className="material-symbols-outlined">check_circle</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-[#1e293b]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-600 dark:text-slate-400">Left to Pay</p>
                    <p className={`text-2xl font-bold mt-1 ${outstanding > 0 ? 'text-orange-600 dark:text-orange-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                      ${outstanding.toLocaleString()}
                    </p>
                  </div>
                  <div className={`flex size-12 items-center justify-center rounded-lg ${outstanding > 0 ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'}`}>
                    <span className="material-symbols-outlined">{outstanding > 0 ? 'account_balance_wallet' : 'verified'}</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-[#1e293b]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-600 dark:text-slate-400">Matched</p>
                    <p className="text-slate-900 dark:text-white text-2xl font-bold mt-1">{matchedCount}</p>
                  </div>
                  <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <span className="material-symbols-outlined">done_all</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-[#1e293b]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-600 dark:text-slate-400">Unmatched</p>
                    <p className={`text-2xl font-bold mt-1 ${unmatchedCount > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-slate-600 dark:text-slate-400'}`}>
                      {unmatchedCount}
                    </p>
                  </div>
                  <div className={`flex size-12 items-center justify-center rounded-lg ${unmatchedCount > 0 ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`}>
                    <span className="material-symbols-outlined">pending</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-[#1e293b]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-600 dark:text-slate-400">Partial</p>
                    <p className={`text-2xl font-bold mt-1 ${partialCount > 0 ? 'text-purple-600 dark:text-purple-400' : 'text-slate-600 dark:text-slate-400'}`}>
                      {partialCount}
                    </p>
                  </div>
                  <div className={`flex size-12 items-center justify-center rounded-lg ${partialCount > 0 ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`}>
                    <span className="material-symbols-outlined">hourglass_top</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Outstanding Payment Banner */}
            {outstanding > 0 && (
              <div className="rounded-xl border border-orange-200 bg-orange-50 p-5 dark:border-orange-900/30 dark:bg-orange-900/10">
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300">
                    <span className="material-symbols-outlined text-[28px]">payments</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-orange-900 dark:text-orange-200 text-lg">${outstanding.toLocaleString()} outstanding payment</h3>
                    <p className="text-sm text-orange-800 dark:text-orange-300 mt-0.5">{unmatchedCount + partialCount} invoice{unmatchedCount + partialCount !== 1 ? 's' : ''} pending full payment. Credit period: {hotel.creditPeriod}.</p>
                  </div>
                  <button className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-sm">
                    <span className="material-symbols-outlined text-[18px]">send</span>
                    Initiate Payment
                  </button>
                </div>
              </div>
            )}

            {/* Filter Tabs */}
            <div className="flex gap-2 border-b border-slate-200 dark:border-slate-700 overflow-x-auto">
              {(['all', 'matched', 'partial', 'unmatched'] as const).map((status) => {
                const count = status === 'all' ? items.length : status === 'matched' ? matchedCount : status === 'partial' ? partialCount : unmatchedCount
                return (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                      filterStatus === status
                        ? 'border-primary text-primary'
                        : 'border-transparent text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
                    }`}
                  >
                    {status === 'all' ? 'All Items' : status.charAt(0).toUpperCase() + status.slice(1)} ({count})
                  </button>
                )
              })}
            </div>

            {/* Reconciliation Log - Timeline Style */}
            <div className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#1e293b]">
              <div className="border-b border-slate-200 bg-slate-50 px-6 py-4 dark:border-slate-700 dark:bg-slate-800/50 flex items-center justify-between">
                <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-xl">history</span>
                  Reconciliation Log
                </h3>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{filteredItems.length} entries</span>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredItems.map((item) => (
                  <div key={`${item.type}-${item.id}`} className="flex items-start gap-4 p-5 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    {/* Icon */}
                    <div className={`flex size-10 shrink-0 items-center justify-center rounded-full ${
                      item.type === 'payment'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                        : item.status === 'unmatched'
                          ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                          : item.status === 'partial'
                            ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                            : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                    }`}>
                      <span className="material-symbols-outlined text-[20px]">
                        {item.type === 'payment' ? 'check_circle' : 'receipt'}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.description}</p>
                          <div className="flex items-center gap-3 mt-1 flex-wrap">
                            <span className="text-xs text-slate-500 dark:text-slate-400">{item.date}</span>
                            {item.invoiceNumber && (
                              <span className="font-mono text-xs text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">{item.invoiceNumber}</span>
                            )}
                            {item.paymentReference && (
                              <span className="font-mono text-xs text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded">{item.paymentReference}</span>
                            )}
                            {item.dueDate && (
                              <span className="text-xs text-slate-400 dark:text-slate-500">Due: {item.dueDate}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className={`text-sm font-bold ${item.type === 'payment' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-white'}`}>
                            {item.type === 'payment' ? '-' : ''}${item.amount.toLocaleString()}
                          </span>
                          {item.status === 'matched' && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                              <span className="material-symbols-outlined text-[12px]">check</span>
                              Matched
                            </span>
                          )}
                          {item.status === 'unmatched' && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-800 dark:bg-red-900/30 dark:text-red-400">
                              <span className="material-symbols-outlined text-[12px]">close</span>
                              Unpaid
                            </span>
                          )}
                          {item.status === 'partial' && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                              <span className="material-symbols-outlined text-[12px]">hourglass_top</span>
                              Partial
                            </span>
                          )}
                        </div>
                      </div>
                      {item.matchedWith && (
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1.5 flex items-center gap-1">
                          <span className="material-symbols-outlined text-[12px]">link</span>
                          Matched with {item.matchedWith}
                        </p>
                      )}
                    </div>
                  </div>
                ))}

                {filteredItems.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12 px-6">
                    <span className="material-symbols-outlined text-5xl text-slate-300 dark:text-slate-600 mb-3">inbox</span>
                    <p className="text-slate-600 dark:text-slate-400">No entries found for the selected filter</p>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Invoices Table */}
            <div className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#1e293b]">
              <div className="border-b border-slate-200 bg-slate-50 px-6 py-4 dark:border-slate-700 dark:bg-slate-800/50 flex items-center justify-between">
                <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-xl">receipt_long</span>
                  Invoices ({filteredInvoices.length})
                </h3>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-700 text-xs font-semibold rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                    <span className="material-symbols-outlined text-[16px]">download</span>
                    Export
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px]">
                  <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">Invoice #</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">Employee</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">Date</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">Due Date</th>
                      <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">Amount</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">Status</th>
                      <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {filteredInvoices.map((item) => (
                      <tr key={item.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50">
                        <td className="px-6 py-4">
                          <span className="font-mono text-sm font-semibold text-slate-900 dark:text-white">{item.invoiceNumber}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-slate-600 dark:text-slate-300">{item.employee || '-'}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-slate-600 dark:text-slate-300">{item.date}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-slate-600 dark:text-slate-300">{item.dueDate}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-sm font-semibold text-slate-900 dark:text-white">${item.amount.toLocaleString()}</span>
                        </td>
                        <td className="px-6 py-4">
                          {item.status === 'matched' && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                              <span className="size-1.5 rounded-full bg-emerald-500"></span>
                              Paid
                            </span>
                          )}
                          {item.status === 'unmatched' && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-800 dark:bg-red-900/30 dark:text-red-400">
                              <span className="size-1.5 rounded-full bg-red-500"></span>
                              Unpaid
                            </span>
                          )}
                          {item.status === 'partial' && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                              <span className="size-1.5 rounded-full bg-amber-500"></span>
                              Partial
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          {item.status !== 'matched' ? (
                            <button className="px-4 py-1.5 bg-primary text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors">
                              Pay Now
                            </button>
                          ) : (
                            <button className="text-slate-400 hover:text-primary transition-colors">
                              <span className="material-symbols-outlined text-[20px]">download</span>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredInvoices.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 px-6">
                  <span className="material-symbols-outlined text-5xl text-slate-300 dark:text-slate-600 mb-3">inbox</span>
                  <p className="text-slate-600 dark:text-slate-400">No invoices found for the selected filter</p>
                </div>
              )}
            </div>

            {/* Payment History */}
            <div className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#1e293b]">
              <div className="border-b border-slate-200 bg-slate-50 px-6 py-4 dark:border-slate-700 dark:bg-slate-800/50">
                <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-xl">check_circle</span>
                  Payment History ({filteredPayments.length})
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px]">
                  <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">Reference</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">Date</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">Description</th>
                      <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">Amount</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">Matched With</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {filteredPayments.map((item) => (
                      <tr key={item.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50">
                        <td className="px-6 py-4">
                          <span className="font-mono text-sm font-semibold text-emerald-700 dark:text-emerald-400">{item.paymentReference}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-slate-600 dark:text-slate-300">{item.date}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-slate-600 dark:text-slate-300">{item.description}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">-${item.amount.toLocaleString()}</span>
                        </td>
                        <td className="px-6 py-4">
                          {item.matchedWith ? (
                            <span className="font-mono text-xs text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">{item.matchedWith}</span>
                          ) : (
                            <span className="text-xs text-slate-400 dark:text-slate-500">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredPayments.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 px-6">
                  <span className="material-symbols-outlined text-5xl text-slate-300 dark:text-slate-600 mb-3">inbox</span>
                  <p className="text-slate-600 dark:text-slate-400">No payments found</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 flex-wrap mb-8">
              <button className="flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-white shadow-sm shadow-blue-500/20 transition-all hover:bg-blue-600 focus:ring-4 focus:ring-blue-500/30">
                <span className="material-symbols-outlined mr-2 text-[20px]">check</span>
                <span className="text-sm font-bold leading-normal">Mark as Reconciled</span>
              </button>
              <button className="flex h-11 items-center justify-center rounded-lg border border-slate-200 bg-white px-6 text-slate-900 shadow-sm transition-all hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700">
                <span className="material-symbols-outlined mr-2 text-[20px]">download</span>
                <span className="text-sm font-bold leading-normal">Export PDF Report</span>
              </button>
              <button className="flex h-11 items-center justify-center rounded-lg border border-slate-200 bg-white px-6 text-slate-900 shadow-sm transition-all hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700">
                <span className="material-symbols-outlined mr-2 text-[20px]">mail</span>
                <span className="text-sm font-bold leading-normal">Send Statement</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
