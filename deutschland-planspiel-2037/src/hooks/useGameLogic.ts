import { useState, useEffect, useCallback, useRef } from 'react';
import { GameState, GameDate, Timer, DecisionResult, GameEvent, YearlyReport, LegislatureReport, NotificationMessage } from '../types';
import { initialVariables } from '../data/variables';
import { initialParties } from '../data/parties';
import { initialDecisions } from '../data/decisions';
import { eventTriggers, checkEventTriggers } from '../data/events';
import { GameTimeManager, TIME_CONSTANTS } from '../utils/timeManager';

// Zentraler Game State Manager Hook
export const useGameLogic = () => {
  // Initialer Spielzustand
  const [gameState, setGameState] = useState<GameState>({
    currentDate: TIME_CONSTANTS.GAME_START,
    timer: GameTimeManager.createTimer(),
    isInDecisionTab: false,
    
    // Spielmechanik
    decisionsThisYear: 0,
    maxDecisionsPerYear: TIME_CONSTANTS.MAX_DECISIONS_PER_YEAR,
    budget: 25, // 25 Mrd€ pro Jahr
    annualBudget: 25,
    debt: 0,
    interestRate: 3.0,
    
    // Daten
    variables: { ...initialVariables },
    decisions: [...initialDecisions],
    decisionHistory: [],
    availableDecisions: initialDecisions.map(d => d.id),
    
    // Politik
    parties: { ...initialParties },
    currentCoalition: {
      parties: ['progressive', 'sozialdemokraten', 'liberale'],
      totalSeats: 50, // 25% + 11% + 15% = 51%
      stability: 75,
      agreementLevel: 65,
      formed: TIME_CONSTANTS.GAME_START,
      agreements: [
        'Klimaziele bis 2030 erreichen',
        'Digitalisierung vorantreiben',
        'Soziale Gerechtigkeit stärken'
      ],
      compromises: {
        'sozialdemokraten': ['Verzicht auf Vermögenssteuer'],
        'liberale': ['Akzeptanz höherer Klimainvestitionen']
      }
    },
    
    // Wahlen
    nextElection: TIME_CONSTANTS.ELECTION_DATES[0], // 2029
    
    // Ereignisse
    events: [],
    eventTriggers: [...eventTriggers],
    
    // Auswertungen
    yearlyReports: {},
    legislatureReports: [],
    
    // Spielmodi
    gameOver: false,
    difficulty: 'normal',
    
    // Einstellungen
    autoSaveEnabled: true,
    showDetailedExplanations: true,
    animationsEnabled: true
  });
  
  const [notifications, setNotifications] = useState<NotificationMessage[]>([]);
  const timerInterval = useRef<NodeJS.Timeout | null>(null);
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  
  // Timer Management
  const startTimer = useCallback(() => {
    if (!gameState.isInDecisionTab) return;
    
    setGameState(prev => ({
      ...prev,
      timer: GameTimeManager.startTimer(prev.timer)
    }));
    
    // Timer läuft nur im Entscheidungs-Tab
    if (timerInterval.current) clearInterval(timerInterval.current);
    timerInterval.current = setInterval(() => {
      setGameState(prev => {
        if (!prev.isInDecisionTab || !prev.timer.isRunning) return prev;
        
        // 1 Sekunde = 1 Tag
        const newDate = GameTimeManager.addDays(prev.currentDate, 1);
        const newYear = newDate.year !== prev.currentDate.year;
        
        let updatedState = {
          ...prev,
          currentDate: newDate
        };
        
        // Jahreswechsel
        if (newYear) {
          updatedState = {
            ...updatedState,
            decisionsThisYear: 0,
            budget: prev.annualBudget // Budget zurücksetzen
          };
          
          // Automatische Jahresauswertung
          const yearlyReport = generateYearlyReport(prev, prev.currentDate.year);
          updatedState.yearlyReports[prev.currentDate.year] = yearlyReport;
        }
        
        // Ereignisse prüfen
        const triggeredEvents = checkEventTriggers(prev.variables, newDate);
        if (triggeredEvents.length > 0) {
          updatedState = processTriggeredEvents(updatedState, triggeredEvents);
        }
        
        return updatedState;
      });
    }, 1000); // 1 Sekunde
  }, [gameState.isInDecisionTab]);
  
  const pauseTimer = useCallback(() => {
    if (timerInterval.current) {
      clearInterval(timerInterval.current);
      timerInterval.current = null;
    }
    
    setGameState(prev => ({
      ...prev,
      timer: GameTimeManager.pauseTimer(prev.timer)
    }));
  }, []);
  
  const setInDecisionTab = useCallback((inTab: boolean) => {
    setGameState(prev => ({
      ...prev,
      isInDecisionTab: inTab
    }));
    
    if (inTab) {
      startTimer();
    } else {
      pauseTimer();
    }
  }, [startTimer, pauseTimer]);
  
  // Entscheidungen treffen
  const makeDecision = useCallback((decisionId: string, selectedOptions: string[]) => {
    if (gameState.decisionsThisYear >= gameState.maxDecisionsPerYear) {
      addNotification({
        type: 'error',
        title: 'Entscheidungslimit erreicht',
        message: 'Sie haben das maximale Limit von 8 Entscheidungen pro Jahr erreicht.',
        persistent: false
      });
      return false;
    }
    
    const decision = gameState.decisions.find(d => d.id === decisionId);
    if (!decision) return false;
    
    const options = selectedOptions.map(optionId => 
      decision.options.find(opt => opt.id === optionId)
    ).filter(Boolean);
    
    if (options.length === 0) return false;
    
    // Konflikte prüfen
    const conflicts = options.some(option => 
      option!.conflicts.some(conflictId => selectedOptions.includes(conflictId))
    );
    
    if (conflicts) {
      addNotification({
        type: 'error',
        title: 'Konflikt zwischen Optionen',
        message: 'Die gewählten Optionen widersprechen sich und können nicht kombiniert werden.',
        persistent: false
      });
      return false;
    }
    
    // Kosten berechnen
    const totalCosts = options.reduce((sum, option) => sum + option!.costs, 0);
    
    // Entscheidung anwenden
    const decisionResult: DecisionResult = {
      decisionId,
      selectedOptions,
      date: gameState.currentDate,
      totalCosts
    };
    
    setGameState(prev => {
      let newState = {
        ...prev,
        decisionsThisYear: prev.decisionsThisYear + 1,
        decisionHistory: [...prev.decisionHistory, decisionResult]
      };
      
      // Auswirkungen anwenden
      options.forEach(option => {
        if (!option) return;
        
        // Sofortige Auswirkungen
        Object.entries(option.effects).forEach(([variableId, effect]) => {
          if (newState.variables[variableId]) {
            const oldValue = newState.variables[variableId].value;
            let newValue = oldValue + effect.immediate;
            
            // Werte in erlaubten Grenzen halten
            const variable = newState.variables[variableId];
            newValue = Math.max(variable.minValue, Math.min(variable.maxValue, newValue));
            
            newState.variables[variableId] = {
              ...variable,
              value: newValue,
              history: [
                ...variable.history,
                {
                  date: prev.currentDate,
                  value: newValue,
                  source: 'decision',
                  sourceId: decisionId,
                  explanation: effect.explanation
                }
              ]
            };
          }
        });
        
        // Zeitverzögerte Auswirkungen planen (vereinfacht)
        // TODO: Implementiere Delayed Effects System
      });
      
      // Budget und Schulden anpassen
      if (totalCosts > 0) {
        if (newState.budget >= totalCosts) {
          newState.budget -= totalCosts;
        } else {
          const remainingCosts = totalCosts - newState.budget;
          newState.budget = 0;
          newState.debt -= remainingCosts; // Debt ist negativ
        }
        
        // Zinskosten neu berechnen
        newState.interestRate = 3.0 + Math.abs(newState.debt) / 100 * 0.3;
      }
      
      // Koalitionszufriedenheit prüfen
      newState = updateCoalitionSatisfaction(newState, decisionResult, options);
      
      // Gesamtbewertung neu berechnen
      newState = recalculateOverallRating(newState);
      
      return newState;
    });
    
    addNotification({
      type: 'success',
      title: 'Entscheidung getroffen',
      message: `"${decision.title}" wurde erfolgreich umgesetzt.`,
      persistent: false
    });
    
    return true;
  }, [gameState]);
  
  // Zeitsteuerung
  const jumpToNextYear = useCallback(() => {
    setGameState(prev => {
      const newDate = GameTimeManager.jumpToNextYear(prev.currentDate);
      const yearlyReport = generateYearlyReport(prev, prev.currentDate.year);
      
      return {
        ...prev,
        currentDate: newDate,
        decisionsThisYear: 0,
        budget: prev.annualBudget,
        yearlyReports: {
          ...prev.yearlyReports,
          [prev.currentDate.year]: { ...yearlyReport, skipped: true }
        }
      };
    });
  }, []);
  
  const jumpToLegislatureEnd = useCallback(() => {
    setGameState(prev => {
      const newDate = GameTimeManager.jumpToLegislatureEnd(prev.currentDate);
      
      // Alle Jahre bis zum Legislaturende als übersprungen markieren
      const updatedReports = { ...prev.yearlyReports };
      for (let year = prev.currentDate.year; year <= newDate.year; year++) {
        if (!updatedReports[year]) {
          updatedReports[year] = generateYearlyReport(prev, year, true);
        }
      }
      
      return {
        ...prev,
        currentDate: newDate,
        decisionsThisYear: 0,
        budget: prev.annualBudget,
        yearlyReports: updatedReports
      };
    });
  }, []);
  
  // Hilfsfunktionen
  const addNotification = useCallback((notification: Omit<NotificationMessage, 'id' | 'date' | 'read'>) => {
    const newNotification: NotificationMessage = {
      ...notification,
      id: Date.now().toString(),
      date: gameState.currentDate,
      read: false
    };
    
    setNotifications(prev => [newNotification, ...prev]);
  }, [gameState.currentDate]);
  
  const markNotificationAsRead = useCallback((id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  }, []);
  
  const canMakeDecision = useCallback(() => {
    return GameTimeManager.canMakeDecision(gameState.decisionsThisYear, gameState.maxDecisionsPerYear);
  }, [gameState.decisionsThisYear, gameState.maxDecisionsPerYear]);
  
  const getDecisionWarning = useCallback(() => {
    return GameTimeManager.getDecisionWarning(gameState.decisionsThisYear, gameState.maxDecisionsPerYear);
  }, [gameState.decisionsThisYear, gameState.maxDecisionsPerYear]);
  
  // Cleanup
  useEffect(() => {
    return () => {
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
      }
    };
  }, []);
  
  return {
    // State
    gameState,
    notifications,
    currentTab,
    
    // Actions
    makeDecision,
    setCurrentTab,
    setInDecisionTab,
    jumpToNextYear,
    jumpToLegislatureEnd,
    addNotification,
    markNotificationAsRead,
    
    // Computed
    canMakeDecision: canMakeDecision(),
    decisionWarning: getDecisionWarning(),
    elapsedTime: GameTimeManager.getTotalElapsedTime(gameState.timer),
    formattedTime: GameTimeManager.formatElapsedTime(GameTimeManager.getTotalElapsedTime(gameState.timer)),
    formattedDate: GameTimeManager.formatGameDate(gameState.currentDate),
    yearProgress: GameTimeManager.getYearProgress(gameState.currentDate),
    legislatureProgress: GameTimeManager.getLegislatureProgress(gameState.currentDate),
    
    // Utils
    GameTimeManager
  };
};

