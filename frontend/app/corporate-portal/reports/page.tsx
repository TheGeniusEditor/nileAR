import Header from '@/app/components/Header'
import Sidebar from '@/app/components/Sidebar'
import ReportsClient from './ReportsClient'

export default function ReportsPage() {
  return (
    <div className="flex h-screen bg-[#f6f6f8] dark:bg-[#0d131b]">
      <Sidebar title="Corporate Portal" logoIcon="business" />
      <div className="flex flex-col flex-1 min-w-0">
        <Header />
        <ReportsClient />
      </div>
    </div>
  )
}
