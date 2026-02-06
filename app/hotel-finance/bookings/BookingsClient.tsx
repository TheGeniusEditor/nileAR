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
  },
]

export default function BookingsClient() {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings)
  const [selectedFilter, setSelectedFilter] = useState<string>('all')
  const [showWorkflow, setShowWorkflow] = useState(false)
  const [selectedBookingForCheckout, setSelectedBookingForCheckout] = useState<Booking | null>(null)

  const handleCheckout = (booking: Booking) => {
    setSelectedBookingForCheckout(booking)
    setShowWorkflow(true)
  }

  const handleWorkflowClose = () => {
    setShowWorkflow(false)
    setSelectedBookingForCheckout(null)
    // Mark booking as checked-out after workflow completion
    if (selectedBookingForCheckout) {
      setBookings(bookings.map(b =>
        b.id === selectedBookingForCheckout.id
          ? { ...b, status: 'checked-out' }
          : b
      ))
    }
  }

  const filteredBookings = bookings.filter(booking => {
    if (selectedFilter === 'all') return true
    return booking.status === selectedFilter
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
                <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold text-text-main-light dark:text-text-main-dark shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                  <span className="material-symbols-outlined text-[20px]">download</span>
                  <span>Export</span>
                </button>
              </div>
            </div>

            {/* Filter Tabs */}
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

            {/* Bookings Table */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100 dark:border-slate-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-text-main-light dark:text-text-main-dark">Booking #</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-text-main-light dark:text-text-main-dark">Customer</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-text-main-light dark:text-text-main-dark">Corporation</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-text-main-light dark:text-text-main-dark">Check-in</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-text-main-light dark:text-text-main-dark">Check-out</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-text-main-light dark:text-text-main-dark">Room Type</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-text-main-light dark:text-text-main-dark">Total</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-text-main-light dark:text-text-main-dark">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.length > 0 ? (
                      filteredBookings.map((booking) => (
                        <tr key={booking.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
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
                            {new Date(booking.checkOutDate).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </td>
                          <td className="px-6 py-4 text-sm text-text-main-light dark:text-text-main-dark">
                            {booking.roomType}
                          </td>
                          <td className="px-6 py-4 text-sm font-semibold text-text-main-light dark:text-text-main-dark">
                            ${booking.totalPrice.toLocaleString()}
                          </td>
                          <td className="px-6 py-4">
                            {booking.status !== 'checked-out' && (
                              <button 
                                onClick={() => handleCheckout(booking)}
                                className="flex items-center gap-2 px-3 py-2 bg-primary hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-primary/30"
                              >
                                <span className="material-symbols-outlined text-[18px]">logout</span>
                                <span className="hidden sm:inline">Checkout</span>
                              </button>
                            )}
                            {booking.status === 'checked-out' && (
                              <span className="text-xs text-slate-500 dark:text-slate-400">Completed</span>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={8} className="px-6 py-8 text-center text-text-sub-light dark:text-text-sub-dark">
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
          onClose={handleWorkflowClose}
        />
      )}
    </div>
  )
}