// Hilfsfunktionen
function generateYearlyReport(gameState: GameState, year: number, skipped: boolean = false): YearlyReport {
  const decisions = gameState.decisionHistory.filter(d => d.date.year === year);
  const events = gameState.events.filter(e => e.date.year === year);
  
  // Vereinfachte Berechnung
  const variableChanges: { [key: string]: { start: number; end: number; change: number } } = {};
  Object.entries(gameState.variables).forEach(([id, variable]) => {
    const yearStart = variable.history.find(h => h.date.year === year && h.date.month === 1)?.value || variable.value;
    const yearEnd = variable.history.filter(h => h.date.year === year).slice(-1)[0]?.value || variable.value;
    
    variableChanges[id] = {
      start: yearStart,
      end: yearEnd,
      change: yearEnd - yearStart
    };
  });
  
  // Bewertung basierend auf Performance
  const overallChange = variableChanges['overall_rating']?.change || 0;
  let grade: YearlyReport['grade'] = 'C';
  if (overallChange > 15) grade = 'A+';
  else if (overallChange > 10) grade = 'A';
  else if (overallChange > 5) grade = 'B+';
  else if (overallChange > 0) grade = 'B';
  else if (overallChange > -5) grade = 'C+';
  else if (overallChange > -10) grade = 'D+';
  else if (overallChange > -15) grade = 'D';
  else grade = 'F';
  
  return {
    year,
    decisionsCount: decisions.length,
    majorEvents: events.filter(e => e.importance === 'high' || e.importance === 'critical'),
    variableChanges,
    coalitionStability: gameState.currentCoalition?.stability || 0,
    publicApproval: gameState.variables['popularity']?.value || 50,
    economicPerformance: gameState.variables['economic_growth']?.value || 0,
    recommendations: generateRecommendations(gameState),
    grade,
    skipped
  };
}

