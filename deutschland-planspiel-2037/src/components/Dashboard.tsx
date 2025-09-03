import React from 'react';
import { GameState } from '../types';
import { VARIABLE_CATEGORIES } from '../data/variables';
import MetricWidget from './MetricWidget';
import CoalitionStatus from './CoalitionStatus';
import QuickStats from './QuickStats';
import RecentEvents from './RecentEvents';

interface DashboardProps {
  gameState: GameState;
}

const Dashboard: React.FC<DashboardProps> = ({ gameState }) => {
  const { variables, currentCoalition, events, decisionHistory } = gameState;
  
  // Gruppiere Variablen nach Kategorien
  const categorizedVariables = Object.entries(VARIABLE_CATEGORIES).map(([categoryKey, categoryInfo]) => ({
    ...categoryInfo,
    key: categoryKey,
    variables: Object.values(variables).filter(v => v.category === categoryKey)
  }));
  
  const recentEvents = events.slice(-5).reverse();
  const recentDecisions = decisionHistory.slice(-3).reverse();

  return (
    <div className="space-y-8">
      {/* Quick Stats */}
      <QuickStats gameState={gameState} />
      
      {/* Coalition Status */}
      <CoalitionStatus coalition={currentCoalition} parties={gameState.parties} />
      
      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentEvents events={recentEvents} />
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Letzte Entscheidungen</h3>
          {recentDecisions.length > 0 ? (
            <div className="space-y-3">
              {recentDecisions.map((decision, index) => {
                const decisionData = gameState.decisions.find(d => d.id === decision.decisionId);
                return (
                  <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                    <h4 className="font-medium text-gray-800">
                      {decisionData?.title || 'Unbekannte Entscheidung'}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {decision.date.day}.{decision.date.month}.{decision.date.year} • 
                      Kosten: {decision.totalCosts} Mrd €
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500 italic">Noch keine Entscheidungen getroffen</p>
          )}
        </div>
      </div>
      
      {/* Metrics by Category */}
      {categorizedVariables.map(category => (
        <div key={category.key} className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-6">
            <div 
              className="w-4 h-4 rounded-full mr-3"
              style={{ backgroundColor: category.color }}
            />
            <h2 className="text-xl font-bold text-gray-800">{category.name}</h2>
            <span className="ml-2 text-sm text-gray-500">({category.variables.length})</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {category.variables.map(variable => (
              <MetricWidget 
                key={variable.id}
                variable={variable}
                categoryColor={category.color}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
