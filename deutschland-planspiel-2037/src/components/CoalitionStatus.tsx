import React from 'react';
import { Coalition, Party } from '../types';
import { formatDate } from '../utils/formatters';

interface CoalitionStatusProps {
  coalition?: Coalition;
  parties: { [id: string]: Party };
}

const CoalitionStatus: React.FC<CoalitionStatusProps> = ({ coalition, parties }) => {
  if (!coalition) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-red-800 mb-2">Keine Koalition</h3>
        <p className="text-red-600">Derzeit ist keine Koalition gebildet. Koalitionsverhandlungen erforderlich.</p>
      </div>
    );
  }
  
  const coalitionParties = coalition.parties.map(partyId => parties[partyId]).filter(Boolean);
  const totalSeats = coalition.totalSeats;
  const hasAbsoluteMajority = totalSeats >= 50;
  
  const getStabilityColor = (stability: number) => {
    if (stability >= 75) return 'text-green-600 bg-green-100';
    if (stability >= 50) return 'text-yellow-600 bg-yellow-100';
    if (stability >= 25) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800">Koalitionsstatus</h3>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStabilityColor(coalition.stability)}`}>
          Stabilität: {coalition.stability}%
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-700 mb-2">Koalitionspartner</h4>
          <div className="space-y-2">
            {coalitionParties.map(party => (
              <div key={party.id} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: party.color }}
                />
                <span className="text-sm font-medium">{party.name}</span>
                <span className="text-xs text-gray-500">({party.popularity}%)</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-700 mb-2">Mehrheitsverhältnisse</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Sitze:</span>
              <span className={`text-sm font-medium ${hasAbsoluteMajority ? 'text-green-600' : 'text-red-600'}`}>
                {totalSeats}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Einigkeit:</span>
              <span className="text-sm font-medium">{coalition.agreementLevel}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${Math.min(100, totalSeats * 2)}%` }}
              />
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-700 mb-2">Koalitionsdetails</h4>
          <div className="space-y-1 text-sm text-gray-600">
            <div>Gebildet: {formatDate(coalition.formed, 'short')}</div>
            <div>Vereinbarungen: {coalition.agreements.length}</div>
            <div>Status: {hasAbsoluteMajority ? '✓ Handlungsfähig' : '⚠ Minderheit'}</div>
          </div>
        </div>
      </div>
      
      {coalition.agreements.length > 0 && (
        <div>
          <h4 className="font-semibold text-gray-700 mb-3">Koalitionsvereinbarungen</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {coalition.agreements.map((agreement, index) => (
              <div key={index} className="bg-blue-50 border-l-4 border-blue-400 p-3">
                <p className="text-sm text-blue-800">{agreement}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CoalitionStatus;