function generateRecommendations(gameState: GameState): string[] {
  const recommendations: string[] = [];
  
  // Analysiere kritische Werte
  if (gameState.variables['debt']?.value < -100) {
    recommendations.push('Schuldenstand kritisch - dringende Konsolidierung nötig');
  }
  
  if (gameState.variables['popularity']?.value < 30) {
    recommendations.push('Niedrige Popularität - mehr Bürgernahe Maßnahmen erforderlich');
  }
  
  if (gameState.variables['coalition_social']?.value < 25 || gameState.variables['coalition_liberal']?.value < 25) {
    recommendations.push('Koalition instabil - Kompromisse mit Partnern suchen');
  }
  
  if (gameState.variables['co2_reduction_path']?.value < 40) {
    recommendations.push('Klimaziele in Gefahr - verstärkte Anstrengungen nötig');
  }
  
  return recommendations;
}

function updateCoalitionSatisfaction(state: GameState, decision: DecisionResult, options: any[]): GameState {
  // Vereinfachte Koalitionslogik - kann erweitert werden
  return state;
}

function recalculateOverallRating(state: GameState): GameState {
  // Vereinfachte Gesamtbewertung - gewichteter Durchschnitt wichtiger Variablen
  const weights = {
    'popularity': 0.15,
    'economic_growth': 0.12,
    'unemployment': -0.10, // Negativ weil niedrigere Werte besser sind
    'co2_reduction_path': 0.10,
    'future_viability_index': 0.10,
    'debt': -0.08, // Negativ weil Schulden schlecht sind
    'coalition_social': 0.08,
    'coalition_liberal': 0.08,
    'investment_attractiveness': 0.07,
    'energy_security': 0.05,
    'digitalization_index': 0.05
  };
  
  let totalScore = 0;
  let totalWeight = 0;
  
  Object.entries(weights).forEach(([variableId, weight]) => {
    const variable = state.variables[variableId];
    if (variable) {
      const normalizedValue = (variable.value - variable.minValue) / (variable.maxValue - variable.minValue) * 100;
      totalScore += normalizedValue * Math.abs(weight) * (weight > 0 ? 1 : -1);
      totalWeight += Math.abs(weight);
    }
  });
  
  const overallRating = Math.max(5, Math.min(98, totalScore / totalWeight));
  
  return {
    ...state,
    variables: {
      ...state.variables,
      overall_rating: {
        ...state.variables['overall_rating'],
        value: overallRating
      }
    }
  };
}

