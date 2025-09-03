import { EventTrigger, GameDate } from '../types';

// Umfassendes Ereignissystem mit Stakeholder-Reaktionen
export const eventTriggers: EventTrigger[] = [
  // WIRTSCHAFTLICHE EREIGNISSE
  {
    id: 'green_tech_boom',
    name: 'Green-Tech-Boom',
    description: 'Deutsche Unternehmen profitieren massiv von der Energiewende',
    conditions: [
      { variableId: 'co2_reduction_path', operator: '>', value: 60, duration: 30 },
      { variableId: 'economic_growth', operator: '>', value: 1.5, duration: 15 }
    ],
    effects: {
      'investment_attractiveness': 20,
      'economic_growth': 1.2,
      'tax_revenue': 35,
      'future_viability_index': 15,
      'popularity': 8
    },
    oneTime: true,
    probability: 0.8,
    stakeholder: 'economy',
    triggered: false
  },

  {
    id: 'rating_downgrade',
    name: 'Rating-Agentur Warnung',
    description: 'Internationale Rating-Agenturen warnen vor steigenden Schulden',
    conditions: [
      { variableId: 'debt', operator: '<', value: -100, duration: 30 }
    ],
    effects: {
      'interest_costs': 8,
      'investment_attractiveness': -15,
      'financial_sustainability': -20,
      'popularity': -5,
      'coalition_liberal': -10
    },
    cost: 5,
    oneTime: false,
    probability: 0.9,
    triggered: false
  },

  {
    id: 'debt_crisis',
    name: 'Schuldenkrise droht',
    description: 'Schuldenstand erreicht kritisches Niveau',
    conditions: [
      { variableId: 'debt', operator: '<', value: -200, duration: 60 }
    ],
    effects: {
      'interest_costs': 15,
      'investment_attractiveness': -30,
      'financial_sustainability': -35,
      'popularity': -15,
      'coalition_liberal': -25,
      'coalition_social': -20
    },
    cost: 20,
    oneTime: true,
    probability: 1.0,
    triggered: false
  },

  // EU-REAKTIONEN
  {
    id: 'eu_climate_leader_bonus',
    name: 'EU-Klimavorreiter-Bonus',
    description: 'EU honoriert deutsche Klimaführung mit zusätzlichen Fördermitteln',
    conditions: [
      { variableId: 'co2_reduction_path', operator: '>', value: 70, duration: 90 }
    ],
    effects: {
      'tax_revenue': 25,
      'energy_security': 10,
      'popularity': 12,
      'future_viability_index': 10
    },
    oneTime: true,
    probability: 0.7,
    stakeholder: 'eu',
    triggered: false
  },

  {
    id: 'eu_deficit_procedure',
    name: 'EU-Defizitverfahren',
    description: 'EU leitet Defizitverfahren wegen hoher Schulden ein',
    conditions: [
      { variableId: 'debt', operator: '<', value: -150, duration: 180 },
      { variableId: 'financial_sustainability', operator: '<', value: 25, duration: 90 }
    ],
    effects: {
      'investment_attractiveness': -20,
      'popularity': -10,
      'coalition_liberal': -15,
      'coalition_social': -10
    },
    cost: 10,
    oneTime: true,
    probability: 0.9,
    stakeholder: 'eu',
    triggered: false
  },

  {
    id: 'eu_digital_partnership',
    name: 'EU-Digitalpakt',
    description: 'Deutschland wird Partner im europäischen Digitalpakt',
    conditions: [
      { variableId: 'digitalization_index', operator: '>', value: 75, duration: 60 }
    ],
    effects: {
      'digitalization_index': 15,
      'investment_attractiveness': 12,
      'future_viability_index': 8,
      'tax_revenue': 15
    },
    oneTime: true,
    probability: 0.6,
    stakeholder: 'eu',
    triggered: false
  },

  // USA-REAKTIONEN
  {
    id: 'us_trade_partnership',
    name: 'US-Handelspartnerschaft gestärkt',
    description: 'USA und Deutschland vertiefen Technologie-Handelsbeziehungen',
    conditions: [
      { variableId: 'investment_attractiveness', operator: '>', value: 75, duration: 90 },
      { variableId: 'digitalization_index', operator: '>', value: 60, duration: 60 }
    ],
    effects: {
      'economic_growth': 0.8,
      'investment_attractiveness': 15,
      'foreign_dependency': -10,
      'tax_revenue': 20
    },
    oneTime: true,
    probability: 0.5,
    stakeholder: 'usa',
    triggered: false
  },

  {
    id: 'us_security_concerns',
    name: 'US-Sicherheitsbedenken',
    description: 'USA kritisiert deutsche Verteidigungsausgaben',
    conditions: [
      { variableId: 'security', operator: '<', value: 40, duration: 180 }
    ],
    effects: {
      'security': -10,
      'foreign_dependency': 5,
      'popularity': -5
    },
    oneTime: false,
    probability: 0.7,
    stakeholder: 'usa',
    triggered: false
  },

  // CHINA-REAKTIONEN
  {
    id: 'china_tech_competition',
    name: 'China-Tech-Wettbewerb',
    description: 'Verschärfter Technologie-Wettbewerb mit China',
    conditions: [
      { variableId: 'digitalization_index', operator: '>', value: 70, duration: 90 }
    ],
    effects: {
      'foreign_dependency': -8,
      'investment_attractiveness': 10,
      'security': 5,
      'future_viability_index': 12
    },
    oneTime: true,
    probability: 0.6,
    stakeholder: 'china',
    triggered: false
  },

  {
    id: 'china_investment_pullback',
    name: 'China-Investitionen gehen zurück',
    description: 'China reduziert Investitionen in Deutschland',
    conditions: [
      { variableId: 'foreign_dependency', operator: '<', value: 45, duration: 120 }
    ],
    effects: {
      'investment_attractiveness': -12,
      'economic_growth': -0.5,
      'foreign_dependency': -5
    },
    oneTime: true,
    probability: 0.8,
    stakeholder: 'china',
    triggered: false
  },

  // GESELLSCHAFTLICHE EREIGNISSE
  {
    id: 'social_unrest_inequality',
    name: 'Soziale Unruhen wegen Ungleichheit',
    description: 'Proteste gegen steigende Einkommensungleichheit',
    conditions: [
      { variableId: 'gini_coefficient', operator: '>', value: 0.38, duration: 120 },
      { variableId: 'median_income', operator: '<', value: 51000, duration: 90 }
    ],
    effects: {
      'popularity': -20,
      'coalition_social': -15,
      'security': -8,
      'investment_attractiveness': -10
    },
    oneTime: true,
    probability: 0.7,
    triggered: false
  },

  {
    id: 'demographic_bonus',
    name: 'Demografischer Bonus',
    description: 'Erfolgreiche Migrationspolitik führt zu jüngerer Gesellschaft',
    conditions: [
      { variableId: 'immigration_eu', operator: '>', value: 250000, duration: 365 },
      { variableId: 'immigration_non_eu', operator: '>', value: 500000, duration: 365 }
    ],
    effects: {
      'age_ratio': -3,
      'economic_growth': 0.4,
      'tax_revenue': 15,
      'future_viability_index': 8
    },
    oneTime: true,
    probability: 0.4,
    triggered: false
  },

  {
    id: 'migration_crisis',
    name: 'Migrationskrise',
    description: 'Gesellschaftliche Spannungen durch hohe Migration',
    conditions: [
      { variableId: 'immigration_non_eu', operator: '>', value: 600000, duration: 180 }
    ],
    effects: {
      'popularity': -15,
      'security': -12,
      'coalition_liberal': -8,
      'coalition_social': -5
    },
    oneTime: false,
    probability: 0.6,
    triggered: false
  },

  // UMWELT-EREIGNISSE
  {
    id: 'climate_disaster',
    name: 'Klimakatastrophe',
    description: 'Schwere Überschwemmungen oder Dürre trifft Deutschland',
    conditions: [
      { variableId: 'co2_reduction_path', operator: '<', value: 40, duration: 365 }
    ],
    effects: {
      'economic_growth': -1.5,
      'popularity': -10,
      'coalition_social': 8, // Druck für mehr Klimaschutz
    },
    cost: 25,
    oneTime: false,
    probability: 0.3,
    triggered: false
  },

  {
    id: 'energy_independence',
    name: 'Energie-Unabhängigkeit erreicht',
    description: 'Deutschland erreicht 90% erneuerbare Energien',
    conditions: [
      { variableId: 'renewable_electricity', operator: '>', value: 85, duration: 90 },
      { variableId: 'energy_security', operator: '>', value: 80, duration: 60 }
    ],
    effects: {
      'energy_security': 15,
      'foreign_dependency': -20,
      'popularity': 15,
      'investment_attractiveness': 18,
      'future_viability_index': 20
    },
    oneTime: true,
    probability: 0.8,
    triggered: false
  },

  // TECHNOLOGIE-EREIGNISSE
  {
    id: 'ai_breakthrough',
    name: 'KI-Durchbruch in Deutschland',
    description: 'Deutsche Forschung erzielt Durchbruch in Künstlicher Intelligenz',
    conditions: [
      { variableId: 'digitalization_index', operator: '>', value: 80, duration: 120 },
      { variableId: 'investment_attractiveness', operator: '>', value: 70, duration: 90 }
    ],
    effects: {
      'digitalization_index': 20,
      'investment_attractiveness': 25,
      'future_viability_index': 25,
      'economic_growth': 1.5,
      'tax_revenue': 30
    },
    oneTime: true,
    probability: 0.3,
    triggered: false
  },

  {
    id: 'cyber_attack',
    name: 'Cyber-Angriff auf Infrastruktur',
    description: 'Schwerer Cyber-Angriff legt kritische Infrastruktur lahm',
    conditions: [
      { variableId: 'digitalization_index', operator: '>', value: 60, duration: 90 },
      { variableId: 'security', operator: '<', value: 50, duration: 120 }
    ],
    effects: {
      'security': -15,
      'digitalization_index': -10,
      'economic_growth': -0.8,
      'popularity': -12
    },
    cost: 15,
    oneTime: false,
    probability: 0.4,
    triggered: false
  },

  // POLITISCHE KRISEN
  {
    id: 'coalition_crisis',
    name: 'Koalitionskrise droht',
    description: 'Massive Meinungsunterschiede zwischen Koalitionspartnern',
    conditions: [
      { variableId: 'coalition_liberal', operator: '<', value: 25, duration: 60 },
      { variableId: 'coalition_social', operator: '<', value: 25, duration: 60 }
    ],
    effects: {
      'popularity': -15,
      'coalition_liberal': -10,
      'coalition_social': -10,
      'investment_attractiveness': -12
    },
    oneTime: false,
    probability: 0.8,
    triggered: false
  },

  {
    id: 'media_campaign',
    name: 'Medienkampagne gegen Regierung',
    description: 'Intensive Medienkritik an Regierungsarbeit',
    conditions: [
      { variableId: 'popularity', operator: '<', value: 30, duration: 90 }
    ],
    effects: {
      'popularity': -8,
      'coalition_liberal': -5,
      'coalition_social': -5
    },
    oneTime: false,
    probability: 0.6,
    stakeholder: 'media',
    triggered: false
  },

  {
    id: 'international_recognition',
    name: 'Internationale Anerkennung',
    description: 'Deutschland wird für vorbildliche Politik international gelobt',
    conditions: [
      { variableId: 'overall_rating', operator: '>', value: 75, duration: 120 }
    ],
    effects: {
      'popularity': 12,
      'investment_attractiveness': 15,
      'foreign_dependency': -8,
      'future_viability_index': 10
    },
    oneTime: true,
    probability: 0.5,
    triggered: false
  },

  // WIRTSCHAFTSKRISEN
  {
    id: 'global_recession',
    name: 'Globale Rezession',
    description: 'Weltweite Wirtschaftskrise erreicht Deutschland',
    conditions: [
      { variableId: 'economic_growth', operator: '<', value: -1, duration: 90 }
    ],
    effects: {
      'economic_growth': -2.0,
      'unemployment': 1.5,
      'tax_revenue': -40,
      'investment_attractiveness': -20,
      'popularity': -18
    },
    cost: 30,
    oneTime: true,
    probability: 0.2,
    triggered: false
  },

  {
    id: 'innovation_wave',
    name: 'Innovationswelle',
    description: 'Deutsche Unternehmen führen bei Zukunftstechnologien',
    conditions: [
      { variableId: 'future_viability_index', operator: '>', value: 70, duration: 180 },
      { variableId: 'investment_attractiveness', operator: '>', value: 80, duration: 120 }
    ],
    effects: {
      'economic_growth': 2.2,
      'investment_attractiveness': 20,
      'future_viability_index': 15,
      'tax_revenue': 45,
      'unemployment': -0.8
    },
    oneTime: true,
    probability: 0.4,
    stakeholder: 'economy',
    triggered: false
  },

  // GESUNDHEITSKRISEN
  {
    id: 'health_system_crisis',
    name: 'Gesundheitssystem-Krise',
    description: 'Personalmangel und Überlastung im Gesundheitswesen',
    conditions: [
      { variableId: 'age_ratio', operator: '>', value: 42, duration: 180 }
    ],
    effects: {
      'popularity': -12,
      'coalition_social': -15,
      'median_income': -500
    },
    cost: 20,
    oneTime: true,
    probability: 0.5,
    triggered: false
  },

  // BILDUNGS- UND FACHKRÄFTE-EREIGNISSE
  {
    id: 'brain_drain',
    name: 'Brain Drain',
    description: 'Hochqualifizierte verlassen Deutschland',
    conditions: [
      { variableId: 'emigration', operator: '>', value: 200000, duration: 180 },
      { variableId: 'digitalization_index', operator: '<', value: 50, duration: 120 }
    ],
    effects: {
      'future_viability_index': -15,
      'economic_growth': -0.6,
      'digitalization_index': -8,
      'investment_attractiveness': -10
    },
    oneTime: true,
    probability: 0.6,
    triggered: false
  },

  {
    id: 'skilled_worker_boom',
    name: 'Fachkräfte-Zustrom',
    description: 'Deutschland wird attraktiver Standort für internationale Talente',
    conditions: [
      { variableId: 'investment_attractiveness', operator: '>', value: 75, duration: 120 },
      { variableId: 'immigration_eu', operator: '>', value: 300000, duration: 90 }
    ],
    effects: {
      'unemployment': -0.5,
      'economic_growth': 0.8,
      'digitalization_index': 12,
      'future_viability_index': 10,
      'age_ratio': -2
    },
    oneTime: true,
    probability: 0.5,
    triggered: false
  }
];

