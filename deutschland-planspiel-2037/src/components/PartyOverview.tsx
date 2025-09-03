import React from 'react';
import { GameState } from '../types';
import { IDEOLOGY_LABELS, COOPERATION_LEVELS } from '../data/parties';
import { formatPercentage } from '../utils/formatters';

interface PartyOverviewProps {
  gameState: GameState;
}

const PartyOverview: React.FC<PartyOverviewProps> = ({ gameState }) => {
  const { parties, currentCoalition } = gameState;
  const partyList = Object.values(parties);
  
  const getRelationshipColor = (value: number) => {
    if (value >= 70) return 'text-green-600 bg-green-100';
    if (value >= 50) return 'text-blue-600 bg-blue-100';
    if (value >= 30) return 'text-yellow-600 bg-yellow-100';
    if (value >= 15) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };
  
  const getCooperationLabel = (value: number) => {
    if (value >= 90) return 'Sehr hoch';
    if (value >= 75) return 'Hoch';
    if (value >= 50) return 'Mittel';
    if (value >= 25) return 'Niedrig';
    return 'Sehr niedrig';
  };
  
  const isInCoalition = (partyId: string) => {
    return currentCoalition?.parties.includes(partyId) || false;
  };
  
  // Sortiere Parteien nach Umfragewerten
  const sortedParties = [...partyList].sort((a, b) => b.popularity - a.popularity);
  
  return (
    <div className="space-y-6">
      {/* Übersicht */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Parteienlandschaft Deutschland</h2>
        
        {/* Umfragewerte */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Aktuelle Umfragewerte</h3>
          <div className="space-y-3">
            {sortedParties.map((party) => (
              <div key={party.id} className="flex items-center space-x-4">
                <div className="flex items-center space-x-3 flex-1">
                  <div 
                    className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: party.color }}
                  >
                    {party.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-800">{party.name}</span>
                      {isInCoalition(party.id) && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                          Koalition
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-600">
                      {IDEOLOGY_LABELS[party.ideology]}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-800">
                    {formatPercentage(party.popularity)}
                  </div>
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full"
                      style={{ 
                        backgroundColor: party.color,
                        width: `${Math.max(2, party.popularity * 3)}%`
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Koalitionsmöglichkeiten */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Koalitionsmöglichkeiten</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Beispiel-Koalitionen berechnen */}
            {[
              { name: 'Progressive + SPD + FDP', parties: ['progressive', 'sozialdemokraten', 'liberale'], current: true },
              { name: 'CDU + FDP + Progressive', parties: ['konservative', 'liberale', 'progressive'], current: false },
              { name: 'Progressive + SPD + Grüne', parties: ['progressive', 'sozialdemokraten', 'gruene'], current: false },
              { name: 'CDU + AfD', parties: ['konservative', 'rechte'], current: false }
            ].map((coalition, index) => {
              const coalitionParties = coalition.parties.map(id => parties[id]).filter(Boolean);
              const totalSeats = coalitionParties.reduce((sum, party) => sum + party.popularity, 0);
              const hasMajority = totalSeats >= 50;
              
              return (
                <div 
                  key={index} 
                  className={`border rounded-lg p-4 ${
                    coalition.current ? 'border-green-500 bg-green-50' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-800">{coalition.name}</h4>
                    {coalition.current && (
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        Aktuell
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    {coalitionParties.map(party => (
                      <div
                        key={party.id}
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: party.color }}
                        title={party.name}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Sitze: {totalSeats.toFixed(1)}%</span>
                    <span className={`font-medium ${
                      hasMajority ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {hasMajority ? 'Mehrheit' : 'Minderheit'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Detaillierte Parteiprofile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sortedParties.map((party) => (
          <div key={party.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: party.color }}
              >
                {party.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{party.name}</h3>
                <p className="text-sm text-gray-600">
                  {IDEOLOGY_LABELS[party.ideology]} • {formatPercentage(party.popularity)}
                </p>
              </div>
            </div>
            
            {/* Beziehungen */}
            <div className="mb-4">
              <h4 className="font-medium text-gray-700 mb-2">Beziehungen</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Zu Progressiven:</span>
                  <span className={`text-sm px-2 py-1 rounded ${getRelationshipColor(party.relationshipToProgressives)}`}>
                    {party.relationshipToProgressives}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Kooperationsbereitschaft:</span>
                  <span className="text-sm text-gray-800 font-medium">
                    {getCooperationLabel(party.cooperationWillingness)}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Kernthemen */}
            <div className="mb-4">
              <h4 className="font-medium text-gray-700 mb-2">Kernthemen</h4>
              <div className="flex flex-wrap gap-2">
                {party.coreIssues.map((issue, index) => (
                  <span 
                    key={index}
                    className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                  >
                    {issue}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Rote Linien */}
            {party.redLines.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Rote Linien</h4>
                <div className="space-y-1">
                  {party.redLines.slice(0, 2).map((redLine, index) => (
                    <div key={index} className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
                      ⚠ {redLine}
                    </div>
                  ))}
                  {party.redLines.length > 2 && (
                    <div className="text-xs text-gray-500">
                      +{party.redLines.length - 2} weitere
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Aktuelle Forderungen */}
            {party.demands.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="font-medium text-gray-700 mb-2">Aktuelle Forderungen</h4>
                <div className="space-y-2">
                  {party.demands.slice(0, 2).map((demand, index) => {
                    const priorityColor = {
                      critical: 'bg-red-100 text-red-800',
                      high: 'bg-orange-100 text-orange-800',
                      medium: 'bg-yellow-100 text-yellow-800',
                      low: 'bg-gray-100 text-gray-800'
                    }[demand.priority];
                    
                    return (
                      <div key={demand.id} className="border-l-4 border-gray-300 pl-3">
                        <div className="flex items-center justify-between">
                          <h5 className="text-sm font-medium text-gray-800">{demand.title}</h5>
                          <span className={`text-xs px-2 py-1 rounded ${priorityColor}`}>
                            {demand.priority}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{demand.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartyOverview;