"use client"

import Header from '@/app/components/Header'
import Sidebar from '@/app/components/Sidebar'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import ContractGenerationModal from './ContractGenerationModal'

const organizationsData = [
  {
    id: 'ORG-001',
    name: 'Acme Corp Hospitality',
    icon: 'apartment',
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-700',
    darkBgColor: 'dark:bg-blue-900/30',
    darkIconColor: 'dark:text-blue-300',
    gst: '27AAAAA0000A1Z5',
    creditPeriod: '30 Days',
    paymentTerms: 'Net 30',
    status: 'active',
    amountReceived: 245000,
    pendingPayment: 55000
  },
  {
    id: 'ORG-024',
    name: 'Global Tech Solutions',
    icon: 'business',
    bgColor: 'bg-indigo-100',
    iconColor: 'text-indigo-700',
    darkBgColor: 'dark:bg-indigo-900/30',
    darkIconColor: 'dark:text-indigo-300',
    gst: '07BBBBB1111B2Y6',
    creditPeriod: '45 Days',
    paymentTerms: 'Net 45',
    status: 'active',
    amountReceived: 180000,
    pendingPayment: 20000
  },
  {
    id: 'ORG-052',
    name: 'Zenith Travel Partners',
    icon: 'flight',
    bgColor: 'bg-orange-100',
    iconColor: 'text-orange-700',
    darkBgColor: 'dark:bg-orange-900/30',
    darkIconColor: 'dark:text-orange-300',
    gst: '33CCCCC2222C3X7',
    creditPeriod: '15 Days',
    paymentTerms: 'Immediate',
    status: 'on-hold',
    amountReceived: 95000,
    pendingPayment: 65000
  },
  {
    id: 'ORG-089',
    name: 'Apex Logistics',
    icon: 'local_shipping',
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-700',
    darkBgColor: 'dark:bg-purple-900/30',
    darkIconColor: 'dark:text-purple-300',
    gst: '19DDDDD3333D4W8',
    creditPeriod: '60 Days',
    paymentTerms: 'Net 60',
    status: 'active',
    amountReceived: 320000,
    pendingPayment: 0
  },
  {
    id: 'ORG-102',
    name: 'Summit Events',
    icon: 'event',
    bgColor: 'bg-teal-100',
    iconColor: 'text-teal-700',
    darkBgColor: 'dark:bg-teal-900/30',
    darkIconColor: 'dark:text-teal-300',
    gst: '22EEEEE4444E5V9',
    creditPeriod: '30 Days',
    paymentTerms: 'Net 30',
    status: 'active',
    amountReceived: 152000,
    pendingPayment: 28000
  }
]

