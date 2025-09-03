import { Party, PartyDemand } from '../types';

// Parteien-Definitionen mit vollständigen Profilen und Beziehungen
export const initialParties: { [id: string]: Party } = {
  'linke': {
    id: 'linke',
    name: 'Die Linke',
    color: '#8b008b', // Lila
    ideology: 'far-left',
    popularity: 5,
    coreIssues: [
      'Soziale Gerechtigkeit',
      'Umverteilung',
      'Mieterrechte',
      'Friedenspolitik',
      'Mindestlohn'
    ],
    redLines: [
      'Privatisierung öffentlicher Daseinsvorsorge',
      'Militäreinsätze im Ausland',
      'Sozialabbau',
      'Unternehmenssteuer unter 25%'
    ],
    relationshipToChancellor: 20,
    relationshipToProgressives: 25,
    relationships: {
      'sozialdemokraten': 45,
      'liberale': 15,
      'konservative': 10,
      'rechte': 5,
      'gruene': 60
    },
    cooperationWillingness: 30,
    positions: {
      'sozial': 90,
      'wirtschaft': -70,
      'umwelt': 80,
      'sicherheit': -60,
      'migration': 80,
      'digitalisierung': 40,
      'europa': 60
    },
    demands: [
      {
        id: 'linke_mindestlohn',
        title: 'Mindestlohn auf 15 Euro',
        description: 'Erhöhung des gesetzlichen Mindestlohns auf 15 Euro pro Stunde',
        priority: 'critical',
        negotiable: false,
        requiredVariableChange: { 'median_income': 2000 }
      },
      {
        id: 'linke_mieten',
        title: 'Mietpreisbremse verschärfen',
        description: 'Bundesweite Mietpreisbremse mit maximalen Mietsteigerungen von 2% jährlich',
        priority: 'high',
        negotiable: true
      },
      {
        id: 'linke_reiche_besteuern',
        title: 'Vermögenssteuer',
        description: 'Vermögenssteuer ab 1 Million Euro Vermögen',
        priority: 'high',
        negotiable: true,
        requiredVariableChange: { 'tax_revenue': 15 }
      }
    ]
  },

  'liberale': {
    id: 'liberale',
    name: 'Freie Demokraten (FDP)',
    color: '#ffeb3b', // Gelb
    ideology: 'center-right',
    popularity: 15,
    coreIssues: [
      'Wirtschaftsfreiheit',
      'Steuersenkungen',
      'Digitalisierung',
      'Bürokratieabbau',
      'Bildung'
    ],
    redLines: [
      'Vermögenssteuer',
      'Unternehmenssteuer über 25%',
      'Enteignungen',
      'Schuldenbremse aufheben'
    ],
    relationshipToChancellor: 75, // Aktueller Koalitionspartner
    relationshipToProgressives: 70,
    relationships: {
      'linke': 15,
      'sozialdemokraten': 50,
      'konservative': 70,
      'rechte': 25,
      'gruene': 40
    },
    cooperationWillingness: 80,
    positions: {
      'sozial': -30,
      'wirtschaft': 90,
      'umwelt': 20,
      'sicherheit': 40,
      'migration': -20,
      'digitalisierung': 90,
      'europa': 80
    },
    demands: [
      {
        id: 'liberale_steuern',
        title: 'Unternehmenssteuer auf 20%',
        description: 'Senkung der Unternehmenssteuer zur Stärkung des Wirtschaftsstandorts',
        priority: 'critical',
        negotiable: false,
        requiredVariableChange: { 'investment_attractiveness': 15, 'tax_revenue': -25 }
      },
      {
        id: 'liberale_buerokratie',
        title: 'Bürokratieabbau um 30%',
        description: 'Reduzierung von Gesetzen und Verordnungen um ein Drittel',
        priority: 'high',
        negotiable: true,
        requiredVariableChange: { 'bureaucracy_index': -20 }
      },
      {
        id: 'liberale_digital',
        title: 'Digitalisierungsoffensive',
        description: '20 Milliarden Euro für Digitalisierung der Verwaltung',
        priority: 'high',
        negotiable: true,
        requiredVariableChange: { 'digitalization_index': 25 }
      }
    ]
  },

  'sozialdemokraten': {
    id: 'sozialdemokraten',
    name: 'Sozialdemokratische Partei (SPD)',
    color: '#e53e3e', // Rot
    ideology: 'center-left',
    popularity: 11,
    coreIssues: [
      'Soziale Gerechtigkeit',
      'Arbeitsplätze',
      'Rente',
      'Gesundheit',
      'Europa'
    ],
    redLines: [
      'Privatisierung der Rente',
      'Abbau von Arbeiterrechten',
      'Kürzung Sozialleistungen'
    ],
    relationshipToChancellor: 70, // Aktueller Koalitionspartner
    relationshipToProgressives: 65,
    relationships: {
      'linke': 45,
      'liberale': 50,
      'konservative': 40,
      'rechte': 10,
      'gruene': 75
    },
    cooperationWillingness: 85,
    positions: {
      'sozial': 80,
      'wirtschaft': 30,
      'umwelt': 60,
      'sicherheit': 50,
      'migration': 60,
      'digitalisierung': 50,
      'europa': 90
    },
    demands: [
      {
        id: 'spd_rente',
        title: 'Rentenniveau bei 48%',
        description: 'Stabilisierung des Rentenniveaus bei mindestens 48%',
        priority: 'critical',
        negotiable: false,
        requiredVariableChange: { 'debt': -15 }
      },
      {
        id: 'spd_mindestlohn',
        title: 'Mindestlohn auf 12 Euro',
        description: 'Erhöhung des Mindestlohns auf 12 Euro pro Stunde',
        priority: 'high',
        negotiable: true,
        requiredVariableChange: { 'median_income': 1000 }
      },
      {
        id: 'spd_europa',
        title: 'EU-Integration stärken',
        description: 'Mehr europäische Integration und gemeinsame Schulden',
        priority: 'medium',
        negotiable: true
      }
    ]
  },

  'progressive': {
    id: 'progressive',
    name: 'Die Progressiven',
    color: '#ff7f00', // Orange
    ideology: 'center',
    popularity: 25, // Spielerpartei - stärkste Kraft
    coreIssues: [
      'Innovation',
      'Nachhaltigkeit',
      'Digitalisierung',
      'Bildung',
      'Zukunftstechnologien'
    ],
    redLines: [], // Spielerpartei hat keine festen roten Linien
    relationshipToChancellor: 100, // Spieler ist Kanzler
    relationshipToProgressives: 100,
    relationships: {
      'linke': 25,
      'liberale': 70,
      'sozialdemokraten': 65,
      'konservative': 45,
      'rechte': 20,
      'gruene': 80
    },
    cooperationWillingness: 90,
    positions: {
      'sozial': 50,
      'wirtschaft': 60,
      'umwelt': 80,
      'sicherheit': 60,
      'migration': 40,
      'digitalisierung': 90,
      'europa': 70
    },
    demands: [] // Spielerpartei stellt keine Forderungen
  },

  'konservative': {
    id: 'konservative',
    name: 'Christlich Demokratische Union (CDU/CSU)',
    color: '#2d3748', // Schwarz
    ideology: 'center-right',
    popularity: 17,
    coreIssues: [
      'Innere Sicherheit',
      'Wirtschaftsstärke',
      'Familie',
      'Tradition',
      'Migration begrenzen'
    ],
    redLines: [
      'Legalisierung von Cannabis',
      'Ehe für alle rückgängig machen',
      'Unrealistische Klimaziele',
      'Unkontrollierte Migration'
    ],
    relationshipToChancellor: 30,
    relationshipToProgressives: 45,
    relationships: {
      'linke': 10,
      'liberale': 70,
      'sozialdemokraten': 40,
      'rechte': 50,
      'gruene': 30
    },
    cooperationWillingness: 60,
    positions: {
      'sozial': 20,
      'wirtschaft': 70,
      'umwelt': 30,
      'sicherheit': 90,
      'migration': -50,
      'digitalisierung': 60,
      'europa': 60
    },
    demands: [
      {
        id: 'cdu_sicherheit',
        title: 'Sicherheitspaket',
        description: '10 Milliarden Euro mehr für Polizei und Verfassungsschutz',
        priority: 'critical',
        negotiable: false,
        requiredVariableChange: { 'security': 15, 'debt': -10 }
      },
      {
        id: 'cdu_migration',
        title: 'Migration begrenzen',
        description: 'Obergrenze von 200.000 Asylsuchenden pro Jahr',
        priority: 'high',
        negotiable: true,
        requiredVariableChange: { 'immigration_non_eu': -100000 }
      },
      {
        id: 'cdu_familie',
        title: 'Familienpolitik stärken',
        description: 'Kindergeld erhöhen und Ehegattensplitting beibehalten',
        priority: 'medium',
        negotiable: true
      }
    ]
  },

  'rechte': {
    id: 'rechte',
    name: 'Alternative für Deutschland (AfD)',
    color: '#3182ce', // Blau
    ideology: 'far-right',
    popularity: 14,
    coreIssues: [
      'Deutsche Interessen',
      'EU-Kritik',
      'Migration stoppen',
      'Tradition bewahren',
      'Souveränität'
    ],
    redLines: [
      'EU-Integration vertiefen',
      'Migration erhöhen',
      'Klimaschutz vor Wirtschaft',
      'Multikulturalismus fördern'
    ],
    relationshipToChancellor: 5,
    relationshipToProgressives: 20,
    relationships: {
      'linke': 5,
      'liberale': 25,
      'sozialdemokraten': 10,
      'konservative': 50,
      'gruene': 0
    },
    cooperationWillingness: 15, // Schwer koalitionsfähig
    positions: {
      'sozial': -20,
      'wirtschaft': 40,
      'umwelt': -70,
      'sicherheit': 80,
      'migration': -90,
      'digitalisierung': -20,
      'europa': -80
    },
    demands: [
      {
        id: 'afd_migration',
        title: 'Migration massiv reduzieren',
        description: 'Aussetzung des Asylrechts und Rückführungen',
        priority: 'critical',
        negotiable: false,
        requiredVariableChange: { 'immigration_non_eu': -300000 }
      },
      {
        id: 'afd_eu',
        title: 'EU-Austritt vorbereiten',
        description: 'Volksabstimmung über EU-Mitgliedschaft',
        priority: 'high',
        negotiable: false
      },
      {
        id: 'afd_energie',
        title: 'Kernkraft reaktivieren',
        description: 'Rückkehr zur Kernenergie und Kohle',
        priority: 'high',
        negotiable: true,
        requiredVariableChange: { 'energy_security': 20, 'co2_reduction': -50 }
      }
    ]
  },

  'gruene': {
    id: 'gruene',
    name: 'Bündnis 90/Die Grünen',
    color: '#48bb78', // Grün
    ideology: 'center-left',
    popularity: 10,
    coreIssues: [
      'Klimaschutz',
      'Umwelt',
      'Nachhaltigkeit',
      'Energiewende',
      'Soziale Ökologie'
    ],
    redLines: [
      'Kernkraft-Rückkehr',
      'Aufweichung Klimaziele',
      'Neue Kohlekraftwerke',
      'Fracking erlauben'
    ],
    relationshipToChancellor: 45,
    relationshipToProgressives: 80,
    relationships: {
      'linke': 60,
      'liberale': 40,
      'sozialdemokraten': 75,
      'konservative': 30,
      'rechte': 0
    },
    cooperationWillingness: 75,
    positions: {
      'sozial': 70,
      'wirtschaft': 40,
      'umwelt': 95,
      'sicherheit': 30,
      'migration': 70,
      'digitalisierung': 60,
      'europa': 85
    },
    demands: [
      {
        id: 'gruene_klima',
        title: 'Klimaneutralität bis 2035',
        description: 'Verschärfung der Klimaziele um 5 Jahre',
        priority: 'critical',
        negotiable: false,
        requiredVariableChange: { 'co2_reduction_path': 30 }
      },
      {
        id: 'gruene_verkehr',
        title: 'Verkehrswende',
        description: '50 Milliarden für öffentlichen Verkehr und Radwege',
        priority: 'high',
        negotiable: true,
        requiredVariableChange: { 'co2_reduction': 20, 'debt': -50 }
      },
      {
        id: 'gruene_tempolimit',
        title: 'Tempolimit 120 km/h',
        description: 'Allgemeines Tempolimit auf Autobahnen',
        priority: 'medium',
        negotiable: true
      }
    ]
  },

  'sonstige': {
    id: 'sonstige',
    name: 'Sonstige Parteien',
    color: '#a0a0a0', // Grau
    ideology: 'center',
    popularity: 3,
    coreIssues: ['Verschiedene Themen'],
    redLines: [],
    relationshipToChancellor: 50,
    relationshipToProgressives: 50,
    relationships: {
      'linke': 50,
      'liberale': 50,
      'sozialdemokraten': 50,
      'konservative': 50,
      'rechte': 50,
      'gruene': 50
    },
    cooperationWillingness: 30,
    positions: {
      'sozial': 0,
      'wirtschaft': 0,
      'umwelt': 0,
      'sicherheit': 0,
      'migration': 0,
      'digitalisierung': 0,
      'europa': 0
    },
    demands: []
  }
};

