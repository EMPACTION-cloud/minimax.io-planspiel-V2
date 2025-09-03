// Formatierungs-Utilities für das Planspiel

export const formatValue = (
  value: number, 
  format: 'percentage' | 'currency' | 'number' | 'ratio',
  unit: string,
  showSign: boolean = false
): string => {
  let prefix = '';
  if (showSign) {
    prefix = value > 0 ? '+' : value < 0 ? '' : '±'; // Minus ist bereits in negativen Zahlen enthalten
  }
  
  switch (format) {
    case 'percentage':
      return `${prefix}${value.toFixed(1)}${unit}`;
    
    case 'currency':
      if (unit.includes('Mrd')) {
        return `${prefix}${value.toFixed(1)} ${unit}`;
      }
      if (unit.includes('Mio')) {
        return `${prefix}${(value / 1000000).toFixed(1)} Mio €`;
      }
      return `${prefix}${value.toLocaleString('de-DE', { 
        style: 'currency', 
        currency: 'EUR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      })}`;
    
    case 'number':
      if (value >= 1000000) {
        return `${prefix}${(value / 1000000).toFixed(1)}M ${unit}`;
      }
      if (value >= 1000) {
        return `${prefix}${(value / 1000).toFixed(1)}K ${unit}`;
      }
      return `${prefix}${value.toLocaleString('de-DE')} ${unit}`;
    
    case 'ratio':
      return `${prefix}${value.toFixed(2)}`;
    
    default:
      return `${prefix}${value} ${unit}`;
  }
};

export const getValueColor = (value: number, minValue: number, maxValue: number, isInverted: boolean = false): string => {
  const percentage = ((value - minValue) / (maxValue - minValue)) * 100;
  
  if (isInverted) {
    // Für Werte wo niedrig = gut (z.B. Arbeitslosigkeit, Schulden)
    if (percentage <= 25) return 'text-green-600';
    if (percentage <= 50) return 'text-yellow-600';
    if (percentage <= 75) return 'text-orange-600';
    return 'text-red-600';
  } else {
    // Für Werte wo hoch = gut
    if (percentage >= 75) return 'text-green-600';
    if (percentage >= 50) return 'text-yellow-600';
    if (percentage >= 25) return 'text-orange-600';
    return 'text-red-600';
  }
};

export const getChangeColor = (change: number): string => {
  if (change > 0) return 'text-green-600';
  if (change < 0) return 'text-red-600';
  return 'text-gray-600';
};

export const formatCurrency = (amount: number, unit: string = 'Mrd €'): string => {
  const absAmount = Math.abs(amount);
  const sign = amount < 0 ? '-' : '+';
  
  if (unit.includes('Mrd')) {
    return `${sign}${absAmount.toFixed(1)} ${unit}`;
  }
  
  return `${sign}${amount.toLocaleString('de-DE', { 
    minimumFractionDigits: 0,
    maximumFractionDigits: 1
  })} €`;
};

export const formatPercentage = (value: number, showSign: boolean = false): string => {
  const sign = showSign && value !== 0 ? (value > 0 ? '+' : '') : '';
  return `${sign}${value.toFixed(1)}%`;
};

export const formatNumber = (value: number, showSign: boolean = false): string => {
  const sign = showSign && value !== 0 ? (value > 0 ? '+' : '') : '';
  
  if (Math.abs(value) >= 1000000) {
    return `${sign}${(value / 1000000).toFixed(1)}M`;
  }
  if (Math.abs(value) >= 1000) {
    return `${sign}${(value / 1000).toFixed(1)}K`;
  }
  
  return `${sign}${value.toLocaleString('de-DE')}`;
};

export const formatDate = (date: { year: number; month: number; day: number }, format: 'short' | 'long' = 'short'): string => {
  const months = [
    'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
    'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
  ];
  
  if (format === 'long') {
    return `${date.day}. ${months[date.month - 1]} ${date.year}`;
  }
  
  return `${date.day.toString().padStart(2, '0')}.${date.month.toString().padStart(2, '0')}.${date.year}`;
};

export const formatTime = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export const getGradeColor = (grade: string): string => {
  switch (grade) {
    case 'A+': case 'A': return 'text-green-600 bg-green-100';
    case 'B+': case 'B': return 'text-blue-600 bg-blue-100';
    case 'C+': case 'C': return 'text-yellow-600 bg-yellow-100';
    case 'D+': case 'D': return 'text-orange-600 bg-orange-100';
    case 'F': return 'text-red-600 bg-red-100';
    default: return 'text-gray-600 bg-gray-100';
  }
};

export const getGradeDescription = (grade: string): string => {
  switch (grade) {
    case 'A+': return 'Ausgezeichnete Leistung';
    case 'A': return 'Sehr gute Leistung';
    case 'B+': return 'Gute Leistung+';
    case 'B': return 'Gute Leistung';
    case 'C+': return 'Befriedigende Leistung+';
    case 'C': return 'Befriedigende Leistung';
    case 'D+': return 'Ausreichende Leistung+';
    case 'D': return 'Ausreichende Leistung';
    case 'F': return 'Ungenügende Leistung';
    default: return 'Nicht bewertet';
  }
};