export default function OrganizationsClient() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [showContractModal, setShowContractModal] = useState(false)
  const [selectedOrganization, setSelectedOrganization] = useState<any>(null)

  const filteredOrganizations = organizationsData.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         org.gst.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = !statusFilter || org.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleGenerateContract = (org: any) => {
    setSelectedOrganization({
      id: org.id,
      name: org.name,
      contactPerson: 'John Doe', // In production, this would come from org data
      email: 'contact@company.com',
      mobile: '9876543210',
      gstNumber: org.gst,
      panCard: org.gst.substring(2, 12),
      companyAddress: '123 Business Street, City, State, PIN',
      billingAddress: '123 Business Street, City, State, PIN'
    })
    setShowContractModal(true)
  }

  const handleContractGenerated = (contractData: any) => {
    console.log('Contract generated:', contractData)
    
    // Close modal and redirect to contract page
    setShowContractModal(false)
    setSelectedOrganization(null)
    
    // Navigate to the contract page for this organization
    router.push(`/hotel-finance/organizations/${selectedOrganization.id}/contract`)
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark">
      <Sidebar title="Hotel Finance" logoIcon="domain" />
      
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        <Header />
        
        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 scroll-smooth">
          <div className="mx-auto max-w-7xl flex flex-col gap-6">
            {/* Breadcrumbs */}
            <div className="flex flex-wrap gap-2">
              <a className="text-slate-500 hover:text-primary text-sm font-medium leading-normal" href="#">Dashboard</a>
              <span className="text-slate-400 text-sm font-medium leading-normal">/</span>
              <span className="text-slate-900 dark:text-slate-100 text-sm font-medium leading-normal">Organizations</span>
            </div>

            {/* Page Heading & Actions */}
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div className="flex min-w-72 flex-col gap-2">
                <h1 className="text-slate-900 dark:text-white text-3xl font-extrabold leading-tight tracking-[-0.033em]">Corporate Organizations</h1>
                <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal">Manage corporate billing accounts, credit limits, and invoice details.</p>
              </div>
              <button className="flex h-11 items-center justify-center rounded-lg bg-primary px-5 text-white shadow-sm shadow-blue-500/20 transition-all hover:bg-blue-600 focus:ring-4 focus:ring-blue-500/30">
                <span className="material-symbols-outlined mr-2 text-[20px]">add</span>
                <span className="text-sm font-bold leading-normal">Register New Organization</span>
              </button>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-wrap items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="relative flex min-w-[280px] flex-1">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <span className="material-symbols-outlined">search</span>
                </span>
                <input 
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-base text-slate-900 placeholder-slate-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500" 
                  placeholder="Search by name or GST..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-3">
                <div className="relative min-w-[180px]">
                  <select 
                    className="w-full appearance-none rounded-lg border border-slate-200 bg-slate-50 py-3 pl-4 pr-10 text-base text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="">Filter by Status</option>
                    <option value="active">Active</option>
                    <option value="on-hold">On Hold</option>
                    <option value="inactive">Inactive</option>
                  </select>
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
                    <span className="material-symbols-outlined">expand_more</span>
                  </span>
                </div>
                <button className="flex h-[50px] w-[50px] items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700">
                  <span className="material-symbols-outlined">tune</span>
                </button>
              </div>
            </div>

            {/* Data Table */}
            <div className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px]">
                  <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50">
                    <tr>
                      <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Organization Name</th>
                      <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">GST Number</th>
                      <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Credit Period</th>
                      <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Payment Terms</th>
                      <th className="whitespace-nowrap px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {filteredOrganizations.map((org) => (
                      <tr key={org.id} className="group cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="px-6 py-4">
                          <Link href={`/hotel-finance/organizations/${org.id}`} className="flex items-center gap-3">
                            <div className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${org.bgColor} ${org.iconColor} ${org.darkBgColor} ${org.darkIconColor}`}>
                              <span className="material-symbols-outlined">{org.icon}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{org.name}</span>
                              <span className="text-xs text-slate-500 dark:text-slate-400">ID: {org.id}</span>
                            </div>
                          </Link>
                        </td>
                        <td className="px-6 py-4">
                          <Link href={`/hotel-finance/organizations/${org.id}`} className="block">
                            <span className="font-mono text-sm text-slate-600 dark:text-slate-300">{org.gst}</span>
                          </Link>
                        </td>
                        <td className="px-6 py-4">
                          <Link href={`/hotel-finance/organizations/${org.id}`} className="block">
                            <span className="text-sm text-slate-600 dark:text-slate-300">{org.creditPeriod}</span>
                          </Link>
                        </td>
                        <td className="px-6 py-4">
                          <Link href={`/hotel-finance/organizations/${org.id}`} className="block">
                            <span className="text-sm text-slate-600 dark:text-slate-300">{org.paymentTerms}</span>
                          </Link>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={(e) => {
                                e.preventDefault()
                                handleGenerateContract(org)
                              }}
                              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
                              title="Generate Contract"
                            >
                              <span className="material-symbols-outlined text-[18px]">description</span>
                              <span>Generate Contract</span>
                            </button>
                            <Link
                              href={`/hotel-finance/organizations/${org.id}`}
                              className="flex items-center gap-2 px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors text-sm font-medium"
                              title="Manage Contact"
                            >
                              <span className="material-symbols-outlined text-[18px]">person</span>
                              <span>Manage Contact</span>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200 bg-white px-6 py-4 dark:border-slate-800 dark:bg-slate-900 sm:flex-row">
                <span className="text-sm text-slate-500 dark:text-slate-400">Showing <span className="font-semibold text-slate-900 dark:text-white">1</span> to <span className="font-semibold text-slate-900 dark:text-white">{filteredOrganizations.length}</span> of <span className="font-semibold text-slate-900 dark:text-white">48</span> results</span>
                <div className="flex items-center gap-1">
                  <button className="flex size-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-700 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700">
                    <span className="material-symbols-outlined text-sm">chevron_left</span>
                  </button>
                  <div className="flex gap-1">
                    <button className="flex size-9 items-center justify-center rounded-lg bg-primary text-sm font-medium text-white shadow-sm">1</button>
                    <button className="flex size-9 items-center justify-center rounded-lg bg-transparent text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">2</button>
                    <button className="flex size-9 items-center justify-center rounded-lg bg-transparent text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">3</button>

      {/* Contract Generation Modal */}
      {selectedOrganization && (
        <ContractGenerationModal
          isOpen={showContractModal}
          onClose={() => {
            setShowContractModal(false)
            setSelectedOrganization(null)
          }}
          organizationData={selectedOrganization}
          onGenerate={handleContractGenerated}
        />
      )}
                    <span className="flex size-9 items-center justify-center text-sm text-slate-400">...</span>
                    <button className="flex size-9 items-center justify-center rounded-lg bg-transparent text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">10</button>
                  </div>
                  <button className="flex size-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700">
                    <span className="material-symbols-outlined text-sm">chevron_right</span>
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
