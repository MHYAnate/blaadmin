import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "./progress"
import { Badge } from "@/components/ui/badge"
import { Users, Shield, Activity } from "lucide-react"

interface GeneralStatsProps {
  totalCustomers: number
  activeCustomers: number
  inactiveCustomers: number
  suspendedCustomers: number
  verifiedCustomers: number
  notVerifiedCustomers: number
  activeRate: number
  verificationRate: number
}

export default function GeneralStatsCard({
  totalCustomers,
  activeCustomers,
  inactiveCustomers,
  suspendedCustomers,
  verifiedCustomers,
  notVerifiedCustomers,
  activeRate,
  verificationRate,
}: GeneralStatsProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          General Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Total Customers */}
        <div className="text-center">
          <div className="text-4xl font-bold text-primary">{totalCustomers}</div>
          <div className="text-sm text-muted-foreground">Total Customers</div>
        </div>

        {/* Active Rate */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium">Active Rate</span>
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-700">
              {activeRate}%
            </Badge>
          </div>
          <Progress value={activeRate} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{activeCustomers} Active</span>
            <span>{inactiveCustomers} Inactive</span>
          </div>
        </div>

        {/* Verification Rate */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">Verification Rate</span>
            </div>
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              {verificationRate}%
            </Badge>
          </div>
          <Progress value={verificationRate} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{verifiedCustomers} Verified</span>
            <span>{notVerifiedCustomers} Unverified</span>
          </div>
        </div>

        {/* Status Breakdown */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t">
          <div className="text-center">
            <div className="w-8 h-8 mx-auto mb-1 bg-green-100 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-green-600 rounded-full"></div>
            </div>
            <div className="text-lg font-semibold text-green-600">{activeCustomers}</div>
            <div className="text-xs text-muted-foreground">Active</div>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 mx-auto mb-1 bg-gray-100 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
            </div>
            <div className="text-lg font-semibold text-gray-600">{inactiveCustomers}</div>
            <div className="text-xs text-muted-foreground">Inactive</div>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 mx-auto mb-1 bg-red-100 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-red-600 rounded-full"></div>
            </div>
            <div className="text-lg font-semibold text-red-600">{suspendedCustomers}</div>
            <div className="text-xs text-muted-foreground">Suspended</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
