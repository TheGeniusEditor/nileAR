import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Portal Selection'
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-main-light dark:text-text-main-dark">
            Choose Your Portal
          </h1>
          <p className="mt-2 text-sm sm:text-base text-text-sub-light dark:text-text-sub-dark">
            Two focused experiences. Pick the one you need.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Link
            href="/corporate-portal"
            className="group rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined">apartment</span>
              </div>
              <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </div>
            <h2 className="mt-5 text-lg font-bold text-text-main-light dark:text-text-main-dark">Corporate Portal</h2>
            <p className="mt-1 text-sm text-text-sub-light dark:text-text-sub-dark">TravelCorp Admin Dashboard</p>
          </Link>
          <Link
            href="/hotel-finance"
            className="group rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined">domain</span>
              </div>
              <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </div>
            <h2 className="mt-5 text-lg font-bold text-text-main-light dark:text-text-main-dark">Hotel Finance Portal</h2>
            <p className="mt-1 text-sm text-text-sub-light dark:text-text-sub-dark">Enterprise Finance Dashboard</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