// Hilfsfunktionen für Parteienverwaltung
export const getPartyById = (id: string): Party | undefined => {
  return initialParties[id];
};

export const getAllParties = (): Party[] => {
  return Object.values(initialParties);
};

export const getPartiesByIdeology = (ideology: Party['ideology']): Party[] => {
  return Object.values(initialParties).filter(party => party.ideology === ideology);
};

export const calculateCoalitionStrength = (partyIds: string[]): number => {
  return partyIds.reduce((total, id) => {
    const party = getPartyById(id);
    return total + (party?.popularity || 0);
  }, 0);
};

export const canFormCoalition = (partyIds: string[]): boolean => {
  const strength = calculateCoalitionStrength(partyIds);
  return strength >= 50; // Mindestens 50% für Mehrheit
};

export const calculateCoalitionCompatibility = (partyIds: string[]): number => {
  if (partyIds.length < 2) return 0;
  
  let totalCompatibility = 0;
  let pairCount = 0;
  
  for (let i = 0; i < partyIds.length; i++) {
    for (let j = i + 1; j < partyIds.length; j++) {
      const party1 = getPartyById(partyIds[i]);
      const party2 = getPartyById(partyIds[j]);
      
      if (party1 && party2) {
        const compatibility = party1.relationships[party2.id] || 50;
        totalCompatibility += compatibility;
        pairCount++;
      }
    }
  }
  
  return pairCount > 0 ? totalCompatibility / pairCount : 0;
};

