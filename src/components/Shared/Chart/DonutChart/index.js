import React from 'react'
import { Pie, PieChart, Tooltip } from 'recharts'

const data02 = [
  { name: 'Group A', value: 2400 },
  { name: 'Group B', value: 4567 },
  { name: 'Group C', value: 1398 },
  { name: 'Group D', value: 9800 },
  { name: 'Group E', value: 3908 },
  { name: 'Group F', value: 4800 }
]
export const DonutChart = () => {
  return (
    <PieChart width={200} height={150}>
      <Pie
        dataKey="value"
        data={data02}
        cx={80}
        cy={70}
        innerRadius={40}
        outerRadius={80}
        fill="#82ca9d"
      />
      <Tooltip />
    </PieChart>
  )
}
