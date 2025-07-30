import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "./progress"
import { Badge } from "@/components/ui/badge"
import { Building2, TrendingUp, Users, Shield } from "lucide-react"

interface BusinessStatsProps {
  businessUsers: number
  totalCustomers: number
  businessPercentage: number
  // Calculated business-specific metrics
  activeBusinessUsers?: number
  verifiedBusinessUsers?: number
}

export default function BusinessStatsCard({
  businessUsers,
  totalCustomers,
  businessPercentage,
  activeBusinessUsers = Math.floor(businessUsers * 0.8), // Assuming 80% active rate for demo
  verifiedBusinessUsers = Math.floor(businessUsers * 0.6), // Assuming 60% verified rate for demo
}: BusinessStatsProps) {
  const businessActiveRate = businessUsers > 0 ? Math.round((activeBusinessUsers / businessUsers) * 100) : 0
  const businessVerificationRate = businessUsers > 0 ? Math.round((verifiedBusinessUsers / businessUsers) * 100) : 0
  const inactiveBusinessUsers = businessUsers - activeBusinessUsers
  const unverifiedBusinessUsers = businessUsers - verifiedBusinessUsers

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-purple-600" />
          Business Customers
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Total Business Users */}
        <div className="text-center">
          <div className="text-4xl font-bold text-purple-600">{businessUsers}</div>
          <div className="text-sm text-muted-foreground">Business Accounts</div>
          <Badge variant="secondary" className="mt-2">
            {businessPercentage}% of total customers
          </Badge>
        </div>

        {/* Market Share */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium">Market Share</span>
            </div>
            <Badge variant="outline" className="bg-purple-50 text-purple-700">
              {businessPercentage}%
            </Badge>
          </div>
          <Progress value={businessPercentage} className="h-2" />
          <div className="text-xs text-muted-foreground text-center">
            {businessUsers} of {totalCustomers} total customers
          </div>
        </div>

        {/* Business Activity */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium">Business Activity</span>
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-700">
              {businessActiveRate}%
            </Badge>
          </div>
          <Progress value={businessActiveRate} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{activeBusinessUsers} Active</span>
            <span>{inactiveBusinessUsers} Inactive</span>
          </div>
        </div>

        {/* Business Verification */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">Verification Status</span>
            </div>
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              {businessVerificationRate}%
            </Badge>
          </div>
          <Progress value={businessVerificationRate} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{verifiedBusinessUsers} Verified</span>
            <span>{unverifiedBusinessUsers} Pending</span>
          </div>
        </div>

        {/* Business Insights */}
        <div className="pt-4 border-t space-y-3">
          <div className="flex items-center justify-between p-2 bg-purple-50 rounded-lg">
            <div className="text-sm">
              <div className="font-medium">Revenue Potential</div>
              <div className="text-xs text-muted-foreground">Higher value customers</div>
            </div>
            <Badge className="bg-purple-600">High</Badge>
          </div>
          <div className="flex items-center justify-between p-2 bg-amber-50 rounded-lg">
            <div className="text-sm">
              <div className="font-medium">Verification Priority</div>
              <div className="text-xs text-muted-foreground">KYB compliance needed</div>
            </div>
            <Badge variant="outline" className="bg-amber-100 text-amber-800">
              {unverifiedBusinessUsers} Pending
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
