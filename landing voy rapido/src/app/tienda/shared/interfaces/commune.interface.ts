import { Days } from '../enums/retirement-days.enum';

export interface Commune {
  _id: string;
  name: string;
  coordinates: { latitude: string; longitude: string };
  price: number;
  priceWithIVA: number;
  retirementDates: Days[];
  status: boolean;
}