// Hilfsfunktionen für Ereignis-Management
export const checkEventTriggers = (variables: { [id: string]: any }, currentDate: GameDate): EventTrigger[] => {
  const triggeredEvents: EventTrigger[] = [];
  
  eventTriggers.forEach(trigger => {
    if (trigger.triggered && trigger.oneTime) return;
    
    let allConditionsMet = true;
    
    trigger.conditions.forEach(condition => {
      const variable = variables[condition.variableId];
      if (!variable) {
        allConditionsMet = false;
        return;
      }
      
      const value = variable.value;
      let conditionMet = false;
      
      switch (condition.operator) {
        case '>':
          conditionMet = value > condition.value;
          break;
        case '<':
          conditionMet = value < condition.value;
          break;
        case '=':
          conditionMet = Math.abs(value - condition.value) < 0.1;
          break;
        case '>=':
          conditionMet = value >= condition.value;
          break;
        case '<=':
          conditionMet = value <= condition.value;
          break;
        case '!=':
          conditionMet = Math.abs(value - condition.value) >= 0.1;
          break;
      }
      
      if (!conditionMet) {
        allConditionsMet = false;
        condition.durationMet = 0;
      } else {
        condition.durationMet = (condition.durationMet || 0) + 1;
        if (condition.duration && condition.durationMet < condition.duration) {
          allConditionsMet = false;
        }
      }
    });
    
    if (allConditionsMet && Math.random() < trigger.probability) {
      triggeredEvents.push(trigger);
      trigger.triggered = true;
    }
  });
  
  return triggeredEvents;
};

