"use client"

import Header from '@/app/components/Header'
import Sidebar from '@/app/components/Sidebar'
import Link from 'next/link'
import { useState } from 'react'
import InvoiceAutomationWorkflow from './InvoiceAutomationWorkflow'

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

const mockBookings: Booking[] = [
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

export default function BookingsClient() {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings)
  const [selectedFilter, setSelectedFilter] = useState<string>('all')
  const [fromDate, setFromDate] = useState<string>('')
  const [toDate, setToDate] = useState<string>('')
  const [showWorkflow, setShowWorkflow] = useState(false)
  const [selectedBookingForCheckout, setSelectedBookingForCheckout] = useState<Booking | null>(null)
  const [selectedBookings, setSelectedBookings] = useState<Set<string>>(new Set())
  const [showAddBookingModal, setShowAddBookingModal] = useState(false)
  const [formData, setFormData] = useState({
    bookingNumber: '',
    customerName: '',
    corporationName: '',
    checkInDate: '',
    checkOutDate: '',
    roomType: '',
    pricePerNight: '',
    gstApplicable: false,
  })

  const handleCheckout = (booking: Booking) => {
    setSelectedBookingForCheckout(booking)
    setShowWorkflow(true)
  }

  const toggleBookingSelection = (bookingId: string) => {
    const newSelected = new Set(selectedBookings)
    if (newSelected.has(bookingId)) {
      newSelected.delete(bookingId)
    } else {
      newSelected.add(bookingId)
    }
    setSelectedBookings(newSelected)
  }

  const toggleSelectAll = (bookingsToSelect: Booking[]) => {
    if (selectedBookings.size === bookingsToSelect.length && bookingsToSelect.length > 0) {
      setSelectedBookings(new Set())
    } else {
      setSelectedBookings(new Set(bookingsToSelect.map(b => b.id)))
    }
  }

  const handleAddBooking = (e: React.FormEvent) => {
    e.preventDefault()
    
    const checkIn = new Date(formData.checkInDate)
    const checkOut = new Date(formData.checkOutDate)
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
    const totalPrice = nights * parseFloat(formData.pricePerNight)

    const newBooking: Booking = {
      id: (bookings.length + 1).toString(),
      bookingNumber: formData.bookingNumber,
      customerName: formData.customerName,
      corporationName: formData.corporationName,
      checkInDate: formData.checkInDate,
      checkOutDate: formData.checkOutDate,
      roomType: formData.roomType,
      nights,
      pricePerNight: parseFloat(formData.pricePerNight),
      totalPrice,
      status: 'pending',
      gstApplicable: formData.gstApplicable,
    }

    setBookings([...bookings, newBooking])
    setShowAddBookingModal(false)
    setFormData({
      bookingNumber: '',
      customerName: '',
      corporationName: '',
      checkInDate: '',
      checkOutDate: '',
      roomType: '',
      pricePerNight: '',
      gstApplicable: false,
    })
  }

  const filteredBookings = bookings.filter(booking => {
    // Status filter
    if (selectedFilter !== 'all' && booking.status !== selectedFilter) return false
    
    // Date range filter
    if (fromDate) {
      const bookingDate = new Date(booking.checkInDate)
      const filterDate = new Date(fromDate)
      if (bookingDate < filterDate) return false
    }
    
    if (toDate) {
      const bookingDate = new Date(booking.checkOutDate)
      const filterDate = new Date(toDate)
      if (bookingDate > filterDate) return false
    }
    
    return true
  })

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark transition-colors duration-200">
      <Sidebar title="Hotel Finance" logoIcon="domain" />
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-background-light dark:bg-background-dark relative">
        <Header />
        
        {/* Scrollable Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 scroll-smooth">
          <div className="mx-auto max-w-7xl flex flex-col gap-6">
            {/* Page Heading */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight text-text-main-light dark:text-text-main-dark">Bookings Management</h2>
                <p className="text-text-sub-light dark:text-text-sub-dark mt-1">View and manage corporate hotel bookings</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowAddBookingModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-blue-700 text-white rounded-lg text-sm font-semibold shadow-sm hover:shadow-md hover:shadow-primary/30 transition-all"
                >
                  <span className="material-symbols-outlined text-[20px]">add</span>
                  <span>Add Booking</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold text-text-main-light dark:text-text-main-dark shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                  <span className="material-symbols-outlined text-[20px]">download</span>
                  <span>Export</span>
                </button>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-col gap-4">
              {/* Date Range Filter */}
              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-end bg-surface-light dark:bg-surface-dark rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                <div className="flex-1 sm:flex-none">
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">
                    From Date
                  </label>
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-text-main-light dark:text-text-main-dark focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div className="flex-1 sm:flex-none">
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">
                    To Date
                  </label>
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-text-main-light dark:text-text-main-dark focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                {(fromDate || toDate) && (
                  <button
                    onClick={() => {
                      setFromDate('')
                      setToDate('')
                    }}
                    className="flex items-center gap-1 px-3 py-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-primary transition-colors flex-shrink-0"
                  >
                    <span className="material-symbols-outlined text-[18px]">clear</span>
                    Clear
                  </button>
                )}
              </div>

              {/* Status Filter Tabs */}
              <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-700">
                {['all', 'pending', 'confirmed', 'checked-in', 'checked-out'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={`px-4 py-3 border-b-2 font-semibold text-sm transition-colors ${
                      selectedFilter === filter
                        ? 'border-primary text-primary'
                        : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-text-main-light dark:hover:text-text-main-dark'
                    }`}
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1).replace('-', ' ')}
                    <span className="ml-2 text-xs font-normal opacity-75">
                      ({bookings.filter(b => filter === 'all' ? true : b.status === filter).length})
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Bookings Table */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100 dark:border-slate-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                      <th className="px-6 py-4 text-left">
                        <input
                          type="checkbox"
                          checked={selectedBookings.size === filteredBookings.length && filteredBookings.length > 0}
                          onChange={() => toggleSelectAll(filteredBookings)}
                          className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-primary focus:ring-primary cursor-pointer"
                        />
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-text-main-light dark:text-text-main-dark">Booking #</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-text-main-light dark:text-text-main-dark">Customer</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-text-main-light dark:text-text-main-dark">Corporation</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-text-main-light dark:text-text-main-dark">Check-in</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-text-main-light dark:text-text-main-dark">Room Type</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-text-main-light dark:text-text-main-dark">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.length > 0 ? (
                      filteredBookings.map((booking) => (
                        <tr key={booking.id} className={`border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors ${selectedBookings.has(booking.id) ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}>
                          <td className="px-6 py-4">
                            <input
                              type="checkbox"
                              checked={selectedBookings.has(booking.id)}
                              onChange={() => toggleBookingSelection(booking.id)}
                              className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-primary focus:ring-primary cursor-pointer"
                            />
                          </td>
                          <td className="px-6 py-4 text-sm font-semibold text-text-main-light dark:text-text-main-dark">
                            {booking.bookingNumber}
                          </td>
                          <td className="px-6 py-4 text-sm text-text-main-light dark:text-text-main-dark">
                            {booking.customerName}
                          </td>
                          <td className="px-6 py-4 text-sm text-text-sub-light dark:text-text-sub-dark">
                            {booking.corporationName}
                          </td>
                      <td className="px-6 py-4 text-sm text-text-main-light dark:text-text-main-dark">
                            {new Date(booking.checkInDate).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </td>
                          <td className="px-6 py-4 text-sm text-text-main-light dark:text-text-main-dark">
                            {booking.roomType}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2 flex-wrap">
                              <Link
                                href={`/hotel-finance/bookings/${booking.id}/bills`}
                                className="flex items-center gap-2 px-3 py-2 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-400 rounded-lg text-sm font-semibold transition-all duration-200"
                              >
                                <span className="material-symbols-outlined text-[18px]">attach_file</span>
                                <span className="hidden sm:inline">Attach</span>
                              </Link>
                              <Link 
                                href={`/hotel-finance/bookings/${booking.id}/send`}
                                className="flex items-center gap-2 px-3 py-2 bg-primary hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-primary/30"
                              >
                                <span className="material-symbols-outlined text-[18px]">send</span>
                                <span className="hidden sm:inline">Send</span>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="px-6 py-8 text-center text-text-sub-light dark:text-text-sub-dark">
                          <div className="flex flex-col items-center gap-2">
                            <span className="material-symbols-outlined text-[48px] opacity-40">inbox</span>
                            <p className="text-sm font-medium">No bookings found</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100 dark:border-slate-800">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-primary">
                    <span className="material-symbols-outlined">booking</span>
                  </div>
                </div>
                <p className="text-text-sub-light dark:text-text-sub-dark text-sm font-medium">Total Bookings</p>
                <h3 className="text-2xl font-bold text-text-main-light dark:text-text-main-dark mt-1">{bookings.length}</h3>
              </div>
              <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100 dark:border-slate-800">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg text-warning">
                    <span className="material-symbols-outlined">schedule</span>
                  </div>
                </div>
                <p className="text-text-sub-light dark:text-text-sub-dark text-sm font-medium">Pending</p>
                <h3 className="text-2xl font-bold text-text-main-light dark:text-text-main-dark mt-1">{bookings.filter(b => b.status === 'pending').length}</h3>
              </div>
              <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100 dark:border-slate-800">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg text-success">
                    <span className="material-symbols-outlined">check_circle</span>
                  </div>
                </div>
                <p className="text-text-sub-light dark:text-text-sub-dark text-sm font-medium">Checked-in</p>
                <h3 className="text-2xl font-bold text-text-main-light dark:text-text-main-dark mt-1">{bookings.filter(b => b.status === 'checked-in').length}</h3>
              </div>
              <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100 dark:border-slate-800">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-purple-600 dark:text-purple-400">
                    <span className="material-symbols-outlined">attach_money</span>
                  </div>
                </div>
                <p className="text-text-sub-light dark:text-text-sub-dark text-sm font-medium">Total Revenue</p>
                <h3 className="text-2xl font-bold text-text-main-light dark:text-text-main-dark mt-1">
                  ${bookings.reduce((sum, b) => sum + b.totalPrice, 0).toLocaleString()}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Invoice Automation Workflow Modal */}
      {showWorkflow && selectedBookingForCheckout && (
        <InvoiceAutomationWorkflow
          bookingId={selectedBookingForCheckout.bookingNumber}
          customerName={selectedBookingForCheckout.customerName}
          corporationName={selectedBookingForCheckout.corporationName}
          totalAmount={selectedBookingForCheckout.totalPrice}
          onClose={() => {
            setShowWorkflow(false)
            setSelectedBookingForCheckout(null)
          }}
        />
      )}

      {/* Add Booking Modal */}
      {showAddBookingModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-700">
            <div className="sticky top-0 bg-surface-light dark:bg-surface-dark border-b border-slate-200 dark:border-slate-700 px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-bold text-text-main-light dark:text-text-main-dark">Add New Booking</h3>
              <button
                onClick={() => setShowAddBookingModal(false)}
                className="text-text-sub-light dark:text-text-sub-dark hover:text-text-main-light dark:hover:text-text-main-dark transition-colors"
              >
                <span className="material-symbols-outlined text-[24px]">close</span>
              </button>
            </div>

            <form onSubmit={handleAddBooking} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-text-main-light dark:text-text-main-dark mb-2">
                    Booking Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.bookingNumber}
                    onChange={(e) => setFormData({...formData, bookingNumber: e.target.value})}
                    className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-text-main-light dark:text-text-main-dark focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="e.g. BK-007"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text-main-light dark:text-text-main-dark mb-2">
                    Customer Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.customerName}
                    onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                    className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-text-main-light dark:text-text-main-dark focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="John Smith"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-main-light dark:text-text-main-dark mb-2">
                  Corporation Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.corporationName}
                  onChange={(e) => setFormData({...formData, corporationName: e.target.value})}
                  className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-text-main-light dark:text-text-main-dark focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Acme Corporation"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-text-main-light dark:text-text-main-dark mb-2">
                    Check-in Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.checkInDate}
                    onChange={(e) => setFormData({...formData, checkInDate: e.target.value})}
                    className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-text-main-light dark:text-text-main-dark focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text-main-light dark:text-text-main-dark mb-2">
                    Check-out Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.checkOutDate}
                    onChange={(e) => setFormData({...formData, checkOutDate: e.target.value})}
                    className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-text-main-light dark:text-text-main-dark focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-text-main-light dark:text-text-main-dark mb-2">
                    Room Type *
                  </label>
                  <select
                    required
                    value={formData.roomType}
                    onChange={(e) => setFormData({...formData, roomType: e.target.value})}
                    className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-text-main-light dark:text-text-main-dark focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  >
                    <option value="">Select Room Type</option>
                    <option value="Standard Room">Standard Room</option>
                    <option value="Deluxe Suite">Deluxe Suite</option>
                    <option value="Presidential Suite">Presidential Suite</option>
                    <option value="Executive Room">Executive Room</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text-main-light dark:text-text-main-dark mb-2">
                    Price Per Night * ($)
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={formData.pricePerNight}
                    onChange={(e) => setFormData({...formData, pricePerNight: e.target.value})}
                    className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-text-main-light dark:text-text-main-dark focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="350"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="gstApplicable"
                  checked={formData.gstApplicable}
                  onChange={(e) => setFormData({...formData, gstApplicable: e.target.checked})}
                  className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-primary focus:ring-primary cursor-pointer"
                />
                <label htmlFor="gstApplicable" className="text-sm font-semibold text-text-main-light dark:text-text-main-dark cursor-pointer">
                  GST Applicable
                </label>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setShowAddBookingModal(false)}
                  className="flex-1 px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold text-text-main-light dark:text-text-main-dark hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-primary hover:bg-blue-700 text-white rounded-lg text-sm font-semibold shadow-sm hover:shadow-md hover:shadow-primary/30 transition-all"
                >
                  Add Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}
