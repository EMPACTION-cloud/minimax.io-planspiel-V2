// Kern-Interfaces für das politische Planspiel Deutschland 2025-2037

// Grundlegende Zeittypen
export interface GameDate {
  year: number;
  month: number;
  day: number;
}

export interface Timer {
  isRunning: boolean;
  startTime: Date | null;
  elapsedTime: number; // in Millisekunden
  pausedTime: number;
}

// Bewertungsvariablen System
export interface EvaluationVariable {
  id: string;
  name: string;
  value: number;
  unit: string;
  minValue: number;
  maxValue: number;
  description: string;
  category: 'politics' | 'economy' | 'society' | 'security' | 'environment' | 'overall';
  format: 'percentage' | 'currency' | 'number' | 'ratio';
  history: VariableHistoryPoint[];
}

export interface VariableHistoryPoint {
  date: GameDate;
  value: number;
  source: 'decision' | 'event' | 'natural';
  sourceId?: string;
  explanation: string;
}

// Entscheidungssystem
export interface DecisionOption {
  id: string;
  title: string;
  description: string;
  costs: number; // in Milliarden €
  effects: {
    [variableId: string]: {
      immediate: number;
      delayed: { delayMonths: number; value: number }[];
      explanation: string;
    }
  };
  dependencies: string[]; // IDs von Abhängigkeiten
  conflicts: string[]; // IDs von sich widersprechenden Optionen
  requiredState?: { [variableId: string]: { min?: number; max?: number } };
}

export interface Decision {
  id: string;
  title: string;
  question: string;
  category: 'social' | 'environment' | 'transport' | 'energy' | 'defense' | 'education' | 'economy' | 'infrastructure' | 'digitalization' | 'agriculture' | 'health' | 'housing' | 'development';
  description: string;
  options: DecisionOption[];
  multipleChoice: boolean;
  availableFrom?: GameDate;
  availableUntil?: GameDate;
  requiredState?: { [variableId: string]: { min?: number; max?: number } };
  dependencies?: string[]; // IDs von Entscheidungen die vorher getroffen werden müssen
}

export interface DecisionResult {
  decisionId: string;
  selectedOptions: string[];
  date: GameDate;
  totalCosts: number;
}

// Parteiensystem
export interface Party {
  id: string;
  name: string;
  color: string;
  ideology: 'far-left' | 'left' | 'center-left' | 'center' | 'center-right' | 'right' | 'far-right';
  popularity: number; // 0-100%
  coreIssues: string[]; // Kernthemen
  redLines: string[]; // Absolute No-Gos
  relationshipToChancellor: number; // 0-100%
  relationshipToProgressives: number; // 0-100%
  relationships: { [partyId: string]: number }; // 0-100% zu anderen Parteien
  cooperationWillingness: number; // 0-100%
  positions: { [issueId: string]: number }; // -100 bis +100 für verschiedene Themen
  demands: PartyDemand[];
}

export interface PartyDemand {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  negotiable: boolean;
  requiredVariableChange?: { [variableId: string]: number };
  requiredDecisions?: string[];
  forbiddenDecisions?: string[];
}

// Koalitionssystem
export interface Coalition {
  parties: string[]; // Party IDs
  totalSeats: number;
  stability: number; // 0-100%
  agreementLevel: number; // 0-100%
  formed: GameDate;
  agreements: string[]; // Vereinbarte Punkte
  compromises: { [partyId: string]: string[] }; // Zugeständnisse pro Partei
}

export interface CoalitionNegotiation {
  participatingParties: string[];
  currentProposals: { [partyId: string]: PartyDemand[] };
  acceptedProposals: string[];
  rejectedProposals: string[];
  negotiationRound: number;
  maxRounds: number;
  deadlineDate: GameDate;
  status: 'ongoing' | 'success' | 'failed' | 'timeout';
}

// Wahlsystem
export interface Election {
  date: GameDate;
  type: 'regular' | 'early';
  results: { [partyId: string]: number }; // Stimmenanteil 0-100%
  turnout: number; // Wahlbeteiligung 0-100%
  campaignResults: { [partyId: string]: number }; // Wahlkampf-Performance
}

export interface Campaign {
  party: string;
  promises: CampaignPromise[];
  events: CampaignEvent[];
  budget: number;
  effectiveness: number; // 0-100%
}

export interface CampaignPromise {
  id: string;
  title: string;
  description: string;
  category: string;
  believability: number; // 0-100%
  popularity: number; // 0-100%
  fulfilled?: boolean;
}

