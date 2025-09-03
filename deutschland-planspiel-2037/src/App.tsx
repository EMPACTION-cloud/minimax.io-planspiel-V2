import React from 'react';
import { useGameLogic } from './hooks/useGameLogic';
import Dashboard from './components/Dashboard';
import DecisionPanel from './components/DecisionPanel';
import PartyOverview from './components/PartyOverview';
import ReportsPanel from './components/ReportsPanel';
import NotificationPanel from './components/NotificationPanel';
import GameHeader from './components/GameHeader';
import TabNavigation from './components/TabNavigation';
import { TabType } from './types';

function App() {
  const {
    gameState,
    notifications,
    currentTab,
    makeDecision,
    setCurrentTab,
    setInDecisionTab,
    jumpToNextYear,
    jumpToLegislatureEnd,
    addNotification,
    markNotificationAsRead,
    canMakeDecision,
    decisionWarning,
    elapsedTime,
    formattedTime,
    formattedDate,
    yearProgress,
    legislatureProgress
  } = useGameLogic();

  const tabs: { id: TabType; label: string; icon: string; available: boolean; badge?: string | number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'BarChart3', available: true },
    { 
      id: 'decisions', 
      label: 'Entscheidungen', 
      icon: 'FileText', 
      available: canMakeDecision, 
      badge: decisionWarning ? '!' : undefined 
    },
    { id: 'parties', label: 'Parteien', icon: 'Users', available: true },
    { 
      id: 'campaign', 
      label: 'Wahlkampf', 
      icon: 'Megaphone', 
      available: false, // Wird später aktiviert
      badge: undefined 
    },
    { 
      id: 'negotiations', 
      label: 'Koalition', 
      icon: 'Handshake', 
      available: false, // Wird bei Wahlen aktiviert
      badge: undefined 
    },
    { 
      id: 'reports', 
      label: 'Auswertungen', 
      icon: 'FileBarChart', 
      available: Object.keys(gameState.yearlyReports).length > 0,
      badge: Object.keys(gameState.yearlyReports).length || undefined
    },
    { 
      id: 'history', 
      label: 'Historie', 
      icon: 'Clock', 
      available: gameState.decisionHistory.length > 0,
      badge: gameState.decisionHistory.length || undefined
    }
  ];

  React.useEffect(() => {
    setInDecisionTab(currentTab === 'decisions');
  }, [currentTab, setInDecisionTab]);

  const renderCurrentTab = () => {
    switch (currentTab) {
      case 'dashboard':
        return <Dashboard gameState={gameState} />;
      case 'decisions':
        return (
          <DecisionPanel 
            gameState={gameState}
            onMakeDecision={makeDecision}
            canMakeDecision={canMakeDecision}
            decisionWarning={decisionWarning}
            formattedTime={formattedTime}
          />
        );
      case 'parties':
        return <PartyOverview gameState={gameState} />;
      case 'reports':
        return <ReportsPanel gameState={gameState} />;
      default:
        return <Dashboard gameState={gameState} />;
    }
  };

  if (gameState.gameOver) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Spiel beendet</h1>
          <p className="text-gray-700 mb-4">
            {gameState.gameOverReason || 'Das Spiel ist vorzeitig beendet worden.'}
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Neu starten
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <GameHeader 
        currentDate={formattedDate}
        yearProgress={yearProgress}
        legislatureProgress={legislatureProgress}
        budget={gameState.budget}
        debt={gameState.debt}
        popularity={gameState.variables.popularity?.value || 50}
        coalition={gameState.currentCoalition}
        onJumpToNextYear={jumpToNextYear}
        onJumpToLegislatureEnd={jumpToLegislatureEnd}
      />
      
      {/* Tab Navigation */}
      <TabNavigation 
        tabs={tabs}
        currentTab={currentTab}
        onTabChange={setCurrentTab}
      />
      
      {/* Notifications */}
      {notifications.length > 0 && (
        <NotificationPanel 
          notifications={notifications}
          onMarkAsRead={markNotificationAsRead}
        />
      )}
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {renderCurrentTab()}
      </main>
    </div>
  );
}

export default App;
