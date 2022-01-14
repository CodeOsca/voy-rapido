import { DateString } from './../../../shared/services/date/date-string.service';

export class RetirementDateGenerator {
  private MAX_HOUR = 20;

  generate(): string {
    const currentDate = new DateString();
    if (currentDate.hourIsGreaterThan(this.MAX_HOUR)) {
      currentDate.addDay();
    }
    return currentDate.date;
  }
}
