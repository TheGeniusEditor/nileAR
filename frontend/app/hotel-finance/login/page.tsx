"use client"

import { useState } from "react"
import type { FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { login } from "@/lib/auth"

export default function HotelFinanceLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      await login(email, password)
      router.push("/hotel-finance")
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed"
      setError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50/40 to-white text-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-7 shadow-xl">
        <div className="mb-4">
          <Link
            className="inline-flex items-center gap-1 text-sm font-semibold text-slate-600 hover:text-amber-700"
            href="/"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Back to Landing Page</span>
          </Link>
        </div>
        <h1 className="text-lg font-semibold text-slate-900">Hotel Finance Login</h1>
        <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-widest text-slate-500" htmlFor="finance-email">
              Email
            </label>
            <input
              id="finance-email"
              name="email"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
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
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 shadow-sm focus:border-amber-500 focus:ring-amber-500"
            />
          </div>
          {error && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="block w-full rounded-xl bg-amber-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-amber-500/30 transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Signing in..." : "Log in"}
          </button>
        </form>
        <p className="mt-4 text-sm text-slate-500">
          New to Hotel Finance?{" "}
          <Link className="font-semibold text-amber-600 hover:text-amber-700" href="/hotel-finance/register">
            Create an account
          </Link>
        </p>
      </div>
    </main>
  )
}
