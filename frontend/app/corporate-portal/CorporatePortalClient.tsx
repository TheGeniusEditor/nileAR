"use client"

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/app/components/Sidebar'
import Header from '@/app/components/Header'
import { corporateTokenStorage } from '@/lib/corporateAuth'

interface Hotel {
  id: string
  name: string
  location: string
  image: string
  totalStays: number
  activeStays: number
  totalSpent: number
  outstanding: number
  pendingInvoices: number
  lastStayDate: string
  rating: number
  status: 'active' | 'on-hold' | 'settled'
}

const mockHotels: Hotel[] = [
  {
    id: 'HTL-001',
    name: 'Grand Hyatt Seattle',
    location: 'Seattle, WA',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=250&fit=crop',
    totalStays: 24,
    activeStays: 3,
    totalSpent: 42500,
    outstanding: 8500,
    pendingInvoices: 4,
    lastStayDate: 'Feb 5, 2026',
    rating: 4.8,
    status: 'active'
  },
  {
    id: 'HTL-002',
    name: 'Marriott Marquis SF',
    location: 'San Francisco, CA',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=250&fit=crop',
    totalStays: 18,
    activeStays: 2,
    totalSpent: 36200,
    outstanding: 5400,
    pendingInvoices: 3,
    lastStayDate: 'Feb 3, 2026',
    rating: 4.6,
    status: 'active'
  },
  {
    id: 'HTL-003',
    name: 'W Hotel Austin',
    location: 'Austin, TX',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=250&fit=crop',
    totalStays: 12,
    activeStays: 1,
    totalSpent: 18900,
    outstanding: 3200,
    pendingInvoices: 2,
    lastStayDate: 'Jan 28, 2026',
    rating: 4.5,
    status: 'active'
  },
  {
    id: 'HTL-004',
    name: 'Hilton Garden Inn NYC',
    location: 'New York, NY',
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=250&fit=crop',
    totalStays: 31,
    activeStays: 5,
    totalSpent: 68400,
    outstanding: 12800,
    pendingInvoices: 6,
    lastStayDate: 'Feb 8, 2026',
    rating: 4.3,
    status: 'active'
  },
  {
    id: 'HTL-005',
    name: 'Sheraton Boston',
    location: 'Boston, MA',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=250&fit=crop',
    totalStays: 9,
    activeStays: 0,
    totalSpent: 12600,
    outstanding: 0,
    pendingInvoices: 0,
    lastStayDate: 'Jan 15, 2026',
    rating: 4.4,
    status: 'settled'
  },
  {
    id: 'HTL-006',
    name: 'Radisson Blu Chicago',
    location: 'Chicago, IL',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=250&fit=crop',
    totalStays: 15,
    activeStays: 2,
    totalSpent: 28750,
    outstanding: 4100,
    pendingInvoices: 2,
    lastStayDate: 'Feb 1, 2026',
    rating: 4.2,
    status: 'active'
  },
  {
    id: 'HTL-007',
    name: 'Hyatt Regency Denver',
    location: 'Denver, CO',
    image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=400&h=250&fit=crop',
    totalStays: 7,
    activeStays: 1,
    totalSpent: 9800,
    outstanding: 2200,
    pendingInvoices: 1,
    lastStayDate: 'Jan 22, 2026',
    rating: 4.6,
    status: 'on-hold'
  }
]

