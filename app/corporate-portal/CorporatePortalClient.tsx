"use client"

import Link from 'next/link'
import { useState } from 'react'

export default function CorporatePortalClient() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className="flex h-screen w-full bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display overflow-hidden selection:bg-primary/20">
      {/* Sidebar */}
      <aside className={`${isCollapsed ? 'w-20' : 'w-64'} flex-shrink-0 border-r border-[#e7ecf3] dark:border-slate-800 bg-white dark:bg-[#161f2c] hidden lg:flex flex-col transition-all duration-300`}>
        <button
          type="button"
          onClick={() => setIsCollapsed((prev) => !prev)}
          className="h-16 flex items-center px-6 border-b border-[#e7ecf3] dark:border-slate-800 group hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
        >
          <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center w-full' : ''}`}>
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8 ring-2 ring-transparent group-hover:ring-primary/30 transition-all"
              style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCwm9cQ0Z_hJGCRfhC8xIumNZQGzbtTe2Zrx9p8pnPNpfC_ZlsxZh9bM-aPkYBndBmwlW1Kt5hbZYKoRvPHn4j62IXht4K_fxrf6xjGr3-diDRweFMNOBaWlRHc5EBw-_dsUGhhLWpS87kva_xOF17HQGrmg9M9vAIIvej5V2xHlTb3FYOuhFyMorLFt0ULxBSvZz0MoMvN9jZMYK66zpwQDQo-ITkw4Jg29rx6tcL81zTw8EtGMiftXr-JfInsARJBMxVudfceSpZ-")'}}
            ></div>
            <h1 className={`text-[#0d131b] dark:text-white text-lg font-bold tracking-tight transition-all ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
              TravelCorp
            </h1>
          </div>
        </button>
        <div className="flex flex-col flex-1 p-4 gap-2 overflow-y-auto">
          <a className={`flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary hover:shadow-sm transition-all ${isCollapsed ? 'justify-center' : ''}`} href="#">
            <span className="material-symbols-outlined text-[22px]" style={{fontVariationSettings: "'FILL' 1"}}>dashboard</span>
            <p className={`text-sm font-semibold transition-all ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>Dashboard</p>
          </a>
          <a className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${isCollapsed ? 'justify-center' : ''}`} href="#">
            <span className="material-symbols-outlined text-[22px]">description</span>
            <p className={`text-sm font-medium transition-all ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>Invoices</p>
          </a>
          <a className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${isCollapsed ? 'justify-center' : ''}`} href="#">
            <span className="material-symbols-outlined text-[22px]">groups</span>
            <p className={`text-sm font-medium transition-all ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>Guests</p>
          </a>
          <a className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${isCollapsed ? 'justify-center' : ''}`} href="#">
            <span className="material-symbols-outlined text-[22px]">bar_chart</span>
            <p className={`text-sm font-medium transition-all ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>Reports</p>
          </a>
        </div>
        <div className="p-4 border-t border-[#e7ecf3] dark:border-slate-800">
          <a className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${isCollapsed ? 'justify-center' : ''}`} href="#">
            <span className="material-symbols-outlined text-[22px]">settings</span>
            <p className={`text-sm font-medium transition-all ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>Settings</p>
          </a>
          <Link className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${isCollapsed ? 'justify-center' : ''}`} href="/">
            <span className="material-symbols-outlined text-[22px]">logout</span>
            <p className={`text-sm font-medium transition-all ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>Log Out</p>
          </Link>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Top Header */}
        <header className="h-16 flex items-center justify-between px-8 border-b border-[#e7ecf3] dark:border-slate-800 bg-white dark:bg-[#161f2c] flex-shrink-0 z-10">
          <div className="flex items-center w-full max-w-md">
            <div className="relative w-full text-slate-400 focus-within:text-primary">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="material-symbols-outlined">search</span>
              </div>
              <input className="block w-full rounded-lg border-none bg-slate-100 dark:bg-slate-800 py-2 pl-10 pr-3 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6 transition-all" placeholder="Search (Ctrl + /)" type="text" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 group">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-primary transition-colors">Sarah Jenkins</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Product Designer</p>
              </div>
              <div
                className="bg-center bg-no-repeat bg-cover rounded-full h-10 w-10 border-2 border-white dark:border-slate-700 shadow-sm"
                style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB48jMTkPZ0nor87Nv5RNKgPXMFnVqWZSnyHVnj2Az1T5bnChp6bjU5-sA6Inh4lDzcs1PvBkppXgRJ9dxM6NMyqUT6yy1HEPDUAdQYKgHxxW89PsnxqBbFJoCCTMAhBnNHhnvUvN1hjUDvyqdK_O_2VL68tXcFyoou8MWDiQGij-W0jaUMHXuCxv7Opt3XKBKWdIqrvQEylqYlEQFLz6pNKMYaPR0WXNb-oNxc2svT_iRXyClrQBIJbzRxWycB4bfKKMAnXHHedazR")'}}
              ></div>
            </div>
          </div>
        </header>
        
        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 scroll-smooth">
          <div className="max-w-[1400px] mx-auto flex flex-col gap-8">
            {/* KPIs */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* KPI 1 */}
              <div className="flex flex-col p-6 rounded-xl bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-primary">
                  <span className="material-symbols-outlined text-6xl">account_balance_wallet</span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Total Outstanding</p>
                <div className="flex items-end gap-2 mb-2">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">$42,500.00</h3>
                </div>
                <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-xs font-bold bg-emerald-50 dark:bg-emerald-900/20 w-fit px-2 py-1 rounded-full">
                  <span className="material-symbols-outlined text-sm">trending_up</span>
                  <span>+12% vs last month</span>
                </div>
              </div>
              {/* KPI 2 */}
              <div className="flex flex-col p-6 rounded-xl bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 shadow-sm group">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Pending Invoices</p>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">12</h3>
                  </div>
                  <div className="size-10 rounded-lg bg-orange-50 dark:bg-orange-900/20 text-orange-600 flex items-center justify-center">
                    <span className="material-symbols-outlined">receipt_long</span>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-4">3 invoices due today</p>
              </div>
              {/* KPI 3 */}
              <div className="flex flex-col p-6 rounded-xl bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 shadow-sm group">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Recent Stays</p>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">8</h3>
                  </div>
                  <div className="size-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center">
                    <span className="material-symbols-outlined">hotel</span>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-4">New check-ins this week</p>
              </div>
              {/* KPI 4 */}
              <div className="flex flex-col p-6 rounded-xl bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Credit Limit Used</p>
                  <span className="text-sm font-bold text-primary">65%</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">$130k / $200k</h3>
                <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                  <div className="bg-primary h-2 rounded-full" style={{width: '65%'}}></div>
                </div>
                <p className="text-xs text-slate-400 mt-3">Resets on Nov 1st</p>
              </div>
            </section>
            
            {/* Main Grid Area */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
              {/* Chart Section (Takes 2/3 on large screens) */}
              <section className="xl:col-span-2 flex flex-col bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex flex-wrap gap-4 items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Travel Expenditure Overview</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Monthly spend analysis (Jan - Jun)</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <select className="form-select text-xs font-semibold bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-slate-600 dark:text-slate-300 focus:ring-0 cursor-pointer">
                      <option>Last 6 Months</option>
                      <option>Last Year</option>
                    </select>
                    <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                      <span className="material-symbols-outlined">download</span>
                    </button>
                  </div>
                </div>
                <div className="p-6 flex flex-col gap-6">
                  <div className="flex items-baseline gap-2">
                    <h4 className="text-3xl font-bold text-slate-900 dark:text-white">$124,000</h4>
                    <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">+5% vs previous period</span>
                  </div>
                  {/* Custom Chart Implementation */}
                  <div className="relative h-64 w-full mt-4">
                    {/* Grid Lines */}
                    <div className="absolute inset-0 flex flex-col justify-between text-xs text-slate-400 font-medium">
                      <div className="w-full border-b border-dashed border-slate-200 dark:border-slate-700 pb-1">100k</div>
                      <div className="w-full border-b border-dashed border-slate-200 dark:border-slate-700 pb-1">75k</div>
                      <div className="w-full border-b border-dashed border-slate-200 dark:border-slate-700 pb-1">50k</div>
                      <div className="w-full border-b border-dashed border-slate-200 dark:border-slate-700 pb-1">25k</div>
                      <div className="w-full border-b border-slate-200 dark:border-slate-700 pb-1">0</div>
                    </div>
                    
                    {/* Chart Lines */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 256">
                      {/* Blue Line */}
                      <path
                        d="M 50,180 C 150,130 250,90 350,110 C 450,130 550,60 650,90 C 700,105 750,30 780,20"
                        fill="none"
                        stroke="#1D4ED8"
                        strokeWidth="3"
                      />
                      <path
                        d="M 50,180 C 150,130 250,90 350,110 C 450,130 550,60 650,90 C 700,105 750,30 780,20"
                        fill="url(#blueGradient)"
                        fillOpacity="0.1"
                      />
                      
                      {/* Green Line */}
                      <path
                        d="M 50,200 C 150,170 250,140 350,150 C 450,160 550,130 650,150 C 700,165 750,120 780,100"
                        fill="none"
                        stroke="#10B981"
                        strokeWidth="2"
                        strokeDasharray="3 3"
                      />
                      
                      {/* Gradient Definition */}
                      <defs>
                        <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#1D4ED8" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                    </svg>
                    
                    {/* Month Labels */}
                    <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-slate-400 font-medium px-2">
                      <span>Jan</span>
                      <span>Feb</span>
                      <span>Mar</span>
                      <span>Apr</span>
                      <span>May</span>
                      <span>Jun</span>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* Action Required */}
              <section className="flex flex-col bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 flex items-center justify-center">
                      <span className="material-symbols-outlined">warning</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">Action Required</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">3 Urgent</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-red-600 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-full">3 Urgent</span>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-700">
                  {/* Invoice 1 */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-white">INV-2023-001</span>
                        <span className="text-xs font-bold text-red-600 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-full">Overdue</span>
                      </div>
                      <span className="font-bold text-slate-900 dark:text-white">$450.00</span>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Stay: John Smith at Hilton NYC</p>
                    <p className="text-xs text-slate-400 mt-1">Due: Oct 24, 2023</p>
                    <button className="text-sm font-semibold text-primary hover:underline mt-3">Pay Now</button>
                  </div>
                  {/* Invoice 2 */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-white">INV-2023-002</span>
                        <span className="text-xs font-bold text-orange-600 bg-orange-50 dark:bg-orange-900/20 px-2 py-1 rounded-full">Due Today</span>
                      </div>
                      <span className="font-bold text-slate-900 dark:text-white">$1,200.00</span>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Stay: Sarah Connor at Marriott</p>
                    <p className="text-xs text-slate-400 mt-1">Due: Oct 26, 2023</p>
                    <button className="text-sm font-semibold text-primary hover:underline mt-3">Pay Now</button>
                  </div>
                  {/* Invoice 3 */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-slate-900 dark:text-white">INV-2023-003</span>
                      <span className="font-bold text-slate-900 dark:text-white">$3,400.00</span>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Event: Sales Kickoff Catering</p>
                    <p className="text-xs text-slate-400 mt-1">Due: Oct 28, 2023</p>
                    <button className="text-sm font-semibold text-primary hover:underline mt-3">Pay Now</button>
                  </div>
                </div>
                <div className="p-4 border-t border-slate-100 dark:border-slate-700">
                  <button className="w-full text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-primary transition-colors flex items-center justify-center gap-2">
                    View All Pending
                    <span className="material-symbols-outlined text-[18px]">arrow_right_alt</span>
                  </button>
                </div>
              </section>
            </div>
            
            {/* Recent Invoices */}
            <section className="bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent Invoices</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Manage and pay your recent corporate travel invoices.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-sm font-semibold rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                    <span className="material-symbols-outlined text-[18px]">filter_list</span>
                    Filter
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-sm font-semibold rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                    <span className="material-symbols-outlined text-[18px]">ios_share</span>
                    Export
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      <th className="px-6 py-4">Invoice ID</th>
                      <th className="px-6 py-4">Guest / Description</th>
                      <th className="px-6 py-4">Date Issued</th>
                      <th className="px-6 py-4">Amount</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                    {/* Row 1 */}
                    <tr>
                      <td className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">#INV-9923</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="size-8 rounded-full bg-cover bg-center" style={{backgroundImage: 'url("https://randomuser.me/api/portraits/men/32.jpg")'}}></div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900 dark:text-white">Michael Scott</p>
                            <p className="text-xs text-slate-500">Radisson Blu, Chicago</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">Oct 21, 2023</td>
                      <td className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">$850.00</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full">
                          <span className="size-2 rounded-full bg-emerald-500"></span>
                          Paid
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-slate-400 hover:text-primary">
                          <span className="material-symbols-outlined">download</span>
                        </button>
                      </td>
                    </tr>
                    {/* Row 2 */}
                    <tr>
                      <td className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">#INV-9924</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="size-8 rounded-full bg-cover bg-center" style={{backgroundImage: 'url("https://randomuser.me/api/portraits/women/44.jpg")'}}></div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900 dark:text-white">Pam Beesly</p>
                            <p className="text-xs text-slate-500">Hyatt Regency, Austin</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">Oct 22, 2023</td>
                      <td className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">$1,120.00</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-2 text-xs font-semibold text-amber-700 bg-amber-50 dark:bg-amber-900/20 px-3 py-1 rounded-full">
                          <span className="size-2 rounded-full bg-amber-500"></span>
                          Pending
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg">Pay Now</button>
                      </td>
                    </tr>
                    {/* Row 3 */}
                    <tr>
                      <td className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">#INV-9925</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="size-8 rounded-full bg-cover bg-center" style={{backgroundImage: 'url("https://randomuser.me/api/portraits/men/45.jpg")'}}></div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900 dark:text-white">Jim Halpert</p>
                            <p className="text-xs text-slate-500">Sheraton, Philadelphia</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">Oct 23, 2023</td>
                      <td className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">$640.00</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-2 text-xs font-semibold text-amber-700 bg-amber-50 dark:bg-amber-900/20 px-3 py-1 rounded-full">
                          <span className="size-2 rounded-full bg-amber-500"></span>
                          Pending
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg">Pay Now</button>
                      </td>
                    </tr>
                    {/* Row 4 */}
                    <tr>
                      <td className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">#INV-9926</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="size-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">TC</div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900 dark:text-white">Team Catering</p>
                            <p className="text-xs text-slate-500">Q3 Review</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">Oct 24, 2023</td>
                      <td className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">$2,100.00</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-2 text-xs font-semibold text-red-600 bg-red-50 dark:bg-red-900/20 px-3 py-1 rounded-full">
                          <span className="size-2 rounded-full bg-red-500"></span>
                          Overdue
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg">Pay Now</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
