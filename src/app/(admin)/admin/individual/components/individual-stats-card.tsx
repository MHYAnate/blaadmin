import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "./progress"
import { Badge } from "@/components/ui/badge"
import { User, Users, Shield, Heart } from "lucide-react"

interface IndividualStatsProps {
  individualUsers: number
  totalCustomers: number
  individualPercentage: number
  // Calculated individual-specific metrics
  activeIndividualUsers?: number
  verifiedIndividualUsers?: number
}

export default function IndividualStatsCard({
  individualUsers,
  totalCustomers,
  individualPercentage,
  activeIndividualUsers = Math.floor(individualUsers * 0.75), // Assuming 75% active rate for demo
  verifiedIndividualUsers = Math.floor(individualUsers * 0.35), // Assuming 35% verified rate for demo
}: IndividualStatsProps) {
  const individualActiveRate = individualUsers > 0 ? Math.round((activeIndividualUsers / individualUsers) * 100) : 0
  const individualVerificationRate =
    individualUsers > 0 ? Math.round((verifiedIndividualUsers / individualUsers) * 100) : 0
  const inactiveIndividualUsers = individualUsers - activeIndividualUsers
  const unverifiedIndividualUsers = individualUsers - verifiedIndividualUsers

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5 text-blue-600" />
          Individual Customers
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Total Individual Users */}
        <div className="text-center">
          <div className="text-4xl font-bold text-blue-600">{individualUsers}</div>
          <div className="text-sm text-muted-foreground">Individual Accounts</div>
          <Badge variant="secondary" className="mt-2">
            {individualPercentage}% of total customers
          </Badge>
        </div>

        {/* User Base Share */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">User Base Share</span>
            </div>
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              {individualPercentage}%
            </Badge>
          </div>
          <Progress value={individualPercentage} className="h-2" />
          <div className="text-xs text-muted-foreground text-center">
            {individualUsers} of {totalCustomers} total customers
          </div>
        </div>

        {/* Individual Activity */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium">User Activity</span>
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-700">
              {individualActiveRate}%
            </Badge>
          </div>
          <Progress value={individualActiveRate} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{activeIndividualUsers} Active</span>
            <span>{inactiveIndividualUsers} Inactive</span>
          </div>
        </div>

        {/* Individual Verification */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-orange-600" />
              <span className="text-sm font-medium">Verification Status</span>
            </div>
            <Badge variant="outline" className="bg-orange-50 text-orange-700">
              {individualVerificationRate}%
            </Badge>
          </div>
          <Progress value={individualVerificationRate} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{verifiedIndividualUsers} Verified</span>
            <span>{unverifiedIndividualUsers} Pending</span>
          </div>
        </div>

        {/* Individual Insights */}
        <div className="pt-4 border-t space-y-3">
          <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
            <div className="text-sm">
              <div className="font-medium">Primary User Base</div>
              <div className="text-xs text-muted-foreground">Majority of customers</div>
            </div>
            <Badge className="bg-blue-600">Dominant</Badge>
          </div>
          <div className="flex items-center justify-between p-2 bg-orange-50 rounded-lg">
            <div className="text-sm">
              <div className="font-medium">Onboarding Focus</div>
              <div className="text-xs text-muted-foreground">Improve verification flow</div>
            </div>
            <Badge variant="outline" className="bg-orange-100 text-orange-800">
              {unverifiedIndividualUsers} Unverified
            </Badge>
          </div>
          <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
            <div className="text-sm">
              <div className="font-medium">Engagement Level</div>
              <div className="text-xs text-muted-foreground">Good activity rate</div>
            </div>
            <Badge variant="outline" className="bg-green-100 text-green-800">
              {individualActiveRate}% Active
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
