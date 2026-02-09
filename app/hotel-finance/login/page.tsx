import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Hotel Finance Login'
}

export default function HotelFinanceLoginPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50/40 to-white text-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-7 shadow-xl">
        <h1 className="text-lg font-semibold text-slate-900">Hotel Finance Login</h1>
        <form className="mt-5 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-widest text-slate-500" htmlFor="finance-email">
              Email
            </label>
            <input
              id="finance-email"
              name="email"
              type="email"
              placeholder="you@company.com"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 shadow-sm focus:border-amber-500 focus:ring-amber-500"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-widest text-slate-500" htmlFor="finance-password">
              Password
            </label>
            <input
              id="finance-password"
              name="password"
              type="password"
              placeholder="Password"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 shadow-sm focus:border-amber-500 focus:ring-amber-500"
            />
          </div>
          <div className="pt-1">
            <Link
              href="/hotel-finance"
              className="block w-full rounded-xl bg-amber-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-amber-500/30 transition hover:bg-amber-700"
            >
              Log in
            </Link>
          </div>
        </form>
      </div>
    </main>
  )
}
