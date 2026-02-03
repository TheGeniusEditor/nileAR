"use client"

import { useState } from 'react'

export default function ReportsClient() {
  const [selectedPeriod, setSelectedPeriod] = useState('This Quarter')

  return (
    <div className="flex-1 overflow-y-auto h-full relative">
      <div className="max-w-[1280px] mx-auto p-8 flex flex-col gap-8">
        {/* Page Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Spend Analytics</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Overview of company travel expenses • Oct 1, 2023 - Dec 31, 2023</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-200">
              <span className="material-symbols-outlined text-[20px]">calendar_today</span>
              <span>{selectedPeriod}</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold bg-primary text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors">
              <span className="material-symbols-outlined text-[20px]">download</span>
              <span>Download Report</span>
            </button>
          </div>
        </header>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400 mr-2">Filter by:</span>
          <button className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 hover:border-primary dark:hover:border-primary transition-all shadow-sm">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Department</span>
            <span className="material-symbols-outlined text-[18px] text-slate-400 group-hover:text-primary">expand_more</span>
          </button>
          <button className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 hover:border-primary dark:hover:border-primary transition-all shadow-sm">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Time Period</span>
            <span className="material-symbols-outlined text-[18px] text-slate-400 group-hover:text-primary">expand_more</span>
          </button>
          <button className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 hover:border-primary dark:hover:border-primary transition-all shadow-sm">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Region</span>
            <span className="material-symbols-outlined text-[18px] text-slate-400 group-hover:text-primary">expand_more</span>
          </button>
          <button className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 hover:border-primary dark:hover:border-primary transition-all shadow-sm">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Hotel Chain</span>
            <span className="material-symbols-outlined text-[18px] text-slate-400 group-hover:text-primary">expand_more</span>
          </button>
          <button className="ml-auto text-sm font-medium text-primary hover:text-blue-700">Clear all</button>
        </div>

        {/* Stats KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Spend (YTD)</p>
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-[20px]">trending_up</span>
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">$1.2M</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm font-bold text-green-600 dark:text-green-400">+12%</span>
              <span className="text-sm text-slate-400">vs last year</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Nights Booked</p>
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <span className="material-symbols-outlined text-primary text-[20px]">bed</span>
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">6,450</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm font-bold text-green-600 dark:text-green-400">+5%</span>
              <span className="text-sm text-slate-400">vs last year</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Avg Daily Rate (ADR)</p>
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <span className="material-symbols-outlined text-purple-600 dark:text-purple-400 text-[20px]">price_check</span>
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">$185</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm font-bold text-green-600 dark:text-green-400">+2%</span>
              <span className="text-sm text-slate-400">vs last year</span>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Spend by Department Chart */}
          <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Spend by Department</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Current Quarter Analysis</p>
              </div>
              <button className="text-slate-400 hover:text-primary">
                <span className="material-symbols-outlined">more_horiz</span>
              </button>
            </div>
            <div className="flex-1 flex items-end justify-between gap-4 h-[250px] px-2">
              {/* Bar Items */}
              {[
                { label: 'Sales', height: '85%', value: '$450k' },
                { label: 'Eng', height: '65%', value: '$320k' },
                { label: 'HR', height: '45%', value: '$210k' },
                { label: 'Mktg', height: '30%', value: '$140k' },
                { label: 'Ops', height: '55%', value: '$265k' },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-2 flex-1 group cursor-pointer">
                  <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-t-lg relative overflow-hidden h-full flex items-end">
                    <div 
                      className="w-full bg-primary opacity-90 group-hover:opacity-100 transition-all duration-500 relative" 
                      style={{ height: item.height }}
                    >
                      <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap transition-opacity">
                        {item.value}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ADR Trend Chart */}
          <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Average Daily Rate (ADR) Trends</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Jan - Dec 2023</p>
              </div>
              <button className="text-slate-400 hover:text-primary">
                <span className="material-symbols-outlined">more_horiz</span>
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-end relative h-[250px]">
              {/* Background Grid Lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                <div className="border-t border-dashed border-slate-200 dark:border-slate-700 w-full"></div>
                <div className="border-t border-dashed border-slate-200 dark:border-slate-700 w-full"></div>
                <div className="border-t border-dashed border-slate-200 dark:border-slate-700 w-full"></div>
                <div className="border-t border-dashed border-slate-200 dark:border-slate-700 w-full"></div>
                <div className="border-t border-slate-200 dark:border-slate-700 w-full"></div>
              </div>
              {/* Chart SVG */}
              <svg className="relative z-10 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 478 150" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear" x1="239" x2="239" y1="0" y2="150">
                    <stop stopColor="#135bec" stopOpacity="0.2"></stop>
                    <stop offset="1" stopColor="#135bec" stopOpacity="0"></stop>
                  </linearGradient>
                </defs>
                <path d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25V150H0V109Z" fill="url(#paint0_linear)"></path>
                <path d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25" stroke="#135bec" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path>
              </svg>
              {/* X Axis Labels */}
              <div className="flex justify-between mt-4 text-xs font-bold text-slate-400 uppercase tracking-wide px-2">
                <span>Jan</span>
                <span>Mar</span>
                <span>May</span>
                <span>Jul</span>
                <span>Sep</span>
                <span>Nov</span>
                <span>Dec</span>
              </div>
            </div>
          </div>
        </div>

        {/* Top Travelers Table */}
        <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden mb-10">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Top Travelers</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Employees with highest travel spend this period</p>
            </div>
            <button className="text-sm font-medium text-primary hover:text-blue-700">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50">
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-16">Rank</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Employee</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Stays</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Total Spend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {/* Row 1 */}
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-yellow-100 text-yellow-700 text-xs font-bold">1</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-cover bg-center" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAqFRTZ1B8SzDvHxl7qCgwwxOx8cssScNhDceGQOVO5of9ZMHhmKgadvBRFJIQCgOY8cRNQTpdRRBYkDHHUkA0XdBHKvHiYrNje9yK1zDt1gXRRk3K2IMt3gKTKzfMYBPJ9k1hjn56f7pA-zNOwbGwKp5ERAoJfsZXMEwKSwHzELRGkmHjX6k_8axMgTkY_hBS5JkxlczEYQXsBnjPJ4qdJBT5LodoxZBlDjfZL16wFZwwbKSkUI8Co4XFUrF_SJ2vkAy4O74jy7Tg")'}}></div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">Sarah Jenkins</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">VP of Sales</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                      Sales
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-slate-700 dark:text-slate-300">14</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold text-slate-900 dark:text-white">$8,400</td>
                </tr>

                {/* Row 2 */}
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-600 text-xs font-bold">2</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-cover bg-center" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC3gLrU88CKE8rYjWq_LkKWonr3AXv7AqGu9ZmuKQ1jbEbJyLmjW5z5UkVhfRNV0y_i8pfgnH7B2mGgGi6C8JOU6nkOzMQu1-HYpYOhoAmqWeHkbMeWKNC8YxEsLBZ1AVB5kSuAn5wG2-yYvzsqyJhBCsyTMGQQ1hXoqCPvisqizHRAyg-3VGNPlSWUnmRJzI1UOf26nWafJiJKNjRBOijcbUzu_PGIyIgmCD3qFi9DwntfW0Q2n8vwYHGx2Y2VeSwzDwE_p6dazuk")'}}></div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">Michael Chen</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Senior Engineer</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                      Engineering
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-slate-700 dark:text-slate-300">10</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold text-slate-900 dark:text-white">$6,250</td>
                </tr>

                {/* Row 3 */}
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-600 text-xs font-bold">3</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-cover bg-center" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAj3ag9VRYHQYWxcV6AK9lIAiGb0cbAKa1slsodIBvdXjZ0MwsWz-cYrwbI0AYsUiQ-kKdhi0F9bWgZy8Gug0lSvHgElNFMN1LHLt4fCybs97SbMbaZITT3PrlKs8zPIdGsKdTgd5hFT3odM0nW9t5d48mxhaFgE0C_tQQThSdryj1oNW4DsgyD2zv--TbULPWbyv0y0q__OlwFyBp86iaOvWorxqNug_nIbIA1RxUkKiINma4XNNfL0nJisgiwv_O9YoPKA7eIDOQ")'}}></div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">Emily Davis</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Recruiter</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300">
                      HR
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-slate-700 dark:text-slate-300">8</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold text-slate-900 dark:text-white">$4,100</td>
                </tr>

                {/* Row 4 */}
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-600 text-xs font-bold">4</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-cover bg-center" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD4mAtFKDWx0yIn6vE1-m_EhkIeRyIOPoELYpTeGUdDyis4dPvDUyDua1ocrngE5JSDFeGo5IU6vuYUOUMUTpbEZGlDfyBZNeQvLOjZA2ueTcqrJf4pR2iKpG6RsjIINmlDyndbQGjHaKlPeLG6qltWcuB9iUyCeT5QdbgotK2MhNxWp0VbS1-8Y7s2vuEEZT6PFiuCM1kfFNWAO_Npf2pSDYb29ToaIDhMsjQlOQS42BaG0MeY1T4jB417CpXCv9wmrG_4AvO4PYs")'}}></div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">James Wilson</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Marketing Lead</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
                      Marketing
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-slate-700 dark:text-slate-300">6</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold text-slate-900 dark:text-white">$3,850</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
