import React, { useState } from 'react';
import { GameState, YearlyReport } from '../types';
import { getGradeColor, getGradeDescription, formatPercentage, formatCurrency } from '../utils/formatters';

interface ReportsPanelProps {
  gameState: GameState;
}

const ReportsPanel: React.FC<ReportsPanelProps> = ({ gameState }) => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'overview' | 'detailed'>('overview');
  
  const { yearlyReports, legislatureReports, variables } = gameState;
  const reportYears = Object.keys(yearlyReports).map(Number).sort((a, b) => b - a);
  const selectedReport = selectedYear ? yearlyReports[selectedYear] : null;
  
  const getPerformanceTrend = (reports: YearlyReport[]) => {
    if (reports.length < 2) return 'neutral';
    const recent = reports[reports.length - 1];
    const previous = reports[reports.length - 2];
    
    if (recent.publicApproval > previous.publicApproval + 5) return 'positive';
    if (recent.publicApproval < previous.publicApproval - 5) return 'negative';
    return 'neutral';
  };
  
  const getTrendIcon = (trend: 'positive' | 'negative' | 'neutral') => {
    switch (trend) {
      case 'positive': return '↗️';
      case 'negative': return '↘️';
      default: return '➡️';
    }
  };
  
  const getTrendColor = (trend: 'positive' | 'negative' | 'neutral') => {
    switch (trend) {
      case 'positive': return 'text-green-600';
      case 'negative': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Auswertungen</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode('overview')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewMode === 'overview'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Übersicht
            </button>
            <button
              onClick={() => setViewMode('detailed')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewMode === 'detailed'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Detailliert
            </button>
          </div>
        </div>
        
        {reportYears.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">Noch keine Jahresauswertungen verfügbar</p>
            <p className="text-sm text-gray-400 mt-2">
              Auswertungen werden automatisch am Jahresende erstellt
            </p>
          </div>
        )}
      </div>
      
      {reportYears.length > 0 && viewMode === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {reportYears.map(year => {
            const report = yearlyReports[year];
            const reports = Object.values(yearlyReports).filter(r => r.year <= year);
            const trend = getPerformanceTrend(reports);
            
            return (
              <div 
                key={year}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedYear(year)}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Jahr {year}
                    {report.skipped && (
                      <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        Übersprungen
                      </span>
                    )}
                  </h3>
                  <div className={`flex items-center space-x-1 ${getTrendColor(trend)}`}>
                    <span>{getTrendIcon(trend)}</span>
                    <span className="text-sm font-medium">{formatPercentage(report.publicApproval)}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className={`text-2xl font-bold px-3 py-1 rounded ${getGradeColor(report.grade)}`}>
                      {report.grade}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      Gesamtnote
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-800">
                      {report.decisionsCount}
                    </div>
                    <div className="text-xs text-gray-600">
                      Entscheidungen
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Koalitionsstabilität:</span>
                    <span className="font-medium">{formatPercentage(report.coalitionStability)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Wirtschaftsleistung:</span>
                    <span className={`font-medium ${
                      report.economicPerformance > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {formatPercentage(report.economicPerformance, true)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Große Ereignisse:</span>
                    <span className="font-medium">{report.majorEvents.length}</span>
                  </div>
                </div>
                
                {report.recommendations.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Top-Empfehlung:</h4>
                    <p className="text-xs text-gray-600">
                      {report.recommendations[0]}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      
      {viewMode === 'detailed' && selectedReport && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">
              Detailbericht Jahr {selectedReport.year}
            </h3>
            <button
              onClick={() => setSelectedYear(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
          
          {/* Gesamtbewertung */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <div className={`text-4xl font-bold px-4 py-2 rounded ${getGradeColor(selectedReport.grade)}`}>
                {selectedReport.grade}
              </div>
              <div className="text-sm text-gray-600 mt-2">
                {getGradeDescription(selectedReport.grade)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {formatPercentage(selectedReport.publicApproval)}
              </div>
              <div className="text-sm text-gray-600">Popularität</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {formatPercentage(selectedReport.coalitionStability)}
              </div>
              <div className="text-sm text-gray-600">Koalition</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${
                selectedReport.economicPerformance > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {formatPercentage(selectedReport.economicPerformance, true)}
              </div>
              <div className="text-sm text-gray-600">Wirtschaft</div>
            </div>
          </div>
          
          {/* Wichtige Änderungen */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Wichtige Änderungen</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(selectedReport.variableChanges)
                .filter(([_, change]) => Math.abs(change.change) > 2)
                .sort((a, b) => Math.abs(b[1].change) - Math.abs(a[1].change))
                .slice(0, 9)
                .map(([variableId, change]) => {
                  const variable = variables[variableId];
                  if (!variable) return null;
                  
                  return (
                    <div key={variableId} className="bg-gray-50 rounded-lg p-4">
                      <h5 className="font-medium text-gray-800 text-sm mb-2">
                        {variable.name}
                      </h5>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                          {change.start.toFixed(1)} → {change.end.toFixed(1)}
                        </span>
                        <span className={`text-sm font-bold ${
                          change.change > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {change.change > 0 ? '+' : ''}{change.change.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  );
                })
              }
            </div>
          </div>
          
          {/* Empfehlungen */}
          {selectedReport.recommendations.length > 0 && (
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Empfehlungen</h4>
              <div className="space-y-3">
                {selectedReport.recommendations.map((recommendation, index) => (
                  <div key={index} className="bg-blue-50 border-l-4 border-blue-400 p-4">
                    <p className="text-blue-800">{recommendation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Große Ereignisse */}
          {selectedReport.majorEvents.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Große Ereignisse</h4>
              <div className="space-y-3">
                {selectedReport.majorEvents.map((event, index) => (
                  <div key={event.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h5 className="font-medium text-gray-800">{event.title}</h5>
                        <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded ${
                        event.category === 'positive' 
                          ? 'bg-green-100 text-green-800'
                          : event.category === 'negative'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-blue-100 text-blue-800'
                      }`}>
                        {event.importance}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      
      {viewMode === 'overview' && reportYears.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Schnellübersicht aller Jahre
          </h3>
          <div className="text-sm text-gray-600 mb-2">
            Klicken Sie auf ein Jahr für den Detailbericht
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsPanel;