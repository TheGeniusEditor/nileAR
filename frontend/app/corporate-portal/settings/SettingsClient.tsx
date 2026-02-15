"use client"

import { useState } from "react"
import Sidebar from "@/app/components/Sidebar"
import Header from "@/app/components/Header"

export default function SettingsClient() {
  const [activeTab, setActiveTab] = useState("company-details")
  const [companyData, setCompanyData] = useState({
    name: "Acme Corporation",
    registrationNumber: "REG-2023-8899",
    address: "123 Innovation Drive, Tech Park, Silicon Valley, CA 94025",
    email: "billing@acmecorp.com",
    phone: "+1 (555) 012-3456",
  })
  const [taxId, setTaxId] = useState("9918USA29910Z1")
  const [notifications, setNotifications] = useState({
    invoiceAlerts: true,
    paymentReminders: true,
  })

  const handleCompanyDataChange = (field: string, value: string) => {
    setCompanyData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const authorizedPayers = [
    {
      id: 1,
      name: "John Doe",
      role: "Primary Admin",
      email: "admin@acme.com",
      status: "Active",
    },
    {
      id: 2,
      name: "Sarah Smith",
      role: "Finance Manager",
      email: "finance@acme.com",
      status: "Active",
    },
    {
      id: 3,
      name: "Mike Johnson",
      role: "Travel Coordinator",
      email: "travel@acme.com",
      status: "Inactive",
    },
  ]

  return (
    <div className="flex h-screen bg-background-light dark:bg-background-dark text-[#0d121b] dark:text-white">
      <Sidebar title="Corporate Portal" logoIcon="apartment" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <div className="py-8 px-4 sm:px-8 lg:px-40">
            <div className="mx-auto w-full max-w-7xl flex flex-col gap-6">
              {/* Breadcrumbs */}
              <nav className="flex items-center gap-2 text-sm text-[#4c669a] dark:text-gray-400">
                <a href="/corporate-portal" className="hover:text-primary transition-colors">
                  Home
                </a>
                <span className="material-symbols-outlined icon-sm">chevron_right</span>
                <span className="font-medium text-[#0d121b] dark:text-white">Settings</span>
              </nav>

              {/* Page Heading */}
              <div className="flex flex-wrap justify-between gap-4 mb-2">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-black leading-tight tracking-tight text-[#0d121b] dark:text-white">
                    Settings & Preferences
                  </h1>
                  <p className="mt-2 text-base text-[#4c669a] dark:text-gray-400 max-w-2xl">
                    Manage your company details, authorized payers, billing information, and notification settings for your corporate account.
                  </p>
                </div>
                <div className="flex items-end">
                  <button className="bg-white dark:bg-[#1C2636] text-[#0d121b] dark:text-white border border-[#e7ebf3] dark:border-[#2d3748] px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-2">
                    <span className="material-symbols-outlined icon-sm">help</span>
                    Support
                  </button>
                </div>
              </div>

              {/* Layout Grid: Sidebar + Content */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Sidebar Navigation */}
                <aside className="lg:col-span-3 sticky top-24">
                  <div className="bg-white dark:bg-[#1C2636] rounded-xl border border-[#e7ebf3] dark:border-[#2d3748] shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-[#e7ebf3] dark:border-[#2d3748] flex items-center gap-3">
                      <div
                        className="h-10 w-10 rounded-lg bg-cover bg-center"
                        style={{
                          backgroundImage:
                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAme94LaPscbDTTRfrCwBksil6HOGacmrwlCilgAEmS4GdfqjppEPrP64hccVFZrrYHtwCt9LP2cSJrRBDpJdSnKOBEnJcsxJBDR3BIp6D1aCHvpanEivMZFEGB6hR0rR51ou4xr3MiVim3AWXjwXGyJiOXTbXqAlYKXBCuaTNZz1ZaDNmFsBFbJYDu6EBb2pyec8FjhlCzF96NV8Sj6w0oPechgcwRvePvKQb4DpAcdS-RklkBqc5AH7VxoABUtE8SqiK3jKX3790")',
                        }}
                      ></div>
                      <div>
                        <p className="text-sm font-bold text-[#0d121b] dark:text-white">Acme Corp</p>
                        <p className="text-xs text-[#4c669a] dark:text-gray-400">Enterprise Account</p>
                      </div>
                    </div>
                    <nav className="flex flex-col p-2 gap-1">
                      <button
                        onClick={() => setActiveTab("company-details")}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                          activeTab === "company-details"
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-[#4c669a] dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-[#0d121b] dark:hover:text-white"
                        }`}
                      >
                        <span className="material-symbols-outlined icon-sm fill">business</span>
                        Company Details
                      </button>
                      <button
                        onClick={() => setActiveTab("authorized-payers")}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                          activeTab === "authorized-payers"
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-[#4c669a] dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-[#0d121b] dark:hover:text-white"
                        }`}
                      >
                        <span className="material-symbols-outlined icon-sm">group</span>
                        Authorized Payers
                      </button>
                      <button
                        onClick={() => setActiveTab("billing-tax")}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                          activeTab === "billing-tax"
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-[#4c669a] dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-[#0d121b] dark:hover:text-white"
                        }`}
                      >
                        <span className="material-symbols-outlined icon-sm">credit_card</span>
                        Billing & Tax
                      </button>
                      <button
                        onClick={() => setActiveTab("notifications")}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                          activeTab === "notifications"
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-[#4c669a] dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-[#0d121b] dark:hover:text-white"
                        }`}
                      >
                        <span className="material-symbols-outlined icon-sm">notifications</span>
                        Notifications
                      </button>
                    </nav>
                  </div>
                </aside>

                {/* Main Content */}
                <main className="lg:col-span-9 flex flex-col gap-6">
                  {/* Profile Header Card */}
                  <div className="bg-white dark:bg-[#1C2636] rounded-xl border border-[#e7ebf3] dark:border-[#2d3748] p-6 shadow-sm flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                    <div
                      className="h-24 w-24 sm:h-28 sm:w-28 flex-shrink-0 rounded-xl bg-cover bg-center border border-[#e7ebf3] dark:border-[#2d3748]"
                      style={{
                        backgroundImage:
                          'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBkzdmoO2Otao02007IYbh4-IXrDb-S8Fdg-9SsuxDWZxqu-HI_M6geb0Ue3250qXrQ9VvpkCJThzI_vTIuYZODXUHR3I_UQ3PRw-X96F7aCosvJ6jqcFvfXxOgh4WYnmPCHx9kZb4yTnrxWppP4j78eWUenclJ1a_lYeB2MMO4rOLH1VtwA2OcvR0Vjg-4BqHNeqQjrwuf5ROu7wxEW4FCCz4Og0d7Bq6BOEuLKMnbSaq-1X97_Zfq0NfmIn0LAwllV4VV05VIAj4")',
                      }}
                    ></div>
                    <div className="flex-1 text-center sm:text-left">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                        <div>
                          <h2 className="text-2xl font-bold text-[#0d121b] dark:text-white mb-1">Acme Corporation</h2>
                          <p className="text-[#4c669a] dark:text-gray-400 text-sm mb-4">
                            Client ID: <span className="font-mono text-[#0d121b] dark:text-gray-300">987654321</span> • Since 2018
                          </p>
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-semibold border border-green-100 dark:border-green-800">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            Active Account
                          </div>
                        </div>
                        <button className="text-primary text-sm font-medium hover:underline flex items-center gap-1 mx-auto sm:mx-0">
                          <span className="material-symbols-outlined icon-sm">edit</span>
                          Edit Profile
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Company Information Section */}
                  {activeTab === "company-details" && (
                    <section className="bg-white dark:bg-[#1C2636] rounded-xl border border-[#e7ebf3] dark:border-[#2d3748] shadow-sm">
                      <div className="p-6 border-b border-[#e7ebf3] dark:border-[#2d3748] flex justify-between items-center">
                        <h3 className="text-lg font-bold text-[#0d121b] dark:text-white">Company Information</h3>
                        <button className="text-sm font-semibold text-primary">Save Changes</button>
                      </div>
                      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-[#0d121b] dark:text-gray-300">Company Name</label>
                          <input
                            type="text"
                            value={companyData.name}
                            onChange={(e) => handleCompanyDataChange("name", e.target.value)}
                            className="w-full rounded-lg border border-[#e7ebf3] dark:border-[#2d3748] bg-[#f8f9fc] dark:bg-[#101622] px-3 py-2.5 text-sm text-[#0d121b] dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-[#0d121b] dark:text-gray-300">Registration Number</label>
                          <input
                            type="text"
                            value={companyData.registrationNumber}
                            onChange={(e) => handleCompanyDataChange("registrationNumber", e.target.value)}
                            className="w-full rounded-lg border border-[#e7ebf3] dark:border-[#2d3748] bg-[#f8f9fc] dark:bg-[#101622] px-3 py-2.5 text-sm text-[#0d121b] dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-sm font-medium text-[#0d121b] dark:text-gray-300">Registered Address</label>
                          <input
                            type="text"
                            value={companyData.address}
                            onChange={(e) => handleCompanyDataChange("address", e.target.value)}
                            className="w-full rounded-lg border border-[#e7ebf3] dark:border-[#2d3748] bg-[#f8f9fc] dark:bg-[#101622] px-3 py-2.5 text-sm text-[#0d121b] dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-[#0d121b] dark:text-gray-300">Contact Email</label>
                          <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400 icon-sm">mail</span>
                            <input
                              type="email"
                              value={companyData.email}
                              onChange={(e) => handleCompanyDataChange("email", e.target.value)}
                              className="w-full pl-10 rounded-lg border border-[#e7ebf3] dark:border-[#2d3748] bg-[#f8f9fc] dark:bg-[#101622] px-3 py-2.5 text-sm text-[#0d121b] dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-[#0d121b] dark:text-gray-300">Phone Number</label>
                          <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400 icon-sm">call</span>
                            <input
                              type="tel"
                              value={companyData.phone}
                              onChange={(e) => handleCompanyDataChange("phone", e.target.value)}
                              className="w-full pl-10 rounded-lg border border-[#e7ebf3] dark:border-[#2d3748] bg-[#f8f9fc] dark:bg-[#101622] px-3 py-2.5 text-sm text-[#0d121b] dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                            />
                          </div>
                        </div>
                      </div>
                    </section>
                  )}

                  {/* Billing & Tax Section */}
                  {activeTab === "billing-tax" && (
                    <section className="bg-white dark:bg-[#1C2636] rounded-xl border border-[#e7ebf3] dark:border-[#2d3748] shadow-sm">
                      <div className="p-6 border-b border-[#e7ebf3] dark:border-[#2d3748]">
                        <h3 className="text-lg font-bold text-[#0d121b] dark:text-white">Billing & Tax</h3>
                        <p className="text-sm text-[#4c669a] dark:text-gray-400 mt-1">Manage your tax identification and payment methods.</p>
                      </div>
                      <div className="p-6 space-y-6">
                        <div className="flex flex-col md:flex-row gap-4 items-end">
                          <div className="flex-1 space-y-2 w-full">
                            <label className="text-sm font-medium text-[#0d121b] dark:text-gray-300">GSTIN / VAT Number</label>
                            <div className="relative">
                              <input
                                type="text"
                                value={taxId}
                                onChange={(e) => setTaxId(e.target.value)}
                                className="w-full rounded-lg border border-green-500 bg-green-50 dark:bg-green-900/10 px-3 py-2.5 text-sm text-[#0d121b] dark:text-white focus:outline-none transition-all"
                              />
                              <span className="material-symbols-outlined absolute right-3 top-2.5 text-green-600 icon-sm">check_circle</span>
                            </div>
                            <p className="text-xs text-green-600 font-medium">Verified Tax ID</p>
                          </div>
                          <button className="h-[42px] px-4 rounded-lg border border-[#e7ebf3] dark:border-[#2d3748] text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                            Request Update
                          </button>
                        </div>
                        <hr className="border-[#e7ebf3] dark:border-[#2d3748]" />
                        <div>
                          <div className="flex justify-between items-center mb-4">
                            <h4 className="text-sm font-bold text-[#0d121b] dark:text-white">Payment Methods</h4>
                            <div className="flex items-center gap-1 text-[#4c669a] dark:text-gray-400 text-xs">
                              <span className="material-symbols-outlined icon-sm">lock</span>
                              Secure Payment
                            </div>
                          </div>
                          <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between p-4 rounded-lg border border-[#e7ebf3] dark:border-[#2d3748] bg-[#f8f9fc] dark:bg-[#101622]">
                              <div className="flex items-center gap-4">
                                <div className="h-10 w-14 bg-white dark:bg-gray-700 rounded border border-[#e7ebf3] dark:border-gray-600 flex items-center justify-center">
                                  <img
                                    alt="Mastercard Logo"
                                    className="h-6"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPPSiJNM_Vi0G2BonCVXiE2X86CzxhrEuQdx2rCghiyQbtqul5moAkNoeziwCr5UUBh0iUK7f9oMI-M_7opA-RkSSbkigfQ8ctThwcDHg7jnAtoRk8wrjhTb6Ug0LxwUlsBjyuLuNx04ucl8mvfyJhGuht_DOe2NL7PTlYgU813i62Vj9HLIDsDLT88U40dq1JwO_bID9JOK98iFluVOKV4_H3h1CMu24cpmyWmKWcc7J9gA_ZUIke9X7qMGy9uFZ4jxUo0Todj2U"
                                  />
                                </div>
                                <div>
                                  <p className="text-sm font-semibold text-[#0d121b] dark:text-white">Mastercard ending in 8834</p>
                                  <p className="text-xs text-[#4c669a] dark:text-gray-400">Expires 12/25 • Default</p>
                                </div>
                              </div>
                              <button className="text-sm font-medium text-[#4c669a] dark:text-gray-400 hover:text-primary transition-colors">Edit</button>
                            </div>
                            <button className="flex items-center justify-center gap-2 w-full py-3 rounded-lg border border-dashed border-[#4c669a] text-[#4c669a] dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-primary hover:text-primary transition-all text-sm font-medium">
                              <span className="material-symbols-outlined icon-sm">add</span>
                              Add New Payment Method
                            </button>
                          </div>
                        </div>
                      </div>
                    </section>
                  )}

                  {/* Authorized Payers Section */}
                  {activeTab === "authorized-payers" && (
                    <section className="bg-white dark:bg-[#1C2636] rounded-xl border border-[#e7ebf3] dark:border-[#2d3748] shadow-sm">
                      <div className="p-6 border-b border-[#e7ebf3] dark:border-[#2d3748] flex flex-wrap gap-4 justify-between items-center">
                        <div>
                          <h3 className="text-lg font-bold text-[#0d121b] dark:text-white">Authorized Payers</h3>
                          <p className="text-sm text-[#4c669a] dark:text-gray-400 mt-1">Personnel authorized to book stays and process invoices.</p>
                        </div>
                        <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-lg shadow-primary/20">
                          <span className="material-symbols-outlined icon-sm">person_add</span>
                          Add Payer
                        </button>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-[#f8f9fc] dark:bg-[#101622] text-[#4c669a] dark:text-gray-400 text-xs uppercase tracking-wider font-semibold border-b border-[#e7ebf3] dark:border-[#2d3748]">
                              <th className="p-4">Name</th>
                              <th className="p-4">Role</th>
                              <th className="p-4">Email</th>
                              <th className="p-4">Status</th>
                              <th className="p-4 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#e7ebf3] dark:divide-[#2d3748] text-sm">
                            {authorizedPayers.map((payer) => (
                              <tr key={payer.id} className="group hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                <td className="p-4 font-medium text-[#0d121b] dark:text-white">{payer.name}</td>
                                <td className="p-4 text-[#4c669a] dark:text-gray-400">{payer.role}</td>
                                <td className="p-4 text-[#4c669a] dark:text-gray-400">{payer.email}</td>
                                <td className="p-4">
                                  <span
                                    className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                                      payer.status === "Active"
                                        ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                                        : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                                    }`}
                                  >
                                    {payer.status}
                                  </span>
                                </td>
                                <td className="p-4 text-right">
                                  <button className="text-[#4c669a] hover:text-primary transition-colors">
                                    <span className="material-symbols-outlined icon-sm">more_vert</span>
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="p-4 border-t border-[#e7ebf3] dark:border-[#2d3748] bg-[#f8f9fc] dark:bg-[#101622] rounded-b-xl flex justify-center">
                        <button className="text-sm font-medium text-[#4c669a] hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors">
                          View All Payers
                        </button>
                      </div>
                    </section>
                  )}

                  {/* Notifications Section */}
                  {activeTab === "notifications" && (
                    <section className="bg-white dark:bg-[#1C2636] rounded-xl border border-[#e7ebf3] dark:border-[#2d3748] shadow-sm mb-10">
                      <div className="p-6 border-b border-[#e7ebf3] dark:border-[#2d3748]">
                        <h3 className="text-lg font-bold text-[#0d121b] dark:text-white">Notification Preferences</h3>
                        <p className="text-sm text-[#4c669a] dark:text-gray-400 mt-1">Choose how and when you want to be notified.</p>
                      </div>
                      <div className="p-6 flex flex-col gap-6">
                        {/* Invoice Alerts */}
                        <div className="flex items-center justify-between">
                          <div className="flex gap-4">
                            <div className="h-10 w-10 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center">
                              <span className="material-symbols-outlined icon-sm">receipt_long</span>
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[#0d121b] dark:text-white">New Invoice Generated</p>
                              <p className="text-xs text-[#4c669a] dark:text-gray-400">Receive an email when a new invoice is ready for payment.</p>
                            </div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={notifications.invoiceAlerts}
                              onChange={(e) => setNotifications({ ...notifications, invoiceAlerts: e.target.checked })}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                          </label>
                        </div>
                        <hr className="border-[#e7ebf3] dark:border-[#2d3748]" />

                        {/* Due Date Reminders */}
                        <div className="flex items-center justify-between">
                          <div className="flex gap-4">
                            <div className="h-10 w-10 rounded-full bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 flex items-center justify-center">
                              <span className="material-symbols-outlined icon-sm">event_upcoming</span>
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[#0d121b] dark:text-white">Payment Due Reminders</p>
                              <p className="text-xs text-[#4c669a] dark:text-gray-400">Get reminded 3 days before an invoice is due.</p>
                            </div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={notifications.paymentReminders}
                              onChange={(e) => setNotifications({ ...notifications, paymentReminders: e.target.checked })}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                          </label>
                        </div>
                      </div>
                    </section>
                  )}
                </main>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
