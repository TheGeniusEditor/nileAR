"use client"

import { useState } from 'react'

interface ContractGenerationModalProps {
  isOpen: boolean
  onClose: () => void
  organizationData: {
    id: string
    name: string
    contactPerson: string
    email: string
    mobile: string
    gstNumber: string
    panCard: string
    companyAddress: string
    billingAddress: string
  }
  onGenerate: (contractData: any) => void
}

export default function ContractGenerationModal({ 
  isOpen, 
  onClose, 
  organizationData,
  onGenerate
}: ContractGenerationModalProps) {
  const [contractData, setContractData] = useState({
    hotelName: 'Radisson Resort & Spa',
    hotelLocation: 'Kandla',
    validityFrom: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    validityTo: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    extraBedCharge: 2500,
    lateCheckoutCharge: 2500,
    earlyCheckinCharge: 2500,
    extraPersonCharge: 1500,
    checkInTime: '1400 hours',
    checkOutTime: '1200 hours',
    roomRates: [
      { roomType: 'Superior', singleEP: 5800, doubleEP: 6300 },
      { roomType: 'Deluxe', singleEP: 6800, doubleEP: 7300 },
      { roomType: 'Executive With Balcony', singleEP: 7800, doubleEP: 8300 },
      { roomType: 'Villa King', singleEP: 5800, doubleEP: 6300 },
      { roomType: 'Villa Garden', singleEP: 6800, doubleEP: 7300 },
      { roomType: 'Villa Balcony', singleEP: 5800, doubleEP: 6300 },
    ]
  })

  const handleGenerate = () => {
    const fullContractData = {
      ...contractData,
      organizationName: organizationData.name,
      contactPerson: organizationData.contactPerson,
      email: organizationData.email,
      mobile: organizationData.mobile,
      gstNumber: organizationData.gstNumber,
      panCard: organizationData.panCard,
      companyAddress: organizationData.companyAddress,
      billingAddress: organizationData.billingAddress,
      roomRates: contractData.roomRates.map(rate => ({
        roomType: rate.roomType,
        inclusions: '• Buffet Breakfast at "Waves", our multi cuisine All Day Dining Coffee Shop • Complimentary Wi-Fi Internet in Guest Rooms • Complimentary Wireless Internet in all Public Areas • Exclusive usage of swimming pool & gymnasium',
        singleOccupancy: { ep: rate.singleEP, cp: 0, map: 0, ap: 0 },
        doubleOccupancy: { ep: rate.doubleEP, cp: 0, map: 0, ap: 0 }
      }))
    }
    onGenerate(fullContractData)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Generate Contract</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Configure contract for {organizationData.name}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined text-slate-500">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
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
                    placeholder="01 Jan 2026"
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Valid To</label>
                  <input 
                    type="text" 
                    value={contractData.validityTo}
                    onChange={(e) => setContractData({...contractData, validityTo: e.target.value})}
                    placeholder="31 Dec 2026"
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Room Rates */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Room Rates (EP Plan)</h3>
              <div className="overflow-x-auto border border-slate-300 dark:border-slate-600 rounded-lg">
                <table className="w-full">
                  <thead className="bg-slate-100 dark:bg-slate-800">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">Room Type</th>
                      <th className="px-4 py-2 text-center text-sm font-semibold text-slate-700 dark:text-slate-300">Single (₹)</th>
                      <th className="px-4 py-2 text-center text-sm font-semibold text-slate-700 dark:text-slate-300">Double (₹)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {contractData.roomRates.map((rate, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 text-sm text-slate-900 dark:text-white">{rate.roomType}</td>
                        <td className="px-4 py-2">
                          <input 
                            type="number" 
                            value={rate.singleEP}
                            onChange={(e) => {
                              const newRates = [...contractData.roomRates]
                              newRates[index].singleEP = parseFloat(e.target.value) || 0
                              setContractData({...contractData, roomRates: newRates})
                            }}
                            className="w-full px-3 py-1.5 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-center text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <input 
                            type="number" 
                            value={rate.doubleEP}
                            onChange={(e) => {
                              const newRates = [...contractData.roomRates]
                              newRates[index].doubleEP = parseFloat(e.target.value) || 0
                              setContractData({...contractData, roomRates: newRates})
                            }}
                            className="w-full px-3 py-1.5 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-center text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Early Checkin (₹)</label>
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
                    placeholder="1400 hours"
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Check-out Time</label>
                  <input 
                    type="text" 
                    value={contractData.checkOutTime}
                    onChange={(e) => setContractData({...contractData, checkOutTime: e.target.value})}
                    placeholder="1200 hours"
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors font-medium"
          >
            Cancel
          </button>
          <button 
            onClick={handleGenerate}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium shadow-lg shadow-blue-500/20"
          >
            <span className="material-symbols-outlined text-[20px]">description</span>
            <span>Generate Contract</span>
          </button>
        </div>
      </div>
    </div>
  )
}
