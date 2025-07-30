import GeneralStatsCard from "./general-stats-card"
import BusinessStatsCard from "./business-stats-card"

interface CustomerStats {
  totalCustomers: number
  activeCustomers: number
  inactiveCustomers: number
  suspendedCustomers: number
  individualUsers: number
  businessUsers: number
  verifiedCustomers: number
  notVerifiedCustomers: number
  activeRate: number
  verificationRate: number
  individualPercentage: number
  businessPercentage: number
}

interface CustomerStatsDashboardProps {
  stats?: CustomerStats
}

export default function CustomerStatsDashboard({ stats }: CustomerStatsDashboardProps) {
  // Default stats based on your dataset
  const defaultStats: CustomerStats = {
    totalCustomers: 0,
    activeCustomers: 0,
    inactiveCustomers: 0,
    suspendedCustomers: 0,
    individualUsers: 0,
    businessUsers:0,
    verifiedCustomers: 0,
    notVerifiedCustomers: 0,
    activeRate: 0,
    verificationRate: 0,
    individualPercentage: 0,
    businessPercentage: 0,
  }

  const customerStats = stats || defaultStats

  return (
    <div className="space-y-6 mb-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Customer Analytics Dashboard</h1>
        
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* General Overview */}
        <GeneralStatsCard
          totalCustomers={customerStats.totalCustomers}
          activeCustomers={customerStats.activeCustomers}
          inactiveCustomers={customerStats.inactiveCustomers}
          suspendedCustomers={customerStats.suspendedCustomers}
          verifiedCustomers={customerStats.verifiedCustomers}
          notVerifiedCustomers={customerStats.notVerifiedCustomers}
          activeRate={customerStats.activeRate}
          verificationRate={customerStats.verificationRate}
        />

        {/* Business Customers */}
        <BusinessStatsCard
          businessUsers={customerStats.businessUsers}
          totalCustomers={customerStats.totalCustomers}
          businessPercentage={customerStats.businessPercentage}
        />

      </div>
    </div>
  )
}
