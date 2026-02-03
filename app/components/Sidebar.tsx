"use client"

import Link from 'next/link'
import { useState } from 'react'

export interface SidebarProps {
  title: string
  logoIcon: string
}

export default function Sidebar({ title, logoIcon }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
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
            {title}
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
        <Link className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${isCollapsed ? 'justify-center' : ''}`} href="/hotel-finance/organizations">
          <span className="material-symbols-outlined text-[22px]">business_center</span>
          <p className={`text-sm font-medium transition-all ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>Organizations</p>
        </Link>
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
  )
}
