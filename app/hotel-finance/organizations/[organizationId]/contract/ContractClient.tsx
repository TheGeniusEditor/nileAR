"use client"

import Header from '@/app/components/Header'
import Sidebar from '@/app/components/Sidebar'
import { useState } from 'react'
import Link from 'next/link'
import ContractTemplate from './ContractTemplate'

interface ContractClientProps {
  organizationId: string
}

// Mock data - in production this would come from your database
const mockOrganizationData: Record<string, any> = {
  'ORG-001': {
    id: 'ORG-001',
    name: 'Acme Corp Hospitality',
    contactPerson: 'Subash Verma',
    companyAddress: 'NEAR AQUAGEL CHEMICALS, SURVEY NO 165, 166 /1-3, 167, 168, 171/1 AND 172, PADANA, GANDHIDHAM, Kachchh, Gujarat, 370240',
    billingAddress: 'Survey No. 166/1 & 3,171/1 & 172,167,168, Vill-Padana,Gandhidham',
    mobile: '9228772268',
    email: 'subhashkunal@rediffmail.com',
    gstNumber: '24AABCK8460A1ZX',
    panCard: 'AABCK8460A',
    creditPeriod: '30 Days',
    paymentTerms: 'Net 30',
  },
  'ORG-024': {
    id: 'ORG-024',
    name: 'Global Tech Solutions',
    contactPerson: 'Jane Smith',
    companyAddress: '123 Tech Park, Sector 5, Gurgaon, Haryana, 122001',
    billingAddress: '123 Tech Park, Sector 5, Gurgaon, Haryana, 122001',
    mobile: '9876543210',
    email: 'jane@globaltech.com',
    gstNumber: '07BBBBB1111B2Y6',
    panCard: 'BBBBB1111B',
    creditPeriod: '45 Days',
    paymentTerms: 'Net 45',
  }
}

