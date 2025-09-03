import React from 'react';
import { VariableHistoryPoint } from '../types';

interface LineChartProps {
  data: VariableHistoryPoint[];
  height?: number;
  width?: number;
  showAxis?: boolean;
  showTooltip?: boolean;
  color?: string;
}

const LineChart: React.FC<LineChartProps> = ({ 
  data, 
  height = 200, 
  width = 300, 
  showAxis = true, 
  showTooltip = true,
  color = '#3b82f6'
}) => {
  if (data.length < 2) {
    return (
      <div 
        className="flex items-center justify-center bg-gray-50 rounded"
        style={{ height, width }}
      >
        <span className="text-sm text-gray-500">Nicht genügend Daten</span>
      </div>
    );
  }
  
  const values = data.map(d => d.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const valueRange = maxValue - minValue || 1;
  
  const padding = 20;
  const chartWidth = width - (showAxis ? padding * 2 : padding);
  const chartHeight = height - (showAxis ? padding * 2 : padding);
  
  const points = data.map((point, index) => {
    const x = padding + (index / (data.length - 1)) * chartWidth;
    const y = padding + ((maxValue - point.value) / valueRange) * chartHeight;
    return { x, y, point };
  });
  
  const pathData = points.reduce((path, { x, y }, index) => {
    return path + (index === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`);
  }, '');
  
  return (
    <div className="relative">
      <svg width={width} height={height} className="overflow-visible">
        {/* Grid Lines */}
        {showAxis && (
          <>
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f3f4f6" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect 
              x={padding} 
              y={padding} 
              width={chartWidth} 
              height={chartHeight} 
              fill="url(#grid)" 
            />
          </>
        )}
        
        {/* Line */}
        <path
          d={pathData}
          fill="none"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Data Points */}
        {points.map(({ x, y, point }, index) => {
          const isDecision = point.source === 'decision';
          const isEvent = point.source === 'event';
          const pointColor = isDecision ? '#3b82f6' : isEvent ? '#f97316' : color;
          
          return (
            <g key={index}>
              <circle
                cx={x}
                cy={y}
                r={isDecision || isEvent ? 4 : 2}
                fill={pointColor}
                stroke="white"
                strokeWidth={1}
                className="hover:r-5 cursor-pointer transition-all"
              />
              {showTooltip && (
                <title>
                  {`${point.date.day}.${point.date.month}.${point.date.year}: ${point.value}\n${point.explanation}`}
                </title>
              )}
            </g>
          );
        })}
        
        {/* Axis Labels */}
        {showAxis && (
          <>
            <text
              x={padding}
              y={height - 5}
              className="text-xs fill-gray-500"
              textAnchor="start"
            >
              {data[0].date.month}/{data[0].date.year}
            </text>
            <text
              x={width - padding}
              y={height - 5}
              className="text-xs fill-gray-500"
              textAnchor="end"
            >
              {data[data.length - 1].date.month}/{data[data.length - 1].date.year}
            </text>
            
            <text
              x={5}
              y={padding}
              className="text-xs fill-gray-500"
              textAnchor="start"
            >
              {maxValue.toFixed(1)}
            </text>
            <text
              x={5}
              y={height - padding}
              className="text-xs fill-gray-500"
              textAnchor="start"
            >
              {minValue.toFixed(1)}
            </text>
          </>
        )}
      </svg>
    </div>
  );
};

export default LineChart;
