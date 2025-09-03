import { EvaluationVariable, GameDate } from '../types';

// Startdatum für alle Variablen
const startDate: GameDate = { year: 2025, month: 1, day: 1 };

// Alle 31 Bewertungsvariablen mit korrekten Ausgangswerten
export const initialVariables: { [id: string]: EvaluationVariable } = {
  // POLITISCHE METRIKEN
  'popularity': {
    id: 'popularity',
    name: 'Popularität bei Wählern',
    value: 50,
    unit: '%',
    minValue: 20,
    maxValue: 80,
    description: 'Zustimmung der Bevölkerung zur Regierungsarbeit',
    category: 'politics',
    format: 'percentage',
    history: [{
      date: startDate,
      value: 50,
      source: 'natural',
      explanation: 'Ausgangswert zu Legislaturperioden-Beginn'
    }]
  },
  
  'coalition_social': {
    id: 'coalition_social',
    name: 'Zufriedenheit sozialdemokratischer Koalitionspartner',
    value: 50,
    unit: '%',
    minValue: 0,
    maxValue: 90,
    description: 'Zufriedenheit des sozialdemokratischen Partners (<20% = Koalitionsbruch)',
    category: 'politics',
    format: 'percentage',
    history: [{
      date: startDate,
      value: 50,
      source: 'natural',
      explanation: 'Koalitionsstart mit neutraler Zufriedenheit'
    }]
  },
  
  'coalition_liberal': {
    id: 'coalition_liberal',
    name: 'Zufriedenheit liberaler Koalitionspartner',
    value: 50,
    unit: '%',
    minValue: 0,
    maxValue: 90,
    description: 'Zufriedenheit des liberalen Partners (<20% = Koalitionsbruch)',
    category: 'politics',
    format: 'percentage',
    history: [{
      date: startDate,
      value: 50,
      source: 'natural',
      explanation: 'Koalitionsstart mit neutraler Zufriedenheit'
    }]
  },
  
  // WIRTSCHAFTSMETRIKEN
  'unemployment': {
    id: 'unemployment',
    name: 'Arbeitslosenquote',
    value: 5,
    unit: '%',
    minValue: 1,
    maxValue: 7,
    description: 'Anteil der Arbeitslosen an der Erwerbsbevölkerung',
    category: 'economy',
    format: 'percentage',
    history: [{
      date: startDate,
      value: 5,
      source: 'natural',
      explanation: 'Durchschnittliche Arbeitslosenquote 2025'
    }]
  },
  
  'economic_growth': {
    id: 'economic_growth',
    name: 'Wirtschaftswachstum',
    value: 0,
    unit: '%',
    minValue: -5,
    maxValue: 5,
    description: 'Jährliches BIP-Wachstum',
    category: 'economy',
    format: 'percentage',
    history: [{
      date: startDate,
      value: 0,
      source: 'natural',
      explanation: 'Wirtschaftsstagnation zu Jahresbeginn 2025'
    }]
  },
  
  'investment_attractiveness': {
    id: 'investment_attractiveness',
    name: 'Investitionsattraktivität Deutschlands',
    value: 50,
    unit: '%',
    minValue: 10,
    maxValue: 95,
    description: 'Attraktivität als Investitionsstandort',
    category: 'economy',
    format: 'percentage',
    history: [{
      date: startDate,
      value: 50,
      source: 'natural',
      explanation: 'Mittlere Attraktivität im internationalen Vergleich'
    }]
  },
  
  'median_income': {
    id: 'median_income',
    name: 'Entwicklung des Median-Bruttoeinkommens',
    value: 52000,
    unit: '€',
    minValue: 40000,
    maxValue: 80000,
    description: 'Mittleres Bruttoeinkommen (max. 4% Steigerung/Jahr)',
    category: 'economy',
    format: 'currency',
    history: [{
      date: startDate,
      value: 52000,
      source: 'natural',
      explanation: 'Ausgangswert Medianeinkommen 2025'
    }]
  },
  
  'tax_revenue': {
    id: 'tax_revenue',
    name: 'Steueraufkommen',
    value: 420,
    unit: 'Mrd €',
    minValue: 300,
    maxValue: 600,
    description: 'Jährliches Steueraufkommen des Bundes',
    category: 'economy',
    format: 'currency',
    history: [{
      date: startDate,
      value: 420,
      source: 'natural',
      explanation: 'Steueraufkommen basierend auf Wirtschaftslage 2025'
    }]
  },
  
  'debt': {
    id: 'debt',
    name: 'Schulden',
    value: 0,
    unit: 'Mrd €',
    minValue: -500,
    maxValue: 0,
    description: 'Staatsschulden (startet bei null)',
    category: 'economy',
    format: 'currency',
    history: [{
      date: startDate,
      value: 0,
      source: 'natural',
      explanation: 'Schuldenneutrale Ausgangslage'
    }]
  },
  
  'interest_costs': {
    id: 'interest_costs',
    name: 'Zinskosten',
    value: 0,
    unit: 'Mrd €',
    minValue: 0,
    maxValue: 50,
    description: 'Zinszahlungen (3% Basis + 0,3% je 100 Mrd € Schulden)',
    category: 'economy',
    format: 'currency',
    history: [{
      date: startDate,
      value: 0,
      source: 'natural',
      explanation: 'Keine Zinszahlungen bei null Schulden'
    }]
  },
  
  'inflation_rate': {
    id: 'inflation_rate',
    name: 'Inflationsrate',
    value: 2.5,
    unit: '%',
    minValue: -2,
    maxValue: 8,
    description: 'Jährliche Preissteigerungsrate',
    category: 'economy',
    format: 'percentage',
    history: [{
      date: startDate,
      value: 2.5,
      source: 'natural',
      explanation: 'Moderate Inflation zu Jahresbeginn'
    }]
  },
  
  'financial_sustainability': {
    id: 'financial_sustainability',
    name: 'Finanzielle Tragfähigkeit',
    value: 50,
    unit: '%',
    minValue: 0,
    maxValue: 100,
    description: 'Index aus Schuldenquote + Steueraufkommen - Zinslast - Inflation',
    category: 'economy',
    format: 'percentage',
    history: [{
      date: startDate,
      value: 50,
      source: 'natural',
      explanation: 'Ausgeglichene finanzielle Situation'
    }]
  },
  
  // INTERNATIONALE/STRATEGISCHE METRIKEN
  'foreign_dependency': {
    id: 'foreign_dependency',
    name: 'Kritische Nicht-EU-Auslandsabhängigkeit',
    value: 70,
    unit: '%',
    minValue: 20,
    maxValue: 90,
    description: 'Abhängigkeit von China, USA, Russland, Saudi-Arabien (niedrigere % = besser)',
    category: 'security',
    format: 'percentage',
    history: [{
      date: startDate,
      value: 70,
      source: 'natural',
      explanation: 'Hohe Abhängigkeit von Nicht-EU-Ländern'
    }]
  },
  
  'security': {
    id: 'security',
    name: 'Sicherheit',
    value: 50,
    unit: '%',
    minValue: 20,
    maxValue: 90,
    description: 'Verteidigungskapazitäten und nationale Sicherheit',
    category: 'security',
    format: 'percentage',
    history: [{
      date: startDate,
      value: 50,
      source: 'natural',
      explanation: 'Durchschnittliche Sicherheitslage'
    }]
  },
  
  'energy_security': {
    id: 'energy_security',
    name: 'Energiesicherheit',
    value: 50,
    unit: '%',
    minValue: 10,
    maxValue: 95,
    description: 'Unabhängigkeit von Energieimporten',
    category: 'security',
    format: 'percentage',
    history: [{
      date: startDate,
      value: 50,
      source: 'natural',
      explanation: 'Mittlere Energiesicherheit nach Ende der Russland-Abhängigkeit'
    }]
  },
  
  // SOZIALE/GESELLSCHAFTLICHE METRIKEN
  'age_ratio': {
    id: 'age_ratio',
    name: 'Altersquotient',
    value: 35,
    unit: '%',
    minValue: 25,
    maxValue: 55,
    description: 'Verhältnis >65 Jahre zu 15-64 Jahre',
    category: 'society',
    format: 'percentage',
    history: [{
      date: startDate,
      value: 35,
      source: 'natural',
      explanation: 'Demografischer Wandel - steigender Altersanteil'
    }]
  },
  
  'emigration': {
    id: 'emigration',
    name: 'Migration - Auswanderungen aus Deutschland',
    value: 150000,
    unit: 'Personen/Jahr',
    minValue: 80000,
    maxValue: 300000,
    description: 'Jährliche Auswanderung deutscher und ausländischer Bürger',
    category: 'society',
    format: 'number',
    history: [{
      date: startDate,
      value: 150000,
      source: 'natural',
      explanation: 'Durchschnittliche Auswanderungsrate'
    }]
  },
  
  'immigration_eu': {
    id: 'immigration_eu',
    name: 'Migration - Einwanderung aus EU',
    value: 200000,
    unit: 'Personen/Jahr',
    minValue: 100000,
    maxValue: 400000,
    description: 'Jährliche Einwanderung aus EU-Ländern',
    category: 'society',
    format: 'number',
    history: [{
      date: startDate,
      value: 200000,
      source: 'natural',
      explanation: 'EU-interne Mobilität und Fachkräftezuzug'
    }]
  },
  
  'immigration_non_eu': {
    id: 'immigration_non_eu',
    name: 'Migration - Einwanderung aus Nicht-EU',
    value: 400000,
    unit: 'Personen/Jahr',
    minValue: 200000,
    maxValue: 800000,
    description: 'Jährliche Einwanderung aus Nicht-EU-Ländern',
    category: 'society',
    format: 'number',
    history: [{
      date: startDate,
      value: 400000,
      source: 'natural',
      explanation: 'Hohe Einwanderung aufgrund globaler Krisen und Fachkräftemangel'
    }]
  },
  
  'gini_coefficient': {
    id: 'gini_coefficient',
    name: 'Gini-Koeffizient',
    value: 0.31,
    unit: '',
    minValue: 0.25,
    maxValue: 0.45,
    description: 'Maß für Einkommensungleichheit (0 = gleichmäßig, 1 = ungleich)',
    category: 'society',
    format: 'ratio',
    history: [{
      date: startDate,
      value: 0.31,
      source: 'natural',
      explanation: 'Mittlere Einkommensungleichheit in Deutschland'
    }]
  },
  
  // TECHNOLOGIE/INFRASTRUKTUR METRIKEN
  'broadband_coverage': {
    id: 'broadband_coverage',
    name: 'Breitband-/Mobilfunkabdeckung',
    value: 75,
    unit: '%',
    minValue: 40,
    maxValue: 100,
    description: 'Haushalte mit >100 Mbit/s Internetanschluss',
    category: 'society',
    format: 'percentage',
    history: [{
      date: startDate,
      value: 75,
      source: 'natural',
      explanation: 'Fortschrittliche aber nicht flächendeckende Breitbandversorgung'
    }]
  },
  
  'digitalization_index': {
    id: 'digitalization_index',
    name: 'Digitalisierungsindex',
    value: 45,
    unit: '%',
    minValue: 20,
    maxValue: 95,
    description: 'Digitalisierung von Verwaltung und Infrastruktur',
    category: 'society',
    format: 'percentage',
    history: [{
      date: startDate,
      value: 45,
      source: 'natural',
      explanation: 'Deutschland hinkt bei Digitalisierung hinterher'
    }]
  },
  
  'bureaucracy_index': {
    id: 'bureaucracy_index',
    name: 'Bürokratieindex',
    value: 65,
    unit: '%',
    minValue: 20,
    maxValue: 90,
    description: 'Bürokratiebelastung (niedrigere % = weniger Bürokratie)',
    category: 'society',
    format: 'percentage',
    history: [{
      date: startDate,
      value: 65,
      source: 'natural',
      explanation: 'Hohe Bürokratiebelastung in Deutschland'
    }]
  },
  
  // ZUKUNFTS-/QUALITÄTSMETRIKEN
  'future_viability_index': {
    id: 'future_viability_index',
    name: 'Zukunftsfähigkeits-Index',
    value: 50,
    unit: '%',
    minValue: 20,
    maxValue: 90,
    description: 'Kombination aus CO₂-Reduktion + Bildung + Digitalisierung + Innovation',
    category: 'overall',
    format: 'percentage',
    history: [{
      date: startDate,
      value: 50,
      source: 'natural',
      explanation: 'Durchschnittliche Zukunftsfähigkeit'
    }]
  },
  
  'corruption_perception_index': {
    id: 'corruption_perception_index',
    name: 'Korruptionswahrnehmungsindex',
    value: 75,
    unit: '%',
    minValue: 30,
    maxValue: 95,
    description: 'Wahrgenommene Korruption (höhere % = weniger Korruption)',
    category: 'politics',
    format: 'percentage',
    history: [{
      date: startDate,
      value: 75,
      source: 'natural',
      explanation: 'Deutschlands guter Ruf bei Korruptionsbekämpfung'
    }]
  },
  
  // UMWELT/ENERGIE METRIKEN
  'co2_reduction': {
    id: 'co2_reduction',
    name: 'CO₂-Reduktion',
    value: 0,
    unit: 'Mio. Tonnen',
    minValue: 0,
    maxValue: 500,
    description: 'Kumulierte CO₂-Reduktion (Ziel: 475 Mio. Tonnen bis 2040)',
    category: 'environment',
    format: 'number',
    history: [{
      date: startDate,
      value: 0,
      source: 'natural',
      explanation: 'Start der CO₂-Reduktion in 2025'
    }]
  },
  
  'co2_reduction_path': {
    id: 'co2_reduction_path',
    name: 'CO₂-Reduktionspfad',
    value: 50,
    unit: '%',
    minValue: 0,
    maxValue: 100,
    description: 'Fortschritt auf Klimaziel-Pfad (10 Mio. Tonnen = 1%)',
    category: 'environment',
    format: 'percentage',
    history: [{
      date: startDate,
      value: 50,
      source: 'natural',
      explanation: 'Startposition auf dem Weg zu Klimaneutralität'
    }]
  },
  
  'electrification_level': {
    id: 'electrification_level',
    name: 'Elektrifizierungsgrad',
    value: 35,
    unit: '%',
    minValue: 20,
    maxValue: 90,
    description: 'Anteil elektrischer Energie am Gesamtenergieverbrauch',
    category: 'environment',
    format: 'percentage',
    history: [{
      date: startDate,
      value: 35,
      source: 'natural',
      explanation: 'Beginnende Elektrifizierung aller Sektoren'
    }]
  },
  
  'renewable_electricity': {
    id: 'renewable_electricity',
    name: 'Anteil erneuerbarer Energien am Gesamtstromverbrauch',
    value: 45,
    unit: '%',
    minValue: 20,
    maxValue: 100,
    description: 'Anteil von Wind, Solar, Wasser an der Stromerzeugung',
    category: 'environment',
    format: 'percentage',
    history: [{
      date: startDate,
      value: 45,
      source: 'natural',
      explanation: 'Fortschrittlicher Ausbau erneuerbarer Stromquellen'
    }]
  },
  
  'renewable_energy_total': {
    id: 'renewable_energy_total',
    name: 'Anteil erneuerbarer Energien am Gesamtenergieverbrauch',
    value: 20,
    unit: '%',
    minValue: 10,
    maxValue: 90,
    description: 'Anteil erneuerbarer Energien inkl. Wärme und Verkehr',
    category: 'environment',
    format: 'percentage',
    history: [{
      date: startDate,
      value: 20,
      source: 'natural',
      explanation: 'Niedrigerer Anteil wenn alle Sektoren einbezogen werden'
    }]
  },
  
  // GESAMTBEWERTUNG
  'overall_rating': {
    id: 'overall_rating',
    name: 'Gesamtbewertung',
    value: 50,
    unit: '%',
    minValue: 5,
    maxValue: 98,
    description: 'Gewichtete Gesamtbewertung aus allen Variablen + Schuldenstand',
    category: 'overall',
    format: 'percentage',
    history: [{
      date: startDate,
      value: 50,
      source: 'natural',
      explanation: 'Durchschnittliche Ausgangslage zu Regierungsantritt'
    }]
  }
};

