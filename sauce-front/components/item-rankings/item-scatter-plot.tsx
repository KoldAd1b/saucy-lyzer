"use client";

import {
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";

export function ItemScatterPlot() {
  const data = [
    { name: "Alfredo Pasta", volume: 850, margin: 55, price: 14 },
    { name: "Chicken Wrap", volume: 920, margin: 60, price: 12 },
    { name: "Beef Chopped Cheese", volume: 780, margin: 45, price: 13 },
    { name: "Tomato Basil Pasta", volume: 680, margin: 58, price: 13 },
    { name: "Ranch", volume: 1200, margin: 75, price: 2 },
    { name: "Naga Dip", volume: 450, margin: 70, price: 3 },
    { name: "Hot Honey", volume: 580, margin: 72, price: 3 },
    { name: "Naga Habanero Pasta", volume: 320, margin: 52, price: 15 },
    { name: "Soda (Can)", volume: 950, margin: 80, price: 2 },
    { name: "Paneer Wrap", volume: 420, margin: 55, price: 12 },
    { name: "Mushroom Wrap", volume: 380, margin: 58, price: 11 },
    { name: "Parmesan Bags 3", volume: 280, margin: 65, price: 4 },
    { name: "Red Peppers Bags 3", volume: 250, margin: 68, price: 4 },
    { name: "Water (small)", volume: 890, margin: 85, price: 1 },
    { name: "4Cheez with Hot Honey", volume: 680, margin: 48, price: 16 },
    { name: "Alfredo Cheese Pizza", volume: 750, margin: 52, price: 15 },
    { name: "Meatlovers Pizza", volume: 820, margin: 45, price: 18 },
    { name: "Classic Cheese Pizza", volume: 980, margin: 58, price: 14 },
    { name: "Customized Pizza", volume: 580, margin: 42, price: 20 },
    { name: "Korean BBQ", volume: 480, margin: 50, price: 16 },
  ];

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid />
          <XAxis type="number" dataKey="volume" name="Volume" unit=" units" />
          <YAxis type="number" dataKey="margin" name="Margin" unit="%" />
          <ZAxis
            type="number"
            dataKey="price"
            name="Price"
            unit="$"
            range={[40, 200]}
          />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            formatter={(value, name, props) => {
              if (name === "Price") return [`$${value}`, name];
              if (name === "Margin") return [`${value}%`, name];
              return [value, name];
            }}
          />
          <Legend />
          <Scatter name="Items" data={data} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
