"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface CategoryTrendsProps {
  location: string
  daypart: string
}

export function CategoryTrends({ location, daypart }: CategoryTrendsProps) {
  // This would be fetched from an API based on the location and daypart
  const data = [
    {
      name: "Week 1",
      "Dine-in": 4000,
      Takeaway: 2400,
      Online: 2400,
    },
    {
      name: "Week 2",
      "Dine-in": 3000,
      Takeaway: 1398,
      Online: 2210,
    },
    {
      name: "Week 3",
      "Dine-in": 2000,
      Takeaway: 9800,
      Online: 2290,
    },
    {
      name: "Week 4",
      "Dine-in": 2780,
      Takeaway: 3908,
      Online: 2000,
    },
  ]

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Dine-in" stackId="a" fill="#0088FE" />
          <Bar dataKey="Takeaway" stackId="a" fill="#00C49F" />
          <Bar dataKey="Online" stackId="a" fill="#FFBB28" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
