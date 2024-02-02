export interface ProductType {
  id: number;
  name: string;
  priceNet: number;
  priceTaxPercentage: number;
  chargeMethod: string;
  image: string
}

export interface RoomType {
  id: number;
  name: string;
  pricePerNightNet: number;
  priceTaxPercentage: number;
  image: string
}

export interface Booking {
  id: number;
  roomId: number;
  startDateUtc: string;
  endDateUtc: string;
}

export interface Property {
  id: number;
  name: string;
  timezone: string;
  startTimesLocal: string[];
  endTimesLocal: string[];
}