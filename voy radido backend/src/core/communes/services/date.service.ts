import { Days } from 'src/core/communes/enums/days.enum';

export class DateCommune {
  static getDayAvailble(days: Days[]): number[][] {
    return days.map((day) => this.parseDay(day));
  }

  static includeDay(origin: number, target: number[][]) {
    return target.some((days) => days.includes(origin));
  }

  private static parseDay(day: Days) {
    switch (day) {
      case Days.SUNDAY:
        return [0];
      case Days.MONDAY:
        return [1];
      case Days.TUESDAY:
        return [2];
      case Days.WEDNESDAY:
        return [3];
      case Days.THURSDAY:
        return [4];
      case Days.FRIDAY:
        return [5];
      case Days.SATURDAY:
        return [6];
      case Days.MondaytoFriday:
        return [1, 2, 3, 4, 5];
      case Days.ALL:
        return [0, 1, 2, 3, 4, 5, 6];
      default:
        return null;
    }
  }

  static get day() {
    return new Date().getDay();
  }
}
