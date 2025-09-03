import React from 'react';
import { Coalition } from '../types';
import { formatCurrency, formatPercentage } from '../utils/formatters';

interface GameHeaderProps {
  currentDate: string;
  yearProgress: number;
  legislatureProgress: number;
  budget: number;
  debt: number;
  popularity: number;
  coalition?: Coalition;
  onJumpToNextYear: () => void;
  onJumpToLegislatureEnd: () => void;
}

const GameHeader: React.FC<GameHeaderProps> = ({
  currentDate,
  yearProgress,
  legislatureProgress,
  budget,
  debt,
  popularity,
  coalition,
  onJumpToNextYear,
  onJumpToLegislatureEnd
}) => {
  const getPopularityColor = (value: number) => {
    if (value >= 60) return 'text-green-600';
    if (value >= 40) return 'text-yellow-600';
    if (value >= 25) return 'text-orange-600';
    return 'text-red-600';
  };
  
  return (
    <header className="bg-white shadow-lg border-b-2 border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          {/* Logo und Titel */}
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-red-500 via-yellow-500 to-red-600 w-12 h-8 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">DE</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Deutschland Planspiel</h1>
              <p className="text-sm text-gray-600">2025-2037</p>
            </div>
          </div>
          
          {/* Zentrale Infos */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">{currentDate}</div>
              <div className="text-sm text-gray-600">Aktuelles Datum</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${yearProgress}%` }}
                />
              </div>
              <div className="text-xs text-gray-500 mt-1">Jahr: {yearProgress}%</div>
            </div>
            
            <div className="text-center">
              <div className={`text-2xl font-bold ${getPopularityColor(popularity)}`}>
                {formatPercentage(popularity)}
              </div>
              <div className="text-sm text-gray-600">Popularität</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div 
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${legislatureProgress}%` }}
                />
              </div>
              <div className="text-xs text-gray-500 mt-1">Legislatur: {legislatureProgress}%</div>
            </div>
          </div>
          
          {/* Finanzielle Lage */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-lg font-semibold text-gray-800">
                {formatCurrency(budget)}
              </div>
              <div className="text-sm text-gray-600">Verfügbares Budget</div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-3">
              <div className={`text-lg font-semibold ${
                debt >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {formatCurrency(debt)}
              </div>
              <div className="text-sm text-gray-600">
                {debt >= 0 ? 'Rücklage' : 'Schulden'}
              </div>
            </div>
          </div>
        </div>
        
        {/* Koalitionsstatus und Zeitsteuerung */}
        <div className="mt-4 flex flex-wrap items-center justify-between">
          <div className="flex items-center space-x-4">
            {coalition && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
                <div className="text-sm font-medium text-blue-800">
                  Koalition: {coalition.parties.length} Parteien
                </div>
                <div className="text-xs text-blue-600">
                  {coalition.totalSeats}% Sitze • {coalition.stability}% Stabilität
                </div>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={onJumpToNextYear}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
            >
              Nächstes Jahr
            </button>
            <button
              onClick={onJumpToLegislatureEnd}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
            >
              Legislaturende
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default GameHeader;