const getStatusBadge = (status: Hotel['status']) => {
  switch (status) {
    case 'active':
      return { bg: 'bg-emerald-50 dark:bg-emerald-900/20', text: 'text-emerald-700 dark:text-emerald-400', dot: 'bg-emerald-500', label: 'Active' }
    case 'on-hold':
      return { bg: 'bg-amber-50 dark:bg-amber-900/20', text: 'text-amber-700 dark:text-amber-400', dot: 'bg-amber-500', label: 'On Hold' }
    case 'settled':
      return { bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-blue-700 dark:text-blue-400', dot: 'bg-blue-500', label: 'Settled' }
  }
}

export default function CorporatePortalClient() {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'on-hold' | 'settled'>('all')

  useEffect(() => {
    const token = corporateTokenStorage.get()
    if (!token) {
      router.replace('/corporate-portal/login')
      return
    }

    setIsAuthorized(true)
  }, [router])

  if (!isAuthorized) {
    return null
  }

  const filteredHotels = mockHotels.filter(hotel => {
    const matchesSearch = hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === 'all' || hotel.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const totalOutstanding = mockHotels.reduce((sum, h) => sum + h.outstanding, 0)
  const totalPendingInvoices = mockHotels.reduce((sum, h) => sum + h.pendingInvoices, 0)
  const totalActiveStays = mockHotels.reduce((sum, h) => sum + h.activeStays, 0)
  const activeHotels = mockHotels.filter(h => h.status === 'active').length

  return (
    <div className="flex h-screen w-full bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display overflow-hidden selection:bg-primary/20">
      <Sidebar title="TravelCorp" logoIcon="travel_explore" />
      
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <Header />
        
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 scroll-smooth">
          <div className="max-w-[1400px] mx-auto flex flex-col gap-8">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">Partner Hotels</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-2 text-base">Manage reconciliation and payments across all hotels your employees have stayed at.</p>
              </div>
              <button className="flex items-center justify-center gap-2 bg-primary hover:bg-blue-700 text-white px-5 py-3 rounded-lg shadow-sm transition-all hover:shadow-md shrink-0">
                <span className="material-symbols-outlined text-[20px]">download</span>
                <span className="text-sm font-bold">Export Summary</span>
              </button>
            </div>

            {/* KPIs */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex flex-col p-6 rounded-xl bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-primary">
                  <span className="material-symbols-outlined text-6xl">account_balance_wallet</span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Total Outstanding</p>
                <div className="flex items-end gap-2 mb-2">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">${totalOutstanding.toLocaleString()}</h3>
                </div>
                <div className="flex items-center gap-1 text-red-600 dark:text-red-400 text-xs font-bold bg-red-50 dark:bg-red-900/20 w-fit px-2 py-1 rounded-full">
                  <span className="material-symbols-outlined text-sm">pending_actions</span>
                  <span>Across {activeHotels} hotels</span>
                </div>
              </div>

              <div className="flex flex-col p-6 rounded-xl bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 shadow-sm group">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Pending Invoices</p>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{totalPendingInvoices}</h3>
                  </div>
                  <div className="size-10 rounded-lg bg-orange-50 dark:bg-orange-900/20 text-orange-600 flex items-center justify-center">
                    <span className="material-symbols-outlined">receipt_long</span>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-4">Requires review & payment</p>
              </div>

              <div className="flex flex-col p-6 rounded-xl bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 shadow-sm group">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Active Employee Stays</p>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{totalActiveStays}</h3>
                  </div>
                  <div className="size-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center">
                    <span className="material-symbols-outlined">hotel</span>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-4">Currently checked in</p>
              </div>

              <div className="flex flex-col p-6 rounded-xl bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Credit Limit Used</p>
                  <span className="text-sm font-bold text-primary">65%</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">$130k / $200k</h3>
                <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                  <div className="bg-primary h-2 rounded-full" style={{width: '65%'}}></div>
                </div>
                <p className="text-xs text-slate-400 mt-3">Resets on Mar 1st</p>
              </div>
            </section>

            {/* Search & Filters */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="relative w-full sm:w-80">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
                <input
                  type="text"
                  placeholder="Search hotels by name or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1e293b] text-slate-900 dark:text-white text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
              </div>
              <div className="flex gap-2">
                {(['all', 'active', 'on-hold', 'settled'] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      filterStatus === status
                        ? 'bg-primary text-white shadow-sm'
                        : 'bg-white dark:bg-[#1e293b] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    {status === 'all' ? 'All' : status === 'on-hold' ? 'On Hold' : status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Hotel Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredHotels.map((hotel) => {
                const badge = getStatusBadge(hotel.status)
                return (
                  <Link
                    key={hotel.id}
                    href={`/corporate-portal/hotels/${hotel.id}`}
                    className="flex flex-col bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden group hover:shadow-lg hover:border-primary/30 transition-all duration-300 cursor-pointer"
                  >
                    {/* Hotel Image */}
                    <div className="relative h-40 overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                        style={{ backgroundImage: `url("${hotel.image}")` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                        <div>
                          <h3 className="text-white text-lg font-bold drop-shadow-md">{hotel.name}</h3>
                          <p className="text-white/80 text-sm flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">location_on</span>
                            {hotel.location}
                          </p>
                        </div>
                        <span className={`inline-flex items-center gap-1.5 ${badge.bg} ${badge.text} text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm`}>
                          <span className={`size-1.5 rounded-full ${badge.dot}`}></span>
                          {badge.label}
                        </span>
                      </div>
                    </div>

                    {/* Hotel Stats */}
                    <div className="p-5 flex flex-col gap-4 flex-1">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Total Stays</span>
                          <span className="text-lg font-bold text-slate-900 dark:text-white">{hotel.totalStays}</span>
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Active Now</span>
                          <span className="text-lg font-bold text-slate-900 dark:text-white">{hotel.activeStays}</span>
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Total Spent</span>
                          <span className="text-lg font-bold text-slate-900 dark:text-white">${hotel.totalSpent.toLocaleString()}</span>
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Outstanding</span>
                          <span className={`text-lg font-bold ${hotel.outstanding > 0 ? 'text-orange-600 dark:text-orange-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                            ${hotel.outstanding.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Pending invoices & last stay */}
                      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-700 pt-3">
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">receipt_long</span>
                          {hotel.pendingInvoices} pending invoice{hotel.pendingInvoices !== 1 ? 's' : ''}
                        </span>
                        <span>Last stay: {hotel.lastStayDate}</span>
                      </div>

                      {/* Click indicator */}
                      <div className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white font-semibold text-sm transition-all duration-300">
                        <span>View Details</span>
                        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>

            {filteredHotels.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-600 mb-4">search_off</span>
                <p className="text-lg font-semibold text-slate-600 dark:text-slate-400">No hotels found</p>
                <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
