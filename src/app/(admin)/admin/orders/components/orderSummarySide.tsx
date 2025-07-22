"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

const orderData = [
  { month: "Jan", Ordered: 4000, Delivered: 3500 },
  { month: "Feb", Ordered: 1900, Delivered: 2400 },
  { month: "Mar", Ordered: 3000, Delivered: 4000 },
  { month: "Apr", Ordered: 2500, Delivered: 3800 },
  { month: "May", Ordered: 2400, Delivered: 3600 },
]

const CustomLegend = () => (
  <div className="flex items-center justify-start gap-6 mt-6 ml-12">
    <div className="flex items-center gap-2">
      <div className="w-3 h-3 rounded-full bg-amber-500"></div>
      <span className="text-gray-500 text-sm">Ordered</span>
    </div>
    <div className="flex items-center gap-2">
      <div className="w-3 h-3 rounded-full bg-emerald-700"></div>
      <span className="text-gray-500 text-sm">Delivered</span>
    </div>
  </div>
)

export default function OrderSummary() {
  return (
    <div className="w-full max-w-6xl mx-auto p-8 bg-gray-50">
      <div className="bg-white rounded-lg p-8 shadow-sm">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-light text-gray-800">Order Summary</h1>
        </div>

        {/* Chart */}
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={orderData}
              margin={{
                top: 20,
                right: 30,
                left: 60,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="none" stroke="#e5e7eb" horizontal={true} vertical={false} />
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
                domain={[1000, 4000]}
                ticks={[1000, 2000, 3000, 4000]}
              />
              <Line
                type="monotone"
                dataKey="Ordered"
                stroke="#f59e0b"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 4, fill: "#f59e0b" }}
              />
              <Line
                type="monotone"
                dataKey="Delivered"
                stroke="#065f46"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 4, fill: "#065f46" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Custom Legend */}
        <CustomLegend />
      </div>
    </div>
  )
}
