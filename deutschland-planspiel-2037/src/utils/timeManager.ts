import { GameDate, Timer } from '../types';

// Timer- und Zeitsystem für das Planspiel
export class GameTimeManager {
  private static readonly DAYS_PER_YEAR = 365;
  private static readonly MONTHS = [
    'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
    'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
  ];
  private static readonly DAYS_PER_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Datum-Utilities
  static createGameDate(year: number, month: number, day: number): GameDate {
    return { year, month, day };
  }

  static formatGameDate(date: GameDate, format: 'short' | 'long' = 'short'): string {
    const day = date.day.toString().padStart(2, '0');
    const month = date.month.toString().padStart(2, '0');
    
    if (format === 'short') {
      return `${day}.${month}.${date.year}`;
    } else {
      const monthName = this.MONTHS[date.month - 1] || 'Unknown';
      return `${date.day}. ${monthName} ${date.year}`;
    }
  }

  static addDays(date: GameDate, days: number): GameDate {
    let newDate = { ...date };
    newDate.day += days;

    while (newDate.day > this.getDaysInMonth(newDate.year, newDate.month)) {
      newDate.day -= this.getDaysInMonth(newDate.year, newDate.month);
      newDate.month++;
      
      if (newDate.month > 12) {
        newDate.month = 1;
        newDate.year++;
      }
    }

    while (newDate.day < 1) {
      newDate.month--;
      if (newDate.month < 1) {
        newDate.month = 12;
        newDate.year--;
      }
      newDate.day += this.getDaysInMonth(newDate.year, newDate.month);
    }

    return newDate;
  }

  static addMonths(date: GameDate, months: number): GameDate {
    let newDate = { ...date };
    newDate.month += months;

    while (newDate.month > 12) {
      newDate.month -= 12;
      newDate.year++;
    }

    while (newDate.month < 1) {
      newDate.month += 12;
      newDate.year--;
    }

    // Anpassung des Tages, falls der Monat weniger Tage hat
    const maxDays = this.getDaysInMonth(newDate.year, newDate.month);
    if (newDate.day > maxDays) {
      newDate.day = maxDays;
    }

    return newDate;
  }

  static addYears(date: GameDate, years: number): GameDate {
    return { ...date, year: date.year + years };
  }

  static getDaysInMonth(year: number, month: number): number {
    if (month === 2 && this.isLeapYear(year)) {
      return 29;
    }
    return this.DAYS_PER_MONTH[month - 1] || 30;
  }

