import React from 'react';
import { EvaluationVariable } from '../types';
import LineChart from './LineChart';
import { formatValue } from '../utils/formatters';

interface MetricWidgetProps {
  variable: EvaluationVariable;
  categoryColor: string;
}

const MetricWidget: React.FC<MetricWidgetProps> = ({ variable, categoryColor }) => {
  const { name, value, unit, minValue, maxValue, history, format } = variable;
  
  const formattedValue = formatValue(value, format, unit);
  const percentage = ((value - minValue) / (maxValue - minValue)) * 100;
  
  // Bestimme Farbe basierend auf Performance
  const getValueColor = () => {
    if (percentage >= 75) return 'text-green-600';
    if (percentage >= 50) return 'text-yellow-600';
    if (percentage >= 25) return 'text-orange-600';
    return 'text-red-600';
  };
  
  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-gray-600';
  };
  
  // Letzte Änderung berechnen
  const lastChange = history.length > 1 
    ? history[history.length - 1].value - history[history.length - 2].value
    : 0;
  
  const formattedChange = formatValue(lastChange, format, unit, true);

  return (
    <div className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-700 leading-tight">{name}</h3>
        <button className="text-blue-500 hover:text-blue-600 text-xs">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>
      
      {/* Current Value */}
      <div className="mb-3">
        <div className={`text-xl font-bold ${getValueColor()}`}>
          {formattedValue}
        </div>
        {lastChange !== 0 && (
          <div className={`text-sm ${getChangeColor(lastChange)}`}>
            {formattedChange}
          </div>
        )}
      </div>
      
      {/* Progress Bar */}
      <div className="mb-3">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>{formatValue(minValue, format, unit)}</span>
          <span>{formatValue(maxValue, format, unit)}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="h-2 rounded-full transition-all duration-300"
            style={{ 
              width: `${Math.max(0, Math.min(100, percentage))}%`,
              backgroundColor: categoryColor 
            }}
          />
        </div>
      </div>
      
      {/* Mini Chart */}
      <div className="h-20">
        <LineChart 
          data={history}
          height={80}
          showAxis={false}
          showTooltip={true}
          color={categoryColor}
        />
      </div>
      
      {/* Footer Info */}
      <div className="text-xs text-gray-500 mt-2">
        {history.length > 1 && (
          <div>Letzte Änderung: {history[history.length - 1].explanation}</div>
        )}
      </div>
    </div>
  );
};

export default MetricWidget;
