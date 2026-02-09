import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Corporate Portal Login'
}

export default function CorporateLoginPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-white text-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-7 shadow-xl">
        <h1 className="text-lg font-semibold text-slate-900">Corporate Portal Login</h1>
        <form className="mt-5 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-widest text-slate-500" htmlFor="corporate-email">
              Email
            </label>
            <input
              id="corporate-email"
              name="email"
              type="email"
              placeholder="you@company.com"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-widest text-slate-500" htmlFor="corporate-password">
              Password
            </label>
            <input
              id="corporate-password"
              name="password"
              type="password"
              placeholder="Password"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="pt-1">
            <Link
              href="/corporate-portal"
              className="block w-full rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-700"
            >
              Log in
            </Link>
          </div>
        </form>
      </div>
    </main>
  )
}