  static isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  }

  static compareDates(date1: GameDate, date2: GameDate): number {
    if (date1.year !== date2.year) return date1.year - date2.year;
    if (date1.month !== date2.month) return date1.month - date2.month;
    return date1.day - date2.day;
  }

  static isSameDate(date1: GameDate, date2: GameDate): boolean {
    return date1.year === date2.year && date1.month === date2.month && date1.day === date2.day;
  }

  static daysBetween(startDate: GameDate, endDate: GameDate): number {
    const start = this.dateToNumber(startDate);
    const end = this.dateToNumber(endDate);
    return end - start;
  }

  static dateToNumber(date: GameDate): number {
    let days = 0;
    
    // Jahre vor dem aktuellen Jahr
    for (let year = 2025; year < date.year; year++) {
      days += this.isLeapYear(year) ? 366 : 365;
    }
    
    // Monate vor dem aktuellen Monat
    for (let month = 1; month < date.month; month++) {
      days += this.getDaysInMonth(date.year, month);
    }
    
    // Tage
    days += date.day - 1; // -1 weil wir bei 0 beginnen
    
    return days;
  }

  static numberToDate(dayNumber: number): GameDate {
    let remainingDays = dayNumber;
    let year = 2025;
    
    // Jahre
    while (remainingDays >= (this.isLeapYear(year) ? 366 : 365)) {
      remainingDays -= this.isLeapYear(year) ? 366 : 365;
      year++;
    }
    
    let month = 1;
    
    // Monate
    while (remainingDays >= this.getDaysInMonth(year, month)) {
      remainingDays -= this.getDaysInMonth(year, month);
      month++;
    }
    
    return { year, month, day: remainingDays + 1 };
  }

  // Legislatur-Utilities
  static getLegislaturePeriod(date: GameDate): { start: GameDate; end: GameDate; period: number } {
    let period = 1;
    let startYear = 2025;
    
    if (date.year >= 2029) {
      period = 2;
      startYear = 2029;
    }
    if (date.year >= 2033) {
      period = 3;
      startYear = 2033;
    }
    
    return {
      period,
      start: { year: startYear, month: 1, day: 1 },
      end: { year: startYear + 4, month: 12, day: 31 }
    };
  }

  static getNextElectionDate(currentDate: GameDate): GameDate {
    if (currentDate.year < 2029) return { year: 2029, month: 9, day: 26 };
    if (currentDate.year < 2033) return { year: 2033, month: 9, day: 26 };
    return { year: 2037, month: 9, day: 26 };
  }

  static isElectionYear(date: GameDate): boolean {
    return [2029, 2033, 2037].includes(date.year);
  }

  static getYearProgress(date: GameDate): number {
    const yearStart = { year: date.year, month: 1, day: 1 };
    const yearEnd = { year: date.year, month: 12, day: 31 };
    
    const totalDays = this.daysBetween(yearStart, yearEnd) + 1;
    const passedDays = this.daysBetween(yearStart, date) + 1;
    
    return Math.round((passedDays / totalDays) * 100);
  }

  static getLegislatureProgress(date: GameDate): number {
    const legislature = this.getLegislaturePeriod(date);
    const totalDays = this.daysBetween(legislature.start, legislature.end) + 1;
    const passedDays = this.daysBetween(legislature.start, date) + 1;
    
    return Math.round((passedDays / totalDays) * 100);
  }

  // Timer-Utilities
  static createTimer(): Timer {
    return {
      isRunning: false,
      startTime: null,
      elapsedTime: 0,
      pausedTime: 0
    };
  }

  static startTimer(timer: Timer): Timer {
    if (timer.isRunning) return timer;
    
    return {
      ...timer,
      isRunning: true,
      startTime: new Date()
    };
  }

  static pauseTimer(timer: Timer): Timer {
    if (!timer.isRunning || !timer.startTime) return timer;
    
    const now = new Date();
    const sessionTime = now.getTime() - timer.startTime.getTime();
    
    return {
      ...timer,
      isRunning: false,
      elapsedTime: timer.elapsedTime + sessionTime,
      pausedTime: now.getTime(),
      startTime: null
    };
  }

  static getTotalElapsedTime(timer: Timer): number {
    if (!timer.isRunning || !timer.startTime) {
      return timer.elapsedTime;
    }
    
    const now = new Date();
    const currentSessionTime = now.getTime() - timer.startTime.getTime();
    return timer.elapsedTime + currentSessionTime;
  }

  static formatElapsedTime(milliseconds: number): string {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  // Zeitsteuerung
  static jumpToNextYear(currentDate: GameDate): GameDate {
    return { year: currentDate.year + 1, month: 1, day: 1 };
  }

  static jumpToLegislatureEnd(currentDate: GameDate): GameDate {
    const legislature = this.getLegislaturePeriod(currentDate);
    return legislature.end;
  }

  static jumpToNextElection(currentDate: GameDate): GameDate {
    return this.getNextElectionDate(currentDate);
  }

  // Validierung
  static isValidDate(date: GameDate): boolean {
    if (date.year < 2025 || date.year > 2037) return false;
    if (date.month < 1 || date.month > 12) return false;
    if (date.day < 1 || date.day > this.getDaysInMonth(date.year, date.month)) return false;
    return true;
  }

  static clampDate(date: GameDate): GameDate {
    let clampedDate = { ...date };
    
    // Jahr clampen
    clampedDate.year = Math.max(2025, Math.min(2037, clampedDate.year));
    
    // Monat clampen
    clampedDate.month = Math.max(1, Math.min(12, clampedDate.month));
    
    // Tag clampen
    const maxDays = this.getDaysInMonth(clampedDate.year, clampedDate.month);
    clampedDate.day = Math.max(1, Math.min(maxDays, clampedDate.day));
    
    return clampedDate;
  }

  // Saisonale und jährliche Events
  static isNewYear(date: GameDate): boolean {
    return date.month === 1 && date.day === 1;
  }

  static isYearEnd(date: GameDate): boolean {
    return date.month === 12 && date.day === 31;
  }

  static getQuarter(date: GameDate): number {
    return Math.ceil(date.month / 3);
  }

  static isQuarterEnd(date: GameDate): boolean {
    return [3, 6, 9, 12].includes(date.month) && date.day === this.getDaysInMonth(date.year, date.month);
  }

  static getSeason(date: GameDate): 'Frühling' | 'Sommer' | 'Herbst' | 'Winter' {
    if (date.month >= 3 && date.month <= 5) return 'Frühling';
    if (date.month >= 6 && date.month <= 8) return 'Sommer';
    if (date.month >= 9 && date.month <= 11) return 'Herbst';
    return 'Winter';
  }

  // Entscheidungslimit-Utilities
  static canMakeDecision(decisionsThisYear: number, maxDecisions: number = 8): boolean {
    return decisionsThisYear < maxDecisions;
  }

  static getDecisionWarning(decisionsThisYear: number, maxDecisions: number = 8): string | null {
    if (decisionsThisYear >= maxDecisions) {
      return 'Entscheidungslimit für dieses Jahr erreicht!';
    }
    if (decisionsThisYear === maxDecisions - 1) {
      return 'Dies ist Ihre letzte Entscheidung für dieses Jahr!';
    }
    if (decisionsThisYear >= maxDecisions - 3) {
      return `Nur noch ${maxDecisions - decisionsThisYear} Entscheidungen für dieses Jahr verfügbar.`;
    }
    return null;
  }
}

// Hilfsfunktionen für React Hooks
export const useGameTimer = () => {
  // Diese Funktion wird später in einem React Hook implementiert
  return {
    GameTimeManager,
    formatTime: GameTimeManager.formatElapsedTime,
    formatDate: GameTimeManager.formatGameDate
  };
};

// Konstanten für das Zeitsystem
export const TIME_CONSTANTS = {
  GAME_START: { year: 2025, month: 1, day: 1 } as GameDate,
  GAME_END: { year: 2037, month: 12, day: 31 } as GameDate,
  ELECTION_DATES: [
    { year: 2029, month: 9, day: 26 },
    { year: 2033, month: 9, day: 26 },
    { year: 2037, month: 9, day: 26 }
  ] as GameDate[],
  LEGISLATURE_PERIODS: [
    { start: { year: 2025, month: 1, day: 1 }, end: { year: 2029, month: 9, day: 25 } },
    { start: { year: 2029, month: 9, day: 26 }, end: { year: 2033, month: 9, day: 25 } },
    { start: { year: 2033, month: 9, day: 26 }, end: { year: 2037, month: 12, day: 31 } }
  ],
  MAX_DECISIONS_PER_YEAR: 8,
  MILLISECONDS_PER_DAY: 1000, // 1 Sekunde = 1 Tag im Spiel
};

export default GameTimeManager;
