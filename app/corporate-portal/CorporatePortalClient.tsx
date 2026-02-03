"use client"

import Link from 'next/link'
import Sidebar from '@/app/components/Sidebar'
import Header from '@/app/components/Header'

export default function CorporatePortalClient() {

  return (
    <div className="flex h-screen w-full bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display overflow-hidden selection:bg-primary/20">
      {/* Sidebar */}
      <Sidebar title="TravelCorp" logoIcon="travel_explore" />
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Top Header */}
        <Header />
        
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
