import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Portal Selection'
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background-light via-blue-50 to-background-light dark:from-background-dark dark:via-slate-900 dark:to-background-dark flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="w-full max-w-5xl relative z-10">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="material-symbols-outlined text-primary text-[20px]">AR</span>
            <p className="text-sm font-semibold text-primary">Welcome to Your Gateway</p>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-600 to-primary mb-4">
            Choose Your Portal
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-[#4c669a] dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Access powerful business management tools tailored to your needs. Select your portal to get started.
          </p>
        </div>

        {/* Portal Cards Grid */}
        <div className="grid gap-8 sm:grid-cols-2 mb-12">
          {/* Corporate Portal Card */}
          <Link
            href="/corporate-portal"
            className="group relative rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2"
          >
            {/* Card Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-white to-blue-50 dark:from-[#1C2636] dark:to-slate-800 rounded-3xl"></div>
            
            {/* Border Gradient */}
            <div className="absolute inset-0 rounded-3xl p-0.5 bg-gradient-to-br from-primary/40 via-blue-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0.5 bg-gradient-to-br from-white to-blue-50 dark:from-[#1C2636] dark:to-slate-800 rounded-[22px]"></div>
            </div>

            {/* Shadow Effect */}
            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 shadow-2xl shadow-primary/20 transition-all duration-500 pointer-events-none"></div>

            {/* Content */}
            <div className="relative p-8 sm:p-10 h-full flex flex-col justify-between min-h-64">
              {/* Top Section */}
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="size-16 sm:size-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <span className="material-symbols-outlined text-4xl sm:text-5xl">apartment</span>
                  </div>
                  <div className="size-10 sm:size-12 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:translate-x-2 transition-all duration-500 group-hover:bg-primary group-hover:text-white">
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </div>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-[#0d121b] dark:text-white mb-3">Corporate Portal</h2>
                <p className="text-[#4c669a] dark:text-gray-400 text-base mb-6">Manage employee stays, invoices, and business operations with comprehensive admin controls.</p>
              </div>

              {/* Features List */}
              <div className="space-y-3 pt-6 border-t border-[#e7ebf3] dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                  <span className="text-sm text-[#4c669a] dark:text-gray-400">Employee Stay Management</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                  <span className="text-sm text-[#4c669a] dark:text-gray-400">Invoice & Billing</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                  <span className="text-sm text-[#4c669a] dark:text-gray-400">Advanced Reporting</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Hotel Finance Portal Card */}
          <Link
            href="/hotel-finance"
            className="group relative rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2"
          >
            {/* Card Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-white to-emerald-50 dark:from-[#1C2636] dark:to-slate-800 rounded-3xl"></div>
            
            {/* Border Gradient */}
            <div className="absolute inset-0 rounded-3xl p-0.5 bg-gradient-to-br from-emerald-400/40 via-emerald-300/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0.5 bg-gradient-to-br from-white to-emerald-50 dark:from-[#1C2636] dark:to-slate-800 rounded-[22px]"></div>
            </div>

            {/* Shadow Effect */}
            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 shadow-2xl shadow-emerald-500/20 transition-all duration-500 pointer-events-none"></div>

            {/* Content */}
            <div className="relative p-8 sm:p-10 h-full flex flex-col justify-between min-h-64">
              {/* Top Section */}
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="size-16 sm:size-20 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <span className="material-symbols-outlined text-4xl sm:text-5xl">domain</span>
                  </div>
                  <div className="size-10 sm:size-12 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center group-hover:translate-x-2 transition-all duration-500 group-hover:bg-emerald-600 group-hover:text-white">
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </div>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-[#0d121b] dark:text-white mb-3">Hotel Finance Portal</h2>
                <p className="text-[#4c669a] dark:text-gray-400 text-base mb-6">Track hotel operations, manage finances, and monitor organizational performance in real-time.</p>
              </div>

              {/* Features List */}
              <div className="space-y-3 pt-6 border-t border-[#e7ebf3] dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-emerald-600 text-[18px]">check_circle</span>
                  <span className="text-sm text-[#4c669a] dark:text-gray-400">Financial Analytics</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-emerald-600 text-[18px]">check_circle</span>
                  <span className="text-sm text-[#4c669a] dark:text-gray-400">Organization Management</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-emerald-600 text-[18px]">check_circle</span>
                  <span className="text-sm text-[#4c669a] dark:text-gray-400">Performance Metrics</span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Footer Info */}
        <div className="text-center">
          <p className="text-sm text-[#4c669a] dark:text-gray-400 flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[18px]">shield</span>
            <span>Enterprise-grade security | Secure access | Encrypted data</span>
          </p>
        </div>
      </div>
    </div>
  )
}
