import React, { useState } from 'react';
import { GameState } from '../types';
import { getAvailableDecisions } from '../data/decisions';

interface DecisionPanelProps {
  gameState: GameState;
  onMakeDecision: (decisionId: string, selectedOptions: string[]) => boolean;
  canMakeDecision: boolean;
  decisionWarning: string | null;
  formattedTime: string;
}

const DecisionPanel: React.FC<DecisionPanelProps> = ({
  gameState,
  onMakeDecision,
  canMakeDecision,
  decisionWarning,
  formattedTime
}) => {
  const [selectedDecision, setSelectedDecision] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [showDetails, setShowDetails] = useState<{ [optionId: string]: boolean }>({});
  
  const availableDecisions = getAvailableDecisions(gameState.currentDate, gameState);
  const currentDecision = selectedDecision 
    ? availableDecisions.find(d => d.id === selectedDecision)
    : null;
  
  const handleOptionToggle = (optionId: string) => {
    if (!currentDecision) return;
    
    const option = currentDecision.options.find(opt => opt.id === optionId);
    if (!option) return;
    
    if (currentDecision.multipleChoice) {
      setSelectedOptions(prev => 
        prev.includes(optionId)
          ? prev.filter(id => id !== optionId)
          : [...prev, optionId]
      );
    } else {
      setSelectedOptions([optionId]);
    }
  };
  
  const handleSubmitDecision = () => {
    if (!selectedDecision || selectedOptions.length === 0) return;
    
    const success = onMakeDecision(selectedDecision, selectedOptions);
    if (success) {
      setSelectedDecision(null);
      setSelectedOptions([]);
      setShowDetails({});
    }
  };
  
  const calculateTotalCosts = () => {
    if (!currentDecision) return 0;
    return selectedOptions.reduce((total, optionId) => {
      const option = currentDecision.options.find(opt => opt.id === optionId);
      return total + (option?.costs || 0);
    }, 0);
  };
  
  return (
    <div className="space-y-6">
      {/* Header mit Timer */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Entscheidungen treffen</h2>
          <div className="text-right">
            <div className="text-3xl font-mono text-blue-600">{formattedTime}</div>
            <div className="text-sm text-gray-600">Entscheidungszeit</div>
          </div>
        </div>
        
        {decisionWarning && (
          <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="text-yellow-600 mr-3">⚠</div>
              <p className="text-yellow-800 font-medium">{decisionWarning}</p>
            </div>
          </div>
        )}
        
        {!canMakeDecision && (
          <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="text-red-600 mr-3">🚫</div>
              <p className="text-red-800 font-medium">
                Entscheidungslimit für dieses Jahr erreicht!
              </p>
            </div>
          </div>
        )}
      </div>
      
      {/* Entscheidungsauswahl */}
      {canMakeDecision && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Linke Spalte: Verfügbare Entscheidungen */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Verfügbare Entscheidungen ({availableDecisions.length})
            </h3>
            
            <div className="space-y-3">
              {availableDecisions.map(decision => (
                <button
                  key={decision.id}
                  onClick={() => {
                    setSelectedDecision(decision.id);
                    setSelectedOptions([]);
                    setShowDetails({});
                  }}
                  className={`w-full text-left p-4 rounded-lg border transition-colors ${
                    selectedDecision === decision.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <h4 className="font-medium text-gray-800 mb-2">{decision.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">{decision.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
                      {decision.category}
                    </span>
                    <span className="text-xs text-gray-500">
                      {decision.options.length} Optionen
                    </span>
                  </div>
                </button>
              ))}
            </div>
            
            {availableDecisions.length === 0 && (
              <p className="text-gray-500 italic">Keine Entscheidungen verfügbar</p>
            )}
          </div>
          
          {/* Mittlere Spalte: Entscheidungsoptionen */}
          <div className="bg-white rounded-lg shadow-md p-6">
            {currentDecision ? (
              <>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {currentDecision.title}
                </h3>
                <p className="text-gray-600 mb-4">{currentDecision.question}</p>
                
                {currentDecision.multipleChoice && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                    <p className="text-sm text-blue-800">
                      ℹ️ Mehrfachauswahl möglich - Wählen Sie eine oder mehrere Optionen.
                    </p>
                  </div>
                )}
                
                <div className="space-y-3">
                  {currentDecision.options.map(option => (
                    <div key={option.id} className="border rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <input
                          type={currentDecision.multipleChoice ? 'checkbox' : 'radio'}
                          name="decision-option"
                          value={option.id}
                          checked={selectedOptions.includes(option.id)}
                          onChange={() => handleOptionToggle(option.id)}
                          className="mt-1 text-blue-600 focus:ring-blue-500"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800 mb-2">{option.title}</h4>
                          <p className="text-sm text-gray-600 mb-2">{option.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-red-600">
                              Kosten: {option.costs} Mrd €
                            </span>
                            <button
                              onClick={() => setShowDetails(prev => ({
                                ...prev,
                                [option.id]: !prev[option.id]
                              }))}
                              className="text-sm text-blue-600 hover:text-blue-700"
                            >
                              {showDetails[option.id] ? 'Weniger' : 'Details'}
                            </button>
                          </div>
                          
                          {showDetails[option.id] && (
                            <div className="mt-3 pt-3 border-t border-gray-200">
                              <div className="grid grid-cols-2 gap-2">
                                {Object.entries(option.effects).slice(0, 6).map(([variableId, effect]) => {
                                  const variable = gameState.variables[variableId];
                                  if (!variable) return null;
                                  
                                  return (
                                    <div key={variableId} className="text-xs">
                                      <span className="text-gray-600">{variable.name}:</span>
                                      <span className={`ml-1 font-medium ${
                                        effect.immediate > 0 ? 'text-green-600' : 'text-red-600'
                                      }`}>
                                        {effect.immediate > 0 ? '+' : ''}{effect.immediate}
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">Wählen Sie eine Entscheidung aus der Liste</p>
              </div>
            )}
          </div>
          
          {/* Rechte Spalte: Bestätigung */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Entscheidung bestätigen</h3>
            
            {selectedOptions.length > 0 && currentDecision ? (
              <>
                <div className="space-y-3 mb-6">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <h4 className="font-medium text-gray-800 mb-2">Gewählte Optionen:</h4>
                    {selectedOptions.map(optionId => {
                      const option = currentDecision.options.find(opt => opt.id === optionId);
                      return option ? (
                        <div key={optionId} className="text-sm text-gray-700 mb-1">
                          ✓ {option.title}
                        </div>
                      ) : null;
                    })}
                  </div>
                  
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <h4 className="font-medium text-red-800 mb-1">Gesamtkosten:</h4>
                    <div className="text-lg font-bold text-red-600">
                      {calculateTotalCosts()} Mrd €
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <h4 className="font-medium text-yellow-800 mb-1">Budget nach Entscheidung:</h4>
                    <div className={`text-lg font-bold ${
                      gameState.budget >= calculateTotalCosts() ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {gameState.budget >= calculateTotalCosts()
                        ? `${gameState.budget - calculateTotalCosts()} Mrd €`
                        : `Schulden: ${calculateTotalCosts() - gameState.budget} Mrd €`
                      }
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={handleSubmitDecision}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Entscheidung treffen
                </button>
              </>
            ) : (
              <p className="text-gray-500 italic">Wählen Sie zuerst eine oder mehrere Optionen</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DecisionPanel;