import React from 'react';
import { GameEvent } from '../types';
import { formatDate } from '../utils/formatters';
import { STAKEHOLDER_CATEGORIES } from '../data/events';

interface RecentEventsProps {
  events: GameEvent[];
}

const RecentEvents: React.FC<RecentEventsProps> = ({ events }) => {
  const getEventColor = (category: GameEvent['category']) => {
    switch (category) {
      case 'positive': return 'border-green-500 bg-green-50';
      case 'negative': return 'border-red-500 bg-red-50';
      default: return 'border-blue-500 bg-blue-50';
    }
  };
  
  const getImportanceIcon = (importance: GameEvent['importance']) => {
    switch (importance) {
      case 'critical': return '🔴';
      case 'high': return '🟠';
      case 'medium': return '🟡';
      case 'low': return '⚪';
      default: return '⚪';
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Aktuelle Ereignisse</h3>
      {events.length > 0 ? (
        <div className="space-y-3">
          {events.map((event, index) => {
            const stakeholder = event.stakeholder ? STAKEHOLDER_CATEGORIES[event.stakeholder] : null;
            
            return (
              <div key={event.id} className={`border-l-4 p-4 rounded-r-lg ${getEventColor(event.category)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span>{getImportanceIcon(event.importance)}</span>
                      <h4 className="font-medium text-gray-800">{event.title}</h4>
                      {stakeholder && (
                        <span 
                          className="px-2 py-1 text-xs rounded-full text-white"
                          style={{ backgroundColor: stakeholder.color }}
                        >
                          {stakeholder.name}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                    <div className="text-xs text-gray-500">
                      {formatDate(event.date)} 
                      {event.cost > 0 && ` • Kosten: ${event.cost} Mrd €`}
                    </div>
                  </div>
                </div>
                
                {/* Effects Preview */}
                {Object.keys(event.effects).length > 0 && (
                  <div className="mt-2 pt-2 border-t border-gray-200">
                    <div className="text-xs text-gray-500 mb-1">Auswirkungen:</div>
                    <div className="flex flex-wrap gap-1">
                      {Object.entries(event.effects).slice(0, 3).map(([variableId, effect]) => (
                        <span 
                          key={variableId}
                          className={`px-2 py-1 text-xs rounded ${
                            effect > 0 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {effect > 0 ? '+' : ''}{effect}
                        </span>
                      ))}
                      {Object.keys(event.effects).length > 3 && (
                        <span className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-600">
                          +{Object.keys(event.effects).length - 3} weitere
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500 italic">Noch keine Ereignisse aufgetreten</p>
      )}
    </div>
  );
};

export default RecentEvents;