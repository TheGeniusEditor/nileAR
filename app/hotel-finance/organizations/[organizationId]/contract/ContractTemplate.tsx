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
    <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg">
      {/* Header with Logo */}
      <div className="mb-8 border-b-4 border-blue-600 pb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-800 mb-2">{data.hotelName}</h1>
            <p className="text-lg text-slate-600">{data.hotelLocation}</p>
          </div>
          <div className="text-right">
            <span className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold">
              CORPORATE CONTRACT
            </span>
          </div>
        </div>
      </div>

      {/* Greeting */}
      <div className="mb-6">
        <p className="text-slate-700 text-sm">Dear Mr. {data.contactPerson},</p>
        <p className="text-slate-700 text-sm mt-2">We are pleased to extend the following corporate rates for your company.</p>
      </div>

      {/* Contract Details Table */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-center bg-blue-50 py-3 border border-blue-200 mb-0">
          Corporate rates applicable to {data.organizationName}
        </h2>
        <table className="w-full border-collapse border border-slate-300">
          <tbody>
            <tr>
              <td className="border border-slate-300 px-4 py-2 font-semibold bg-slate-50 w-1/3">Validity</td>
              <td className="border border-slate-300 px-4 py-2 text-center">{data.validityFrom}</td>
              <td className="border border-slate-300 px-4 py-2 text-center">{data.validityTo}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Organization Details */}
      <div className="mb-8">
        <table className="w-full border-collapse border border-slate-300">
          <tbody>
            <tr>
              <td className="border border-slate-300 px-4 py-2 font-semibold bg-slate-50 w-1/3">Contact Person</td>
              <td className="border border-slate-300 px-4 py-2">{data.contactPerson}</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-4 py-2 font-semibold bg-slate-50">Company Name</td>
              <td className="border border-slate-300 px-4 py-2">{data.organizationName}</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-4 py-2 font-semibold bg-slate-50">Company Address</td>
              <td className="border border-slate-300 px-4 py-2">{data.companyAddress}</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-4 py-2 font-semibold bg-slate-50">Billing Address</td>
              <td className="border border-slate-300 px-4 py-2">{data.billingAddress}</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-4 py-2 font-semibold bg-slate-50">Mobile</td>
              <td className="border border-slate-300 px-4 py-2">{data.mobile}</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-4 py-2 font-semibold bg-slate-50">Email</td>
              <td className="border border-slate-300 px-4 py-2">{data.email}</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-4 py-2 font-semibold bg-slate-50">GST Number</td>
              <td className="border border-slate-300 px-4 py-2">{data.gstNumber}</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-4 py-2 font-semibold bg-slate-50">PAN Card</td>
              <td className="border border-slate-300 px-4 py-2">{data.panCard}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Corporate Rates Table */}
      <div className="mb-8">
        <h2 className="text-lg font-bold bg-blue-50 py-3 px-4 border border-slate-300 mb-0">
          Corporate Rates (Excluding Taxes)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-slate-300">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-slate-300 px-4 py-2 text-left font-semibold" rowSpan={2}>Room Type</th>
                <th className="border border-slate-300 px-4 py-2 text-left font-semibold" rowSpan={2}>Inclusions</th>
                <th className="border border-slate-300 px-4 py-2 text-center font-semibold" colSpan={4}>Single Occupancy</th>
                <th className="border border-slate-300 px-4 py-2 text-center font-semibold" colSpan={4}>Double Occupancy</th>
              </tr>
              <tr className="bg-slate-50">
                <th className="border border-slate-300 px-3 py-2 text-center text-sm">EP</th>
                <th className="border border-slate-300 px-3 py-2 text-center text-sm">CP</th>
                <th className="border border-slate-300 px-3 py-2 text-center text-sm">MAP</th>
                <th className="border border-slate-300 px-3 py-2 text-center text-sm">AP</th>
                <th className="border border-slate-300 px-3 py-2 text-center text-sm">EP</th>
                <th className="border border-slate-300 px-3 py-2 text-center text-sm">CP</th>
                <th className="border border-slate-300 px-3 py-2 text-center text-sm">MAP</th>
                <th className="border border-slate-300 px-3 py-2 text-center text-sm">AP</th>
              </tr>
            </thead>
            <tbody>
              {data.roomRates.map((rate, index) => (
                <tr key={index} className="hover:bg-slate-50">
                  <td className="border border-slate-300 px-4 py-3 font-semibold">{rate.roomType}</td>
                  <td className="border border-slate-300 px-4 py-3 text-sm">{rate.inclusions}</td>
                  <td className="border border-slate-300 px-3 py-3 text-center">{rate.singleOccupancy.ep || ''}</td>
                  <td className="border border-slate-300 px-3 py-3 text-center">{rate.singleOccupancy.cp || ''}</td>
                  <td className="border border-slate-300 px-3 py-3 text-center">{rate.singleOccupancy.map || ''}</td>
                  <td className="border border-slate-300 px-3 py-3 text-center">{rate.singleOccupancy.ap || ''}</td>
                  <td className="border border-slate-300 px-3 py-3 text-center">{rate.doubleOccupancy.ep || ''}</td>
                  <td className="border border-slate-300 px-3 py-3 text-center">{rate.doubleOccupancy.cp || ''}</td>
                  <td className="border border-slate-300 px-3 py-3 text-center">{rate.doubleOccupancy.map || ''}</td>
                  <td className="border border-slate-300 px-3 py-3 text-center">{rate.doubleOccupancy.ap || ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Additional Charges */}
        <table className="w-full border-collapse border border-slate-300 mt-0">
          <tbody>
            <tr>
              <td className="border border-slate-300 px-4 py-2 font-semibold bg-slate-50">Extra bed</td>
              <td className="border border-slate-300 px-4 py-2">₹{data.extraBedCharge.toFixed(2)}</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-4 py-2 font-semibold bg-slate-50">Late Checkout Charge</td>
              <td className="border border-slate-300 px-4 py-2">₹{data.lateCheckoutCharge.toFixed(2)}</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-4 py-2 font-semibold bg-slate-50">Early Checkin Charge</td>
              <td className="border border-slate-300 px-4 py-2">₹{data.earlyCheckinCharge.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>

        {/* Meal Plan Note */}
        <div className="mt-2 text-xs text-slate-600 px-2">
          *EP - Room only+Taxes, CP - Breakfast inclusive+Taxes, MAP - Breakfast and one major meal inclusive+Taxes, AP - All meals inclusive+Taxes
        </div>

        {/* Check-in/Check-out Times */}
        <table className="w-full border-collapse border border-slate-300 mt-4">
          <tbody>
            <tr>
              <td className="border border-slate-300 px-4 py-3 text-center font-semibold bg-slate-50">Standard Check-In time</td>
              <td className="border border-slate-300 px-4 py-3 text-center font-semibold bg-slate-50">Check-out time</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-4 py-3 text-center">{data.checkInTime}</td>
              <td className="border border-slate-300 px-4 py-3 text-center">{data.checkOutTime}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* The Above Rates Include */}
      <div className="mb-6">
        <h2 className="text-lg font-bold bg-blue-700 text-white py-3 px-4 mb-3">THE ABOVE RATES INCLUDE</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-slate-700 px-4">
          <li>Buffet Breakfast at "Waves", our multi-cuisine All Day Dining Coffee Shop</li>
          <li>Complimentary Wi-Fi Internet in Guest Rooms</li>
          <li>Complimentary Wireless Internet in all Public Areas</li>
          <li>Exclusive usage of swimming pool & gymnasium</li>
          <li>Extra Person/Third Person will be charged @ INR {data.extraPersonCharge}+Taxes per person per night</li>
        </ul>
      </div>

      {/* Terms & Conditions */}
      <div className="mb-6">
        <h2 className="text-lg font-bold bg-blue-700 text-white py-3 px-4 mb-3">TERMS & CONDITIONS</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-slate-700 px-4">
          <li>The Hotel reserves the right to change or amend the Published and /or Corporates rates by providing at least 14 days advance notice.</li>
          <li>The Special corporate offer is Net non-commissionable</li>
          <li>Rooms shall have to be guaranteed by deposit, correspondence or credit card.</li>
          <li>Complimentary stay for child under 08 years old sharing room with parents without the extra bed.</li>
          <li>Room booking received through a travel agent shall not be entitled to the corporate rate.</li>
          <li>To avail the special corporate rates, an acceptance letter from your end is essential.</li>
        </ul>
      </div>

      {/* Deposit & Payment Policy */}
      <div className="mb-6">
        <h2 className="text-lg font-bold bg-blue-700 text-white py-3 px-4 mb-3">DEPOSIT & PAYMENT POLICY</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-slate-700 px-4">
          <li>All reservations will require a one-night room deposit or credit card guarantee in order to confirm the booking. We accept all major international Credit Cards</li>
          <li>In case of delay in payment, interest at 18% will be payable to {data.hotelName} for the period of delay, till the amounts are realized</li>
          <li>Payment to be done within 7 days of presenting bills to the company. The credit facility will be stopped immediately once the credit limit exceeds INR 50000/-.</li>
        </ul>
      </div>

      {/* Cancellation Policy */}
      <div className="mb-6">
        <h2 className="text-lg font-bold bg-blue-700 text-white py-3 px-4 mb-3">CANCELLATION POLICY</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-slate-700 px-4">
          <li>Confirmed booking cancelled up to 48 Hrs. prior to the arrival date will not be liable for any cancellation fee.</li>
          <li>Confirmed booking cancelled after 48 Hrs. will attract a cancellation fee equivalent to the room charge for each night booked and confirmed.</li>
          <li>Any cancellation for a group within 15 Days of arrival will attract retention for the number of rooms booked and the duration of stay.</li>
        </ul>
      </div>

      {/* No-Show Policy */}
      <div className="mb-6">
        <h2 className="text-lg font-bold bg-blue-700 text-white py-3 px-4 mb-3">NO-SHOW POLICY</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-slate-700 px-4">
          <li>Should there be a No Show on the rooms booked and confirmed. Your company will be charged a retention fee equivalent to the Room Charges for each of the nights reserved and confirmed.</li>
        </ul>
      </div>

      {/* Taxation Policy */}
      <div className="mb-6">
        <h2 className="text-lg font-bold bg-blue-700 text-white py-3 px-4 mb-3">TAXATION POLICY</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-slate-700 px-4">
          <li>Tax is subject to change as per Government policies and regulations without prior notice.</li>
        </ul>
      </div>

      {/* Confirmation */}
      <div className="mb-6">
        <h2 className="text-lg font-bold bg-blue-700 text-white py-3 px-4 mb-3">CONFIRMATION</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-slate-700 px-4">
          <li>Kindly send us the acceptance of the rate letter along with company stamp and signature.</li>
        </ul>
      </div>

      {/* Closing */}
      <div className="mb-8 text-sm text-slate-700">
        <p className="mb-4">In case of any clarification please feel free to contact the undersigned. Thanking you & assuring of our best services & attention at all times.</p>
        <p className="mt-4">Kind Regards,</p>
        <p className="font-semibold">{data.hotelName}</p>
        <p>Sales Executive: Sales & Marketing</p>
      </div>

      {/* Digital Signature Section */}
      {showSignature && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-center bg-slate-100 py-3 mb-4">Record of Acceptance:</h2>
          <table className="w-full border-collapse border border-slate-300">
            <tbody>
              <tr>
                <td className="border border-slate-300 px-4 py-3 font-semibold bg-slate-50 w-1/3">Accepted by:</td>
                <td className="border border-slate-300 px-4 py-3 h-16"></td>
              </tr>
              <tr>
                <td className="border border-slate-300 px-4 py-3 font-semibold bg-slate-50">Designation:</td>
                <td className="border border-slate-300 px-4 py-3 h-16"></td>
              </tr>
              <tr>
                <td className="border border-slate-300 px-4 py-3 font-semibold bg-slate-50">Date:</td>
                <td className="border border-slate-300 px-4 py-3 h-16"></td>
              </tr>
              <tr>
                <td className="border border-slate-300 px-4 py-3 font-semibold bg-slate-50">Signature:</td>
                <td className="border border-slate-300 px-4 py-3 h-20"></td>
              </tr>
              <tr>
                <td className="border border-slate-300 px-4 py-3 font-semibold bg-slate-50">Company stamp:</td>
                <td className="border border-slate-300 px-4 py-3 h-20"></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
