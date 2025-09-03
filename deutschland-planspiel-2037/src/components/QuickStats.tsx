import React from 'react';
import { GameState } from '../types';
import { formatCurrency, formatPercentage, getValueColor } from '../utils/formatters';

interface QuickStatsProps {
  gameState: GameState;
}

const QuickStats: React.FC<QuickStatsProps> = ({ gameState }) => {
  const { variables, budget, debt, decisionsThisYear, maxDecisionsPerYear, currentCoalition } = gameState;
  
  const popularity = variables['popularity']?.value || 50;
  const economicGrowth = variables['economic_growth']?.value || 0;
  const unemployment = variables['unemployment']?.value || 5;
  const overallRating = variables['overall_rating']?.value || 50;
  
  const stats = [
    {
      label: 'Popularität',
      value: formatPercentage(popularity),
      color: getValueColor(popularity, 20, 80),
      icon: '📈'
    },
    {
      label: 'Wirtschaftswachstum',
      value: formatPercentage(economicGrowth, true),
      color: getValueColor(economicGrowth + 5, -5, 5), // Offset für bessere Farbgebung
      icon: '💹'
    },
    {
      label: 'Arbeitslosigkeit',
      value: formatPercentage(unemployment),
      color: getValueColor(unemployment, 1, 7, true), // Inverted: niedrig = gut
      icon: '🏢'
    },
    {
      label: 'Budget',
      value: formatCurrency(budget),
      color: budget > 0 ? 'text-green-600' : 'text-red-600',
      icon: '💰'
    },
    {
      label: 'Schulden',
      value: formatCurrency(debt),
      color: debt >= 0 ? 'text-green-600' : 'text-red-600',
      icon: '📉'
    },
    {
      label: 'Entscheidungen',
      value: `${decisionsThisYear}/${maxDecisionsPerYear}`,
      color: decisionsThisYear >= maxDecisionsPerYear ? 'text-red-600' : 'text-blue-600',
      icon: '⚙️'
    },
    {
      label: 'Koalition',
      value: currentCoalition ? `${currentCoalition.stability}%` : 'Keine',
      color: currentCoalition 
        ? getValueColor(currentCoalition.stability, 0, 100)
        : 'text-red-600',
      icon: '🤝'
    },
    {
      label: 'Gesamtbewertung',
      value: formatPercentage(overallRating),
      color: getValueColor(overallRating, 5, 98),
      icon: '🏆'
    }
  ];
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Schnellübersicht</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className={`text-lg font-bold ${stat.color}`}>
              {stat.value}
            </div>
            <div className="text-xs text-gray-500">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickStats;