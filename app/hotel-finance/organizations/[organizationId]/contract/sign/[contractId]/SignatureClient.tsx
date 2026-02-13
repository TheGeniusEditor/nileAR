"use client"

import { useState, useRef, useEffect } from 'react'
import ContractTemplate from '../../ContractTemplate'

interface SignatureClientProps {
  organizationId: string
  contractId: string
}

// Mock contract data - in production this would be fetched based on contractId
const mockContractData = {
  hotelName: 'Radisson Resort & Spa',
  hotelLocation: 'Kandla',
  organizationName: 'Kutch Chemical Industries Ltd',
  contactPerson: 'Subash K Verma',
  companyAddress: 'NEAR AQUAGEL CHEMICALS, SURVEY NO 165, 166 /1-3, 167, 168, 171/1 AND 172, PADANA, GANDHIDHAM, Kachchh, Gujarat, 370240',
  billingAddress: 'Survey No. 166/1 & 3,171/1 & 172,167,168, Vill-Padana,Gandhidham',
  mobile: '9228772268',
  email: 'subhashkunal@rediffmail.com',
  gstNumber: '24AABCK8460A1ZX',
  panCard: 'AABCK8460A',
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
}

export default function SignatureClient({ organizationId, contractId }: SignatureClientProps) {
  const [accepted, setAccepted] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    acceptedBy: '',
    designation: '',
    date: new Date().toLocaleDateString('en-GB'),
  })
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [hasSignature, setHasSignature] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.strokeStyle = '#000'
        ctx.lineWidth = 2
        ctx.lineCap = 'round'
      }
    }
  }, [])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const rect = canvas.getBoundingClientRect()
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top
    
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.beginPath()
      ctx.moveTo(x, y)
      setIsDrawing(true)
      setHasSignature(true)
    }
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    
    const canvas = canvasRef.current
    if (!canvas) return
    
    const rect = canvas.getBoundingClientRect()
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top
    
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.lineTo(x, y)
      ctx.stroke()
    }
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearSignature = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        setHasSignature(false)
      }
    }
  }

  const handleSubmit = () => {
    if (!formData.acceptedBy || !formData.designation || !accepted) {
      alert('Please fill in all fields and accept the terms')
      return
    }

    if (!hasSignature) {
      alert('Please provide your signature')
      return
    }

    // In production, this would save to database
    const canvas = canvasRef.current
    const signatureData = canvas?.toDataURL()
    console.log('Signature submitted:', { ...formData, signature: signatureData, contractId })
    
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-green-600 text-5xl">check_circle</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Contract Signed Successfully!</h1>
          <p className="text-lg text-slate-600 mb-6">
            Thank you for accepting the corporate contract. A confirmation email has been sent to your registered email address.
          </p>
          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-slate-900 mb-2">Contract Details</h3>
            <div className="text-sm text-slate-600 space-y-1">
              <p><strong>Contract ID:</strong> {contractId}</p>
              <p><strong>Organization:</strong> {mockContractData.organizationName}</p>
              <p><strong>Signed by:</strong> {formData.acceptedBy}</p>
              <p><strong>Designation:</strong> {formData.designation}</p>
              <p><strong>Date:</strong> {formData.date}</p>
            </div>
          </div>
          <p className="text-sm text-slate-500">
            You can close this window now. For any queries, please contact {mockContractData.hotelName}.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-lg p-6 mb-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Digital Contract Signature</h1>
          <p className="text-blue-100">Please review the contract below and provide your digital signature to accept the terms</p>
        </div>

        {/* Contract Display */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm text-slate-600 mb-4">
              <span className="material-symbols-outlined text-blue-600">info</span>
              <span>Please scroll through and review the entire contract before signing</span>
            </div>
          </div>
          
          <div className="border-2 border-slate-200 rounded-lg overflow-hidden">
            <div className="max-h-[600px] overflow-y-auto p-6">
              <ContractTemplate data={mockContractData} showSignature={false} />
            </div>
          </div>
        </div>

        {/* Signature Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Record of Acceptance</h2>
          
          <div className="space-y-6">
            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Accepted by: *</label>
                <input 
                  type="text"
                  value={formData.acceptedBy}
                  onChange={(e) => setFormData({...formData, acceptedBy: e.target.value})}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Designation: *</label>
                <input 
                  type="text"
                  value={formData.designation}
                  onChange={(e) => setFormData({...formData, designation: e.target.value})}
                  placeholder="Enter your designation"
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Date:</label>
              <input 
                type="text"
                value={formData.date}
                readOnly
                className="w-full md:w-1/2 px-4 py-3 border-2 border-slate-300 rounded-lg bg-slate-50"
              />
            </div>

            {/* Signature Canvas */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Digital Signature: *</label>
              <div className="border-2 border-slate-300 rounded-lg bg-white">
                <div className="p-4">
                  <div className="border-2 border-dashed border-slate-300 rounded-lg bg-slate-50 overflow-hidden">
                    <canvas
                      ref={canvasRef}
                      width={800}
                      height={160}
                      className="w-full h-40 cursor-crosshair touch-none"
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                      onTouchStart={startDrawing}
                      onTouchMove={draw}
                      onTouchEnd={stopDrawing}
                    />
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-xs text-slate-600">Sign above using your mouse or touch screen</span>
                    <button 
                      onClick={clearSignature}
                      type="button"
                      className="flex items-center gap-1 px-3 py-1.5 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">refresh</span>
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Company Stamp Upload */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Company Stamp (Optional):</label>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                <input type="file" accept="image/*" className="hidden" id="stamp-upload" />
                <label htmlFor="stamp-upload" className="cursor-pointer">
                  <span className="material-symbols-outlined text-slate-400 text-5xl mb-2">upload_file</span>
                  <p className="text-sm text-slate-600">Click to upload company stamp image</p>
                  <p className="text-xs text-slate-500 mt-1">PNG, JPG up to 5MB</p>
                </label>
              </div>
            </div>

            {/* Acceptance Checkbox */}
            <div className="bg-blue-50 rounded-lg p-6">
              <label className="flex items-start gap-3 cursor-pointer">
                <input 
                  type="checkbox"
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                  className="mt-1 w-5 h-5 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-slate-700">
                  I confirm that I have read and understood the terms and conditions outlined in this corporate contract. 
                  I accept the rates, policies, and all terms on behalf of <strong>{mockContractData.organizationName}</strong> 
                  and authorize this digital signature as legally binding.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <button 
                onClick={handleSubmit}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!accepted}
              >
                <span className="material-symbols-outlined">verified</span>
                <span>Submit Signed Contract</span>
              </button>
            </div>

            <p className="text-xs text-slate-500 text-center">
              By submitting this form, you agree that your digital signature is legally binding and equivalent to a handwritten signature.
            </p>
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-slate-100 rounded-lg p-4 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
            <span className="material-symbols-outlined text-green-600">lock</span>
            <span>This page is secured with 256-bit SSL encryption</span>
          </div>
        </div>
      </div>
    </div>
  )
}