export const getEventsByStakeholder = (stakeholder: string): EventTrigger[] => {
  return eventTriggers.filter(event => event.stakeholder === stakeholder);
};

export const resetEventTrigger = (eventId: string): void => {
  const event = eventTriggers.find(e => e.id === eventId);
  if (event && !event.oneTime) {
    event.triggered = false;
    event.conditions.forEach(condition => {
      condition.durationMet = 0;
    });
  }
};

export const getEventById = (id: string): EventTrigger | undefined => {
  return eventTriggers.find(event => event.id === id);
};

// Stakeholder-Kategorien für UI
export const STAKEHOLDER_CATEGORIES = {
  'eu': { name: 'Europäische Union', color: '#3b82f6', icon: 'Flag' },
  'china': { name: 'China', color: '#ef4444', icon: 'Globe' },
  'usa': { name: 'USA', color: '#6366f1', icon: 'Shield' },
  'nato': { name: 'NATO', color: '#64748b', icon: 'Shield' },
  'economy': { name: 'Wirtschaft', color: '#10b981', icon: 'TrendingUp' },
  'unions': { name: 'Gewerkschaften', color: '#f59e0b', icon: 'Users' },
  'environment': { name: 'Umweltgruppen', color: '#22c55e', icon: 'Leaf' },
  'media': { name: 'Medien', color: '#8b5cf6', icon: 'MessageCircle' }
};

export default eventTriggers;
