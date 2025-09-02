import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const InventoryChart = ({ type = 'line', title, data, dataKey, color = '#2563EB' }) => {
  const ChartComponent = type === 'bar' ? BarChart : LineChart;
  const DataComponent = type === 'bar' ? Bar : Line;

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
      <h3 className="text-lg font-semibold text-text-primary mb-4">{title}</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ChartComponent data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis 
              dataKey="name" 
              stroke="#64748B"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#64748B"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <DataComponent 
              dataKey={dataKey}
              stroke={color}
              fill={color}
              strokeWidth={type === 'line' ? 2 : 0}
              dot={type === 'line' ? { fill: color, strokeWidth: 2, r: 4 } : undefined}
              activeDot={type === 'line' ? { r: 6, stroke: color, strokeWidth: 2 } : undefined}
            />
          </ChartComponent>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default InventoryChart;