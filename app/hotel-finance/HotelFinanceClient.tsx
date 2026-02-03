"use client"

import Link from 'next/link'
import { useState } from 'react'

export default function HotelFinanceClient() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark transition-colors duration-200">
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
              Hotel Finance
            </h1>
          </div>
        </button>
        <div className="flex flex-col flex-1 p-4 gap-2 overflow-y-auto">
          <a className={`flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary hover:shadow-sm transition-all ${isCollapsed ? 'justify-center' : ''}`} href="#">
            <span className="material-symbols-outlined text-[22px]" style={{fontVariationSettings: "'FILL' 1"}}>dashboard</span>
            <p className={`text-sm font-semibold transition-all ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>Dashboard</p>
          </a>
          <a className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${isCollapsed ? 'justify-center' : ''}`} href="#">
            <span className="material-symbols-outlined text-[22px]">receipt_long</span>
            <p className={`text-sm font-medium transition-all ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>Invoices</p>
          </a>
          <a className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${isCollapsed ? 'justify-center' : ''}`} href="#">
            <span className="material-symbols-outlined text-[22px]">business_center</span>
            <p className={`text-sm font-medium transition-all ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>Organizations</p>
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
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-background-light dark:bg-background-dark relative">
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
        
        {/* Scrollable Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 scroll-smooth">
          <div className="mx-auto max-w-7xl flex flex-col gap-6">
            {/* Page Heading */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight text-text-main-light dark:text-text-main-dark">Financial Overview</h2>
                <p className="text-text-sub-light dark:text-text-sub-dark mt-1">Real-time corporate billing status &amp; performance</p>
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold text-text-main-light dark:text-text-main-dark shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                  <span className="material-symbols-outlined text-[20px]">calendar_today</span>
                  <span>This Month</span>
                  <span className="material-symbols-outlined text-[20px]">arrow_drop_down</span>
                </button>
                <button className="flex items-center justify-center px-4 py-2 bg-primary hover:bg-blue-700 text-white rounded-lg text-sm font-semibold shadow-sm transition-colors shadow-blue-500/20">
                  <span className="material-symbols-outlined text-[20px] mr-2">download</span>
                  Export
                </button>
              </div>
            </div>
            
            {/* KPI Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {/* Total Invoiced */}
              <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100 dark:border-slate-800 hover:border-primary/30 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-primary">
                    <span className="material-symbols-outlined">receipt</span>
                  </div>
                  <span className="flex items-center text-xs font-bold text-success bg-success/10 px-2 py-1 rounded-full">+15%</span>
                </div>
                <p className="text-text-sub-light dark:text-text-sub-dark text-sm font-medium">Total Invoiced (MTD)</p>
                <h3 className="text-2xl font-bold text-text-main-light dark:text-text-main-dark mt-1">$1.2M</h3>
              </div>
              
              {/* Total Collected */}
              <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100 dark:border-slate-800 hover:border-primary/30 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg text-success">
                    <span className="material-symbols-outlined">savings</span>
                  </div>
                  <span className="flex items-center text-xs font-bold text-success bg-success/10 px-2 py-1 rounded-full">+5%</span>
                </div>
                <p className="text-text-sub-light dark:text-text-sub-dark text-sm font-medium">Total Collected</p>
                <h3 className="text-2xl font-bold text-text-main-light dark:text-text-main-dark mt-1">$850K</h3>
              </div>
              
              {/* Outstanding Amount */}
              <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100 dark:border-slate-800 hover:border-primary/30 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg text-warning">
                    <span className="material-symbols-outlined">pending_actions</span>
                  </div>
                  <span className="flex items-center text-xs font-bold text-warning bg-warning/10 px-2 py-1 rounded-full">High</span>
                </div>
                <p className="text-text-sub-light dark:text-text-sub-dark text-sm font-medium">Outstanding Amount</p>
                <h3 className="text-2xl font-bold text-text-main-light dark:text-text-main-dark mt-1">$350K</h3>
              </div>
              
              {/* Overdue Invoices */}
              <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100 dark:border-slate-800 hover:border-primary/30 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg text-danger">
                    <span className="material-symbols-outlined">warning</span>
                  </div>
                  <span className="flex items-center text-xs font-bold text-danger bg-danger/10 px-2 py-1 rounded-full">+10%</span>
                </div>
                <p className="text-text-sub-light dark:text-text-sub-dark text-sm font-medium">Overdue Invoices</p>
                <h3 className="text-2xl font-bold text-text-main-light dark:text-text-main-dark mt-1">12</h3>
              </div>
            </div>
            
            {/* Charts Section */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Invoice vs Collection Chart */}
              <div className="xl:col-span-2 bg-surface-light dark:bg-surface-dark rounded-xl p-6 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100 dark:border-slate-800">
                <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-text-main-light dark:text-text-main-dark">Invoice vs Collection</h3>
                    <p className="text-sm text-text-sub-light dark:text-text-sub-dark">Comparison of billed volume vs collected revenue</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <span className="text-xs text-text-sub-light dark:text-text-sub-dark">Invoiced</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-success"></div>
                      <span className="text-xs text-text-sub-light dark:text-text-sub-dark">Collected</span>
                    </div>
                  </div>
                </div>
                
                {/* Chart Area */}
                <div className="relative h-64 w-full">
                  <svg className="w-full h-full" viewBox="0 0 800 256">
                    {/* Grid lines */}
                    <line x1="0" y1="0" x2="800" y2="0" stroke="currentColor" strokeWidth="1" className="text-slate-200 dark:text-slate-700" strokeDasharray="4 4" />
                    <line x1="0" y1="64" x2="800" y2="64" stroke="currentColor" strokeWidth="1" className="text-slate-200 dark:text-slate-700" strokeDasharray="4 4" />
                    <line x1="0" y1="128" x2="800" y2="128" stroke="currentColor" strokeWidth="1" className="text-slate-200 dark:text-slate-700" strokeDasharray="4 4" />
                    <line x1="0" y1="192" x2="800" y2="192" stroke="currentColor" strokeWidth="1" className="text-slate-200 dark:text-slate-700" strokeDasharray="4 4" />
                    
                    {/* Invoiced line (blue) */}
                    <path
                      d="M 50,180 C 100,160 150,140 200,100 C 250,60 300,40 350,30 C 400,35 450,50 500,80 C 550,120 600,170 650,150 C 700,120 750,50 780,20"
                      fill="none"
                      stroke="#0651ED"
                      strokeWidth="3"
                      className="drop-shadow-lg"
                    />
                    
                    {/* Collected line (green) */}
                    <path
                      d="M 50,200 C 100,190 150,180 200,150 C 250,120 300,100 350,95 C 400,100 450,110 500,130 C 550,160 600,190 650,180 C 700,160 750,120 780,100"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="3"
                      strokeDasharray="5 5"
                    />
                    
                    {/* Month labels */}
                    <text x="50" y="245" className="text-xs fill-slate-400" textAnchor="middle">Week 1</text>
                    <text x="200" y="245" className="text-xs fill-slate-400" textAnchor="middle">Week 2</text>
                    <text x="500" y="245" className="text-xs fill-slate-400" textAnchor="middle">Week 3</text>
                    <text x="750" y="245" className="text-xs fill-slate-400" textAnchor="middle">Week 4</text>
                  </svg>
                </div>
              </div>
              
              {/* Aging Analysis */}
              <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100 dark:border-slate-800">
                <h3 className="text-lg font-bold text-text-main-light dark:text-text-main-dark mb-2">Aging Analysis</h3>
                <p className="text-sm text-text-sub-light dark:text-text-sub-dark mb-6">Breakdown of outstanding invoices by age.</p>
                
                {/* Donut Chart */}
                <div className="flex items-center justify-center mb-6">
                  <div className="relative w-48 h-48">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      {/* 0-30 Days - Blue (60%) */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#0651ED"
                        strokeWidth="20"
                        strokeDasharray="150.8 251.2"
                        strokeDashoffset="0"
                      />
                      {/* 31-60 Days - Orange (30%) */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#F59E0B"
                        strokeWidth="20"
                        strokeDasharray="75.4 326.6"
                        strokeDashoffset="-150.8"
                      />
                      {/* 60+ Days - Red (10%) */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#EF4444"
                        strokeWidth="20"
                        strokeDasharray="25.1 376.9"
                        strokeDashoffset="-226.2"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <p className="text-xs text-text-sub-light dark:text-text-sub-dark">Total Due</p>
                      <p className="text-xl font-bold text-text-main-light dark:text-text-main-dark">$350K</p>
                    </div>
                  </div>
                </div>
                
                {/* Legend */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <span className="text-sm text-text-main-light dark:text-text-main-dark">0-30 Days</span>
                    </div>
                    <span className="text-sm font-bold text-text-main-light dark:text-text-main-dark">60%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-warning"></div>
                      <span className="text-sm text-text-main-light dark:text-text-main-dark">31-60 Days</span>
                    </div>
                    <span className="text-sm font-bold text-text-main-light dark:text-text-main-dark">30%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-danger"></div>
                      <span className="text-sm text-text-main-light dark:text-text-main-dark">60+ Days</span>
                    </div>
                    <span className="text-sm font-bold text-text-main-light dark:text-text-main-dark">10%</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Top Organizations Outstanding */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-bold text-text-main-light dark:text-text-main-dark mb-6">Top Organizations Outstanding</h3>
              
              <div className="space-y-4">
                {/* IBM Corp */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-text-main-light dark:text-text-main-dark">IBM Corp.</span>
                  <span className="text-sm font-bold text-text-main-light dark:text-text-main-dark">$124,500</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{width: '100%'}}></div>
                </div>
                
                {/* Deloitte Consulting */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-text-main-light dark:text-text-main-dark">Deloitte Consulting</span>
                  <span className="text-sm font-bold text-text-main-light dark:text-text-main-dark">$86,200</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{width: '69%'}}></div>
                </div>
                
                {/* Accenture */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-text-main-light dark:text-text-main-dark">Accenture</span>
                  <span className="text-sm font-bold text-text-main-light dark:text-text-main-dark">$45,000</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{width: '36%'}}></div>
                </div>
                
                {/* Local Partners */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-text-main-light dark:text-text-main-dark">Local Partners</span>
                  <span className="text-sm font-bold text-text-main-light dark:text-text-main-dark">$22,100</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{width: '18%'}}></div>
                </div>
              </div>
            </div>
            
            {/* Send Reminders Card */}
            <div className="bg-primary rounded-xl p-6 text-white shadow-lg">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/20 rounded-lg">
                  <span className="material-symbols-outlined text-4xl">mark_email_unread</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Send Reminders</h3>
                  <p className="text-sm text-blue-100 mb-4">12 overdue invoices need attention.</p>
                  <button className="px-6 py-2.5 bg-white text-primary rounded-lg text-sm font-bold hover:bg-blue-50 transition-colors">
                    Review &amp; Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
