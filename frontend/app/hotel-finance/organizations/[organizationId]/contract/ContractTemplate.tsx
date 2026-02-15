"use client"

interface RoomRate {
  roomType: string
  inclusions: string
  singleOccupancy: {
    ep?: number
    cp?: number
    map?: number
    ap?: number
  }
  doubleOccupancy: {
    ep?: number
    cp?: number
    map?: number
    ap?: number
  }
}

interface ContractData {
  hotelName: string
  hotelLocation: string
  organizationName: string
  contactPerson: string
  companyAddress: string
  billingAddress: string
  mobile: string
  email: string
  gstNumber: string
  panCard: string
  validityFrom: string
  validityTo: string
  roomRates: RoomRate[]
  extraBedCharge: number
  lateCheckoutCharge: number
  earlyCheckinCharge: number
  extraPersonCharge: number
  checkInTime: string
  checkOutTime: string
}

interface ContractTemplateProps {
  data: ContractData
  showSignature?: boolean
  isPreview?: boolean
}

export default function ContractTemplate({ data, showSignature = true, isPreview = false }: ContractTemplateProps) {
  return (
    <div className="w-full bg-white dark:bg-slate-900 p-5">
      {/* Header */}
      <div className="mb-4 border-b border-slate-200 pb-3">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-lg font-semibold text-slate-900 dark:text-white mb-0.5">{data.hotelName}</h1>
            <p className="text-xs text-slate-600 dark:text-slate-400">{data.hotelLocation}</p>
          </div>
          <div className="text-right">
            <span className="inline-block bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-2 py-0.5 rounded text-xs font-semibold tracking-wide">
              CONTRACT
            </span>
          </div>
        </div>
      </div>

      {/* Greeting */}
      <div className="mb-4">
        <p className="text-slate-700 dark:text-slate-300 text-xs leading-relaxed">Dear Mr. {data.contactPerson},</p>
        <p className="text-slate-700 dark:text-slate-300 text-xs mt-1.5 leading-relaxed">We are pleased to extend the following corporate rates for your company.</p>
      </div>

      {/* Contract Header Info */}
      <div className="space-y-3 mb-4">
        <div>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold mb-0.5">ORGANIZATION</p>
          <p className="text-xs text-slate-900 dark:text-slate-100 font-medium">{data.organizationName}</p>
        </div>
        <div>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold mb-0.5">VALIDITY</p>
          <p className="text-xs text-slate-900 dark:text-slate-100 font-medium">{data.validityFrom} to {data.validityTo}</p>
        </div>
      </div>

      {/* Organization Details - Compact */}
      <div className="mb-4">
        <h3 className="text-xs font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wide mb-2 text-slate-700 dark:text-slate-300">Org Details</h3>
        <div className="space-y-1.5 text-xs">
          <div>
            <p className="text-slate-600 dark:text-slate-400 font-medium">Contact Person</p>
            <p className="text-slate-900 dark:text-slate-100">{data.contactPerson}</p>
          </div>
          <div>
            <p className="text-slate-600 dark:text-slate-400 font-medium">Company</p>
            <p className="text-slate-900 dark:text-slate-100">{data.organizationName}</p>
          </div>
          <div>
            <p className="text-slate-600 dark:text-slate-400 font-medium">Email</p>
            <p className="text-slate-900 dark:text-slate-100">{data.email}</p>
          </div>
          <div>
            <p className="text-slate-600 dark:text-slate-400 font-medium">GST #</p>
            <p className="text-slate-900 dark:text-slate-100">{data.gstNumber}</p>
          </div>
        </div>
      </div>

      {/* Corporate Rates Table */}
      <div className="mb-4">
        <h3 className="text-xs font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wide mb-2">Room Rates (Excl. Tax)</h3>
        <div className="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-lg">
          <table className="w-full text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="px-2 py-1 text-left font-semibold text-slate-700 dark:text-slate-300">Room</th>
                <th className="px-1 py-1 text-center font-semibold text-slate-700 dark:text-slate-300">S(EP)</th>
                <th className="px-1 py-1 text-center font-semibold text-slate-700 dark:text-slate-300">D(EP)</th>
                <th className="px-1 py-1 text-center font-semibold text-slate-700 dark:text-slate-300">S(CP)</th>
                <th className="px-1 py-1 text-center font-semibold text-slate-700 dark:text-slate-300">D(CP)</th>
              </tr>
            </thead>
            <tbody>
              {data.roomRates.map((rate, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50 dark:bg-slate-800'}>
                  <td className="px-2 py-1 text-slate-900 dark:text-slate-100 font-medium">{rate.roomType}</td>
                  <td className="px-1 py-1 text-center text-slate-900 dark:text-slate-100">{rate.singleOccupancy.ep || '-'}</td>
                  <td className="px-1 py-1 text-center text-slate-900 dark:text-slate-100">{rate.doubleOccupancy.ep || '-'}</td>
                  <td className="px-1 py-1 text-center text-slate-900 dark:text-slate-100">{rate.singleOccupancy.cp || '-'}</td>
                  <td className="px-1 py-1 text-center text-slate-900 dark:text-slate-100">{rate.doubleOccupancy.cp || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Additional Info - Two Column */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <h3 className="text-xs font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wide mb-1.5">Charges</h3>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between p-1 bg-slate-50 dark:bg-slate-800 rounded">
              <span className="text-slate-700 dark:text-slate-400 font-medium">Extra Bed:</span>
              <span className="text-slate-900 dark:text-slate-100 font-medium">₹{data.extraBedCharge}</span>
            </div>
            <div className="flex justify-between p-1">
              <span className="text-slate-700 dark:text-slate-400 font-medium">Checkout:</span>
              <span className="text-slate-900 dark:text-slate-100 font-medium">₹{data.lateCheckoutCharge}</span>
            </div>
            <div className="flex justify-between p-1 bg-slate-50 dark:bg-slate-800 rounded">
              <span className="text-slate-700 dark:text-slate-400 font-medium">Check-in:</span>
              <span className="text-slate-900 dark:text-slate-100 font-medium">₹{data.earlyCheckinCharge}</span>
            </div>
            <div className="flex justify-between p-1">
              <span className="text-slate-700 dark:text-slate-400 font-medium">Extra Person:</span>
              <span className="text-slate-900 dark:text-slate-100 font-medium">₹{data.extraPersonCharge}</span>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-xs font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wide mb-1.5">Times</h3>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between p-1 bg-slate-50 dark:bg-slate-800 rounded">
              <span className="text-slate-700 dark:text-slate-400 font-medium">Check-in:</span>
              <span className="text-slate-900 dark:text-slate-100 font-medium">{data.checkInTime}</span>
            </div>
            <div className="flex justify-between p-1">
              <span className="text-slate-700 dark:text-slate-400 font-medium">Check-out:</span>
              <span className="text-slate-900 dark:text-slate-100 font-medium">{data.checkOutTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Key Terms - Compact Cards */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-2">
          <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wide mb-1">Inclusions</h4>
          <ul className="list-disc list-inside space-y-0.5 text-xs text-slate-700 dark:text-slate-300">
            <li>Breakfast</li>
            <li>Wi-Fi</li>
            <li>Pool & Gym</li>
          </ul>
        </div>
        <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-2">
          <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wide mb-1">Key Terms</h4>
          <ul className="list-disc list-inside space-y-0.5 text-xs text-slate-700 dark:text-slate-300">
            <li>14-day notice</li>
            <li>No commissions</li>
            <li>Deposit required</li>
          </ul>
        </div>
      </div>

      {/* Acceptance Section */}
      {showSignature && (
        <div className="border-t border-slate-200 dark:border-slate-700 pt-3 mb-4">
          <h3 className="text-xs font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wide mb-2">Acceptance</h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <p className="font-medium text-slate-700 dark:text-slate-400 mb-0.5">Name</p>
              <div className="border-b border-slate-400 h-4"></div>
            </div>
            <div>
              <p className="font-medium text-slate-700 dark:text-slate-400 mb-0.5">Designation</p>
              <div className="border-b border-slate-400 h-4"></div>
            </div>
            <div>
              <p className="font-medium text-slate-700 dark:text-slate-400 mb-0.5">Date</p>
              <div className="border-b border-slate-400 h-4"></div>
            </div>
            <div>
              <p className="font-medium text-slate-700 dark:text-slate-400 mb-0.5">Signature</p>
              <div className="border-b border-slate-400 h-4"></div>
            </div>
          </div>
        </div>
      )}

      {/* Closing */}
      <div className="border-t border-slate-200 dark:border-slate-700 pt-3 text-xs text-slate-700 dark:text-slate-300">
        <p className="mb-2 leading-relaxed">For any clarifications, please contact us. We assure you of our best services and attention at all times.</p>
        <p className="mt-2 font-medium text-slate-900 dark:text-slate-100">Kind Regards,</p>
        <p className="font-semibold text-slate-900 dark:text-slate-100">{data.hotelName}</p>
      </div>
    </div>
  )
}