function processTriggeredEvents(state: GameState, events: any[]): GameState {
  let newState = { ...state };
  
  events.forEach(eventTrigger => {
    const gameEvent: GameEvent = {
      id: `event_${Date.now()}_${eventTrigger.id}`,
      triggerId: eventTrigger.id,
      title: eventTrigger.name,
      description: eventTrigger.description,
      date: state.currentDate,
      effects: eventTrigger.effects,
      cost: eventTrigger.cost || 0,
      category: 'neutral', // Kann je nach Ereignis angepasst werden
      stakeholder: eventTrigger.stakeholder,
      importance: 'medium'
    };
    
    newState.events = [...newState.events, gameEvent];
    
    // Auswirkungen anwenden
    Object.entries(eventTrigger.effects).forEach(([variableId, effect]) => {
      if (newState.variables[variableId]) {
        const variable = newState.variables[variableId];
        const oldValue = variable.value;
        const newValue = Math.max(variable.minValue, Math.min(variable.maxValue, oldValue + (effect as number)));
        
        newState.variables[variableId] = {
          ...variable,
          value: newValue,
          history: [
            ...variable.history,
            {
              date: state.currentDate,
              value: newValue,
              source: 'event',
              sourceId: gameEvent.id,
              explanation: `Ereignis: ${eventTrigger.name}`
            }
          ]
        };
      }
    });
    
    // Kosten vom Budget abziehen
    if (gameEvent.cost > 0) {
      if (newState.budget >= gameEvent.cost) {
        newState.budget -= gameEvent.cost;
      } else {
        const remainingCosts = gameEvent.cost - newState.budget;
        newState.budget = 0;
        newState.debt -= remainingCosts;
      }
    }
  });
  
  return newState;
}

export default useGameLogic;