export default function ContractClient({ organizationId }: ContractClientProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isConfiguring, setIsConfiguring] = useState(true)
  const [contractData, setContractData] = useState({
    hotelName: 'Radisson Resort & Spa',
    hotelLocation: 'Kandla',
    organizationName: mockOrganizationData[organizationId]?.name || '',
    contactPerson: mockOrganizationData[organizationId]?.contactPerson || '',
    companyAddress: mockOrganizationData[organizationId]?.companyAddress || '',
    billingAddress: mockOrganizationData[organizationId]?.billingAddress || '',
    mobile: mockOrganizationData[organizationId]?.mobile || '',
    email: mockOrganizationData[organizationId]?.email || '',
    gstNumber: mockOrganizationData[organizationId]?.gstNumber || '',
    panCard: mockOrganizationData[organizationId]?.panCard || '',
    validityFrom: '01 Jan 2026',
    validityTo: '31 Dec 2026',
    roomRates: [
      {
        roomType: 'Superior',
        inclusions: '• Buffet Breakfast at "Waves", our multi cuisine All Day Dining Coffee Shop • Complimentary Wi-Fi Internet in Guest Rooms • Complimentary Wireless Internet in all Public Areas • Exclusive usage of swimming pool & gymnasium',
        singleOccupancy: { ep: 5800, cp: 0, map: 0, ap: 0 },
        doubleOccupancy: { ep: 6300, cp: 0, map: 0, ap: 0 }
      },
      {
        roomType: 'Deluxe',
        inclusions: '• Buffet Breakfast at "Waves", our multi cuisine All Day Dining Coffee Shop • Complimentary Wi-Fi Internet in Guest Rooms • Complimentary Wireless Internet in all Public Areas • Exclusive usage of swimming pool & gymnasium',
        singleOccupancy: { ep: 6800, cp: 0, map: 0, ap: 0 },
        doubleOccupancy: { ep: 7300, cp: 0, map: 0, ap: 0 }
      },
      {
        roomType: 'Executive With Balcony',
        inclusions: '• Buffet Breakfast at "Waves", our multi cuisine All Day Dining Coffee Shop • Complimentary Wi-Fi Internet in Guest Rooms • Latest Rooms • Complimentary Wireless Internet in all Public Areas • Exclusive usage of swimming pool & gymnasium',
        singleOccupancy: { ep: 7800, cp: 0, map: 0, ap: 0 },
        doubleOccupancy: { ep: 8300, cp: 0, map: 0, ap: 0 }
      },
      {
        roomType: 'Villa King',
        inclusions: '• Buffet Breakfast at "Waves", our multi cuisine All Day Dining Coffee Shop • Complimentary Wi-Fi Internet in Guest Rooms • Complimentary Wireless Internet in all Public Areas • Exclusive usage of swimming pool & gymnasium',
        singleOccupancy: { ep: 5800, cp: 0, map: 0, ap: 0 },
        doubleOccupancy: { ep: 6300, cp: 0, map: 0, ap: 0 }
      },
      {
        roomType: 'Villa Garden',
        inclusions: '• Buffet Breakfast at "Waves", our multi cuisine All Day Dining Coffee Shop • Complimentary Wi-Fi Internet in Guest Rooms • Complimentary Wireless Internet in all Public Areas • Exclusive usage of swimming pool & gymnasium',
        singleOccupancy: { ep: 6800, cp: 0, map: 0, ap: 0 },
        doubleOccupancy: { ep: 7300, cp: 0, map: 0, ap: 0 }
      },
      {
        roomType: 'Villa Balcony',
        inclusions: '• Buffet Breakfast at "Waves", our multi cuisine All Day Dining Coffee Shop • Complimentary Wi-Fi Internet in Guest Rooms • Complimentary Wireless Internet in all Public Areas • Exclusive usage of swimming pool & gymnasium',
        singleOccupancy: { ep: 5800, cp: 0, map: 0, ap: 0 },
        doubleOccupancy: { ep: 6300, cp: 0, map: 0, ap: 0 }
      }
    ],
    extraBedCharge: 2500,
    lateCheckoutCharge: 2500,
    earlyCheckinCharge: 2500,
    extraPersonCharge: 1500,
    checkInTime: '1400 hours',
    checkOutTime: '1200 hours'
  })

  const [shareableLink, setShareableLink] = useState('')

  const generateShareableLink = () => {
    // Generate a unique link for digital signature
    const contractId = `CONTRACT-${organizationId}-${Date.now()}`
    const link = `${window.location.origin}/hotel-finance/organizations/${organizationId}/contract/sign/${contractId}`
    setShareableLink(link)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareableLink)
    alert('Link copied to clipboard!')
  }

  const sendEmail = () => {
    const subject = `Corporate Contract - ${contractData.organizationName}`
    const body = `Dear ${contractData.contactPerson},\n\nPlease review and digitally sign the corporate contract using the following link:\n\n${shareableLink}\n\nBest regards,\n${contractData.hotelName}`
    window.location.href = `mailto:${contractData.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark">
      <Sidebar title="Hotel Finance" logoIcon="domain" />
      
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        <Header />
        
        {/* Configuration Form - Full Page */}
        {isConfiguring && (
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-5xl mx-auto p-6">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Configure Contract</h1>
                <p className="text-slate-600 dark:text-slate-400">Enter contract details for {mockOrganizationData[organizationId]?.name || organizationId}</p>
              </div>

              {/* Configuration Form Sections */}
              <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6 space-y-6">
                {/* Hotel Information */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Hotel Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Hotel Name</label>
                      <input 
                        type="text" 
                        value={contractData.hotelName}
                        onChange={(e) => setContractData({...contractData, hotelName: e.target.value})}
                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Location</label>
                      <input 
                        type="text" 
                        value={contractData.hotelLocation}
                        onChange={(e) => setContractData({...contractData, hotelLocation: e.target.value})}
                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Contract Validity */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Contract Validity Period</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Valid From</label>
                      <input 
                        type="text" 
                        value={contractData.validityFrom}
                        onChange={(e) => setContractData({...contractData, validityFrom: e.target.value})}
                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Valid To</label>
                      <input 
                        type="text" 
                        value={contractData.validityTo}
                        onChange={(e) => setContractData({...contractData, validityTo: e.target.value})}
                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Charges */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Additional Charges</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Extra Bed (₹)</label>
                      <input 
                        type="number" 
                        value={contractData.extraBedCharge}
                        onChange={(e) => setContractData({...contractData, extraBedCharge: parseFloat(e.target.value)})}
                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Late Checkout (₹)</label>
                      <input 
                        type="number" 
                        value={contractData.lateCheckoutCharge}
                        onChange={(e) => setContractData({...contractData, lateCheckoutCharge: parseFloat(e.target.value)})}
                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Early Check-in (₹)</label>
                      <input 
                        type="number" 
                        value={contractData.earlyCheckinCharge}
                        onChange={(e) => setContractData({...contractData, earlyCheckinCharge: parseFloat(e.target.value)})}
                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Extra Person (₹)</label>
                      <input 
                        type="number" 
                        value={contractData.extraPersonCharge}
                        onChange={(e) => setContractData({...contractData, extraPersonCharge: parseFloat(e.target.value)})}
                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Check-in/Check-out Times */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Check-in/Check-out Times</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Check-in Time</label>
                      <input 
                        type="text" 
                        value={contractData.checkInTime}
                        onChange={(e) => setContractData({...contractData, checkInTime: e.target.value})}
                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Check-out Time</label>
                      <input 
                        type="text" 
                        value={contractData.checkOutTime}
                        onChange={(e) => setContractData({...contractData, checkOutTime: e.target.value})}
                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Room Rates Table */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Room Rates (EP Plan)</h3>
                  <div className="overflow-x-auto border border-slate-300 dark:border-slate-600 rounded-lg">
                    <table className="w-full">
                      <thead className="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                        <tr>
                          <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300 text-sm">Room Type</th>
                          <th className="px-4 py-3 text-center font-semibold text-slate-700 dark:text-slate-300 text-sm">Single (EP)</th>
                          <th className="px-4 py-3 text-center font-semibold text-slate-700 dark:text-slate-300 text-sm">Double (EP)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                        {contractData.roomRates.map((rate, index) => (
                          <tr key={index} className={index % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50 dark:bg-slate-800'}>
                            <td className="px-4 py-3 text-slate-900 dark:text-white font-medium">{rate.roomType}</td>
                            <td className="px-4 py-3">
                              <input 
                                type="number" 
                                value={rate.singleOccupancy.ep || ''}
                                onChange={(e) => {
                                  const newRates = [...contractData.roomRates]
                                  newRates[index].singleOccupancy.ep = parseFloat(e.target.value) || 0
                                  setContractData({...contractData, roomRates: newRates})
                                }}
                                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-center"
                              />
                            </td>
                            <td className="px-4 py-3">
                              <input 
                                type="number" 
                                value={rate.doubleOccupancy.ep || ''}
                                onChange={(e) => {
                                  const newRates = [...contractData.roomRates]
                                  newRates[index].doubleOccupancy.ep = parseFloat(e.target.value) || 0
                                  setContractData({...contractData, roomRates: newRates})
                                }}
                                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-center"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                  <button 
                    onClick={() => window.history.back()}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors font-medium"
                  >
                    <span className="material-symbols-outlined">arrow_back</span>
                    Cancel
                  </button>
                  <button 
                    onClick={() => setIsConfiguring(false)}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                  >
                    <span className="material-symbols-outlined">check_circle</span>
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Split View Layout - Shown After Configuration */}
        {!isConfiguring && (
        <div className="flex-1 flex gap-0 overflow-hidden">
          {/* Left Panel - Controls */}
          <div className="w-1/3 overflow-y-auto border-r border-slate-200 dark:border-slate-800">
            <div className="p-5">
              {/* Breadcrumbs */}
              <div className="flex flex-wrap gap-1 text-xs mb-4">
                <Link href="/hotel-finance" className="text-slate-500 hover:text-primary font-medium">Dashboard</Link>
                <span className="text-slate-400 font-medium">/</span>
                <Link href="/hotel-finance/organizations" className="text-slate-500 hover:text-primary font-medium">Organizations</Link>
                <span className="text-slate-400 font-medium">/</span>
                <Link href={`/hotel-finance/organizations/${organizationId}`} className="text-slate-500 hover:text-primary font-medium">{organizationId}</Link>
                <span className="text-slate-400 font-medium">/</span>
                <span className="text-slate-900 dark:text-slate-100 font-medium">Contract</span>
              </div>

              {/* Page Header */}
              <div className="mb-6">
                <h1 className="text-xl font-semibold text-slate-900 dark:text-white">{contractData.organizationName}</h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Corporate Contract Management</p>
              </div>

              {/* Status Cards */}
              <div className="space-y-2 mb-6">
                <div className="bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-3">
                  <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Contract Status</p>
                  <p className="text-sm font-semibold text-blue-600">Draft</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-3">
                  <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Valid Until</p>
                  <p className="text-sm font-semibold text-green-600">{contractData.validityTo}</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-3">
                  <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Signature Status</p>
                  <p className="text-sm font-semibold text-amber-600">Pending</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mb-6">
                {!isEditing && (
                  <>
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium transition-colors"
                    >
                      <span className="material-symbols-outlined text-[16px]">edit</span>
                      <span>Edit</span>
                    </button>
                    <button 
                      onClick={() => window.print()}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded text-xs font-medium transition-colors"
                    >
                      <span className="material-symbols-outlined text-[16px]">print</span>
                      <span>Print</span>
                    </button>
                  </>
                )}
                {isEditing && (
                  <>
                    <button 
                      onClick={() => setIsEditing(false)}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-500 hover:bg-slate-600 text-white rounded text-xs font-medium transition-colors"
                    >
                      <span className="material-symbols-outlined text-[16px]">close</span>
                      Cancel
                    </button>
                    <button 
                      onClick={() => {
                        setIsEditing(false)
                        alert('Contract saved successfully!')
                      }}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded text-xs font-medium transition-colors"
                    >
                      <span className="material-symbols-outlined text-[16px]">save</span>
                      Save
                    </button>
                  </>
                )}
              </div>

              {/* Share Contract Card */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-[20px] flex-shrink-0">share</span>
                  <div className="flex-1">
                    <h3 className="text-xs font-semibold text-slate-900 dark:text-white mb-1">Share for Signature</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">Generate a secure link to send to organization.</p>
                    
                    {!shareableLink ? (
                      <button 
                        onClick={generateShareableLink}
                        className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium transition-colors"
                      >
                        <span className="material-symbols-outlined text-[14px]">link</span>
                        Generate Link
                      </button>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 p-2 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                          <input 
                            type="text" 
                            value={shareableLink} 
                            readOnly 
                            className="flex-1 bg-transparent text-xs text-slate-700 dark:text-slate-300 outline-none"
                          />
                          <button 
                            onClick={copyToClipboard}
                            className="px-2 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded text-xs transition-colors"
                          >
                            <span className="material-symbols-outlined text-[14px]">content_copy</span>
                          </button>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={sendEmail}
                            className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded text-xs font-medium transition-colors"
                          >
                            <span className="material-symbols-outlined text-[14px]">email</span>
                            Email
                          </button>
                          <button 
                            onClick={() => setShareableLink('')}
                            className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 bg-slate-500 hover:bg-slate-600 text-white rounded text-xs font-medium transition-colors"
                          >
                            <span className="material-symbols-outlined text-[14px]">refresh</span>
                            New
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Edit Form */}
              {isEditing && (
                <div className="space-y-4">
                  {/* Hotel Information */}
                  <div>
                    <h3 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wide mb-2">Hotel Info</h3>
                    <div className="space-y-2">
                      <div>
                        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Hotel Name</label>
                        <input 
                          type="text" 
                          value={contractData.hotelName}
                          onChange={(e) => setContractData({...contractData, hotelName: e.target.value})}
                          className="w-full px-2 py-1.5 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Location</label>
                        <input 
                          type="text" 
                          value={contractData.hotelLocation}
                          onChange={(e) => setContractData({...contractData, hotelLocation: e.target.value})}
                          className="w-full px-2 py-1.5 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Validity Period */}
                  <div>
                    <h3 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wide mb-2">Validity</h3>
                    <div className="space-y-2">
                      <div>
                        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">From</label>
                        <input 
                          type="text" 
                          value={contractData.validityFrom}
                          onChange={(e) => setContractData({...contractData, validityFrom: e.target.value})}
                          className="w-full px-2 py-1.5 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">To</label>
                        <input 
                          type="text" 
                          value={contractData.validityTo}
                          onChange={(e) => setContractData({...contractData, validityTo: e.target.value})}
                          className="w-full px-2 py-1.5 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Additional Charges */}
                  <div>
                    <h3 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wide mb-2">Charges</h3>
                    <div className="space-y-2">
                      <div>
                        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Extra Bed (₹)</label>
                        <input 
                          type="number" 
                          value={contractData.extraBedCharge}
                          onChange={(e) => setContractData({...contractData, extraBedCharge: parseFloat(e.target.value)})}
                          className="w-full px-2 py-1.5 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Late Checkout (₹)</label>
                        <input 
                          type="number" 
                          value={contractData.lateCheckoutCharge}
                          onChange={(e) => setContractData({...contractData, lateCheckoutCharge: parseFloat(e.target.value)})}
                          className="w-full px-2 py-1.5 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Early Check-in (₹)</label>
                        <input 
                          type="number" 
                          value={contractData.earlyCheckinCharge}
                          onChange={(e) => setContractData({...contractData, earlyCheckinCharge: parseFloat(e.target.value)})}
                          className="w-full px-2 py-1.5 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Extra Person (₹)</label>
                        <input 
                          type="number" 
                          value={contractData.extraPersonCharge}
                          onChange={(e) => setContractData({...contractData, extraPersonCharge: parseFloat(e.target.value)})}
                          className="w-full px-2 py-1.5 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Check-in/Check-out */}
                  <div>
                    <h3 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wide mb-2">Times</h3>
                    <div className="space-y-2">
                      <div>
                        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Check-in</label>
                        <input 
                          type="text" 
                          value={contractData.checkInTime}
                          onChange={(e) => setContractData({...contractData, checkInTime: e.target.value})}
                          className="w-full px-2 py-1.5 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Check-out</label>
                        <input 
                          type="text" 
                          value={contractData.checkOutTime}
                          onChange={(e) => setContractData({...contractData, checkOutTime: e.target.value})}
                          className="w-full px-2 py-1.5 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Room Rates */}
                  <div>
                    <h3 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wide mb-2">Rates</h3>
                    <div className="overflow-x-auto border border-slate-300 dark:border-slate-600 rounded-lg max-h-40 overflow-y-auto text-xs">
                      <table className="w-full">
                        <thead className="bg-slate-100 dark:bg-slate-800 sticky top-0 border-b border-slate-200 dark:border-slate-700">
                          <tr>
                            <th className="px-2 py-1 text-left font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap">Room</th>
                            <th className="px-2 py-1 text-center font-semibold text-slate-700 dark:text-slate-300">EP(S)</th>
                            <th className="px-2 py-1 text-center font-semibold text-slate-700 dark:text-slate-300">EP(D)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                          {contractData.roomRates.map((rate, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50 dark:bg-slate-800'}>
                              <td className="px-2 py-1 text-slate-900 dark:text-white font-medium whitespace-nowrap">{rate.roomType}</td>
                              <td className="px-2 py-1">
                                <input 
                                  type="number" 
                                  value={rate.singleOccupancy.ep || ''}
                                  onChange={(e) => {
                                    const newRates = [...contractData.roomRates]
                                    newRates[index].singleOccupancy.ep = parseFloat(e.target.value) || 0
                                    setContractData({...contractData, roomRates: newRates})
                                  }}
                                  className="w-full px-1 py-0.5 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-center"
                                />
                              </td>
                              <td className="px-2 py-1">
                                <input 
                                  type="number" 
                                  value={rate.doubleOccupancy.ep || ''}
                                  onChange={(e) => {
                                    const newRates = [...contractData.roomRates]
                                    newRates[index].doubleOccupancy.ep = parseFloat(e.target.value) || 0
                                    setContractData({...contractData, roomRates: newRates})
                                  }}
                                  className="w-full px-1 py-0.5 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-center"
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Contract Preview */}
          <div className="flex-1 overflow-y-auto">
            <ContractTemplate data={contractData} showSignature={true} isPreview={false} />
          </div>
        </div>
        )}
      </main>
    </div>
  )
}
