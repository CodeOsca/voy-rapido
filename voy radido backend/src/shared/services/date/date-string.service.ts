import { Days } from './../../enums/days.enum';
export class DateString {
  private value: string;

  constructor(date: Date = new Date()) {
    this.toString(date);
  }

  get DateLastDayOfTheMonth() {
    return new DateString(new Date(this.year, this.month, 0)).resetTime();
  }

  nextWeekdayDate(dayInWeek: Days) {
    const currentDate = this.toDate();
    currentDate.setUTCDate(currentDate.getDate() + ((dayInWeek - 1 - currentDate.getDay() + 7) % 7) + 1);
    return new DateString(currentDate).resetTime();
  }

  get() {
    return this.value;
  }

  get time() {
    return this.value.split(' ')[1];
  }

  get date() {
    return this.value.split(' ')[0];
  }

  get hour() {
    return Number(this.time?.split(':')[0] || 0);
  }

  get minute() {
    return Number(this.time?.split(':')[1] || 0);
  }

  get second() {
    return Number(this.time?.split(':')[2] || 0);
  }

  get year() {
    return Number(this.date.split('-')[2]);
  }

  get day() {
    return Number(this.date.split('-')[0]);
  }

  get month() {
    return Number(this.date.split('-')[1]);
  }

  hourIsGreaterThan(target: number) {
    return this.hour > target;
  }

  hourIsLessThan(target: number) {
    return !this.hourIsGreaterThan(target);
  }

  addDay(amount: number = 1) {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + amount);
    this.toString(currentDate);
    this.resetTime();
    return this;
  }

  subtractDay(amount: number = 1) {
    this.addDay(-amount);
  }

  lengthWith(date: string) {
    const timeDiff = this.timeDifference(date);
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  }

  resetTime() {
    this.setTime('00', '00', '00');
    return this;
  }

  set(date: string) {
    this.value = date;
    return this;
  }

  private toString(date: Date) {
    this.value = new Date(date).toLocaleString('es-CL', { timeZone: 'America/Santiago' }); //day-month-year 00:00:00
  }

  private toDate() {
    const currentDate = new Date();
    currentDate.setUTCFullYear(this.year, this.month - 1, this.day);
    currentDate.setUTCHours(this.hour, this.minute, this.second);
    return currentDate;
  }

  private setTime(hour: string, minute: string, seconds: string) {
    this.value = `${this.date} ${hour}:${minute}:${seconds}`;
  }

  private timeDifference(date: string) {
    const dateString = new DateString();
    dateString.set(date);
    const origin = dateString.toDate();
    return origin.getTime() - this.toDate().getTime();
  }
}
