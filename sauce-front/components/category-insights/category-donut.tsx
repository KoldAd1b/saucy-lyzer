"use client"

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

interface CategoryDonutProps {
  location: string
  daypart: string
}

export function CategoryDonut({ location, daypart }: CategoryDonutProps) {
  // This would be fetched from an API based on the location and daypart
  const data = [
    { name: "Dine-in", value: 45 },
    { name: "Takeaway", value: 30 },
    { name: "Online", value: 25 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"]

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value}%`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