export const getPossibleCoalitions = (minStrength: number = 50): string[][] => {
  const parties = Object.keys(initialParties).filter(id => id !== 'sonstige');
  const coalitions: string[][] = [];
  
  // 2-Parteien Koalitionen
  for (let i = 0; i < parties.length; i++) {
    for (let j = i + 1; j < parties.length; j++) {
      const coalition = [parties[i], parties[j]];
      if (calculateCoalitionStrength(coalition) >= minStrength) {
        coalitions.push(coalition);
      }
    }
  }
  
  // 3-Parteien Koalitionen
  for (let i = 0; i < parties.length; i++) {
    for (let j = i + 1; j < parties.length; j++) {
      for (let k = j + 1; k < parties.length; k++) {
        const coalition = [parties[i], parties[j], parties[k]];
        if (calculateCoalitionStrength(coalition) >= minStrength) {
          coalitions.push(coalition);
        }
      }
    }
  }
  
  return coalitions.sort((a, b) => 
    calculateCoalitionStrength(b) - calculateCoalitionStrength(a)
  );
};

// Ideologie-Mapping für UI
export const IDEOLOGY_LABELS = {
  'far-left': 'Links-außen',
  'left': 'Links',
  'center-left': 'Mitte-Links',
  'center': 'Mitte',
  'center-right': 'Mitte-Rechts',
  'right': 'Rechts',
  'far-right': 'Rechts-außen'
};

export const COOPERATION_LEVELS = {
  0: 'Unmöglich',
  25: 'Sehr schwierig',
  50: 'Möglich',
  75: 'Wahrscheinlich',
  90: 'Sehr wahrscheinlich'
};

export default initialParties;