export interface CampaignEvent {
  id: string;
  type: 'interview' | 'debate' | 'rally' | 'advertisement';
  title: string;
  description: string;
  date: GameDate;
  cost: number;
  effectiveness: number;
  completed: boolean;
}

// Ereignissystem
export interface EventTrigger {
  id: string;
  name: string;
  description: string;
  conditions: EventCondition[];
  effects: { [variableId: string]: number };
  cost?: number;
  oneTime: boolean;
  probability: number; // 0-1
  stakeholder?: 'eu' | 'china' | 'usa' | 'nato' | 'economy' | 'unions' | 'environment' | 'media';
  triggered: boolean;
  triggerDate?: GameDate;
}

export interface EventCondition {
  variableId: string;
  operator: '>' | '<' | '=' | '>=' | '<=' | '!=';
  value: number;
  duration?: number; // Anzahl Tage die Bedingung erfüllt sein muss
  durationMet?: number; // Tage seit Bedingung erfüllt
}

export interface GameEvent {
  id: string;
  triggerId?: string;
  title: string;
  description: string;
  date: GameDate;
  effects: { [variableId: string]: number };
  cost: number;
  category: 'positive' | 'negative' | 'neutral';
  stakeholder?: string;
  importance: 'low' | 'medium' | 'high' | 'critical';
}

// Auswertungssystem
export interface YearlyReport {
  year: number;
  decisionsCount: number;
  majorEvents: GameEvent[];
  variableChanges: { [variableId: string]: { start: number; end: number; change: number } };
  coalitionStability: number;
  publicApproval: number;
  economicPerformance: number;
  recommendations: string[];
  grade: 'A+' | 'A' | 'B+' | 'B' | 'C+' | 'C' | 'D+' | 'D' | 'F';
  skipped: boolean;
}

export interface LegislatureReport {
  startYear: number;
  endYear: number;
  totalDecisions: number;
  majorAchievements: string[];
  majorFailures: string[];
  coalitionChanges: Coalition[];
  overallRating: number;
  historicalComparison: string;
  nextElectionPrediction: { [partyId: string]: number };
}

// Spielzustand
export interface GameState {
  currentDate: GameDate;
  timer: Timer;
  isInDecisionTab: boolean;
  
  // Spielmechanik
  decisionsThisYear: number;
  maxDecisionsPerYear: number;
  budget: number;
  annualBudget: number;
  debt: number;
  interestRate: number;
  
  // Daten
  variables: { [id: string]: EvaluationVariable };
  decisions: Decision[];
  decisionHistory: DecisionResult[];
  availableDecisions: string[]; // IDs der verfügbaren Entscheidungen
  
  // Politik
  parties: { [id: string]: Party };
  currentCoalition?: Coalition;
  coalitionNegotiation?: CoalitionNegotiation;
  
  // Wahlen
  nextElection: GameDate;
  lastElection?: Election;
  campaign?: Campaign;
  
  // Ereignisse
  events: GameEvent[];
  eventTriggers: EventTrigger[];
  
  // Auswertungen
  yearlyReports: { [year: number]: YearlyReport };
  legislatureReports: LegislatureReport[];
  
  // Spielmodi
  gameOver: boolean;
  gameOverReason?: string;
  difficulty: 'easy' | 'normal' | 'hard';
  
  // Spielereinstellungen
  autoSaveEnabled: boolean;
  showDetailedExplanations: boolean;
  animationsEnabled: boolean;
}

// Utility Types
export type TabType = 'dashboard' | 'decisions' | 'parties' | 'campaign' | 'negotiations' | 'reports' | 'history';

export interface TabConfig {
  id: TabType;
  label: string;
  icon: string;
  available: boolean;
  badge?: string | number;
}

export interface NotificationMessage {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  date: GameDate;
  read: boolean;
  persistent: boolean;
  actions?: { label: string; action: () => void }[];
}

// Formatierungs-Utilities
export interface FormatConfig {
  showPlus: boolean;
  showUnit: boolean;
  precision: number;
  shortForm: boolean;
}

export type VariableChangeType = 'increase' | 'decrease' | 'stable';

export interface VariableImpact {
  variableId: string;
  currentValue: number;
  change: number;
  newValue: number;
  changeType: VariableChangeType;
  explanation: string;
  source: 'decision' | 'event';
  sourceId: string;
}

// Validierung
export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

// Export aller Types für einfache Verwendung
export * from './index';
