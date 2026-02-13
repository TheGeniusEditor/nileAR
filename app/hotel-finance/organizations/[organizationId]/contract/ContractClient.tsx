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
  const [showPreview, setShowPreview] = useState(false)
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
        
        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl flex flex-col gap-6">
            {/* Breadcrumbs */}
            <div className="flex flex-wrap gap-2">
              <Link href="/hotel-finance" className="text-slate-500 hover:text-primary text-sm font-medium">Dashboard</Link>
              <span className="text-slate-400 text-sm font-medium">/</span>
              <Link href="/hotel-finance/organizations" className="text-slate-500 hover:text-primary text-sm font-medium">Organizations</Link>
              <span className="text-slate-400 text-sm font-medium">/</span>
              <Link href={`/hotel-finance/organizations/${organizationId}`} className="text-slate-500 hover:text-primary text-sm font-medium">{organizationId}</Link>
              <span className="text-slate-400 text-sm font-medium">/</span>
              <span className="text-slate-900 dark:text-slate-100 text-sm font-medium">Contract</span>
            </div>

            {/* Page Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Corporate Contract</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-2">{contractData.organizationName}</p>
              </div>
              <div className="flex gap-3">
                {!isEditing && (
                  <>
                    <button 
                      onClick={() => setShowPreview(!showPreview)}
                      className="flex items-center gap-2 px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {showPreview ? 'visibility_off' : 'visibility'}
                      </span>
                      <span className="font-medium">{showPreview ? 'Hide' : 'Preview'}</span>
                    </button>
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      <span className="material-symbols-outlined text-[20px]">edit</span>
                      <span className="font-medium">Edit Contract</span>
                    </button>
                  </>
                )}
                {isEditing && (
                  <>
                    <button 
                      onClick={() => setIsEditing(false)}
                      className="flex items-center gap-2 px-4 py-2 bg-slate-500 hover:bg-slate-600 text-white rounded-lg transition-colors"
                    >
                      <span className="material-symbols-outlined text-[20px]">close</span>
                      <span className="font-medium">Cancel</span>
                    </button>
                    <button 
                      onClick={() => {
                        setIsEditing(false)
                        alert('Contract saved successfully!')
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                    >
                      <span className="material-symbols-outlined text-[20px]">save</span>
                      <span className="font-medium">Save Contract</span>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Share Contract Card */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-[32px]">share</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Share Contract for Digital Signature</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">Generate a secure link to send to the organization for digital acceptance and signature.</p>
                  
                  {!shareableLink ? (
                    <button 
                      onClick={generateShareableLink}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      <span className="material-symbols-outlined text-[20px]">link</span>
                      <span className="font-medium">Generate Signature Link</span>
                    </button>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                        <span className="material-symbols-outlined text-green-600 text-[20px]">check_circle</span>
                        <input 
                          type="text" 
                          value={shareableLink} 
                          readOnly 
                          className="flex-1 bg-transparent text-sm text-slate-700 dark:text-slate-300 outline-none"
                        />
                        <button 
                          onClick={copyToClipboard}
                          className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded text-sm transition-colors"
                        >
                          <span className="material-symbols-outlined text-[18px]">content_copy</span>
                          Copy
                        </button>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={sendEmail}
                          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                        >
                          <span className="material-symbols-outlined text-[20px]">email</span>
                          <span className="font-medium">Send via Email</span>
                        </button>
                        <button 
                          onClick={() => setShareableLink('')}
                          className="flex items-center gap-2 px-4 py-2 bg-slate-500 hover:bg-slate-600 text-white rounded-lg transition-colors"
                        >
                          <span className="material-symbols-outlined text-[20px]">refresh</span>
                          <span className="font-medium">Generate New Link</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Contract Preview/Edit */}
            {showPreview && !isEditing && (
              <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg overflow-hidden">
                <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Contract Preview</h2>
                    <button 
                      onClick={() => window.print()}
                      className="flex items-center gap-2 px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors"
                    >
                      <span className="material-symbols-outlined text-[20px]">print</span>
                      <span className="font-medium">Print</span>
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <ContractTemplate data={contractData} showSignature={false} isPreview={true} />
                </div>
              </div>
            )}

            {/* Edit Form */}
            {isEditing && (
              <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Edit Contract Details</h2>
                
                <div className="space-y-6">
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
                          className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Location</label>
                        <input 
                          type="text" 
                          value={contractData.hotelLocation}
                          onChange={(e) => setContractData({...contractData, hotelLocation: e.target.value})}
                          className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Validity Period */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Contract Validity</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Valid From</label>
                        <input 
                          type="text" 
                          value={contractData.validityFrom}
                          onChange={(e) => setContractData({...contractData, validityFrom: e.target.value})}
                          className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Valid To</label>
                        <input 
                          type="text" 
                          value={contractData.validityTo}
                          onChange={(e) => setContractData({...contractData, validityTo: e.target.value})}
                          className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Additional Charges */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Additional Charges</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Extra Bed (₹)</label>
                        <input 
                          type="number" 
                          value={contractData.extraBedCharge}
                          onChange={(e) => setContractData({...contractData, extraBedCharge: parseFloat(e.target.value)})}
                          className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Late Checkout (₹)</label>
                        <input 
                          type="number" 
                          value={contractData.lateCheckoutCharge}
                          onChange={(e) => setContractData({...contractData, lateCheckoutCharge: parseFloat(e.target.value)})}
                          className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Early Checkin (₹)</label>
                        <input 
                          type="number" 
                          value={contractData.earlyCheckinCharge}
                          onChange={(e) => setContractData({...contractData, earlyCheckinCharge: parseFloat(e.target.value)})}
                          className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Extra Person (₹)</label>
                        <input 
                          type="number" 
                          value={contractData.extraPersonCharge}
                          onChange={(e) => setContractData({...contractData, extraPersonCharge: parseFloat(e.target.value)})}
                          className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Check-in/Check-out Times */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Check-in/Check-out</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Check-in Time</label>
                        <input 
                          type="text" 
                          value={contractData.checkInTime}
                          onChange={(e) => setContractData({...contractData, checkInTime: e.target.value})}
                          className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Check-out Time</label>
                        <input 
                          type="text" 
                          value={contractData.checkOutTime}
                          onChange={(e) => setContractData({...contractData, checkOutTime: e.target.value})}
                          className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Room Rates - Simplified for demo */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Room Rates</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Configure room types and rates in the table below</p>
                    <div className="overflow-x-auto border border-slate-300 dark:border-slate-600 rounded-lg">
                      <table className="w-full">
                        <thead className="bg-slate-100 dark:bg-slate-800">
                          <tr>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">Room Type</th>
                            <th className="px-4 py-2 text-center text-sm font-semibold text-slate-700 dark:text-slate-300">Single (EP)</th>
                            <th className="px-4 py-2 text-center text-sm font-semibold text-slate-700 dark:text-slate-300">Double (EP)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                          {contractData.roomRates.map((rate, index) => (
                            <tr key={index}>
                              <td className="px-4 py-2 text-sm text-slate-900 dark:text-white">{rate.roomType}</td>
                              <td className="px-4 py-2">
                                <input 
                                  type="number" 
                                  value={rate.singleOccupancy.ep || ''}
                                  onChange={(e) => {
                                    const newRates = [...contractData.roomRates]
                                    newRates[index].singleOccupancy.ep = parseFloat(e.target.value) || 0
                                    setContractData({...contractData, roomRates: newRates})
                                  }}
                                  className="w-full px-3 py-1.5 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-center text-sm"
                                />
                              </td>
                              <td className="px-4 py-2">
                                <input 
                                  type="number" 
                                  value={rate.doubleOccupancy.ep || ''}
                                  onChange={(e) => {
                                    const newRates = [...contractData.roomRates]
                                    newRates[index].doubleOccupancy.ep = parseFloat(e.target.value) || 0
                                    setContractData({...contractData, roomRates: newRates})
                                  }}
                                  className="w-full px-3 py-1.5 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-center text-sm"
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Contract Status */}
            {!isEditing && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="material-symbols-outlined text-blue-600 text-[24px]">description</span>
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Contract Status</span>
                  </div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">Draft</div>
                </div>
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="material-symbols-outlined text-green-600 text-[24px]">event_available</span>
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Valid Until</span>
                  </div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">{contractData.validityTo}</div>
                </div>
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="material-symbols-outlined text-amber-600 text-[24px]">pending</span>
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Signature Status</span>
                  </div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">Pending</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