// Hilfsfunktionen für Variablen-Management
export const getVariableById = (id: string): EvaluationVariable | undefined => {
  return initialVariables[id];
};

export const getVariablesByCategory = (category: EvaluationVariable['category']): EvaluationVariable[] => {
  return Object.values(initialVariables).filter(variable => variable.category === category);
};

export const getAllVariableIds = (): string[] => {
  return Object.keys(initialVariables);
};

export const validateVariableValue = (id: string, value: number): boolean => {
  const variable = getVariableById(id);
  if (!variable) return false;
  return value >= variable.minValue && value <= variable.maxValue;
};

// Kategorien für das Dashboard
export const VARIABLE_CATEGORIES = {
  politics: { name: 'Politische Metriken', color: '#3b82f6', icon: 'Users' },
  economy: { name: 'Wirtschaftsmetriken', color: '#10b981', icon: 'TrendingUp' },
  society: { name: 'Gesellschaftsmetriken', color: '#f59e0b', icon: 'Home' },
  security: { name: 'Sicherheitsmetriken', color: '#ef4444', icon: 'Shield' },
  environment: { name: 'Umwelt-/Energiemetriken', color: '#22c55e', icon: 'Leaf' },
  overall: { name: 'Gesamtbewertung', color: '#8b5cf6', icon: 'Award' }
};

export default initialVariables;
