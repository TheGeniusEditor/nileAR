"use client"

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { loginCorporate } from '@/lib/corporateAuth'

export default function CorporateLoginPage() {
  const router = useRouter()
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      await loginCorporate(userId, password)
      router.push('/corporate-portal')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed'
      setError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-white text-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-7 shadow-xl">
        <div className="mb-4">
          <Link
            className="inline-flex items-center gap-1 text-sm font-semibold text-slate-600 hover:text-blue-700"
            href="/"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Back to Landing Page</span>
          </Link>
        </div>
        <h1 className="text-lg font-semibold text-slate-900">Corporate Portal Login</h1>
        <p className="mt-1 text-sm text-slate-500">Use the generated organization credentials to continue.</p>
        <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-widest text-slate-500" htmlFor="corporate-user-id">
              User ID
            </label>
            <input
              id="corporate-user-id"
              name="userId"
              type="text"
              value={userId}
              onChange={(event) => setUserId(event.target.value)}
              placeholder="CORP-ABC123"
              required
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
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              required
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          {error && (
            <div className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">
              {error}
            </div>
          )}
          <div className="pt-1">
            <button
              type="submit"
              disabled={isSubmitting}
              className="block w-full rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? 'Signing in...' : 'Log in'}
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
