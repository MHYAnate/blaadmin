"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
  Line,
} from "recharts"
import html2canvas from "html2canvas"
import { useState, useEffect, useRef } from "react"
import { Calendar, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useGetSalesData } from "@/services/orders"

const CustomLegend = () => (
  <div className="flex items-center justify-start gap-6 mt-6 ml-12">
    <div className="flex items-center gap-2">
      <div className="w-3 h-3 rounded-full bg-emerald-700"></div>
      <span className="text-gray-600 text-sm">Individual</span>
    </div>
    <div className="flex items-center gap-2">
      <div className="w-3 h-3 rounded-full bg-amber-400"></div>
      <span className="text-gray-600 text-sm">Business Owner</span>
    </div>
  </div>
)

export default function SalesChart() {
  const chartRef = useRef<HTMLDivElement>(null)
  const [timeframe, setTimeframe] = useState<"3m" | "6m" | "12m">("6m")
  const [compareMode, setCompareMode] = useState(false)

  const {
    salesData,
    isSalesLoading,
    salesError,
    salesYear,
  } = useGetSalesData()

  const {
    salesData: compareData,
    salesYear: setCompareFilter,
  } = useGetSalesData({ enabled: compareMode })

  // Fetch main data
  useEffect(() => {
    if (salesYear) {
      salesYear({ timeframe })
    }
  }, [timeframe])

  // Fetch comparison data for 3m if compare mode is on
  useEffect(() => {
    if (compareMode && setCompareFilter) {
      setCompareFilter({ timeframe: "3m" })
    }
  }, [compareMode])

  const transform = (data: any[] = []) =>
    data.map((item: any) => ({
      month: item.month,
      Individual: item.individual,
      "Business Owner": item.businessOwner,
      Total: item.individual + item.businessOwner,
    }))

  const mainData = transform(salesData?.data)
  const comparison = compareMode ? transform(compareData?.data) : []

  const avgLine = () => {
    if (!mainData.length) return null
    const totalAvg =
      mainData.reduce((sum, d) => sum + d.Total, 0) / mainData.length
    return (
      <Line
        type="monotone"
        dataKey={() => totalAvg}
        stroke="#94a3b8"
        strokeDasharray="5 5"
        dot={false}
        name="Avg. Sales"
      />
    )
  }

  const exportChart = async () => {
    if (!chartRef.current) return
    const canvas = await html2canvas(chartRef.current)
    const link = document.createElement("a")
    link.download = `sales-chart-${Date.now()}.png`
    link.href = canvas.toDataURL("image/png")
    link.click()
  }

  return (
    <div className="w-full">
      <div className="bg-white rounded-lg p-8 shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-light text-gray-800">Sales</h1>
          <div className="flex items-center gap-2">
            <Button onClick={exportChart} variant="ghost" size="icon">
              <Download className="w-5 h-5" />
            </Button>
            {/* <Button
              variant={compareMode ? "default" : "outline"}
              onClick={() => setCompareMode((prev) => !prev)}
            >
              {compareMode ? "Hide Comparison" : "Compare w/ 3M"}
            </Button> */}
          </div>
        </div>

        {/* Time Range Buttons */}
       

        {/* Chart */}
        <div className="h-80" ref={chartRef}>
          {isSalesLoading ? (
            <div className="flex justify-center items-center h-full text-gray-500">
              Loading...
            </div>
          ) : salesError ? (
            <div className="text-red-500 text-center">
              Failed to load sales data.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={mainData}
                margin={{ top: 20, right: 10, left: 10, bottom: 20 }}
                barCategoryGap="20%"
              >
                <CartesianGrid
                  strokeDasharray="none"
                  stroke="#e5e7eb"
                  horizontal={true}
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 14 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 14 }}
                  tickFormatter={(value) =>
                    `${(value / 1000).toFixed(0)},000`
                  }
                  domain={[0, "auto"]}
                />
                <Tooltip />
                {/* <Legend /> */}
                <Bar
                  dataKey="Individual"
                  fill="#065f46"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                />
                <Bar
                  dataKey="Business Owner"
                  fill="#fbbf24"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                />
                {/* {compareMode && (
                  <>
                 <Bar dataKey="Individual" fill="#8884d8" radius={[4, 4, 0, 0]} />
                 <Bar dataKey="Business Owner" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                  </>
                )} */}
                {avgLine()}
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Legend */}
        <CustomLegend />
      </div>
    </div>
  )
}
